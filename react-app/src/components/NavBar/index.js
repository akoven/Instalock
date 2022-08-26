import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";
import CreatePostModal from "../SinglePostComponents/CreatePostModal";
// import 'instalock_logo.jpg' from '../../images/instalock_logo.jpg'

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector(state => state.session.user)
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {

  })

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  // console.log(user)
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
    <nav className="nav-home">
      <div className="nav-logo">
        <Link exact to="/">
          <img className="logo-img" src="https://i.imgur.com/w6gGyUO.jpeg" alt="Our Logo Here" />
        </Link>
      </div>
      {/* <h2 className='nav-header'>Instagram</h2> */}
      <ul className="nav-right">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            <img
              src="https://img.icons8.com/material/24/000000/home--v5.png"
              alt="Home"
            />
          </NavLink>
        </li>
        <li>
          {/* <NavLink exact to="/posts/create/new">
            <img
              src="https://img.icons8.com/ios/24/000000/plus-2-math.png"
              alt="Create"
            />
          </NavLink> */}
          <div className="create-post-modal-div">
            <CreatePostModal />
          </div>
        </li>
        <li>
          <button className="nav-bar-button" onClick={openMenu}>
            {user.profile_image_url ? (
              <img src={user.profile_image_url} alt="profile-pic"/>
            ) : (

              <img className="user-post-image"
                src="https://i.imgur.com/vF8FTS2.png"
                alt="Profile"
              />
            )}
          </button>
          {showMenu && (
            <div className="menu">
              {/* <i className="fas fa-bars nav_bars_icon"></i> */}
              <Link
                to={`/profile/${user.id}`}
                className="dropdown"
                style={{ textDecoration: "none" }}
              >
                Profile
              </Link>
              <Link
                to="/profile/edit/:user.id"
                className="dropdown"
                style={{ textDecoration: "none" }}
              >
                Edit Profile
              </Link>
              {/* <Link
                to="/work-in-progress"
                className="dropdown"
                style={{ textDecoration: "none" }}
              >
                Switch Accounts
              </Link> */}
              <div className="logout-div">
                <LogoutButton />
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
