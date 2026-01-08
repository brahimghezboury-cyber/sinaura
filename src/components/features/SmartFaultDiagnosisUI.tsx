import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Brain, AlertTriangle, CheckCircle, Search } from "lucide-react";

const SmartFaultDiagnosisUI = () => {
  const [phase, setPhase] = useState<"scanning" | "analyzing" | "found">("scanning");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("analyzing"), 1500);
    const timer2 = setTimeout(() => setPhase("found"), 3000);
    const timer3 = setTimeout(() => setPhase("scanning"), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [phase === "scanning"]);

  return (
    <div className="w-full h-full bg-[#f5f5f7] p-6 flex flex-col items-center justify-center rounded-2xl">
      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-xs">
        {phase === "scanning" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 rounded-full border-4 border-slate-200 border-t-slate-600 flex items-center justify-center"
            >
              <Search className="w-8 h-8 text-slate-600" />
            </motion.div>
            <p className="text-slate-500 text-sm">Scanning system...</p>
          </motion.div>
        )}

        {phase === "analyzing" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full space-y-3"
          >
            {["Motor Controller", "PLC Connection", "Sensor Array"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm"
              >
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                  className="w-3 h-3 rounded-full bg-amber-500"
                />
                <span className="text-slate-700 text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {phase === "found" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-4"
          >
            <div className="p-4 bg-white rounded-2xl shadow-sm border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-red-600 font-semibold text-sm">Root Cause Found</span>
              </div>
              <p className="text-slate-600 text-sm">Motor driver overheating detected</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Analysis complete in 2.4s</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SmartFaultDiagnosisUI;
