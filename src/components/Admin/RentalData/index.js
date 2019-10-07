// Router for Rental Data
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import { Modal, Icon, message } from 'antd';
import axios from 'axios';
import Loading from '../../Loading';
import Table from '../Table';
import RentalRecord from './RentalRecord';

// Styling
import * as S from './RentalData.style';

// Table props
import rentalDataColumns from './rentalDataColumns';

// routes
import { routes } from '../../../constants/adminRoutes';
import { ADD_RENTAL_URL } from '../../../constants/navRoutes';

// custom hooks
import useFetch from '../../../hooks/useFetch';

const { RENTAL_DATA_ALL, RENTAL_DATA_SINGLE } = routes;

function RentalData() {
  const [modalVisible, setModalVisible] = useState(false);
  const [updatingRecord, setUpdatingRecord] = useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState(null);
  const [rentalData, setRentalData] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);

  const updateRecord = (rentalId, updateType) => {
    setRecordToUpdate({ rentalId, updateType });
    toggleModal();
  };

  const confirmUpdate = async () => {
    try {
      setUpdatingRecord(true);
      switch (recordToUpdate.updateType) {
        case 'delete': {
          await axios.delete('/.netlify/functions/deleteRecord', {
            data: { rentalId: recordToUpdate.rentalId },
          });
          break;
        }
        case 'updateStatus': {
          await axios.patch('/.netlify/functions/setRentalStatus');
          break;
        }
        default:
          throw new Error();
      }
      const { data: newRentalData } = await axios.get(
        '/.netlify/functions/getRentalData'
      );
      setRentalData(newRentalData);
      setUpdatingRecord(false);
      setRecordToUpdate(null);
      toggleModal();
      return message.success('Data updated');
    } catch (err) {
      setUpdatingRecord(false);
      setRecordToUpdate(null);
      toggleModal();
      return message.error(`Sorry, there was an error: ${err}`);
    }
  };

  // fetch data
  const [{ data: msg, isLoading }] = useFetch(
    '/.netlify/functions/getRentalData'
  );

  useEffect(() => {
    if (msg) {
      setLoading(isLoading);
      setRentalData(msg);
    }
  }, [isLoading, msg]);

  // create table friendly data sets and also pass on all rental details
  const rentalRecords =
    rentalData &&
    rentalData.map(record => ({
      key: record._id,
      status: record.status,
      submitted: record.submittedBy.email,
      date: record.createdAt,
      rentalData: record,
      updateRecord,
    }));

  return (
    <Switch>
      {loading && <Loading />}
      <Route
        exact
        path={RENTAL_DATA_ALL}
        render={props => (
          <>
            <S.TopSection>
              <S.StyledLink to={ADD_RENTAL_URL}>
                Add new rental data{' '}
                <Icon
                  type="arrow-right"
                  fontSize={32}
                  style={{ paddingLeft: '0.25rem' }}
                />
              </S.StyledLink>
            </S.TopSection>
            <Table
              columns={rentalDataColumns}
              dataSource={rentalRecords}
              {...props}
            />
            <Modal
              title="Are you sure?"
              visible={modalVisible}
              onOk={() => confirmUpdate()}
              onCancel={() => toggleModal()}
              confirmLoading={updatingRecord}
            >
              <p>Clicking confirm will do stuff.</p>
            </Modal>
          </>
        )}
      />
      <Route
        exact
        path={RENTAL_DATA_SINGLE}
        render={props => <RentalRecord {...props} />}
      />
    </Switch>
  );
}

export default RentalData;
