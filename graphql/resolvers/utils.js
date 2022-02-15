const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const transformBookingObj = (bookObj) => {
  return {
    ...bookObj._doc,
    user: user.bind(this, bookObj._doc.user),
    event: singleEvent.bind(this, bookObj._doc.event),
    createdAt: dateToString(bookObj._doc.createdAt),
    updatedAt: dateToString(bookObj._doc.updatedAt),
  };
};

const transformEventObj = (eventObj) => {
  return {
    ...eventObj._doc,
    date: dateToString(eventObj._doc.date),
    createdBy: user.bind(this, eventObj._doc.createdBy),
  };
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEventObj(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return {
      ...event._doc,
      createdBy: user.bind(this, event._doc.createdBy),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  user,
  events,
  singleEvent,
  transformBookingObj,
  transformEventObj,
};
