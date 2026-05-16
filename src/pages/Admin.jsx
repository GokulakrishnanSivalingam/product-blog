import { useState, useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import { Trash2, Cloud, RefreshCw, AlertCircle } from 'lucide-react';

const Admin = () => {
  const {
    posts,
    addPost,
    deletePost,
    loading,
    saving,
    syncError,
    syncMode,
    cloudSyncEnabled,
    refreshPosts,
  } = useContext(BlogContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: '', // We'll keep this as a string for the input field
    link: '',
    category: 'Kitchen'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Split the comma-separated string into an array and trim whitespace
    const imagesArray = formData.images
      .split(',')
      .map(img => img.trim())
      .filter(img => img !== '');

    addPost({
      ...formData,
      images: imagesArray
    });
    
    setFormData({
      title: '',
      description: '',
      images: '',
      link: '',
      category: 'Kitchen'
    });
    alert('Post added successfully!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className={`admin-sync-banner admin-sync-banner--${syncMode}`}>
        {cloudSyncEnabled ? (
          <>
            <Cloud size={18} />
            <span>
              <strong>Cloud sync on</strong> — posts are shared on every device.
              {saving && ' Saving…'}
            </span>
          </>
        ) : (
          <>
            <AlertCircle size={18} />
            <span>
              <strong>Shared file mode</strong> — everyone loads{' '}
              <code>public/posts.json</code>. Add JSONBin keys in <code>.env</code> (see{' '}
              <code>.env.example</code>) so admin edits sync to all devices.
            </span>
          </>
        )}
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={refreshPosts}
          disabled={loading}
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>
      {syncError && (
        <p className="admin-sync-error" role="alert">
          {syncError}
        </p>
      )}

      <div className="admin-container">
        <h2 style={{ marginBottom: '20px' }}>Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              name="title" 
              className="form-control" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              className="form-control" 
              value={formData.description} 
              onChange={handleChange} 
              required 
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Image URLs (comma-separated)</label>
            <textarea 
              name="images" 
              className="form-control" 
              value={formData.images} 
              onChange={handleChange} 
              placeholder="https://image1.jpg, https://image2.jpg, ..."
              required 
              style={{ minHeight: '80px' }}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Affiliate Link</label>
            <input 
              type="url" 
              name="link" 
              className="form-control" 
              value={formData.link} 
              onChange={handleChange} 
              placeholder="https://amazon.in/..."
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select 
              name="category" 
              className="form-control" 
              value={formData.category} 
              onChange={handleChange}
            >
              <option value="Kitchen">Kitchen</option>
              <option value="Tech">Tech</option>
              <option value="Home Decor">Home Decor</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Add Post
          </button>
        </form>
      </div>

      <div className="admin-posts-list admin-container" style={{ marginTop: '40px' }}>
        <h2 style={{ marginBottom: '20px' }}>Manage Posts</h2>
        {loading ? (
          <p>Loading posts…</p>
        ) : posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="admin-post-item">
              <img src={post.images && post.images.length > 0 ? post.images[0] : ''} alt={post.title} />
              <div className="admin-post-info">
                <h4>{post.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{post.category}</p>
              </div>
              <button 
                onClick={() => deletePost(post.id)} 
                className="btn btn-danger"
                style={{ padding: '8px 12px' }}
                title="Delete Post"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
