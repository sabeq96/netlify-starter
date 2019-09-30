const path = require(`path`)
const loremIpsum = require("lorem-ipsum").loremIpsum;

const post = {
  userId: 10,
  id: 100,
  title: 'at nam consequatur ea labore ea harum',
  body: 'cupiditate quo est a modi nesciunt soluta\nipsa ' +
    'voluptas error itaque dicta in\nautem qui minus ' +
    'magnam et distinctio eum\naccusamus ratione error ' +
    'aut'
};

let posts = new Array(999).fill(null);
    posts = posts.map((_, i) => ({ ...post, id: i, body: loremIpsum({count: 12, units: 'paragraphs', format: 'plain'}) }))
    

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/Post.js`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  
    // Create blog post pages.
  posts.forEach(edge => {
    createPage({
      // Path for this page — required
      path: `${edge.id}`,
      component: blogPostTemplate,
      context: {
        post: edge,
      },
    })
  })
}