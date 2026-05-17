const POSTS_JSON_PATH = '/posts.json';
const CACHE_KEY = 'affiliate_posts_cache';
const COLLECTIONS_CACHE_KEY = 'affiliate_collections_cache';

// ✅ Hardcoded JSONBin config
const USE_CLOUD = true;

const BIN_ID = USE_CLOUD ? "6a090d44c0954111d8349c27" : null;
const API_KEY = USE_CLOUD ? "$2a$10$AiKWFsNTQPPp3UUZqGtkyudOEEnCKTtsDkkn02jrhKoW9iFm/GWsC" : null;

// ✅ Check if cloud sync is enabled
export const isCloudSyncEnabled = () => Boolean(BIN_ID && API_KEY);

// ✅ Mode helper
export const getSyncMode = () => {
  return isCloudSyncEnabled() ? 'cloud' : 'shared';
};

// ✅ Normalize data format
const normalizePosts = (data) => {
  if (Array.isArray(data)) return data;
  if (data?.posts && Array.isArray(data.posts)) return data.posts;
  return null;
};

// ✅ Migration (for old format)
const migratePosts = (posts) => {
  if (!Array.isArray(posts) || posts.length === 0) return posts;

  if (posts[0].imageUrl && !posts[0].images) {
    return null; // force fallback if old format detected
  }

  return posts;
};

// ✅ LOAD POSTS
export async function loadPosts(fallback = []) {
  // ☁️ 1. Try cloud
  if (isCloudSyncEnabled()) {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': API_KEY,
        },
      });

      if (res.ok) {
        const json = await res.json();
        const posts = migratePosts(normalizePosts(json.record));

        if (posts?.length) {
          localStorage.setItem(CACHE_KEY, JSON.stringify(posts));
          return posts;
        }
      }
    } catch (err) {
      console.warn("Cloud load failed:", err);
    }
  }

  // 📁 2. Try local shared file
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
  } catch (err) {
    console.warn("Local file load failed:", err);
  }

  return fallback;
}

// ✅ SAVE POSTS
export async function savePosts(posts) {
  if (isCloudSyncEnabled()) {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
        },
        body: JSON.stringify({ posts }),
      });

      if (!res.ok) {
        throw new Error('Failed to save posts to cloud');
      }
    } catch (err) {
      console.error('Failed to save posts to cloud:', err);
    }
  }

  // Save to local storage
  localStorage.setItem(CACHE_KEY, JSON.stringify(posts));
}

// ✅ LOAD COLLECTIONS
export async function loadCollections(fallback = []) {
  // ☁️ 1. Try cloud
  if (isCloudSyncEnabled()) {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': API_KEY,
        },
      });

      if (res.ok) {
        const json = await res.json();
        const collections = json.record?.collections;

        if (collections && Array.isArray(collections)) {
          localStorage.setItem(COLLECTIONS_CACHE_KEY, JSON.stringify(collections));
          return collections;
        }
      }
    } catch (err) {
      console.warn("Cloud load collections failed:", err);
    }
  }

  // 📁 2. Try local storage
  try {
    const cached = localStorage.getItem(COLLECTIONS_CACHE_KEY);
    if (cached) {
      const collections = JSON.parse(cached);
      if (Array.isArray(collections)) {
        return collections;
      }
    }
  } catch (err) {
    console.warn("Local storage load collections failed:", err);
  }

  return fallback;
}

// ✅ SAVE COLLECTIONS
export async function saveCollections(collections) {
  if (isCloudSyncEnabled()) {
    try {
      // First, load current data to preserve posts
      const currentRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': API_KEY,
        },
      });

      let currentData = {};
      if (currentRes.ok) {
        const json = await currentRes.json();
        currentData = json.record || {};
      }

      // Update with new collections while preserving posts
      const updatedData = {
        ...currentData,
        collections
      };

      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error('Failed to save collections to cloud');
      }
    } catch (err) {
      console.error('Failed to save collections to cloud:', err);
    }
  }

  // Save to local storage
  localStorage.setItem(COLLECTIONS_CACHE_KEY, JSON.stringify(collections));
}