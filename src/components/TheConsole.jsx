import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Play, CheckCircle, AlertTriangle, RefreshCw, Layers, ShieldCheck, Database, Server, Smartphone, Compass, Image, Star, Heart, Code } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const TheConsole = () => {
    const [selectedProject, setSelectedProject] = useState('FOODY_VRINDA');
    const [terminalLogs, setTerminalLogs] = useState([
        { time: new Date().toLocaleTimeString(), text: 'SYSTEM CONSOLE LINK INITIALIZED.', type: 'info' },
        { time: new Date().toLocaleTimeString(), text: 'Ready to query local developer nodes.', type: 'info' }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [connectionStates, setConnectionStates] = useState({
        FOODY_VRINDA: 'ONLINE',
        VRINDA_TOURS: 'ONLINE',
        CHITRA_VRINDA: 'ONLINE',
        SANT_VAANI_PREMIUM: 'MAINTENANCE',
        VRINDA_BLOG: 'ONLINE',
        SPIRIT_DEV: 'ONLINE'
    });
    const [projectStatuses, setProjectStatuses] = useState({});
    const terminalEndRef = useRef(null);

    const projectsList = [
        {
            id: 'FOODY_VRINDA',
            name: 'Foody Vrinda',
            type: 'Mobile Application (Flutter)',
            icon: <Smartphone size={20} />,
            db: 'Cloud Firestore',
            version: 'v1.2.0-stable',
            color: '#FF7300',
            repo: 'github.com/vrinda/foody-vrinda-app',
            metrics: {
                label1: 'Active Orders',
                value1: '42 Live',
                label2: 'Active Couriers',
                value2: '18 Online',
                label3: 'Open Kitchens',
                value3: '6 Active'
            }
        },
        {
            id: 'VRINDA_TOURS',
            name: 'Vrinda Tours',
            type: 'Web Portal (React / Next.js)',
            icon: <Compass size={20} />,
            db: 'Supabase PostgreSQL',
            version: 'v2.4.5-stable',
            color: '#00C6FF',
            repo: 'github.com/vrinda/vrinda-tours-web',
            metrics: {
                label1: 'Daily Bookings',
                value1: '120 Booked',
                label2: 'Active Guides',
                value2: '24 Assigned',
                label3: 'Web Vitals LCP',
                value3: '1.2s (Good)'
            }
        },
        {
            id: 'CHITRA_VRINDA',
            name: 'Chitra Vrinda',
            type: 'Vedic Art Gallery (React)',
            icon: <Image size={20} />,
            db: 'Firebase RT Database',
            version: 'v1.0.8-alpha',
            color: '#E040FB',
            repo: 'github.com/vrinda/chitra-vrinda-gallery',
            metrics: {
                label1: 'Paintings Cataloged',
                value1: '450 Pieces',
                label2: 'Daily Visitors',
                value2: '1,420 Unique',
                label3: 'High-Res Downloads',
                value3: '88 today'
            }
        },
        {
            id: 'SANT_VAANI_PREMIUM',
            name: 'Sant-Vaani Premium',
            type: 'Spiritual Streaming App',
            icon: <Star size={20} />,
            db: 'PostgreSQL & Redis',
            version: 'v0.9.2-beta',
            color: '#FFD700',
            repo: 'github.com/vrinda/sant-vaani-premium',
            metrics: {
                label1: 'Active Listeners',
                value1: '320 Seekers',
                label2: 'Audio Tracks',
                value2: '1,200 Files',
                label3: 'Seekers Registered',
                value3: '14,250 Total'
            }
        },
        {
            id: 'VRINDA_BLOG',
            name: 'Vrinda Vaani',
            type: 'Static Devotional Blog',
            icon: <Heart size={20} />,
            db: 'Markdown / Contentful',
            version: 'v3.1.2',
            color: '#FF4081',
            repo: 'github.com/vrinda/vrinda-vaani-blog',
            metrics: {
                label1: 'Published Articles',
                value1: '342 Posts',
                label2: 'Subscribers',
                value2: '4,520 Emails',
                label3: 'CDN Cache Hit',
                value3: '98.5%'
            }
        },
        {
            id: 'SPIRIT_DEV',
            name: 'Spirit-Dev Archive',
            type: 'Developer Docs Portal',
            icon: <Code size={20} />,
            db: 'None (Static Site)',
            version: 'v1.0.0',
            color: '#00E676',
            repo: 'github.com/vrinda/spirit-dev-docs',
            metrics: {
                label1: 'API Endpoints',
                value1: '64 Documented',
                label2: 'System Latency',
                value2: '45ms (Avg)',
                label3: 'Dev Active Links',
                value3: '100% Online'
            }
        }
    ];

    const currentProj = projectsList.find(p => p.id === selectedProject) || projectsList[0];

    const addLog = (text, type = 'info') => {
        setTerminalLogs(prev => {
            const next = [...prev, { time: new Date().toLocaleTimeString(), text, type }];
            return next.length > 400 ? next.slice(next.length - 400) : next;
        });
    };

    const fetchStatuses = async () => {
        try {
            const res = await fetch('/api/console/status');
            if (res.ok) {
                const data = await res.json();
                setProjectStatuses(data);
                
                // Update connection states mapping
                const states = {};
                Object.keys(data).forEach(key => {
                    states[key] = data[key].status;
                });
                setConnectionStates(prev => ({ ...prev, ...states }));
            }
        } catch (err) {
            console.error('Error fetching project statuses:', err);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchStatuses();
        }, 0);
        const interval = setInterval(fetchStatuses, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [terminalLogs]);

    const runProjectAction = (actionType) => {
        if (isProcessing) return;
        setIsProcessing(true);
        
        addLog(`------------------------------------------------`, 'info');
        addLog(`EXECUTE: [${actionType.toUpperCase()}] on [${currentProj.name}]`, 'info');
        
        const eventSource = new EventSource(`/api/console/run-command?projectId=${selectedProject}&action=${actionType}`);
        
        eventSource.onmessage = (event) => {
            if (event.data === '[DONE]') {
                eventSource.close();
                setIsProcessing(false);
                fetchStatuses();
                return;
            }
            try {
                const data = JSON.parse(event.data);
                if (data.text) {
                    addLog(data.text, data.type || 'info');
                }
            } catch {
                addLog(event.data, 'info');
            }
        };

        eventSource.onerror = () => {
            addLog(`SIGNAL STREAM INTERRUPTION: Gateway close or process timeout.`, 'error');
            eventSource.close();
            setIsProcessing(false);
            fetchStatuses();
        };
    };

    return (
        <div className="p-8 md:p-12 lg:p-20 bg-void min-h-screen text-text-main font-mono overflow-y-auto custom-scroll">
            <header className="mb-16 border-b border-primary/20 pb-8">
                <div className="flex items-center gap-4 mb-2">
                    <Cpu className="text-primary" size={32} />
                    <h1 className="text-4xl font-bold tracking-tighter text-text-main">SYSTEM CONSOLE</h1>
                </div>
                <p className="text-xs text-text-muted uppercase tracking-[0.3em]">Unified Platform Control & Diagnostics Hub</p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* PROJECTS LIST GRID */}
                <div className="xl:col-span-2 space-y-8">
                    <h2 className="text-lg font-bold text-text-main flex items-center gap-3 uppercase">
                        <Layers size={18} className="text-primary" />
                        Synchronized Platforms
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projectsList.map((proj) => {
                            const state = connectionStates[proj.id];
                            return (
                                <motion.div
                                    key={proj.id}
                                    onClick={() => setSelectedProject(proj.id)}
                                    whileHover={{ scale: 1.01 }}
                                    className={`p-6 border cursor-pointer relative group transition-all duration-300 ${selectedProject === proj.id ? 'bg-void-light border-primary shadow-[0_0_20px_rgba(255,51,51,0.08)]' : 'bg-void-light/40 border-white/5 hover:border-white/20'}`}
                                >
                                    {/* Left Accent Color bar */}
                                    <div 
                                        className="absolute left-0 top-0 bottom-0 w-1" 
                                        style={{ backgroundColor: proj.color }}
                                    />

                                    <div className="flex justify-between items-start mb-4 pl-2">
                                        <div className="flex items-center gap-3">
                                            <div style={{ color: proj.color }}>
                                                {proj.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">{proj.name}</h3>
                                                <p className="text-[10px] text-text-muted mt-0.5">{proj.type}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${state === 'ONLINE' ? 'bg-green-500 shadow-[0_0_8px_#10B981]' : state === 'MAINTENANCE' ? 'bg-orange-500 shadow-[0_0_8px_#F59E0B]' : 'bg-red-500 shadow-[0_0_8px_#EF4444]'} animate-pulse`} />
                                            <span className="text-[9px] font-bold text-text-muted">{state || 'OFFLINE'}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 bg-void/50 p-3 pl-5 text-[9px] uppercase tracking-wider text-text-muted">
                                        <div>
                                            <span className="block text-[8px] text-text-muted mb-0.5">DB Gateway</span>
                                            <span className="text-text-main font-medium truncate block">{proj.db}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[8px] text-text-muted mb-0.5">Git Branch</span>
                                            <span className="text-text-main font-medium truncate block">
                                                {projectStatuses[proj.id]?.gitInfo?.branch || 'N/A'}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block text-[8px] text-text-muted mb-0.5">Last Commit</span>
                                            <span className="text-text-main font-medium truncate block" title={projectStatuses[proj.id]?.gitInfo?.subject || ''}>
                                                {projectStatuses[proj.id]?.gitInfo?.hash ? `${projectStatuses[proj.id].gitInfo.hash} - ${projectStatuses[proj.id].gitInfo.subject}` : 'No commits'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* SELECT PROJECT CONTROL BOARD */}
                    {currentProj && (
                        <motion.section
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-void-light border border-white/5 p-8 relative overflow-hidden"
                        >
                            <h3 className="text-sm font-bold text-text-main mb-6 uppercase tracking-wider flex items-center gap-3">
                                <Database size={16} className="text-primary" />
                                Control Board: {currentProj.name}
                            </h3>

                            {/* Quick Metrics display */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="p-4 bg-void border border-white/5 relative">
                                    <span className="text-[8px] uppercase text-text-muted block mb-1">Local Directory Path</span>
                                    <span className="text-[10px] font-bold text-text-main block truncate" title={projectStatuses[currentProj.id]?.path || currentProj.repo}>
                                        {projectStatuses[currentProj.id]?.path || 'Not Found'}
                                    </span>
                                </div>
                                <div className="p-4 bg-void border border-white/5 relative">
                                    <span className="text-[8px] uppercase text-text-muted block mb-1">Git Commit Author / Date</span>
                                    <span className="text-[10px] font-bold text-text-main block truncate">
                                        {projectStatuses[currentProj.id]?.gitInfo?.author ? `${projectStatuses[currentProj.id].gitInfo.author} (${projectStatuses[currentProj.id].gitInfo.date})` : 'N/A'}
                                    </span>
                                </div>
                                <div className="p-4 bg-void border border-white/5 relative">
                                    <span className="text-[8px] uppercase text-text-muted block mb-1">Status Check</span>
                                    <span className="text-[10px] font-bold text-text-main block">
                                        {projectStatuses[currentProj.id]?.status || 'OFFLINE'}
                                    </span>
                                </div>
                            </div>

                            {/* Actions panel */}
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => runProjectAction('test')}
                                    disabled={isProcessing}
                                    className="px-5 py-3 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Server size={14} />
                                    Test Gateway (Git Status)
                                </button>
                                <button
                                    onClick={() => runProjectAction('audit')}
                                    disabled={isProcessing}
                                    className="px-5 py-3 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    <ShieldCheck size={14} />
                                    Audit Policies (Lint/Analyze)
                                </button>
                                <button
                                    onClick={() => runProjectAction('build')}
                                    disabled={isProcessing}
                                    className="px-5 py-3 bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Play size={14} />
                                    Trigger Build
                                </button>
                                <button
                                    onClick={() => runProjectAction('purge')}
                                    disabled={isProcessing}
                                    className="px-5 py-3 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    <RefreshCw size={14} className={isProcessing ? 'animate-spin' : ''} />
                                    Purge Cache (Clean)
                                </button>
                            </div>
                        </motion.section>
                    )}
                </div>

                {/* TERMINAL LOGS COLUMN */}
                <div className="space-y-8">
                    <h2 className="text-lg font-bold text-text-main flex items-center gap-3 uppercase">
                        <Terminal size={18} className="text-primary" />
                        Transmitted Signal Stream
                    </h2>

                    <div className="bg-black border border-white/10 h-[480px] p-6 font-mono text-[11px] leading-relaxed flex flex-col justify-between relative overflow-hidden">
                        {/* Terminal background effect */}
                        <div className="absolute inset-0 scanline pointer-events-none opacity-[0.03]" />

                        <div className="overflow-y-auto custom-scroll flex-1 pr-2 space-y-3">
                            {terminalLogs.map((log, idx) => (
                                <div key={idx} className="flex gap-3 items-start select-text">
                                    <span className="text-text-muted shrink-0">[{log.time}]</span>
                                    <span className={log.type === 'error' ? 'text-primary' : log.type === 'success' ? 'text-green-400' : 'text-green-300/80'}>
                                        {log.type === 'error' && '⚡ '}
                                        {log.type === 'success' && '✓ '}
                                        {log.text}
                                    </span>
                                </div>
                            ))}
                            {isProcessing && (
                                <div className="flex items-center gap-2 text-text-muted animate-pulse">
                                    <span>... transmitting signal package ...</span>
                                </div>
                            )}
                            <div ref={terminalEndRef} />
                        </div>

                        <div className="border-t border-white/5 pt-4 mt-4 flex items-center gap-2 text-text-muted">
                            <span className="text-primary font-bold animate-pulse">&gt;</span>
                            <span className="text-green-400 select-all">dev-link --project={selectedProject.toLowerCase()} --check-status</span>
                            <span className="w-1.5 h-3.5 bg-green-400 animate-blink shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TheConsole;
