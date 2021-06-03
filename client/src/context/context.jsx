import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  // state values
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [position, setPosition] = useState({});
  const [events, setEvents] = useState([]);

  // search results function
  const fetchSearchResults = async () => {
    const { data } = await axios.get('/parks/searchResults');
    return data;
  };

  const updateSearchResults = (results) => setSearchResults(results);

  // user functions
  const loginUser = (currentUser) => {
    setUser(currentUser);
    fetchFavorites(currentUser)
      .then((favoriteParks) => setFavorites(favoriteParks))
      .catch((err) => console.log(err));
  };

  const logoutUser = () => {
    setUser(null);
  };

  // favorites functions
  const fetchFavorites = async (user) => {
    const { data: favoriteParks } = await axios.get(
      `/parks/favorites/${user._id}`
    );
    return favoriteParks;
  };

  const removeFavorite = (park) => {
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

  // position function
  const updatePosition = (newPosition) => setPosition(newPosition);

  // events functions
  const unregister = async (eventId) => {
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
    await axios.post(`/events/${user._id}/${eventId}`);
    const foundEvent = events.find((event) => event._id === eventId);
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
    await axios.delete(`/events/removeEvent/${eventId}`);
    setEvents(events.filter((event) => event._id !== eventId));
  };

  const fetchEvents = async () => {
    const { data } = await axios.get('/events');
    return data;
  };

  return (
    <AppContext.Provider
      value={{
        searchResults,
        loginUser,
        logoutUser,
        favorites,
        addFavorite,
        removeFavorite,
        updateSearchResults,
        position,
        updatePosition,
        events,
        user,
        register,
        unregister,
        addEvent,
        removeEvent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };
