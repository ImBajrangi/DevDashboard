import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Radio, Database, Search, Settings, User, BarChart3, Grid3x3, Trophy, Plus, LogIn, LogOut, Archive, ShieldCheck, ChevronDown, Star, Heart, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';
import { signInWithGoogle, logOut } from '../lib/firebase';

const Layout = ({
    children,
    activeTab = 'feed',
    setActiveTab = () => { },
    title = "The Feed - All Content | Deep Void",
    description = "A digital sanctuary for deep reading and archival silence.",
    settings = { immersionMode: true },
    onSignalOpen = () => { },
    user = null,
    loading = false,
    activeProject = 'ALL_SYSTEMS',
    setActiveProject = () => { },
    projects = []
}) => {
    const isMobile = useMobile();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isProjectMenuOpen, setIsProjectMenuOpen] = React.useState(false);

    const projectIcons = {
        'Radio': <Radio size={14} />,
        'Star': <Star size={14} />,
        'Heart': <Heart size={14} />,
        'Code': <Code size={14} />
    };

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const hideNav = settings.immersionMode && isScrolled;

    const navItems = [
        { id: 'nexus', icon: <Radio size={20} />, label: 'Nexus' },
        { id: 'feed', icon: <Database size={20} />, label: 'Feed' },
        { id: 'archives', icon: <Archive size={20} />, label: 'Archives' },
        { id: 'grid', icon: <Grid3x3 size={20} />, label: 'Grid' },
        { id: 'hierarchy', icon: <BarChart3 size={20} />, label: 'Hierarchy' },
        { id: 'stratification', icon: <Trophy size={20} />, label: 'Rankings' },
        { id: 'forge', icon: <Plus size={20} />, label: 'Forge' },
        { id: 'portal', icon: <ShieldCheck size={20} />, label: 'Portal' },
        { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
        { id: 'profile', icon: <User size={20} />, label: 'Profile' },
    ];

    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content="Vrindavan, Spirituality, Vedic Art, Paath, Divine Knowledge, Deep Reading" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Organization",
                                "@id": "https://vrindopnishad.in/#organization",
                                "name": "Vrindopnishad",
                                "url": "https://vrindopnishad.in/",
                                "description": description
                            },
                            {
                                "@type": "WebSite",
                                "@id": "https://vrindopnishad.in/#website",
                                "url": "https://vrindopnishad.in/",
                                "name": "VRINDOPNISHAD",
                                "publisher": { "@id": "https://vrindopnishad.in/#organization" }
                            }
                        ]
                    })}
                </script>
            </Helmet>

            <div className={`min-h-screen bg-void text-text-main font-display relative ${isMobile ? 'pb-24' : ''}`}>
                {/* Global Top Header Bar */}
                <header className={`fixed top-0 left-0 right-0 h-16 bg-void/90 backdrop-blur-md border-b border-border-void z-[100] transition-all duration-700 ${hideNav ? '-translate-y-full' : 'translate-y-0'}`}>
                    <div className="h-full flex items-center justify-between px-6 pl-20 md:pl-24">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-primary animate-pulse shadow-[0_0_8px_#FF3333]"></div>
                            <span className="font-mono text-[10px] tracking-[0.4em] text-text-muted uppercase font-bold hidden sm:block">SYSTEM_LINK // ACTIVE</span>
                        </div>

                        <div className="flex items-center gap-6">
                            {loading && (
                                <div className="flex items-center gap-2 animate-pulse">
                                    <span className="text-[9px] uppercase tracking-[0.3em] text-primary font-bold">Transmitting</span>
                                    <div className="size-1 bg-primary rounded-full animate-ping"></div>
                                </div>
                            )}
                            
                            {/* Project Selector moved here */}
                            <div className="relative">
                                <button 
                                    onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
                                    className="bg-void border border-white/5 px-4 py-2 flex items-center gap-3 hover:border-primary/50 transition-all group"
                                >
                                    <div className="text-primary group-hover:animate-pulse">
                                        {projectIcons[projects.find(p => p.id === activeProject)?.icon] || <Radio size={14} />}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white whitespace-nowrap">
                                        {projects.find(p => p.id === activeProject)?.label || 'SELECT PROJECT'}
                                    </span>
                                    <ChevronDown size={14} className={`text-text-muted transition-transform duration-300 ${isProjectMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isProjectMenuOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            className="absolute top-full right-0 mt-2 w-64 bg-void border border-primary/30 p-1 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-[110]"
                                        >
                                            {projects.map((proj) => (
                                                <button
                                                    key={proj.id}
                                                    onClick={() => {
                                                        setActiveProject(proj.id);
                                                        setIsProjectMenuOpen(false);
                                                    }}
                                                    className={`w-full flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-widest transition-all hover:bg-primary/10 ${activeProject === proj.id ? 'text-primary bg-primary/5' : 'text-text-muted hover:text-white'}`}
                                                >
                                                    <div className={activeProject === proj.id ? 'text-primary' : 'opacity-40'}>
                                                        {projectIcons[proj.icon]}
                                                    </div>
                                                    <span className="flex-1 text-left">{proj.label}</span>
                                                    {activeProject === proj.id && <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#FF3333]"></div>}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Visual Overlays */}
                <div className="noise-overlay" />
                <div className="fixed inset-0 pointer-events-none scanline opacity-[0.05] z-[99]" />

                {/* Corner Brackets */}
                <div className="fixed top-0 left-0 p-4 pointer-events-none z-[70]">
                    <div className="w-10 h-10 border-t border-l border-primary/20"></div>
                </div>
                <div className="fixed top-0 right-0 p-4 z-[70] pointer-events-none">
                    <div className="size-10 border-t border-r border-primary/20 absolute top-4 right-4"></div>
                </div>
                <div className="fixed bottom-0 left-0 p-4 pointer-events-none z-[70]">
                    <div className="w-10 h-10 border-b border-l border-primary/20"></div>
                </div>
                <div className="fixed bottom-0 right-0 p-4 pointer-events-none z-[70]">
                    <div className="w-10 h-10 border-b border-r border-primary/20"></div>
                </div>

                {/* Desktop Sidebar Navigation */}
                {!isMobile && (
                    <nav className={`sidebar-nav transition-all duration-700 bg-void border-r border-border-void w-16 ${hideNav ? 'opacity-0 -translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                        <button
                            className="text-primary mb-12"
                            onClick={() => setActiveTab('nexus')}
                        >
                            <Radio size={22} />
                        </button>
                        <div className="flex flex-col gap-6">
                            {navItems.filter(i => i.id !== 'nexus' && i.id !== 'profile').map(item => {
                                const isActive = activeTab === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className=""
                                        title={item.label}
                                        style={isActive
                                            ? { background: '#ffffff', color: '#050505', padding: '6px', borderRadius: '3px' }
                                            : { color: '#666666', padding: '6px' }
                                        }
                                    >
                                        {item.icon}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-auto flex flex-col gap-8">
                            <button onClick={onSignalOpen} className="text-text-muted hover:text-primary transition-colors p-1.5" title="Signal">
                                <Search size={22} />
                            </button>
                            {user ? (
                                <button
                                    onClick={logOut}
                                    className="text-text-muted hover:text-primary transition-colors p-1.5"
                                    title="Sign Out"
                                >
                                    <LogOut size={22} />
                                </button>
                            ) : (
                                <button
                                    onClick={signInWithGoogle}
                                    className="text-text-muted hover:text-primary transition-colors p-1.5"
                                    title="Sign In"
                                >
                                    <LogIn size={22} />
                                </button>
                            )}
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`transition-colors p-1.5 ${activeTab === 'profile' ? 'text-white' : 'text-text-muted hover:text-white'}`}
                                title="Profile"
                            >
                                <User size={22} />
                            </button>
                        </div>
                    </nav>
                )}

                {/* Mobile Bottom Navigation Bar */}
                {isMobile && (
                    <nav className={`fixed bottom-0 left-0 right-0 z-50 bg-void/90 backdrop-blur-md border-t border-border-void px-6 py-4 flex items-center justify-between transition-all duration-500 ${hideNav ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                        <button onClick={() => setActiveTab('nexus')} className={`flex flex-col items-center gap-1 ${activeTab === 'nexus' ? 'text-white' : 'text-text-muted'}`}>
                            <Radio size={20} />
                            <span className="font-mono text-[8px] uppercase tracking-widest">Nexus</span>
                        </button>
                        <button onClick={() => setActiveTab('hierarchy')} className={`flex flex-col items-center gap-1 ${activeTab === 'hierarchy' ? 'text-white' : 'text-text-muted'}`}>
                            <BarChart3 size={20} />
                            <span className="font-mono text-[8px] uppercase tracking-widest">Hierarchy</span>
                        </button>
                        <button onClick={() => setActiveTab('grid')} className={`flex flex-col items-center gap-1 ${activeTab === 'grid' ? 'text-white' : 'text-text-muted'}`}>
                            <Grid3x3 size={20} />
                            <span className="font-mono text-[8px] uppercase tracking-widest">Grid</span>
                        </button>

                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => setActiveTab('forge')}
                                className="w-10 h-10 bg-primary flex items-center justify-center -mt-8 rounded-sm border-2 border-void text-white active:scale-90 transition-transform shadow-[0_0_15px_rgba(255,51,51,0.3)]"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        <button onClick={() => setActiveTab('feed')} className={`flex flex-col items-center gap-1 ${activeTab === 'feed' ? 'text-white' : 'text-text-muted'}`}>
                            <Database size={20} />
                            <span className="font-mono text-[8px] uppercase tracking-widest">Feed</span>
                        </button>
                        <button onClick={() => setActiveTab('stratification')} className={`flex flex-col items-center gap-1 ${activeTab === 'stratification' ? 'text-white' : 'text-text-muted'}`}>
                            <Trophy size={20} />
                            <span className="font-mono text-[8px] uppercase tracking-widest">Rank</span>
                        </button>
                        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-white' : 'text-text-muted'}`}>
                            <User size={20} />
                            <span className="font-mono text-[8px] uppercase tracking-widest">Profile</span>
                        </button>
                    </nav>
                )}

                {/* Main Content Area – Decollided */}
                <main className={`min-h-screen pt-16 ${isMobile ? 'pb-24' : 'main-content-padding'}`}>
                    {children}
                </main>
            </div>
        </HelmetProvider>
    );
};

export default Layout;
