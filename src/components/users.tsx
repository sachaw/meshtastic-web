import * as React from "react";
import { Component } from "react";
import User from "./user";

class Users extends Component<any, any> {
  renderUsers() {
    if (this.props.users.length > 0) {
      return this.props.users.map((value: any, index: any) => (
        <User user={value} />
      ));
    } else {
      return "No users in database";
    }
  }
  render() {
    console.log("Rendering users");
    console.log(this.props.users);
    return <div>{this.renderUsers()}</div>;
  }
}

export default Users;
