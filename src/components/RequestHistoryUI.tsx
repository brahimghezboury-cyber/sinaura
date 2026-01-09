import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { History, MessageCircle, Clock, ChevronRight } from "lucide-react";

const RequestHistoryUI = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setSelectedIndex(0), 1500);
    const timer2 = setTimeout(() => setSelectedIndex(1), 3000);
    const timer3 = setTimeout(() => setSelectedIndex(null), 4500);
    const timer4 = setTimeout(() => setSelectedIndex(0), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const historyItems = [
    { 
      component: "TERMOCOPPIA CAMERA 3", 
      error: "FMO1201", 
      time: "16:50",
      status: "resolved",
      messages: 12
    },
    { 
      component: "VALVOLA PNEUMATICA L2", 
      error: "PNE0445", 
      time: "14:22",
      status: "resolved",
      messages: 8
    },
    { 
      component: "MOTORE ASSE Y", 
      error: "DRV2201", 
      time: "11:08",
      status: "pending",
      messages: 5
    },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <History className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="text-slate-800 font-semibold text-sm">Request History</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <Clock className="w-3 h-3" />
          Today
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-hidden">
        {historyItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: selectedIndex === index ? 1.02 : 1,
              backgroundColor: selectedIndex === index ? "rgba(99, 102, 241, 0.05)" : "rgba(0, 0, 0, 0.02)"
            }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-2xl border border-slate-200/50 cursor-pointer hover:bg-slate-50 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 mb-1">{item.component}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">{item.error}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    item.status === "resolved" 
                      ? "bg-emerald-100 text-emerald-700" 
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {item.status === "resolved" ? "Resolved" : "Pending"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-slate-400">{item.time}</span>
                <div className="flex items-center gap-1 text-indigo-500">
                  <MessageCircle className="w-3 h-3" />
                  <span className="text-xs">{item.messages}</span>
                </div>
              </div>
            </div>
            
            {selectedIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 pt-3 border-t border-slate-200/50"
              >
                <button className="flex items-center gap-2 text-indigo-600 text-sm font-medium hover:text-indigo-700">
                  Reopen conversation
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-200/50 mt-auto">
        <button className="w-full py-2.5 text-center text-sm text-indigo-600 font-medium bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
          View All History
        </button>
      </div>
    </div>
  );
};

export default RequestHistoryUI;
