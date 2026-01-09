import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap, AlertTriangle, CheckCircle, Bell, X } from "lucide-react";

const RealTimeAlertsUI = () => {
  const [alerts, setAlerts] = useState<{ id: number; type: string; message: string; time: string }[]>([]);
  const [dismissed, setDismissed] = useState<number[]>([]);

  useEffect(() => {
    const alertData = [
      { id: 1, type: "warning", message: "Temperature rising on Line 3", time: "Just now" },
      { id: 2, type: "critical", message: "Pressure anomaly detected", time: "2m ago" },
      { id: 3, type: "info", message: "Maintenance due in 48h", time: "5m ago" },
    ];

    const timer1 = setTimeout(() => setAlerts([alertData[0]]), 800);
    const timer2 = setTimeout(() => setAlerts([alertData[0], alertData[1]]), 1800);
    const timer3 = setTimeout(() => setAlerts(alertData), 2800);
    const timer4 = setTimeout(() => setDismissed([1]), 4500);
    const timer5 = setTimeout(() => {
      setAlerts([]);
      setDismissed([]);
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [alerts.length === 0]);

  const getAlertStyle = (type: string) => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          icon: <AlertTriangle className="w-4 h-4 text-red-400" />,
          badge: "bg-red-500"
        };
      case "warning":
        return {
          bg: "bg-amber-500/10",
          border: "border-amber-500/30",
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
          badge: "bg-amber-500"
        };
      default:
        return {
          bg: "bg-blue-500/10",
          border: "border-blue-500/30",
          icon: <CheckCircle className="w-4 h-4 text-blue-400" />,
          badge: "bg-blue-500"
        };
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center relative">
            <Zap className="w-4 h-4 text-orange-400" />
            {alerts.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-[10px] text-white font-bold">{alerts.filter(a => !dismissed.includes(a.id)).length}</span>
              </motion.div>
            )}
          </div>
          <span className="text-white font-medium text-sm">Real-Time Alerts</span>
        </div>
        <Bell className="w-4 h-4 text-white/30" />
      </div>

      <div className="flex-1 space-y-3 overflow-hidden">
        <AnimatePresence>
          {alerts.filter(a => !dismissed.includes(a.id)).map((alert) => {
            const style = getAlertStyle(alert.type);
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -50, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 50, height: 0 }}
                className={`p-4 rounded-2xl border ${style.bg} ${style.border} relative overflow-hidden`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{style.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white mb-1">{alert.message}</p>
                    <p className="text-xs text-white/40">{alert.time}</p>
                  </div>
                  <button 
                    className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    onClick={() => setDismissed([...dismissed, alert.id])}
                  >
                    <X className="w-3 h-3 text-white/50" />
                  </button>
                </div>
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 ${style.badge}`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {alerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center py-8"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-white/60 text-sm">All systems operational</p>
            <p className="text-white/30 text-xs mt-1">No active alerts</p>
          </motion.div>
        )}
      </div>

      <div className="pt-4 border-t border-white/5 mt-auto">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">Monitoring 24 devices</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeAlertsUI;
