import React from 'react';
import { Wifi, Filter, Activity, Zap, Shield, Database, Radio } from 'lucide-react';

/**
 * TheNexusMobile - High-Density Monolithic Interface.
 * Optimized for mobile data visualization with a brutalist/industrial aesthetic.
 */
const TheNexusMobile = ({ onItemClick, items = [], categories = ['ALL'], selectedCategory = 'ALL', onCategoryChange }) => {
    // Current timestamp for the 'Sacred Terminal' look
    const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-primary selection:text-black pb-20">
            {/* 1. TOP TELEMETRY BAR */}
            <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 flex flex-col pt-3">
                <div className="px-4 pb-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary animate-pulse"></div>
                        <span className="text-[10px] tracking-widest text-primary font-bold">VRINDA_SYS : CORE_01</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] text-zinc-500">{currentTime}</span>
                        <Wifi size={14} className="text-primary" />
                    </div>
                </div>

                {/* Dynamic Category Bar */}
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

            <main className="flex flex-col">
                {/* 2. GLOBAL METRICS (Dense 3-Column Grid) */}
                <section className="grid grid-cols-3 border-b border-white/10 bg-zinc-900/20">
                    <div className="p-3 border-r border-white/10 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 opacity-40">
                            <Activity size={10} />
                            <span className="text-[8px] uppercase tracking-tighter">Depth</span>
                        </div>
                        <span className="text-lg font-bold tracking-tighter text-white">104<span className="text-[10px] ml-0.5 opacity-50 font-normal">km</span></span>
                    </div>
                    <div className="p-3 border-r border-white/10 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 opacity-40">
                            <Zap size={10} />
                            <span className="text-[8px] uppercase tracking-tighter">Latency</span>
                        </div>
                        <span className="text-lg font-bold tracking-tighter text-primary">0.9<span className="text-[10px] ml-0.5 opacity-50 font-normal">ms</span></span>
                    </div>
                    <div className="p-3 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 opacity-40">
                            <Shield size={10} />
                            <span className="text-[8px] uppercase tracking-tighter">Sync %</span>
                        </div>
                        <span className="text-lg font-bold tracking-tighter text-white">99.2</span>
                    </div>
                </section>

                {/* 3. TRANSMISSION STREAM (Real Data) */}
                <section className="flex flex-col">
                    <div className="px-4 py-4 bg-zinc-900/40 border-b border-white/10 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Radio size={14} className="text-primary" />
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] font-display">Transmission_Stream</h2>
                        </div>
                        <span className="text-[9px] text-zinc-500 bg-white/5 px-1.5 py-0.5 border border-white/10">LIVE_FEED</span>
                    </div>

                    <div className="divide-y divide-white/5">
                        {items.length > 0 ? items.map((item, idx) => (
                            <div 
                                key={item.id || idx}
                                onClick={() => onItemClick && onItemClick(item)}
                                className="px-4 py-4 active:bg-primary/10 transition-colors group relative overflow-hidden"
                            >
                                {/* Background Accent Flash on certain items */}
                                {idx % 5 === 0 && <div className="absolute top-0 left-0 w-1 h-full bg-primary/40"></div>}
                                
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-zinc-500 flex items-center gap-1.5 mb-1">
                                            <span className="text-primary">[{item.source || 'SYS'}]</span>
                                            {item.date} // {idx.toString().padStart(4, '0')}
                                        </span>
                                        <h3 className="text-sm font-bold leading-snug uppercase tracking-tight group-active:text-primary transition-colors pr-8 overflow-hidden line-clamp-2">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className="flex flex-col items-end shrink-0">
                                        <span className={`text-[10px] font-bold ${parseInt(item.clarity) < 90 ? 'text-red-500' : 'text-zinc-300'}`}>
                                            {item.clarity || '98.2%'}
                                        </span>
                                        <span className="text-[8px] text-zinc-600 uppercase">Clarity</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-[2px] bg-white/5 overflow-hidden">
                                        <div 
                                            className={`h-full ${parseInt(item.clarity) < 85 ? 'bg-red-500' : 'bg-primary/40'}`} 
                                            style={{ width: `${item.clarity || 95}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-[8px] text-zinc-400 uppercase tracking-widest">{item.category}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="p-10 text-center opacity-20 italic text-xs">Waiting for uplink...</div>
                        )}
                    </div>
                </section>

                {/* 4. SYSTEM STATUS OVERLAY */}
                <section className="px-4 py-10 bg-black border-t border-white/10">
                    <div className="flex flex-col gap-6 opacity-60">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-widest">Airlock_Status</span>
                            <span className="text-[10px] text-primary">SEALED</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-widest">Buffer_Load</span>
                            <div className="w-24 h-1 bg-white/10">
                                <div className="w-1/3 h-full bg-white/40"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* EDGE DECORATION */}
            <div className="fixed top-0 left-0 w-px h-full bg-white/5 pointer-events-none"></div>
            <div className="fixed top-0 right-0 w-px h-full bg-white/5 pointer-events-none"></div>

            {/* FLOATING DATA OVERLAY (Visual only) */}
            <div className="fixed bottom-24 left-4 z-40 pointer-events-none opacity-10">
                <span className="text-[8px] uppercase tracking-[1em] vertical-text">TRANSMITTING...</span>
            </div>
        </div>
    );
};

export default TheNexusMobile;
