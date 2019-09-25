// Router for Rental Data
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Table from '../Table';

// Table props
import rentalDataColumns from './rentalDataColumns';
import { dataSource } from './dummyData';

// routes
import { routes } from '../../../constants/adminRoutes';

const { RENTAL_DATA_ALL } = routes;

export default function RentalData() {
  return (
    <Switch>
      <Route
        exact
        path={RENTAL_DATA_ALL}
        render={props => (
          <Table
            columns={rentalDataColumns}
            dataSource={dataSource}
            {...props}
          />
        )}
      />
    </Switch>
  );
}
