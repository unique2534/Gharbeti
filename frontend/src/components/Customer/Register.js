import React, { useState } from "react";
import axios from "axios";

function Register(props) {
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const [errorMsg, seterrorMsg] = useState('');
  const [successMsg, setsuccessMsg] = useState('');
  const [registerFormData, setRegisterFormData] = useState({
    "first-name": '',
    "last-name": '',
    "username": '',
    "email": '',
    "mobile": '',
    "password": '',
  });

  const inputHandler = (event) => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value
    });
  };

  const submitHandler = (event) => {
    const formData = new FormData();
    formData.append('first_name', registerFormData['first-name']);
    formData.append('last_name', registerFormData['last-name']);
    formData.append('username', registerFormData['username']);
    formData.append('email', registerFormData['email']);
    formData.append('mobile', registerFormData['mobile']);
    formData.append('password', registerFormData['password']);

    // Submit data
    axios.post(baseUrl + 'customer/register/', formData)
      .then(function (response) {
        if (response.data.bool === false) {
          seterrorMsg(response.data.msg)
          setsuccessMsg('');
        } else {
          setRegisterFormData({
            "first-name": '',
            "last-name": '',
            "username": '',
            "email": '',
            "mobile": '',
            "password": '',
          });
          seterrorMsg('');
          setsuccessMsg(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const buttonEnable = (
    registerFormData['first-name'] !== '' &&
    registerFormData['last-name'] !== '' &&
    registerFormData['email'] !== '' &&
    registerFormData['mobile'] !== '' &&
    registerFormData['username'] !== '' &&
    registerFormData['password'] !== ''
  );

  return (
    <div className='container mt-4'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-12'>
          <div className='card'>
            <h4 className='card-header'>Register</h4>
            <div className='card-body'>
              <p className='text-muted'><strong>Note:</strong> *All Fields are required</p>
              {successMsg &&  <p className="text-success">{successMsg}</p>}
              {errorMsg &&  <p className="text-danger">{errorMsg}</p>}
              <form onSubmit={submitHandler}>
                <div className='mb-3'>
                  <label htmlFor='firstName' className='form-label'>
                    First Name
                  </label>
                  <input type='text' onChange={inputHandler} value={registerFormData['first-name']} name="first-name" className='form-control' id='firstName' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='lastName' className='form-label'>
                    Last Name
                  </label>
                  <input type='text' onChange={inputHandler} value={registerFormData['last-name']} name="last-name" className='form-control' id='lastName' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='username' className='form-label'>
                    Username
                  </label>
                  <input type='text' onChange={inputHandler} value={registerFormData['username']} name="username" className='form-control' id='username' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input type='email' onChange={inputHandler} value={registerFormData['email']} name="email" className='form-control' id='email' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='mobile' className='form-label'>
                    Mobile no.
                  </label>
                  <input type='number' onChange={inputHandler} value={registerFormData['mobile']} name="mobile" className='form-control' id='mobile' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>
                    Password
                  </label>
                  <input type='password' onChange={inputHandler} value={registerFormData['password']} name="password" className='form-control' id='password' />
                </div>
                <button type="button" disabled={!buttonEnable} onClick={submitHandler} className='btn btn-primary'>
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

export default Register;
