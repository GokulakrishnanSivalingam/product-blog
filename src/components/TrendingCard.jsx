import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const TrendingCard = ({ post, rank }) => (
  <Link to={`/product/${post.id}`} className="trending-card">
    <span className="trending-card__rank">#{rank}</span>
    <div className="trending-card__image-wrap">
      <img src={post.images?.[0] ?? ''} alt={post.title} loading="lazy" />
      <span className="trending-card__badge">
        <TrendingUp size={14} />
        Hot
      </span>
    </div>
    <div className="trending-card__body">
      <span className="trending-card__category">{post.category}</span>
      <h3 className="trending-card__title">{post.title}</h3>
      <div className="trending-card__meta">
        <span className="trending-card__cta">View →</span>
      </div>
    </div>
  </Link>
);

export default TrendingCard;
