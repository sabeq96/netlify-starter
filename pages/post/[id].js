import { useRouter } from 'next/router';

const Post = (props) => {
  const router = useRouter();
  console.log(router, props);

  return (
    <div>
      <h1>{router.query.id}</h1>
      <p>This is the blog post content.</p>
    </div>
  );
};

export default Post;