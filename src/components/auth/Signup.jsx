import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
// email validator
import * as EmailValidator from "email-validator";
import axios from "axios";
import { Alert, Collapse } from "react-bootstrap";

export default function Signup(props) {
  //use states
  const [formData, SetFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [msg, SetMsg] = useState();
  const [isLoading, SetIsLoading] = useState(false);
  const [submitBtnDisable, setBtnDisable] = useState(false);
  const [alertShow, setAlertShow] = useState(false);

  const [firstName, setFirstName] = useState({
    err: false,
    errorText: "",
  });
  const [lastName, setLastName] = useState({
    err: false,
    errorText: "",
  });
  const [email, setEmail] = useState({
    err: false,
    errorText: "",
  });
  const [password, setPassword] = useState({
    err: false,
    errorText: "",
  });

  const handleInputChange = (event, field) => {
    if (event.target.name === "firstName") {
      setFirstName({ err: false, errorText: "" });
    }
    if (event.target.name === "lastName") {
      setLastName({ err: false, errorText: "" });
    }
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

    if (!formData.firstName) {
      console.log("no first name");
      setFirstName({
        err: true,
        errMsg: "First name is required",
      });
    }
    if (!formData.lastName) {
      console.log("no last name");
      setLastName({
        err: true,
        errMsg: "Last name is required",
      });
    }
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

    if (
      formData.firstName &&
      formData.lastName &&
      EmailValidator.validate(formData.email) &&
      formData.password
    ) {
      let fd = new FormData();
      fd.append("first_name", formData.firstName);
      fd.append("last_name", formData.lastName);
      fd.append("email", formData.email);
      fd.append("password", formData.password);
      console.log(fd);
      SetIsLoading({ isLoading: true });
      setBtnDisable(true);
      axios
        .post("http://localhost:8000/api/user-signup", fd)
        .then((response) => {
          SetIsLoading({ isLoading: false });
          if (response.status === 200) {
            setAlertShow(true);
            SetMsg(response.message);
            console.log(response.message);
            setBtnDisable(false);
            SetFormData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            });
            setTimeout(() => {
              SetMsg("");
            }, 2000);
          } else {
            setBtnDisable(false);
          }

          if (response.status === "failed") {
            SetMsg(response.message);
            setTimeout(() => {
              SetMsg("");
            }, 2000);
          }
        });
    }
  };

  return (
    <React.Fragment>
      {/* dynamic helmet for seo content update */}
      <Helmet>
        <title>Sign up</title>
        <meta name="sign up" />
      </Helmet>
      {/* end of helmet */}
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-6 col-sm-12 px-0">
            {/* register card */}
            <div class="card">
              <h1 class="card-title text-center">Register</h1>
              <div class="card-body py-md-4">
                {/* Form section */}
                <form class="px-sm-2 px-2" noValidate>
                  {/* first name field */}
                  <div class="form-group">
                    <label for="firstName">First name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      name="firstName"
                      onChange={handleInputChange}
                      required
                    />
                    <p hidden={firstName.err ? false : true} class="err_msg">
                      {firstName.errMsg}
                    </p>
                  </div>
                  {/* end of first name field */}
                  {/* last name field */}
                  <div class="form-group">
                    <label for="lastName">Last name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      name="lastName"
                      onChange={handleInputChange}
                      required
                    />
                    <p hidden={lastName.err ? false : true} class="err_msg">
                      {lastName.errMsg}
                    </p>
                  </div>
                  {/* end of last name */}
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
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      class="form-control"
                      id="password"
                      onChange={handleInputChange}
                      required
                    />
                    <p hidden={password.err ? false : true} class="err_msg">
                      {password.errMsg}
                    </p>
                  </div>
                  {/* success alert */}
                  {/* <Collapse in={alertShow}> */}
                    <Alert
                      variant="success"
                      onClose={() => setAlertShow(false)}
                      dismissible
                    >
                      <Alert.Heading>
                        You registered successfully!
                      </Alert.Heading>
                    </Alert>
                  {/* </Collapse> */}
                  {/* end of success alert */}
                  {/* submit button */}
                  <div class="d-flex flex-row-reverse justify-content-center">
                    <button
                      class="btn btn-primary mt-3 px-5"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={submitBtnDisable}
                    >
                      {submitBtnDisable ? "Processing..." : "Sign up"}
                    </button>
                  </div>
                  {/* end of submit button */}
                  <div class="pt-5 login-link">
                    <span>Already have an account? </span>
                    <a href="/sign-in">Login</a>
                  </div>
                </form>
                {/* Form section */}
              </div>
            </div>
            {/* end ofregister card */}
          </div>
        </div>
      </div>
      {/* end of body */}
    </React.Fragment>
  );
}
