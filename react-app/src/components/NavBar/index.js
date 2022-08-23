
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import "./NavBar.css"
const NavBar = () => {
  return (
    // <nav className='nav-home'>
    //   <ul>
    //     <li>
    //       <NavLink to='/' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/login' exact={true} activeClassName='active'>
    //         Login
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/sign-up' exact={true} activeClassName='active'>
    //         Sign Up
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton />
    //     </li>
    //   </ul>
    // </nav>
    <nav className='nav-home'>
    <h2 className='nav-header'>Instagram</h2>
    <ul>
      <li>
        <NavLink to='/' exact={true} activeClassName='active'>
          <img src="https://img.icons8.com/material/24/000000/home--v5.png" alt="Home"/>
        </NavLink>
      </li>
      <li>
        <img src="https://img.icons8.com/ios/24/000000/plus-2-math.png" alt="Create"/>
      </li>
      <li>
        <img src="https://img.icons8.com/plumpy/24/000000/user-male-circle.png" alt="Profile"/>
      </li>
      <li>
        <LogoutButton />
      </li>
    </ul>
    </nav>
  );
}

export default NavBar;
