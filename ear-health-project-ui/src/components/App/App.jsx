import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "../Navbar/Navbar.jsx";
import Home from "../Home/Home.jsx";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import Footer from "../Footer/Footer";
import Forum from "../Forum/Forum";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RegisterDoctor from "../RegisterDoctor/RegisterDoctor";
import ApiClient from "../../services/apiClient.JS";
import ForumPost from "../ForumPost/ForumPost";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import NotificationView from "../NotificationView/NotificationView";
import Listener from "../Listener/Listener";

function App() {
  //useState for login boolean
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //useState for the user that is currently logged in
  const [user, setUser] = useState({});

  //useState for the user's image
  const [profileImageKey, setProfileImageKey] = useState("");

  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await ApiClient.fetchUserFromToken();

      // if the fetch user gets a user,
      if (data) {
        setUser(data.user);
        setIsLoggedIn(true);
        setProfileImageKey(data.user.image);
      }

      if (error) {
        console.log(error);
      }
    };

    const token = localStorage.getItem("HearingHealthToken");

    if (token) {
      ApiClient.setToken(token);
      fetchUser();
    }
  }, []);

  //loginHandler
  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  //setup a logout handler
  const logOutHandler = () => {
    // we set our isLoggedIn use state to false
    setIsLoggedIn(false);

    // we delete the token in our local storage
    localStorage.setItem("HearingHealthToken", null);

    //we reset what our user state is
    setUser({});

    //we reset the image key
    setProfileImageKey("");
  };

  //function that updates the user state with the user we receive from the backend
  const userUpdater = (userData) => {
    setUser(userData);
  };

  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar
            isLoggedIn={isLoggedIn}
            logOutHandler={logOutHandler}
            user={user}
            profileImageKey={profileImageKey}
          ></Navbar>
          <div className="primary-container">
            <Routes>
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
              <Route
                path="/register"
                element={
                  <RegisterPage
                    loginHandler={loginHandler}
                    userUpdater={userUpdater}
                    setProfileImageKey={setProfileImageKey}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <LoginPage
                    loginHandler={loginHandler}
                    userUpdater={userUpdater}
                    setProfileImageKey={setProfileImageKey}
                  />
                }
              />
              <Route
                path="/forum"
                element={<Forum user={user} isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/register/doctor"
                element={
                  <RegisterDoctor
                    loginHandler={loginHandler}
                    userUpdater={userUpdater}
                    setProfileImageKey={setProfileImageKey}
                  />
                }
              />

              <Route
                path="/forum/post/:postId"
                element={<ForumPost user={user} isLoggedIn={isLoggedIn} />}
              />

              <Route
                path="/profile/:userId"
                element={
                  <Profile
                    user={user}
                    setProfileImageKey={setProfileImageKey}
                    profileImageKey={profileImageKey}
                  />
                }
              />

              <Route
                path="/notifications"
                element={
                  <NotificationView user={user} isLoggedIn={isLoggedIn} />
                }
              />

              <Route path="/listener" element={<Listener />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
