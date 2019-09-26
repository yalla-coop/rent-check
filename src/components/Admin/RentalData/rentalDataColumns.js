// creates columns for rental data
import React from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Tag } from 'antd';
import moment from 'moment';

const rentalDataColumns = ({ getColumnSearchProps, searchText }) => {
  const tableColumns = [
    {
      title: 'Submitted by',
      dataIndex: 'submitted',
      key: 'submitted',
      render: text => (
        <span style={{ fontWeight: '700' }}>
          <Highlighter
            highlightStyle={{
              backgroundColor: 'var(--blue)',
              padding: 0,
              color: 'var(--white)',
            }}
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
        <Tag color={`var(--${text})`} style={{ textTransform: 'capitalize' }}>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        </Tag>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
      filters: [
        {
          text: 'verified',
          value: 'verified',
        },
        {
          text: 'unverified',
          value: 'unverified',
        },
        {
          text: 'rejected',
          value: 'rejected',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Date submitted',
      dataIndex: 'date',
      key: 'date',
      render: date => (
        <span style={{ fontWeight: '700' }}>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={date ? moment(date).format('DD/MM/YYYY') : '-'}
          />
        </span>
      ),
      sorter: (a, b) =>
        moment(a.date || 0).valueOf() - moment(b.date || 0).valueOf(),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <div className="flex items-center justify-center">
          <Button
            style={{ color: 'var(--blue)', borderColor: 'var(--blue)' }}
            className="mr1"
            ghost
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  return tableColumns;
};

export default rentalDataColumns;
