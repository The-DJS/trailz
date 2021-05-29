/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import GOOGLE_MAPS_API_KEY from '../../../server/google-maps/API.js';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);

  const loginUser = (currentUser) => {
    setUser(currentUser);
  };

  const fetchSearch = async () => {
    const results = await axios.get('/parks/searchResults/');
    console.log(results.data);
    return results.data;
  };

  useEffect(() => {
    fetchSearch()
      .then((data) => setSearchResults(data))
      .catch((err) => console.warn(err));
  }, []);

  if (user) {
    return <h1>hello </h1>;
  }

  return (
    <BrowserRouter>
      <div>
        <NavBar searchResults={searchResults} loginUser={loginUser} />
      </div>
    </BrowserRouter>
  );
};

export default App;
