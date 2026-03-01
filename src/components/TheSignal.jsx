import React, { useState, useEffect } from 'react';
import { ArrowRight, CornerDownLeft } from 'lucide-react';

/**
 * TheSignal – search/command overlay.
 * Exact match to the Stitch template: clean dark overlay, centered search,
 * well-spaced result records with numbered IDs.
 */
const TheSignal = ({ onClose, onSelection, items = [] }) => {
    const [query, setQuery] = useState('');

    // Map feed items to clean display records (no UUID leaks)
    const allRecords = items.length > 0
        ? items.slice(0, 20).map((item, idx) => ({
            displayId: String(idx + 1).padStart(2, '0'),
            title: item.title,
            date: item.date || '00.00.00',
            readTime: `${item.readTime || 12} MIN READ`,
            status: idx === 0 ? 'READING' : '',
            originalItem: item,
        }))
        : [
            { displayId: '01', title: 'The Architecture of Silence', date: '24.10.2023', readTime: '12 MIN READ', status: 'READING' },
            { displayId: '02', title: 'Brutalist Web Design Principles', date: '12.10.2023', readTime: '8 MIN READ', status: '' },
            { displayId: '03', title: 'Deep Work vs Shallow Work', date: '08.09.2023', readTime: '15 MIN READ', status: '' },
        ];

    // Filter by search text, or show first 5
    const records = query.length > 0
        ? allRecords.filter(r => r.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
        : allRecords.slice(0, 5);

    // ESC to close
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-sm flex flex-col items-center justify-center">

            {/* Main Container */}
            <div className="w-full max-w-3xl px-8">

                {/* Search Input */}
                <div className="mb-10">
                    <div className="flex items-end gap-4 border-b border-[#262626] pb-3">
                        <span className="text-3xl text-[#404040] select-none font-display">&gt;</span>
                        <input
                            autoFocus
                            className="flex-1 bg-transparent border-none p-0 text-3xl font-bold text-[#e5e5e5] placeholder:text-[#404040]/40 focus:ring-0 focus:outline-none font-display tracking-tight"
                            placeholder="Search archives..."
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{ caretColor: '#FF3333' }}
                        />
                        <div className="hidden md:flex items-center gap-2 shrink-0">
                            <ArrowRight size={16} className="text-[#FF3333]" />
                            <span className="text-[#FF3333] font-mono text-xs tracking-widest whitespace-nowrap">[ ENTER TO CAPTURE ]</span>
                        </div>
                    </div>
                    {/* Status Line */}
                    <div className="flex justify-between mt-3 font-mono text-[10px] text-[#404040] uppercase tracking-[0.2em]">
                        <span>Signal Status: <span className="text-[#FF3333]">ACTIVE</span></span>
                        <span>Protocol Detected: HTTPS</span>
                    </div>
                </div>

                {/* Matching Records Header */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-[10px] text-[#404040] uppercase tracking-[0.2em] shrink-0">Matching Records</span>
                    <div className="flex-1 h-px bg-[#262626]" />
                    <span className="font-mono text-[10px] text-[#404040] shrink-0">{records.length} FOUND</span>
                </div>

                {/* Results List */}
                <div className="flex flex-col">
                    {records.map((record) => {
                        const isActive = !!record.status;
                        return (
                            <div
                                key={record.displayId}
                                className={`flex items-start gap-4 py-4 px-4 -mx-4 cursor-pointer group ${isActive
                                        ? 'bg-[#404040]/10 border-l-2 border-[#FF3333]'
                                        : 'border-l-2 border-transparent hover:bg-[#ffffff]/[0.03] hover:border-[#404040]'
                                    }`}
                                onClick={() => onSelection && onSelection(record.originalItem || record)}
                            >
                                {/* Number */}
                                <span className={`font-mono text-xs pt-1 w-6 shrink-0 ${isActive ? 'text-[#FF3333] font-bold' : 'text-[#404040]'}`}>
                                    {record.displayId}
                                </span>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className={`text-base font-display leading-snug ${isActive ? 'text-[#e5e5e5]' : 'text-[#404040] group-hover:text-[#e5e5e5]'}`}>
                                            {record.title}
                                        </span>
                                        {record.status && (
                                            <span className="text-[#FF3333] bg-[#FF3333]/10 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-[1px]">
                                                {record.status}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-4 mt-1.5">
                                        <span className={`font-mono text-[10px] ${isActive ? 'text-[#404040]' : 'text-[#404040]/60'}`}>
                                            {record.date}
                                        </span>
                                        <span className={`font-mono text-[10px] ${isActive ? 'text-[#404040]' : 'text-[#404040]/60'}`}>
                                            {record.readTime}
                                        </span>
                                    </div>
                                </div>

                                {/* Hover arrow */}
                                <CornerDownLeft size={14} className="text-[#e5e5e5] opacity-0 group-hover:opacity-100 mt-1 shrink-0" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Keyboard Legend Footer */}
            <div className="absolute bottom-10 w-full max-w-3xl px-8 flex items-center justify-between font-mono text-[10px] text-[#404040] tracking-wider">
                <div className="flex gap-6">
                    <button onClick={onClose} className="flex items-center gap-2 hover:text-[#e5e5e5]">
                        <span className="border border-[#262626] px-1.5 py-0.5 rounded-[2px] text-center bg-[#050505]">ESC</span>
                        <span>CLOSE SIGNAL</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="border border-[#262626] px-1.5 py-0.5 rounded-[2px] text-center bg-[#050505]">↑↓</span>
                        <span>NAVIGATE</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="border border-[#262626] px-1.5 py-0.5 rounded-[2px] text-center bg-[#050505]">↵</span>
                    <span>OPEN SELECTION</span>
                </div>
            </div>
        </div>
    );
};

export default TheSignal;
