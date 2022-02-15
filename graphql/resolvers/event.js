const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEventObj } = require("./utils");

module.exports = {
  // Fetch all events
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEventObj(event);
      });
    } catch (err) {
      throw err;
    }
  },

  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      createdBy: args.eventInput.createdBy,
    });
    let createdEvent;
    try {
      const createdBy = await User.findById(args.eventInput.createdBy);
      if (!createdBy) {
        throw new Error("User not found.");
      }

      const result = await event.save();
      createdEvent = transformEventObj(result);

      createdBy.createdEvents.push(event);
      await createdBy.save();

      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
};
