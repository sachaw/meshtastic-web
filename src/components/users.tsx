import * as React from "react";
import User from "./user";

const Users = (props: any) => {
  const renderUsers = () => {
    if (props.users.length > 0) {
      return props.users.map((value: any, index: any) => <User user={value} />);
    } else {
      return "No users in database";
    }
  };
  return <div>{renderUsers()}</div>;
};

export default Users;
