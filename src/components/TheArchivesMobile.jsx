import React from 'react';
import { Archive, CheckCircle, Circle } from 'lucide-react';

/**
 * TheArchivesMobile - High-Density Archival Interface.
 * Brutalist, industrial design for mobile data retrieval.
 */
const TheArchivesMobile = ({ items = [], onItemClick, categories = ['ALL'], selectedCategory = 'ALL', onCategoryChange, onLoadMore, isFetchingMore }) => {
    return (
        <div className="bg-black text-white font-mono min-h-screen flex flex-col pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 pt-4">
                <div className="flex justify-between items-center mb-4">
                     <div className="flex flex-col">
                        <span className="text-[9px] text-zinc-500 tracking-[0.3em] uppercase mb-1">// SYSTEM_ARCHIVE</span>
                        <h1 className="text-xl font-bold tracking-tighter uppercase leading-none font-display">VAULT_01</h1>
                    </div>
                    <Archive size={16} className="text-primary opacity-50" />
                </div>
                
                {/* Dynamic Category Tabs */}
                <div className="flex gap-4 px-0 overflow-x-auto no-scrollbar pb-3">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange && onCategoryChange(cat)}
                            className={`whitespace-nowrap text-[9px] tracking-widest uppercase px-3 py-1 border transition-all duration-200 ${selectedCategory === cat ? 'bg-white text-black border-white' : 'text-zinc-500 border-zinc-500/30'}`}
                        >
                            {cat.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </header>

            {/* Archive List */}
            <main className="flex-1 divide-y divide-white/5">
                {items.length > 0 ? (
                    items.map((item, idx) => (
                        <div
                            key={item.id || idx}
                            className={`px-4 py-6 cursor-pointer active:bg-primary/5 transition-colors group relative ${item.isRead ? 'opacity-40' : 'opacity-100'}`}
                            onClick={() => onItemClick && onItemClick(item)}
                        >
                            <div className="flex gap-4 items-start">
                                <div className="shrink-0 mt-1">
                                    {item.isRead ? <CheckCircle size={14} className="text-primary" /> : <Circle size={14} className="text-zinc-700" />}
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <h3 className={`text-base font-bold leading-tight tracking-tight uppercase group-active:text-primary transition-colors line-clamp-2 ${item.isRead ? 'line-through' : ''}`}>
                                        {item.title}
                                    </h3>
                                    <div className="flex justify-between items-center text-[9px] uppercase text-zinc-600">
                                        <div className="flex gap-3">
                                            <span>{item.date}</span>
                                            <span>[{item.readTime}m]</span>
                                        </div>
                                        <span className="tracking-widest">ID_{idx.toString().padStart(4, '0')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-10 text-center opacity-20 italic text-xs">Awaiting data decryption...</div>
                )}

                {/* Mobile Archive Sync Trigger */}
                <div className="p-6 flex flex-col items-center justify-center bg-zinc-900/10 border-t border-white/5">
                    <button 
                        onClick={onLoadMore}
                        disabled={isFetchingMore}
                        className={`w-full py-4 border border-zinc-500/30 text-[10px] uppercase tracking-[0.3em] font-bold transition-all active:bg-primary active:text-black ${isFetchingMore ? 'opacity-50 animate-pulse' : ''}`}
                    >
                        {isFetchingMore ? 'SYNCING_VAULT...' : '[ SYNC_EXTENDED_VAULT ]'}
                    </button>
                    <span className="mt-3 text-[8px] text-zinc-600 uppercase tracking-widest">
                        Archive: {items.length} Documents Restored
                    </span>
                </div>
            </main>

            {/* Floating Index Decor */}
            <div className="fixed right-2 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
                <div className="flex flex-col gap-1 items-end">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-8 h-[1px] bg-white"></div>
                    ))}
                    <span className="text-[8px] rotate-90 mt-4 origin-right">INDEX_MAP</span>
                </div>
            </div>
        </div>
    );
};

export default TheArchivesMobile;
