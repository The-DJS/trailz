/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './Navbar/NavBar.jsx';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [position, setPosition] = useState({});
  const [events, setEvents] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const unregister = async (eventId) => {
    if (!user) return;
    const { data: eventExists } = await axios.get(`events/validate/${eventId}`);
    if (!eventExists) {
      setEvents(events.filter((currentEvent) => currentEvent._id !== eventId));
      setShowAlert(true);
      return;
    }
    await axios.delete(`/events/${user._id}/${eventId}`);
    const foundEvent = events.find((event) => event._id === eventId);
    foundEvent.attendees = foundEvent.attendees.filter(
      (attendee) => attendee !== `${user.firstName} ${user.lastName}`
    );
    setEvents(
      events.map((event) => {
        if (event._id === eventId) {
          return foundEvent;
        }
        return event;
      })
    );
  };
  const register = async (eventId) => {
    if (!user) return;
    const { data: eventExists } = await axios.get(`events/validate/${eventId}`);
    if (!eventExists) {
      setEvents(events.filter((currentEvent) => currentEvent._id !== eventId));
      setShowAlert(true);
      return;
    }
    await axios.post(`/events/${user._id}/${eventId}`);
    const foundEvent = events.find(
      (currentEvent) => currentEvent._id === eventId
    );
    foundEvent.attendees = [
      ...foundEvent.attendees,
      `${user.firstName} ${user.lastName}`,
    ];
    setEvents(
      events.map((event) => {
        if (event._id === eventId) {
          return foundEvent;
        }
        return event;
      })
    );
  };

  const addEvent = async (
    eventName,
    locationName,
    lat,
    lng,
    time,
    description,
    isPublic
  ) => {
    if (!user) return;
    const { data: event } = await axios.post(`/events/${user._id}`, {
      eventName,
      locationName,
      lat,
      lng,
      time,
      description,
      isPublic,
    });
    console.log(event);
    setEvents((currEvents) => [...currEvents, event]);
  };

  const removeEvent = async (eventId) => {
    if (!user) return;
    await axios.delete(`/events/removeEvent/${eventId}`);
    setEvents(events.filter((event) => event._id !== eventId));
  };

  const updatePosition = (newPosition) => setPosition(newPosition);

  const updateSearchResults = (results) => setSearchResults(results);

  const removeFavorite = (park) => {
    if (!user) return;
    axios
      .delete(`/parks/favorites/${user._id}/${park._id}`)
      .then(() => {
        setFavorites(
          favorites.filter(
            (currentPark) => park._id.toString() !== currentPark._id
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const addFavorite = (park) => {
    if (!user) return;
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
      .then(({ data: newPark }) => setFavorites([...favorites, newPark]))
      .catch((err) => console.log(err));
  };

  const fetchFavorites = async (user) => {
    const { data: favoriteParks } = await axios.get(
      `/parks/favorites/${user._id}`
    );
    return favoriteParks;
  };

  const loginUser = (currentUser) => {
    setUser(currentUser);
    fetchFavorites(currentUser)
      .then((favoriteParks) => setFavorites(favoriteParks))
      .catch((err) => console.log(err));
  };

  const logoutUser = () => {
    if (!user) return;
    setUser(null);
  };

  const fetchSearchResults = async () => {
    const results = await axios.get('/parks/searchResults');
    return results.data;
  };

  const fetchEvents = async () => {
    const { data } = await axios.get('/events');
    return data;
  };

  const updateEvents = () => {
    fetchEvents()
      .then((events) => {
        setEvents(events);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let currPosition;
    window.navigator.geolocation.getCurrentPosition(
      (position) => (currPosition = position)
    );
    if (currPosition) {
      window.navigator.geolocation.getCurrentPosition((position) =>
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
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
      .then((events) => setEvents(events))
      .catch((err) => console.log(err));
  }, []);

  const [isSearchVisible, setSearchVisible] = useState(true);
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  return (
    <BrowserRouter>
      <div>
        <NavBar
          user={user}
          loginUser={loginUser}
          logoutUser={logoutUser}
          searchResults={searchResults}
          updateSearchResults={updateSearchResults}
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          position={position}
          updatePosition={updatePosition}
          events={events}
          register={register}
          unregister={unregister}
          addEvent={addEvent}
          removeEvent={removeEvent}
          // created={created}
          toggleSearch={toggleSearch}
          isSearchVisible={isSearchVisible}
          updateEvents={updateEvents}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
