/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar.jsx';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async (user) => {
    const { data: favoriteParks } = await axios.get(
      `/parks/favorites/${user._id}`
    );
    return favoriteParks;
  };

  const loginUser = (currentUser) => {
    setUser(currentUser);
    fetchFavorites(currentUser)
      .then((favoriteParks) => {
        setFavorites(favoriteParks);
      })
      .catch((err) => console.log(err));
  };

  const fetchSearch = async () => {
    const results = await axios.get('/parks/searchResults/');
    return results.data;
  };

  useEffect(() => {
    fetchSearch()
      .then((data) => setSearchResults(data))
      .catch((err) => console.warn(err));
  }, []);

  console.log('in app', searchResults);
  return (
    <BrowserRouter>
      <div>
        <NavBar
          searchResults={searchResults}
          loginUser={loginUser}
          favorites={favorites}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
