// creates columns for rental data
import React from "react";
import Highlighter from "react-highlight-words";
import { Button, Icon } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

// routes
import { routes } from "../../../../constants/adminRoutes";

const { RENTAL_DATA_SINGLE } = routes;

const rentalDataColumns = props => {
  const { searchText } = props;
  const tableColumns = [
    {
      title: "Date submitted",
      dataIndex: "date",
      key: "date",
      render: date => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={date ? moment(date).format("DD/MM/YYYY") : "-"}
        />
      ),
      sorter: (a, b) =>
        moment(a.date || 0).valueOf() - moment(b.date || 0).valueOf(),
    },
    {
      title: "Actions",
      dataIndex: "rentalData",
      key: "actions",
      render: data => (
        <div className="flex items-center">
          <Link
            to={{ pathname: RENTAL_DATA_SINGLE, state: { rentalData: data } }}
          >
            <Button
              style={{
                color: "var(--blue)",
                borderColor: "var(--blue)",
                marginRight: "1rem",
              }}
              className="mr1"
              ghost
            >
              View
            </Button>
          </Link>
          <Button
            style={{ color: "var(--red)", borderColor: "var(--red)" }}
            className="mr1"
            ghost
          >
            <Icon type="delete" />
          </Button>
        </div>
      ),
    },
  ];

  return tableColumns;
};

export default rentalDataColumns;
