/* eslint-disable */
import React from 'react';
import axios from 'axios';

const ActivityLog = ({ user, events }) => (
  <div>
    <div>
      {
        user.favoriteParks.map((activity, i) => <div key={i}>{activity}</div>)
      }
    </div>
    <div>
      {
        events.map((event, i) => event.activity !=='Camping' ? <div key={i}>{event.activity}</div> : null)
      }
    </div>
  </div>
);

export default ActivityLog;