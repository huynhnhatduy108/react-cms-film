import React, { useEffect, useState, } from "react";
import "./App.css";
import Footer from "./component/Footer";
import Home from "./routes/Home";


export default function App() {
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

  return (
    <div className="App">
      <Home/>
      <Footer />
    </div>
  );
}

