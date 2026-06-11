import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Zap, CheckCircle2 } from "lucide-react";

export default function ValueBentoGrid() {
  return (
    <motion.div 
      id="value-bento-grid"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="grid gap-6 md:grid-cols-3 text-left mb-10"
    >
      {/* Card 1 */}
      <div id="bento-card-quota" className="rounded-2xl border border-slate-100 bg-white dark:bg-[#111827] dark:border-slate-800 p-6 shadow-xs flex items-start gap-4 transition-all duration-350 hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 shrink-0 shadow-inner">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-sans text-sm font-bold text-slate-800 dark:text-white tracking-tight">
            Quota Age Relaxation
          </h3>
          <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1.5 font-medium">
            Enter your category status (OBC, SC/ST, PwD) to instantly scale the maximum age limit on all official postings.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div id="bento-card-sso" className="rounded-2xl border border-slate-100 bg-white dark:bg-[#111827] dark:border-slate-800 p-6 shadow-xs flex items-start gap-4 transition-all duration-350 hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 shrink-0 shadow-inner">
          <Zap className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-sans text-sm font-bold text-slate-800 dark:text-white tracking-tight">
            Fast-Track Single Sign On
          </h3>
          <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1.5 font-medium">
            Verify credentials once; our quick-apply interface loads verified states and submits parameters instantly.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div id="bento-card-tracker" className="rounded-2xl border border-slate-100 bg-white dark:bg-[#111827] dark:border-slate-800 p-6 shadow-xs flex items-start gap-4 transition-all duration-350 hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shrink-0 shadow-inner">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-sans text-sm font-bold text-slate-800 dark:text-white tracking-tight">
            Phase Progress Tracker
          </h3>
          <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1.5 font-medium">
            Track admit-card dispatches, written exam bookings, physical screenings, and central list publication schedules.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
