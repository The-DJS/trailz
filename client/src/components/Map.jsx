/* eslint-disable import/extensions */
/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import GOOGLE_MAPS_API_KEY from '../../../server/google-maps/API';
import Form from './Form.jsx';
import Search from './Search.jsx';

const containerStyle = {
  width: '90vw',
  height: '70vh',
};

const defaultCenter = {
  lat: 29.9706145,
  lng: -90.1077311,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ searchResults }) => {
  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };

  const [userPins, setUserPins] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return 'Error loading maps';

  return isLoaded
    ? (
      <div>
        <Search />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={12}
          options={options}
          onClick={(event) => setUserPins((currentState) => [...currentState, {
            name: 'Custom User Pin',
            location: {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            },
            time: new Date(),
          }])}
        >

          {
            searchResults.map((item) => (
              <Marker
                key={item.name}
                position={item.location}
                // icon={{
                //   url: '/park.svg',
                // }}
                onClick={() => onSelect(item)}
              />
            ))
          }
          {
            userPins.map((pin) => (
              <Marker
                key={pin.time.toISOString()}
                position={pin.location}
                // icon={{
                //   url: '/camping.svg',
                // }}
                onClick={() => onSelect(pin)}
              />
            ))
          }
          {
            selected.location
          && (
            <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <div className="map-info-window">
                <p>{selected.name}</p>
                <button type="button">Add to favs</button>
              </div>
            </InfoWindow>
          )
          }
          <></>
        </GoogleMap>
        <Form />
      </div>
    )
    : <h1>Loading Maps!</h1>;
};

export default Map;
