import { useState, useContext } from 'react';
import { Heart } from 'lucide-react';
import { BlogContext } from '../context/BlogContext';

const LikeButton = ({ postId, likeCount = 0, size = 'md' }) => {
  const { toggleLike, hasUserLiked } = useContext(BlogContext);
  const liked = hasUserLiked(postId);
  const [animating, setAnimating] = useState(false);

  const handleLike = () => {
    const willLike = !liked;
    toggleLike(postId);
    if (willLike) {
      setAnimating(true);
      window.setTimeout(() => setAnimating(false), 650);
    }
  };

  const count = likeCount || 0;

  return (
    <button
      type="button"
      onClick={handleLike}
      className={`like-btn like-btn--${size}${liked ? ' like-btn--active' : ''}${animating ? ' like-btn--pop' : ''}`}
      aria-pressed={liked}
      aria-label={liked ? 'Remove your like' : 'Like this post'}
    >
      <span className="like-btn__heart" aria-hidden="true">
        <Heart size={size === 'lg' ? 20 : 18} strokeWidth={2} />
      </span>
      <span className="like-btn__label">
        <span key={count} className="like-btn__count">
          {count}
        </span>
        <span className="like-btn__text">
          {liked ? 'Liked' : count === 1 ? 'Like' : 'Likes'}
        </span>
      </span>
      {animating && <span className="like-btn__particles" aria-hidden="true" />}
    </button>
  );
};

export default LikeButton;
