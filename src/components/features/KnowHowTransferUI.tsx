import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Users, MessageSquare, Lightbulb } from "lucide-react";

const KnowHowTransferUI = () => {
  const [activeUser, setActiveUser] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUser((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const experts = [
    { name: "Mario R.", role: "Senior Tech", tips: 24, color: "from-blue-400 to-cyan-400" },
    { name: "Laura B.", role: "Engineer", tips: 18, color: "from-pink-400 to-rose-400" },
    { name: "Paolo G.", role: "Specialist", tips: 31, color: "from-violet-400 to-purple-400" },
  ];

  return (
    <div className="w-full h-full bg-[#f5f5f7] p-6 flex flex-col rounded-2xl">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Users className="w-5 h-5 text-pink-500" />
        <span className="text-slate-700 font-semibold text-sm">Team Expertise</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-3">
        {experts.map((expert, index) => (
          <motion.div
            key={expert.name}
            animate={{
              scale: activeUser === index ? 1.02 : 1,
              boxShadow: activeUser === index ? "0 4px 20px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.05)"
            }}
            className="p-4 bg-white rounded-2xl transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${expert.color} flex items-center justify-center`}>
                <span className="text-white text-lg font-bold">{expert.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <p className="text-slate-800 font-semibold text-sm">{expert.name}</p>
                <p className="text-slate-500 text-xs">{expert.role}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Lightbulb className="w-4 h-4" />
                <span className="text-sm font-bold">{expert.tips}</span>
              </div>
            </div>
            
            {activeUser === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 pt-3 border-t border-slate-100"
              >
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <MessageSquare className="w-3 h-3" />
                  <span>Sharing motor drive expertise...</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KnowHowTransferUI;
