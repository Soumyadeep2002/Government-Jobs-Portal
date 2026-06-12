import { motion } from "motion/react";
import { Briefcase, User, Home, Bell, Landmark, Sun, Moon, GraduationCap } from "lucide-react";
import { UserProfile } from "../../types";

const getInitials = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

interface NavbarProps {
  currentView: "home" | "jobs" | "profile" | "guide";
  setView: (view: "home" | "jobs" | "profile" | "guide") => void;
  user: UserProfile;
  notificationsCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navbar({ 
  currentView, 
  setView, 
  user, 
  notificationsCount,
  darkMode,
  onToggleDarkMode
}: NavbarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "jobs", label: "Live Exams", icon: Briefcase },
    { id: "guide", label: "Exams", icon: GraduationCap },
  ] as const;

  // Modern functional color coding of category tag of the user
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case "General":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "OBC":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/60";
      case "SC":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "ST":
        return "bg-teal-50 text-teal-700 border-teal-200/60";
      case "PwD":
        return "bg-violet-50 text-violet-700 border-violet-200/60";
      case "EWS":
        return "bg-amber-50 text-amber-700 border-amber-250/60";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl transition-all duration-300">
      {/* 1. Dynamic Top Gradient Accent Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 animate-gradient-xy" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* 2. Interactive Logo with Spring Scale/Rotate Micro-Interaction */}
        <motion.div 
          className="flex cursor-pointer items-center gap-3 group" 
          onClick={() => setView("home")}
          id="nav-logo"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Customized beautiful inline SVG Logo representing the Saffron Dome Assembly and Flag */}
          <motion.div 
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-slate-900 overflow-hidden ring-1 ring-slate-200/60 dark:ring-slate-800 shadow-2xs"
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
          >
            <svg viewBox="0 0 100 100" className="h-9 w-9" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Flagpole */}
              <rect x="48" y="8" width="3" height="22" fill="#f97316" rx="0.5" />
              
              {/* Flag pointing right */}
              <path d="M51,8 C58,6 65,12 74,10 C74,13 72,16 74,18 C65,20 58,14 51,16 Z" fill="#f97316" />
              
              {/* Saffron Dome divided in two halves for realistic 3D shadow depth */}
              {/* Left light half */}
              <path d="M20,44 C20,22 50,22 50,44 Z" fill="#fb923c" />
              {/* Right shaded half */}
              <path d="M50,22 C50,22 80,22 80,44 L50,44 Z" fill="#ea580c" />
              
              {/* Saffron Dome horizontal baseline overlay */}
              <rect x="16" y="43" width="68" height="4" fill="#f97316" rx="1" />
              
              {/* Royal Navy Base Shield resembling assembly foundation architecture */}
              <path d="M18,47 H82 C82,47 84,68 50,75 C16,68 18,47 18,47 Z" fill="#1e3a8a" />
              
              {/* Custom 'S G' pillars within style architecture */}
              <rect x="23" y="51" width="5" height="15" fill="#94a3b8" rx="0.5" />
              <rect x="31" y="51" width="5" height="15" fill="#94a3b8" rx="0.5" />
              <path d="M41,51 H47 V66 H41 V62 H44 V59 H41 Z" fill="#94a3b8" />
              
              <rect x="54" y="51" width="5" height="15" fill="#94a3b8" rx="0.5" />
              {/* G Column with middle horizontal prong */}
              <path d="M64,51 H76 V66 H64 Z" fill="#94a3b8" />
              <path d="M68,55 H72 V62 H68 Z" fill="#1e3a8a" />
              <rect x="70" y="58" width="5" height="4" fill="#94a3b8" />
            </svg>
          </motion.div>
          
          {/* Customized beautiful brand typography instead of logo text image */}
          <div className="flex items-center gap-1.5 font-sans select-none">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Sarkaar
            </span>
            <motion.span 
              className="relative flex h-7 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white font-black text-sm px-2.5 py-0.5 shadow-xs"
              whileHover={{ y: -2 }}
            >
              G
              <span className="absolute -top-1 -right-0.5 block text-[7px] text-amber-400">★</span>
            </motion.span>
          </div>
        </motion.div>

        {/* 3. Fluid Navigation Links (with Synchronized Dual-Plane Indicators) */}
        <nav className="relative flex items-center gap-1.5 sm:gap-3 bg-slate-100/50 rounded-full p-1" id="nav-navigation-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <motion.button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setView(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 font-sans text-xs sm:text-sm font-semibold transition-all duration-300 outline-none cursor-pointer ${
                  isActive 
                    ? "text-indigo-600" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {/* Visual Glass Pill Background for Active State */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-white shadow-xs border border-slate-200/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <Icon className={`relative z-10 h-4.5 w-4.5 transition-transform duration-300 ${isActive ? "scale-110 rotate-0" : "scale-100 group-hover:scale-105"}`} />
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
                
                {/* pulsing dot indicator over Live Exams */}
                {item.id === "jobs" && (
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
                )}

                {/* Micro Underscore indicator synchronized via Framer Motion */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-dot"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-4 rounded-full bg-indigo-600"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* 4. Action Badges & Profiler Indicator */}
        <div className="flex items-center gap-3">
          
          {/* Dark Mode Toggle Button */}
          <motion.button
            type="button"
            onClick={onToggleDarkMode}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-amber-400 transition-all cursor-pointer"
            title="Toggle Dark/Light Theme"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-amber-500 animate-pulse" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-500" />
            )}
          </motion.button>

          {/* Bell Notification Alert with Hover Wiggle */}
          <motion.button 
            type="button"
            onClick={() => setView("jobs")}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 transition-all cursor-pointer"
            title="Latest Bulletins"
            id="nav-bell-alert"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-5 w-5 transition-transform group-hover:animate-wiggle" />
            
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-indigo-600 font-mono text-[9px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
                {notificationsCount}
              </span>
            )}
          </motion.button>

          {/* Dynamic Profiler Ribbon */}
          <motion.div 
            onClick={() => setView("profile")}
            className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs p-1 pr-3 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs transition-all"
            id="nav-user-badge"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Custom Interactive Avatar Ring */}
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-[11px] font-extrabold text-white shadow-xs uppercase leading-none">
              {getInitials(user.fullName)}
              <span className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            </div>

            <div className="hidden text-left md:block">
              <span className="block font-sans text-xs font-bold leading-tight text-slate-800 dark:text-slate-200">
                {user.fullName.split(" ")[0]}
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </header>
  );
}
