import React from 'react';
import { Lock } from 'lucide-react';
import SciFiLoader from './ui/SciFiLoader';
import RealismButton from './ui/RealismButton';

/**
 * TheSplash – exact clone of the_airlock_21/code.html
 * Full-screen "Enter the Void" splash with premium SciFi loader,
 * Realism glassmorphic button, blinking cursor, red glow on hover,
 * manifesto text, and bottom status bar.
 */
const TheSplash = ({ onEnter }) => {
    return (
        <div className="fixed inset-0 z-[200] bg-[#050505] text-[#E5E5E5] h-screen w-full overflow-hidden flex flex-col items-center justify-center font-display antialiased selection:bg-[#333333] selection:text-white">
            {/* Noise overlay */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgyjEX08k7rB7INFaC2eR0OFlcunjJch52-aMNk4W7Tf9Y1XQXxbWjcXDHYPyd8Huv-rsCrxgv-cLYQ0lTbbS3Q7uPwwHslf25wEUQHXcBdWj4ndec1fLaZfyG9qmNAMz1hkrPBayyQfsCnPxE7tmf28BIVdmUk9xzEQK49q8eHkV_6CY4Id2Tw3VmsLSzX-23smiTJOyAFBCl0IMzdTnA0dbyTjR2hMGLshbq9THOKlt7MBxI8diKfI1Ry6L_cOGPTRY-xugXHH0')",
                }}
            />

            {/* Main Container */}
            <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-6 gap-8">
                {/* SciFi Loader – Premium animated concentric circles */}
                <div className="group flex flex-col items-center gap-4">
                    <div className="relative scale-[0.55] md:scale-75 -my-12">
                        {/* Glowing aura behind loader */}
                        <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <SciFiLoader />
                    </div>
                    {/* Manifesto (fades in on hover) */}
                    <div className="h-16 flex items-center justify-center">
                        <p className="text-[#404040] text-sm md:text-base font-normal text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
                            Silence is a luxury. Read in peace.
                        </p>
                    </div>
                </div>

                {/* Entrance CTA – Premium Realism Button */}
                <RealismButton onClick={onEnter}>
                    [ Enter The Void ]
                </RealismButton>
            </main>

            {/* Footer / Status */}
            <footer className="fixed bottom-8 w-full px-8 flex justify-between items-end text-[10px] md:text-xs font-mono text-[#404040] uppercase tracking-widest opacity-40">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f04242] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                    <span>System Status: Online</span>
                </div>
                <div className="text-right hidden md:block">
                    <span>v.1.0.4 // Void Protocol</span>
                </div>
            </footer>

            {/* Decorative Top Right Corner */}
            <div className="fixed top-8 right-8 text-[#404040] opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-help">
                <Lock size={24} />
            </div>
        </div>
    );
};

export default TheSplash;
