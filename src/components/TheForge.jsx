import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Save, Trash2, Edit3, X, Check, Image as ImageIcon, Type, Tag, User, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TheForge = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingEntry, setEditingEntry] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Meditation',
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
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error) setEntries(data || []);
        setLoading(false);
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

        let error;
        if (editingEntry) {
            const { error: err } = await supabase
                .from('content')
                .update(payload)
                .eq('id', editingEntry.id);
            error = err;
        } else {
            const { error: err } = await supabase
                .from('content')
                .insert([{ ...payload, id: crypto.randomUUID() }]);
            error = err;
        }

        if (!error) {
            setIsFormOpen(false);
            setEditingEntry(null);
            resetForm();
            fetchEntries();
        } else {
            alert('Forge Error: ' + error.message);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Extinguish this transmission permanently?')) return;
        
        const { error } = await supabase
            .from('content')
            .delete()
            .eq('id', id);
        
        if (!error) fetchEntries();
    };

    const resetForm = () => {
        setFormData({
            title: '',
            category: 'Meditation',
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
    };

    const openCreateForm = () => {
        setEditingEntry(null);
        resetForm();
        setIsFormOpen(true);
    };

    const openEditForm = (entry) => {
        setEditingEntry(entry);
        setFormData({
            title: entry.title || '',
            category: entry.category || 'Meditation',
            author: entry.author || 'Vrindopnishad',
            description: entry.description || '',
            content_text: entry.content_text || '',
            english_translation: entry.english_translation || '',
            hindi_text: entry.hindi_text || '',
            sanskrit_text: entry.sanskrit_text || '',
            tags: Array.isArray(entry.tags) ? entry.tags.join(', ') : '',
            image_urls: Array.isArray(entry.image_urls) ? entry.image_urls.join(', ') : '',
            audio_url: entry.audio_url || '',
            is_premium: entry.is_premium || false
        });
        setIsFormOpen(true);
    };

    return (
        <div className="p-8 md:p-12 lg:p-20 bg-void min-h-screen text-text-main font-mono overflow-y-auto">
            <header className="flex items-center justify-between mb-16 border-b border-primary/20 pb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter text-white transition-all hover:text-primary">THE FORGE</h1>
                    <p className="text-xs text-text-muted mt-2 uppercase tracking-[0.3em]">Centralized Content Stream Controller</p>
                </div>
                <button 
                    onClick={openCreateForm}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-sm hover:bg-white hover:text-black transition-all active:scale-95 shadow-[0_0_20px_rgba(255,51,51,0.2)]"
                >
                    <Plus size={18} />
                    <span>NEW TRANSMISSION</span>
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
                                            <input 
                                                className="w-full bg-void-light border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white"
                                                value={formData.category}
                                                onChange={e => setFormData({...formData, category: e.target.value})}
                                            />
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

            <div className="grid grid-cols-1 gap-4">
                {loading && entries.length === 0 ? (
                    <div className="py-20 text-center animate-pulse text-text-muted uppercase tracking-widest">Synchronizing with the abyss...</div>
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
