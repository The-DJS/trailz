import React from 'react';
import GoogleButton from 'react-google-button';
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const HomeScreen = ({ loginUser, logoutUser, user }) => {
  const login = ({ googleId }) => {
    axios
      .get(`/auth/user/${googleId}`)
      .then(({ data: user }) => {
        loginUser(user);
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
    console.info('response!!!!!', response);
    // console.log('logout');
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://wallpaperaccess.com/full/825191.jpg")',
        height: '1000px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundPosition: '80% center',
      }}
    >
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
      {/* { !user
        ? (
          <GoogleLogin
            clientId="266879339390-9ia1hkk7q7u6oh2puf1jjbep2bpgi305.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={login}
            onFailure={login}
            cookiePolicy="single_host_origin"
          />
        )
        : (
          <GoogleLogout
            clientId="266879339390-9ia1hkk7q7u6oh2puf1jjbep2bpgi305.apps.googleusercontent.com"
            buttonText="Sign out"
            onLogoutSuccess={logout}
          /> */}
    </div>
  );
};

export default HomeScreen;
