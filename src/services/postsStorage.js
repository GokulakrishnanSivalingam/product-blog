const POSTS_JSON_PATH = '/posts.json';
const CACHE_KEY = 'affiliate_posts_cache';

const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;
const API_KEY = import.meta.env.VITE_JSONBIN_API_KEY;

export const isCloudSyncEnabled = () => Boolean(BIN_ID && API_KEY);

export const getSyncMode = () => {
  if (isCloudSyncEnabled()) return 'cloud';
  return 'shared';
};

const normalizePosts = (data) => {
  if (Array.isArray(data)) return data;
  if (data?.posts && Array.isArray(data.posts)) return data.posts;
  return null;
};

const migratePosts = (posts) => {
  if (!Array.isArray(posts) || posts.length === 0) return posts;
  if (posts[0].imageUrl && !posts[0].images) {
    return null;
  }
  return posts;
};

export async function loadPosts(fallback = []) {
  if (isCloudSyncEnabled()) {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/6a090d44c0954111d8349c27/latest`, {
        headers: { 'X-Master-Key': API_KEY },
      });
      if (res.ok) {
        const json = await res.json();
        const posts = migratePosts(normalizePosts(json.record));
        if (posts?.length) {
          localStorage.setItem(CACHE_KEY, JSON.stringify(posts));
          return posts;
        }
      }
    } catch {
      /* try fallbacks */
    }
  }

  try {
    const res = await fetch(`${POSTS_JSON_PATH}?t=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      const posts = migratePosts(normalizePosts(data));
      if (posts?.length) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(posts));
        return posts;
      }
    }
  } catch {
    /* try cache */
  }

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const posts = migratePosts(JSON.parse(cached));
      if (posts?.length) return posts;
    }
  } catch {
    /* ignore */
  }

  return fallback;
}

export async function savePosts(posts) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(posts));

  if (!isCloudSyncEnabled()) {
    return { ok: true, mode: 'shared' };
  }

  const res = await fetch(`https://api.jsonbin.io/v3/b/6a090d44c0954111d8349c27`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY,
    },
    body: JSON.stringify({ posts }),
  });

  if (!res.ok) {
    throw new Error('Could not save to cloud storage');
  }

  return { ok: true, mode: 'cloud' };
}
