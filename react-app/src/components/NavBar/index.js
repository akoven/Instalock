import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";
import CreatePostModal from "../SinglePostComponents/CreatePostModal";
import { getProfileThunk } from "../../store/profile";
// import 'instalock_logo.jpg' from '../../images/instalock_logo.jpg'

const NavBar = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.session.user);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {});

  const grabUserProfile = async (userId) => {
    await dispatch(getProfileThunk(userId));
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <nav className="nav-home">
      <div className="nav-logo">
        <Link to="/">
          <img
            className="logo-img"
            src="https://i.imgur.com/w6gGyUO.jpeg"
            alt="Our Logo Here"
          />
        </Link>
      </div>
      {/* <h2 className='nav-header'>Instagram</h2> */}
      <ul className="nav-right">
        <li>
          <NavLink to="/" activeClassName="active">
            <img
              src="https://img.icons8.com/material/24/000000/home--v5.png"
              alt="Home"
            />
          </NavLink>
        </li>
        <li>
          <div className="create-post-modal-div">
            <CreatePostModal />
          </div>
        </li>
        <li>
          <button className="nav-bar-button" onClick={openMenu}>
            {user.profile_image_url ? (
              <img
                className="user-post-image"
                src={user.profile_image_url}
                alt="profile-pic"
              />
            ) : (
              <img
                className="user-post-image"
                src="https://i.imgur.com/f906ONQ.jpg"
                alt="Profile"
              />
            )}
          </button>
          {showMenu && (
            <div className="menu">
              {/* <i className="fas fa-bars nav_bars_icon"></i> */}
              <Link
                onClick={() => grabUserProfile(user.id)}
                to={`/profile/${user.id}`}
                className="dropdown top-option"
                style={{ textDecoration: "none" }}
              >
                Profile
              </Link>
              <Link
                onClick={() => grabUserProfile(user.id)}
                to={`/profile/edit/${user.id}`}
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
              <div className="dropdown logout-div cancel">
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
