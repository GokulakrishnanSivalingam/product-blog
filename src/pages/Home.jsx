import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { BlogContext } from '../context/BlogContext';
import PostCard from '../components/PostCard';
import TrendingCard from '../components/TrendingCard';

const Home = () => {
  const { posts } = useContext(BlogContext);

  const featuredPosts = posts.slice(0, 3);

  const trendingPosts = useMemo(
    () => [...posts].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 4),
    [posts]
  );

  return (
    <div className="home-page">
      <section className="hero-section hero-section--enhanced">
        <span className="hero-badge">Amazon affiliate picks</span>
        <h1>Discover the Best Amazon Finds</h1>
        <p>
          Curated tech gadgets, kitchen essentials, and home decor — picked for you.
        </p>
        <div className="hero-actions">
          <Link to="/blog" className="btn btn-primary hero-cta">
            Explore all finds
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {trendingPosts.length > 0 && (
        <section className="home-section trending-section">
          <div className="section-header">
            <div>
              <span className="section-label">
                <TrendingUp size={16} />
                Trending now
              </span>
              <h2 className="section-heading">Popular finds</h2>
            </div>
            <Link to="/blog" className="btn btn-outline btn-sm">
              View all
            </Link>
          </div>
          <div className="trending-grid">
            {trendingPosts.map((post, index) => (
              <TrendingCard key={post.id} post={post} rank={index + 1} />
            ))}
          </div>
        </section>
      )}

      <section className="home-section">
        <div className="section-header">
          <h2 className="section-heading">Featured finds</h2>
          <Link to="/blog" className="btn btn-outline btn-sm">
            View all
          </Link>
        </div>
        <div className="posts-grid">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} showLike={false} />
          ))}
        </div>
      </section>

      <section className="home-cta-banner">
        <h2>Can&apos;t find what you need?</h2>
        <p>Browse our full collection of curated Amazon finds or get in touch.</p>
        <div className="home-cta-banner__actions">
          <Link to="/blog" className="btn btn-primary">
            See all finds
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
