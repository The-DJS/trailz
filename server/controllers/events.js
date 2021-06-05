const { Event, User } = require('../database');
const { wrapAsync } = require('../helpers');

/**
 * returns true if event does exist. returns false if event
 * does not exist. is invoked when user attempts to unregister
 * or register for an event. if the event no longer exists,
 * the register/unregister function returns.
 */
const doesEventExist = wrapAsync(async (req, res) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);
  res.send(event ? true : false);
});

/**
 * returns an array of events. in the database, attendees is an array
 * of object ids and owner is a object id. have to make nested requests
 * to the database to convert object ids to strings containing a first
 * name and a last name.
 */
const getAllEvents = wrapAsync(async (req, res) => {
  const events = await Event.find();
  if (events.length) {
    const mappedEvents = await Promise.all(
      events.map(async (event) => {
        const { firstName, lastName } = await User.findById(event.owner);
        const mappedAttendees = await Promise.all(
          event.attendees.map(async (attendeeId) => {
            const attendeeObj = await User.findById(attendeeId);
            return `${attendeeObj.firstName} ${attendeeObj.lastName}`;
          })
        );
        return {
          ...event._doc, // not sure why you have to do this
          owner: `${firstName} ${lastName}`,
          attendees: mappedAttendees,
        };
      })
    );
    return res.send(mappedEvents);
  }
  res.send(events);
});

/**
 * returns an object that contains two arrays. the first array contains
 * the object ids of all events a user has created. the second array
 * contains the object ids the user has registered. i believe this function
 * is no longer used.
 */
const getUserEvents = wrapAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  const { createdEvents, registeredEvents } = user;
  res.send({ createdEvents, registeredEvents });
});

/**
 * this callback creates an event. it extracts the user id from params and
 * the event information from the body. It creates the event. It also has
 * to update the user document and add the object id associated with the
 * new event to the created events and registered event arrays. It also has
 * to map over those events and convert the object ids to strings that contain
 * first and last names. I used [... new Set([])] to remove duplicates from
 * the arrays.
 */
const addNewEvent = wrapAsync(async (req, res) => {
  const { userId } = req.params;
  const {
    eventName,
    locationName,
    lat,
    lng,
    time,
    activity,
    description,
    isPublic,
  } = req.body;
  const user = await User.findById(userId);
  const event = await new Event({
    eventName,
    locationName,
    location: { lat, lng },
    time,
    description,
    activity,
    isPublic,
    attendees: [user._id],
    owner: user._id,
  }).save();
  user.createdEvents = [...new Set([...user.createdEvents, event])];
  user.registeredEvents = [...new Set([...user.registeredEvents, event])];
  await user.save();
  const formattedEvent = {
    ...event._doc,
    attendees: [`${user.firstName} ${user.lastName}`],
    owner: `${user.firstName} ${user.lastName}`,
  };
  res.send(formattedEvent);
});

/**
 * this callback removes events from the database. It also iterates
 * over every user and removes the event from their created and registered
 * events. this is a terrible function. it should instead find the event,
 * extract the attendees property, iterated over every user that is registered
 * for the event, and remove the event from their array. will implement,
 * if possible. responds with true to indicate removal successful.
 */
const removeEvent = wrapAsync(async (req, res) => {
  const { eventId } = req.params;
  await Event.findByIdAndDelete(eventId);
  const users = await User.find();
  for (let user of users) {
    user.registeredEvents = [...user.registeredEvents].filter(
      (id) => id.toString() !== eventId
    );
    user.createdEvents = [...user.createdEvents].filter(
      (id) => id.toString() !== eventId
    );
    await user.save();
  }
  res.send(true);
});

/**
 * this callback accepts the user id and the event id. it queries the
 * database for both. the user is added to the attendees array and the
 * event is added to the registered events array. returns true to
 * confirm the registration.
 */
const registerForEvent = wrapAsync(async (req, res) => {
  const { userId, eventId } = req.params;
  const user = await User.findById(userId);
  const event = await Event.findById(eventId);
  // why isnt this working? <- update: i believe it is now working
  user.registeredEvents = [...new Set([...user.registeredEvents, event._id])];
  event.attendees = [...new Set([...event.attendees, user._id])];
  await user.save();
  await event.save();
  res.send(true);
});

/**
 * callback finds the event based on event id and user based on
 * user id. updates the event so the user is no longer included in
 * the attendees list and the user so the event is no longer included
 * in the registered event list.
 */
const unregisterForEvent = wrapAsync(async (req, res) => {
  const { userId, eventId } = req.params;
  const user = await User.findById(userId);
  user.registeredEvents = [...user.registeredEvents].filter(
    (id) => id.toString() !== eventId
  );
  await user.save();
  const event = await Event.findById(eventId);
  event.attendees = [...event.attendees].filter(
    (id) => id.toString() !== userId
  );
  await event.save();
  res.send(true);
});

module.exports = {
  getAllEvents,
  getUserEvents,
  addNewEvent,
  removeEvent,
  registerForEvent,
  unregisterForEvent,
  doesEventExist,
};
