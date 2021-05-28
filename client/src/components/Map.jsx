import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import GOOGLE_MAPS_API_KEY from '../../../server/google-maps/API';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 30.032996,
  lng: -89.882563,
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  return isLoaded
    ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    )
    : <></>;
}

export default Map;
