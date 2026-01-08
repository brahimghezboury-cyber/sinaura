import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Settings, Globe, Bell, Palette, Moon, Sun, ChevronRight, Check } from "lucide-react";

const CustomSettingsUI = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveSection(1), 1500);
    const timer2 = setTimeout(() => setDarkMode(false), 2500);
    const timer3 = setTimeout(() => setActiveSection(2), 3500);
    const timer4 = setTimeout(() => setNotifications(false), 4500);
    const timer5 = setTimeout(() => {
      setActiveSection(0);
      setDarkMode(true);
      setNotifications(true);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [activeSection === 0]);

  const settings = [
    { 
      icon: Globe, 
      label: "Language", 
      value: "English",
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    { 
      icon: darkMode ? Moon : Sun, 
      label: "Appearance", 
      value: darkMode ? "Dark" : "Light",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      toggle: true
    },
    { 
      icon: Bell, 
      label: "Notifications", 
      value: notifications ? "On" : "Off",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      toggle: true
    },
    { 
      icon: Palette, 
      label: "Theme Color", 
      value: "Cyan",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10"
    },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center">
            <Settings className="w-4 h-4 text-slate-600" />
          </div>
          <span className="text-slate-800 font-semibold text-sm">Settings</span>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-lg">JD</span>
          </div>
          <div>
            <p className="text-white font-semibold">John Doe</p>
            <p className="text-white/70 text-xs">Maintenance Engineer</p>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="flex-1 space-y-2 overflow-hidden">
        {settings.map((setting, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: activeSection === index ? 1.02 : 1,
              backgroundColor: activeSection === index ? "rgba(0, 0, 0, 0.03)" : "transparent"
            }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-2xl border border-slate-200/50 cursor-pointer hover:bg-slate-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${setting.bg} flex items-center justify-center`}>
                <setting.icon className={`w-5 h-5 ${setting.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{setting.label}</p>
              </div>
              <div className="flex items-center gap-2">
                {setting.toggle ? (
                  <motion.div 
                    className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${
                      (index === 1 ? darkMode : notifications) ? "bg-cyan-500" : "bg-slate-300"
                    }`}
                    onClick={() => index === 1 ? setDarkMode(!darkMode) : setNotifications(!notifications)}
                  >
                    <motion.div 
                      className="w-5 h-5 rounded-full bg-white shadow-sm"
                      animate={{ x: (index === 1 ? darkMode : notifications) ? 20 : 0 }}
                    />
                  </motion.div>
                ) : (
                  <>
                    <span className="text-sm text-slate-500">{setting.value}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Save Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 mt-4"
      >
        <Check className="w-4 h-4" />
        Save Changes
      </motion.button>
    </div>
  );
};

export default CustomSettingsUI;
