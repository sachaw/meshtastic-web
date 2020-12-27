import * as React from "react";
import { Component } from "react";

class User extends Component<any, any> {
  render() {
    return <div>{JSON.stringify(this.props.user)}</div>;
  }
}

export default User;
