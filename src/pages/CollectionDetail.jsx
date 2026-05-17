import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import { ExternalLink } from 'lucide-react';

const CollectionDetail = () => {
  const { collections } = useContext(BlogContext);
  const { id } = useParams();
  
  const collection = collections.find(c => c.id === parseInt(id));

  if (!collection) {
    return (
      <div className="container">
        <h1>Collection Not Found</h1>
        <p style={{ color: 'var(--text-muted)' }}>This collection does not exist.</p>
      </div>
    );
  }

  return (
    <div className="collection-detail-page">
      <div className="container">
        {/* Collection Header */}
        <div style={{ marginBottom: '40px' }}>
          <img 
            src={collection.thumbnail} 
            alt={collection.title}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '20px'
            }}
          />
          <h1 style={{ marginBottom: '10px' }}>{collection.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            {collection.description}
          </p>
        </div>

        {/* Products Grid */}
        <h2 style={{ marginBottom: '20px' }}>Products in this Collection</h2>
        
        {collection.products && collection.products.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '30px',
            padding: '20px 0'
          }}>
            {collection.products.map((product, index) => (
              <div key={index} className="product-card" style={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                <img 
                  src={product.image} 
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
                
                <div style={{ padding: '20px' }}>
                  <h3 style={{ marginBottom: '10px', fontSize: '1.1rem' }}>{product.title}</h3>
                  <p style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: '0.9rem',
                    marginBottom: '15px',
                    lineHeight: '1.5'
                  }}>
                    {product.description}
                  </p>
                  
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      textDecoration: 'none',
                      padding: '8px 16px',
                      fontSize: '0.9rem',
                      width: '100%',
                      justifyContent: 'center'
                    }}
                  >
                    View Product
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-lg)' }}>
            <h3>No products in this collection yet.</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetail;
