import React, { useState } from 'react';
import { ShieldCheck, Globe, Search, Share2, Activity, Zap, Save, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TheBeacon = ({ config = {}, onUpdate = () => {} }) => {
    const [localConfig, setLocalConfig] = useState({
        title: config.title || "The Feed - All Content | Deep Void",
        description: config.description || "A digital sanctuary for deep reading and archival silence.",
        keywords: config.keywords || "Vrindavan, Spirituality, Vedic Art, Paath, Divine Knowledge, Deep Reading",
        ogImage: config.ogImage || "https://vrindopnishad.in/og-image.jpg",
        twitterHandle: config.twitterHandle || "@vrindopnishad",
        analyticsId: config.analyticsId || "G-XXXXXXXXXX"
    });

    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            onUpdate(localConfig);
            setIsSaving(false);
            setLastSaved(new Date().toLocaleTimeString());
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-void text-text-main font-display p-6 md:p-12 lg:pl-32 pb-32 overflow-x-hidden">
            <header className="mb-12 border-b border-border-void pb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-3 h-3 bg-primary animate-pulse shadow-[0_0_12px_#FF3333]"></div>
                    <span className="font-mono text-[10px] tracking-[0.5em] text-primary uppercase font-bold">MODULE // BEACON_SEO</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">SEARCH_OPTIMIZER</h1>
                <p className="text-text-muted font-mono text-xs uppercase tracking-widest max-w-2xl">
                    Configure the digital footprint of the sanctuary. Align the pulse of the content with the global search matrix.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* CONFIGURATION COLUMN */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    {/* CORE META SECTION */}
                    <section className="border border-border-void p-6 bg-void-matte relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Globe size={120} strokeWidth={1} />
                        </div>
                        
                        <div className="flex items-center gap-3 mb-8 border-b border-border-void pb-4">
                            <Search size={18} className="text-primary" />
                            <h2 className="font-mono text-sm uppercase tracking-widest font-bold">CORE_METADATA</h2>
                        </div>

                        <div className="flex flex-col gap-6 relative z-10">
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em]">Meta Title</label>
                                <input 
                                    type="text"
                                    value={localConfig.title}
                                    onChange={(e) => setLocalConfig({...localConfig, title: e.target.value})}
                                    className="bg-void border border-border-void p-3 font-mono text-sm focus:border-primary outline-none transition-all focus:ring-1 focus:ring-primary/20"
                                />
                                <span className="font-mono text-[8px] text-right text-text-muted">{localConfig.title.length} / 60 Suggested</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em]">Meta Description</label>
                                <textarea 
                                    rows={3}
                                    value={localConfig.description}
                                    onChange={(e) => setLocalConfig({...localConfig, description: e.target.value})}
                                    className="bg-void border border-border-void p-3 font-mono text-sm focus:border-primary outline-none transition-all focus:ring-1 focus:ring-primary/20 resize-none"
                                />
                                <span className="font-mono text-[8px] text-right text-text-muted">{localConfig.description.length} / 160 Suggested</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em]">Keywords (CSV)</label>
                                <input 
                                    type="text"
                                    value={localConfig.keywords}
                                    onChange={(e) => setLocalConfig({...localConfig, keywords: e.target.value})}
                                    className="bg-void border border-border-void p-3 font-mono text-sm focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    {/* SOCIAL GRAPH SECTION */}
                    <section className="border border-border-void p-6 bg-void-matte">
                        <div className="flex items-center gap-3 mb-8 border-b border-border-void pb-4">
                            <Share2 size={18} className="text-primary" />
                            <h2 className="font-mono text-sm uppercase tracking-widest font-bold">SOCIAL_GRAPH_OG</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em]">OG Image URL</label>
                                <input 
                                    type="text"
                                    value={localConfig.ogImage}
                                    onChange={(e) => setLocalConfig({...localConfig, ogImage: e.target.value})}
                                    className="bg-void border border-border-void p-3 font-mono text-[11px] focus:border-primary outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em]">Twitter Handle</label>
                                <input 
                                    type="text"
                                    value={localConfig.twitterHandle}
                                    onChange={(e) => setLocalConfig({...localConfig, twitterHandle: e.target.value})}
                                    className="bg-void border border-border-void p-3 font-mono text-[11px] focus:border-primary outline-none"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* STATUS & ACTIONS COLUMN */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    {/* SYSTEMS STATUS */}
                    <section className="border border-primary/20 p-6 bg-primary/[0.02] flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-primary/10 pb-4">
                            <div className="flex items-center gap-3">
                                <Activity size={18} className="text-primary" />
                                <h2 className="font-mono text-sm uppercase tracking-widest font-bold text-primary">AUDIT_REALTIME</h2>
                            </div>
                            <span className="font-mono text-[8px] bg-primary text-void px-2 py-0.5 font-bold animate-pulse">MONITORING</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center bg-void/50 p-4 border border-border-void shadow-inner">
                                <span className="font-mono text-[10px] text-text-muted uppercase">Keyword Density</span>
                                <span className="font-mono text-xs font-bold text-green-500">OPTIMAL</span>
                            </div>
                            <div className="flex justify-between items-center bg-void/50 p-4 border border-border-void shadow-inner">
                                <span className="font-mono text-[10px] text-text-muted uppercase">Image_alt_tags</span>
                                <span className="font-mono text-xs font-bold text-yellow-500">92% SYNC</span>
                            </div>
                            <div className="flex justify-between items-center bg-void/50 p-4 border border-border-void shadow-inner">
                                <span className="font-mono text-[10px] text-text-muted uppercase">XML_Sitemap</span>
                                <span className="font-mono text-xs font-bold text-green-500">VALID</span>
                            </div>
                        </div>

                        <div className="mt-4 p-4 border border-border-void flex items-start gap-4 bg-void">
                            <AlertCircle size={20} className="text-yellow-500 shrink-0" />
                            <div>
                                <p className="font-mono text-[10px] text-text-main leading-tight mb-1">RECOMMENDATION // V-04</p>
                                <p className="font-mono text-[9px] text-text-muted leading-relaxed">Consider increasing 'Rasa' and 'Silence' keyword distribution by 2.4% for improved semantic alignment.</p>
                            </div>
                        </div>
                    </section>

                    {/* SAVE CONTROL */}
                    <div className="mt-auto border border-border-void p-8 bg-void-matte flex flex-col gap-4">
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`w-full py-4 bg-primary text-void font-bold font-mono tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 ${isSaving ? 'opacity-50 animate-pulse' : ''}`}
                        >
                            {isSaving ? <Zap size={18} className="animate-spin" /> : <Save size={18} />}
                            {isSaving ? 'UPLOADING_CHANGES...' : 'SAVE_LOCAL_CONFIG'}
                        </button>
                        {lastSaved && (
                            <span className="font-mono text-[9px] text-center text-primary uppercase opacity-60">
                                Last Synced: {lastSaved}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* PREVIEW FLOATING WIDGET */}
            <div className="fixed bottom-12 right-12 z-50 pointer-events-none">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-void border border-border-void shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-xs pointer-events-auto"
                >
                    <span className="font-mono text-[8px] text-text-muted uppercase mb-4 block">Search_Result_Preview</span>
                    <h4 className="text-[#1a0dab] text-lg font-mono leading-tight mb-1 truncate">{localConfig.title}</h4>
                    <p className="text-[#006621] text-xs font-mono mb-2">vrindopnishad.in › archives</p>
                    <p className="text-text-muted text-[11px] font-mono leading-relaxed line-clamp-2">{localConfig.description}</p>
                </motion.div>
            </div>
        </div>
    );
};

export default TheBeacon;
