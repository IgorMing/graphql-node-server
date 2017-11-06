const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: Int!
    name: String!
    age: Int
  }

  type Mutation {
    changeAge(id: Int!, age: Int!): User
  }

  type Query {
    users: [User]
    user(id: Int!): User
  }
`);

const USERS = [
  {
    id: 1,
    name: 'Igor',
    age: 24
  },
  {
    id: 2,
    name: 'Larissa',
    age: 20
  },
  {
    id: 3,
    name: 'Missão',
    age: 24
  },
];

// The root provides a resolver function for each API endpoint
var root = {
  users: () => USERS,

  user: ({ id }) => USERS.find((user) => user.id === id),

  changeAge: ({ id, age }) => {
    const user = USERS.find((user) => user.id === id);
    user.age = age;
    return user;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
