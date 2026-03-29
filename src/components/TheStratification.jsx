import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';
import TheStratificationMobile from './TheStratificationMobile';
import { SYNTHETIC_OPERATORS } from '../data/syntheticData';

const STRAT_TIERS = [
    { id: 'lvl4', label: 'LVL_04', name: 'VOID_LORD', minKw: 1200 },
    { id: 'lvl3', label: 'LVL_03', name: 'ARCHIVIST', minKw: 1100 },
    { id: 'lvl2', label: 'LVL_02', name: 'DECRYPTOR', minKw: 1050 },
    { id: 'lvl1', label: 'LVL_01', name: 'NOVICE', minKw: 0 },
];

const TheStratification = ({ operators = [], onLoadMore, isFetchingMore }) => {
    const isMobile = useMobile();
    const [activeLvl, setActiveLvl] = useState('lvl4');

    // Use operators from props or fallback to synthetic
    const displayOperators = operators.length > 0 ? operators : [...SYNTHETIC_OPERATORS];

    if (isMobile) {
        return <TheStratificationMobile operators={displayOperators} onLoadMore={onLoadMore} isFetchingMore={isFetchingMore} />;
    }

    // Parse KW for filtering
    const parseKw = (k) => parseFloat(String(k).replace(/,/g, ''));
    const currentLvl = STRAT_TIERS.find(t => t.id === activeLvl);
    const prevIdx = STRAT_TIERS.findIndex(t => t.id === activeLvl) - 1;
    const maxKw = prevIdx >= 0 ? STRAT_TIERS[prevIdx].minKw : Infinity;
    const filteredOps = displayOperators.filter(op => {
        const kw = parseKw(op.kw);
        return kw >= currentLvl.minKw && kw < maxKw;
    });
    const displayOps = filteredOps.length > 0 ? filteredOps : displayOperators;

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col md:pl-4 overflow-hidden relative font-display antialiased selection:bg-[#333333] selection:text-white">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent pointer-events-none z-20" />
            {/* Nav – now shrink-0 within the flex flow */}
            <nav className="flex justify-between items-center px-12 pt-4 pb-8 shrink-0 z-30">
                <div className="font-mono text-[10px] tracking-[0.4em] text-text-muted flex items-center gap-4 uppercase font-bold">
                    <span className="w-2 h-2 bg-primary" />
                    THE_STRATIFICATION // RANKINGS_v4.0
                </div>
                <div className="flex gap-12">
                    <a className="font-mono text-[10px] tracking-[0.2em] hover:text-primary transition-colors" href="#">
                        [ ACCESS_DOSSIER ]
                    </a>
                    <a className="font-mono text-[10px] tracking-[0.2em] hover:text-primary transition-colors" href="#">
                        [ LOGOUT ]
                    </a>
                </div>
            </nav>

            {/* Main grid – expands to fill remaining space */}
            <main className="flex-1 min-h-0 w-full grid grid-cols-12 max-w-6xl mx-auto gap-12 px-12 pb-8">
                {/* Left sidebar – col-span-3 */}
                <aside className="lg:col-span-3 space-y-12">
                    <div className="sticky top-32">
                        <h1 className="font-display text-4xl font-bold tracking-tighter mb-16 leading-none">
                            THE<br />STRATIFICATION
                        </h1>
                        <div className="flex flex-col">
                            {STRAT_TIERS.map((tier) => {
                                const isActive = activeLvl === tier.id;
                                return (
                                    <button
                                        key={tier.id}
                                        onClick={() => setActiveLvl(tier.id)}
                                        className={`relative pl-8 py-12 border-l text-left transition-all duration-300 cursor-pointer ${isActive
                                                ? 'border-primary text-primary'
                                                : 'border-border-void opacity-40 hover:opacity-70'
                                            }`}
                                    >
                                        {isActive && (
                                            <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-primary shadow-[0_0_8px_var(--color-primary)]" />
                                        )}
                                        <span className={`font-mono text-[10px] tracking-[0.3em] block mb-1 ${isActive ? 'opacity-50' : ''}`}>
                                            {tier.label}
                                        </span>
                                        <h2 className="font-display text-2xl font-bold tracking-widest">
                                            {tier.name}
                                        </h2>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-16 pt-8 border-t border-border-void">
                            <div className="font-mono text-[10px] text-text-muted space-y-2">
                                <p>CURRENT_STATUS: ASCENDING</p>
                                <p>ACTIVE_TIER: {currentLvl?.name}</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Right section – col-span-9 */}
                <section className="lg:col-span-9 space-y-8">
                    <div className="flex justify-between items-end border-b border-border-void pb-4">
                        <div className="font-mono text-xs text-text-muted tracking-widest">ACTIVE_OPERATORS [50]</div>
                        <div className="font-mono text-[10px] text-primary animate-pulse">LIVE_FEED_SYNCED</div>
                    </div>

                    <div className="overflow-hidden border border-border-void">
                        {/* Table header */}
                        <div className="grid grid-cols-12 font-mono text-[10px] tracking-widest text-text-muted bg-white/5 py-3 px-6 border-b border-border-void uppercase">
                            <div className="col-span-1">Rank</div>
                            <div className="col-span-5">Operator_ID</div>
                            <div className="col-span-3 text-right">Knowledge_Weight</div>
                            <div className="col-span-3 text-right">Uptime</div>
                        </div>

                        {/* Table rows – TRUE scrolling region */}
                        <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-border-void">
                            {displayOps.map((op, idx) => (
                                <div
                                    key={idx}
                                    className={`grid grid-cols-12 items-center font-mono text-sm px-6 ${op.isCurrentUser
                                        ? 'py-5 bg-primary/10 border-l-2 border-l-primary'
                                        : 'py-4 hover:bg-white hover:text-void'
                                        } transition-all duration-150 cursor-pointer`}
                                >
                                    <div className={`col-span-1 ${op.isCurrentUser ? 'text-primary font-bold' : 'text-text-muted'}`}>
                                        {op.rank}
                                    </div>
                                    <div className="col-span-5 flex items-center gap-3">
                                        <span className={`tracking-tighter ${op.isCurrentUser ? 'text-primary' : ''}`}>
                                            {op.name}
                                        </span>
                                        {op.isCurrentUser && (
                                            <span className="text-[9px] bg-primary text-white px-1 font-bold">YOU</span>
                                        )}
                                    </div>
                                    <div className="col-span-3 text-right font-light">{op.kw} KW</div>
                                    <div className="col-span-3 text-right text-text-muted text-xs">{op.uptime}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Global Archive Sync Trigger within Stratification */}
                    <div className="mt-8 py-12 flex flex-col items-center justify-center border-t border-border-void/20">
                        <div className={`w-1 h-6 bg-primary mb-2 ${isFetchingMore ? 'animate-ping' : 'animate-pulse'}`} />
                        <button 
                            onClick={onLoadMore}
                            disabled={isFetchingMore}
                            className={`font-mono text-[9px] uppercase tracking-[0.4em] border border-border-void px-6 py-3 hover:bg-primary hover:text-white transition-all duration-500 ${isFetchingMore ? 'opacity-50 cursor-wait' : 'hover:scale-105'}`}
                        >
                            {isFetchingMore ? '[ TRANSMITTING_RANKS... ]' : '[ SYNC_STRAT_DATA ]'}
                        </button>
                        <span className="mt-3 font-mono text-[8px] text-text-muted uppercase tracking-widest opacity-30">
                            Coordinate: {displayOps.length} Active Operators Decrypted
                        </span>
                    </div>
                </section>
            </main>

            {/* Footer – now relative and integrated */}
            <footer className="mt-auto pt-8 border-t border-border-void flex justify-between items-end pb-8 px-12 z-40">
                <div className="font-mono text-[10px] space-y-1 text-text-muted">
                    <p>SYSTEM_REVISION: ALPHA_4.12.0</p>
                    <p>DATA_INTEGRITY: 100%_VERIFIED</p>
                </div>
                <div className="text-right font-mono text-[10px] mt-4 md:mt-0">
                    <p>© 2024 THE_DEEP_VOID // ARCHIVAL_ACCESS_ONLY</p>
                    <p>TERMINAL: STACK_009_NODE_4</p>
                </div>
            </footer>
        </div>
    );
};

export default TheStratification;
