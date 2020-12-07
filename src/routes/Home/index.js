import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Film from "./../Film/FilmPage";
import Dashboard from "./../Dashboard";
import TypeFilm from "../TypeFilm/TypeFilmPage";
import UserPage from "../User/UserPage";
import Login from "../../routes/Auth/login";
import PageNotFound from "../../routes/PageNotFound/PageNodeFound";
import "./style.css";
import "../../index.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      router: [
        {
          path: "/",
          exact: true,
          component: <Dashboard/>,
        },
        {
          path: "/film",
          exact: false,
          component: <Film />,
        },
        {
          path: "/user",
          exact: false,
          component: <UserPage />,
        },
        {
          path: "/type-film",
          exact: false,
          component: <TypeFilm />,
        },
        {
          path: "/login",
          exact: true,
          component: <Login />,
        },
        {
          path: "*",
          exact: false,
          component: <PageNotFound />,
        },
      ],
    };
  }

  render() {
    const { router } = this.state;
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
        <Switch>
          {router.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route key={index} path={route.path} exact={route.exact}>
              {route.component}
            </Route>
          ))}
        </Switch>
        {/* </div> */}
      </Router>
    );
  }
}

export default Home;
