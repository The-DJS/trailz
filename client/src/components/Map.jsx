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
import mapStyles from './mapStyles';
import GOOGLE_MAPS_API_KEY from '../../../server/google-maps/API';
import Form from './Form.jsx';
import Modal from './Modal.jsx';

// The size of the map on the page
const containerStyle = {
  width: '90vw',
  height: '70vh',
};

// Default location of the map.
// const defaultCenter = {
//   lat: 29.9706145,
//   lng: -90.1077311,
// };

// Options of the render (disable default UI and custom styles)
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ results, addFavorite, removeFavorite, position }) => {
  // Selected marker
  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };

  // Custom pins
  const [userPins, setUserPins] = useState([]);

  // Location references to keep the center when the map re-renders.
  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    const bounds = results.reduce(
      (boundsObj, { location: { lat, lng } }) => boundsObj.extend({ lat, lng }),
      new window.google.maps.LatLngBounds()
    );
    mapRef.current.fitBounds(bounds);
  }, []);

  // Load script
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // Show error if there was an error loading the script.
  if (loadError) return 'Error loading maps';

  // Default location of the map.
  const { lat, lng } = position;
  const defaultCenter = { lat, lng };

  // Render the map
  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
        options={options}
        onClick={(event) =>
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
          ])
        }
        onLoad={onMapLoad}
      >
        {results.map((item) => (
          <Marker
            key={getKey()}
            position={item.location}
            // icon={{
            //   url: '/park.svg',
            // }}
            onClick={() => onSelect(item)}
          />
        ))}
        {userPins.map((pin) => (
          <Marker
            key={getKey()}
            position={pin.location}
            // icon={{
            //   url: '/camping.svg',
            // }}
            onClick={() => onSelect(pin)}
          />
        ))}
        {selected.location && (
          <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <div className="map-info-window">
              <p>{selected.name}</p>
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
              <Modal />
            </div>
          </InfoWindow>
        )}
        <></>
      </GoogleMap>
      <Form />
    </div>
  ) : (
    // Display loading message while the script loads the map.
    <h1>Loading Maps!</h1>
  );
};

export default Map;
