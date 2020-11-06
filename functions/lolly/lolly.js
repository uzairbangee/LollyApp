const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb'),
  q = faunadb.query;
const shortid = require("shortid");
const client = new faunadb.Client({secret: process.env.FAUNADB_ADMIN_KEY});
const axios = require("axios");
const dotenv = require('dotenv');
dotenv.config();

const typeDefs = gql`
  type Query {
    allLollies: [Lolly!]
    lollyByPath(path: String!): Lolly!
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
    createLolly(name: String!, email: String!, phone: String!, address: String!, quantity: Int!, price: Int!, flavourTop: String!, flavourMiddle: String!, flavourBottom: String!) : Lolly
  }
`

const resolvers = {
  Query: {
    allLollies: async () => {
      try{
        const result = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection('lollies'))),
            q.Lambda(x => q.Get(x))
          )
        );
        console.log(result);
        
        return result.data.map(dt => (
          {
            ...dt.data
          }
        ))
      }
      catch(err){
        return err
      }
    },
    lollyByPath: async (_, {path}) => {
      try{
        console.log(path)
        const result = await client.query(
          q.Get(
            q.Match(q.Index("lolly_by_path"), path)
          )
        );

        console.log(result)
        
        return {
          id : result.ref.id,
          ...result.data
        }
      }
      catch(err){
        console.log(err)
      }
    }
  },
  Mutation : {
    createLolly : async (_, args) => {
      try{
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

        axios.post("https://api.netlify.com/build_hooks/5fa3d851489d2c4de8097f89")
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          })

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
