import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Search, Hash, BookOpen, Terminal, AlertCircle, Info, Radio, Shield, HelpCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';
import FavoriteToggle from './ui/FavoriteToggle';
import LikeToggle from './ui/LikeToggle';

const INITIAL_MESSAGES = [
  {
    id: 1,
    channel: 'transmissions',
    author: 'Vrindopnishad',
    avatar: 'V',
    role: 'Oracle',
    content: 'Radhe Radhe! The aesthetic flow of divine knowledge requires absolute silence of the mind. Directing consciousness to the holy name dissolves all material anxieties.',
    timestamp: '15:02:12',
    likes: 24,
    liked: true,
    starred: true
  },
  {
    id: 2,
    channel: 'dev-logs',
    author: 'System Oracle',
    avatar: 'S',
    role: 'Root',
    content: '[STATUS] DevDashboard core modules running at nominal load. Cache validation systems operational. Active telemetry connections to Foody-Vrinda and Sant-Vaani database clusters.',
    timestamp: '15:10:45',
    likes: 12,
    liked: false,
    starred: false
  },
  {
    id: 3,
    channel: 'vrinda-dhama',
    author: 'Gauranga_Dev',
    avatar: 'G',
    role: 'Seeker',
    content: 'Has anyone seen the new Vedic Art uploads on Chitra Vrinda? The color balance and gradients on the Radha Krishna canvas represent high aesthetic elevation.',
    timestamp: '15:14:02',
    likes: 19,
    liked: true,
    starred: false
  },
  {
    id: 4,
    channel: 'transmissions',
    author: 'Airlock Admin',
    avatar: 'A',
    role: 'Operator',
    content: 'Day/Night switch components successfully moved to hardware-accelerated GPU layers. Visual melting stretch animations running at 60fps across mobile and desktop viewpoints.',
    timestamp: '15:16:30',
    likes: 8,
    liked: false,
    starred: true
  },
  {
    id: 5,
    channel: 'dev-logs',
    author: 'Foody Engine',
    avatar: 'F',
    role: 'Service',
    content: '[INFO] 42 live food distribution orders active in Vrindavan Dham kitchen clusters. Latency status: 42ms. Active delivery riders: 18.',
    timestamp: '15:19:10',
    likes: 15,
    liked: false,
    starred: false
  }
];

