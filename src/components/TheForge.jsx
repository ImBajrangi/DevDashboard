import React, { useState, useEffect } from 'react';
import { supabase, legacySupabase } from '../lib/supabase';
import { Save, Plus, X, Edit3, Trash2, Globe, FileText, Type, Hash, Link, Image as ImageIcon, Music, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cache } from '../lib/cache';

const TheForge = ({ categories = [], activeProject = 'ALL_SYSTEMS' }) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingEntry, setEditingEntry] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeStream, setActiveStream] = useState('content'); // 'content', 'blogvrinda', or 'journal_entries'
    
    // Helper to get the correct client based on the active stream
    const getClient = () => (activeStream === 'content' || activeStream === 'journal_entries') ? legacySupabase : supabase;
    
    // Filter out 'ALL' and 'MY_FEED' for selection
    const selectableCategories = categories.filter(c => c !== 'ALL' && c !== 'MY_FEED');

    const [formData, setFormData] = useState({
        title: '',
        category: selectableCategories[0] || 'General',
        author: 'Vrindopnishad',
        description: '',
        content_text: '',
        english_translation: '',
        hindi_text: '',
        sanskrit_text: '',
        tags: '',
        image_urls: '',
        audio_url: '',
        is_premium: false
    });

    useEffect(() => {
        const projectStreamMap = {
            'SANT_VAANI_PREMIUM': 'journal_entries',
            'VRINDA_BLOG': 'blogvrinda',
            'SPIRIT_DEV': 'content'
        };
        if (activeProject !== 'ALL_SYSTEMS' && projectStreamMap[activeProject]) {
            setActiveStream(projectStreamMap[activeProject]);
        }
    }, [activeProject]);

    useEffect(() => {
        fetchEntries();
    }, [activeStream]); // Refetch when stream changes

    const fetchEntries = async () => {
        // 1. Check Cache for Instant Render
        const cacheKey = `forge_${activeStream}`;
        const cachedEntries = cache.get(cacheKey);
        
        if (cachedEntries && cachedEntries.length > 0) {
            setEntries(cachedEntries);
            // We keep loading(true) for the background sync indicator
        } else {
            setLoading(true);
            setEntries([]);
        }
        
        try {
            // Use select('*') to be absolutely resilient against schema discrepancies. 
            // This ensures the admin list works regardless of which columns exist in production.
            let { data, error } = await getClient()
                .from(activeStream)
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50);
            
            // Note: No explicit fallback needed when using '*' as it only fetches existing columns.

            if (!error) {
                setEntries(data || []);
                // 2. Update Cache
                if (data) cache.set(cacheKey, data);
            } else {
                console.error('Forge Fetch Error:', error);
            }
        } catch (err) {
            console.error('Forge Fetch Exception:', err);
        } finally {
            setLoading(false);
        }
    };

    const invalidateCache = () => {
        cache.remove(`forge_${activeStream}`);
        cache.remove('global_feed'); // Also clear the main feed
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
            image_urls: formData.image_urls.split(',').map(u => u.trim()).filter(u => u),
            updated_at: new Date().toISOString()
        };

        // Add slug for blogVrinda if missing
        if (activeStream === 'blogvrinda') {
            payload.slug = formData.title.toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');
        }

        let error;
        if (editingEntry) {
            const { error: err } = await getClient()
                .from(activeStream)
                .update(payload)
                .eq('id', editingEntry.id);
            error = err;
        } else {
            const { error: err } = await getClient()
                .from(activeStream)
                .insert([{ ...payload, id: crypto.randomUUID() }]);
            error = err;
        }

        if (!error) {
            setIsFormOpen(false);
            setEditingEntry(null);
            resetForm();
            invalidateCache(); // Ensure fresh data
            fetchEntries();
        } else {
            alert('Forge Error: ' + error.message);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Extinguish this transmission permanently?')) return;
        
        const { error } = await getClient()
            .from(activeStream)
            .delete()
            .eq('id', id);
        
        if (!error) {
            invalidateCache(); // Ensure fresh data
            fetchEntries();
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            category: selectableCategories[0] || 'General',
            author: activeStream === 'blogvrinda' ? 'Vrindopnishad' : 'Anonymous',
            description: '',
            content_text: '',
            english_translation: '',
            hindi_text: '',
            sanskrit_text: '',
            tags: '',
            image_urls: '',
            audio_url: '',
            is_premium: false
        });
    };

    const openCreateForm = () => {
        setEditingEntry(null);
        resetForm();
        setIsFormOpen(true);
    };

    const handleEdit = async (entry) => {
        setLoading(true);
        try {
            // Fetch full record for editing
            const { data, error } = await getClient()
                .from(activeStream)
                .select('*')
                .eq('id', entry.id)
                .maybeSingle();

            if (data) {
                setEditingEntry(data);
                setFormData({
                    title: data.title || '',
                    category: data.category || '',
                    author: data.author || '',
                    description: data.description || '', // Added description
                    content_text: data.content_text || data.content || '',
                    english_translation: data.english_translation || '',
                    hindi_text: data.hindi_text || '',
                    sanskrit_text: data.sanskrit_text || data.sanskrit || '',
                    tags: (data.tags || []).join(', '),
                    image_urls: (data.image_urls || data.images || []).join(', '),
                    audio_url: data.audio_url || '',
                    is_premium: data.is_premium || false
                });
                setIsFormOpen(true);
            } else if (error) {
                console.error('Error fetching full entry for edit:', error);
            }
        } catch (err) {
            console.error('Error fetching full entry for edit:', err);
        } finally {
            setLoading(false);
        }
    };

    const openEditForm = (entry) => {
        handleEdit(entry);
    };

    return (
        <div className="p-8 md:p-12 lg:p-20 bg-void min-h-screen text-text-main font-mono overflow-y-auto">
            <header className="flex flex-col md:flex-row items-center justify-between mb-16 border-b border-primary/20 pb-8 gap-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter text-white transition-all hover:text-primary">THE FORGE</h1>
                    <p className="text-xs text-text-muted mt-2 uppercase tracking-[0.3em]">Centralized Content Stream Controller</p>
                </div>
                
                <div className="flex bg-void-light p-1 rounded-sm border border-white/5">
                    <button 
                        onClick={() => setActiveStream('content')}
                        className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all ${activeStream === 'content' ? 'bg-primary text-white shadow-[0_0_15px_rgba(255,51,51,0.2)]' : 'text-text-muted hover:text-white'}`}
                    >
                        DEV STREAM
                    </button>
                    <button 
                        onClick={() => setActiveStream('blogvrinda')}
                        className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all ${activeStream === 'blogvrinda' ? 'bg-primary text-white shadow-[0_0_15px_rgba(255,51,51,0.2)]' : 'text-text-muted hover:text-white'}`}
                    >
                        VRINDA STREAM
                    </button>
                    <button 
                        onClick={() => setActiveStream('journal_entries')}
                        className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all ${activeStream === 'journal_entries' ? 'bg-primary text-white shadow-[0_0_15px_rgba(255,51,51,0.2)]' : 'text-text-muted hover:text-white'}`}
                    >
                        PREMIUM STREAM
                    </button>
                </div>

                <button 
                    onClick={openCreateForm}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-sm hover:bg-white hover:text-black transition-all active:scale-95 shadow-[0_0_20px_rgba(255,51,51,0.2)]"
                >
                    <Plus size={18} />
                    <span>NEW {activeStream === 'blogvrinda' ? 'WISDOM' : activeStream === 'journal_entries' ? 'REFLECTION' : 'TRANSMISSION'}</span>
                </button>
            </header>

            <AnimatePresence>
                {isFormOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-void/90 backdrop-blur-xl"
                    >
                        <form 
                            onSubmit={handleSave}
                            className="bg-void border border-primary/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-10 relative custom-scroll shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            <button 
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="absolute top-6 right-6 text-text-muted hover:text-primary transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-2xl mb-10 flex items-center gap-3">
                                <Edit3 className="text-primary" />
                                {editingEntry ? 'MODIFY TRANSMISSION' : 'CREATE TRANSMISSION'}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-text-muted">Transmission Title</label>
                                        <input 
                                            required
                                            className="w-full bg-void-light border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white"
                                            value={formData.title}
                                            onChange={e => setFormData({...formData, title: e.target.value})}
                                            placeholder="Enter sacred title..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase text-text-muted">Sphere (Category)</label>
                                            <div className="flex flex-col gap-2">
                                                <input 
                                                    className="w-full bg-void-light border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white"
                                                    value={formData.category}
                                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                                    placeholder="Type or select..."
                                                />
                                                <div className="flex flex-wrap gap-2">
                                                    {selectableCategories.map(cat => (
                                                        <button
                                                            key={cat}
                                                            type="button"
                                                            onClick={() => setFormData({...formData, category: cat})}
                                                            className={`text-[8px] px-2 py-1 border transition-all ${formData.category === cat ? 'bg-primary border-primary text-white' : 'border-white/10 text-text-muted hover:border-white/30'}`}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase text-text-muted">Originator (Author)</label>
                                            <input 
                                                className="w-full bg-void-light border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white"
                                                value={formData.author}
                                                onChange={e => setFormData({...formData, author: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-text-muted">Brief Abstract (Description)</label>
                                        <textarea 
                                            rows={4}
                                            className="w-full bg-void-light border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white resize-none"
                                            value={formData.description}
                                            onChange={e => setFormData({...formData, description: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-text-muted">Audio Uplink (URL)</label>
                                        <input 
                                            className="w-full bg-void-light border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white"
                                            value={formData.audio_url}
                                            onChange={e => setFormData({...formData, audio_url: e.target.value})}
                                            placeholder="https://audio.vrindopnishad.in/..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-text-muted">Visual Fragments (URLs, comma separated)</label>
                                        <textarea 
                                            rows={2}
                                            className="w-full bg-void-light border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white resize-none"
                                            value={formData.image_urls}
                                            onChange={e => setFormData({...formData, image_urls: e.target.value})}
                                            placeholder="url1, url2..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-text-muted">Descriptors (Tags, comma separated)</label>
                                        <input 
                                            className="w-full bg-void-light border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white"
                                            value={formData.tags}
                                            onChange={e => setFormData({...formData, tags: e.target.value})}
                                            placeholder="meditation, silence, peace..."
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 pt-4">
                                        <input 
                                            type="checkbox"
                                            id="is_premium"
                                            className="size-4 accent-primary"
                                            checked={formData.is_premium}
                                            onChange={e => setFormData({...formData, is_premium: e.target.checked})}
                                        />
                                        <label htmlFor="is_premium" className="text-[10px] uppercase text-white font-bold tracking-widest cursor-pointer">Premium Access Protocol</label>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-text-muted">English Interpretation</label>
                                        <textarea 
                                            rows={6}
                                            className="w-full bg-void-light border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white resize-none"
                                            value={formData.english_translation || formData.content_text}
                                            onChange={e => setFormData({...formData, english_translation: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-text-muted">Hindi Original Script</label>
                                        <textarea 
                                            rows={4}
                                            className="w-full bg-void-light border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white resize-none"
                                            value={formData.hindi_text}
                                            onChange={e => setFormData({...formData, hindi_text: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-text-muted">Sanskrit original (Shlokas)</label>
                                        <textarea 
                                            rows={4}
                                            className="w-full bg-void-light border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white resize-none"
                                            value={formData.sanskrit_text}
                                            onChange={e => setFormData({...formData, sanskrit_text: e.target.value})}
                                            placeholder="यदा यदा हि धर्मस्य..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <footer className="flex justify-end gap-4 border-t border-white/10 pt-8">
                                <button 
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-8 py-3 text-sm text-text-muted hover:text-white transition-colors"
                                >
                                    CANCEL
                                </button>
                                <button 
                                    type="submit"
                                    className="px-10 py-3 bg-primary text-white flex items-center gap-2 hover:bg-white hover:text-black transition-all"
                                >
                                    <Save size={18} />
                                    FORGE ENTRY
                                </button>
                            </footer>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-4 relative">
                {loading && entries.length > 0 && (
                    <div className="absolute -top-12 right-0 flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-sm animate-pulse z-10">
                        <div className="size-2 bg-primary rounded-full animate-ping"></div>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-primary font-bold">Synchronizing Stream</span>
                    </div>
                )}
                
                {loading && entries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin shadow-[0_0_20px_rgba(255,51,51,0.3)]"></div>
                        <div className="text-[10px] text-text-muted uppercase tracking-[0.3em] animate-pulse">Synchronizing Stream...</div>
                    </div>
                ) : (
                    entries.map((entry) => (
                        <div key={entry.id} className="group bg-void-light border border-white/5 p-6 hover:border-primary/40 transition-all flex items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-sm">
                                    <Globe size={20} className="text-primary opacity-50" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[9px] bg-white/5 px-2 py-0.5 text-text-muted uppercase tracking-wider">{entry.category}</span>
                                        <span className="text-[9px] text-primary underline opacity-50">{new Date(entry.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors">{entry.title}</h3>
                                    <p className="text-xs text-text-muted line-clamp-1 mt-1 opacity-60">{entry.description || 'No abstract provided.'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => openEditForm(entry)}
                                    className="p-3 bg-white/5 text-text-muted hover:text-white hover:bg-primary transition-all"
                                >
                                    <Edit3 size={18} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(entry.id)}
                                    className="p-3 bg-white/5 text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TheForge;
