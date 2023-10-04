import React, { useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/';

function Login() {
  const [formError, setFormError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginFormData, setLoginFormData] = useState({
    "username": "",
    "password": "",
  });

  const inputHandler = (event) => {
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData();
    formData.append("username", loginFormData.username);
    formData.append("password", loginFormData.password);

    // Submit data
    axios
      .post(baseUrl + 'customer/login/', formData)
      .then(function (response) {
        if (response.data.bool === false) {
          setFormError(true);
          setErrorMsg(response.data.msg);
        } else {
          console.log(response.data);
          localStorage.setItem("customer_id", response.data.id);
          localStorage.setItem("customer_login", true);
          localStorage.setItem("customer_username", response.data.user);

          setFormError(false);
          setErrorMsg("");

          // Redirect to dashboard after successful login
          window.location.href = '/customer/dashboard';
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const checkCustomer = localStorage.getItem("customer_login");
  if (checkCustomer) {
    window.location.href = '/customer/dashboard';
  }

  const buttonEnable = (loginFormData.username !== "" && loginFormData.password !== "");

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className="card-header">Login</h4>
            <div className="card-body">
              {formError &&
                <p className="text-danger">{errorMsg}</p>}
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={loginFormData.username}
                    onChange={inputHandler}
                    className="form-control"
                    id="username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pwd" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={loginFormData.password}
                    onChange={inputHandler}
                    className="form-control"
                    id="pwd"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!buttonEnable}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
