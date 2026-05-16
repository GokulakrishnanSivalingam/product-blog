import { ExternalLink, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      <div className="post-image-container">
        {/* Using the first image in the array as the thumbnail */}
        <img src={post.images && post.images.length > 0 ? post.images[0] : ''} alt={post.title} loading="lazy" />
      </div>
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-desc">{post.description}</p>
        <div style={{ marginTop: 'auto', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
};

export default PostCard;
