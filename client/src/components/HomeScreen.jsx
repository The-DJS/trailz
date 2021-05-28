import React from 'react';
import GoogleButton from 'react-google-button';
import axios from 'axios';

const login = (response) => {
  axios.get('/auth/google')
    .then((data) => console.info(data))
    .catch((err) => console.warn(err));
  console.info(response);
};

const logout = (response) => {
  axios.get('/google/logout')
    .then((data) => console.info(data))
    .catch((err) => console.warn(err));
  console.info(response);
};

const HomeScreen = () => (

  <div style={{
    backgroundImage: 'url("https://www.pittsburghmagazine.com/content/uploads/2020/03/cb-cook-forest-trail1.jpg")',
    height: '1000px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
  }}
  >
    <GoogleButton
      onClick={() => { login() }}
    />

  </div>

);

export default HomeScreen;
