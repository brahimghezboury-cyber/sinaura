import { motion, AnimatePresence } from "framer-motion";
import { Camera, Focus, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

const ARCameraScanUI = () => {
  const [scanPhase, setScanPhase] = useState<"idle" | "scanning" | "detected" | "analyzing">("idle");
  const [showOverlay, setShowOverlay] = useState(false);

  // Auto-start animation cycle
  useEffect(() => {
    const startCycle = () => {
      setScanPhase("idle");
      setShowOverlay(false);
      
      // Start scanning
      setTimeout(() => setScanPhase("scanning"), 1000);
      // Detected
      setTimeout(() => setScanPhase("detected"), 2500);
      // Show overlay
      setTimeout(() => {
        setScanPhase("analyzing");
        setShowOverlay(true);
      }, 3200);
      // Reset cycle
      setTimeout(() => startCycle(), 6500);
    };
    
    startCycle();
  }, []);

  return (
    <div className="relative h-full rounded-3xl overflow-hidden">
      {/* Dark glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-950/95 backdrop-blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-white/5" />
      <div className="absolute inset-[0.5px] rounded-3xl border border-white/20" />
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 p-3 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <motion.div 
              className={`w-2 h-2 rounded-full ${scanPhase === "scanning" ? "bg-yellow-400" : scanPhase === "detected" || scanPhase === "analyzing" ? "bg-emerald-400" : "bg-white/40"}`}
              animate={scanPhase === "scanning" ? { opacity: [1, 0.4, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <span className="text-white/80 font-medium text-[10px]">
              {scanPhase === "idle" && "AR Camera Ready"}
              {scanPhase === "scanning" && "Scanning..."}
              {scanPhase === "detected" && "Component Found"}
              {scanPhase === "analyzing" && "Analysis Complete"}
            </span>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-white/10">
            <span className="text-white/50 text-[8px] font-medium">AR</span>
          </div>
        </div>

        {/* Camera viewfinder */}
        <div className="flex-1 relative rounded-xl overflow-hidden bg-black/30">
          {/* Simulated camera feed - equipment silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-12 rounded bg-white/10 border border-white/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Scanning corners */}
          <motion.div
            className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-emerald-400"
            animate={scanPhase === "scanning" ? { opacity: [1, 0.3, 1] } : { opacity: 0.6 }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-emerald-400"
            animate={scanPhase === "scanning" ? { opacity: [1, 0.3, 1] } : { opacity: 0.6 }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-emerald-400"
            animate={scanPhase === "scanning" ? { opacity: [1, 0.3, 1] } : { opacity: 0.6 }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
          />
          <motion.div
            className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-emerald-400"
            animate={scanPhase === "scanning" ? { opacity: [1, 0.3, 1] } : { opacity: 0.6 }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }}
          />

          {/* Scanning line */}
          <AnimatePresence>
            {scanPhase === "scanning" && (
              <motion.div
                className="absolute left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                initial={{ top: "10%" }}
                animate={{ top: ["10%", "90%", "10%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>

          {/* Detection highlight */}
          <AnimatePresence>
            {(scanPhase === "detected" || scanPhase === "analyzing") && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-4 border-2 border-emerald-400 rounded-lg"
              >
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-2 h-2 text-slate-900" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Diagnostic overlay */}
          <AnimatePresence>
            {showOverlay && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-2 right-6 bg-slate-900/90 rounded-lg p-1.5 border border-emerald-400/50"
              >
                <p className="text-[7px] text-emerald-400 font-medium mb-0.5">VALVE #A-204</p>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-2 h-2 text-yellow-400" />
                  <span className="text-[6px] text-yellow-400">Pressure: 2.4 bar</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-center gap-3 mt-2">
          <motion.button
            animate={scanPhase !== "idle" ? { scale: [1, 0.95, 1] } : {}}
            transition={{ duration: 0.3, repeat: scanPhase === "scanning" ? Infinity : 0 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              scanPhase !== "idle"
                ? "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                : "bg-white/10 border border-white/20"
            }`}
          >
            {scanPhase === "idle" ? (
              <Camera className="w-4 h-4 text-white/60" />
            ) : (
              <Focus className="w-4 h-4 text-white" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ARCameraScanUI;