const TheChat = () => {
  const isMobile = useMobile();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [activeChannel, setActiveChannel] = useState('transmissions');
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const chatEndRef = useRef(null);

  const channels = [
    { id: 'transmissions', label: 'transmissions', desc: 'Spiritual broadcasts & shlokas', icon: <Radio size={12} /> },
    { id: 'dev-logs', label: 'dev-logs', desc: 'Real-time telemetry and systems', icon: <Activity size={12} /> },
    { id: 'vrinda-dhama', label: 'vrinda-dhama', desc: 'Dham guides & community chat', icon: <HelpCircle size={12} /> }
  ];

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannel]);

  // Handle Send Message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg = {
      id: Date.now(),
      channel: activeChannel,
      author: 'DEVELOPER_NODE',
      avatar: 'D',
      role: 'Operator',
      content: newMessageText.trim(),
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      likes: 0,
      liked: false,
      starred: false
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessageText('');
  };

  // Toggle Like Action
  const handleToggleLike = (msgId) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId) {
          const newLiked = !msg.liked;
          return {
            ...msg,
            liked: newLiked,
            likes: newLiked ? msg.likes + 1 : msg.likes - 1
          };
        }
        return msg;
      })
    );
  };

  // Toggle Bookmark/Star Action
  const handleToggleStar = (msgId) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId) {
          return {
            ...msg,
            starred: !msg.starred
          };
        }
        return msg;
      })
    );
  };

  // Filter messages based on search, active channel, and bookmarks toggle
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = msg.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          msg.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel = onlyBookmarks ? true : msg.channel === activeChannel;
    const matchesBookmark = onlyBookmarks ? msg.starred : true;
    return matchesSearch && matchesChannel && matchesBookmark;
  });

  const totalBookmarks = messages.filter((m) => m.starred).length;

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-144px)] md:h-[calc(100vh-64px)] w-full text-text-main font-mono overflow-hidden bg-void">
      {/* SIDEBAR */}
      <div className="w-full md:w-68 bg-void-matte border-b md:border-b-0 md:border-r border-border-void flex flex-col shrink-0">
        {/* Chat info header */}
        <div className="p-6 border-b border-border-void/60 bg-black/10">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <MessageSquare size={14} className="animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] font-bold uppercase font-mono">COMM_NETWORK</span>
          </div>
          <h2 className="text-xl font-bold tracking-tighter text-white font-display uppercase">CHANNELS</h2>
        </div>

        {/* View Selection (Channels vs Saved Bookmarks) */}
        <div className="p-3.5 flex gap-2.5 border-b border-border-void/60 bg-black/5">
          <button
            onClick={() => setOnlyBookmarks(false)}
            className={`flex-1 py-2 text-[9px] uppercase tracking-widest text-center border transition-all duration-300 font-bold rounded-sm ${
              !onlyBookmarks 
                ? 'bg-primary/10 border-primary/50 text-primary shadow-[0_0_12px_rgba(255,51,51,0.05)]' 
                : 'border-border-void text-text-muted hover:text-white hover:border-border-void/80'
            }`}
          >
            Streams
          </button>
          <button
            onClick={() => setOnlyBookmarks(true)}
            className={`flex-1 py-2 text-[9px] uppercase tracking-widest text-center border transition-all duration-300 font-bold rounded-sm relative ${
              onlyBookmarks 
                ? 'bg-primary/10 border-primary/50 text-primary shadow-[0_0_12px_rgba(255,51,51,0.05)]' 
                : 'border-border-void text-text-muted hover:text-white hover:border-border-void/80'
            }`}
          >
            Saved ({totalBookmarks})
          </button>
        </div>

        {/* Channels List */}
        {!onlyBookmarks && (
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 cyber-scroll">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full p-3 flex flex-col items-start gap-1 text-left transition-all duration-300 rounded-sm border ${
                  activeChannel === ch.id 
                    ? 'border-primary/30 bg-primary/5 text-white shadow-[inset_0_0_10px_rgba(255,51,51,0.02)]' 
                    : 'border-transparent text-text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  <span className={activeChannel === ch.id ? 'text-primary' : 'text-text-muted'}>
                    {ch.icon}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-mono">{ch.label}</span>
                </div>
                <span className="text-[8px] tracking-wide leading-relaxed text-text-muted/80 truncate w-full">
                  {ch.desc}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Saved Bookmarks info box */}
        {onlyBookmarks && (
          <div className="flex-1 p-4 text-[10px] text-text-muted/80 leading-relaxed flex flex-col gap-4">
            <div className="border border-border-void p-3.5 bg-void-matte/80 rounded-sm flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen size={12} />
                <span className="font-bold uppercase tracking-widest text-[9px] font-mono">Archival Node</span>
              </div>
              <span>Filter displays all signals marked for persistent storage. Starred events remain encrypted locally in this console view.</span>
            </div>
          </div>
        )}

        {/* Quick System Stats */}
        <div className="p-4.5 border-t border-border-void bg-black/10 text-[9px] text-text-muted flex flex-col gap-2 font-mono">
          <div className="flex justify-between items-center">
            <span>NETWORK STATUS</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10B981]"></span>
              <span className="text-emerald-500 font-bold">NOMINAL</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>TELEMETRY LOAD</span>
            <span className="text-white/60">42 KB/s</span>
          </div>
          <div className="flex justify-between">
            <span>ENCRYPTION DECK</span>
            <span className="text-white/60">AES-GCM-256</span>
          </div>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-void relative overflow-hidden">
        {/* Header */}
        <div className="h-16 px-6 border-b border-border-void flex items-center justify-between bg-void-matte/80 backdrop-blur-md shrink-0 z-10">
          <div className="flex items-center gap-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-mono">
              {onlyBookmarks ? '// SAVED_SIGNALS' : `// #${activeChannel}`}
            </span>
            <span className="h-4 w-px bg-border-void hidden sm:block"></span>
            <span className="text-[9px] text-text-muted hidden sm:block uppercase tracking-widest font-mono">
              {onlyBookmarks ? 'Persistent telemetry archive' : channels.find(c => c.id === activeChannel)?.desc}
            </span>
          </div>

          {/* Search Box */}
          <div className="relative w-44 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={11} />
            <input
              type="text"
              placeholder="Search feed..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-[10px] bg-void-matte/80 border border-border-void rounded-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 transition-all font-mono"
            />
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4.5 cyber-scroll bg-void/50">
          <AnimatePresence initial={false}>
            {filteredMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-text-muted gap-2.5">
                <AlertCircle size={22} className="text-primary/40 animate-pulse" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-text-muted">[ NO DECRYPTED TRANSMISSIONS FOUND ]</span>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex gap-4 border border-border-void bg-void-matte/60 p-4.5 rounded-sm hover:border-primary/30 transition-all duration-300 relative group shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                >
                  {/* Left mood accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/20 group-hover:bg-primary transition-colors" />

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0 shadow-[0_0_10px_rgba(255,51,51,0.04)] font-display">
                    {msg.avatar}
                  </div>

                  {/* Message Body */}
                  <div className="flex-1 min-w-0">
                    {/* Header info */}
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-xs font-bold text-white tracking-wide font-display">{msg.author}</span>
                      <span className="px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary text-[8px] uppercase tracking-widest font-mono scale-90">
                        {msg.role}
                      </span>
                      <span className="text-[8px] text-text-muted ml-auto font-mono">{msg.timestamp}</span>
                    </div>

                    {/* Content - Modified to use font-display (Space Grotesk) to make it highly presentable */}
                    <p className="text-[12px] text-text-main/90 leading-relaxed font-display tracking-wide whitespace-pre-wrap">
                      {msg.content}
                    </p>

                    {/* Actions Deck */}
                    <div className="flex items-center gap-5 mt-4 pt-3.5 border-t border-border-void/40">
                      {/* Animated Like Button */}
                      <div className="flex items-center gap-2 select-none">
                        <LikeToggle 
                          checked={msg.liked} 
                          onChange={() => handleToggleLike(msg.id)} 
                        />
                        <span className={`text-[10px] font-mono tracking-widest transition-colors font-bold ${msg.liked ? 'text-primary' : 'text-text-muted'}`}>
                          {msg.likes}
                        </span>
                      </div>

                      {/* Animated Favorite Button */}
                      <div className="flex items-center select-none">
                        <FavoriteToggle 
                          checked={msg.starred} 
                          onChange={() => handleToggleStar(msg.id)} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Small indicator tag in corner */}
                  <div className="absolute top-0 right-0 p-1 px-2 text-[7px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest font-bold bg-void-matte border-l border-b border-border-void">
                    #{msg.channel}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4.5 border-t border-border-void bg-void-matte/90 shrink-0">
          <form onSubmit={handleSendMessage} className="relative flex items-center border border-border-void/80 bg-void rounded-sm focus-within:border-primary/50 focus-within:shadow-[0_0_12px_rgba(255,51,51,0.03)] transition-all">
            <div className="pl-3.5 text-text-muted flex items-center shrink-0">
              <Terminal size={11} className="text-primary/70 mr-2" />
              <span className="text-[8px] uppercase tracking-widest font-bold font-mono">msg &gt;</span>
            </div>
            
            <input
              type="text"
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              placeholder="Transmit signal into current buffer..."
              className="flex-1 bg-transparent px-3 py-3.5 text-[11.5px] text-text-main placeholder:text-text-muted/50 focus:outline-none font-mono"
            />
            
            <button
              type="submit"
              disabled={!newMessageText.trim()}
              className={`px-4.5 h-full flex items-center justify-center text-text-muted hover:text-primary transition-colors border-l border-border-void/80 ${
                !newMessageText.trim() ? 'opacity-30 cursor-not-allowed' : 'active:scale-95 transition-transform'
              }`}
              title="Transmit"
            >
              <Send size={13} />
            </button>
          </form>
          <div className="mt-2.5 flex items-center justify-between text-[8px] text-text-muted/65 uppercase tracking-widest font-mono">
            <span>Enter to transmit // Escape to clear buffer</span>
            <span className="flex items-center gap-1">
              <Info size={9} /> Active node: developer_node@DeepVoid
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheChat;
