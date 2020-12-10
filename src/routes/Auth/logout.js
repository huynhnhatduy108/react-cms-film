import React, { Component } from "react";

class logout extends Component {
  componentDidMount() {
    localStorage.clear();
  }
  render() {
    return <div>Logout User Success !</div>;
  }
}
export default logout;
