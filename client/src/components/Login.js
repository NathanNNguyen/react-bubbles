import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles.scss';

const Login = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/login`, credentials)
      .then(res =>
        localStorage.setItem('token', res.data.payload),
        setTimeout(function () { history.push(`/dashboard`) }, 1500))
      // history.push(`/dashboard`))
      .catch(err => console.log(err))
    setCredentials({ username: '', password: '' })
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Log in</h3>
        <label>Username</label>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={handleChange}
          value={credentials.username}
        />
        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          value={credentials.password}
        />
        <button type='submit'>Log In</button>
      </form>
    </>
  );
};

export default Login;
