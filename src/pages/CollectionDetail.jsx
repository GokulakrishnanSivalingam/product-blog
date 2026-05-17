import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import { ExternalLink } from 'lucide-react';
import './CollectionDetail.css';

const CollectionDetail = () => {
  const { collections } = useContext(BlogContext);
  const { id } = useParams();
  
  const collection = collections.find(c => c.id === parseInt(id));

  if (!collection) {
    return (
      <div className="collection-detail-not-found">
        <h1>Collection Not Found</h1>
        <p>This collection does not exist.</p>
      </div>
    );
  }

  return (
    <div className="collection-detail-page">
      <div className="collection-detail-container">
        {/* Collection Header */}
        <div className="collection-header">
          <img 
            src={collection.thumbnail} 
            alt={collection.title}
            className="collection-thumbnail"
          />
          <h1 className="collection-title">{collection.title}</h1>
          <p className="collection-description">{collection.description}</p>
        </div>

        {/* Products List - Single Page Format */}
        <h2 className="products-section-title">Products in this Collection</h2>
        
        {collection.products && collection.products.length > 0 ? (
          <div className="products-list">
            {collection.products.map((product, index) => (
              <div key={index} className="product-item">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="product-image"
                />
                
                <div className="product-content">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary product-link"
                  >
                    View Product
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No products in this collection yet.</h3>
            <p>Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetail;
