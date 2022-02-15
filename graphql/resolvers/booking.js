const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");
const { singleEvent, transformBookingObj } = require("./utils");

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBookingObj(booking);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args) => {
    const booking = new Booking({
      user: args.bookingInput.userId,
      event: args.bookingInput.eventId,
    });
    try {
      const existingUser = await User.findOne({
        _id: args.bookingInput.userId,
      });
      const existingEvent = await Event.findOne({
        _id: args.bookingInput.eventId,
      });
      if (!existingUser) {
        throw "No user found";
      }
      if (!existingEvent) {
        throw "No event found";
      }
      const result = await booking.save();
      return transformBookingObj(result);
    } catch (err) {
      throw err;
    }
  },

  cancelBooking: async (args) => {
    try {
      const deletedBooking = await Booking.findOneAndDelete({
        _id: args.bookingId,
      });
      if (!deletedBooking) {
        throw "No booking found";
      }

      return singleEvent(deletedBooking._doc.event);
    } catch (err) {
      throw err;
    }
  },
};
