import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import GOOGLE_MAPS_API_KEY from '../../../server/google-maps/API';

const containerStyle = {
  width: '90vw',
  height: '70vh',
};

const center = {
  lat: 29.9706145,
  lng: -90.1077311,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return 'Error loading maps';

  return isLoaded
    ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    )
    : <h1>Loading Maps!</h1>;
};

export default Map;
