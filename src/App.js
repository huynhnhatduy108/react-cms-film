import React,{ useEffect,useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import "./App.css";
import Login from "./routes/Auth/login";
import Register from "./routes/Auth/register";
import Template from "./routes/Template";
import Footer from "./component/Footer";
import Home from "./routes/Home";


function App() {

  const [isLogin, setIsLogin] = useState();

  useEffect(() => {
    checkLogin();
  }, [isLogin]);

  const checkLogin = () => {
    if(localStorage.getItem("token")==null){
      setIsLogin(true);
    }
    setIsLogin(false);
 };
 // const routes = [
  //   {
  //     path: "/login",
  //     exact: true,
  //     component: <Login />,
  //   },
  //   {
  //     path: "/register",
  //     exact: true,
  //     component: <Register />,
  //   },
  //   {
  //     path: "/",
  //     exact: true,
  //     component: <Template/>,
  //   },
  // ]
 
   // if (localStorage.getItem("token")) {
   //   this.setState({ isLogin: true });
   // }
   // this.setState({ isLogin: false });


  return (
    <div className="App">
       <Home isLogin={isLogin}/>
      <Footer />
      {/* <Router>
      <Switch>
          {routes.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route key={index} path={route.path} exact={route.exact}>
              {route.component}
            </Route>
          ))}
        </Switch>
      </Router>
      <Footer /> */}
    </div>
  );
}

export default App;
