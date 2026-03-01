import React, { useState, useEffect } from 'react';
import { ArrowRight, CornerDownLeft, Infinity, Search, Settings } from 'lucide-react';

/**
 * TheSignal – search/command overlay.
 * exact clone of the_signal/code.html
 * Search input with > prompt, results list, keyboard legend footer.
 * Positioned in center area with blurred background.
 */
const TheSignal = ({ onClose, onSelection }) => {
    const [query, setQuery] = useState('https://w');

    const records = [
        { id: '01', title: 'The Architecture of Silence', date: '24.10.2023', readTime: '12 MIN READ', status: 'Reading' },
        { id: '02', title: 'Brutalist Web Design Principles', date: '12.10.2023', readTime: '8 MIN READ', status: '' },
        { id: '03', title: 'Deep Work vs Shallow Work', date: '08.09.2023', readTime: '15 MIN READ', status: '' },
    ];

    // ESC to close
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col w-full h-full bg-void/90 backdrop-blur-[5px] justify-center items-center font-display text-text-main leading-normal overflow-hidden">
            {/* Background Content (Simulating the 'Archives' view behind the overlay as per master template) */}
            <div aria-hidden="true" className="absolute inset-0 z-0 flex pointer-events-none opacity-20 select-none">
                <div className="w-[60px] border-r border-border-void h-full flex flex-col items-center py-8 gap-8">
                    <Infinity size={20} className="text-text-muted" />
                    <Search size={20} className="text-text-muted" />
                    <Settings size={20} className="text-text-muted" />
                </div>
                <div className="flex-1 p-16 pl-[120px] font-display">
                    <div className="flex flex-col gap-8">
                        {records.map(record => (
                            <div key={record.id} className="border-b border-border-void pb-4">
                                <h1 className="text-2xl text-text-main">{record.title}</h1>
                                <p className="font-mono text-xs text-text-muted mt-2">{record.date} • {record.readTime}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* THE SIGNAL OVERLAY */}
            <div className="relative z-50 w-full max-w-4xl px-8 flex flex-col">
                {/* Command Input Area */}
                <div className="relative group mb-12">
                    <div className="flex items-end gap-4 border-b border-transparent focus-within:border-primary/50 transition-colors duration-300 pb-2">
                        {/* Decorative Prompt Symbol */}
                        <span className="text-4xl text-text-muted select-none pb-1 font-display tracking-tighter">&gt;</span>
                        {/* The Input */}
                        <div className="flex-1 relative">
                            <input
                                autoFocus
                                className="w-full bg-transparent border-none p-0 text-4xl font-bold text-text-main placeholder:text-text-muted/30 focus:ring-0 focus:outline-none font-display tracking-tighter caret-primary"
                                placeholder="Paste URL or search archives..."
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        {/* Dynamic Action Feedback (Visible if https:// is typed) */}
                        {query.startsWith('https://') && (
                            <div className="hidden md:flex items-center gap-3 animate-pulse mb-1">
                                <ArrowRight size={20} className="text-primary" />
                                <span className="text-primary font-mono text-sm tracking-widest">[ ENTER TO CAPTURE ]</span>
                            </div>
                        )}
                    </div>
                    {/* Status Line / Hints */}
                    <div className="flex justify-between mt-2 font-mono text-xs text-text-muted uppercase tracking-wider">
                        <span>Signal Status: <span className="text-primary">Active</span></span>
                        <span className="opacity-50">Protocol Detected: {query.startsWith('https') ? 'HTTPS' : 'NONE'}</span>
                    </div>
                </div>

                {/* Results List (Command Line Output Style) */}
                <div className="flex flex-col w-full">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4 pb-2 border-b border-border-void">
                        <span className="font-mono text-xs text-text-muted uppercase tracking-widest">Matching Records</span>
                        <span className="h-[1px] flex-1 bg-border-void"></span>
                        <span className="font-mono text-xs text-text-muted">{records.length} FOUND</span>
                    </div>
                    {/* List Items */}
                    <ul className="flex flex-col gap-1">
                        {records.map((record) => (
                            <li key={record.id} className="group cursor-pointer" onClick={() => onSelection && onSelection(record)}>
                                <div className={`flex items-center py-3 px-4 -mx-4 transition-colors ${record.status === 'Reading'
                                    ? 'bg-text-muted/10 border-l-2 border-primary'
                                    : 'hover:bg-white/5 border-l-2 border-transparent hover:border-text-muted'
                                    }`}>
                                    <span className={`font-mono mr-4 text-xs ${record.status === 'Reading' ? 'text-primary font-bold' : 'text-text-muted group-hover:text-primary transition-colors'}`}>
                                        {record.id}
                                    </span>
                                    <div className="flex-1 flex flex-col">
                                        <span className={`text-lg font-display leading-tight tracking-tighter ${record.status === 'Reading' ? 'text-text-main font-medium' : 'text-text-muted group-hover:text-text-main'} group-hover:underline decoration-1 underline-offset-4`}>
                                            {record.title}
                                            {record.status && (
                                                <span className="inline-block text-primary bg-primary/10 px-1 text-xs ml-2 font-mono uppercase tracking-wide rounded-[1px]">
                                                    {record.status}
                                                </span>
                                            )}
                                        </span>
                                        <div className="flex gap-4 mt-1">
                                            <span className={`font-mono text-xs text-text-muted ${record.status !== 'Reading' && 'opacity-60'}`}>
                                                {record.date}
                                            </span>
                                            <span className={`font-mono text-xs text-text-muted ${record.status !== 'Reading' && 'opacity-60'}`}>
                                                {record.readTime}
                                            </span>
                                        </div>
                                    </div>
                                    <CornerDownLeft
                                        size={18}
                                        className="text-text-main opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Keyboard Legend Footer */}
            <div className="absolute bottom-12 w-full max-w-4xl px-8 flex items-center justify-between font-mono text-xs text-text-muted">
                <div className="flex gap-6">
                    <button onClick={onClose} className="flex items-center gap-2 hover:text-text-main transition-colors">
                        <span className="border border-border-void px-1.5 py-0.5 rounded-[2px] min-w-[24px] text-center bg-void">ESC</span>
                        <span>CLOSE SIGNAL</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="border border-border-void px-1.5 py-0.5 rounded-[2px] min-w-[24px] text-center bg-void">↑↓</span>
                        <span>NAVIGATE</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="border border-border-void px-1.5 py-0.5 rounded-[2px] min-w-[24px] text-center bg-void">↵</span>
                    <span>OPEN SELECTION</span>
                </div>
            </div>
        </div>
    );
};

export default TheSignal;
