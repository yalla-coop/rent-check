// Router for Rental Data
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '../../Loading';

// Components
import Table from '../Table';

// Table props
import rentalDataColumns from './rentalDataColumns';
import { dataSource } from './dummyData';

// routes
import { routes } from '../../../constants/adminRoutes';

// custom hooks
import useFetch from '../../../useFetch';

const { RENTAL_DATA_ALL } = routes;

export default function RentalData() {
  // fetch data
  const [{ data: msg, isLoading }] = useFetch(
    '/.netlify/functions/getRentalData'
  );

  // create table friendly data sets
  const rentalRecords =
    msg &&
    msg.map(({ _id, status, submittedBy, createdAt }) => ({
      key: _id,
      status,
      submitted: submittedBy.email,
      date: createdAt,
    }));

  return (
    <Switch>
      {isLoading && <Loading />}
      <Route
        exact
        path={RENTAL_DATA_ALL}
        render={props => (
          <>
            {console.log('hello', msg)}
            <div>Add rental data</div>
            <Table
              columns={rentalDataColumns}
              dataSource={rentalRecords}
              {...props}
            />
          </>
        )}
      />
    </Switch>
  );
}
