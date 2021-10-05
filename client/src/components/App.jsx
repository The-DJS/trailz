/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './Navbar/NavBar.jsx';



const App = () => {
  const [searchResults, setSearchResults] = useState([]); // array of parks
  const [user, setUser] = useState(null); // user object
  const [favorites, setFavorites] = useState([]); // array of parks
  const [position, setPosition] = useState({}); // geographic coordinates  {lat: number, lng: number}
  const [events, setEvents] = useState([]); // array of events
  const [showAlert, setShowAlert] = useState(false); // boolean
  const [showSRAlert, setShowSRAlert] = useState(false);
  const [showEventAlert, setShowEventAlert] = useState(false);

  /**
   * see if event exists. if it doesn't, remove from events and show alert
   * that tells user event no longer exists. if the event does exist, find the event
   * and remove the attendee. map over events and replace the updated event.
   */
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
  /**
   * check to see if event exists. if it doesn't remove from events state value.
   * if it does, find the event in the state value, add the user, and map over
   * events and replace the updated event.
   */
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
  /**
   * adds event to database and adds event to state value
   */
  const addEvent = async (
    eventName,
    locationName,
    lat,
    lng,
    time,
    activity,
    description,
    isPublic,
  ) => {
    if (!user) return;
    const now = new Date();
    if (new Date(time) < now.setTime(now.getDate() - 1)) {
      setShowEventAlert(true);
      return;
    }
    const { data: event } = await axios.post(`/events/${user._id}`, {
      eventName,
      locationName,
      lat,
      lng,
      time,
      activity,
      description,
      isPublic,
    });
    setEvents((currEvents) => [...currEvents, event]);
  };
  /**
   * remove event from database and remove from state value
   */
  const removeEvent = async (eventId) => {
    if (!user) return;
    await axios.delete(`/events/removeEvent/${eventId}`);
    setEvents(events.filter((event) => event._id !== eventId));
  };
  // update position, position is equal to object containing lat and lng prop
  const updatePosition = (newPosition) => setPosition(newPosition);

  // update search results, results is an arrary of park objects
  const updateSearchResults = (results) => setSearchResults(results);

  // user filter to remove favorite park from favorites state value
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

  // update the users favorite parks in the db and add the new favorite to the favorites state value
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

  // query server for uses favorite parks
  // returns an array of park objects
  const fetchFavorites = async (user) => {
    const { data: favoriteParks } = await axios.get(
      `/parks/favorites/${user._id}`
    );
    return favoriteParks;
  };

  /**
   * sets the user state value from null to user object
   * gets the favorite parks associated with that user
   * and sets the state value. many components are only
   * visible when user state value is not null.
   */
  const loginUser = (currentUser) => {
    setUser(currentUser);
    fetchFavorites(currentUser)
      .then((favoriteParks) => setFavorites(favoriteParks))
      .catch((err) => console.log(err));
  };

  // sets user state value to null. many components will become invisible.
  const logoutUser = () => {
    if (!user) return;
    setUser(null);
  };

  // called when user submits search form. queries google server
  // for array of park objects that meet search criteria
  const fetchSearchResults = async () => {
    const results = await axios.get('/parks/searchResults');
    return results.data;
  };

  // queries our server for all events, returns array of event objects
  const fetchEvents = async () => {
    const { data } = await axios.get('/events');
    console.log(data);
    const now = new Date();
    return data.filter(
      (event) => new Date(event.time) >= now.setTime(now.getDate() - 1)
    );
  };

  // tried to implement auto refresh on events, however, component
  // was unexpectedly rerendering making it semi-functional, leaving
  // this in in case future group wants to implement
  const updateEvents = () => {
    fetchEvents()
      .then((updatedEvents) => {
        setEvents(updatedEvents);
      })
      .catch((err) => console.log(err));
  };

  /**
   * runs on initial render of app. gets current position from browser
   * and sets position to current position. if user does not allow
   * app to use location, sets location to mid city, new orleans. gets
   * default search results and sets state value. gets events and sets
   * state value.
   */
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

  /**
   * Adds the ability to hide and show then search bar.
   * The search bar checks this state before it attempts to render on the page.
   */
  const [isSearchVisible, setSearchVisible] = useState(true);
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  /**
   * wrap navbar in react browser router
   * pass sate values to nav bar
   */
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
          showSRAlert={showSRAlert}
          setShowSRAlert={setShowSRAlert}
          showEventAlert={showEventAlert}
          setShowEventAlert={setShowEventAlert}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
