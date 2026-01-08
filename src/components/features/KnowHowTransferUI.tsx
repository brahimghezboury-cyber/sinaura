import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Users, MessageSquare, Lightbulb, Share2 } from "lucide-react";

const KnowHowTransferUI = () => {
  const [activeUser, setActiveUser] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUser((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const experts = [
    { name: "Mario R.", role: "Senior Tech", tips: 24 },
    { name: "Laura B.", role: "Engineer", tips: 18 },
    { name: "Paolo G.", role: "Specialist", tips: 31 },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl p-5 flex flex-col border border-white/10 rounded-3xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-pink-500/20 flex items-center justify-center">
          <Users className="w-3.5 h-3.5 text-pink-400" />
        </div>
        <span className="text-white/90 font-medium text-xs">Know-How Transfer</span>
      </div>

      {/* Expert Cards */}
      <div className="flex-1 flex flex-col justify-center gap-2">
        {experts.map((expert, index) => (
          <motion.div
            key={expert.name}
            animate={{
              scale: activeUser === index ? 1.02 : 1,
              backgroundColor: activeUser === index ? "rgba(236, 72, 153, 0.1)" : "rgba(255, 255, 255, 0.03)"
            }}
            className="p-3 rounded-xl border border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                <span className="text-white text-xs font-medium">{expert.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <p className="text-white/90 text-xs font-medium">{expert.name}</p>
                <p className="text-white/40 text-[10px]">{expert.role}</p>
              </div>
              <div className="flex items-center gap-1 text-pink-400">
                <Lightbulb className="w-3 h-3" />
                <span className="text-xs">{expert.tips}</span>
              </div>
            </div>
            
            {activeUser === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 pt-2 border-t border-white/5"
              >
                <div className="flex items-center gap-2 text-white/50 text-[10px]">
                  <MessageSquare className="w-3 h-3" />
                  <span>Sharing expertise on motor drives...</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Share Button */}
      <button className="mt-3 w-full py-2 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-400 text-xs font-medium flex items-center justify-center gap-2 hover:bg-pink-500/20 transition-colors">
        <Share2 className="w-3 h-3" />
        Share Your Knowledge
      </button>
    </div>
  );
};

export default KnowHowTransferUI;
