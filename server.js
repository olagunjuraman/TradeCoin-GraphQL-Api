const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const { getPrice } = require("./services");

//Load env vars
dotenv.config({
  path: "./config/config.env",
});


//Initialize express app
const app = express();

const root = {
  calculatePrice: getPrice,
};

const PORT  = process.env.PORT || 5000;

// GraphQL middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: root,
  })
);

const server = app.listen(PORT, 
    console.log(`The server is running on port ${PORT} `)
);

module.exports = server;
