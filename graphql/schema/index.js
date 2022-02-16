const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    createdBy: User!
}

type Booking {
    _id: ID!
   event: Event!
   user: User!
   createdAt: String!
   updatedAt: String!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
    createdBy: ID!
}

input UserInput {
    email: String!
    password: String!
}

input BookingInput {
    eventId: ID!
    userId: ID!
}

type RootQuery {
    events: [Event!]!
    users: [User!]!
    bookings: [Booking!]!
    login(email: String!, password:String!): AuthData!
}

type RootMutation{
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(bookingInput: BookingInput): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
