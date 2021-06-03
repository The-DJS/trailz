/* eslint-disable import/extensions */
import React from 'react';
import { InfoButton } from '../styles/infoWindowStyles.js';
import { InfoWindow } from '@react-google-maps/api';
import EventModal from './EventModal.jsx';
import FavModal from './FavModal.jsx';

const CustomInfoWindow = ({
  selected,
  setSelected,
  addFavorite,
  removeFavorite,
  user,
  register,
  unregister,
  removeEvent,
  addEvent,
}) => (
  <InfoWindow
    position={selected.location}
    clickable
    onCloseClick={() => setSelected({})}
    options={{
      pane: "overlayLayer",
      pixelOffset: new google.maps.Size(0, -45),
      alignBottom: true,
    }}
  >
    <div className="map-info-window">
      {selected.eventName
        ? (
          <div>
            <h5>{selected.locationName}</h5>
            <p>{selected.eventName}</p>
            <p>{selected.time}</p>
            <p>{selected.description}</p>
            <p>{selected.isPublic}</p>
            <p>{selected.attendees}</p>
          </div>
        )
        : (
          <h5>{selected.name}</h5>
        )}
      {addFavorite && (
        <FavModal location={selected} addFav={addFavorite} />
      )}
      {removeFavorite && (
        <InfoButton type="button" onClick={() => removeFavorite(selected)}>
          Remove from favs
        </InfoButton>
      )}
      {!addFavorite
        && !removeFavorite
        && !selected.attendees.includes(`${user.firstName} ${user.lastName}`)
        ? (
          <>
            <InfoButton type="button" onClick={() => register(selected._id)}>
              Register
            </InfoButton>
          </>
        )
        : null}
      {!addFavorite
        && !removeFavorite
        && selected.attendees.includes(`${user.firstName} ${user.lastName}`)
        ? (
          <InfoButton type="button" onClick={() => unregister(selected._id)}>
            Unregister
          </InfoButton>
        )
        : null}
      {!addFavorite
        && !removeFavorite
        && selected.owner.includes(`${user.firstName} ${user.lastName}`)
        ? (
          <InfoButton type="button" onClick={() => removeEvent(selected._id)}>
            Delete
          </InfoButton>
        )
        : null}
      {addFavorite || removeFavorite
        ? (
          <EventModal location={selected} addEvent={addEvent} />
        )
        : null}
    </div>
  </InfoWindow>
);

export default CustomInfoWindow;
