import React, { useState } from 'react';
import { ShieldAlert, LogIn, LogOut, CheckCircle, Clock, Send, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import RealismButton from './ui/RealismButton';
import SciFiLoader from './ui/SciFiLoader';
import { signInWithGoogle, logOut } from '../lib/firebase';
import { requestDashboardAccess } from '../lib/auth';

const TheAirlock = ({ authStatus, currentUser, onAccessRequested }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRequestAccess = async () => {
    if (!currentUser) return;
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const success = await requestDashboardAccess(currentUser);
      if (success) {
        if (onAccessRequested) onAccessRequested();
      } else {
        setErrorMsg('Failed to transmit request. System interface offline.');
      }
    } catch (err) {
      setErrorMsg('Interference detected during transmission.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    switch (authStatus) {
      case 'unauthenticated':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center max-w-md w-full p-8 bg-void-matte border border-border-void relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Red accent line at the top */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_#FF3333]" />
            
            <div className="w-16 h-16 bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 rounded-sm">
              <Lock className="text-primary animate-pulse" size={28} />
            </div>

            <span className="font-mono text-[9px] text-primary tracking-[0.4em] uppercase mb-1">SECURE_LINK // ACCESS_RESTRICTED</span>
            <h1 className="text-2xl font-bold tracking-tighter mb-4 text-white uppercase font-display">AUTHENTICATION REQUIRED</h1>
            <p className="text-xs text-text-muted mb-8 uppercase tracking-wide leading-relaxed font-mono">
              Establish a secure credentials link to proceed. Only authorized administrators and validated operators may access this node.
            </p>

            <RealismButton 
              onClick={signInWithGoogle} 
              className="w-full flex items-center justify-center gap-3 py-4 border border-primary/30 hover:border-primary text-xs tracking-[0.2em] font-bold font-mono"
            >
              <LogIn size={16} className="text-primary" />
              [ ESTABLISH SECURE LINK ]
            </RealismButton>
          </motion.div>
        );

      case 'unauthorized':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center max-w-md w-full p-8 bg-void-matte border border-border-void relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_#FF3333]" />

            <div className="w-16 h-16 bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 rounded-sm">
              <ShieldAlert className="text-primary" size={28} />
            </div>

            <span className="font-mono text-[9px] text-primary tracking-[0.4em] uppercase mb-1">OPERATOR_ACCESS_DENIED</span>
            <h1 className="text-2xl font-bold tracking-tighter mb-2 text-white uppercase font-display">LINK UNAUTHORIZED</h1>
            <div className="font-mono text-[10px] text-text-muted bg-void border border-border-void px-4 py-2 mb-6 w-full break-all truncate">
              ID: {currentUser?.email?.toLowerCase()}
            </div>

            <p className="text-xs text-text-muted mb-8 uppercase tracking-wide leading-relaxed font-mono">
              Your credentials are valid but your link is unauthorized. Request administrative provisioning to register your operator node.
            </p>

            {errorMsg && (
              <div className="font-mono text-[10px] text-primary mb-4 uppercase">{errorMsg}</div>
            )}

            <div className="flex flex-col w-full gap-4">
              <button
                disabled={isSubmitting}
                onClick={handleRequestAccess}
                className="w-full py-4 bg-primary text-white text-[10px] tracking-[0.25em] font-bold font-mono uppercase flex items-center justify-center gap-3 border border-primary hover:bg-white hover:text-void transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="size-3 border border-void/30 border-t-void rounded-full animate-spin"></div>
                    <span>TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>[ TRANSMIT ACCESS REQUEST ]</span>
                  </>
                )}
              </button>

              <button
                onClick={logOut}
                className="w-full py-3 bg-void border border-border-void text-text-muted hover:text-white hover:border-primary/50 text-[10px] tracking-[0.2em] font-bold font-mono uppercase flex items-center justify-center gap-2 transition-all"
              >
                <LogOut size={12} />
                Disconnect Link
              </button>
            </div>
          </motion.div>
        );

      case 'pending':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center max-w-md w-full p-8 bg-void-matte border border-border-void relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_#FF3333]" />

            <div className="w-16 h-16 bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 rounded-sm">
              <Clock className="text-primary animate-pulse" size={28} />
            </div>

            <span className="font-mono text-[9px] text-primary tracking-[0.4em] uppercase mb-1">TRANSMISSION_COMPLETE</span>
            <h1 className="text-2xl font-bold tracking-tighter mb-2 text-white uppercase font-display">REQUEST PENDING</h1>
            <div className="font-mono text-[10px] text-text-muted bg-void border border-border-void px-4 py-2 mb-6 w-full break-all truncate">
              ID: {currentUser?.email?.toLowerCase()}
            </div>

            <p className="text-xs text-text-muted mb-8 uppercase tracking-wide leading-relaxed font-mono">
              Your link request has been broadcasted and is waiting for validation by system administrators. Contact a node admin to complete provisioning.
            </p>

            <div className="flex flex-col w-full gap-4">
              <div className="py-4 border border-[#FF3333]/30 bg-primary/5 text-primary text-[9px] tracking-[0.2em] font-bold font-mono uppercase flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                Awaiting Authorization
              </div>

              <button
                onClick={logOut}
                className="w-full py-3 bg-void border border-border-void text-text-muted hover:text-white hover:border-primary/50 text-[10px] tracking-[0.2em] font-bold font-mono uppercase flex items-center justify-center gap-2 transition-all"
              >
                <LogOut size={12} />
                Disconnect Link
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] text-[#E5E5E5] h-screen w-full overflow-hidden flex flex-col items-center justify-center font-display antialiased select-none">
      {/* Background Noise & Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgyjEX08k7rB7INFaC2eR0OFlcunjJch52-aMNk4W7Tf9Y1XQXxbWjcXDHYPyd8Huv-rsCrxgv-cLYQ0lTbbS3Q7uPwwHslf25wEUQHXcBdWj4ndec1fLaZfyG9qmNAMz1hkrPBayyQfsCnPxE7tmf28BIVdmUk9xzEQK49q8eHkV_6CY4Id2Tw3VmsLSzX-23smiTJOyAFBCl0IMzdTnA0dbyTjR2hMGLshbq9THOKlt7MBxI8diKfI1Ry6L_cOGPTRY-xugXHH0')",
        }}
      />
      <div className="fixed inset-0 pointer-events-none scanline opacity-[0.05] z-[99]" />

      {/* Decorative Corner Brackets */}
      <div className="fixed top-8 left-8 p-4 pointer-events-none z-[70]">
        <div className="w-8 h-8 border-t border-l border-primary/20"></div>
      </div>
      <div className="fixed top-8 right-8 p-4 z-[70] pointer-events-none">
        <div className="size-8 border-t border-r border-primary/20 absolute top-4 right-4"></div>
      </div>
      <div className="fixed bottom-8 left-8 p-4 pointer-events-none z-[70]">
        <div className="w-8 h-8 border-b border-l border-primary/20"></div>
      </div>
      <div className="fixed bottom-8 right-8 p-4 pointer-events-none z-[70]">
        <div className="w-8 h-8 border-b border-r border-primary/20"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center w-full px-6">
        {renderContent()}
      </main>

      <footer className="fixed bottom-8 w-full px-8 flex justify-between items-end text-[10px] font-mono text-text-muted/40 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
          <span>Airlock Portal // Secure Shield</span>
        </div>
        <div className="text-right hidden md:block">
          <span>SYSTEM_LINK_SECURED</span>
        </div>
      </footer>
    </div>
  );
};

export default TheAirlock;
