import React, { useState } from 'react';
import { Minus, Plus, Download } from 'lucide-react';
import DayNightSwitch from './ui/DayNightSwitch';
import NeumorphicToggle from './ui/NeumorphicToggle';
import AMPMToggle from './ui/AMPMToggle';
import StarRating from './ui/StarRating';
import RealismButton from './ui/RealismButton';
import SaveBookmarkSwitch from './ui/SaveBookmarkSwitch';
import CreditsButton from './ui/CreditsButton';
import CloudSaveButton from './ui/CloudSaveButton';
import FolderCard from './ui/FolderCard';
import EyeLoader from './ui/EyeLoader';
import SearchInput from './SearchInput';
import InstallButton from './ui/InstallButton';

/**
 * TheTether component – from the_tether template.
 * System Configuration / Settings page.
 * Features: Typeface toggle, font size control, immersion mode, export, storage, danger zone.
 * 
 * Now enhanced with premium UI components:
 * - DayNightSwitch for theme toggle
 * - NeumorphicToggle for immersion mode
 * - AMPMToggle for time format
 * - StarRating for experience rating
 * - RealismButton for export action
 */
const TheTether = ({ settings, onUpdateSettings }) => {
    const { typeface, baseSize, immersionMode } = settings;
    const isSerif = typeface === 'serif';
    const fontSize = baseSize;
    const [userRating, setUserRating] = React.useState(0);
    const [credits, setCredits] = useState(1280);
    const [isNightMode, setIsNightMode] = React.useState(() => {
        return !document.documentElement.classList.contains('light');
    });
    const [is24Hr, setIs24Hr] = React.useState(false);

    React.useEffect(() => {
        if (isNightMode) {
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
        }
    }, [isNightMode]);

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

                    {/* Immersion Mode – Premium Neumorphic Toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Immersion Mode</label>
                            <span className="text-xs font-mono text-text-muted">Hide all UI elements while scrolling</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <NeumorphicToggle 
                                checked={immersionMode}
                                onChange={() => onUpdateSettings({ immersionMode: !immersionMode })}
                            />
                            <span className="text-sm font-medium text-text-muted uppercase font-mono">
                                {immersionMode ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    {/* Theme Mode – Premium Day/Night Switch */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Theme Mode</label>
                            <span className="text-xs font-mono text-text-muted">Dark void or illuminated reading</span>
                        </div>
                        <DayNightSwitch 
                            checked={!isNightMode}
                            onChange={() => setIsNightMode(!isNightMode)}
                        />
                    </div>

                    {/* Time Format – Premium AM/PM Toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Time Format</label>
                            <span className="text-xs font-mono text-text-muted">AM/PM or 24-hour clock display</span>
                        </div>
                        <AMPMToggle 
                            checked={is24Hr}
                            onChange={() => setIs24Hr(!is24Hr)}
                        />
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
                    {/* Export – Premium Cloud Save Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Export Settings</label>
                            <span className="text-xs font-mono text-text-muted">Export current system configurations to a JSON file</span>
                        </div>
                        <CloudSaveButton 
                            onClick={async () => {
                                // Simulate dynamic file compilation
                                await new Promise(resolve => setTimeout(resolve, 1500));
                                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
                                const downloadAnchor = document.createElement('a');
                                downloadAnchor.setAttribute("href", dataStr);
                                downloadAnchor.setAttribute("download", "system_settings.json");
                                document.body.appendChild(downloadAnchor);
                                downloadAnchor.click();
                                downloadAnchor.remove();
                            }}
                        >
                            Export config
                        </CloudSaveButton>
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

                {/* SECTION 03: EXPERIENCE */}
                <div className="md:col-span-4 border-t border-border-void pt-4">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-text-muted mb-2">03 // Experience</h3>
                    <p className="text-xs text-text-muted font-mono leading-relaxed">
                        Rate your experience and help us improve.
                    </p>
                </div>
                <div className="md:col-span-8 border-t border-border-void pt-4 space-y-10">
                    {/* Star Rating – Premium Animated Stars */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Rate Experience</label>
                            <span className="text-xs font-mono text-text-muted">How's the void treating you?</span>
                        </div>
                        <StarRating value={userRating} onChange={setUserRating} />
                    </div>
                </div>

                {/* Spacer */}
                <div className="col-span-full h-8"></div>

                {/* SECTION 04: HAZARD */}
                <div className="md:col-span-4 border-t border-border-void pt-4">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-primary mb-2">04 // Hazard</h3>
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

                {/* Spacer */}
                <div className="col-span-full h-8"></div>

                {/* SECTION 05: INTERACTIVE TELEMETRY */}
                <div className="md:col-span-4 border-t border-border-void pt-4">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-text-muted mb-2">05 // Telemetry Showcase</h3>
                    <p className="text-xs text-text-muted font-mono leading-relaxed">
                        Interact with custom visual transmission protocols designed for high-density interfaces.
                    </p>
                </div>
                <div className="md:col-span-8 border-t border-border-void pt-4 space-y-10">
                    {/* Bookmark Toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Bookmark Node</label>
                            <span className="text-xs font-mono text-text-muted">Spring-animated checkbox saving protocol</span>
                        </div>
                        <SaveBookmarkSwitch defaultChecked />
                    </div>

                    {/* Search Input */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Cyber Search Aperture</label>
                            <span className="text-xs font-mono text-text-muted">
                                Morphing telemetry input. Click glass to expand.
                            </span>
                        </div>
                        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                            <SearchInput placeholder="Search archives..." />
                        </div>
                    </div>

                    {/* Credits Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Credits Ledger</label>
                            <span className="text-xs font-mono text-text-muted">
                                Current Credits: <span className="text-primary font-bold font-mono">{credits} Cr</span>
                            </span>
                        </div>
                        <CreditsButton onClick={() => setCredits(c => c + 10)}>
                            Add 10 Credits
                        </CreditsButton>
                    </div>

                    {/* Folder Card */}
                    <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                        <div>
                            <label className="block text-lg font-bold mb-1">Sacred Archive Vault</label>
                            <span className="text-xs font-mono text-text-muted block max-w-sm">
                                3D-perspective folder cards containing fanned file indexes. Features real-time content filtering.
                            </span>
                        </div>
                        <div className="w-full sm:w-auto flex justify-center sm:justify-end pt-4 sm:pt-0">
                            <FolderCard />
                        </div>
                    </div>

                    {/* Cybernetic Eye Loader */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Cybernetic Aperture Scanner</label>
                            <span className="text-xs font-mono text-text-muted">
                                Holographic ocular loader with organic blinking and focus sweeps. Used for system diagnostics.
                            </span>
                        </div>
                        <div className="flex justify-center items-center py-2 pr-6">
                            <EyeLoader size={78} />
                        </div>
                    </div>

                    {/* Progress Install Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <label className="block text-lg font-bold mb-1">Vault Installer</label>
                            <span className="text-xs font-mono text-text-muted">
                                Action switch morphing to dynamic rotating indicator track and completing success locks.
                            </span>
                        </div>
                        <div className="flex justify-center items-center py-2">
                            <InstallButton duration={3000} idleText="Install" completedText="Ready" />
                        </div>
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
