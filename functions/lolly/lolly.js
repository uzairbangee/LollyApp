const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb');
const q = faunadb.query;
const shortid = require("shortid");
const dotenv = require('dotenv');
dotenv.config();

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Lolly {
    name: String!
    email: String!
    phone: String!
    address: String!
    quantity: Int!
    price: Int!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    path: String!
  }

  type Mutation{
    createLolly(name: String!, email: String!, phone: String!, address: String!, quantity: Int!, price: Int!, flavourTop: String!,flavourMiddle: String!, flavourBottom: String!) : Lolly
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello, world!'
    }
  },
  Mutation : {
    createLolly : async (_, args) => {
      console.log('IN');
      try{
        console.log(args);
        const client = new faunadb.Client({secret: process.env.FAUNADB_ADMIN_KEY});
        const id = shortid.generate();
        
        const data = {
          ...args,
          path: id
        }

        const result = await client.query(
          q.Create(q.Collection("lollies"), {
            data: data
          })
        );

        return {
          id: result.ref.id,
          ...result.data
        }
      }
      catch(err){
        console.log(error)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
