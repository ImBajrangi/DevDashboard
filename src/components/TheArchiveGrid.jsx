import React from 'react';
import { Focus } from 'lucide-react';
import Loader from './ui/Loader';

/**
 * TheArchiveGrid – exact clone of the_airlock_4/code.html
 * Template uses: min-h-screen, fixed nav (top-0 z-[60]), left aside (w-10 hidden lg:flex),
 * main (pt-16 lg:pl-10), grid auto-fill minmax(120px,1fr), 120 cells,
 * footer, corner brackets, scanline overlays
 */

const IMAGES = [
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1446776899648-aa78eefe8512?auto=format&fit=crop&q=80&w=300',
];

const TheArchiveGrid = ({ items = [], onLoadMore, isFetchingMore }) => {
    // Filter items that have at least one image
    const displayItems = items.filter(item => item.images && item.images.length > 0);

    // Fallback to synthetic logic if no dynamic images exist
    const gridItems = displayItems.length > 0 ? displayItems : Array.from({ length: 48 }, (_, i) => ({
        id: `SYNTH_${i}`,
        title: `Archive_Unit_${i + 1}`,
        images: [IMAGES[i % IMAGES.length]]
    }));

    return (
        <div className="min-h-screen relative bg-void text-text-main">
            {/* Top nav – template: fixed top-0 left-0 w-full p-4 z-[60] bg-void/90 backdrop-blur-md border-b */}
            <nav className="fixed top-0 left-16 right-0 p-4 flex justify-between items-center z-[60] bg-void/90 backdrop-blur-md border-b border-border-void">
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 bg-[#f04242]" />
                    <div className="font-mono text-[10px] tracking-[0.4em] text-text-main uppercase font-bold">
                        DEEP_VOID / ARCHIVE_ACCESS
                    </div>
                </div>
                <div className="flex gap-8">
                    <a className="font-mono text-[10px] tracking-widest text-text-main/50 hover:text-[#f04242] transition-colors" href="#">DIRECTORY</a>
                    <a className="font-mono text-[10px] tracking-widest text-text-main/50 hover:text-[#f04242] transition-colors" href="#">TRANSMISSIONS</a>
                    <a className="font-mono text-[10px] tracking-widest text-text-main border-b border-[#f04242] pb-1" href="#">VISUAL_GRID</a>
                </div>
            </nav>

            {/* Left aside – template: fixed left-0 top-0 h-full w-10 hidden lg:flex */}
            <aside className="fixed left-16 top-0 h-full w-10 border-r border-border-void hidden lg:flex flex-col items-center justify-between py-24 z-40 pointer-events-none">
                <div className="rotate-90 font-mono text-[9px] text-text-main/40 tracking-[0.4em] whitespace-nowrap">
                    LAT: 52.3676° N
                </div>
                <div className="rotate-90 font-mono text-[9px] text-[#f04242] tracking-[0.4em] whitespace-nowrap uppercase font-bold">
                    Grid_Active
                </div>
                <div className="rotate-90 font-mono text-[9px] text-text-main/40 tracking-[0.4em] whitespace-nowrap">
                    LNG: 4.9041° E
                </div>
            </aside>

            {/* Main – template: pt-16 lg:pl-10 */}
            <main className="pt-24 lg:pl-10">
                {/* Header */}
                <header className="px-6 py-8 border-b border-border-void flex flex-col md:flex-row justify-between items-end gap-6 bg-void-matte">
                    <div className="space-y-1">
                        <h1 className="font-mono text-2xl md:text-3xl font-bold tracking-tighter uppercase text-text-main">
                            The_Archive_Grid
                        </h1>
                        <p className="font-mono text-[10px] text-text-main/50 uppercase tracking-[0.2em]">
                            Visual Telemetry Mode // Sector: Deep_Space_Core
                        </p>
                    </div>
                    <div className="flex items-center gap-12 font-mono text-[9px] text-text-main/50">
                        <div className="flex flex-col items-start border-l border-border-void pl-4">
                            <span className="text-text-main/40">DATA_DENSITY</span>
                            <span className="text-text-main">ULTRA_HIGH</span>
                        </div>
                        <div className="flex flex-col items-start border-l border-border-void pl-4">
                            <span className="text-text-main/40">INDEXED_CELLS</span>
                            <span className="text-text-main">2,048 UNITS</span>
                        </div>
                        <div className="flex flex-col items-start border-l border-[#f04242] pl-4">
                            <span className="text-[#f04242] font-bold">CONNECTION</span>
                            <span className="text-[#f04242] animate-pulse">ENCRYPTED</span>
                        </div>
                    </div>
                </header>

                {/* Grid – template: auto-fill minmax(120px,1fr) */}
                <div
                    className="border-t border-l border-border-void/60"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                        width: '100%',
                    }}
                >
                    {gridItems.map((item, i) => {
                        const id = String(i + 1).padStart(3, '0');
                        const img = item.images[0];
                        return (
                            <div
                                key={item.id}
                                className="relative overflow-hidden bg-void-matte border-r border-b border-border-void/60 group"
                                style={{ aspectRatio: '1/1' }}
                            >
                                <img
                                    src={img}
                                    alt={item.title}
                                    className="w-full !h-full object-cover grayscale brightness-75 contrast-125 opacity-60 group-hover:brightness-100 group-hover:opacity-100"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-[#f04242]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <div className="w-1/2 h-1/2 border border-[#f04242]/20" />
                                </div>
                                {/* Cell ID label */}
                                <div className="absolute top-0 left-0 bg-void px-1 py-0.5 z-20 opacity-0 group-hover:opacity-100 transition-all -translate-x-full group-hover:translate-x-0">
                                    <span className="font-mono text-[8px] text-[#f04242] font-bold">ARC_{id}</span>
                                </div>
                                <div className="absolute top-8 left-0 px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-all">
                                    <span className="font-mono text-[6px] text-text-main uppercase tracking-tighter truncate max-w-[100px] block">{item.title}</span>
                                </div>
                                {/* Focus icon */}
                                <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100">
                                    <Focus size={12} className="text-[#f04242]" />
                                </div>
                                {/* Cell border */}
                                <div className="absolute inset-0 border border-border-void/10 pointer-events-none" />
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Footer – template: lg:pl-10 border-t p-6 */}
            <footer className="lg:pl-10 border-t border-border-void bg-void p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-1 font-mono">
                    <button className="text-[9px] px-3 py-1.5 border border-border-void text-text-main/80 hover:bg-text-main hover:text-void transition-all uppercase tracking-widest">
                        Prev_Sector
                    </button>
                    <div className="px-4 text-[9px] text-text-main/50 tracking-widest">
                        PAGE [ 01 / 64 ]
                    </div>
                    <button className="text-[9px] px-3 py-1.5 border border-border-void text-text-main/80 hover:bg-text-main hover:text-void transition-all uppercase tracking-widest">
                        Next_Sector
                    </button>
                </div>
                <div className="flex items-center gap-10">
                    <div className="font-mono text-[9px] text-text-main/50 space-y-0.5 text-right hidden sm:block">
                        <p>UI_OVERLAY: v.4.0.2</p>
                        <p>DATA_STREAM: STABLE</p>
                    </div>
                    <div className="h-6 w-px bg-border-void" />
                    <div className="text-right font-mono text-[9px] text-text-main/50 uppercase">
                        <p>© DEEP_VOID_ARCHIVE</p>
                        <p className="text-[#f04242] font-bold">TERMINAL_SECURE</p>
                    </div>
                </div>
            </footer>

            {/* Scanline overlay */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.05] z-[99]"
                style={{
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.4) 50%)',
                    backgroundSize: '100% 2px',
                }}
            />

            {/* Corner brackets */}
            <div className="fixed top-0 left-0 p-2 lg:p-4 pointer-events-none z-[70]">
                <div className="w-8 h-8 border-t border-l border-[#f04242]/40" />
            </div>
            <div className="fixed top-0 right-0 p-2 lg:p-4 pointer-events-none z-[70]">
                <div className="w-8 h-8 border-t border-r border-[#f04242]/40" />
            </div>
            <div className="fixed bottom-0 left-0 p-2 lg:p-4 pointer-events-none z-[70]">
                <div className="w-8 h-8 border-b border-l border-[#f04242]/40" />
            </div>
            <div className="fixed bottom-0 right-0 p-2 lg:p-4 pointer-events-none z-[70]">
                <div className="w-8 h-8 border-b border-r border-[#f04242]/40" />
            </div>

            {/* Transmitting text */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-text-main/40 tracking-[1em] uppercase opacity-20 pointer-events-none z-50">
                Sector_Zero_Transmitting...
            </div>

            {/* Global Archive Sync Trigger */}
            <div className="mt-20 py-24 flex flex-col items-center justify-center border-t border-border-void/30">
                <div className="h-12 mb-4 flex items-center justify-center">
                    {isFetchingMore && <Loader size={32} />}
                </div>
                <button 
                    onClick={onLoadMore}
                    disabled={isFetchingMore}
                    className={`font-mono text-[10px] uppercase tracking-[0.5em] border border-border-void px-8 py-4 text-text-main hover:bg-primary hover:text-white transition-all duration-500 ${isFetchingMore ? 'opacity-50 cursor-wait' : 'hover:scale-105'}`}
                >
                    {isFetchingMore ? '[ TRANSMITTING_GRID_DATA... ]' : '[ SYNC_EXTENDED_GRID ]'}
                </button>
                <span className="mt-4 font-mono text-[8px] text-text-main/70 font-semibold uppercase tracking-widest">
                    Coordinate: {items.length} High-Res Transmissions Cached
                </span>
            </div>
        </div>
    );
};

export default TheArchiveGrid;
