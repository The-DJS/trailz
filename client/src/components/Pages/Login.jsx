import React from 'react';
import GoogleButton from 'react-google-button';
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const Login = ({ loginUser, logoutUser, user }) => {
  const login = ({ profileObj }) => {
    const { googleId, givenName: firstName, familyName: lastName } = profileObj;
    axios
      .get(`/auth/user/${googleId}`)
      .then(({ data: user }) => {
        if (!user) {
          axios
            .post(`/auth/user/${googleId}`, {
              firstName,
              lastName,
            })
            .then(({ data: user }) => {
              console.log(user);
              loginUser(user);
            })
            .catch((err) => console.log(err));
        } else {
          loginUser(user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = (response) => {
    axios
      .get('/auth/google/logout')
      .then(({ data }) => {
        console.info(data);
        logoutUser();
      })
      .catch((err) => console.warn(err));
    //console.info('response!!!!!', response);
    // console.log('logout');
  };

  return (
    <div>
      {/* <GoogleButton
      onClick={() => { login(); }}
    /> */}
      {/* <a
      className="login-button"
      href="/auth/google/logout"
    >
      Logout
    </a>
    <a
      className="login-button"
      href="/auth/google"
    >
      Login
    </a> */}
      {!user
        ? (
          <GoogleLogin
            clientId="101946136166-d43g259nd32qau97t43vjq9onbqqpifd.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={login}
            onFailure={login}
            // cookiePolicy="single_host_origin"
            // cookiePolicy="none"
            className="btn"
          />
        )
        : (
          <GoogleLogout
            clientId="101946136166-d43g259nd32qau97t43vjq9onbqqpifd.apps.googleusercontent.com"
            buttonText="Sign out"
            onLogoutSuccess={logout}
            className="btn"
          />
        )}
    </div>
  );
};

export default Login;
