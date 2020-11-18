import React, { Component } from 'react';
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


class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            router:[
                {
                    path: "/",
                    exact: true,
                    component:<Dashboard/>
                  },
                  {
                    path: "/film",
                    exact: false,
                    component:<Film/>
                  },
                  {
                    path: "/user",
                    exact: false,
                    component:<UserPage/>
                  },
                  {
                    path: "/type-film",
                    exact: false,
                    component:<TypeFilm/>
                  }
            ]
        };
    }

    render() {
       const {router} = this.state;
        return (
            <Router>
            <Switch>
            {router.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
              >
                  {route.component}
              </Route>

            ))}
          </Switch>
            </Router>
        );
    }
}

export default Home;
