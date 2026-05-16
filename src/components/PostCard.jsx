import { ExternalLink, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';

const PostCard = ({ post, showLike = true }) => (
  <article className="post-card">
    <div className="post-image-container">
      <img src={post.images?.[0] ?? ''} alt={post.title} loading="lazy" />
    </div>
    <div className="post-content">
      <span className="post-card__category">{post.category}</span>
      <h3 className="post-title">{post.title}</h3>
      <p className="post-desc">{post.description}</p>
      {showLike && (
        <div className="post-actions">
          <LikeButton postId={post.id} likeCount={post.likes} />
        </div>
      )}
      <div className="post-cta-group">
        <Link
          to={`/product/${post.id}`}
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Read More <Info size={16} />
        </Link>
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Check Now <ExternalLink size={16} />
        </a>
      </div>
    </div>
  </article>
);

export default PostCard;
