import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Radio, Database, Search, Settings, User, BarChart3, Grid3x3, Trophy, Plus, LayoutGrid } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';

const Layout = ({
    children,
    activeTab = 'feed',
    setActiveTab = () => { },
    title = "The Feed - All Content | Deep Void",
    description = "A digital sanctuary for deep reading and archival silence.",
    settings = { immersionMode: true },
    onSignalOpen = () => { }
}) => {
    const isMobile = useMobile();
    const [isScrolled, setIsScrolled] = React.useState(false);

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
        { id: 'archives', icon: <Search size={20} />, label: 'Archives' },
        { id: 'grid', icon: <Grid3x3 size={20} />, label: 'Grid' },
        { id: 'hierarchy', icon: <BarChart3 size={20} />, label: 'Hierarchy' },
        { id: 'stratification', icon: <Trophy size={20} />, label: 'Rankings' },
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
                {/* Visual Overlays */}
                <div className="noise-overlay" />
                <div className="fixed inset-0 pointer-events-none scanline opacity-[0.05] z-[99]" />
                
                {/* Corner Brackets */}
                <div className="fixed top-0 left-0 p-4 pointer-events-none z-[70]">
                    <div className="w-10 h-10 border-t border-l border-primary/20"></div>
                </div>
                <div className="fixed top-0 right-0 p-4 pointer-events-none z-[70]">
                    <div className="w-10 h-10 border-t border-r border-primary/20"></div>
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
                        <div className="flex flex-col gap-8">
                            {navItems.filter(i => i.id !== 'nexus' && i.id !== 'profile').map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`transition-colors p-1.5 ${activeTab === item.id ? 'text-white' : 'text-text-muted hover:text-white'}`}
                                    title={item.label}
                                >
                                    {item.icon}
                                </button>
                            ))}
                        </div>
                        <div className="mt-auto flex flex-col gap-8">
                            <button onClick={onSignalOpen} className="text-text-muted hover:text-primary transition-colors p-1.5" title="Signal">
                                <Search size={22} />
                            </button>
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
                                onClick={onSignalOpen}
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

                {/* Main Content Area */}
                <main className="min-h-screen" style={{ paddingLeft: isMobile ? '0' : '64px' }}>
                    {children}
                </main>
            </div>
        </HelmetProvider>
    );
};

export default Layout;
