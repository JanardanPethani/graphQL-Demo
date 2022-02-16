const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { events } = require("./utils");

module.exports = {
  users: async (req) => {
    if (!req.isAuth) {
      // isAuth is coming from middleware
      throw new Error("Unauthenticated");
    }
    try {
      const users = await User.find();
      return users.map((user) => {
        return {
          ...user._doc,
          password: null,
          createdEvents: events.bind(this, user._doc.createdEvents),
        };
      });
    } catch (err) {
      throw err;
    }
  },

  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();
      return { ...result._doc, password: null };
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) throw new Error("Password does not match");

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "secretkey",
        {
          expiresIn: "1h",
        }
      );
      return {
        userId: user.id,
        token: token,
        tokenExpiration: 1,
      };
    } catch (err) {
      throw err;
    }
  },
};
