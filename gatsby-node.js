const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
        query {
            fauna {
                lollies {
                  data {
                    _id
                    path
                  }
                }
            }
        }
    `)

    console.log(result);

    result.data.fauna.lollies.data.map(dt => {
        createPage({
            path : `invoices/${dt.path}`,
            component: path.resolve(`./src/templates/invoice.tsx`),
            context: {
                lollypath: dt.path,
            },
        })
    })
}