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

type Phase = "chat" | "repair" | "broken" | "warehouse" | "order" | "confirmed";

const AutoProcurementUI = () => {
  const [phase, setPhase] = useState<Phase>("chat");
  const [showStep, setShowStep] = useState(false);
  const [showOrderButton, setShowOrderButton] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    timers.push(setTimeout(() => setShowStep(true), 1500));
    timers.push(setTimeout(() => setPhase("repair"), 3500));
    timers.push(setTimeout(() => setPhase("broken"), 6000));
    timers.push(setTimeout(() => setPhase("warehouse"), 8000));
    timers.push(setTimeout(() => {
      setPhase("order");
      setShowOrderButton(true);
    }, 10000));
    timers.push(setTimeout(() => {
      setShowOrderButton(false);
      setPhase("confirmed");
    }, 12500));
    timers.push(setTimeout(() => {
      setPhase("chat");
      setShowStep(false);
    }, 16000));

    return () => timers.forEach(clearTimeout);
  }, [phase === "chat" && !showStep]);

  return (
    <div className="w-full h-full bg-[#f5f5f7] p-6 flex flex-col items-center justify-center rounded-2xl">
      {/* Header */}
      <p className="text-slate-900 font-medium text-base mb-4">Aria Engine</p>
      
      <AnimatePresence mode="wait">
        {/* Chat Phase - Conversation Interface */}
        {phase === "chat" && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-5 flex flex-col border border-white/10 shadow-2xl"
            style={{ height: "340px" }}
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
              {/* User message */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-end"
              >
                <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <User className="w-2.5 h-2.5 text-white/80" />
                    <span className="text-[10px] font-medium text-white/80">ME</span>
                  </div>
                  <p className="text-white text-xs">I have an error FMO1201</p>
                </div>
              </motion.div>

              {/* Aria response */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] border border-white/10">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                    <span className="text-[10px] font-medium text-cyan-400">ARIA</span>
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">FMO1201</p>
                  <p className="text-white/70 text-[11px] leading-relaxed">
                    Communication issue between device and control system. Check wiring or interface.
                  </p>
                  
                  {/* Step appears after delay */}
                  <AnimatePresence>
                    {showStep && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white/90 text-[11px] mt-2"
                      >
                        <span className="text-cyan-400 font-medium">Step 1:</span>{" "}
                        <span className="text-white/70">Check interface wiring.</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Input area */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 bg-white/10 rounded-full px-4 py-2 border border-white/10">
                <span className="text-white/40 text-xs">Type or press and hold...</span>
              </div>
              <button className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Mic className="w-4 h-4 text-white" />
              </button>
              <button className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Repair Phase - Aria trying to fix */}
        {phase === "repair" && (
          <motion.div
            key="repair"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-xs font-medium">ARIA ENGINE</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              Let me attempt to resolve this issue. I'm recalibrating the pressure sensor and adjusting the seal tension...
            </p>
            <div className="flex items-center gap-2 text-amber-400 text-xs">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 rounded-full border-2 border-amber-400/30 border-t-amber-400"
              />
              <span>Running repair procedure...</span>
            </div>
          </motion.div>
        )}

        {/* Broken Phase */}
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
                  The internal seal is permanently damaged. This valve requires complete replacement.
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
                <p className="text-white font-medium text-sm">Checking Warehouse</p>
                <p className="text-white/50 text-xs">Searching for VL-2847...</p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-2 text-orange-400 text-xs bg-orange-500/10 rounded-xl p-3"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Spare part not available in stock</span>
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
            <p className="text-white text-sm mb-4">
              Part <span className="text-violet-400 font-medium">VL-2847</span> is not available in warehouse. 
              Would you like me to send an automatic order to the supplier?
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
                  Send Automatic Order
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
                <p className="text-emerald-400 font-medium text-sm">Order Sent Successfully</p>
                <p className="text-white/50 text-xs">Email sent to supplier</p>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-3 h-3 text-white/40" />
                <span className="text-white/40">To:</span>
                <span className="text-white/70">orders@valvesupply.com</span>
              </div>
              <div className="border-t border-white/10 pt-2 space-y-1">
                <p className="text-white/60 text-xs">
                  <span className="text-white/40">Part:</span> Valve VL-2847
                </p>
                <p className="text-white/60 text-xs">
                  <span className="text-white/40">Qty:</span> 1 unit
                </p>
                <p className="text-white/60 text-xs">
                  <span className="text-white/40">Priority:</span> <span className="text-amber-400">Urgent</span>
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
