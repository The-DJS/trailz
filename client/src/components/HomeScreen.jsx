import React from 'react';
import GoogleButton from 'react-google-button';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

const HomeScreen = ({ loginUser }) => {
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
      .get('/google/logout')
      .then((data) => console.info(data))
      .catch((err) => console.warn(err));
    console.info('response!!!!!', response);
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://www.pittsburghmagazine.com/content/uploads/2020/03/cb-cook-forest-trail1.jpg")',
        height: '1000px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
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
      <GoogleLogin
        clientId="266879339390-9ia1hkk7q7u6oh2puf1jjbep2bpgi305.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={login}
        onFailure={login}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default HomeScreen;
