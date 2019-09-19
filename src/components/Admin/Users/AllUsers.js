import React, { Component } from 'react'
import { Table, Input, Icon, Button } from "antd";
import usersCol from './UsersColumns';

// fake data
import { dataSource } from './dummyUsers'

export default class AllUsers extends Component {
 state = {
    data: [],
    visible: false,
    id: "",
    searchText: ""
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon
        type="search"
        style={{ fontSize: "20px", color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) => {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    return (
    <Table
      columns={usersCol({
        getColumnSearchProps: this.getColumnSearchProps,
        searchText: this.state.searchText
      })}
      dataSource={dataSource}
      style={{ backgroundColor: "#ffffff" }}
      bordered
    />
    )
  }
}
