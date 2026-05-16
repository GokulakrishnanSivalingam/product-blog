import { useContext, useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import LikeButton from '../components/LikeButton';

const ProductDetail = () => {
  const { id } = useParams();
  const { posts } = useContext(BlogContext);

  const product = posts.find((p) => p.id.toString() === id);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (product?.images?.[0]) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  const relatedPosts = useMemo(() => {
    if (!product) return [];
    return posts.filter((p) => p.id !== product.id).slice(0, 3);
  }, [posts, product]);

  if (!product) {
    return (
      <div className="product-not-found" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Product not found!</h2>
        <Link to="/blog" className="btn btn-outline" style={{ marginTop: '20px' }}>
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <Link to="/blog" className="back-link">
        <ArrowLeft size={18} />
        Back to Finds
      </Link>

      <article className="product-detail">
        <div className="product-detail__gallery">
          <div className="product-detail__main-image">
            <img src={mainImage} alt={product.title} />
          </div>
          {product.images?.length > 1 && (
            <div className="product-detail__thumbs">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  className={`product-detail__thumb${mainImage === img ? ' product-detail__thumb--active' : ''}`}
                  onClick={() => setMainImage(img)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail__info">
          <span className="product-detail__category">{product.category}</span>
          <h1 className="product-detail__title">{product.title}</h1>

          <div className="product-detail__like">
            <LikeButton postId={product.id} likeCount={product.likes} />
          </div>

          <div className="product-detail__about">
            <h2>About this item</h2>
            <p>{product.description}</p>
          </div>

          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary product-detail__cta"
          >
            Check Price on Amazon <ExternalLink size={20} />
          </a>
          <p className="product-detail__disclaimer">
            *As an Amazon Associate we earn from qualifying purchases.
          </p>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="product-detail__related">
          <h2>You might also like</h2>
          <div className="related-list">
            {relatedPosts.map((post) => (
              <Link key={post.id} to={`/product/${post.id}`} className="related-item">
                <img src={post.images?.[0] ?? ''} alt={post.title} />
                <div>
                  <span>{post.category}</span>
                  <h3>{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
