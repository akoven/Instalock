import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import "../NavBar/NavBar.css"

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    history.push("/login")
    await dispatch(logout());

  };

  return <button className="logout-button" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
