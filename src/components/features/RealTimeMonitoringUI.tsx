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
    { icon: Gauge, label: "RPM", value: metrics.rpm, unit: "", color: "text-cyan-600", bgColor: "bg-cyan-100", max: 2000 },
    { icon: Thermometer, label: "Temperature", value: metrics.temp, unit: "°C", color: "text-orange-600", bgColor: "bg-orange-100", max: 100 },
    { icon: Zap, label: "Power", value: metrics.power, unit: "%", color: "text-emerald-600", bgColor: "bg-emerald-100", max: 100 },
  ];

  return (
    <div className="w-full h-full bg-[#f5f5f7] p-6 flex flex-col rounded-2xl">
      <div className="flex items-center justify-end gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-emerald-600 text-xs font-medium">Live</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-3">
        {gauges.map((gauge, index) => (
          <motion.div
            key={gauge.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white rounded-2xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${gauge.bgColor} flex items-center justify-center`}>
                  <gauge.icon className={`w-5 h-5 ${gauge.color}`} />
                </div>
                <span className="text-slate-600 text-sm font-medium">{gauge.label}</span>
              </div>
              <motion.span 
                key={gauge.value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className={`text-xl font-bold ${gauge.color}`}
              >
                {gauge.value}{gauge.unit}
              </motion.span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
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
