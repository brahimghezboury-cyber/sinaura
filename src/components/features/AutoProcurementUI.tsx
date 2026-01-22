import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  XCircle, 
  Package, 
  ShoppingCart, 
  Mail, 
  CheckCircle2,
  AlertTriangle,
  User,
  X,
  Mic
} from "lucide-react";

type Phase = 
  | "chat1" 
  | "chat2" 
  | "chat3" 
  | "chat4" 
  | "broken" 
  | "warehouse" 
  | "order" 
  | "confirmed";

const AutoProcurementUI = () => {
  const [phase, setPhase] = useState<Phase>("chat1");
  const [showOrderButton, setShowOrderButton] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // Conversazione iniziale
    timers.push(setTimeout(() => setPhase("chat2"), 3000));
    // Operatore segue istruzioni e risponde
    timers.push(setTimeout(() => setPhase("chat3"), 6000));
    // AI chiede altra verifica
    timers.push(setTimeout(() => setPhase("chat4"), 9000));
    // Componente rotto
    timers.push(setTimeout(() => setPhase("broken"), 12000));
    // Verifica magazzino
    timers.push(setTimeout(() => setPhase("warehouse"), 14500));
    // Proposta ordine
    timers.push(setTimeout(() => {
      setPhase("order");
      setShowOrderButton(true);
    }, 17000));
    // Conferma
    timers.push(setTimeout(() => {
      setShowOrderButton(false);
      setPhase("confirmed");
    }, 19500));
    // Reset
    timers.push(setTimeout(() => {
      setPhase("chat1");
    }, 23000));

    return () => timers.forEach(clearTimeout);
  }, [phase === "chat1"]);

  const ChatBubbleUser = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex justify-end"
    >
      <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
        <div className="flex items-center gap-1.5 mb-1">
          <User className="w-2.5 h-2.5 text-white/80" />
          <span className="text-[10px] font-medium text-white/80">OPERATOR</span>
        </div>
        <p className="text-white text-xs leading-relaxed">{children}</p>
      </div>
    </motion.div>
  );

  const ChatBubbleAria = ({ children, delay = 0.3 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex justify-start"
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] border border-white/10">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
          <span className="text-[10px] font-medium text-cyan-400">ARIA</span>
        </div>
        <div className="text-white/80 text-[11px] leading-relaxed">{children}</div>
      </div>
    </motion.div>
  );

  const ChatContainer = ({ children, height = "360px" }: { children: React.ReactNode; height?: string }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-sm bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-5 flex flex-col border border-white/10 shadow-2xl"
      style={{ height }}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <span className="text-white font-medium text-sm">Aria Engine</span>
        <button className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
          <X className="w-3.5 h-3.5 text-white/70" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-3 overflow-hidden">
        {children}
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex-1 bg-white/10 rounded-full px-4 py-2 border border-white/10">
          <span className="text-white/40 text-xs">Type or press and hold...</span>
        </div>
        <button className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <Mic className="w-4 h-4 text-white" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full h-full bg-[#f5f5f7] p-4 flex flex-col items-center justify-center rounded-2xl">
      {/* Header */}
      <p className="text-slate-900 font-medium text-base mb-3">Aria Engine</p>
      
      <AnimatePresence mode="wait">
        {/* Chat 1: Operatore segnala problema */}
        {phase === "chat1" && (
          <ChatContainer key="chat1">
            <ChatBubbleUser>
              The pneumatic valve on line 3 isn't responding. Error code PNE-2847 on the display.
            </ChatBubbleUser>
            <ChatBubbleAria>
              <p className="font-semibold text-white mb-1">PNE-2847 - Pneumatic Valve Fault</p>
              <p>This error indicates a pressure regulation issue. Let's troubleshoot together.</p>
              <p className="mt-2">
                <span className="text-cyan-400 font-medium">First:</span> Can you check if the air supply pressure is above 6 bar on the gauge?
              </p>
            </ChatBubbleAria>
          </ChatContainer>
        )}

        {/* Chat 2: Operatore risponde, AI chiede altro */}
        {phase === "chat2" && (
          <ChatContainer key="chat2">
            <ChatBubbleUser>
              Yes, pressure is at 6.2 bar. That looks fine.
            </ChatBubbleUser>
            <ChatBubbleAria>
              <p>Good, supply pressure is normal. The issue might be internal.</p>
              <p className="mt-2">
                <span className="text-cyan-400 font-medium">Next step:</span> Try manually actuating the valve using the override button. Does it move?
              </p>
            </ChatBubbleAria>
          </ChatContainer>
        )}

        {/* Chat 3: Operatore prova, non funziona */}
        {phase === "chat3" && (
          <ChatContainer key="chat3">
            <ChatBubbleUser>
              I pressed the override but nothing happens. No movement at all.
            </ChatBubbleUser>
            <ChatBubbleAria>
              <p>That confirms the valve mechanism itself is blocked.</p>
              <p className="mt-2">
                <span className="text-cyan-400 font-medium">Final check:</span> Can you listen for any air leak near the actuator? This will tell us if the diaphragm is damaged.
              </p>
            </ChatBubbleAria>
          </ChatContainer>
        )}

        {/* Chat 4: Conferma rottura */}
        {phase === "chat4" && (
          <ChatContainer key="chat4">
            <ChatBubbleUser>
              Yes, I can hear air escaping from the side of the actuator.
            </ChatBubbleUser>
            <ChatBubbleAria>
              <p className="text-amber-400 font-medium mb-1">⚠️ Diagnosis Complete</p>
              <p>The internal diaphragm is ruptured. This valve cannot be repaired on-site and requires full replacement.</p>
              <p className="mt-2 text-white/60">Let me check if we have a spare in the warehouse...</p>
            </ChatBubbleAria>
          </ChatContainer>
        )}

        {/* Broken Phase - Conferma componente rotto */}
        {phase === "broken" && (
          <motion.div
            key="broken"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-5 border border-red-500/30 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-xs font-medium">ARIA ENGINE</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-red-400 font-medium text-sm mb-1">Component Irreparable</p>
                <p className="text-white/60 text-xs leading-relaxed">
                  Pneumatic Valve <span className="text-white font-medium">PNV-3847</span> - Diaphragm failure confirmed. Full replacement required.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Warehouse Phase */}
        {phase === "warehouse" && (
          <motion.div
            key="warehouse"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-xs font-medium">ARIA ENGINE</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center"
              >
                <Package className="w-5 h-5 text-orange-400" />
              </motion.div>
              <div>
                <p className="text-white font-medium text-sm">Searching Warehouse</p>
                <p className="text-white/50 text-xs">Looking for PNV-3847...</p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 text-orange-400 text-xs bg-orange-500/10 rounded-xl p-3"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>No spare parts available. Last unit used 2 weeks ago.</span>
            </motion.div>
          </motion.div>
        )}

        {/* Order Phase */}
        {phase === "order" && (
          <motion.div
            key="order"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-xs font-medium">ARIA ENGINE</span>
            </div>
            <p className="text-white text-sm mb-2">
              Unfortunately, <span className="text-violet-400 font-medium">PNV-3847</span> is out of stock.
            </p>
            <p className="text-white/70 text-xs mb-4">
              I found it available at <span className="text-white">Festo Industrial Supply</span> with 24h express delivery. Should I place an automatic order?
            </p>
            
            <AnimatePresence>
              {showOrderButton && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Order Now - Express 24h
                  <motion.div
                    className="ml-2 w-2 h-2 rounded-full bg-white"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Confirmed Phase */}
        {phase === "confirmed" && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-5 border border-emerald-500/30 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </motion.div>
              <div>
                <p className="text-emerald-400 font-medium text-sm">Order Confirmed</p>
                <p className="text-white/50 text-xs">Email sent to supplier</p>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-3 h-3 text-white/40" />
                <span className="text-white/40">To:</span>
                <span className="text-white/70">orders@festo.com</span>
              </div>
              <div className="border-t border-white/10 pt-2 space-y-1">
                <p className="text-white/60 text-xs">
                  <span className="text-white/40">Part:</span> Pneumatic Valve PNV-3847
                </p>
                <p className="text-white/60 text-xs">
                  <span className="text-white/40">Qty:</span> 1 unit
                </p>
                <p className="text-white/60 text-xs">
                  <span className="text-white/40">Delivery:</span> <span className="text-emerald-400">Express 24h</span>
                </p>
                <p className="text-white/60 text-xs">
                  <span className="text-white/40">Ref:</span> Line 3 - Ticket #4521
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutoProcurementUI;
