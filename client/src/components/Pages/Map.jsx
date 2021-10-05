/* eslint-disable import/extensions */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { v4 as getKey } from 'uuid';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapStyles from '../../styles/mapStyles.js';
/**
 * if this project is chosen for legacy, need to find better way to get
 * google map api, shouldn't reference back end from front end, could make
 * .env folder on client side using webpack.config.js however this could
 * be risky as everything served up can be accessed by user, could make
 * route that sends key from server to client and is called when component
 * renders?
 */
import { GOOGLE_MAPS_API_KEY } from '../../../../server/google-maps/API.js';
import CustomInfoWindow from './InfoWindow.jsx';

// The size of the map on the page
const containerStyle = {
  height: '91vh',
  width: '100vw',
};

// Options of the render (disable default UI and custom styles)
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({
  results,
  addFavorite,
  removeFavorite,
  position,
  register,
  unregister,
  addEvent,
  removeEvent,
  events,
  user,
  toggleSearch,
  updateEvents,
}) => {
  /**
   * this function dynamically sets the bounds of the map
   * so all points can be viewed at once. if the number of
   * results is greater than one, every point is visible
   * and the zoom is set based on the bounds. if the number
   * of results is equal to one, the map is centered on that
   * point and the zoom is set to the default of 12 so its
   * not too zoomed in. if no points are in results, the
   * location of the user is set to center with a default of 12.
   */
  // const setBounds = () => {
  //   if (window.google && mapRef.current) {
  //     if (results.length > 1) {
  //       const bounds = results.reduce(
  //         (boundsObj, { location: { lat, lng } }) =>
  //           boundsObj.extend({ lat, lng }),
  //         new window.google.maps.LatLngBounds()
  //       );
  //       mapRef.current.fitBounds(bounds);
  //     } else if (results.length === 1) {
  //       const [
  //         {
  //           location: { lat, lng },
  //         },
  //       ] = results;
  //       setZoom(14);
  //       setCenter({ lat, lng });
  //     } else {
  //       const { lat, lng } = position;
  //       setZoom(12);
  //       setCenter({ lat, lng });
  //     }
  //   }
  // };
  // initial center set based on users location
  const [center, setCenter] = useState({
    lat: position.lat,
    lng: position.lng,
  });
  const [zoom, setZoom] = useState(12);

  // Selected marker
  const [selected, setSelected] = useState({});
  const onSelect = (item, selectedLat, selectedLng) => {
    // could invoke set center and pass in selected lat
    // and selected lng if you want to center map whenever
    // you click a marker, i removed this functionality
    // cause i though it made the map jump around too much
    setSelected(item);
  };

  // Custom pin
  const [userPins, setUserPins] = useState([]);

  // Location references to keep the center when the map re-renders.
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    setBounds();
  }, []);

  // Load script
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // Show error if there was an error loading the script.
  if (loadError) return 'Error loading maps';

  const setBounds = () => {
    if (window.google && mapRef.current) {
      if (results.length > 1) {
        const bounds = results.reduce(
          (boundsObj, { location: { lat, lng } }) =>
            boundsObj.extend({ lat, lng }),
          new window.google.maps.LatLngBounds()
        );
        mapRef.current.fitBounds(bounds);
      } else if (results.length === 1) {
        const [
          {
            location: { lat, lng },
          },
        ] = results;
        setZoom(12);
        setCenter({ lat, lng });
      } else {
        const { lat, lng } = position;
        setZoom(12);
        setCenter({ lat, lng });
      }
    }
  };

  // Get the appropriate icon based on the type of the activity.
  const getIcon = (activity) => {
    switch (activity) {
      case 'Hiking':
        return './icons/hiking.svg';
      case 'Fishing':
        return './icons/fishing.svg';
      case 'Biking':
        return './icons/biking.svg';
      case 'Camping':
        return './icons/camping.svg';
      case 'Running':
        return './icons/running.svg';
      case 'Other':
        return './icons/compass.svg';
      default:
        return './icons/park.svg';
    }
  };

  useEffect(() => {
    setSelected({});
    setBounds();
  }, [results]);

  /**
   * the following use effect was supposed to query the server for events
   * every minutes and refresh the page, however, i couldn't figure out
   * how to make so the info window would no disappear
   */
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     updateEvents();
  //   }, 60000);
  //   return () => clearInterval(id);
  // }, []);

  // Render the map
  return isLoaded ? (
    <div>
      {/* when the map is clicked, add a pin to the 
      user pins state value */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={options}
        onClick={(event) =>
          setUserPins(() => [
            {
              name: 'Dropped Pin',
              location: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              },
              parkId: getKey(),
            },
          ])
        }
        onLoad={onMapLoad}
      >
        {/* map over results (array of parks or events) and
        add markers to map, when the marker is clicked, set selected
        state value to the clicked marker */}
        {results.map((item) => (
          <Marker
            key={getKey()}
            position={item.location}
            icon={{
              url: getIcon(item.activity),
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 35),
            }}
            onClick={() => {
              const {
                location: { lat, lng },
              } = item;
              onSelect(item, lat, lng);
            }}
          />
        ))}
        {/* if add favorite exists, you are on the search map,
        only add user pins to the search map, on click set selected
        state value to user pin */}
        {addFavorite &&
          userPins.map((pin) => (
            <Marker
              key={getKey()}
              position={pin.location}
              icon={{
                url: getIcon(pin.activity),
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 35),
              }}
              onClick={() => {
                onSelect(pin, pin.location.lat, pin.location.lng);
              }}
            />
          ))}
        {/*  if a location is selected, render a info window */}
        {selected.location && (
          <CustomInfoWindow
            selected={selected}
            setSelected={setSelected}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            user={user}
            register={register}
            unregister={unregister}
            removeEvent={removeEvent}
            addEvent={addEvent}
            toggleSearch={toggleSearch}
            updateEvents={updateEvents}
          />
        )}
        <></>
      </GoogleMap>
    </div>
  ) : (
    // Display loading message while the script loads the map.
    <h1>Loading Maps!</h1>
  );
};
export default Map;
