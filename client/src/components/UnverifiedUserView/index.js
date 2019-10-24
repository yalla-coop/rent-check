import React from 'react';
import { Table } from 'antd';

import useFetch from '../../hooks/useFetch';

import * as S from './UnverifiedUserView.style';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    company: 'Cool stuff',
  },
  {
    key: '2',
    name: 'Jim Green',
    company: 'Cool stuff',
  },
];

function UnverifiedUser() {
  const [
    {
      isError: hasRepsDataRequestErrored,
      isLoading: isRepsDataLoading,
      data: repsData,
    },
  ] = useFetch('api/reps');

  console.log('repsData', repsData);
  return (
    <S.Wrapper>
      <h2>Sorry your account isn’t verified</h2>
      <S.Paragraph>
        We can see your account exists but unfortunately it isn’t currently
        verified. If you feel this is incorrect please find and get in touch
        with any of our street reps listed below.
      </S.Paragraph>
      <h3>East End Trades Guild Street Reps</h3>
      <Table
        columns={columns}
        dataSource={data}
        style={{
          margin: '0 auto',
        }}
      />
      ,
    </S.Wrapper>
  );
}

export default UnverifiedUser;
