// import { GraphQLServer } from "graphql-yoga";
// ... or using `require()`
const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const configDB = require("./config/db");

mongoose.Promise = global.Promise;
mongoose.connect(configDB.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const resolvers = {
  Query,
  Mutation,
};

const options = {
  port: 8000,
  endpoint: "/graphql/api",
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: (req) => ({ ...req }),
  // context: ({ req }) => {
  //   // get the user token from the headers
  //   const token = req.headers.authorization || "";

  //   // try to retrieve a user with the token
  //   const user = getUser(token);
  //   if (!user) throw new AuthorizationError("you must be logged in");

  //   // add the user to the context
  //   return { user };
  // },
});
server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
);
