// creates columns for rental data
import React from 'react';
import Highlighter from 'react-highlight-words';

const rentalDataColumns = ({ getColumnSearchProps, searchText }) => {
  const tableColumns = [
    {
      title: 'Submitted by',
      dataIndex: 'submitted',
      key: 'submitted',
      render: text => (
        <span style={{ fontWeight: '700' }}>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        </span>
      ),
      ...getColumnSearchProps('submitted'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
      ...getColumnSearchProps('status'),
    },
    {
      title: 'Date submitted',
      dataIndex: 'date',
      key: 'date',
      render: text => (
        <span style={{ fontWeight: '700' }}>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        </span>
      ),
      ...getColumnSearchProps('date'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: text => (
        <span style={{ fontWeight: '700' }}>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        </span>
      ),
      ...getColumnSearchProps('actions'),
    },
  ];

  return tableColumns;
};

export default rentalDataColumns;
