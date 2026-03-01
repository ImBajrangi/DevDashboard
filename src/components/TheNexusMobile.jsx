import React from 'react';
import { Wifi, Filter } from 'lucide-react';

/**
 * TheNexusMobile component – from the_airlock_7 template.
 * Mobile-specific dashboard/nexus view.
 */
const TheNexusMobile = ({ onItemClick }) => {
    return (
        <div className="min-h-screen flex flex-col pb-24 bg-void text-text-main font-display">
            {/* Header */}
            <header className="relative z-10 px-6 pt-12 pb-8 border-b border-border-void/50">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">Status: Connected</span>
                    <h1 className="text-4xl font-bold tracking-tighter leading-none uppercase font-display">THE_VRINDA</h1>
                </div>
                <div className="absolute top-12 right-6">
                    <Wifi size={24} className="text-text-main" />
                </div>
            </header>

            {/* Main content */}
            <main className="relative z-10 flex flex-col divide-y divide-border-void/50">
                {/* Core Metrics */}
                <section className="px-6 py-10">
                    <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Core_Metrics</span>
                        <span className="font-mono text-[10px] text-primary font-bold">v0.9.4</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-border-void bg-white/[0.02]">
                            <p className="font-mono text-[10px] text-text-muted uppercase mb-1">Depth</p>
                            <p className="text-3xl font-bold font-mono tracking-tighter">14.2k</p>
                        </div>
                        <div className="p-4 border border-border-void bg-white/[0.02]">
                            <p className="font-mono text-[10px] text-text-muted uppercase mb-1">Latency</p>
                            <p className="text-3xl font-bold font-mono tracking-tighter text-primary">04ms</p>
                        </div>
                        <div className="col-span-2 p-4 border border-border-void bg-white/[0.02] flex justify-between items-end">
                            <div>
                                <p className="font-mono text-[10px] text-text-muted uppercase mb-1">Sync_Ratio</p>
                                <p className="text-4xl font-bold font-mono tracking-tighter">98.42%</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <div className="w-12 h-1 bg-border-void">
                                    <div className="w-4/5 h-full bg-primary"></div>
                                </div>
                                <span className="font-mono text-[8px] text-text-muted">BUFFERING...</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Latest Signals */}
                <section className="px-6 py-10">
                    <div className="flex items-center justify-between mb-8">
                        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Latest_Signals</span>
                        <Filter size={16} className="text-text-muted" />
                    </div>
                    <div className="flex flex-col gap-10">
                        <div className="group cursor-pointer" onClick={() => onItemClick && onItemClick({ title: "THE HIERARCHY SHIFT DETECTED IN SECTOR 7" })}>
                            <span className="font-mono text-[10px] text-text-muted mb-2 block">12:04 // SYSTEM</span>
                            <h3 className="text-2xl font-bold tracking-tight leading-tight group-hover:text-primary transition-colors uppercase font-display">THE HIERARCHY SHIFT DETECTED IN SECTOR 7</h3>
                        </div>
                        <div className="group cursor-pointer" onClick={() => onItemClick && onItemClick({ title: "NEW CONTRIBUTION WEIGHT RECORD BY USER_ALPHA" })}>
                            <span className="font-mono text-[10px] text-text-muted mb-2 block">11:58 // ENCRYPTED</span>
                            <h3 className="text-2xl font-bold tracking-tight leading-tight group-hover:text-primary transition-colors uppercase font-display">NEW CONTRIBUTION WEIGHT RECORD BY USER_ALPHA</h3>
                        </div>
                        <div className="group opacity-40 cursor-pointer" onClick={() => onItemClick && onItemClick({ title: "VOID BRUTALISM: A NEW ARCHITECTURAL PARADIGM" })}>
                            <span className="font-mono text-[10px] text-text-muted mb-2 block">11:42 // ARCHIVE</span>
                            <h3 className="text-2xl font-bold tracking-tight leading-tight group-hover:text-primary transition-colors uppercase font-display">VOID BRUTALISM: A NEW ARCHITECTURAL PARADIGM</h3>
                        </div>
                    </div>
                </section>

                {/* Active Channels */}
                <section className="px-6 py-10 bg-white/[0.01]">
                    <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Active_Channels</span>
                    </div>
                    <div className="flex flex-col gap-px bg-border-void/50 border border-border-void">
                        <div className="bg-void p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"></div>
                                <span className="font-mono text-sm uppercase">#general-void</span>
                            </div>
                            <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">1.4k Users</span>
                        </div>
                        <div className="bg-void p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-border-void"></div>
                                <span className="font-mono text-sm uppercase text-text-muted">#dev-logs</span>
                            </div>
                            <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">24 Users</span>
                        </div>
                        <div className="bg-void p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"></div>
                                <span className="font-mono text-sm uppercase">#terminal-feed</span>
                            </div>
                            <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">804 Users</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Side Borders */}
            <div className="fixed top-0 left-0 w-px h-full bg-border-void/10 pointer-events-none"></div>
            <div className="fixed top-0 right-0 w-px h-full bg-border-void/10 pointer-events-none"></div>

            {/* Status Footer */}
            <footer className="fixed bottom-24 right-6 pointer-events-none opacity-20">
                <span className="font-mono text-[8px] uppercase tracking-[0.4em] rotate-90 origin-right whitespace-nowrap">Protocol_v1.4</span>
            </footer>
        </div>
    );
};

export default TheNexusMobile;
