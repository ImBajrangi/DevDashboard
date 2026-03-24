import React from 'react';
import { Menu, Zap, Shield, ChevronRight } from 'lucide-react';

/**
 * TheStratificationMobile - High-Density Monolithic Interface.
 * Mobile-specific stratification/tier list for operators.
 */
const TheStratificationMobile = ({ operators = [] }) => {
    return (
        <div className="bg-black text-white font-mono min-h-screen flex flex-col pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 py-4 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[9px] text-primary tracking-[0.3em] font-bold uppercase">System.Access</span>
                    <h1 className="text-lg font-bold tracking-tighter uppercase font-display">STRATIFICATION</h1>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="text-right">
                        <div className="text-[8px] text-zinc-500 uppercase">Sync_Rate</div>
                        <div className="text-[10px] text-primary">99.98%</div>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Left Tier Sidebar */}
                <div className="w-16 border-r border-white/5 flex flex-col items-center py-4 relative bg-zinc-900/10">
                    <div className="flex flex-col items-center h-full justify-between py-10 opacity-40">
                         <div className="vertical-text text-[8px] tracking-[0.5em] uppercase px-1">LVL_04</div>
                         <div className="flex flex-col gap-8 flex-1 justify-center">
                            {[4, 3, 2, 1].map(lvl => (
                                <div key={lvl} className={`w-2 h-2 rotate-45 border ${lvl === 2 ? 'bg-primary border-primary' : 'border-white/20'}`}></div>
                            ))}
                         </div>
                         <div className="vertical-text text-[8px] tracking-[0.5em] uppercase px-1 text-primary">BASE</div>
                    </div>
                </div>

                {/* Right Scrollable List */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-4 py-2 flex justify-between items-end border-b border-white/10 bg-zinc-900/40">
                        <span className="text-[8px] text-zinc-500 uppercase tracking-[0.2em]">Ranked_Peers</span>
                        <span className="text-[8px] text-zinc-500 uppercase tracking-[0.2em]">{operators.length} Active</span>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-white/5">
                        {operators.length > 0 ? operators.map((op, idx) => (
                            <div 
                                key={op.id || idx} 
                                className={`flex items-center justify-between p-4 transition-all ${op.isCurrentUser ? 'bg-primary/5 border-l-2 border-primary' : 'hover:bg-white/[0.02]'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`text-[10px] font-bold ${op.isCurrentUser? 'text-primary' : 'text-zinc-600'}`}>
                                        {op.pos || (idx + 1).toString().padStart(3, '0')}
                                    </span>
                                    <div className="flex flex-col">
                                         <div className="flex items-center gap-2">
                                            <span className={`text-xs font-bold tracking-tight uppercase ${op.isCurrentUser ? 'text-primary' : 'text-zinc-200'}`}>
                                                {op.name}
                                            </span>
                                            {op.isCurrentUser && <Zap size={10} className="text-primary animate-pulse" />}
                                        </div>
                                        <span className="text-[8px] text-zinc-600 uppercase tracking-tighter">{op.status || 'Verified_Node'}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className={`text-xs font-bold ${op.isCurrentUser ? 'text-white' : 'text-zinc-400'}`}>{op.weight || op.kw} <span className="text-[8px] opacity-40">KW</span></span>
                                    <span className="text-[8px] text-zinc-600 uppercase tracking-tighter">{op.uptime || '98.2%'} UP</span>
                                </div>
                            </div>
                        )) : (
                            <div className="p-20 text-center text-xs opacity-20 italic">Resolving hierarchy...</div>
                        )}
                        <div className="h-32" />
                    </div>
                </div>
            </main>

            {/* Bottom Status Sticky */}
            <div className="fixed bottom-24 right-4 z-40 bg-black/80 border border-white/10 px-3 py-2 flex items-center gap-3 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                 <div className="flex flex-col">
                    <span className="text-[7px] text-zinc-500 uppercase font-bold">Protocol_V4</span>
                    <span className="text-[8px] text-primary tracking-widest uppercase">Syncing...</span>
                 </div>
                 <Shield size={14} className="text-primary animate-pulse" />
            </div>
        </div>
    );
};

export default TheStratificationMobile;
