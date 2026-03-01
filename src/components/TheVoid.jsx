import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowUp, Play, Pause, Minus, Plus } from 'lucide-react';

/**
 * TheVoid component – reader view, mobile-friendly.
 * Responsive controls, flexible layout, safe padding for mobile bottom nav.
 */
const TheVoid = ({
    title, author, date, readTime, content, onBack = () => { },
    settings = { typeface: 'serif', baseSize: 20, immersionMode: true },
    audioUrl, images = [], tags = []
}) => {
    const { typeface, baseSize, immersionMode } = settings;
    const fontClass = typeface === 'serif' ? 'font-body' : 'font-mono';

    const [fontSize, setFontSize] = useState(baseSize);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showImageModal, setShowImageModal] = useState(null);
    const [showControls, setShowControls] = useState(true);
    const audioRef = useRef(null);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (isPlaying) { audioRef.current.pause(); } else { audioRef.current.play(); }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="min-h-screen bg-void text-text-main transition-colors duration-700">
            {/* Top bar — sticky so it stays in flow and doesn't overlap content */}
            <div className="sticky top-0 z-50 bg-void/95 backdrop-blur-md border-b border-border-void px-4 py-3 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted hover:text-text-main transition-colors"
                >
                    <ArrowLeft size={12} />
                    Back
                </button>

                <div className="flex items-center gap-2">
                    {audioUrl && (
                        <>
                            <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
                            <button
                                onClick={toggleAudio}
                                className="flex items-center justify-center w-8 h-8 border border-border-void text-text-main hover:bg-text-main hover:text-void transition-all"
                            >
                                {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                            </button>
                        </>
                    )}
                    <button onClick={() => setFontSize(s => Math.max(s - 2, 14))} className="w-8 h-8 flex items-center justify-center border border-border-void text-text-muted hover:text-text-main transition-colors text-xs"><Minus size={12} /></button>
                    <button onClick={() => setFontSize(s => Math.min(s + 2, 36))} className="w-8 h-8 flex items-center justify-center border border-border-void text-text-muted hover:text-text-main transition-colors text-xs"><Plus size={12} /></button>
                </div>
            </div>

            <article className="w-full max-w-[750px] mx-auto px-6 md:px-12 pb-32 pt-40">
                {/* Title — responsive sizing */}
                <h1
                    className="font-display leading-[1.3] tracking-tighter mb-6 transition-all duration-500 font-bold"
                    style={{ fontSize: `clamp(28px, calc(${fontSize}px * 2.2), calc(${fontSize}px * 2.6))` }}
                >
                    {title || "The Architecture of Silence"}
                </h1>

                {/* Meta */}
                <div className="border-t border-border-void pt-6 mb-10 font-mono text-[10px] uppercase tracking-widest text-text-muted flex flex-wrap gap-3 md:gap-4 items-center">
                    <span>{author ? author.toUpperCase() : "LINK RESTRICTED"}</span>
                    <span>·</span>
                    <span>{readTime && !String(readTime).toUpperCase().includes('MIN') ? `${readTime} MIN READ` : (readTime || "12 MIN READ")}</span>
                    <span>·</span>
                    <span>{date || "24.10.2023"}</span>
                </div>

                {/* Tags */}
                {tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-10">
                        {tags.map(tag => (
                            <span key={tag} className="font-mono text-[9px] border border-border-void px-2 py-0.5 text-text-muted hover:border-primary/40 hover:text-primary transition-colors">
                                #{tag.toUpperCase()}
                            </span>
                        ))}
                    </div>
                )}

                {/* Images Grid — responsive */}
                {images?.length > 0 && (
                    <div className="mb-10">
                        <div className={`grid gap-3 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                            {images.map((img, idx) => {
                                const src = typeof img === 'string' ? img : img.url;
                                const imgTitle = typeof img === 'object' ? img.title : '';
                                return (
                                    <div
                                        key={idx}
                                        className="relative overflow-hidden border border-border-void cursor-pointer group"
                                        onClick={() => setShowImageModal(src)}
                                    >
                                        <img
                                            src={`https://imbajrangi.github.io/Company/Vrindopnishad%20Web/sketch/main/${src}`}
                                            alt={imgTitle || title}
                                            className="w-full h-36 md:h-48 object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                            onError={e => { e.target.src = src; }}
                                        />
                                        {imgTitle && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-void/80 px-3 py-2 font-mono text-[9px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                                                {imgTitle}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Content — responsive font */}
                <div
                    className={`${fontClass} leading-[1.85] tracking-normal space-y-6 transition-all duration-500 text-text-main/90`}
                    style={{ whiteSpace: 'pre-line', fontSize: `${fontSize}px` }}
                >
                    {content || `In the cacophony of the digital age, silence has become a luxury commodity. We trade our attention for dopamine, scrolling through infinite feeds that demand everything and return nothing.

True minimalism is not about the absence of objects, but the presence of meaning. When we strip away the decorative chrome of our interfaces, we are left with the raw data of human expression.

Consider the terminal. A black screen, a blinking cursor. It is the most honest interface we have ever built.`}
                </div>

                {/* End of Transmission */}
                <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-border-void flex flex-col items-center gap-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-text-muted">End of Transmission.</span>
                    <button
                        onClick={onBack}
                        className="btn-invert px-8 py-4"
                    >
                        [ Back to Archive ]
                    </button>
                </div>

                <div className="flex justify-center mt-8 opacity-30">
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-text-muted hover:text-text-main transition-colors">
                        <ArrowUp size={24} />
                    </button>
                </div>
            </article>

            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowImageModal(null)}>
                    <div className="relative max-w-[90vw] max-h-[90vh]">
                        <button className="absolute -top-8 right-0 font-mono text-[#404040] hover:text-white transition-colors text-xl" onClick={() => setShowImageModal(null)}>×</button>
                        <img src={showImageModal} alt="" className="max-w-full max-h-[85vh] object-contain" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TheVoid;
