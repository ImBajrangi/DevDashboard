import React from 'react';
import { X, Radio, Database, Archive, Grid3x3, BarChart3, Trophy, Plus, Globe, ShieldCheck, Settings, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TheMenu = ({ isOpen, onClose, activeTab, setActiveTab, navItems, user, logOut }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-[200] bg-void flex flex-col pt-12 safe-padding-bottom"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-8 mb-10">
                        <div className="flex flex-col">
                            <span className="font-mono text-[9px] text-primary tracking-[0.3em] uppercase mb-1">System // Core</span>
                            <h2 className="text-3xl font-bold tracking-tighter uppercase font-display leading-none text-white">THE HUB</h2>
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-12 h-12 flex items-center justify-center border border-border-void rounded-full active:scale-90 transition-transform"
                        >
                            <X size={24} className="text-white" />
                        </button>
                    </div>

                    {/* Navigation Grid */}
                    <div className="flex-1 overflow-y-auto no-scrollbar px-8">
                        <div className="grid grid-cols-1 gap-3 pb-24">
                            {navItems.map((item) => {
                                const isActive = activeTab === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            onClose();
                                        }}
                                        className={`flex items-center gap-6 p-5 border transition-all duration-300 relative overflow-hidden active:scale-[0.98] ${
                                            isActive 
                                            ? 'bg-primary/10 border-primary text-primary' 
                                            : 'bg-void-matte border-border-void text-text-muted hover:border-text-muted'
                                        }`}
                                    >
                                        <div className={`p-2 transition-transform duration-500 ${isActive ? 'scale-110' : ''}`}>
                                            {item.icon}
                                        </div>
                                        <div className="flex flex-col items-start translate-y-[1px]">
                                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-bold">
                                                {item.label}
                                            </span>
                                            {isActive && (
                                                <span className="font-mono text-[8px] uppercase tracking-widest opacity-60">ACTIVE_NODE</span>
                                            )}
                                        </div>
                                        {isActive && (
                                            <motion.div 
                                                layoutId="hub-active"
                                                className="absolute left-0 w-1 h-full bg-primary" 
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 border-t border-border-void bg-void-matte mt-auto">
                        <div className="flex flex-col gap-4">
                            {user && (
                                <button 
                                    onClick={logOut}
                                    className="flex items-center justify-between w-full p-4 border border-red-500/30 text-red-500 font-mono text-[10px] uppercase tracking-widest"
                                >
                                    <span>Disconnect System</span>
                                    <LogOut size={16} />
                                </button>
                            )}
                            <div className="flex justify-between items-center opacity-20">
                                <span className="font-mono text-[8px] uppercase tracking-widest">Protocol v4.2 // Vrinda OS</span>
                                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TheMenu;
