/* eslint-disable import/extensions */
import React from 'react';
import moment from 'moment';
import { InfoWindow } from '@react-google-maps/api';
import {
  InfoButton,
  InfoTitle,
  LabelInfo,
  EventGroup,
  // Events
  EventLocationInfo,
  EventOwnerInfo,
  EventDateInfo,
  EventDescInfo,
  EventPubInfo,
  EventPrivInfo,
  EventAttendeesInfo,
} from '../styles/infoWindowStyles.js';
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
  toggleSearch,
}) => (
  <InfoWindow
    position={selected.location}
    clickable
    onCloseClick={() => setSelected({})}
    options={{
      pane: 'overlayLayer',
      pixelOffset: new google.maps.Size(0, -37),
      alignBottom: true,
    }}
  >
    <div className="map-info-window">
      {selected.eventName
        ? (
          <div>
            <title>Hello World!!</title>
            <InfoTitle>{selected.eventName}</InfoTitle>
            <EventLocationInfo>{selected.locationName}</EventLocationInfo>
            <EventGroup>
              <LabelInfo>Owner:</LabelInfo>
              <EventOwnerInfo>{selected.owner}</EventOwnerInfo>
            </EventGroup>
            <EventDateInfo>{moment(selected.time).format('ll')}</EventDateInfo>
            <EventDescInfo>{selected.description}</EventDescInfo>
            {selected.isPublic
              ? <EventPubInfo>Public Event</EventPubInfo>
              : <EventPrivInfo>Private Event</EventPrivInfo>}
            <EventGroup>
              <LabelInfo>Attendees:</LabelInfo>
              <EventAttendeesInfo>{selected.attendees.join(', ')}</EventAttendeesInfo>
            </EventGroup>
          </div>
        )
        : (
          <InfoTitle>{selected.name}</InfoTitle>
        )}
      {addFavorite && (
        <FavModal
          location={selected}
          addFav={addFavorite}
          toggleSearch={toggleSearch}
        />
      )}
      {addFavorite
        ? (
          <FavModal location={selected} addFav={addFavorite} />
        )
        : null}
      {removeFavorite && (
        <InfoButton type="button" onClick={() => removeFavorite(selected)}>
          Remove from favs
        </InfoButton>
      )}
      {!addFavorite
        && !removeFavorite
        && user
        && selected.attendees
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
        && user
        && selected.attendees
        && selected.attendees.includes(`${user.firstName} ${user.lastName}`)
        && selected.owner !== `${user.firstName} ${user.lastName}`
        ? (
          <InfoButton type="button" onClick={() => unregister(selected._id)}>
            Unregister
          </InfoButton>
        )
        : null}
      {!addFavorite
        && !removeFavorite
        && user
        && selected.owner
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
