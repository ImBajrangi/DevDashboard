/**
 * Persistent Cache Utility for DevDashboard
 * Implements TTL (Time To Live) and stale-while-revalidate pattern
 */

const CACHE_PREFIX = 'dev_forge_cache_';
const DEFAULT_TTL = 1000 * 60 * 10; // 10 Minutes

export const cache = {
    /**
     * Store data in localStorage with a timestamp
     * @param {string} key Unique identifier for the cache entry
     * @param {any} data The data to be cached
     * @param {number} ttl Time to live in milliseconds
     */
    set: (key, data, ttl = DEFAULT_TTL) => {
        try {
            // Pruning for Forge: Only cache essential list view fields to save space
            let prunedData = data;
            if (Array.isArray(data) && data.length > 50) {
                // If it's a large list, we only store what's needed for the dashboard list
                prunedData = data.map(item => ({
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    author: item.author,
                    created_at: item.created_at,
                    stream: item.stream,
                    description: item.description?.substring(0, 100) // Truncate long descriptions
                }));
            }

            const entry = {
                data: prunedData,
                timestamp: Date.now(),
                expires: Date.now() + ttl
            };
            
            const serialized = JSON.stringify(entry);
            localStorage.setItem(CACHE_PREFIX + key, serialized);
        } catch (e) {
            if (e.name === 'QuotaExceededError' || e.code === 22) {
                console.warn('Cache Quota Exceeded. Clearing old entries and retrying...');
                cache.clearAll(); // Emergency cleanup
                try {
                    // Try setting it again after clearing
                    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
                        data, 
                        timestamp: Date.now(), 
                        expires: Date.now() + ttl 
                    }));
                } catch (retryError) {
                    console.error('Cache Retry Failed:', retryError);
                }
            } else {
                console.error('Cache Set Error:', e);
            }
        }
    },

    /**
     * Retrieve data from localStorage
     * @param {string} key Unique identifier
     * @returns {any|null} The cached data or null if not found
     */
    get: (key) => {
        try {
            const entryStr = localStorage.getItem(CACHE_PREFIX + key);
            if (!entryStr) return null;

            const entry = JSON.parse(entryStr);
            return entry.data;
        } catch (e) {
            return null;
        }
    },

    /**
     * Check if a cache entry is still valid (not expired)
     * @param {string} key Unique identifier
     * @returns {boolean}
     */
    isValid: (key) => {
        try {
            const entryStr = localStorage.getItem(CACHE_PREFIX + key);
            if (!entryStr) return false;

            const entry = JSON.parse(entryStr);
            return Date.now() < entry.expires;
        } catch (e) {
            return false;
        }
    },

    /**
     * Remove a specific cache entry
     * @param {string} key 
     */
    remove: (key) => {
        localStorage.removeItem(CACHE_PREFIX + key);
    },

    /**
     * Clear all DevDashboard cache entries
     */
    clearAll: () => {
        Object.keys(localStorage)
            .filter(key => key.startsWith(CACHE_PREFIX))
            .forEach(key => localStorage.removeItem(key));
    }
};
