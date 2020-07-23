const { gql } = require('apollo-server-lambda');


const typeDefs = gql`
enum EventCatType {
    Education
    Wedding
    Party
    Religious
}


type Event {
    owner: Author!
    id : ID!
    name : String!
    startDate : String!
    endDate : String!
    PopulationRange : Int!
    eventCat : EventCatType!
    isDestroyed : Boolean
    totalReg : Int
    isVerified: Boolean
    Strict: Boolean
}

type Author {
  id: ID!
  name: String!
  email: String!
  events: [Event!]
 # avatar: String
 # events: [Event]!
}

type Query {
  me: Author
  Authors: [Author!]
  author(id: ID!): Author

  events: [Event!]!
  event(id: ID!): Event!
}

type Mutation {
  createEvent(
    name: String!
    eventCat: String!
    startDate: String!
    endDate: String!
    PopulationRange: Int!
  ): Event!
  
  deleteMessage(id: ID!): Boolean!
}`

module.exports= {typeDefs}