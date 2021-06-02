const { Event, User } = require('../database');
const { wrapAsync } = require('../helpers');

const getAllEvents = wrapAsync(async (req, res) => {
  const events = await Event.find();
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
        ...event._doc, // why ???
        owner: `${firstName} ${lastName}`,
        attendees: mappedAttendees,
      };
    })
  );
  res.send(mappedEvents);
});

const getUserEvents = wrapAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  const { createdEvents, registeredEvents } = user;
  res.send({ createdEvents, registeredEvents });
});

const addNewEvent = wrapAsync(async (req, res) => {
  const { userId } = req.params;
  const { eventName, locationName, lat, lng, time, description, isPublic } =
    req.body;
  const user = await User.findById(userId);
  const event = await new Event({
    eventName,
    locationName,
    location: { lat, lng },
    time,
    description,
    isPublic,
    attendees: [user._id],
    owner: user._id,
  }).save();
  user.createdEvents = [...new Set([...user.createdEvents, event])];
  user.registeredEvents = [...new Set([...user.registeredEvents, event])];
  await user.save();
  res.send(event);
});

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

const registerForEvent = wrapAsync(async (req, res) => {
  const { userId, eventId } = req.params;
  const user = await User.findById(userId);
  const event = await Event.findById(eventId);
  // why isnt this working?
  user.registeredEvents = [...new Set([...user.registeredEvents, event._id])];
  event.attendees = [...new Set([...event.attendees, user._id])];
  await user.save();
  await event.save();
  res.send(true);
});

const unregisterForEvent = wrapAsync(async (req, res) => {
  const { userId, eventId } = req.params;
  const user = await User.findById(userId);
  user.registeredEvents = [...user.registeredEvents].filter(
    (id) => id.toString() !== eventId
  );
  await user.save();
  res.send(true);
});

module.exports = {
  getAllEvents,
  getUserEvents,
  addNewEvent,
  removeEvent,
  registerForEvent,
  unregisterForEvent,
};
