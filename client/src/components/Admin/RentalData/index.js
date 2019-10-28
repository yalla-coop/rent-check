// // Router for Rental Data
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// Components
import { Modal, message, Select } from "antd";
import axios from "axios";
import Loading from "../../Common/Loading";
import RentalRecord from "./RentalRecord";
import ListWithFilter from "../ListWithFilter";
import RentalRecordListItem from "./RentalRecordListItem";

// custom hooks
import useFetch from "../../../hooks/useFetch";

// constants
import { statusEnum } from "../../../constants/rentalRecords";

// routes
import { routes } from "../../../constants/adminRoutes";

const { RENTAL_DATA_ALL, RENTAL_DATA_SINGLE } = routes;

const { Option } = Select;

function RentalData({ history }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);
  const [updatingRecord, setUpdatingRecord] = useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState(null);
  const [rentalData, setRentalData] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);

  const editStatus = bool => {
    setEditingStatus(bool);
  };

  const changeStatus = status => {
    const { rentalId } = recordToUpdate;
    setRecordToUpdate({ rentalId, updateType: status });
  };

  const updateRecord = (rentalId, updateType) => {
    setRecordToUpdate({ rentalId, updateType });
    toggleModal();
  };

  const confirmUpdate = async () => {
    const { rentalId, updateType } = recordToUpdate;
    let response;
    try {
      setUpdatingRecord(true);
      let newRentalData = null;
      if (updateType === "delete") {
        response = await axios.delete("/api/admin/locations", {
          data: { rentalId },
        });

        newRentalData = rentalData.filter(record => record._id !== rentalId);
      } else if (statusEnum.includes(updateType)) {
        response = await axios.patch("/api/admin/locations", {
          rentalId,
          newStatus: updateType,
        });
        newRentalData = rentalData.map(record => {
          if (record._id === rentalId) {
            return { ...record, status: updateType };
          }
          return record;
        });
      }

      setRentalData(newRentalData);
      setUpdatingRecord(false);
      setRecordToUpdate(null);
      editStatus(false);
      toggleModal();
      message.success(response.data.msg);
      history.push(RENTAL_DATA_ALL);
    } catch (err) {
      setUpdatingRecord(false);
      setRecordToUpdate(null);
      toggleModal();
      return message.error(`Sorry, there was an error: ${err}`);
    }
  };

  // fetch data
  const [{ data: fetchedRentalData, isLoading }] = useFetch(
    "/api/admin/locations"
  );

  useEffect(() => {
    if (fetchedRentalData) {
      setLoading(isLoading);
      setRentalData(fetchedRentalData);
    }
  }, [isLoading, fetchedRentalData]);

  // create table friendly data sets and also pass on all rental details
  const rentalRecords =
    rentalData ?
    rentalData.map(record => ({
      key: record._id,
      status: record.status,
      submitted: record.submittedBy.email,
      submittedName: record.submittedBy.name,
      date: record.createdAt,
      rentalData: record,
      updateRecord,
      editStatus,
    })) : [];

  const filterByPostcodeAndEmail = (item, searchText) => item.rentalData.postcode.toLowerCase().includes(searchText.toLowerCase()) || item.submitted.toLowerCase().includes(searchText.toLowerCase())

  return (
    <Switch>
      {loading && <Loading />}
      <Route
        exact
        path={RENTAL_DATA_ALL}
        render={props => (
          <>
            <ListWithFilter
              renderItem={RentalRecordListItem}
              dataSource={rentalRecords}
              pagination={{ position: 'bottom' }}
              bordered
              {...props}
              loading={isLoading}
              filterFunction={filterByPostcodeAndEmail}
              filterPlaceholder="Search by postcode or email"
            />
            {recordToUpdate && (
              <Modal
                title={editingStatus ? "Edit Status" : "Are you sure?"}
                visible={modalVisible}
                onOk={() => confirmUpdate()}
                onCancel={() => {
                  editStatus(false);
                  return toggleModal();
                }}
                confirmLoading={updatingRecord}
              >
                {recordToUpdate.updateType === "delete" ? (
                  <p>
                    Clicking confirm will permantly delete this rental record.
                    This cannot be undone.
                  </p>
                ) : (
                  <>
                    {editingStatus && (
                      <Select
                        defaultValue={recordToUpdate.updateType}
                        onChange={changeStatus}
                        width="100%"
                        style={{
                          marginBottom: "1rem",
                          minWidth: "150px",
                          textTransform: "capitalize",
                        }}
                      >
                        {statusEnum.map(status => (
                          <Option
                            value={status}
                            key={status}
                            style={{
                              textTransform: "capitalize",
                            }}
                          >
                            {status}
                          </Option>
                        ))}
                      </Select>
                    )}
                    <p>
                      Clicking confirm will change the status of this rental
                      record to {recordToUpdate.updateType}.
                    </p>
                  </>
                )}
              </Modal>
            )}
          </>
        )}
      />
      <Route
        exact
        path={RENTAL_DATA_SINGLE}
        render={props => (
          <>
            <RentalRecord updateRecord={updateRecord} {...props} />
            {recordToUpdate && (
              <Modal
                title="Are you sure?"
                visible={modalVisible}
                onOk={() => confirmUpdate()}
                onCancel={() => toggleModal()}
                confirmLoading={updatingRecord}
              >
                <p>
                  Clicking confirm will change the status of this rental record
                  to {recordToUpdate.updateType}.
                </p>
              </Modal>
            )}
          </>
        )}
      />
    </Switch>
  );
}

export default RentalData;
