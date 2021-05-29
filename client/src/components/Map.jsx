/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import GOOGLE_MAPS_API_KEY from '../../../server/google-maps/API';

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

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return 'Error loading maps';

  return isLoaded
    ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
        options={options}
      >
        {
          searchResults.map((item) => (
            <Marker
              key={item.name}
              position={item.location}
              onClick={() => onSelect(item)}
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
                <button type="button">Add to favs</button>
                <p>{selected.name}</p>
              </div>
            </InfoWindow>
          )
        }
        <></>
      </GoogleMap>
    )
    : <h1>Loading Maps!</h1>;
};

export default Map;
