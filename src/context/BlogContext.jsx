import { createContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  loadPosts,
  savePosts,
  isCloudSyncEnabled,
  getSyncMode,
} from '../services/postsStorage';

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
    title: 'Top 5 Amazon Finds Under ₹999 - Kitchen Edition',
    description:
      'Upgrade your kitchen without breaking the bank! These smart kitchen gadgets will save you time and space. From a multi-functional vegetable chopper to a sleek digital scale, these are absolute must-haves.',
    images: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584269599540-022d2571253a?q=80&w=800&auto=format&fit=crop',
    ],
    link: 'https://amazon.in',
    category: 'Kitchen',
    likes: 12,
  },
  {
    id: 2,
    title: 'Minimalist Desk Setup: Productivity Boosters',
    description:
      'Create the ultimate workspace with these sleek tech gadgets. Featuring the best ergonomic mouse, a clean wireless mechanical keyboard, and a stylish monitor light bar.',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop',
    ],
    link: 'https://amazon.in',
    category: 'Tech',
    likes: 8,
  },
  {
    id: 3,
    title: 'Cozy Home Decor Essentials for Winter',
    description:
      'Transform your living room into a cozy haven. Check out these top-rated Amazon finds including chunky knit blankets, warm ambient lighting, and aesthetic vases.',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583847268964-b28ce8f30e9c?q=80&w=800&auto=format&fit=crop',
    ],
    link: 'https://amazon.in',
    category: 'Home Decor',
    likes: 15,
  },
  {
    id: 4,
    title: 'Smart Home Starter Kit on a Budget',
    description:
      'Automate your home easily with these affordable smart plugs, LED strips, and a mini smart speaker. Perfect for beginners entering the smart home ecosystem.',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?q=80&w=800&auto=format&fit=crop',
    ],
    link: 'https://amazon.in',
    category: 'Tech',
    likes: 5,
  },
];

const initialCollections = [];

export const BlogProvider = ({ children }) => {
  const [userLikedIds, setUserLikedIds] = useState(loadUserLikedIds);
  const [posts, setPosts] = useState(initialPosts);
  const [collections, setCollections] = useState(initialCollections);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [syncMode] = useState(getSyncMode);
  const skipSave = useRef(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const loaded = await loadPosts(initialPosts);
      if (!cancelled) {
        setPosts(loaded);
        setLoading(false);
        skipSave.current = false;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify([...userLikedIds]));
  }, [userLikedIds]);

  useEffect(() => {
    if (skipSave.current || loading) return;

    const timer = setTimeout(async () => {
      setSaving(true);
      setSyncError(null);
      try {
        await savePosts(posts);
      } catch {
        setSyncError('Could not sync posts. Check your connection or JSONBin settings.');
      } finally {
        setSaving(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [posts, loading]);

  const refreshPosts = useCallback(async () => {
    setLoading(true);
    setSyncError(null);
    const loaded = await loadPosts(initialPosts);
    setPosts(loaded);
    setLoading(false);
  }, []);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, { ...newPost, id: prevPosts.length + 1 }]);
  };

  const deletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const addCollection = (newCollection) => {
    setCollections((prevCollections) => [...prevCollections, { ...newCollection, id: prevCollections.length + 1 }]);
  };

  const deleteCollection = (id) => {
    setCollections((prevCollections) => prevCollections.filter((collection) => collection.id !== id));
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
    <BlogContext.Provider
      value={{
        posts,
        collections,
        loading,
        saving,
        syncError,
        syncMode,
        cloudSyncEnabled: isCloudSyncEnabled(),
        refreshPosts,
        addPost,
        deletePost,
        addCollection,
        deleteCollection,
        toggleLike,
        hasUserLiked,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
