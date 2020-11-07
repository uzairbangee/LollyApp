require("dotenv").config()

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: "Fauna",
        fieldName: "fauna",
        url: "https://graphql.fauna.com/graphql",
        headers: {
          Authorization: `Bearer ${process.env.FAUNADB_SECRET_KEY}`,
        }
      },
    },
  ],
}
