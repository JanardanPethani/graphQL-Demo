const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const isAuth = require("./middleware/auth");

const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.g4xm5.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then((res) => {
    console.log("Connected to Database");

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
