import React from 'react'
import moment from 'moment'
import { Link } from "react-router-dom";
import { List, Button, Tag } from "antd";
import { routes } from "../../../constants/adminRoutes";

const { RENTAL_DATA_SINGLE } = routes;

const Title = ({submitted, status}) => (
  <>
  <span className="mr2">{submitted}</span>
  <Tag color={`var(--${status})`}>{status}</Tag>
  </>
)

export default function RentalRecordListItem({ submitted, status, date, key, updateRecord, rentalData}) {
  return (
    <List.Item key={key}>
          <List.Item.Meta
        title={<Title submitted={submitted} status={status} />}
        description={`Submitted on: ${moment(date).format("DD/MM/YYYY")}`}
      />
    <div className="flex items-center">
  <Link
     to={{
       pathname: RENTAL_DATA_SINGLE,
       state: {
         rentalData: rentalData,
       },
     }}
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
   {/* <Button
     style={{ color: "var(--red)", borderColor: "var(--red)" }}
     className="mr1"
     ghost
     onClick={() => updateRecord(key, "delete")}
   >
     <Icon type="delete" />
   </Button> */}
   </div>
    </List.Item>
  )
}


  // const tableColumns = [
  //   {
  //     title: "Submitted by",
  //     dataIndex: "submitted",
  //     key: "submitted",
  //     render: text => (
  //       <Highlighter
  //         highlightStyle={{
  //           backgroundColor: "var(--blue)",
  //           padding: 0,
  //           color: "var(--white)",
  //         }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text.toString()}
  //       />
  //     ),
  //     ...getColumnSearchProps("submitted"),
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (text, record) => (
  //       <div className="flex items-center justify-between">
  //         <Tag color={`var(--${text})`} style={{ textTransform: "capitalize" }}>
  //           <Highlighter
  //             highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
  //             searchWords={[searchText]}
  //             autoEscape
  //             textToHighlight={text.toString()}
  //           />
  //         </Tag>
  //         <Button
  //           size="small"
  //           onClick={() => {
  //             record.editStatus(true);
  //             return record.updateRecord(record.key, record.status);
  //           }}
  //         >
  //           <Icon type="form" fontSize={10} />
  //         </Button>
  //       </div>
  //     ),
  //     sorter: (a, b) => a.status.localeCompare(b.status),
  //     filters: [
  //       {
  //         text: "verified",
  //         value: "verified",
  //       },
  //       {
  //         text: "unverified",
  //         value: "unverified",
  //       },
  //       {
  //         text: "rejected",
  //         value: "rejected",
  //       },
  //       {
  //         text: "invalid",
  //         value: "invalid",
  //       },
  //     ],
  //     onFilter: (value, record) => record.status.indexOf(value) === 0,
  //   },
  //   {
  //     title: "Date submitted",
  //     dataIndex: "date",
  //     key: "date",
  //     render: date => (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={date ? moment(date).format("DD/MM/YYYY") : "-"}
  //       />
  //     ),
  //     sorter: (a, b) =>
  //       moment(a.date || 0).valueOf() - moment(b.date || 0).valueOf(),
  //   },
  //   {
  //     title: "Actions",
  //     dataIndex: "rentalData",
  //     key: "actions",
  //     render: (data, record) => (
  //       <div className="flex items-center">
  //         <Link
  //           to={{
  //             pathname: RENTAL_DATA_SINGLE,
  //             state: {
  //               rentalData: data,
  //             },
  //           }}
  //         >
  //           <Button
  //             style={{
  //               color: "var(--blue)",
  //               borderColor: "var(--blue)",
  //               marginRight: "1rem",
  //             }}
  //             className="mr1"
  //             ghost
  //           >
  //             View
  //           </Button>
  //         </Link>
  //         <Button
  //           style={{ color: "var(--red)", borderColor: "var(--red)" }}
  //           className="mr1"
  //           ghost
  //           onClick={() => record.updateRecord(record.key, "delete")}
  //         >
  //           <Icon type="delete" />
  //         </Button>
  //       </div>
  //     ),
  //   },
  // ];