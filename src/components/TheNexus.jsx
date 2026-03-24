import React from 'react';

/**
 * TheNexus component – from the_airlock_2 template.
 * High-density desktop dashboard.
 */
const TheNexus = ({ onSignalClick, onTransmissionClick, allEntries = [], categories = ['ALL'], selectedCategory = 'ALL', onCategoryChange }) => {
    const latestSignals = (allEntries || []).slice(0, 3).map(entry => {
        if (!entry) return null;
        return {
            id: entry.id,
            date: entry.created_at ? new Date(entry.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '.') : '00.00.00',
            title: (entry.title || "UNTITLED_SIGNAL").toUpperCase(),
            desc: entry.description || (entry.content_text ? entry.content_text.substring(0, 100) + '...' : 'Signal data fragmented.')
        };
    }).filter(Boolean);

    const stats = {
        totalRecords: allEntries.length,
        categories: [...new Set(allEntries.map(e => e.category))].length,
        latestUpdate: allEntries[0] ? new Date(allEntries[0].created_at).toLocaleTimeString() : 'N/A'
    };

    return (
        <div className="min-h-screen bg-void text-text-main font-mono selection:bg-primary selection:text-white flex flex-col pt-20">
            {/* Top Bar Label & Dynamic Categories */}
            <div className="px-12 py-8 flex justify-between items-center border-b border-border-void">
                <div className="flex gap-8 items-center">
                    <span className="opacity-40 text-[10px] tracking-[0.3em] uppercase">System_Access // THE_NEXUS_V.4.0</span>
                    <div className="h-4 w-px bg-border-void mx-4 opacity-40"></div>
                    <div className="flex gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => onCategoryChange && onCategoryChange(cat)}
                                className={`text-[9px] tracking-widest uppercase px-3 py-1 border transition-all duration-200 ${selectedCategory === cat ? 'bg-primary text-white border-primary' : 'text-text-muted border-border-void hover:text-text-main hover:border-text-muted'}`}
                            >
                                {cat.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex gap-16 opacity-40 text-[10px] tracking-[0.3em] uppercase">
                    <span className="cursor-pointer hover:text-text-main" onClick={() => onSignalClick && onSignalClick({ id: 'archives' })}>[ ARCHIVES ]</span>
                    <span className="cursor-pointer hover:text-text-main text-primary" onClick={() => onSignalClick && onSignalClick({ id: 'feed' })}>[ TRANSMIT ]</span>
                    <span className="cursor-pointer hover:text-text-main" onClick={() => onSignalClick && onSignalClick({ id: 'grid' })}>[ TERMINAL ]</span>
                </div>
            </div>

            {/* Main Header Logo */}
            <header className="px-12 py-16 border-b border-border-void">
                <h1 className="text-[12rem] font-black tracking-tighter leading-none mb-8 font-display">THE_VRINDA<span className="animate-pulse text-primary">.</span></h1>
                <div className="flex justify-between items-end">
                    <p className="max-w-md text-sm opacity-60 leading-relaxed uppercase">
                        Deep-tech blog & archival platform for the silent majority.
                        Decrypting the future of decentralised intelligence.
                    </p>
                    <div className="text-right text-[10px] opacity-40 tracking-widest leading-loose">
                        COORD: 27.5706° N, 77.6854° E<br />
                        SIGNAL_STATUS: {stats.totalRecords > 0 ? 'STABLE' : 'OFFLINE'}
                    </div>
                </div>
            </header>

            {/* Grid Layout */}
            <main className="flex-1 grid grid-cols-12 divide-x divide-border-void">

                {/* Column 1: Latest Signals */}
                <section className="col-span-4 p-8 flex flex-col gap-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 bg-primary"></div>
                        <h2 className="text-sm font-bold tracking-[0.3em] uppercase">Latest_Signals</h2>
                    </div>

                    <div className="space-y-16">
                        {latestSignals.map((signal, idx) => (
                            <div key={idx} className="group cursor-pointer" onClick={() => onSignalClick && onSignalClick(signal)}>
                                <span className="text-[10px] opacity-40 uppercase tracking-widest block mb-1">{signal.date}</span>
                                <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors font-display">{signal.title}</h3>
                                <p className="text-xs opacity-60 leading-relaxed max-w-sm">{signal.desc}</p>
                            </div>
                        ))}
                        {latestSignals.length === 0 && (
                            <div className="text-text-muted italic opacity-50 uppercase tracking-widest">No active signals detected.</div>
                        )}
                    </div>

                    <button className="mt-auto self-start btn-invert" onClick={() => onSignalClick && onSignalClick({ id: 'feed' })}>
                        [ VIEW_ALL_SIGNALS ]
                    </button>
                </section>

                {/* Column 2: System Metrics */}
                <section className="col-span-4 p-8 flex flex-col gap-16">
                    <h2 className="text-xs font-bold tracking-[0.3em] opacity-40 uppercase">System_Metrics</h2>

                    <div className="space-y-16">
                        <div>
                            <span className="text-[10px] opacity-40 uppercase tracking-widest block mb-2">Total_Transmissions</span>
                            <div className="text-6xl font-medium tracking-tighter font-display">{stats.totalRecords}</div>
                            <div className="w-full h-px bg-border-void mt-4"></div>
                        </div>

                        <div>
                            <span className="text-[10px] opacity-40 uppercase tracking-widest block mb-2">Active_Spheres (Categories)</span>
                            <div className="text-6xl font-medium tracking-tighter font-display">{stats.categories}</div>
                            <div className="w-full h-px bg-border-void mt-4"></div>
                        </div>

                        <div>
                            <span className="text-[10px] opacity-40 uppercase tracking-widest block mb-2">Last_Sync_Burst</span>
                            <div className="text-6xl font-medium tracking-tighter font-display uppercase text-lg">{stats.latestUpdate}</div>
                            <div className="w-full h-px bg-primary/30 mt-4"></div>
                        </div>
                    </div>

                    <div className="mt-auto p-6 border border-border-void bg-void-matte">
                        <p className="text-[10px] leading-relaxed text-text-muted uppercase font-bold">
                            STATUS_REPORT: <span className="text-text-main">SYSTEM RUNNING AT {stats.totalRecords > 0 ? 'OPTIMAL' : 'REDUCED'} CAPACITY. {stats.totalRecords} NODES RESPONDING. NO UNRECOGNIZED INTERFERENCE DETECTED.</span>
                        </p>
                    </div>
                </section>

                {/* Column 3: Active Transmissions & Terminal */}
                <section className="col-span-4 flex flex-col divide-y divide-border-void">
                    <div className="p-8 flex-1">
                        <h2 className="text-xs font-bold tracking-[0.3em] opacity-40 uppercase mb-8">Active_Transmissions</h2>
                        <div className="space-y-8">
                            {[
                                { status: 'LIVE', label: 'OPERATOR_991 // ENCRYPTED_CHANNEL', sub: 'RECOVERING_FRAGMENT_88...', color: '#660000' },
                                { status: 'IDLE', label: 'OPERATOR_402 // STANDBY', sub: 'WAITING_FOR_SIGNAL_BURST', color: 'transparent' },
                                { status: 'UPLINK', label: 'SYSTEM_CORE // BROADCAST', sub: 'GLOBAL_REPLICA_SYNCING', color: 'transparent' }
                            ].map((trans, idx) => (
                                <div key={idx} className="flex gap-4 items-start group cursor-pointer" onClick={() => onTransmissionClick && onTransmissionClick(trans)}>
                                    <span className={`text-[8px] border border-border-void px-1.5 py-0.5 font-bold tracking-widest ${idx === 0 ? 'bg-primary text-white border-primary' : 'opacity-40'}`}>
                                        {trans.status}
                                    </span>
                                    <div>
                                        <div className="text-[10px] font-bold tracking-widest mb-1 group-hover:text-primary transition-colors">{trans.label}</div>
                                        <div className="text-[9px] opacity-40 tracking-widest uppercase">{trans.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-12 flex flex-col gap-8">
                        <h2 className="text-xs font-bold tracking-[0.3em] opacity-40 uppercase">Void_Terminal_Output</h2>
                        <div className="bg-void-matte p-10 text-[10px] leading-relaxed font-mono overflow-hidden border border-border-void relative">
                            <div className="text-primary animate-pulse">&gt; BOOTING_NEXUS_CORE...</div>
                            <div className="opacity-60">&gt; LOAD_MODULE: VOID_BRUTALISM</div>
                            <div className="opacity-60">&gt; CHECKING_INTEGRITY... 100%</div>
                            <div className="opacity-60">&gt; CONNECTING_TO_PEERS... 12,992 FOUND</div>
                            <div className="opacity-60">&gt; ENABLING_HIGH_FIDELITY_TYPOGRAPHY</div>
                            <div className="opacity-60">&gt; READY.</div>
                            <div className="pulsing-cursor absolute bottom-10 right-10"></div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Bar Info */}
            <footer className="px-12 py-12 flex justify-between items-center opacity-40 text-[9px] tracking-[0.4em] uppercase border-t border-border-void">
                <div className="flex flex-col gap-1">
                    <span>DESIGN_PROTOCOL: BRUTALIST_MINIMALISM</span>
                    <span>FRAMEWORK: VOID_STACK_V2</span>
                </div>
                <div className="text-center flex flex-col gap-1">
                    <span>UPLINK_STRENGTH: 99.9%</span>
                    <span>LATENCY: 4MS</span>
                </div>
                <div className="text-right flex flex-col gap-1">
                    <span>© 2024 THE_VRINDA_RECORDS</span>
                    <span>ALL_RIGHTS_DECENTRALIZED</span>
                </div>
            </footer>
        </div>
    );
};

export default TheNexus;
