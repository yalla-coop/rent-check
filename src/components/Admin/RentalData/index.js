// Router for Rental Data
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import { Icon } from 'antd';
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
import useFetch from '../../../useFetch';

const { RENTAL_DATA_ALL, RENTAL_DATA_SINGLE } = routes;

function RentalData() {
  // fetch data
  const [{ data: msg, isLoading }] = useFetch(
    '/.netlify/functions/getRentalData'
  );

  // create table friendly data sets and also pass on all rental details
  const rentalRecords =
    msg &&
    msg.map(record => ({
      key: record._id,
      status: record.status,
      submitted: record.submittedBy.email,
      date: record.createdAt,
      rentalData: record,
    }));

  return (
    <Switch>
      {isLoading && <Loading />}
      <Route
        exact
        path={RENTAL_DATA_ALL}
        render={props => (
          <>
            <S.Wrapper>
              <S.StyledLink to={ADD_RENTAL_URL}>
                Add new rental data{' '}
                <Icon
                  type="arrow-right"
                  fontSize={32}
                  style={{ paddingLeft: '0.25rem' }}
                />
              </S.StyledLink>
            </S.Wrapper>
            <Table
              columns={rentalDataColumns}
              dataSource={rentalRecords}
              {...props}
            />
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
