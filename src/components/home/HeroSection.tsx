import React from "react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <motion.div 
      id="hero-section"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-12 text-center shadow-xl mb-10"
    >
      {/* Visual geometric grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] opacity-25" />
      
      <div className="relative max-w-3xl mx-auto space-y-6">
        <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto">
          India's Smartest <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-indigo-300 via-purple-200 to-amber-200 bg-clip-text text-transparent">
            Government Job Discovery
          </span> <br className="hidden md:inline" />
          Platform
        </h1>

        <p className="text-base sm:text-lg text-indigo-100/90 leading-relaxed font-sans max-w-2xl mx-auto">
          A comprehensive portal supporting real-time Indian recruitment boards, age relaxation calculations for reserved quotas, and live step-by-step trackers.
        </p>
      </div>
    </motion.div>
  );
}
