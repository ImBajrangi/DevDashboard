import React from 'react';
import { Radio } from 'lucide-react';

/**
 * TheFeedMobile - High-Density Transmission Feed.
 * Aligned with the Monolithic Interface strategy.
 */
const TheFeedMobile = ({ items = [], onItemClick, categories = ['ALL'], selectedCategory = 'ALL', onCategoryChange, onLoadMore, isFetchingMore }) => {
    return (
        <div className="bg-black text-white font-mono min-h-screen flex flex-col pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 pt-4 flex flex-col">
                <div className="px-4 pb-3 flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-primary tracking-[0.3em] uppercase mb-1">Transmission // Stream</span>
                        <h1 className="text-xl font-bold tracking-tighter uppercase leading-none font-display">DIRECTORY</h1>
                    </div>
                    <div className="text-[9px] text-zinc-500">
                        V.9.5.1
                    </div>
                </div>

                {/* Category Bar */}
                <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar pb-3 border-t border-white/5 pt-3">
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

            {/* Main feed list */}
            <main className="flex-1 divide-y divide-white/5">
                {items.length > 0 ? (
                    items.map((item, idx) => (
                        <article
                            key={item.id || idx}
                            className="px-4 py-4 cursor-pointer active:bg-primary/10 transition-colors group relative overflow-hidden"
                            onClick={() => onItemClick && onItemClick(item)}
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-start text-[9px] uppercase tracking-widest text-zinc-500">
                                    <span className="text-primary">[{item.source || 'TRANS'}]</span>
                                    <span>{item.date}</span>
                                </div>
                                
                                <h2 className="text-sm font-bold leading-tight tracking-tight uppercase group-active:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h2>

                                <div className="flex justify-between items-center text-[9px] uppercase text-zinc-400">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] opacity-40">Uplink</span>
                                            <span className="text-white">{item.author || 'NULL'}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] opacity-40">Clarity</span>
                                            <span className={parseInt(item.clarity) < 90 ? 'text-red-500' : 'text-primary'}>
                                                {item.clarity || '98.4%'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-20">
                                        <Radio size={10} />
                                        <span>LIVE</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="p-20 text-center text-xs opacity-20 italic">Scanning for signals...</div>
                )}

                {/* Mobile Archive Sync Trigger */}
                <div className="p-6 flex flex-col items-center justify-center bg-zinc-900/10">
                    <button 
                        onClick={onLoadMore}
                        disabled={isFetchingMore}
                        className={`w-full py-4 border border-zinc-500/30 text-[10px] uppercase tracking-[0.3em] font-bold transition-all active:bg-primary active:text-black ${isFetchingMore ? 'opacity-50 animate-pulse' : ''}`}
                    >
                        {isFetchingMore ? 'SYNCING_SIGNAL...' : '[ SYNC_NEXT_BATCH ]'}
                    </button>
                    <span className="mt-3 text-[8px] text-zinc-600 uppercase tracking-widest">
                        Coordinate: {items.length} Nodes Decrypted
                    </span>
                </div>
            </main>

            {/* Footer Background Decor */}
            <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
        </div>
    );
};

export default TheFeedMobile;
