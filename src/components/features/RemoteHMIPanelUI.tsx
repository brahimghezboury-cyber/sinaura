import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Monitor, Gauge, Thermometer, Zap, ArrowUpDown } from "lucide-react";

const RemoteHMIPanelUI = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [metrics, setMetrics] = useState({
    rpm: 1450,
    temp: 72,
    speed: 340,
    pressure: 6.2,
  });

  const tabs = ["EXTRUDER", "CONVEYORS", "TRANSPORT"];

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        rpm: 1400 + Math.floor(Math.random() * 100),
        temp: 68 + Math.floor(Math.random() * 10),
        speed: 320 + Math.floor(Math.random() * 40),
        pressure: +(5.8 + Math.random() * 0.8).toFixed(1),
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tabInterval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 4000);
    return () => clearInterval(tabInterval);
  }, []);

  return (
    <div className="w-full h-full bg-[#f5f5f7] p-5 flex flex-col rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-semibold text-slate-800">Remote HMI Panel</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-600 text-[10px] font-medium">Connected</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-200 rounded-xl p-1 mb-4">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`flex-1 text-[10px] font-semibold py-2 rounded-lg transition-all ${
              activeTab === i
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        <motion.div
          key={`rpm-${metrics.rpm}`}
          initial={{ scale: 1.02 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl p-4 flex flex-col justify-between shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-100 flex items-center justify-center">
              <Gauge className="w-3.5 h-3.5 text-cyan-600" />
            </div>
            <span className="text-[10px] text-slate-500 font-medium">RPM</span>
          </div>
          <span className="text-2xl font-bold text-slate-900">{metrics.rpm}</span>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
            <motion.div
              animate={{ width: `${(metrics.rpm / 2000) * 100}%` }}
              className="h-full bg-cyan-500 rounded-full"
            />
          </div>
        </motion.div>

        <motion.div
          key={`temp-${metrics.temp}`}
          initial={{ scale: 1.02 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl p-4 flex flex-col justify-between shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
              <Thermometer className="w-3.5 h-3.5 text-orange-600" />
            </div>
            <span className="text-[10px] text-slate-500 font-medium">TEMPERATURE</span>
          </div>
          <span className="text-2xl font-bold text-slate-900">{metrics.temp}°C</span>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
            <motion.div
              animate={{ width: `${(metrics.temp / 100) * 100}%` }}
              className="h-full bg-orange-500 rounded-full"
            />
          </div>
        </motion.div>

        <motion.div
          key={`speed-${metrics.speed}`}
          initial={{ scale: 1.02 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl p-4 flex flex-col justify-between shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-violet-600" />
            </div>
            <span className="text-[10px] text-slate-500 font-medium">SPEED</span>
          </div>
          <span className="text-2xl font-bold text-slate-900">{metrics.speed}</span>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
            <motion.div
              animate={{ width: `${(metrics.speed / 500) * 100}%` }}
              className="h-full bg-violet-500 rounded-full"
            />
          </div>
        </motion.div>

        <motion.div
          key={`pressure-${metrics.pressure}`}
          initial={{ scale: 1.02 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl p-4 flex flex-col justify-between shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span className="text-[10px] text-slate-500 font-medium">PRESSURE</span>
          </div>
          <span className="text-2xl font-bold text-slate-900">{metrics.pressure} bar</span>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
            <motion.div
              animate={{ width: `${(metrics.pressure / 10) * 100}%` }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-3 text-center">
        <span className="text-[10px] text-slate-400">No interruptions. Control the line remotely.</span>
      </div>
    </div>
  );
};

export default RemoteHMIPanelUI;
