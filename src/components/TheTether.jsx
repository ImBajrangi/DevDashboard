import React, { useState } from 'react';
import { Minus, Plus, Download } from 'lucide-react';

/**
 * TheTether component – from the_tether template.
 * System Configuration / Settings page.
 * Features: Typeface toggle, font size control, immersion mode, export, storage, danger zone.
 */
const TheTether = ({ settings, onUpdateSettings }) => {
    const { typeface, baseSize, immersionMode } = settings;
    const isSerif = typeface === 'serif';
    const fontSize = baseSize;

    return (
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-24">
            {/* Page Title */}
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 uppercase font-display">System Configuration</h1>
                <p className="font-mono text-text-muted text-sm md:text-base max-w-xl">
                    Define your reading parameters. Silence the noise.
                </p>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12">
                {/* SECTION 01: VISUALS */}
                <div className="md:col-span-4 border-t border-border-void pt-4">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-text-muted mb-2">01 // Visuals</h3>
                    <p className="text-xs text-text-muted font-mono leading-relaxed">
                        Configure typography rendering and interface scale for deep reading sessions.
                    </p>
                </div>
                <div className="md:col-span-8 border-t border-border-void pt-4 space-y-10">
                    {/* Typeface */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Typeface</label>
                            <span className="text-xs font-mono text-text-muted">Standard Sans vs. Classical Serif</span>
                        </div>
                        <div className="flex items-center border border-border-void rounded-sm overflow-hidden">
                            <button
                                onClick={() => onUpdateSettings({ typeface: 'mono' })}
                                className={`px-6 py-2 text-sm font-medium transition-colors ${!isSerif ? 'bg-text-main text-void' : 'hover:bg-text-muted'}`}
                            >
                                SANS
                            </button>
                            <div className="w-px h-full bg-border-void"></div>
                            <button
                                onClick={() => onUpdateSettings({ typeface: 'serif' })}
                                className={`px-6 py-2 text-sm font-medium font-body italic transition-colors ${isSerif ? 'bg-text-main text-void' : 'hover:bg-text-muted'}`}
                            >
                                SERIF
                            </button>
                        </div>
                    </div>

                    {/* Font Size */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Base Size</label>
                            <span className="text-xs font-mono text-text-muted">Reading view character size</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xl w-12 text-center">{fontSize}px</span>
                            <div className="flex items-center border border-border-void rounded-sm">
                                <button
                                    onClick={() => onUpdateSettings({ baseSize: Math.max(fontSize - 2, 12) })}
                                    className="size-10 flex items-center justify-center hover:bg-text-main hover:text-void transition-colors border-r border-border-void"
                                >
                                    <Minus size={18} />
                                </button>
                                <button
                                    onClick={() => onUpdateSettings({ baseSize: Math.min(fontSize + 2, 48) })}
                                    className="size-10 flex items-center justify-center hover:bg-text-main hover:text-void transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Immersion Mode */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Immersion Mode</label>
                            <span className="text-xs font-mono text-text-muted">Hide all UI elements while scrolling</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={immersionMode}
                                onChange={() => onUpdateSettings({ immersionMode: !immersionMode })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-text-muted peer-checked:bg-text-main rounded-sm relative after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-void after:border after:rounded-sm after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                            <span className="ms-3 text-sm font-medium text-text-muted group-hover:text-text-main transition-colors uppercase">
                                {immersionMode ? 'Active' : 'Inactive'}
                            </span>
                        </label>
                    </div>
                </div>

                {/* Spacer */}
                <div className="col-span-full h-8"></div>

                {/* SECTION 02: MEMORY */}
                <div className="md:col-span-4 border-t border-border-void pt-4">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-text-muted mb-2">02 // Memory</h3>
                    <p className="text-xs text-text-muted font-mono leading-relaxed">
                        Manage your local archives. Export readings or clear cache.
                    </p>
                </div>
                <div className="md:col-span-8 border-t border-[#262626] pt-4 space-y-10">
                    {/* Export */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Export Archive</label>
                            <span className="text-xs font-mono text-text-muted">Download all saved articles as JSON</span>
                        </div>
                        <button className="flex items-center gap-2 border border-border-void px-5 py-2.5 rounded-sm text-sm font-bold tracking-wide hover:bg-text-main hover:text-void transition-colors">
                            <Download size={18} />
                            DOWNLOAD_DATA.JSON
                        </button>
                    </div>

                    {/* Storage */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Storage Usage</label>
                            <div className="w-full bg-border-void h-1 mt-2 rounded-full overflow-hidden max-w-[200px]">
                                <div className="bg-text-main h-full w-[45%]"></div>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="block font-mono text-lg">142.5 MB</span>
                            <span className="text-xs font-mono text-text-muted">LOCAL STORAGE</span>
                        </div>
                    </div>
                </div>

                {/* Spacer */}
                <div className="col-span-full h-8"></div>

                {/* SECTION 03: HAZARD */}
                <div className="md:col-span-4 border-t border-border-void pt-4">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-primary mb-2">03 // Hazard</h3>
                    <p className="text-xs text-text-muted font-mono leading-relaxed">
                        Irreversible actions. Tread carefully.
                    </p>
                </div>
                <div className="md:col-span-8 border-t border-[#262626] pt-4 space-y-10">
                    {/* Purge Cache */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                        <div>
                            <label className="block text-lg font-bold mb-1 group-hover:text-primary transition-colors">Purge Cache</label>
                            <span className="text-xs font-mono text-text-muted">Removes all local data. Does not affect synced items.</span>
                        </div>
                        <button className="px-5 py-2.5 rounded-sm text-sm font-bold tracking-wide text-primary border border-primary/30 hover:bg-primary hover:text-white transition-colors uppercase">
                            Execute Purge
                        </button>
                    </div>

                    {/* Delete Account */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group opacity-60 hover:opacity-100 transition-opacity">
                        <div>
                            <label className="block text-lg font-bold mb-1 text-text-muted group-hover:text-primary transition-colors">Sever Connection</label>
                            <span className="text-xs font-mono text-text-muted">Delete account and all associated data permanently.</span>
                        </div>
                        <button className="px-5 py-2.5 rounded-sm text-sm font-bold tracking-wide text-text-muted hover:text-primary border border-transparent hover:border-primary/30 transition-colors uppercase">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-24 pt-8 border-t border-border-void flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-text-muted">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono uppercase tracking-widest">The Deep Void // System V.1.0.4</span>
                    <span className="text-[10px] font-mono opacity-50">BUILD_ID: 8849-AF-X</span>
                </div>
                <div className="flex gap-6">
                    <a className="text-xs font-bold hover:text-text-main uppercase" href="#">Terms</a>
                    <a className="text-xs font-bold hover:text-text-main uppercase" href="#">Privacy</a>
                    <a className="text-xs font-bold hover:text-text-main uppercase" href="#">Support</a>
                </div>
            </div>
        </div>
    );
};

export default TheTether;
