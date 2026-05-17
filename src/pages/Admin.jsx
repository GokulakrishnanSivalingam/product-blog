import { useState, useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import { Trash2, Cloud, RefreshCw, AlertCircle } from 'lucide-react';

const Admin = () => {
  const {
    posts,
    addPost,
    deletePost,
    addCollection,
    deleteCollection,
    collections,
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

  // Collection creation state
  const [collectionForm, setCollectionForm] = useState({
    title: '',
    thumbnail: '',
    description: ''
  });

  // Bulk product creation state
  const [bulkProductCount, setBulkProductCount] = useState(0);
  const [bulkProducts, setBulkProducts] = useState([]);
  const [showBulkSection, setShowBulkSection] = useState(false);

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

  const handleCollectionChange = (e) => {
    setCollectionForm({
      ...collectionForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCollectionSubmit = (e) => {
    e.preventDefault();
    
    // First create the collection
    const newCollection = {
      title: collectionForm.title,
      thumbnail: collectionForm.thumbnail,
      description: collectionForm.description,
      products: bulkProducts.filter(p => p.title && p.image && p.description && p.link)
    };
    
    addCollection(newCollection);
    
    // Reset forms
    setCollectionForm({
      title: '',
      thumbnail: '',
      description: ''
    });
    setBulkProductCount(0);
    setBulkProducts([]);
    setShowBulkSection(false);
    alert('Collection created successfully!');
  };

  // Bulk product creation handlers
  const handleBulkCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setBulkProductCount(count);
    
    // Initialize bulk products array with empty objects
    const newBulkProducts = Array.from({ length: count }, () => ({
      title: '',
      image: '',
      description: '',
      link: ''
    }));
    setBulkProducts(newBulkProducts);
  };

  const handleBulkProductChange = (index, field, value) => {
    const updatedProducts = [...bulkProducts];
    updatedProducts[index][field] = value;
    setBulkProducts(updatedProducts);
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

      {/* Collection Creation Section */}
      <div className="admin-container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ marginBottom: '0' }}>Create Collection</h2>
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={() => setShowBulkSection(!showBulkSection)}
          >
            {showBulkSection ? 'Hide' : 'Show'}
          </button>
        </div>
        
        {showBulkSection && (
          <form onSubmit={handleCollectionSubmit}>
            <div className="form-group">
              <label>Collection Title</label>
              <input 
                type="text" 
                name="title"
                className="form-control" 
                value={collectionForm.title} 
                onChange={handleCollectionChange}
                placeholder="e.g., Top 5 Trending Products"
                required
              />
            </div>

            <div className="form-group">
              <label>Thumbnail Image URL</label>
              <input 
                type="url" 
                name="thumbnail"
                className="form-control" 
                value={collectionForm.thumbnail} 
                onChange={handleCollectionChange}
                placeholder="https://..."
                required
              />
            </div>

            <div className="form-group">
              <label>Collection Description</label>
              <textarea 
                name="description"
                className="form-control" 
                value={collectionForm.description} 
                onChange={handleCollectionChange}
                required
                style={{ minHeight: '80px' }}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Number of Products</label>
              <input 
                type="number" 
                min="1" 
                max="20"
                className="form-control" 
                value={bulkProductCount} 
                onChange={handleBulkCountChange} 
                placeholder="Enter number (e.g., 5)"
              />
            </div>

            {bulkProducts.map((product, index) => (
              <div key={index} style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                marginBottom: '15px', 
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}>
                <h4 style={{ marginBottom: '10px' }}>Product {index + 1}</h4>
                
                <div className="form-group">
                  <label>Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={product.title} 
                    onChange={(e) => handleBulkProductChange(index, 'title', e.target.value)}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Image URL</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    value={product.image} 
                    onChange={(e) => handleBulkProductChange(index, 'image', e.target.value)}
                    placeholder="https://..."
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    className="form-control" 
                    value={product.description} 
                    onChange={(e) => handleBulkProductChange(index, 'description', e.target.value)}
                    required
                    style={{ minHeight: '60px' }}
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Link</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    value={product.link} 
                    onChange={(e) => handleBulkProductChange(index, 'link', e.target.value)}
                    placeholder="https://amazon.in/..."
                    required 
                  />
                </div>
              </div>
            ))}

            {bulkProducts.length > 0 && (
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                Create Collection with Products
              </button>
            )}
          </form>
        )}
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
