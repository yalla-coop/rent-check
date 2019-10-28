// sets columns for user table
import React from "react";
import Highlighter from "react-highlight-words";
import { Button, Icon, Tag, Divider } from "antd";
import { renderUserDetails, status, roles } from "../../../constants/users";

export default ({
  getColumnSearchProps,
  searchText,
  manageUserStatusOnClick,
  deleteUser,
}) => {
  // renders btn to approve or reject user/ super user
  const ActionBtn = ({ userUpdate, color, action }) => (
    <Button
      style={{ color, borderColor: color, fontSize: "0.8rem" }}
      className="mr1"
      ghost
      onClick={() => manageUserStatusOnClick(userUpdate)}
    >
      {action}
    </Button>
  );

  const ActionButtons = ({ user }) => {
    let upgradeUser = { _id: user.key };
    let downgradeUser = { _id: user.key };
    let hasActions = false;
    let upgradeAction = "";
    let downgradeAction = "";
    if (user.status === status.UNVERIFIED) {
      hasActions = true;
      upgradeAction = "Verify User";
      upgradeUser.status = status.VERIFIED;
      upgradeUser.verifiedBy = "CURRENT USER ID";
      downgradeAction = "Reject User";
      downgradeUser.status = status.REJECTED;
    } else if (user.status === status.AWAITING_SUPER) {
      hasActions = true;
      upgradeAction = "Make Super";
      upgradeUser.status = status.VERIFIED;
      upgradeUser.role = roles.SUPERUSER;
      upgradeUser.madeSuperBy = "CURRENT USER ID";
      downgradeAction = "Reject Request";
      downgradeUser.status = status.VERIFIED;
    }
    return (
      hasActions && (
        <div className="flex items-center justify-between">
          <ActionBtn
            color="#219653"
            userUpdate={upgradeUser}
            action={upgradeAction}
          />
          <ActionBtn
            color="#EB5757"
            userUpdate={downgradeUser}
            action={downgradeAction}
          />
        </div>
      )
    );
  };

  const renderDeleteBtn = userId => (
    <span className="flex items-center">
      <Divider type="vertical" />
      <Button
        style={{
          color: "var(--red)",
          borderColor: "var(--red)",
        }}
        className="mr1 self-end"
        ghost
        onClick={() => deleteUser(userId)}
      >
        <Icon type="delete" />
      </Button>
    </span>
  );

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => (
        <span style={{ fontWeight: "700" }}>
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        </span>
      ),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
      ...getColumnSearchProps("email"),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (text, record) => (
        <div className="flex items-center justify-between">
          <span>{renderUserDetails[text]}</span>

          {record.level && record.level === "user" ? (
            <Button>
              <Icon type="form" />
            </Button>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag color={`var(--${text})`}>{renderUserDetails[text]}</Tag>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        return [status.UNVERIFIED, status.AWAITING_SUPER].includes(
          record.status
        ) ? (
          <div className="flex items-center justify-between">
            <ActionButtons user={record} />
            {renderDeleteBtn(record.key)}
          </div>
        ) : (
          <div>{renderDeleteBtn(record.key)}</div>
        );
      },
    },
  ];

  return tableColumns;
};
