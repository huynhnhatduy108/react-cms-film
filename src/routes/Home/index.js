import React, { useContext, useEffect, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import Film from "./../Film/FilmPage";
import Dashboard from "./../Dashboard";
import TypeFilm from "../TypeFilm/TypeFilmPage";
import UserPage from "../User/UserPage";
import Login from "../../routes/Auth/login";
import Register from "../../routes/Auth/register";
import Logout from "../../routes/Auth/logout";

import PageNotFound from "../../routes/PageNotFound/PageNodeFound";
import "./style.css";
import "../../index.css";

export default function Home() {
  //   const [isLogin, setIsLogin] = useState();
  //   var username = null;
  //   console.log("isLoginApp",isLogin);

  //   useEffect(() => {
  //     checkLogin();
  //   }, [isLogin]);

  //   const checkLogin = () => {
  //     const result = localStorage.getItem("user");
  //     console.log("result",typeof result);
  //     if(result!==null){
  //       setIsLogin(true);
  //       username = result.username;
  //     }else{
  //       setIsLogin(false);
  //     }
  //  };
  
  const menuLink = ({label, to, activeOnlyWhenExact, match }) =>{
    var active = match ? "active":"";
    // let match = useRouteMatch({
    //   path: to,
    //   exact: activeOnlyWhenExact
    // });
  
    return (
      <div className={match ? "active" : ""}>
        {match && "> "}
        <Link to={to}>{label}</Link>
      </div>
    );
  };

  return (
    <div className="App">
      <ProvideAuth>
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
              <div className="col-6 hd_menu_right">
                <AuthButton />
              </div>
            </div>
          </div>
          <Switch>
            <Route path="/public">
              <Dashboard />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/user">
              <UserPage />
            </PrivateRoute>
            <PrivateRoute path="/film">
              <Film />
            </PrivateRoute>
            <PrivateRoute path="/type-film">
              <TypeFilm />
            </PrivateRoute>
          </Switch>
        </Router>
      </ProvideAuth>
    </div>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (cb) => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <ul>
      Welcome!{" "}
      <li
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        <a>Logout</a>
      </li>
    </ul>
  ) : (
    <ul>
      <li
        onClick={() => {
          console.log("history",history);
          history.push("/register");
        }}
      >
        {/* <a>Register</a> */}
      </li>
    </ul>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  console.log("from", from);
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <h1>You must log in to view the page at {from.pathname}</h1>
      <button onClick={login}>Log in</button>
    </div>
  );
}
