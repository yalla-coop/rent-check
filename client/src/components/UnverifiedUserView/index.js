import React, { useEffect } from 'react';
import { Table, message } from 'antd';

import useFetch from '../../hooks/useFetch';

import * as S from './UnverifiedUserView.style';

import { getRepsWithLocationDetails } from './utils/getRepsWithLocationDetails';
import { tableColumns } from './tableColumns';

function UnverifiedUser() {
  const [
    {
      isError: hasRepsDataRequestErrored,
      isLoading: isRepsDataLoading,
      data: repsData,
    },
  ] = useFetch('/api/reps');

  useEffect(() => {
    if (hasRepsDataRequestErrored) {
      return message.error(
        "Sorry, we're having trouble retrieving the list of Street Reps for you. Please try again later."
      );
    }
  }, [hasRepsDataRequestErrored]);

  const tableData = repsData ? getRepsWithLocationDetails(repsData) : [];
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
        loading={isRepsDataLoading}
        columns={tableColumns}
        dataSource={tableData}
        style={{
          margin: '0 auto',
        }}
      />
    </S.Wrapper>
  );
}

export default UnverifiedUser;
