const fs = require("fs");
const express = require("express");
//const serverless = require("serverless-http")

// const typeDefs = require("schema.graphql");
// const resolvers = require("resolvers.js");
// npm install uuid --save
// const uuidv4 = require("uuid/v4")
const { ApolloServer } = require("apollo-server");
const ApolloServerLampda = require("apollo-server-lambda").ApolloServer;

const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const GraphQLDate = new GraphQLScalarType({
  name: "GraphQLDate",
  description: "A Date() type in GraphQL as a scalar",
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const Author = {
  1: {
    id: 1,
    name: "Ukuejubola Kelvin",
    email: "ukuejubolakelvin@gmail.com",
    eventIds: [2],
  },
  2: {
    id: 2,
    name: "Kelvin Sekx",
    email: "kelvinsekx@gmail.com",
    eventIds: [1],
  },
};

let experimentDB = {
  1: {
    id: 1,
    ownerId: "1",
    name: "solaWedWunmi",
    eventCat: "Wedding",
    startDate: new Date("2020-03-12"),
    endDate: new Date("2020-03-22"),
    PopulationRange: 40,
    strict: true,
    isVerified: false,
    isDestroyed: false,
    totalReg: 10,
  },
  2: {
    id: 2,
    ownerId: "2",
    name: "wizzyConcert",
    eventCat: "Party",
    startDate: new Date("2020-05-12"),
    endDate: new Date("2020-06-22"),
    PopulationRange: 4000,
    strict: false,
    totalReg: 0,
    isVerified: true,
    isDestroyed: false,
  },
};

const resolvers = {
  Query: {
    Authors: () => {
      return Object.values(Author);
    },
    author,
    me: (parent, args, { me }) => {
      return me;
    },

    events: () => {
      return Object.values(experimentDB);
    },
    event: (parent, { id }) => {
      return experimentDB[id];
    },
  },
  Mutation: {
    createEvent: (
      parent,
      { name, eventCat, startDate, endDate, PopulationRange },
      { me }
    ) => {
      //uuidv4()
      const id = 21;
      const event = {
        ownerId: me.id,
        id,
        name,
        startDate,
        endDate,
        eventCat,
        PopulationRange,
        isDestroyed: false,
        totalReg: 0,
        isVerified: false,
        Strict: false,
      };

      experimentDB[id] = event;
      Author[me.id].eventIds.push(id);
      return event;
    },

    deleteMessage: (parent, { id }) => {
      const { [id]: event, ...otherEvents } = events;

      if (!message) {
        return false;
      }

      events = otherEvents;

      return true;
    },
  },

  Author: {
    events: (author) => {
      return Object.values(experimentDB).filter(
        (exDB) => exDB.ownerId == author.id
      );
    },
  },
  Event: {
    owner: (event) => {
      return Author[event.ownerId];
    },
  },
};

function author(parent, { id }) {
  return Author[id];
}
function productionServer(){
  return new ApolloServerLampda({
    typeDefs: fs.readFileSync("./src/schemas.graphql", "utf-8"),
    resolvers,
    introspection: true,
    playground: true,
    context: {
      me: Author[1],
    },
  });
};

function localServer(){
  return new ApolloServer({
    typeDefs: fs.readFileSync("./src/schemas.graphql", "utf-8"),
    resolvers,
    introspection: true,
    playground: true,
    context: {
      me: Author[1],
    },
  });
};


module.exports = {localServer, productionServer}
