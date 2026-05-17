import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const Products = () => {
  const { collections } = useContext(BlogContext);

  return (
    <div className="products-page">
      <div className="container">
        <h1 style={{ marginBottom: '10px' }}>Product Collections</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          Browse our curated product collections and find the best deals.
        </p>

        {collections.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-lg)' }}>
            <h3>No collections available yet.</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Create collections in the admin panel to get started.</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '30px',
            padding: '20px 0'
          }}>
            {collections.map(collection => (
              <Link 
                key={collection.id} 
                to={`/collection/${collection.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="collection-card" style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}>
                  <img 
                    src={collection.thumbnail} 
                    alt={collection.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                    }}
                  />
                  
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>{collection.title}</h3>
                    <p style={{ 
                      color: 'var(--text-muted)', 
                      fontSize: '0.9rem',
                      marginBottom: '15px',
                      lineHeight: '1.5'
                    }}>
                      {collection.description}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      marginTop: '15px',
                      color: 'var(--primary)',
                      fontWeight: '500'
                    }}>
                      {collection.products ? `${collection.products.length} Products` : '0 Products'}
                      <span style={{ marginLeft: '5px' }}>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
