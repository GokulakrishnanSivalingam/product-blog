import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import './Products.css';

const Products = () => {
  const { collections } = useContext(BlogContext);

  return (
    <div className="products-page">
      <div className="products-container">
        <h1 className="products-page-title">Product Collections</h1>
        <p className="products-page-subtitle">
          Browse our curated product collections and find the best deals.
        </p>

        {collections.length === 0 ? (
          <div className="empty-collections">
            <h3>No collections available yet.</h3>
            <p>Create collections in the admin panel to get started.</p>
          </div>
        ) : (
          <div className="collections-grid">
            {collections.map(collection => (
              <Link 
                key={collection.id} 
                to={`/collection/${collection.id}`}
                className="collection-link"
              >
                <div className="collection-card">
                  <img 
                    src={collection.thumbnail} 
                    alt={collection.title}
                    className="collection-card-image"
                  />
                  
                  <div className="collection-card-content">
                    <h3 className="collection-card-title">{collection.title}</h3>
                    <p className="collection-card-description">
                      {collection.description}
                    </p>
                    
                    <div className="collection-card-footer">
                      {collection.products ? `${collection.products.length} Products` : '0 Products'}
                      <span className="arrow-icon">→</span>
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
