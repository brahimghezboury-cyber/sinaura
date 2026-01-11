import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, Scan, BookOpen, ChevronRight, Wrench, Zap, Settings, ChevronLeft, CheckCircle2 } from "lucide-react";
import industrialValve from "@/assets/industrial-valve.png";

const TechnicalManualsUI = () => {
  const [phase, setPhase] = useState<"scanning" | "detected" | "documents">("scanning");
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;
    let timer4: NodeJS.Timeout;

    if (phase === "scanning") {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 80);

      timer1 = setTimeout(() => setPhase("detected"), 1800);
    }

    if (phase === "detected") {
      timer2 = setTimeout(() => setPhase("documents"), 1500);
    }

    if (phase === "documents") {
      timer3 = setTimeout(() => setSelectedDoc(1), 1500);
      timer4 = setTimeout(() => {
        setPhase("scanning");
        setScanProgress(0);
        setSelectedDoc(null);
      }, 5000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [phase]);

  const detectedComponent = {
    name: "Hydraulic Valve HV-200",
    type: "Control Valve",
    serial: "SN-78432-A"
  };

  const documents = [
    { name: "Installation Guide", pages: 45, icon: Wrench, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
    { name: "Maintenance Manual", pages: 120, icon: Settings, color: "text-violet-400", bgColor: "bg-violet-500/10" },
    { name: "Troubleshooting", pages: 32, icon: Zap, color: "text-amber-400", bgColor: "bg-amber-500/10" },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <FileText className="w-4 h-4 text-violet-400" />
          </div>
          <span className="text-white font-medium text-sm">Technical Manuals</span>
        </div>
        <span className="text-white/40 text-xs">
          {phase === "scanning" ? "Scanning..." : phase === "detected" ? "Component Found" : "3 documents"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {(phase === "scanning" || phase === "detected") && (
          <motion.div
            key="scanning-detected"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Image scan area - larger */}
            <div className="flex-1 relative rounded-xl overflow-hidden bg-black/30 min-h-[200px]">
              <img 
                src={industrialValve} 
                alt="Scanning equipment" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              
              {/* Corner markers */}
              <motion.div
                className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2"
                style={{ borderColor: phase === "detected" ? "#34d399" : "#a78bfa" }}
                animate={phase === "scanning" ? { opacity: [1, 0.3, 1] } : { opacity: 0.8 }}
                transition={{ duration: 0.8, repeat: phase === "scanning" ? Infinity : 0 }}
              />
              <motion.div
                className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2"
                style={{ borderColor: phase === "detected" ? "#34d399" : "#a78bfa" }}
                animate={phase === "scanning" ? { opacity: [1, 0.3, 1] } : { opacity: 0.8 }}
                transition={{ duration: 0.8, repeat: phase === "scanning" ? Infinity : 0, delay: 0.2 }}
              />
              <motion.div
                className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2"
                style={{ borderColor: phase === "detected" ? "#34d399" : "#a78bfa" }}
                animate={phase === "scanning" ? { opacity: [1, 0.3, 1] } : { opacity: 0.8 }}
                transition={{ duration: 0.8, repeat: phase === "scanning" ? Infinity : 0, delay: 0.4 }}
              />
              <motion.div
                className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2"
                style={{ borderColor: phase === "detected" ? "#34d399" : "#a78bfa" }}
                animate={phase === "scanning" ? { opacity: [1, 0.3, 1] } : { opacity: 0.8 }}
                transition={{ duration: 0.8, repeat: phase === "scanning" ? Infinity : 0, delay: 0.6 }}
              />
              
              {/* Scanning line - only during scanning */}
              {phase === "scanning" && (
                <motion.div
                  className="absolute left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent"
                  initial={{ top: "10%" }}
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Detection overlay with checkmark */}
              <AnimatePresence>
                {phase === "detected" && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-3 border-2 border-emerald-400 rounded-lg"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", damping: 15, delay: 0.2 }}
                      className="absolute -top-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            {/* Bottom info area */}
            <div className="mt-4">
              <AnimatePresence mode="wait">
                {phase === "scanning" && (
                  <motion.div 
                    key="scan-info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <p className="text-white/80 text-sm font-medium mb-2">Scanning Component...</p>
                    <p className="text-white/40 text-xs mb-3">Point camera at equipment label</p>
                    
                    <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </motion.div>
                )}
                
                {phase === "detected" && (
                  <motion.div 
                    key="detect-info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <p className="text-emerald-400 text-sm font-medium mb-2">Component Detected!</p>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10 inline-block">
                      <p className="text-white text-sm font-medium">{detectedComponent.name}</p>
                      <p className="text-white/40 text-xs">{detectedComponent.serial}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {phase === "documents" && (
          <motion.div
            key="documents"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl p-3 mb-4 border border-white/10 flex items-center gap-3"
            >
              <button className="text-white/40 hover:text-white/60 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex-1">
                <p className="text-white text-xs font-medium">{detectedComponent.name}</p>
                <p className="text-white/40 text-[10px]">{detectedComponent.serial}</p>
              </div>
            </motion.div>

            <p className="text-white/60 text-xs mb-3">Select document type:</p>

            <div className="flex-1 space-y-3 overflow-hidden">
              {documents.map((doc, index) => {
                const IconComponent = doc.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      scale: selectedDoc === index ? 1.02 : 1,
                      backgroundColor: selectedDoc === index ? "rgba(139, 92, 246, 0.1)" : "rgba(255, 255, 255, 0.03)"
                    }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${doc.bgColor} flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${doc.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white mb-0.5">{doc.name}</p>
                        <p className="text-xs text-white/40">{doc.pages} pages</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-colors ${selectedDoc === index ? "text-violet-400" : "text-white/30"}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-4 border-t border-white/5 mt-auto">
        <button className="w-full py-2.5 text-center text-xs text-violet-400 font-medium bg-violet-500/10 rounded-xl hover:bg-violet-500/20 transition-colors flex items-center justify-center gap-2">
          <Scan className="w-4 h-4" />
          Scan New Component
        </button>
      </div>
    </div>
  );
};

export default TechnicalManualsUI;
