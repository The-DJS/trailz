import React from 'react';
import GoogleButton from 'react-google-button';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

const HomeScreen = ({ loginUser }) => {
  const login = async (response) => {
    const user = await axios.get('/auth/google');
    return user
    // axios.get('/auth/google')
    //   .then((data) => {
    //     console.info('googleId', data.profileObj.googleId);
    //     axios.get(`/auth/user/${data.profileObj.googleId}`)
    //       .then(({ data: user }) => {
    //         console.log('user!!!!!!', user);
    //         loginUser(user);
    //       });
    //   })
    //   .catch((err) => console.warn(err));
    // console.info(response);
  };

  const logout = (response) => {
    axios.get('/google/logout')
      .then((data) => console.info(data))
      .catch((err) => console.warn(err));
    console.info('response!!!!!', response);
  };

  return (
    <div style={{
      backgroundImage: 'url("https://www.pittsburghmagazine.com/content/uploads/2020/03/cb-cook-forest-trail1.jpg")',
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
        onSuccess={() => login().then((user) => console.log('success', user))}
        onFailure={login}
        cookiePolicy="single_host_origin"
      />

    </div>
  );
};

export default HomeScreen;
