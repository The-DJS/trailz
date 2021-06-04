/* eslint-disable import/extensions */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { v4 as getKey } from 'uuid';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapStyles from '../styles/mapStyles';
import GOOGLE_MAPS_API_KEY from '../../../server/google-maps/API';
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
}) => {
  const setBounds = () => {
    if (window.google && mapRef.current) {
      if (results.length > 1) {
        const bounds = results.reduce(
          (boundsObj, { location: { lat, lng } }) => boundsObj.extend({ lat, lng }),
          new window.google.maps.LatLngBounds(),
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
  const { lat, lng } = position;
  const [center, setCenter] = useState({ lat, lng });
  const [zoom, setZoom] = useState(12);
  // Selected marker
  const [selected, setSelected] = useState({});
  const onSelect = (item, selectedLat, selectedLng) => {
    setCenter({ selectedLat, selectedLng });
    setSelected(item);
  };
  // Custom pins
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
  useEffect(() => {
    setSelected({});
    setBounds();
  }, [results]);
  // Render the map
  return isLoaded
    ? (
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={options}
          onClick={(event) => setUserPins(() => [
            {
              name: 'Dropped Pin',
              location: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              },
              parkId: getKey(),
            },
          ])}
          onLoad={onMapLoad}
        >
          {results.map((item) => (
            <Marker
              key={getKey()}
              position={item.location}
              // icon={{
              //   url: './camping.svg',
              // }}
              onClick={() => {
                const {
                  location: { lat, lng },
                } = item;
                onSelect(item, lat, lng);
              }}
            />
          ))}
          {addFavorite
          && userPins.map((pin) => (
            <Marker
              key={getKey()}
              position={pin.location}
              // icon={{
              //   url: '/camping.svg',
              // }}
              onClick={() => {
                const {
                  location: { lat, lng },
                } = pin;
                onSelect(pin, lat, lng);
              }}
            />
          ))}
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
            />
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
