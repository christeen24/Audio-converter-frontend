import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import axios from "axios";

// email validator
import * as EmailValidator from "email-validator";

export default function Signin(props) {
  //use states
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
  });
  const [redirect, SetRedirect] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const [msg, SetMsg] = useState();
  const [submitBtnDisable, setBtnDisable] = useState(false);

  const [email, setEmail] = useState({
    err: false,
    errorText: "",
  });
  const [password, setPassword] = useState({
    err: false,
    errorText: "",
  });

  const handleInputChange = (event, field) => {
    if (event.target.name === "email") {
      setEmail({ err: false, errorText: "" });
    }
    if (event.target.name === "password") {
      setPassword({ err: false, errorText: "" });
    }

    SetFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!EmailValidator.validate(formData.email)) {
      console.log("no email");
      setEmail({
        err: true,
        errMsg: "Email is required",
      });
    }
    if (!formData.password) {
      console.log("no password");
      setPassword({
        err: true,
        errMsg: "Password is required",
      });
    }

    if (EmailValidator.validate(formData.email) && formData.password) {
      let fd = new FormData();
      console.log(fd);
      fd.append("email", formData.email);
      fd.append("password", formData.password);
      SetIsLoading({ isLoading: true });
      axios
        .post("http://localhost:8000/api/user-login", fd)
        .then((response) => {
          SetIsLoading({ isLoading: false });
          if (response.data.status === 200) {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.data)
            );
            SetMsg(response.data.message);
            console.log(msg);
            setBtnDisable(false);
            SetRedirect(true);
            console.log(redirect);
            setTimeout(() => {
              SetMsg("");
            }, 2000);
          } else {
            setBtnDisable(false);
          }

          if (response.data.status === "failed") {
            SetMsg(response.data.message);
            setTimeout(() => {
              SetMsg("");
            }, 2000);
          }
        });
    }
  };

  if (redirect) {
    return <Redirect to="/home" />;
  }
  const login = localStorage.getItem("isLoggedIn");
  if (login) {
    return <Redirect to="/home" />;
  }

  return (
    <React.Fragment>
      {/* dynamic helmet for seo content update */}
      <Helmet>
        <title>Sign in</title>
        <meta
          name="sign in"
        />
      </Helmet>
      {/* end of helmet */}
      {/* page body */}
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-6 col-sm-12 px-0">
            {/* login card */}
            <div class="card">
              <h1 class="card-title text-center">Login</h1>
              <div class="card-body py-md-4">
                {/* Form section */}
                <form class="px-sm-2 px-2">
                  {/* email address field */}
                  <div class="form-group">
                    <label for="email">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      name="email"
                      onChange={handleInputChange}
                      required
                    />
                    <p hidden={email.err ? false : true} class="err_msg">
                      {email.errMsg}
                    </p>
                  </div>
                  {/* end of email address field */}
                  {/* password field */}
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      name="password"
                      onChange={handleInputChange}
                      required
                    />
                    <p hidden={password.err ? false : true} class="err_msg">
                      {password.errMsg}
                    </p>
                  </div>
                  {/* end of password field */}
                  {/* login button */}
                  <div class="d-flex flex-row justify-content-center">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      class="btn btn-primary px-5 mt-3"
                    >
                      Login
                    </button>
                  </div>
                  {/* end of login button */}
                  {/* register link */}
                  <div class="pt-5 login-link">
                    <span>Doesn't have an account? </span>
                    <a href="/">Register</a>
                  </div>
                  {/* end of register link */}
                </form>
                {/* end of form section */}
              </div>
            </div>
            {/* end of login card */}
          </div>
        </div>
      </div>
      {/* end of body */}
    </React.Fragment>
  );
}
