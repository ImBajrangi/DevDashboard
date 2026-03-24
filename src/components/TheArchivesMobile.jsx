import React from 'react';
import { Archive, CheckCircle, Circle } from 'lucide-react';

/**
 * TheArchivesMobile - High-Density Archival Interface.
 * Brutalist, industrial design for mobile data retrieval.
 */
const TheArchivesMobile = ({ items = [], onItemClick }) => {
    return (
        <div className="bg-black text-white font-mono min-h-screen flex flex-col pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 py-4">
                <div className="flex justify-between items-center mb-4">
                     <div className="flex flex-col">
                        <span className="text-[9px] text-zinc-500 tracking-[0.3em] uppercase mb-1">// SYSTEM_ARCHIVE</span>
                        <h1 className="text-xl font-bold tracking-tighter uppercase leading-none font-display">VAULT_01</h1>
                    </div>
                    <Archive size={16} className="text-primary opacity-50" />
                </div>
                
                {/* Filter Tabs */}
                <div className="flex gap-4 text-[9px] uppercase tracking-widest text-zinc-500 overflow-x-auto no-scrollbar">
                    <button className="text-primary font-bold border-b border-primary pb-1 whitespace-nowrap">All_Files</button>
                    <button className="hover:text-white pb-1 whitespace-nowrap transition-colors">Pending</button>
                    <button className="hover:text-white pb-1 whitespace-nowrap transition-colors">Decrypted</button>
                </div>
            </header>

            {/* Archive List */}
            <main className="flex-1 divide-y divide-white/5">
                {items.length > 0 ? items.map((item, idx) => (
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
                )) : (
                    <div className="p-20 text-center text-xs opacity-20 italic">No records in vault...</div>
                )}
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
