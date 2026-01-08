import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TrendingUp, Clock, Activity } from "lucide-react";

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
    if (level < 40) return { bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-100", label: "Low Risk" };
    if (level < 65) return { bg: "bg-amber-500", text: "text-amber-600", light: "bg-amber-100", label: "Medium" };
    return { bg: "bg-red-500", text: "text-red-600", light: "bg-red-100", label: "High Risk" };
  };

  const risk = getRiskColor(riskLevel);

  return (
    <div className="w-full h-full bg-[#f5f5f7] p-6 flex flex-col items-center justify-center rounded-2xl">
      {/* Circular Gauge */}
      <div className="relative w-36 h-36 mb-6">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="72"
            cy="72"
            r="64"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <motion.circle
            cx="72"
            cy="72"
            r="64"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            className={risk.text}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: riskLevel / 100 }}
            transition={{ duration: 0.5 }}
            style={{ 
              strokeDasharray: "402",
              strokeDashoffset: `${402 - (402 * riskLevel / 100)}`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            key={riskLevel}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-4xl font-bold ${risk.text}`}
          >
            {riskLevel}%
          </motion.span>
          <span className={`text-xs font-medium ${risk.text}`}>{risk.label}</span>
        </div>
      </div>

      {/* Predictions */}
      <div className="w-full max-w-xs space-y-2">
        <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600 text-sm">Next maintenance</span>
          </div>
          <span className="text-cyan-600 text-sm font-semibold">14 days</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600 text-sm">Predicted failure</span>
          </div>
          <span className="text-amber-600 text-sm font-semibold">~28 days</span>
        </div>
      </div>
    </div>
  );
};

export default FailureForecastingUI;
