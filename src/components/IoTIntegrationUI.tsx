import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Radio, Cpu, Activity, Wifi, WifiOff } from "lucide-react";

const IoTIntegrationUI = () => {
  const [activeDevice, setActiveDevice] = useState(0);
  const [dataFlow, setDataFlow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDevice((prev) => (prev + 1) % 4);
      setDataFlow((prev) => !prev);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const devices = [
    { name: "PLC-001", type: "Controller", status: "online", value: "145 rpm" },
    { name: "SENS-042", type: "Temperature", status: "online", value: "72.4°C" },
    { name: "MOT-103", type: "Motor Drive", status: "online", value: "1.2 kW" },
    { name: "VLV-007", type: "Valve", status: "offline", value: "---" },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 flex items-center justify-center">
            <Radio className="w-4 h-4 text-teal-400" />
          </div>
          <span className="text-white font-medium text-sm">IoT Integration</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: dataFlow ? 1 : 0.3 }}
            className="flex items-center gap-1"
          >
            <Activity className="w-3 h-3 text-teal-400" />
            <span className="text-teal-400 text-xs">Syncing</span>
          </motion.div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/60 text-xs">Connected Devices</span>
          <span className="text-white font-semibold text-lg">3/4</span>
        </div>
        <div className="flex gap-1">
          {devices.map((device, index) => (
            <motion.div
              key={index}
              className={`flex-1 h-2 rounded-full ${
                device.status === "online" ? "bg-teal-500" : "bg-red-500/50"
              }`}
              animate={{
                opacity: activeDevice === index ? [0.5, 1, 0.5] : device.status === "online" ? 0.7 : 0.3
              }}
              transition={{ duration: 1, repeat: activeDevice === index ? Infinity : 0 }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden">
        {devices.map((device, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: activeDevice === index ? 1.02 : 1,
              backgroundColor: activeDevice === index ? "rgba(20, 184, 166, 0.1)" : "rgba(255, 255, 255, 0.02)"
            }}
            transition={{ delay: index * 0.1 }}
            className="p-3 rounded-xl border border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                device.status === "online" ? "bg-teal-500/10" : "bg-red-500/10"
              }`}>
                <Cpu className={`w-4 h-4 ${
                  device.status === "online" ? "text-teal-400" : "text-red-400"
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{device.name}</p>
                  {device.status === "online" ? (
                    <Wifi className="w-3 h-3 text-teal-400" />
                  ) : (
                    <WifiOff className="w-3 h-3 text-red-400" />
                  )}
                </div>
                <p className="text-xs text-white/40">{device.type}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-mono ${
                  device.status === "online" ? "text-teal-400" : "text-white/20"
                }`}>{device.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/5 mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-white/40 text-xs">Data Points/sec</span>
          <div className="flex items-center gap-2">
            <motion.div 
              className="flex gap-0.5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-3 rounded-full bg-teal-400" style={{ height: `${8 + Math.random() * 8}px` }} />
              ))}
            </motion.div>
            <span className="text-teal-400 font-mono text-sm">1,247</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTIntegrationUI;
