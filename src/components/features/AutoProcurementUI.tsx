import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Scan, 
  Sparkles, 
  Wrench, 
  XCircle, 
  Package, 
  ShoppingCart, 
  Mail, 
  CheckCircle2,
  AlertTriangle,
  Search
} from "lucide-react";
import industrialValve from "@/assets/industrial-valve.png";

type Phase = "scanning" | "analyzing" | "repair" | "broken" | "warehouse" | "order" | "confirmed";

const AutoProcurementUI = () => {
  const [phase, setPhase] = useState<Phase>("scanning");
  const [showOrderButton, setShowOrderButton] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    timers.push(setTimeout(() => setPhase("analyzing"), 2000));
    timers.push(setTimeout(() => setPhase("repair"), 3500));
    timers.push(setTimeout(() => setPhase("broken"), 5500));
    timers.push(setTimeout(() => setPhase("warehouse"), 7500));
    timers.push(setTimeout(() => {
      setPhase("order");
      setShowOrderButton(true);
    }, 9500));
    timers.push(setTimeout(() => {
      setShowOrderButton(false);
      setPhase("confirmed");
    }, 12000));
    timers.push(setTimeout(() => {
      setPhase("scanning");
    }, 16000));

    return () => timers.forEach(clearTimeout);
  }, [phase === "scanning" && !showOrderButton]);

  const getStatusColor = () => {
    switch (phase) {
      case "scanning": return "text-cyan-400";
      case "analyzing": return "text-blue-400";
      case "repair": return "text-amber-400";
      case "broken": return "text-red-400";
      case "warehouse": return "text-orange-400";
      case "order": return "text-violet-400";
      case "confirmed": return "text-emerald-400";
    }
  };

  const getStatusBg = () => {
    switch (phase) {
      case "scanning": return "bg-cyan-500/20";
      case "analyzing": return "bg-blue-500/20";
      case "repair": return "bg-amber-500/20";
      case "broken": return "bg-red-500/20";
      case "warehouse": return "bg-orange-500/20";
      case "order": return "bg-violet-500/20";
      case "confirmed": return "bg-emerald-500/20";
    }
  };

  const getStatusText = () => {
    switch (phase) {
      case "scanning": return "Scanning Component...";
      case "analyzing": return "Analyzing...";
      case "repair": return "Repair Procedure";
      case "broken": return "Component Failed";
      case "warehouse": return "Checking Stock...";
      case "order": return "Order Required";
      case "confirmed": return "Order Sent ✓";
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden relative">
      {/* Background Image - visible during scanning phase */}
      <AnimatePresence>
        {phase === "scanning" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <img 
              src={industrialValve} 
              alt="Component" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
            
            {/* AR Scanning overlay */}
            <div className="absolute inset-8 border-2 border-cyan-400/50 rounded-xl">
              {/* Corner markers */}
              {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${pos} w-6 h-6 border-cyan-400`}
                  style={{
                    borderTopWidth: pos.includes('top') ? 3 : 0,
                    borderBottomWidth: pos.includes('bottom') ? 3 : 0,
                    borderLeftWidth: pos.includes('left') ? 3 : 0,
                    borderRightWidth: pos.includes('right') ? 3 : 0,
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              ))}
              
              {/* Scanning line */}
              <motion.div
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 p-5 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl ${getStatusBg()} flex items-center justify-center`}>
              {phase === "scanning" && <Scan className={`w-4 h-4 ${getStatusColor()}`} />}
              {phase === "analyzing" && <Sparkles className={`w-4 h-4 ${getStatusColor()}`} />}
              {phase === "repair" && <Wrench className={`w-4 h-4 ${getStatusColor()}`} />}
              {phase === "broken" && <XCircle className={`w-4 h-4 ${getStatusColor()}`} />}
              {phase === "warehouse" && <Search className={`w-4 h-4 ${getStatusColor()}`} />}
              {phase === "order" && <ShoppingCart className={`w-4 h-4 ${getStatusColor()}`} />}
              {phase === "confirmed" && <Mail className={`w-4 h-4 ${getStatusColor()}`} />}
            </div>
            <span className="text-white font-medium text-sm">Auto Procurement</span>
          </div>
          <motion.div 
            key={phase}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg()} ${getStatusColor()}`}
          >
            {getStatusText()}
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {/* Scanning Phase - just show overlay */}
            {phase === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 mx-auto mb-3 rounded-full border-2 border-cyan-400/30 border-t-cyan-400"
                />
                <p className="text-white/60 text-sm">Identifying component...</p>
              </motion.div>
            )}

            {/* Analyzing Phase */}
            {phase === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Valve VL-2847</p>
                    <p className="text-white/50 text-xs">Running diagnostics...</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Pressure test</span>
                    <span className="text-amber-400">Warning</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-amber-400"
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Repair Procedure Phase */}
            {phase === "repair" && (
              <motion.div
                key="repair"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
              >
                <p className="text-white/60 text-xs mb-3">Attempting repair procedure...</p>
                <div className="space-y-2">
                  {["Recalibrating pressure sensor", "Adjusting seal tension", "Testing flow rate"].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 rounded-full border border-amber-400/50 border-t-amber-400"
                      />
                      <span className="text-white/70 text-xs">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Broken - Cannot Repair */}
            {phase === "broken" && (
              <motion.div
                key="broken"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/10 backdrop-blur-xl rounded-2xl p-4 border border-red-500/30"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-red-400 font-medium text-sm mb-1">Component Irreparable</p>
                    <p className="text-white/60 text-xs leading-relaxed">
                      Internal seal is permanently damaged. The valve requires complete replacement.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Warehouse Check */}
            {phase === "warehouse" && (
              <motion.div
                key="warehouse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
              >
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
                  className="flex items-center gap-2 text-orange-400 text-xs"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Part not in stock</span>
                </motion.div>
              </motion.div>
            )}

            {/* Order Proposal */}
            {phase === "order" && (
              <motion.div
                key="order"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-3">
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

            {/* Order Confirmed - Email Sent */}
            {phase === "confirmed" && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-500/10 backdrop-blur-xl rounded-2xl p-4 border border-emerald-500/30"
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
      </div>
    </div>
  );
};

export default AutoProcurementUI;
