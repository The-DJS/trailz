import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import EventModal from './EventModal.jsx';

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
}) => {
  return (
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
        !selected.attendees.includes(`${user.firstName} ${user.lastName}`) ? (
          <>
            <button type="button" onClick={() => register(selected._id)}>
              Register
            </button>
          </>
        ) : null}
        {!addFavorite &&
        !removeFavorite &&
        selected.attendees.includes(`${user.firstName} ${user.lastName}`) ? (
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
  );
};

export default CustomInfoWindow;
