import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-page'>
      <form className='signup-form' onSubmit={onSignUp}>
          <p className='signup-text'>Sign up to see photos and videos from your friends.</p>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder="Username"
          ></input>
        </div>
        <div>
          <input
            type='email'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder="Email"
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder="Password"
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            placeholder="Confirm Password"
            required={true}
          ></input>
        </div>
        <button className='signup-btn' type='submit'>Sign Up</button>
      </form>
      <div className="login-subform">
        Have an account?
        <NavLink to='/login' exact={true} activeClassName='active'>
            Log in
        </NavLink>
      </div>
    </div>
  );
};

export default SignUpForm;
