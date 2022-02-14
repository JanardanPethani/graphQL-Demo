module.exports = {
  // Fetch all events
  events: () => {
    return Event.find()
      .then((results) => {
        return results.map((event) => {
          return { ...event._doc };
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
    });
    return event
      .save()
      .then((result) => {
        return { ...result._doc };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },

  createUser: (args) => {
    return bcrypt
      .hash(args.userInput.password, 12)
      .then((hashedPass) => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPass,
        });
        return user.save();
      })
      .then((result) => {
        return { ...result._doc, password: null };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
};
