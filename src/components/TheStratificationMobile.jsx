import React from 'react';
import { Menu } from 'lucide-react';

/**
 * TheStratificationMobile component – from the_airlock_14 template.
 * Mobile-specific stratification/tier list.
 */
const TheStratificationMobile = () => {
    return (
        <div className="bg-void text-text-main h-screen w-full overflow-hidden font-mono antialiased relative flex flex-col pt-24">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-void/80 backdrop-blur-md border-b border-border-void">
                <div className="flex flex-col">
                    <span className="text-[10px] text-primary tracking-[0.3em] font-bold uppercase">System.Access</span>
                    <h1 className="text-lg font-bold tracking-tighter uppercase font-display">The Stratification</h1>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="text-right">
                        <div className="text-[8px] text-text-muted uppercase">Sync_Rate</div>
                        <div className="text-[10px] text-primary">99.98%</div>
                    </div>
                    <button className="text-text-muted hover:text-primary transition-colors">
                        <Menu size={20} />
                    </button>
                </div>
            </header>

            <main className="relative z-10 h-full w-full flex overflow-hidden">
                {/* Left Tier Sidebar */}
                <div className="w-20 h-full border-r border-border-void flex flex-col items-center py-8 relative bg-void/50">
                    <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-border-void to-transparent"></div>
                    <div className="flex flex-col items-center h-full justify-between py-4">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[8px] text-text-muted [writing-mode:vertical-rl] text-orientation-mixed uppercase tracking-widest">Level_01</span>
                            <div className="w-[1px] h-8 bg-border-void"></div>
                        </div>

                        <div className="flex flex-col items-center gap-12 flex-1 justify-center py-10">
                            {[
                                { name: 'Void Lord', active: false },
                                { name: 'Commander', active: false },
                                { name: 'Operator', active: true },
                                { name: 'Acolyte', active: false },
                                { name: 'Novice', active: false },
                            ].map((tier, idx) => (
                                <div key={idx} className="group relative flex items-center">
                                    {tier.active && <div className="absolute -left-4 w-2 h-[1px] bg-primary"></div>}
                                    <span className={`absolute left-8 whitespace-nowrap uppercase tracking-tighter transition-colors ${tier.active ? 'text-[11px] text-primary font-bold' : 'text-[10px] text-text-muted group-hover:text-text-main'}`}>
                                        {tier.name}
                                    </span>
                                    {tier.active ? (
                                        <div className="w-3 h-3 bg-primary rotate-45 shadow-[0_0_10px_var(--color-primary-shadow)]"></div>
                                    ) : (
                                        <div className="w-2 h-2 border border-text-muted rotate-45"></div>
                                    )}
                                    {tier.active && <div className="absolute right-[-10px] w-2 h-[1px] bg-primary"></div>}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="w-[1px] h-8 bg-border-void"></div>
                            <span className="text-[8px] text-text-muted [writing-mode:vertical-rl] text-orientation-mixed uppercase tracking-widest">Base_Floor</span>
                        </div>
                    </div>
                </div>

                {/* Right Scrollable List */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 py-4 flex justify-between items-end border-b border-border-void bg-void">
                        <span className="text-[10px] text-text-muted uppercase tracking-[0.2em]">Local_Peers</span>
                        <span className="text-[10px] text-text-muted uppercase tracking-[0.2em]">Weight.val</span>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-2">
                        <div className="space-y-1">
                            {[
                                { id: '001', name: 'V_REVENANT', weight: '142,880.04' },
                                { id: '002', name: 'NULL_VECTOR', weight: '128,004.91' },
                            ].map((peer) => (
                                <div key={peer.id} className="flex items-center justify-between p-4 border border-transparent opacity-40 hover:opacity-100 transition-all">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] text-text-muted font-bold">{peer.id}</span>
                                        <span className="text-xs tracking-tight">{peer.name}</span>
                                    </div>
                                    <span className="text-xs text-text-muted">{peer.weight}</span>
                                </div>
                            ))}

                            {/* Current User */}
                            <div className="flex items-center justify-between p-4 bg-primary/5 border-y border-primary/20 relative">
                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary"></div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] text-primary font-bold">003</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs font-bold text-text-main">USER_ALPHA</span>
                                        <span className="w-1 h-3 bg-primary animate-pulse"></span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-primary font-bold">94,202.11</span>
                                    <span className="text-[8px] text-primary/60 uppercase">Active_Link</span>
                                </div>
                            </div>

                            {[
                                { id: '004', name: 'GHOST_SIGNAL', weight: '82,119.00' },
                                { id: '005', name: 'STARK_VOID', weight: '77,402.15' },
                                { id: '006', name: 'MONOLITH_X', weight: '64,001.22' },
                                { id: '007', name: 'NEON_DRIFT', weight: '59,332.90' },
                                { id: '008', name: 'CRYPT_WALKER', weight: '51,002.11' },
                            ].map((peer) => (
                                <div key={peer.id} className="flex items-center justify-between p-4 border border-transparent opacity-40 hover:opacity-100 transition-all">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] text-text-muted font-bold">{peer.id}</span>
                                        <span className="text-xs tracking-tight">{peer.name}</span>
                                    </div>
                                    <span className="text-xs text-text-muted">{peer.weight}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Progress */}
                    <div className="p-6 bg-void/80 border-t border-border-void w-full">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] text-text-muted uppercase tracking-widest">Next Evolution</span>
                                <div className="w-32 h-[2px] bg-border-void relative">
                                    <div className="absolute left-0 top-0 h-full w-[65%] bg-primary"></div>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] text-text-main font-bold">5,797 WEIGHT TO CMD</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center font-mono text-[8px] text-text-muted uppercase tracking-[0.3em]">
                            <span>SEC_TOKEN: 0x82...F4</span>
                            <span className="text-primary/60">Strat_v4.0.1</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Visual Ruler Fluff */}
            <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 pr-1 pointer-events-none">
                <div className="w-1 h-1 bg-border-void"></div>
                <div className="w-1 h-6 bg-primary/20"></div>
                <div className="w-1 h-1 bg-border-void"></div>
            </div>

            <div className="fixed inset-0 pointer-events-none noise-overlay z-50 opacity-04"></div>
        </div>
    );
};

export default TheStratificationMobile;
