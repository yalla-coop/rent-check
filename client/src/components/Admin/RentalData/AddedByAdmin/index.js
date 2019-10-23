import React from 'react';
import Table from '../../Table';

import rentalDataColumns from './tableColumns';

import useFetch from '../../../../hooks/useFetch';

import * as S from '../RentalData.style';

export default function AdminAddedRecords(props) {
  // fetch data
  const [{ data: adminRentalRecords, isLoading }] = useFetch(
    '/.netlify/functions/getRentalRecordAddedByAdmin'
  );

  // create table friendly data sets and also pass on all rental details
  const rentalRecords =
    adminRentalRecords &&
    adminRentalRecords.map(record => ({
      key: record._id,
      date: record.createdAt,
      rentalData: record,
    }));
  return (
    <div>
      <S.TopSection>
        <strong>Rental data added by admin</strong>
      </S.TopSection>
      <Table
        loading={isLoading}
        columns={rentalDataColumns}
        dataSource={rentalRecords}
        {...props}
      />
    </div>
  );
}
