import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Persistent Cache Utility for DevDashboard Mobile
 * Implements TTL (Time To Live) and stale-while-revalidate pattern
 */

const CACHE_PREFIX = 'dev_nexus_cache_';
const DEFAULT_TTL = 1000 * 60 * 10; // 10 Minutes

export const cache = {
    /**
     * Store data in AsyncStorage with a timestamp
     */
    set: async (key, data, ttl = DEFAULT_TTL) => {
        try {
            // Pruning: Only cache essential fields for the HUD to save space
            let prunedData = data;
            if (Array.isArray(data) && data.length > 50) {
                prunedData = data.map(item => ({
                    id: item.id,
                    title: item.title,
                    source: item.source || item.category,
                    created_at: item.created_at,
                    stream: item.stream,
                    description: item.description?.substring(0, 100)
                }));
            }

            const entry = {
                data: prunedData,
                timestamp: Date.now(),
                expires: Date.now() + ttl
            };
            
            await AsyncStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
        } catch (e) {
            console.error('Mobile Cache Set Error:', e);
        }
    },

    /**
     * Retrieve data from AsyncStorage
     */
    get: async (key) => {
        try {
            const entryStr = await AsyncStorage.getItem(CACHE_PREFIX + key);
            if (!entryStr) return null;

            const entry = JSON.parse(entryStr);
            return entry.data;
        } catch (e) {
            return null;
        }
    },

    /**
     * Check if a cache entry is still valid
     */
    isValid: async (key) => {
        try {
            const entryStr = await AsyncStorage.getItem(CACHE_PREFIX + key);
            if (!entryStr) return false;

            const entry = JSON.parse(entryStr);
            return Date.now() < entry.expires;
        } catch (e) {
            return false;
        }
    },

    remove: async (key) => {
        await AsyncStorage.removeItem(CACHE_PREFIX + key);
    },

    clearAll: async () => {
        const keys = await AsyncStorage.getAllKeys();
        const nexusKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
        await AsyncStorage.multiRemove(nexusKeys);
    }
};
