import path from 'path'
import axios from 'axios'
import { LoremIpsum, loremIpsum } from "lorem-ipsum";

const post = {
  userId: 10,
  id: 100,
  title: 'at nam consequatur ea labore ea harum',
  body: 'cupiditate quo est a modi nesciunt soluta\nipsa ' +
    'voluptas error itaque dicta in\nautem qui minus ' +
    'magnam et distinctio eum\naccusamus ratione error ' +
    'aut'
};

export default {
  getRoutes: async () => {
    // const { data: posts } = await axios.get(
    //   'https://jsonplaceholder.typicode.com/posts'
    // )

    let posts = new Array(9).fill(null);
    posts = posts.map((_, i) => ({ ...post, id: i, body: loremIpsum({count: 12, units: 'paragraphs', format: 'plain'}) }))
    

    return [
      {
        path: '/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          template: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
    ]
  },
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}
