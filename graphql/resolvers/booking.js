const Event = require("../../models/event");
const Booking = require("../../models/booking");
const { singleEvent, transformBookingObj } = require("./utils");

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      // isAuth is coming from middleware
      throw new Error("Unauthenticated");
    }
    try {
      const bookings = await Booking.find();

      return bookings.map((booking) => {
        return transformBookingObj(booking);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      // isAuth is coming from middleware
      throw new Error("Unauthenticated");
    }
    const booking = new Booking({
      user: req.userId,
      event: args.eventId,
    });
    try {
      const existingBooking = await Booking.findOne({
        user: req.userId,
        event: args.eventId,
      });
      if (existingBooking) {
        throw "Already booked";
      }

      const existingEvent = await Event.findOne({
        _id: args.eventId,
      });

      if (!existingEvent) {
        throw "No event found";
      }
      const result = await booking.save();
      return transformBookingObj(result);
    } catch (err) {
      throw err;
    }
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      // isAuth is coming from middleware
      throw new Error("Unauthenticated");
    }
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
