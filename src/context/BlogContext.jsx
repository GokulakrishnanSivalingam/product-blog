import { createContext, useState, useEffect } from 'react';

export const BlogContext = createContext();

const LIKED_POSTS_KEY = 'affiliate_user_likes';

const loadUserLikedIds = () => {
  try {
    const raw = localStorage.getItem(LIKED_POSTS_KEY);
    if (!raw) return new Set();
    const ids = JSON.parse(raw);
    return new Set(Array.isArray(ids) ? ids : []);
  } catch {
    return new Set();
  }
};

const initialPosts = [
  {
    id: 1,
    title: "Top 5 Amazon Finds Under ₹999 - Kitchen Edition",
    description: "Upgrade your kitchen without breaking the bank! These smart kitchen gadgets will save you time and space. From a multi-functional vegetable chopper to a sleek digital scale, these are absolute must-haves.",
    images: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584269599540-022d2571253a?q=80&w=800&auto=format&fit=crop"
    ],
    link: "https://amazon.in",
    category: "Kitchen",
    likes: 12
  },
  {
    id: 2,
    title: "Minimalist Desk Setup: Productivity Boosters",
    description: "Create the ultimate workspace with these sleek tech gadgets. Featuring the best ergonomic mouse, a clean wireless mechanical keyboard, and a stylish monitor light bar.",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop"
    ],
    link: "https://amazon.in",
    category: "Tech",
    likes: 8
  },
  {
    id: 3,
    title: "Cozy Home Decor Essentials for Winter",
    description: "Transform your living room into a cozy haven. Check out these top-rated Amazon finds including chunky knit blankets, warm ambient lighting, and aesthetic vases.",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28ce8f30e9c?q=80&w=800&auto=format&fit=crop"
    ],
    link: "https://amazon.in",
    category: "Home Decor",
    likes: 15
  },
  {
    id: 4,
    title: "Smart Home Starter Kit on a Budget",
    description: "Automate your home easily with these affordable smart plugs, LED strips, and a mini smart speaker. Perfect for beginners entering the smart home ecosystem.",
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?q=80&w=800&auto=format&fit=crop"
    ],
    link: "https://amazon.in",
    category: "Tech",
    likes: 5
  }
];

export const BlogProvider = ({ children }) => {
  const [userLikedIds, setUserLikedIds] = useState(loadUserLikedIds);

  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('affiliate_posts');
    if (savedPosts) {
      try {
        const parsed = JSON.parse(savedPosts);
        // Simple migration: if the first post has imageUrl instead of images array,
        // it means we are using old data. Let's convert it or fallback to initialPosts.
        if (parsed.length > 0 && parsed[0].imageUrl && !parsed[0].images) {
          return initialPosts; // Or migrate it: parsed.map(p => ({...p, images: [p.imageUrl]}))
        }
        return parsed;
      } catch (e) {
        return initialPosts;
      }
    }
    return initialPosts;
  });

  useEffect(() => {
    localStorage.setItem('affiliate_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify([...userLikedIds]));
  }, [userLikedIds]);

  const addPost = (post) => {
    setPosts([{ ...post, id: Date.now(), likes: 0 }, ...posts]);
  };

  const deletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const hasUserLiked = (id) => userLikedIds.has(id);

  const toggleLike = (id) => {
    const alreadyLiked = userLikedIds.has(id);

    setUserLikedIds((prev) => {
      const next = new Set(prev);
      if (alreadyLiked) next.delete(id);
      else next.add(id);
      return next;
    });

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const count = p.likes || 0;
        return {
          ...p,
          likes: alreadyLiked ? Math.max(0, count - 1) : count + 1,
        };
      })
    );
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, deletePost, toggleLike, hasUserLiked }}>
      {children}
    </BlogContext.Provider>
  );
};
