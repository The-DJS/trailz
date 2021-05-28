/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import GOOGLE_MAPS_API_KEY from '../../../server/google-maps/API';

const containerStyle = {
  width: '90vw',
  height: '70vh',
};

const defaultCenter = {
  lat: 29.9706145,
  lng: -90.1077311,
};

const Map = () => {
  const points = [
    {
      name: 'Location 1',
      location: {
        lat: 29.9869849,
        lng: -90.0980445,
      },
    },
  ];

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
      >
        {
          points.map((item) => (
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
              <p>{selected.name}</p>
            </InfoWindow>
          )
        }
        <></>
      </GoogleMap>
    )
    : <h1>Loading Maps!</h1>;
};

export default Map;
//////working