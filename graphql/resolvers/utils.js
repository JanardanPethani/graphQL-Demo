const DataLoader = require("dataloader");

const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

// Events Batching
const eventLoader = new DataLoader((eventIds) => {
  return events(eventIds);
});

// User Batching
const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const transformBookingObj = async (bookObj) => {
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
    // toString is used to convert object_id to a string for dataloader
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      createdEvents: () => eventLoader.loadMany(user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    // We have to sort output to match with dataloader everytime
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformEventObj(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId) => {
  try {
    // toString is used to convert object_id to a string for dataloader
    const event = await eventLoader.load(eventId.toString());
    return event;
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
