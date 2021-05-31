/* eslint-disable import/extensions */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef, useCallback } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import mapStyles from './mapStyles';
import GOOGLE_MAPS_API_KEY from '../../../server/google-maps/API';
import Modal from './Modal.jsx';

// The size of the map on the page
const containerStyle = {
  width: '90vw',
  height: '70vh',
};

// Default location of the map.
const defaultCenter = {
  lat: 29.9706145,
  lng: -90.1077311,
};

// Options of the render (disable default UI and custom styles)
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ results }) => {
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
  }, []);

  // Load script
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // Show error if there was an error loading the script.
  if (loadError) return 'Error loading maps';

  // Render the map
  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
        options={options}
        onClick={(event) => setUserPins((currentState) => [
          ...currentState,
          {
            name: 'Custom User Pin',
            location: {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            },
            time: new Date(),
          },
        ])}
        onLoad={onMapLoad}
      >
        {results.map((item) => (
          <Marker
            key={item.name}
            position={item.location}
            icon={{
              url: './camping.svg',
            }}
            onClick={() => onSelect(item)}
          />
        ))}
        {userPins.map((pin) => (
          <Marker
            key={pin.time.toISOString()}
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
              <button type="button">Add to favs</button>
              <Modal />
            </div>
          </InfoWindow>
        )}
        <></>
      </GoogleMap>
    </div>
  )
    : (
    // Display loading message while the script loads the map.
      <h1>Loading Maps!</h1>
    );
};

export default Map;
