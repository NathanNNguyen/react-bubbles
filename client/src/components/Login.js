import React from "react";

import './styles.scss';
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <form className='form'>
        <h3>Log in</h3>
        <label>Username</label>
        <input 
        type='text'
        name='username'
        placeholder='Username'
        />
        <label>Password</label>
        <input 
        type='text'
        name='password'
        placeholder='Password'
        />
        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
