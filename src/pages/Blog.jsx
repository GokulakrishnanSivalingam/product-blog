import { useContext, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import PostCard from '../components/PostCard';

const Blog = () => {
  const { posts } = useContext(BlogContext);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Kitchen', 'Tech', 'Home Decor'];

  const filteredPosts = filter === 'All' 
    ? posts 
    : posts.filter(post => post.category === filter);

  return (
    <div>
      <h1 style={{ marginBottom: '10px' }}>Latest Finds</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        Browse our collection of the best products available on Amazon right now.
      </p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '8px 16px', borderRadius: '20px' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-lg)' }}>
          <h3>No posts found for this category.</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Check back later for more updates!</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
