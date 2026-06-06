import React, { useState, useEffect } from 'react';
import { Send, Music, Bell, Smartphone, ShieldCheck, Zap, History, Info, Volume2, Users, UserCheck, UserMinus, UserPlus, Trash2, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../lib/firebase';
import { 
    getAllAccessEntries, 
    grantDashboardAccess, 
    revokeDashboardAccess, 
    deleteAccessEntry, 
    INITIAL_ADMINS 
} from '../lib/auth';

const ThePortal = ({ premiumStats = { totalReflections: 0, soulSeekers: 0 } }) => {
    const [activeSection, setActiveSection] = useState('broadcast'); // 'broadcast' | 'access'
    
    // Broadcast Section State
    const [targetApp, setTargetApp] = useState('all');
    const [notification, setNotification] = useState({
        title: '',
        body: '',
        imageUrl: '',
        sound: 'default'
    });
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState(null);

    // Access Control Section State
    const [accessList, setAccessList] = useState([]);
    const [isLoadingAccess, setIsLoadingAccess] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newRole, setNewRole] = useState('viewer'); // 'admin' | 'editor' | 'viewer'
    const [accessStatus, setAccessStatus] = useState(null);

    const sounds = [
        { id: 'default', name: 'Standard Alert', icon: <Volume2 size={14} /> },
        { id: 'flute', name: 'Divine Flute', icon: <Music size={14} /> },
        { id: 'temple_bell', name: 'Temple Bell', icon: <Bell size={14} /> },
        { id: 'shankh', name: 'Sacred Shankh', icon: <Zap size={14} /> },
    ];

    // Fetch user access list when entering the Access section
    const loadAccessList = async () => {
        setIsLoadingAccess(true);
        setAccessStatus(null);
        try {
            const list = await getAllAccessEntries();
            setAccessList(list);
        } catch (err) {
            console.error('Error fetching registry entries:', err);
            setAccessStatus({ type: 'error', message: 'Failed to synchronize access registry.' });
        } finally {
            setIsLoadingAccess(false);
        }
    };

    useEffect(() => {
        if (activeSection === 'access') {
            loadAccessList();
        }
    }, [activeSection]);

    const handleSend = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setStatus(null);

        try {
            console.log('Sending notification:', { targetApp, ...notification });
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setStatus({
                type: 'success',
                message: `Transmission successful. Broadcasted to ${targetApp === 'all' ? 'all synchronized devices' : targetApp + ' users'}.`
            });
            
            setNotification({
                title: '',
                body: '',
                imageUrl: '',
                sound: 'default'
            });
        } catch {
            setStatus({
                type: 'error',
                message: 'Transmission failed: Signal interference detected.'
            });
        } finally {
            setIsSending(false);
        }
    };

    // Access control mutations
    const handleGrantAccess = async (email, role) => {
        if (!email) return;
        setAccessStatus(null);
        try {
            const adminEmail = auth.currentUser?.email || 'admin@vrindopnishad.in';
            const success = await grantDashboardAccess(email, role, adminEmail);
            if (success) {
                setAccessStatus({ type: 'success', message: `Access granted successfully to ${email} [${role.toUpperCase()}].` });
                loadAccessList();
            } else {
                setAccessStatus({ type: 'error', message: `Failed to provision access for ${email}.` });
            }
        } catch (err) {
            console.error(err);
            setAccessStatus({ type: 'error', message: 'Registry modification error.' });
        }
    };

    const handleRevokeAccess = async (email) => {
        if (!email) return;
        setAccessStatus(null);
        try {
            const adminEmail = auth.currentUser?.email || 'admin@vrindopnishad.in';
            const success = await revokeDashboardAccess(email, adminEmail);
            if (success) {
                setAccessStatus({ type: 'success', message: `Access permissions revoked for ${email}.` });
                loadAccessList();
            } else {
                setAccessStatus({ type: 'error', message: `Failed to revoke access for ${email}.` });
            }
        } catch (err) {
            console.error(err);
            setAccessStatus({ type: 'error', message: 'Registry update failure.' });
        }
    };

    const handleDeleteAccess = async (email) => {
        if (!email) return;
        if (!confirm(`Purge registry entry for ${email}?`)) return;
        setAccessStatus(null);
        try {
            const success = await deleteAccessEntry(email);
            if (success) {
                setAccessStatus({ type: 'success', message: `Removed ${email} from registry.` });
                loadAccessList();
            } else {
                setAccessStatus({ type: 'error', message: `Failed to remove ${email}.` });
            }
        } catch (err) {
            console.error(err);
            setAccessStatus({ type: 'error', message: 'Registry deletion error.' });
        }
    };

    const handleAddUserSubmit = async (e) => {
        e.preventDefault();
        if (!newEmail) return;
        await handleGrantAccess(newEmail, newRole);
        setNewEmail('');
    };

    return (
        <div className="p-8 md:p-12 lg:p-20 bg-void min-h-screen text-text-main font-mono overflow-y-auto custom-scroll">
            <header className="mb-12 border-b border-primary/20 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <ShieldCheck className="text-primary" size={32} />
                        <h1 className="text-4xl font-bold tracking-tighter text-text-main">THE PORTAL</h1>
                    </div>
                    <p className="text-xs text-text-main/70 font-semibold uppercase tracking-[0.3em]">Unified Command & Control Interface</p>
                </div>

                {/* Sub-Section Navigation Tabs */}
                <div className="flex bg-void-matte p-1 rounded-sm border border-border-void">
                    <button 
                        onClick={() => setActiveSection('broadcast')}
                        className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all ${activeSection === 'broadcast' ? 'bg-primary text-white shadow-[0_0_15px_rgba(255,51,51,0.2)]' : 'text-text-main/60 hover:text-text-main'}`}
                    >
                        BROADCAST CONTROL
                    </button>
                    <button 
                        onClick={() => setActiveSection('access')}
                        className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all ${activeSection === 'access' ? 'bg-primary text-white shadow-[0_0_15px_rgba(255,51,51,0.2)]' : 'text-text-main/60 hover:text-text-main'}`}
                    >
                        ACCESS CONTROL
                    </button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {activeSection === 'broadcast' ? (
                    <motion.div 
                        key="broadcast"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                    >
                        {/* CONFIGURATION COLUMN */}
                        <div className="lg:col-span-2 space-y-12">
                            <section className="bg-void-matte border border-border-void p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Zap size={120} className="text-primary" />
                                </div>

                                <h2 className="text-xl font-bold text-text-main mb-8 flex items-center gap-3">
                                    <Send size={20} className="text-primary" />
                                    BROADCAST TRANSMISSION
                                </h2>

                                <form onSubmit={handleSend} className="space-y-8 relative z-10">
                                    {/* TARGET SELECTION */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase text-text-main/70 font-semibold tracking-widest">Target Vector</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {['all', 'premium', 'mobile'].map((app) => (
                                                <button
                                                    key={app}
                                                    type="button"
                                                    onClick={() => setTargetApp(app)}
                                                    className={`py-4 border text-[10px] uppercase tracking-widest transition-all flex flex-col items-center gap-3 ${targetApp === app ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(255,51,51,0.2)]' : 'border-border-void text-text-main/60 hover:border-primary/50 hover:text-text-main'}`}
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
                                                <label className="text-[10px] uppercase text-text-main/70 font-semibold">Transmission Header</label>
                                                <input 
                                                    required
                                                    className="w-full bg-void border border-border-void p-4 outline-none focus:border-primary transition-colors text-text-main"
                                                    value={notification.title}
                                                    onChange={e => setNotification({...notification, title: e.target.value})}
                                                    placeholder="Enter notification title..."
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase text-text-main/70 font-semibold">Visual Payload (Image URL)</label>
                                                <input 
                                                    className="w-full bg-void border border-border-void p-4 outline-none focus:border-primary transition-colors text-text-main"
                                                    value={notification.imageUrl}
                                                    onChange={e => setNotification({...notification, imageUrl: e.target.value})}
                                                    placeholder="https://content.vrindopnishad.in/..."
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase text-text-main/70 font-semibold">Core Message Body</label>
                                            <textarea 
                                                required
                                                rows={5}
                                                className="w-full bg-void border border-border-void p-4 outline-none focus:border-primary transition-colors text-text-main resize-none h-full"
                                                value={notification.body}
                                                onChange={e => setNotification({...notification, body: e.target.value})}
                                                placeholder="Enter the sacred message..."
                                            />
                                        </div>
                                    </div>

                                    {/* SOUND SELECTOR */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase text-text-main/70 font-semibold tracking-widest text-primary">Acoustic Signature (Custom Sound)</label>
                                        <div className="flex flex-wrap gap-4">
                                            {sounds.map((s) => (
                                                <button
                                                    key={s.id}
                                                    type="button"
                                                    onClick={() => setNotification({...notification, sound: s.id})}
                                                    className={`px-6 py-3 border text-[9px] uppercase tracking-widest transition-all flex items-center gap-3 ${notification.sound === s.id ? 'bg-text-main text-void border-text-main shadow-md' : 'border-border-void text-text-main/60 hover:border-primary/50 hover:text-text-main'}`}
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
                                        className={`w-full py-5 bg-primary text-white text-sm font-bold tracking-[0.5em] uppercase flex items-center justify-center gap-4 hover:bg-text-main hover:text-void transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(255,51,51,0.3)]`}
                                    >
                                        {isSending ? (
                                            <>
                                                <div className="size-4 border-2 border-text-main/30 border-t-text-main rounded-full animate-spin"></div>
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
                            </section>
                        </div>

                        {/* INFO / PREVIEW COLUMN */}
                        <div className="space-y-12">
                            <section className="bg-void-matte border border-border-void p-8">
                                <h2 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3 uppercase tracking-tighter">
                                    <Info size={18} className="text-primary" />
                                    System Intel
                                </h2>
                                <div className="space-y-6">
                                    <div className="p-4 bg-void border border-border-void">
                                        <p className="text-[10px] text-text-main/70 font-semibold uppercase mb-2">INTEGRATED_SPIRITUAL_NODES</p>
                                        <p className="text-3xl font-bold text-primary">{premiumStats.totalReflections.toLocaleString()}</p>
                                    </div>
                                    <div className="p-4 bg-void border border-border-void">
                                        <p className="text-[10px] text-text-main/70 font-semibold uppercase mb-2">Global_Active_Channels</p>
                                        <div className="space-y-3 mt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] text-text-main uppercase">Premium_App_Node</span>
                                                <span className={`text-[10px] font-bold ${premiumStats.totalReflections > 0 ? 'text-green-500' : 'text-primary animate-pulse'}`}>
                                                    {premiumStats.totalReflections > 0 ? 'STABLE' : 'SEARCHING...'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] text-text-main uppercase">Soul_Seeker_Stream</span>
                                                <span className={`text-[10px] font-bold ${premiumStats.soulSeekers > 0 ? 'text-green-500' : 'text-primary'}`}>
                                                    {premiumStats.soulSeekers > 0 ? 'ACTIVE_DATA' : 'IDLE'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] text-text-main uppercase">Signal_Link_Quality</span>
                                                <span className="text-[10px] text-primary font-bold animate-pulse">99.9%_SYNC</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-void-matte border border-border-void p-8">
                                <h2 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3 uppercase tracking-tighter">
                                    <History size={18} className="text-primary" />
                                    Recent Logs
                                </h2>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="text-[10px] border-l-2 border-primary/30 pl-4 py-2 hover:bg-text-main/5 transition-colors cursor-default">
                                            <p className="text-text-main/70 mb-1">27.03.26 | 20:15</p>
                                            <p className="text-text-main font-medium uppercase tracking-wider">Ekam Satsang Notification</p>
                                            <p className="text-primary mt-1">SUCCESS [12,402 NODES]</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="access"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                    >
                        {/* LEFT COLUMN: PROVISION NEW EMAIL FORM */}
                        <div className="lg:col-span-1 space-y-12">
                            <section className="bg-void-matte border border-border-void p-8 relative overflow-hidden group">
                                <h2 className="text-xl font-bold text-text-main mb-8 flex items-center gap-3">
                                    <UserPlus size={20} className="text-primary" />
                                    PROVISION OPERATOR
                                </h2>

                                <form onSubmit={handleAddUserSubmit} className="space-y-6 relative z-10">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-text-main/70 font-semibold">Operator Email</label>
                                        <input 
                                            required
                                            type="email"
                                            className="w-full bg-void border border-border-void p-4 outline-none focus:border-primary transition-colors text-text-main text-sm"
                                            value={newEmail}
                                            onChange={e => setNewEmail(e.target.value)}
                                            placeholder="operator@gmail.com..."
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-text-main/70 font-semibold">Assigned Access Role</label>
                                        <select
                                            className="w-full bg-void border border-border-void p-4 outline-none focus:border-primary transition-colors text-text-main text-xs uppercase tracking-wider"
                                            value={newRole}
                                            onChange={e => setNewRole(e.target.value)}
                                        >
                                            <option value="viewer">Viewer (Read Only)</option>
                                            <option value="editor">Editor (Forge Access)</option>
                                            <option value="admin">Admin (Full Control)</option>
                                        </select>
                                    </div>

                                    <button 
                                        type="submit"
                                        className="w-full py-4 bg-primary text-white text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-text-main hover:text-void transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(255,51,51,0.2)]"
                                    >
                                        <UserPlus size={16} />
                                        <span>AUTHORIZE LINK</span>
                                    </button>
                                </form>
                            </section>

                            <section className="bg-void-matte border border-border-void p-8">
                                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-text-main mb-4">Initial Admins</h3>
                                <div className="space-y-3">
                                    {INITIAL_ADMINS.map(email => (
                                        <div key={email} className="p-3 bg-void border border-primary/20 flex items-center justify-between text-xs">
                                            <span className="text-text-main select-all">{email}</span>
                                            <span className="text-[8px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 uppercase tracking-wider font-bold">SYSTEM ROOT</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN: USER REGISTRY TABLE */}
                        <div className="lg:col-span-2 space-y-12">
                            <section className="bg-void-matte border border-border-void p-8 relative">
                                <div className="flex items-center justify-between mb-8 border-b border-primary/10 pb-4">
                                    <h2 className="text-xl font-bold text-text-main flex items-center gap-3">
                                        <Users size={20} className="text-primary" />
                                        ACCESS REGISTRY
                                    </h2>
                                    <button 
                                        onClick={loadAccessList}
                                        className="text-[9px] border border-border-void px-3 py-1.5 hover:border-primary/50 text-text-main/70 hover:text-text-main transition-colors uppercase tracking-wider"
                                    >
                                        Force Sync
                                    </button>
                                </div>

                                {/* ACTION FEEDBACK STATUS */}
                                <AnimatePresence>
                                    {accessStatus && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className={`p-4 border text-xs mb-6 ${accessStatus.type === 'success' ? 'bg-green-500/10 border-green-500/40 text-green-400' : 'bg-red-500/10 border-red-500/40 text-red-400'}`}
                                        >
                                            {accessStatus.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {isLoadingAccess ? (
                                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                                        <div className="size-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                        <span className="text-[10px] text-text-muted animate-pulse uppercase tracking-[0.2em]">Syncing database records...</span>
                                    </div>
                                ) : accessList.length === 0 ? (
                                    <div className="text-center py-20 text-text-muted text-xs uppercase tracking-widest border border-dashed border-border-void">
                                        Registry is empty. No operators defined.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto custom-scroll">
                                        <table className="w-full text-left border-collapse text-xs">
                                            <thead>
                                                <tr className="border-b border-border-void text-[10px] uppercase text-text-muted tracking-widest">
                                                    <th className="pb-3 font-semibold">Operator Info</th>
                                                    <th className="pb-3 font-semibold">Assigned Role</th>
                                                    <th className="pb-3 font-semibold">Status</th>
                                                    <th className="pb-3 font-semibold text-right">Registry Operations</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border-void/50">
                                                {accessList.map((entry) => {
                                                    const isRootAdmin = INITIAL_ADMINS.includes(entry.email?.toLowerCase());
                                                    const formattedDate = entry.requestedAt ? new Date(entry.requestedAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) : (entry.grantedAt ? new Date(entry.grantedAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) : 'N/A');
                                                    
                                                    return (
                                                        <tr key={entry.id} className="hover:bg-primary/5 transition-colors">
                                                            <td className="py-4 pr-3">
                                                                <div className="font-bold text-text-main max-w-[200px] truncate break-all" title={entry.email}>
                                                                    {entry.email}
                                                                </div>
                                                                <div className="text-[9px] text-text-muted mt-1 uppercase tracking-wider">
                                                                    {entry.displayName || 'No Username'} // {formattedDate}
                                                                </div>
                                                            </td>
                                                            <td className="py-4 pr-3">
                                                                {isRootAdmin ? (
                                                                    <span className="text-[9px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 uppercase tracking-wider font-bold">ROOT</span>
                                                                ) : (
                                                                    <select
                                                                        className="bg-void border border-border-void px-2 py-1 outline-none text-[10px] text-text-main focus:border-primary uppercase tracking-widest"
                                                                        value={entry.role || 'viewer'}
                                                                        onChange={e => handleGrantAccess(entry.email, e.target.value)}
                                                                    >
                                                                        <option value="viewer">Viewer</option>
                                                                        <option value="editor">Editor</option>
                                                                        <option value="admin">Admin</option>
                                                                    </select>
                                                                )}
                                                            </td>
                                                            <td className="py-4 pr-3">
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                                        entry.status === 'granted' ? 'bg-green-500' :
                                                                        entry.status === 'pending' ? 'bg-yellow-500 animate-ping' :
                                                                        'bg-red-500'
                                                                    }`} />
                                                                    <span className={`text-[9px] font-bold uppercase tracking-wider ${
                                                                        entry.status === 'granted' ? 'text-green-500' :
                                                                        entry.status === 'pending' ? 'text-yellow-500 font-bold' :
                                                                        'text-red-500'
                                                                    }`}>
                                                                        {entry.status || 'PENDING'}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 text-right">
                                                                {isRootAdmin ? (
                                                                    <span className="text-[9px] text-text-muted/50 uppercase tracking-widest font-semibold cursor-not-allowed">PROTECTED</span>
                                                                ) : (
                                                                    <div className="flex items-center justify-end gap-2">
                                                                        {entry.status === 'pending' && (
                                                                            <button
                                                                                onClick={() => handleGrantAccess(entry.email, entry.role || 'viewer')}
                                                                                className="px-2 py-1 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white transition-all text-[9px] uppercase tracking-wider font-bold"
                                                                                title="Approve access link request"
                                                                            >
                                                                                Approve
                                                                            </button>
                                                                        )}
                                                                        
                                                                        {entry.status === 'granted' ? (
                                                                            <button
                                                                                onClick={() => handleRevokeAccess(entry.email)}
                                                                                className="px-2 py-1 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all text-[9px] uppercase tracking-wider font-bold"
                                                                                title="Revoke access link permissions"
                                                                            >
                                                                                Revoke
                                                                            </button>
                                                                        ) : (
                                                                            entry.status === 'revoked' && (
                                                                                <button
                                                                                    onClick={() => handleGrantAccess(entry.email, entry.role || 'viewer')}
                                                                                    className="px-2 py-1 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white transition-all text-[9px] uppercase tracking-wider font-bold"
                                                                                    title="Re-authorize access link"
                                                                                >
                                                                                    Re-Grant
                                                                                </button>
                                                                            )
                                                                        )}

                                                                        <button
                                                                            onClick={() => handleDeleteAccess(entry.email)}
                                                                            className="p-1 border border-border-void hover:border-red-500 text-text-muted hover:text-red-500 transition-all rounded-sm"
                                                                            title="Purge record permanently"
                                                                        >
                                                                            <Trash2 size={13} />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </section>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThePortal;
