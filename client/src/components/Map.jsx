/* eslint-disable import/extensions */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { v4 as getKey } from 'uuid';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { mapStyles } from '../styles';
import GOOGLE_MAPS_API_KEY from '../../../server/google-maps/API';
import EventModal from './EventModal.jsx';

// The size of the map on the page
const containerStyle = {
  height: '50vh',
  width: '67vw',
  margin: '0 auto',
  // height: '87.8vh',
  // width: '100vw',
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
  // attending,
  // created,
}) => {
  const [center, setCenter] = useState({
    lat: position.lat,
    lng: position.lng,
  });

  const [zoom, setZoom] = useState(12);

  // Selected marker
  const [selected, setSelected] = useState({});

  const onSelect = (item, lat, lng) => {
    setCenter({ lat, lng });
    setSelected(item);
  };

  // Custom pins
  const [userPins, setUserPins] = useState([]);

  // Location references to keep the center when the map re-renders.
  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    if (results.length > 1) {
      const bounds = results.reduce(
        (boundsObj, { location: { lat, lng } }) =>
          boundsObj.extend({ lat, lng }),
        new window.google.maps.LatLngBounds()
      );
      mapRef.current.fitBounds(bounds);
    } else if (results.length === 1) {
      setZoom(12);
      setCenter({ lat: results[0].location.lat, lng: results[0].location.lng });
    }
  }, []);

  // Load script
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // Show error if there was an error loading the script.
  if (loadError) return 'Error loading maps';

  // Default location of the map.
  // const { lat, lng } = position;
  // const defaultCenter = { lat, lng };

  // useEffect(() => {
  //   setSelected({});
  // }, [results, userPins, addFavorite, removeFavorite, addEvent, removeEvent]);

  useEffect(() => {
    if (window.google) {
      setSelected({});
      if (results.length > 1) {
        const bounds = results.reduce(
          (boundsObj, { location: { lat, lng } }) =>
            boundsObj.extend({ lat, lng }),
          new window.google.maps.LatLngBounds()
        );
        const center = bounds.getCenter();
        setCenter({ lat: center.lat(), lng: center.lng() });
      }
      if (results.length === 1) {
        setZoom(12);
        setCenter({
          lat: results[0].location.lat,
          lng: results[0].location.lng,
        });
      }
      if (!results.length) {
        setZoom(12);
        setCenter({
          lat: position.lat,
          lng: position.lng,
        });
      }
    }
  }, [results]);

  useEffect(() => console.log(position), [position]);

  // Render the map
  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={options}
        onClick={(event) => {
          setUserPins((currentState) => [
            ...currentState,
            {
              name: 'Custom User Pin',
              location: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              },
              time: new Date(),
            },
          ]);
        }}
        onLoad={onMapLoad}
      >
        {results.map((item) => (
          <Marker
            key={getKey()}
            position={item.location}
            // icon={{
            //   url: './icons/hiking.svg',
            // }}
            onClick={() => onSelect(item, item.location.lat, item.location.lng)}
          />
        ))}
        {addFavorite &&
          userPins.map((pin) => (
            <Marker
              key={getKey()}
              position={pin.location}
              // icon={{
              //   url: '/camping.svg',
              // }}
              onClick={() => onSelect(pin, pin.location.lat, pin.location.lng)}
            />
          ))}
        {selected.location && (
          <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <div className="map-info-window">
              {selected.eventName ? (
                <div>
                  <p>{selected.locationName}</p>
                  <p>{selected.eventName}</p>
                  <p>{selected.time}</p>
                  <p>{selected.description}</p>
                  <p>{selected.isPublic}</p>
                  <p>{selected.attendees}</p>
                </div>
              ) : (
                <p>{selected.name}</p>
              )}
              {addFavorite && (
                <button type="button" onClick={() => addFavorite(selected)}>
                  Add to favs
                </button>
              )}
              {removeFavorite && (
                <button type="button" onClick={() => removeFavorite(selected)}>
                  Remove from favs
                </button>
              )}
              {!addFavorite &&
              !removeFavorite &&
              !selected.attendees.includes(
                `${user.firstName} ${user.lastName}`
              ) ? (
                <>
                  <button type="button" onClick={() => register(selected._id)}>
                    Register
                  </button>
                </>
              ) : null}
              {!addFavorite &&
              !removeFavorite &&
              selected.attendees.includes(
                `${user.firstName} ${user.lastName}`
              ) ? (
                <button type="button" onClick={() => unregister(selected._id)}>
                  Unregister
                </button>
              ) : null}
              {!addFavorite &&
              !removeFavorite &&
              selected.owner.includes(`${user.firstName} ${user.lastName}`) ? (
                <button type="button" onClick={() => removeEvent(selected._id)}>
                  Delete
                </button>
              ) : null}
              {addFavorite || removeFavorite ? (
                <EventModal location={selected} addEvent={addEvent} />
              ) : null}
            </div>
          </InfoWindow>
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
