import React from 'react'
import moment from 'moment'
import { Link } from "react-router-dom";
import { List, Button, Tag } from "antd";
import { routes } from "../../../constants/adminRoutes";

const { RENTAL_DATA_SINGLE } = routes;

const Title = ({address, postcode, status}) => (
  <>
  <span className="mr2">{`${address}, ${postcode}`}</span>
  <Tag color={`var(--${status})`}>{status}</Tag>
  </>
)

const Description = ({submitted, date, submittedName}) => (
  <>
    <div>{`Submitted on: ${moment(date).format("DD/MM/YYYY")}`}</div>
    <div>{`Submitted by: ${submitted}`}</div>
  </>
)

export default function RentalRecordListItem({ submitted, submittedName, status, date, key, updateRecord, rentalData}) {
  return (
    <List.Item key={key}>
          <List.Item.Meta
        title={<Title address={rentalData.address} postcode={rentalData.postcode} status={status} />}
        description={<Description submitted={submitted} date={date} submittedName={submittedName}/>}
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