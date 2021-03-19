import React from "react";
import ReactDOM from "react-dom";
import "../src/styles/css/Styles.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "../src/components/auth/Signup.jsx";
import Signin from "../src/components/auth/Signin.jsx";
import Home from "../src/components/Home.jsx";

const login = localStorage.getItem("isLoggedIn");

let navigate = <Signup />;

ReactDOM.render(
  <React.StrictMode>
    {login ? (
      <Router>
        <Switch>
          <Route path="/" exact component={Signup}></Route>
          <Route path="/sign-in" component={Signin}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </Router>
    ) : (
      <Router>
        {/* {navigate} */}
        <Switch>
          <Route path="/" exact component={Signup}></Route>
          <Route path="/sign-in" component={Signin}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </Router>
    )}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
