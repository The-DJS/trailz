/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import GOOGLE_MAPS_API_KEY from '../../../server/google-maps/API.js';

const App = () => {
  const [searchResults, setSearchResults] = useState([
    {
      name: 'location 1',
      location: {
        lat: 29.9869849,
        lng: -90.0980445,
      },

    },
    {
      name: 'Location 2',
      location: {
        lat: 29.9756568,
        lng: -90.09472559999999,
      },
    },
  ]);

  const fetchSearch = async () => {
    const data = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_MAPS_API_KEY}&location=29.977000,-90.101570&radius=160934&type=park`);
    console.info(data.results);
    return data.results;
  };

  useEffect(() => fetchSearch(), []);

  return (
    <BrowserRouter>
      <div>
        <NavBar searchResults={searchResults} />
      </div>
    </BrowserRouter>
  );
};

export default App;
