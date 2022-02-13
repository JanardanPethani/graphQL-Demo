const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const bodyParser = require('body-parser')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Event = require('./models/event')
const User = require('./models/user')
const port = 3000

const app = express()
app.use(bodyParser.json())
app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
            _id: ID!
            email: String!
            password: String
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

         input UserInput {
            email: String!
            password: String!
        }
        
        type RootQuery {
            events: [Event!]!
            users: [User!]!
        }

        type RootMutation{
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then((results) => {
            return results.map((event) => {
              return { ...event._doc }
            })
          })
          .catch((err) => {
            throw err
          })
      },
      createEvent: async (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        })
        return event
          .save()
          .then((result) => {
            return { ...result._doc }
          })
          .catch((err) => {
            console.log(err)
            throw err
          })
      },
      createUser: (args) => {
        return bcrypt
          .hash(args.userInput.password, 12)
          .then((hashedPass) => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPass,
            })
            return user.save()
          })
          .then((result) => {
            return { ...result._doc, password: null }
          })
          .catch((err) => {
            console.log(err)
            throw err
          })
      },
    },
    graphiql: true,
  })
)

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.g4xm5.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then((res) => {
    console.log('Connected to Database')

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})
