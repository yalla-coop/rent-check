import React from 'react';
import { List, Tag, Button, Icon } from 'antd';
import { renderUserDetails, status as statusConst, roles } from "../../../constants/users";
import useApiCallback from '../../../hooks/useApiCallback';

const UserLevel = ({ role, status }) => {
  if (role === 'user' && status === 'unverified') {
    return null;
  }
  return (
    <Tag color="yellow">{role}</Tag>
  );
};

const Title = ({ name, status, role }) => {
  return (
    <div>
      <span style={{ marginRight: '0.4rem' }}>{name}</span>
      <UserLevel role={role} status={status} />
    </div>
  );
};

const UserListItem = ({ _id, name, email, role, status, actions: {manageUserStatusOnClick, deleteUser} }) => {
  
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
  if (user.status === statusConst.UNVERIFIED) {
    hasActions = true;
    upgradeAction = "Verify User";
    upgradeUser.status = statusConst.VERIFIED;
    upgradeUser.verifiedBy = "CURRENT USER ID";
    downgradeAction = "Reject User";
    downgradeUser.status = statusConst.REJECTED;
  } else if (user.status === statusConst.AWAITING_SUPER) {
    hasActions = true;
    upgradeAction = "Make Super";
    upgradeUser.status = statusConst.VERIFIED;
    upgradeUser.role = roles.SUPERUSER;
    upgradeUser.madeSuperBy = "CURRENT USER ID";
    downgradeAction = "Reject Request";
    downgradeUser.status = statusConst.VERIFIED;
  }
  console.log(user.status === "unverified")
  return hasActions && (
      <div className="">
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
};
  return (
    <List.Item key={_id}>
      <List.Item.Meta
        title={<Title name={name} status={status} role={role} />}
        description={email}
      />
        <ActionButtons user={{key: _id, name: name, email: email, role: role, status: status}} />
    </List.Item>
  );
};

export default UserListItem;
