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
  updateEvents,
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
      {selected.eventName ? (
        /**
         * Render event info or the name of the location.
         * Normal locations don't have an "event name" key.
         */
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
            {selected.description.split('\n').map((line) => (
              <EventDescLineInfo>{line}</EventDescLineInfo>
            ))}
          </EventDescInfo>
          {selected.isPublic ? (
            <EventPubInfo>Public Event</EventPubInfo>
          ) : (
            <EventPrivInfo>Private Event</EventPrivInfo>
          )}
          <EventGroup>
            <div className="row">
              <div className="col-5">
                <LabelInfo>Attendees:</LabelInfo>
              </div>
              <div className="col-7" style={{ background: 'AliceBlue' }}>
                <div>
                  {selected.attendees.map((attendee) => (
                    <p
                      className="me-auto"
                      style={{ marginBottom: 0, paddingTop: 0 }}
                    >
                      {attendee.split(' ').reduce((str, name, index) => {
                        if (index !== 0) {
                          str = str + ' ' + name.slice(0, 1);
                        } else {
                          str = name;
                        }
                        return str;
                      }, '')}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </EventGroup>
        </div>
      ) : (
        <InfoTitle>{selected.name}</InfoTitle>
      )}
      {addFavorite && (
        <FavModal
          location={selected}
          addFav={addFavorite}
          toggleSearch={toggleSearch}
        />
      )}
      {/* show remove favorite button in favorites map only */}
      {removeFavorite && (
        <InfoButton type="button" onClick={() => removeFavorite(selected)}>
          Remove from favs
        </InfoButton>
      )}
      {/* show register in events map only and only if the event attendees
      array does not include the name of the user */}
      {!addFavorite &&
      !removeFavorite &&
      selected.attendees &&
      !selected.attendees.includes(`${user.firstName} ${user.lastName}`) ? (
        <>
          <InfoButton type="button" onClick={() => register(selected._id)}>
            Register
          </InfoButton>
          {/* <InfoButton type="button" onClick={updateEvents}>
            Refresh Events
          </InfoButton> */}
        </>
      ) : null}
      {/* show unregister in events map only and only if the event attendees
      array does include the name of the user */}
      {!addFavorite &&
      !removeFavorite &&
      selected.attendees &&
      selected.attendees.includes(`${user.firstName} ${user.lastName}`) &&
      selected.owner !== `${user.firstName} ${user.lastName}` ? (
        <>
          <InfoButton type="button" onClick={() => unregister(selected._id)}>
            Unregister
          </InfoButton>
          {/* <InfoButton type="button" onClick={updateEvents}>
            Refresh Events
          </InfoButton> */}
        </>
      ) : null}
      {/* only show delete if  the current user is the user who creatd the event */}
      {!addFavorite &&
      !removeFavorite &&
      selected.owner &&
      selected.owner.includes(`${user.firstName} ${user.lastName}`) ? (
        <InfoButton type="button" onClick={() => removeEvent(selected._id)}>
          Delete
        </InfoButton>
      ) : null}
      {/* only allow user to create event in search and favorites maps */}
      {addFavorite || removeFavorite ? (
        <EventModal
          location={selected}
          addFav={addFavorite}
          toggleSearch={toggleSearch}
          addEvent={addEvent}
        />
      ) : null}
    </div>
  </InfoWindow>
);

export default CustomInfoWindow;
