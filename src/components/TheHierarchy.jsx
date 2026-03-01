import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';
import TheHierarchyMobile from './TheHierarchyMobile';
import { SYNTHETIC_USERS } from '../data/syntheticData';

const TIERS = [
    { id: 'zenith', label: '01 / Zenith', name: 'COMMANDER', minWeight: 100000 },
    { id: 'active', label: '02 / Active Tier', name: 'OPERATOR', minWeight: 50000 },
    { id: 'base', label: '03 / Base', name: 'ACOLYTE', minWeight: 0 },
];

const ALL_USERS = [
    ...SYNTHETIC_USERS,
    { pos: '011', name: 'PHANTOM_LINK', weight: '38,100.55', status: 'OFFLINE' },
    { pos: '012', name: 'VOID_CRAWLER', weight: '32,800.12', status: 'IDLE' },
    { pos: '013', name: 'NEXUS_DRIFT', weight: '28,400.90', status: 'OFFLINE' },
    { pos: '014', name: 'PROTO_ZERO', weight: '22,100.44', status: 'OFFLINE' },
    { pos: '015', name: 'DARK_MATTER_7', weight: '18,900.33', status: 'IDLE' },
];

const TheHierarchy = () => {
    const isMobile = useMobile();
    const [activeTier, setActiveTier] = useState('active');

    if (isMobile) {
        return <TheHierarchyMobile />;
    }

    // Parse weight string to number for filtering
    const parseWeight = (w) => parseFloat(String(w).replace(/,/g, ''));

    // Filter users by active tier
    const currentTier = TIERS.find(t => t.id === activeTier);
    const nextTierIdx = TIERS.findIndex(t => t.id === activeTier) - 1;
    const maxWeight = nextTierIdx >= 0 ? TIERS[nextTierIdx].minWeight : Infinity;
    const filteredUsers = ALL_USERS.filter(u => {
        const w = parseWeight(u.weight);
        return w >= currentTier.minWeight && w < maxWeight;
    });
    // If no users match the filter, show all
    const displayUsers = filteredUsers.length > 0 ? filteredUsers : ALL_USERS;

    return (
        <div className="h-screen w-full overflow-hidden font-display antialiased selection:bg-[#333333] selection:text-white relative">
            {/* Top nav – fixed full width */}
            <nav className="fixed top-0 left-16 right-0 p-8 flex justify-between items-start z-50 pointer-events-none">
                <div className="flex flex-col gap-1 pointer-events-auto">
                    <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
                        Protocol // Archive
                    </span>
                    <h2 className="text-xl font-bold tracking-tighter uppercase font-display">The Hierarchy</h2>
                </div>
                <div className="flex items-center gap-6 pointer-events-auto">
                    <div className="text-right flex flex-col items-end">
                        <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
                            System Load
                        </span>
                        <span className="font-mono text-xs text-primary">0.0004%</span>
                    </div>
                </div>
            </nav>

            {/* Main centered content */}
            <main className="relative z-10 h-full w-full flex items-center justify-center pt-24 px-12">
                <div className="grid grid-cols-12 w-full max-w-6xl gap-12 h-[70vh]">
                    {/* Left tier sidebar – col-span-3 */}
                    <div className="col-span-3 flex flex-col justify-between py-4 border-r border-border-void relative">
                        <div
                            className="absolute right-[-1px] top-0 bottom-0 w-px"
                            style={{
                                background: 'linear-gradient(to bottom, transparent, var(--color-text-muted) 10%, var(--color-text-muted) 90%, transparent)',
                            }}
                        />
                        {TIERS.map((tier) => {
                            const isActive = activeTier === tier.id;
                            return (
                                <button
                                    key={tier.id}
                                    onClick={() => setActiveTier(tier.id)}
                                    className={`flex flex-col gap-2 text-left transition-all duration-300 relative group cursor-pointer ${isActive ? '' : 'opacity-30 hover:opacity-60'}`}
                                >
                                    {isActive && (
                                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]" />
                                    )}
                                    <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                                        {tier.label}
                                    </span>
                                    <h3 className={`text-2xl font-bold tracking-tight font-display ${isActive ? 'text-text-main' : ''}`}>
                                        {tier.name}
                                    </h3>
                                    {isActive && <div className="h-px w-12 bg-primary/40 mt-1" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right table area – col-span-9 */}
                    <div className="col-span-9 flex flex-col h-full">
                        {/* Table header */}
                        <div className="grid grid-cols-12 pb-4 border-b border-border-void font-mono text-[10px] text-text-muted uppercase tracking-[0.2em]">
                            <div className="col-span-1">Pos</div>
                            <div className="col-span-6">Identity</div>
                            <div className="col-span-3">Contribution Weight</div>
                            <div className="col-span-2 text-right">Status</div>
                        </div>

                        {/* Table rows */}
                        <div className="flex-1 overflow-y-auto font-mono text-sm py-4" style={{ scrollbarWidth: 'none' }}>
                            {displayUsers.map((user) =>
                                user.isCurrentUser ? (
                                    <div
                                        key={user.pos}
                                        className="grid grid-cols-12 py-5 border-y border-primary/30 bg-primary/5 relative group"
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                                        <div className="col-span-1 text-primary pl-4">{user.pos}</div>
                                        <div className="col-span-6 flex items-center gap-2">
                                            <span className="text-text-main font-bold">{user.name}</span>
                                            <span
                                                className="w-2 h-4 bg-primary inline-block"
                                                style={{ animation: 'blink 1s step-end infinite' }}
                                            />
                                        </div>
                                        <div className="col-span-3 text-text-main">{user.weight}</div>
                                        <div className="col-span-2 text-right text-[10px] text-primary pr-4">
                                            [ {user.status} ]
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        key={user.pos}
                                        className="grid grid-cols-12 py-3 border-b border-white/5 opacity-40 hover:opacity-100 hover:bg-text-main hover:text-void hover:px-4 -mx-4 transition-all duration-200 cursor-pointer"
                                    >
                                        <div className="col-span-1">{user.pos}</div>
                                        <div className="col-span-6 flex items-center gap-2">
                                            <span>{user.name}</span>
                                            <span className="w-1.5 h-3 bg-transparent group-hover:bg-primary transition-colors" style={{ animation: 'blink 1s step-end infinite' }} />
                                        </div>
                                        <div className="col-span-3">{user.weight}</div>
                                        <div className="col-span-2 text-right text-[10px]">[ {user.status} ]</div>
                                    </div>
                                )
                            )}
                            {/* Truncated indicator */}
                            <div className="grid grid-cols-12 py-3 border-b border-white/5 opacity-20">
                                <div className="col-span-1">...</div>
                                <div className="col-span-6">---</div>
                                <div className="col-span-3">---</div>
                                <div className="col-span-2 text-right text-[10px]">---</div>
                            </div>
                        </div>

                        {/* Bottom stats */}
                        <div className="mt-auto pt-8 flex justify-between border-t border-border-void">
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                                    Global Density
                                </span>
                                <div className="flex items-center gap-1">
                                    <div className="w-16 h-1 bg-border-void overflow-hidden">
                                        <div className="w-3/4 h-full bg-text-muted" />
                                    </div>
                                    <span className="font-mono text-[10px] text-text-muted">74%</span>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-1">
                                <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                                    Next Evolution
                                </span>
                                <span className="font-mono text-xs text-text-main uppercase">10,000 WEIGHT REMAINING</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Right sidebar strip */}
            <aside className="fixed right-0 top-0 bottom-0 w-16 border-l border-border-void flex flex-col items-center justify-center gap-12 z-20">
                <div className="rotate-90 origin-center whitespace-nowrap font-mono text-[10px] tracking-[0.5em] text-text-muted uppercase">
                    Ascension Protocol v1.4
                </div>
                <div className="flex flex-col gap-4">
                    <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
                    <div className="w-1 h-1 rounded-full bg-border-void" />
                    <div className="w-1 h-1 rounded-full bg-border-void" />
                </div>
            </aside>

            {/* Bottom-left footer */}
            <footer className="fixed bottom-8 left-8 flex gap-8 font-mono text-[10px] text-text-muted uppercase tracking-widest z-50">
                <span>Depth: 14,000km</span>
                <span className="text-primary animate-pulse">Syncing...</span>
            </footer>
        </div>
    );
};

export default TheHierarchy;
