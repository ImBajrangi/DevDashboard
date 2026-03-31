import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Radio, Database, Search, Settings, User, BarChart3, Grid3x3, Trophy, Plus, LogIn, LogOut, Archive, ShieldCheck, ChevronDown, Star, Heart, Code, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';
import { signInWithGoogle, logOut } from '../lib/firebase';
import TheMenu from './TheMenu';

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
    const [isSidebarHovered, setIsSidebarHovered] = React.useState(false);
    const [isHubOpen, setIsHubOpen] = React.useState(false);

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
        { id: 'forge', icon: <Plus size={20} />, label: 'The Forge' },
        { id: 'beacon', icon: <Globe size={20} />, label: 'The Beacon' },
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
                {/* Global Top Header Bar – Pointer Pass-Through Enabled */}
                <header className={`fixed top-0 left-0 right-0 h-16 bg-void/90 backdrop-blur-md border-b border-border-void z-[100] transition-all duration-700 pointer-events-none ${hideNav ? '-translate-y-full' : 'translate-y-0'}`}>
                    <div className="h-full flex items-center justify-between px-6 pl-20 md:pl-24 pointer-events-auto">
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
                    <motion.nav 
                        initial={false}
                        animate={{ 
                            width: isSidebarHovered ? 240 : 64,
                            backgroundColor: isSidebarHovered ? 'rgba(5, 5, 5, 0.98)' : 'rgba(5, 5, 5, 0.95)'
                        }}
                        onMouseEnter={() => setIsSidebarHovered(true)}
                        onMouseLeave={() => setIsSidebarHovered(false)}
                        className={`fixed left-0 top-0 h-full border-r border-border-void backdrop-blur-xl z-[110] flex flex-col py-10 overflow-y-auto no-scrollbar shadow-[20px_0_50px_rgba(0,0,0,0.5)] transition-opacity duration-700 ${hideNav ? 'opacity-0 -translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'}`}
                    >
                        <div className="flex flex-col gap-1.5 px-3">
                            {navItems.filter(i => i.id !== 'profile').map(item => {
                                const isActive = activeTab === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`group relative flex items-center h-10 transition-all duration-300 rounded-sm ${isActive ? 'bg-primary/10 text-primary' : 'text-text-muted hover:text-text-main hover:bg-white/5'}`}
                                        title={!isSidebarHovered ? item.label : ''}
                                    >
                                        <div className={`flex items-center justify-center w-10 min-w-[40px] transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-active:scale-95'}`}>
                                            {item.icon}
                                        </div>
                                        
                                        <AnimatePresence>
                                            {isSidebarHovered && (
                                                <motion.span 
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    className="font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap ml-2 font-bold"
                                                >
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>

                                        {isActive && (
                                            <motion.div 
                                                layoutId="active-nav"
                                                className="absolute left-0 w-0.5 h-full bg-primary shadow-[0_0_10px_#FF3333]" 
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-auto flex flex-col gap-8 px-3">
                            <button onClick={onSignalOpen} className="group relative flex items-center h-10 text-text-muted hover:text-primary transition-colors">
                                <div className="flex items-center justify-center w-10 min-w-[40px] group-hover:scale-110">
                                    <Search size={22} />
                                </div>
                                {isSidebarHovered && (
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] ml-2">Signal Search</span>
                                )}
                            </button>
                            {user ? (
                                <button
                                    onClick={logOut}
                                    className="group relative flex items-center h-10 text-text-muted hover:text-primary transition-colors"
                                >
                                    <div className="flex items-center justify-center w-10 min-w-[40px] group-hover:rotate-12">
                                        <LogOut size={22} />
                                    </div>
                                    {isSidebarHovered && (
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] ml-2">Disconnect</span>
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={signInWithGoogle}
                                    className="group relative flex items-center h-10 text-text-muted hover:text-primary transition-colors"
                                >
                                    <div className="flex items-center justify-center w-10 min-w-[40px] group-hover:rotate-12">
                                        <LogIn size={22} />
                                    </div>
                                    {isSidebarHovered && (
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] ml-2">Authenticate</span>
                                    )}
                                </button>
                            )}
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`group relative flex items-center h-10 transition-colors ${activeTab === 'profile' ? 'text-white' : 'text-text-muted hover:text-white'}`}
                            >
                                <div className="flex items-center justify-center w-10 min-w-[40px] group-hover:scale-110">
                                    <User size={22} />
                                </div>
                                {isSidebarHovered && (
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] ml-2">User Profile</span>
                                )}
                            </button>
                        </div>
                    </motion.nav>
                )}

                {/* Mobile Bottom Navigation Bar – SIMPLIFIED 4-BUTTON + HUB */}
                {isMobile && (
                    <nav className={`fixed bottom-0 left-0 right-0 z-[150] bg-void/90 backdrop-blur-md border-t border-border-void px-6 py-4 flex items-center justify-between transition-all duration-500 md:hidden ${hideNav ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                        <button onClick={() => setActiveTab('nexus')} className={`flex flex-col items-center gap-1 ${activeTab === 'nexus' ? 'text-white' : 'text-text-muted'}`}>
                            <Radio size={20} />
                            <span className="font-mono text-[8px] uppercase tracking-widest">Nexus</span>
                        </button>
                        
                        <button onClick={() => setActiveTab('feed')} className={`flex flex-col items-center gap-1 ${activeTab === 'feed' ? 'text-white' : 'text-text-muted'}`}>
                            <Database size={20} />
                            <span className="font-mono text-[8px] uppercase tracking-widest">Feed</span>
                        </button>

                        <div className="flex flex-col items-center">
                            <button
                                onClick={onSignalOpen}
                                className="w-10 h-10 bg-primary flex items-center justify-center -mt-8 rounded-sm border-2 border-void text-white active:scale-90 transition-transform shadow-[0_0_15px_rgba(255,51,51,0.3)]"
                            >
                                <Search size={20} />
                            </button>
                        </div>

                        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-white' : 'text-text-muted'}`}>
                            <User size={20} />
                            <span className="font-mono text-[8px] uppercase tracking-widest">Profile</span>
                        </button>

                        <button 
                            onClick={() => setIsHubOpen(true)}
                            className="flex flex-col items-center gap-1 text-primary animate-pulse"
                        >
                            <Grid3x3 size={20} />
                            <span className="font-mono text-[8px] uppercase tracking-widest font-bold">Hub</span>
                        </button>
                    </nav>
                )}

                {/* Mobile Full-Screen Menu Drawer */}
                <TheMenu 
                    isOpen={isHubOpen} 
                    onClose={() => setIsHubOpen(false)}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    navItems={navItems}
                    user={user}
                    logOut={logOut}
                />

                {/* Main Content Area – Decollided (Explicit 64px Top-Offset) */}
                <main 
                    className={`min-h-screen ${isMobile ? 'pb-24' : 'main-content-padding'}`}
                    style={{ paddingTop: '64px' }}
                >
                    {children}
                </main>
            </div>
        </HelmetProvider>
    );
};

export default Layout;
