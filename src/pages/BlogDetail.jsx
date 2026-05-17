import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';

const BlogDetail = () => {
  const { id } = useParams();
  const { posts } = useContext(BlogContext);
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <h2>Blog post not found</h2>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.image} alt={post.title} />
      <p>{post.content}</p>
      <a href={post.amazonLink} target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
    </div>
  );
};

export default BlogDetail;