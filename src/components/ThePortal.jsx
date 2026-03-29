import React, { useState } from 'react';
import { Send, Music, Bell, Smartphone, ShieldCheck, Zap, History, Info, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThePortal = ({ premiumStats = { totalReflections: 0, soulSeekers: 0 } }) => {
    const [targetApp, setTargetApp] = useState('all'); // 'all', 'premium', 'mobile'
    const [notification, setNotification] = useState({
        title: '',
        body: '',
        imageUrl: '',
        sound: 'default'
    });
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

    const sounds = [
        { id: 'default', name: 'Standard Alert', icon: <Volume2 size={14} /> },
        { id: 'flute', name: 'Divine Flute', icon: <Music size={14} /> },
        { id: 'temple_bell', name: 'Temple Bell', icon: <Bell size={14} /> },
        { id: 'shankh', name: 'Sacred Shankh', icon: <Zap size={14} /> },
    ];

    const handleSend = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setStatus(null);

        // Simulation of sending notification
        try {
            // In a real scenario, this would call FCM API or a backend proxy
            console.log('Sending notification:', { targetApp, ...notification });
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setStatus({
                type: 'success',
                message: `Transmission successful. Broadcasted to ${targetApp === 'all' ? 'all synchronized devices' : targetApp + ' users'}.`
            });
            
            // Reset form on success
            setNotification({
                title: '',
                body: '',
                imageUrl: '',
                sound: 'default'
            });
        } catch (err) {
            setStatus({
                type: 'error',
                message: 'Transmission failed: Signal interference detected.'
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="p-8 md:p-12 lg:p-20 bg-void min-h-screen text-text-main font-mono overflow-y-auto custom-scroll">
            <header className="mb-16 border-b border-primary/20 pb-8">
                <div className="flex items-center gap-4 mb-2">
                    <ShieldCheck className="text-primary" size={32} />
                    <h1 className="text-4xl font-bold tracking-tighter text-white">THE PORTAL</h1>
                </div>
                <p className="text-xs text-text-muted uppercase tracking-[0.3em]">Unified Command & Control Interface</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* CONFIGURATION COLUMN */}
                <div className="lg:col-span-2 space-y-12">
                    <motion.section 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-void-light border border-white/5 p-8 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap size={120} className="text-primary" />
                        </div>

                        <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <Send size={20} className="text-primary" />
                            BROADCAST TRANSMISSION
                        </h2>

                        <form onSubmit={handleSend} className="space-y-8 relative z-10">
                            {/* TARGET SELECTION */}
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase text-text-muted tracking-widest">Target Vector</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {['all', 'premium', 'mobile'].map((app) => (
                                        <button
                                            key={app}
                                            type="button"
                                            onClick={() => setTargetApp(app)}
                                            className={`py-4 border text-[10px] uppercase tracking-widest transition-all flex flex-col items-center gap-3 ${targetApp === app ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(255,51,51,0.2)]' : 'border-white/10 text-text-muted hover:border-white/30'}`}
                                        >
                                            <Smartphone size={18} />
                                            {app === 'all' ? 'SYNC ALL' : app}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* CONTENT FIELDS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-text-muted">Transmission Header</label>
                                        <input 
                                            required
                                            className="w-full bg-void border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white"
                                            value={notification.title}
                                            onChange={e => setNotification({...notification, title: e.target.value})}
                                            placeholder="Enter notification title..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-text-muted">Visual Payload (Image URL)</label>
                                        <input 
                                            className="w-full bg-void border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white"
                                            value={notification.imageUrl}
                                            onChange={e => setNotification({...notification, imageUrl: e.target.value})}
                                            placeholder="https://content.vrindopnishad.in/..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase text-text-muted">Core Message Body</label>
                                    <textarea 
                                        required
                                        rows={5}
                                        className="w-full bg-void border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white resize-none h-full"
                                        value={notification.body}
                                        onChange={e => setNotification({...notification, body: e.target.value})}
                                        placeholder="Enter the sacred message..."
                                    />
                                </div>
                            </div>

                            {/* SOUND SELECTOR */}
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase text-text-muted tracking-widest text-primary">Acoustic Signature (Custom Sound)</label>
                                <div className="flex flex-wrap gap-4">
                                    {sounds.map((s) => (
                                        <button
                                            key={s.id}
                                            type="button"
                                            onClick={() => setNotification({...notification, sound: s.id})}
                                            className={`px-6 py-3 border text-[9px] uppercase tracking-widest transition-all flex items-center gap-3 ${notification.sound === s.id ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-white/10 text-text-muted hover:border-white/30'}`}
                                        >
                                            {s.icon}
                                            {s.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* STATUS MESSAGE */}
                            <AnimatePresence>
                                {status && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`p-4 border text-xs ${status.type === 'success' ? 'bg-green-500/10 border-green-500/40 text-green-400' : 'bg-red-500/10 border-red-500/40 text-red-400'}`}
                                    >
                                        {status.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button 
                                type="submit"
                                disabled={isSending}
                                className={`w-full py-5 bg-primary text-white text-sm font-bold tracking-[0.5em] uppercase flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(255,51,51,0.3)]`}
                            >
                                {isSending ? (
                                    <>
                                        <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>TRANSMITTING...</span>
                                    </>
                                ) : (
                                    <>
                                        <Zap size={18} />
                                        <span>INITIATE BROADCAST</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.section>
                </div>

                {/* INFO / PREVIEW COLUMN */}
                <div className="space-y-12">
                    <section className="bg-void-light border border-white/5 p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-tighter">
                            <Info size={18} className="text-primary" />
                            System Intel
                        </h2>
                        <div className="space-y-6">
                            <div className="p-4 bg-void border border-white/5">
                                <p className="text-[10px] text-text-muted uppercase mb-2">INTEGRATED_SPIRITUAL_NODES</p>
                                <p className="text-3xl font-bold text-primary">{premiumStats.totalReflections.toLocaleString()}</p>
                            </div>
                            <div className="p-4 bg-void border border-white/5">
                                <p className="text-[10px] text-text-muted uppercase mb-2">Global_Active_Channels</p>
                                <div className="space-y-3 mt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-white uppercase">Premium_App_Node</span>
                                        <span className={`text-[10px] font-bold ${premiumStats.totalReflections > 0 ? 'text-green-500' : 'text-primary animate-pulse'}`}>
                                            {premiumStats.totalReflections > 0 ? 'STABLE' : 'SEARCHING...'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-white uppercase">Soul_Seeker_Stream</span>
                                        <span className={`text-[10px] font-bold ${premiumStats.soulSeekers > 0 ? 'text-green-500' : 'text-primary'}`}>
                                            {premiumStats.soulSeekers > 0 ? 'ACTIVE_DATA' : 'IDLE'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-white uppercase">Signal_Link_Quality</span>
                                        <span className="text-[10px] text-primary font-bold animate-pulse">99.9%_SYNC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-void-light border border-white/5 p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-tighter">
                            <History size={18} className="text-primary" />
                            Recent Logs
                        </h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="text-[10px] border-l-2 border-primary/30 pl-4 py-2 hover:bg-white/5 transition-colors cursor-default">
                                    <p className="text-text-muted mb-1">27.03.26 | 20:15</p>
                                    <p className="text-white font-medium uppercase tracking-wider">Ekam Satsang Notification</p>
                                    <p className="text-primary mt-1">SUCCESS [12,402 NODES]</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ThePortal;
