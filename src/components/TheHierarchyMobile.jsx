import React from 'react';
import { MoreVertical, Radio, LayoutGrid, Search, User, Settings, Shield } from 'lucide-react';

/**
 * TheHierarchyMobile - High-Density Monolithic Interface.
 * Brutalist rankings view for the spiritual hierarchy.
 */
const TheHierarchyMobile = ({ users = [], onLoadMore, isFetchingMore }) => {
    return (
        <div className="bg-black text-white font-mono min-h-screen flex flex-col pb-24 border-x border-white/5">
            {/* Header */}
            <header className="p-4 border-b border-white/10 bg-black/90 backdrop-blur-md sticky top-0 z-50">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="text-[9px] text-primary tracking-[0.3em] uppercase mb-1 font-display">System // Rank</div>
                        <h1 className="text-lg font-bold tracking-tighter uppercase font-display">THE HIERARCHY</h1>
                    </div>
                    <button className="text-zinc-500 hover:text-white transition-colors">
                        <MoreVertical size={18} />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-2 border border-white/5 bg-white/[0.02]">
                        <div className="text-[8px] text-zinc-500 uppercase mb-0.5">Current Tier</div>
                        <div className="text-xs font-bold tracking-widest text-primary flex items-center gap-1.5">
                            <Shield size={10} />
                            OPERATOR [02]
                        </div>
                    </div>
                    <div className="p-2 border border-white/5 bg-white/[0.02]">
                        <div className="text-[8px] text-zinc-500 uppercase mb-0.5">Global Weight</div>
                        <div className="text-xs font-bold tracking-tighter">94,202.11</div>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Side Ruler (Visual Only) */}
                <aside className="w-12 border-r border-white/5 flex flex-col items-center py-4 relative bg-zinc-900/10">
                    <div
                        className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-[1px] opacity-20"
                        style={{
                            backgroundImage: 'linear-gradient(to bottom, #FFF 1px, transparent 1px)',
                            backgroundSize: '100% 24px',
                        }}
                    />
                    <div className="flex flex-col items-center justify-between h-full py-10 opacity-30">
                         <div className="vertical-text text-[8px] tracking-[0.5em] uppercase">ZENITH</div>
                         <div className="w-4 h-4 border border-white rotate-45"></div>
                         <div className="vertical-text text-[8px] tracking-[0.5em] uppercase">BASE</div>
                    </div>
                </aside>

                {/* Rankings List */}
                <section className="flex-1">
                    <div className="bg-zinc-900/40 border-b border-white/10 px-4 py-2 flex justify-between items-center sticky top-[108px] z-40">
                        <span className="text-[8px] text-zinc-500 tracking-widest uppercase">Stratification List</span>
                        <span className="text-[8px] text-zinc-500 uppercase">{users.length} Nodes Sycned</span>
                    </div>
                    <div className="divide-y divide-white/5">
                        {users.map((user, idx) => (
                            <div 
                                key={user.id || idx}
                                className={`p-4 flex flex-col gap-1 transition-all ${user.isCurrentUser ? 'bg-primary/5 border-l-2 border-primary' : 'hover:bg-white/[0.02]'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold tracking-tight uppercase ${user.isCurrentUser ? 'text-primary' : 'text-zinc-200'}`}>
                                            {user.name}
                                        </span>
                                        {user.isCurrentUser && <span className="w-1 h-3 bg-primary animate-pulse" />}
                                    </div>
                                    <span className={`text-[9px] font-bold ${user.isCurrentUser ? 'text-primary' : 'text-zinc-600'}`}>
                                        #{user.pos || (idx + 1).toString().padStart(3, '0')}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-[10px]">
                                    <div className="flex items-center gap-3">
                                        <span className="text-zinc-500 uppercase tracking-tighter">Weight: {user.weight}</span>
                                        <span className="text-[8px] text-zinc-700 bg-white/5 px-1 tracking-tighter">{user.kw} KW</span>
                                    </div>
                                    <span className={`tracking-widest text-[9px] font-bold ${user.status === 'ACTIVE' || user.status === '[LINKED]' ? 'text-primary' : 'text-zinc-700'}`}>
                                        [{user.status || 'OFFLINE'}]
                                    </span>
                                </div>
                                {user.isCurrentUser && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="flex-1 h-[1px] bg-primary/20"></div>
                                        <span className="text-[7px] text-primary uppercase animate-pulse tracking-[0.2em]">Live_Sync_Active</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                        {/* Mobile Archive Sync Trigger within Hierarchy */}
                        <div className="p-6 flex flex-col items-center justify-center bg-zinc-900/10 border-t border-white/5">
                            <button 
                                onClick={onLoadMore}
                                disabled={isFetchingMore}
                                className={`w-full py-4 border border-zinc-500/30 text-[10px] uppercase tracking-[0.3em] font-bold transition-all active:bg-primary active:text-black ${isFetchingMore ? 'opacity-50 animate-pulse' : ''}`}
                            >
                                {isFetchingMore ? 'SYNCING_NODES...' : '[ SYNC_SYSTEM_OPERATORS ]'}
                            </button>
                            <span className="mt-3 text-[8px] text-zinc-600 uppercase tracking-widest">
                                Buffer: {users.length} Active Identifiers
                            </span>
                        </div>
                        <div className="h-32" />
                </section>
            </div>

            {/* Footer Fixes for Navigation overlap */}
            <div className="h-20"></div>
        </div>
    );
};

export default TheHierarchyMobile;
