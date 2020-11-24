import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import "./style.css";
import "../../index.css";

class Header extends Component {
  render() {
    return (
      <Router>
        <div className="header container-fluid">
          <div className="row">
            <div className="col-6 hd_menu_left">
              <ul>
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/user">User Management</Link>
                </li>
                <li>
                  <Link to="/film">Film Management</Link>
                </li>
                <li>
                  <Link to="/type-film">Type of Film</Link>
                </li>
              </ul>
            </div>
            {/* <div className="col-6 hd_menu_right">
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
                <li>@#$%^&</li>
              </ul>
            </div> */}
          </div>
        </div>
      </Router>
    );
  }
}

export default Header;
