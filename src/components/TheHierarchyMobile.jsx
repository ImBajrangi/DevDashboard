import React from 'react';

/**
 * TheHierarchyMobile – exact clone of the_airlock_10/code.html
 * Mobile rankings view with side ruler, tier markers, ranking nodes list,
 * footer with ascension progress bar and bottom nav.
 */
const TheHierarchyMobile = () => {
    return (
        <div className="bg-void text-text-main font-mono antialiased overflow-hidden min-h-screen w-full flex flex-col pt-16 pb-0 border-x border-border-void mx-auto relative">
            {/* Header */}
            <header className="p-6 border-b border-border-void bg-void/80 backdrop-blur-md z-40">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="text-[10px] text-text-muted tracking-[0.3em] uppercase mb-1 font-display">System // Rank</div>
                        <h1 className="text-xl font-bold tracking-tighter uppercase font-display">The Hierarchy</h1>
                    </div>
                    <button className="material-symbols-outlined text-text-muted">more_vert</button>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div className="text-[9px] text-text-muted uppercase mb-1">Current Tier</div>
                        <div className="text-sm font-bold tracking-widest text-primary">OPERATOR [02]</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[9px] text-text-muted uppercase mb-1">Global Weight</div>
                        <div className="text-sm">94,202.11</div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Side Ruler */}
                <aside className="w-20 relative border-r border-border-void flex flex-col items-center py-8">
                    <div
                        className="absolute inset-y-8 left-1/2 -translate-x-1/2 w-[1px] opacity-30"
                        style={{
                            backgroundImage: 'linear-gradient(to bottom, var(--color-text-muted) 1px, transparent 1px)',
                            backgroundSize: '100% 20px',
                        }}
                    />
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-32">
                        <div className="rotate-90 origin-left translate-x-3 text-[10px] text-text-muted/40 uppercase tracking-widest whitespace-nowrap">
                            Commander
                        </div>
                        <div className="relative flex items-center justify-center">
                            <div className="w-10 h-10 border border-primary/30 flex items-center justify-center bg-void">
                                <div className="w-4 h-0.5 bg-primary" style={{ boxShadow: '0 0 15px var(--color-primary-shadow)' }} />
                            </div>
                            <div className="absolute left-12 whitespace-nowrap text-[10px] font-bold text-primary tracking-widest">
                                LEVEL_02
                            </div>
                        </div>
                        <div className="rotate-90 origin-left translate-x-3 text-[10px] text-text-muted/40 uppercase tracking-widest whitespace-nowrap">
                            Acolyte
                        </div>
                    </div>
                </aside>

                {/* Rankings List */}
                <section className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                    <div className="sticky top-0 bg-void border-b border-border-void px-4 py-3 z-20 flex justify-between items-center">
                        <span className="text-[9px] text-text-muted tracking-widest uppercase">Stratification List</span>
                        <span className="text-[9px] text-text-muted uppercase">T-34 Nodes</span>
                    </div>
                    <div className="divide-y divide-border-void">
                        {/* Node 001 */}
                        <div className="p-4 flex flex-col gap-1 opacity-40 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold tracking-tight">V_REVENANT</span>
                                <span className="text-[9px] text-text-muted">#001</span>
                            </div>
                            <div className="flex justify-between items-center font-mono text-[10px]">
                                <span className="text-text-muted uppercase tracking-tighter">Weight: 142,880.04</span>
                                <span className="text-text-muted">[OFFLINE]</span>
                            </div>
                        </div>
                        {/* Node 002 */}
                        <div className="p-4 flex flex-col gap-1 opacity-40 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold tracking-tight">NULL_VECTOR</span>
                                <span className="text-[9px] text-text-muted">#002</span>
                            </div>
                            <div className="flex justify-between items-center font-mono text-[10px]">
                                <span className="text-text-muted uppercase tracking-tighter">Weight: 128,004.91</span>
                                <span className="text-text-muted">[IDLE]</span>
                            </div>
                        </div>
                        {/* Current User – Node 003 */}
                        <div className="p-4 bg-primary/5 border-l-2 border-primary relative overflow-hidden">
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold tracking-tight text-white">USER_ALPHA</span>
                                        <span className="w-1.5 h-3 bg-primary animate-pulse" />
                                    </div>
                                    <span className="text-[9px] text-primary font-bold">#003</span>
                                </div>
                                <div className="flex justify-between items-center font-mono text-[10px]">
                                    <span className="text-text-main uppercase tracking-tighter font-medium">Weight: 94,202.11</span>
                                    <span className="text-primary font-bold tracking-widest">[LINKED]</span>
                                </div>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10">
                                <span className="material-symbols-outlined text-4xl text-primary">sensors</span>
                            </div>
                        </div>
                        {/* Node 004 */}
                        <div className="p-4 flex flex-col gap-1 opacity-40 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold tracking-tight">GHOST_SIGNAL</span>
                                <span className="text-[9px] text-text-muted">#004</span>
                            </div>
                            <div className="flex justify-between items-center font-mono text-[10px]">
                                <span className="text-text-muted uppercase tracking-tighter">Weight: 82,119.00</span>
                                <span className="text-text-muted">[OFFLINE]</span>
                            </div>
                        </div>
                        {/* Node 005 */}
                        <div className="p-4 flex flex-col gap-1 opacity-40 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold tracking-tight">STARK_VOID</span>
                                <span className="text-[9px] text-text-muted">#005</span>
                            </div>
                            <div className="flex justify-between items-center font-mono text-[10px]">
                                <span className="text-text-muted uppercase tracking-tighter">Weight: 77,402.15</span>
                                <span className="text-text-muted">[OFFLINE]</span>
                            </div>
                        </div>
                        {/* Node 006 */}
                        <div className="p-4 flex flex-col gap-1 opacity-40 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold tracking-tight">MONOLITH_X</span>
                                <span className="text-[9px] text-text-muted">#006</span>
                            </div>
                            <div className="flex justify-between items-center font-mono text-[10px]">
                                <span className="text-text-muted uppercase tracking-tighter">Weight: 64,001.22</span>
                                <span className="text-text-muted">[OFFLINE]</span>
                            </div>
                        </div>
                        <div className="h-32" />
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="p-6 border-t border-border-void bg-void z-40">
                <div className="flex justify-between items-end mb-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] text-text-muted uppercase tracking-widest">Ascension Progress</span>
                        <div className="w-32 h-1 bg-border-void">
                            <div className="h-full bg-primary w-2/3" />
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-[9px] text-text-muted uppercase block">Next Tier Evolution</span>
                        <span className="text-[10px] text-text-main font-bold">+5,797.89</span>
                    </div>
                </div>
                <nav className="flex justify-between items-center pt-4 border-t border-border-void/50">
                    <button className="material-symbols-outlined text-primary text-xl">grid_view</button>
                    <button className="material-symbols-outlined text-text-muted text-xl hover:text-text-main">search</button>
                    <button className="material-symbols-outlined text-text-muted text-xl hover:text-text-main">account_circle</button>
                    <button className="material-symbols-outlined text-text-muted text-xl hover:text-text-main">settings</button>
                </nav>
            </footer>

            {/* Visual dots */}
            <div className="absolute bottom-24 left-4 z-50">
                <div className="flex flex-col gap-1 opacity-20">
                    <div className="w-1 h-1 bg-text-muted" />
                    <div className="w-1 h-1 bg-text-muted" />
                    <div className="w-1 h-1 bg-primary" />
                </div>
            </div>
        </div>
    );
};

export default TheHierarchyMobile;
