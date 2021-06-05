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
  EventActivityInfo,
  EventDateInfo,
  EventDescInfo,
  EventDescLineInfo,
  EventPubInfo,
  EventPrivInfo,
  EventAttendeesInfo,
} from '../../styles/infoWindowStyles.js';
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
}) => (
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
      {selected.eventName
      /**
       * Render event info or the name of the location.
       * Normal locations don't have an "event name" key.
       */
        ? (
          <div>
            <InfoTitle>{selected.eventName}</InfoTitle>
            <EventLocationInfo>{selected.locationName}</EventLocationInfo>
            <EventGroup>
              <LabelInfo>Owner:</LabelInfo>
              <EventOwnerInfo>{selected.owner}</EventOwnerInfo>
            </EventGroup>
            <EventGroup>
              <LabelInfo>Activity:</LabelInfo>
              <EventActivityInfo>{selected.activity}</EventActivityInfo>
            </EventGroup>
            <EventDateInfo>{moment(selected.time).format('ll')}</EventDateInfo>
            <EventDescInfo>
              {
                selected.description
                  .split('\n')
                  .map((line) => <EventDescLineInfo>{line}</EventDescLineInfo>)
              }
            </EventDescInfo>
            {selected.isPublic
              ? (
                <EventPubInfo>Public Event</EventPubInfo>
              )
              : (
                <EventPrivInfo>Private Event</EventPrivInfo>
              )}
            <EventGroup>
              <LabelInfo>Attendees:</LabelInfo>
              <EventAttendeesInfo>
                {selected.attendees.join(', ')}
              </EventAttendeesInfo>
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
          <EventModal
            location={selected}
            addFav={addFavorite}
            toggleSearch={toggleSearch}
            addEvent={addEvent}
          />
        )
        : null}
    </div>
  </InfoWindow>
);

export default CustomInfoWindow;
