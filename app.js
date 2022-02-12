const express = require("express");
const graphqlHTTP = require("express-graphql");
const bodyParser = require("body-parser");
const { buildSchema } = require("graphql");

const app = express();
