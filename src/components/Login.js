import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';



const initialFormValues = {
  username: '',
  password: ''
};

const Login = () => {
  const [state, setState] = useState(initialFormValues) 
  const [errorMessage, setErrorMessage] = useState('')
 
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const login = (evt) => {
    evt.preventDefault();

    Axios.post(`http://localhost:5000/api/login`, state)
      .then(res => {
        if(initialFormValues.username === 'Lambda' && initialFormValues.password === 'School') {
          localStorage.setItem('token', res.data.payload);
          setState({
            token: true
          })
          useHistory.push('/protected')
        }
      })
      .catch(err => {
        console.log(err);
        if(state.username === '' || state.password === '') {
          setErrorMessage('Username or Password is not valid.')
        }
      })
  }

  // const isAuth = localStorage.getItem('token')

  const handleChange = (evt) => {
    setState({
      ...state,[evt.target.name]: evt.target.value
    })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={login}>
          <label>
            Username&nbsp;
            <input 
              data-testid='username'
              value={state.username}
              onChange={handleChange}
              name='username'
              type='text'
            />
          </label>

          <label>
            Password
            <input 
              data-testid='password'
              value={state.password}
              onChange={handleChange}
              name='password'
              type='text'
            />
          </label>
          <button>Log in</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{errorMessage}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda / i<3Lambd4, save that token to localStorage.