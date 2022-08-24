import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import ProfilePage from "./components/profile_pg/ProfilePage";
import SplashPage from "./components/SplashPage";
import PostDetails from "./components/postDetails/postDetail";
import Feed from "./components/Feed";
import "./index.css";
import { Link } from "react-router-dom";
import EditPostModal from './components/SinglePostComponents/EditPostModal';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <div className="splash-login">
            <SplashPage />
            <LoginForm />
          </div>
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route exact path="/posts/:postId">
          <NavBar />
          <PostDetails />
        </Route>
        <Route exact path="/edit-post-trial">
          <EditPostModal />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <NavBar />
          <Feed />
        </ProtectedRoute>
        <ProtectedRoute path='/profile_page/:userId' exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/profile_edit/edit' exact={true}>
          <EditProfileForm />
        </ProtectedRoute>
          {/* <h1>My Home Page</h1> */}

      </Switch>
    </BrowserRouter>
  );
}

export default App;
