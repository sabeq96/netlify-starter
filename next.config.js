const loremIpsum = require("lorem-ipsum").loremIpsum;

module.exports = {
  exportPathMap: async function() {
    
    const paths = {
      '/': { page: '/' }
    };

    const post = {
      userId: 10,
      id: 0,
      title: 'at nam consequatur ea labore ea harum',
      body: ''
    };

    let posts = new Array(9).fill(null);
        posts = posts.map((_, i) => ({ ...post, id: i, body: loremIpsum({count: 12, units: 'paragraphs', format: 'plain'}) }))

    posts.forEach((singlePost) => {
      console.log(singlePost)
      paths[`/post/${singlePost.id}`] = { page: '/post/[id]', query: { post: singlePost } }
    });

    return paths;
  }
};