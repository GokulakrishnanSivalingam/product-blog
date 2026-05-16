import { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import { ExternalLink, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { posts } = useContext(BlogContext);
  
  // Find the product by ID
  const product = posts.find(p => p.id.toString() === id);
  const [mainImage, setMainImage] = useState(product?.images[0] || '');

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Product not found!</h2>
        <Link to="/blog" className="btn btn-outline" style={{ marginTop: '20px' }}>
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 0' }}>
      <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: 'var(--text-muted)', fontWeight: '500' }}>
        <ArrowLeft size={18} /> Back to Finds
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
        
        {/* Images Section */}
        <div className="product-images">
          <img 
            src={mainImage} 
            alt={product.title} 
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '15px' }} 
          />
          
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
            {product.images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`${product.title} view ${index + 1}`}
                onClick={() => setMainImage(img)}
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'cover', 
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  border: mainImage === img ? '2px solid var(--primary)' : '2px solid transparent',
                  opacity: mainImage === img ? 1 : 0.7,
                  transition: 'var(--transition)'
                }} 
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="product-info" style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px', lineHeight: '1.3' }}>{product.title}</h1>
          
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: 'var(--radius-sm)', marginBottom: '30px', flex: '1' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>About this item</h3>
            <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              {product.description}
            </p>
          </div>

          <a 
            href={product.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ padding: '16px 32px', fontSize: '1.1rem', justifyContent: 'center' }}
          >
            Check Price on Amazon <ExternalLink size={20} />
          </a>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px' }}>
            *As an Amazon Associate we earn from qualifying purchases.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
