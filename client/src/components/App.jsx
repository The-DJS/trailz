/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar.jsx';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [position, setPosition] = useState({});
  const [events, setEvents] = useState([]);
  const [attending, setAttending] = useState([]);

  // Events
  const unregister = async (eventId) => {
    await axios.delete(`/events/${user._id}/${eventId}`);
    setAttending(attending.filter((event) => event._id !== eventId));
  };

  const register = async (eventId) => {
    await axios.post(`/events/${user._id}/${eventId}`);
    setAttending([...attending, events.find((event) => event._id === eventId)]);
  };

  const addEvent = async (
    eventName,
    locationName,
    lat,
    lng,
    time,
    description,
    isPublic,
  ) => {
    const { data: event } = await axios.post(`/events/${user._id}`, {
      eventName,
      locationName,
      lat,
      lng,
      time,
      description,
      isPublic,
    });
    setEvents([...events, event]);
    setAttending([...attending, event]);
  };

  const removeEvent = async (eventId) => {
    await axios.delete(`/events/removeEvent/${eventId}`);
    setEvents(events.filter((event) => event._id !== eventId));
    setAttending(attending.filter((event) => event._id !== eventId));
  };

  const updatePosition = (newPosition) => setPosition(newPosition);

  const updateSearchResults = (results) => setSearchResults(results);

  const removeFavorite = (park) => {
    axios
      .delete(`/parks/favorites/${user._id}/${park._id}`)
      .then(() => {
        setFavorites(
          favorites.filter(
            (currentPark) => park._id.toString() !== currentPark._id,
          ),
        );
      })
      .catch((err) => console.log(err));
  };

  const addFavorite = (park) => {
    console.log('in add fav', park);
    const {
      parkId,
      name,
      address,
      location: { lat, lng },
    } = park;
    axios
      .post(`/parks/favorites/${user._id}`, {
        parkId,
        name,
        address,
        lat,
        lng,
      })
      .then(({ data: newPark }) => {
        setFavorites([...favorites, newPark]);
      })
      .catch((err) => console.log(err));
  };

  const fetchFavorites = async (user) => {
    const { data: favoriteParks } = await axios.get(
      `/parks/favorites/${user._id}`,
    );
    return favoriteParks;
  };

  const fetchAttending = async () => {
    const { data } = await axios.get(`/events/${user._id}`);
    return data;
  };

  const loginUser = (currentUser) => {
    setUser(currentUser);
    fetchFavorites(currentUser)
      .then((favoriteParks) => setFavorites(favoriteParks))
      .catch((err) => console.log(err));
    fetchAttending()
      .then((attending) => setAttending(attending))
      .catch((err) => console.log(err));
  };

  const fetchSearchResults = async () => {
    const results = await axios.get('/parks/searchResults');
    return results.data;
  };

  const fetchEvents = async () => {
    const { data } = await axios.get('/events');
    return data;
  };

  useEffect(() => {
    let currPosition;

    window.navigator.geolocation.getCurrentPosition(
      (position) => (currPosition = position),
    );

    if (currPosition) {
      window.navigator.geolocation.getCurrentPosition((position) =>
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }));
    } else {
      setPosition({
        lat: 29.976999,
        lng: -90.10157,
      });
    }

    fetchSearchResults()
      .then((data) => setSearchResults(data))
      .catch((err) => console.warn(err));

    fetchEvents()
      .then((events) => {
        setEvents(events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          searchResults={searchResults}
          loginUser={loginUser}
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          updateSearchResults={updateSearchResults}
          position={position}
          updatePosition={updatePosition}
          events={events}
          attending={attending}
          register={register}
          unregister={unregister}
          addEvent={addEvent}
          removeEvent={removeEvent}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
