import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TrendingUp, AlertTriangle, Clock, Activity } from "lucide-react";

const FailureForecastingUI = () => {
  const [riskLevel, setRiskLevel] = useState(35);

  useEffect(() => {
    const interval = setInterval(() => {
      setRiskLevel((prev) => {
        const newVal = prev + (Math.random() > 0.5 ? 5 : -3);
        return Math.max(20, Math.min(85, newVal));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (level: number) => {
    if (level < 40) return { bg: "bg-emerald-500", text: "text-emerald-400", label: "Low Risk" };
    if (level < 65) return { bg: "bg-amber-500", text: "text-amber-400", label: "Medium Risk" };
    return { bg: "bg-red-500", text: "text-red-400", label: "High Risk" };
  };

  const risk = getRiskColor(riskLevel);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl p-5 flex flex-col border border-white/10 rounded-3xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center">
          <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
        </div>
        <span className="text-white/90 font-medium text-xs">Failure Forecast</span>
      </div>

      {/* Risk Meter */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-4">
          <motion.span 
            key={riskLevel}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-3xl font-bold ${risk.text}`}
          >
            {riskLevel}%
          </motion.span>
          <p className={`text-xs ${risk.text} mt-1`}>{risk.label}</p>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div
            animate={{ width: `${riskLevel}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full ${risk.bg} rounded-full`}
          />
        </div>

        {/* Predictions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white/60 text-xs">Next maintenance</span>
            </div>
            <span className="text-cyan-400 text-xs font-medium">14 days</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white/60 text-xs">Predicted failure</span>
            </div>
            <span className="text-amber-400 text-xs font-medium">~28 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailureForecastingUI;
