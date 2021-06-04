/* eslint-disable import/extensions */
import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { InfoButton } from '../../styles/infoWindowStyles.js';
import EventModal from '../Modals/EventModal.jsx';
import FavModal from '../Modals/FavModal.jsx';

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
  toggleSearch,
}) => {
  return (
    <InfoWindow
      position={selected.location}
      clickable
      onCloseClick={() => setSelected({})}
      options={{
        pane: 'overlayLayer',
        pixelOffset: new google.maps.Size(0, -45),
        alignBottom: true,
      }}
    >
      <div className="map-info-window">
        {selected.eventName ? (
          <div>
            <h4>{selected.eventName}</h4>
            <h5>{selected.locationName}</h5>
            <h6>{selected.owner}</h6>
            <p>{selected.time}</p>
            <p>{selected.description}</p>
            {selected.isPublic ? <p>Public</p> : <p>Private</p>}
            <p>{selected.attendees.join(', ')}</p>
          </div>
        ) : (
          <h5>{selected.name}</h5>
        )}
        {addFavorite ? (
          <FavModal
            location={selected}
            addFav={addFavorite}
            toggleSearch={toggleSearch}
          />
        ) : null}
        {removeFavorite && (
          <InfoButton type="button" onClick={() => removeFavorite(selected)}>
            Remove from favs
          </InfoButton>
        )}
        {!addFavorite &&
        !removeFavorite &&
        user &&
        selected.attendees &&
        !selected.attendees.includes(`${user.firstName} ${user.lastName}`) ? (
          <>
            <InfoButton type="button" onClick={() => register(selected._id)}>
              Register
            </InfoButton>
          </>
        ) : null}
        {!addFavorite &&
        !removeFavorite &&
        user &&
        selected.attendees &&
        selected.attendees.includes(`${user.firstName} ${user.lastName}`) &&
        selected.owner !== `${user.firstName} ${user.lastName}` ? (
          <InfoButton type="button" onClick={() => unregister(selected._id)}>
            Unregister
          </InfoButton>
        ) : null}
        {!addFavorite &&
        !removeFavorite &&
        user &&
        selected.owner &&
        selected.owner.includes(`${user.firstName} ${user.lastName}`) ? (
          <InfoButton type="button" onClick={() => removeEvent(selected._id)}>
            Delete
          </InfoButton>
        ) : null}
        {addFavorite || removeFavorite ? (
          <EventModal
            location={selected}
            addEvent={addEvent}
            toggleSearch={toggleSearch}
          />
        ) : null}
      </div>
    </InfoWindow>
  );
};

export default CustomInfoWindow;
