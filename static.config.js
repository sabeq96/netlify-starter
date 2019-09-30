import path from 'path'
import fs from 'fs';
import klaw from 'klaw';
import matter from 'gray-matter';

function getPosts() {
  const items = [];

  const getFies = () => new Promise(resolve => {
    if(fs.existsSync('./src/static/posts')) {
      klaw('./src/static/posts')
        .on('data', item => {
          if(path.extname(item.path) === '.md') {
            const data = fs.readFileSync(item.path, 'utf8');
            const dataObj = matter(data);
            dataObj.data.slug = dataObj.data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            delete dataObj.orig;

            items.push(dataObj);
          }
        })
        .on('error', e => {
          console.error(e);
        })
        .on('end', () => {
          resolve(items);
        })
    } else {
      resolve(items);
    }
  });

  return getFies();
}

export default {
  getRoutes: async () => {
    const posts = await getPosts();
    // const posts = []


    return [
      {
        path: '/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.data.slug}`,
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
