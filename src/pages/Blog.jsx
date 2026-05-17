import { useContext, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import PostCard from '../components/PostCard';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const { posts } = useContext(BlogContext);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Kitchen', 'Tech', 'Home Decor'];

  let filteredPosts = filter === 'All' 
    ? posts 
    : posts.filter(post => post.category === filter);

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(lowerQuery) || 
      post.description.toLowerCase().includes(lowerQuery)
    );
  }

  if (sortBy === 'newest') {
    filteredPosts.sort((a, b) => b.id - a.id);
  } else if (sortBy === 'oldest') {
    filteredPosts.sort((a, b) => a.id - b.id);
  } else if (sortBy === 'likes') {
    filteredPosts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }

  return (
    <div>
      <h1 style={{ marginBottom: '10px' }}>Latest Finds</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        Browse our collection of the best products available on Amazon right now.
      </p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search finds..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '38px', width: '250px', borderRadius: '20px' }}
            />
          </div>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="form-control"
            style={{ width: '150px', borderRadius: '20px' }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>
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
