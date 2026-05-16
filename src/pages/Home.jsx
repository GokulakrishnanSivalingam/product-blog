import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import PostCard from '../components/PostCard';

const Home = () => {
  const { posts } = useContext(BlogContext);
  
  // Get just the latest 3 posts for the featured section
  const featuredPosts = posts.slice(0, 3);

  return (
    <div>
      <section className="hero-section">
        <h1>Discover the Best Amazon Finds</h1>
        <p>Curated tech gadgets, kitchen essentials, and home decor items you didn't know you needed.</p>
        <Link to="/blog" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
          Explore All Finds
        </Link>
      </section>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2>Featured Finds</h2>
          <Link to="/blog" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            View All
          </Link>
        </div>
        
        <div className="posts-grid">
          {featuredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
