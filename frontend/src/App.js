import React, { Component } from "react";
import Root from "./Root";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import Signup from "./components/account/Signup";
import Login from "./components/login/Login";
import ResendActivation from "./components/account/ResendActivation";
import ActivateAccount from "./components/account/ActivateAccount";
import ResetPassword from "./components/account/ResetPassword";
import ResetPasswordConfirm from "./components/account/ResetPasswordConfirm";
import AddEvent from "./components/events/AddEvent";

import Dashboard from "./components/dashboard/Dashboard";

import requireAuth from "./utils/RequireAuth";

import axios from "axios";

if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
  axios.defaults.baseURL = window.location.origin;
}

class App extends Component {
  render() {
    return (
      <div>
        <Root>
          <ToastContainer position="top-right" hideProgressBar={true} newestOnTop={true} />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/addEvent" component={AddEvent} />
            <Route exact path="/" component={Home} />
            <Route path="/resend_activation" component={ResendActivation} />
            <Route path="/activate/:uid/:token" component={ActivateAccount} />
            <Route path="/send_reset_password/" component={ResetPassword} />
            <Route
              path="/reset_password/:uid/:token"
              component={ResetPasswordConfirm}
            />
          </Switch>
        </Root>
      </div>
    );
  }
}

export default App;
