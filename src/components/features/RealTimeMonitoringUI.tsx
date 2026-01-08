import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, Gauge, Thermometer, Zap } from "lucide-react";

const RealTimeMonitoringUI = () => {
  const [metrics, setMetrics] = useState({
    rpm: 1450,
    temp: 72,
    power: 85
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        rpm: 1400 + Math.floor(Math.random() * 100),
        temp: 68 + Math.floor(Math.random() * 10),
        power: 80 + Math.floor(Math.random() * 15)
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const gauges = [
    { icon: Gauge, label: "RPM", value: metrics.rpm, unit: "", color: "text-cyan-400", max: 2000 },
    { icon: Thermometer, label: "Temp", value: metrics.temp, unit: "°C", color: "text-orange-400", max: 100 },
    { icon: Zap, label: "Power", value: metrics.power, unit: "%", color: "text-emerald-400", max: 100 },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl p-5 flex flex-col border border-white/10 rounded-3xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <span className="text-white/90 font-medium text-xs">Live Monitoring</span>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-[10px]">Live</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="flex-1 flex flex-col justify-center gap-3">
        {gauges.map((gauge, index) => (
          <motion.div
            key={gauge.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 bg-white/5 rounded-xl border border-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <gauge.icon className={`w-4 h-4 ${gauge.color}`} />
                <span className="text-white/60 text-xs">{gauge.label}</span>
              </div>
              <motion.span 
                key={gauge.value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className={`text-sm font-semibold ${gauge.color}`}
              >
                {gauge.value}{gauge.unit}
              </motion.span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${(gauge.value / gauge.max) * 100}%` }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-full ${gauge.color.replace('text-', 'bg-')}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeMonitoringUI;
