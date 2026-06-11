import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, MapPin, Calendar, Award, CheckCircle, AlertTriangle, 
  ChevronDown, ChevronUp, ExternalLink, Bookmark, HelpCircle, 
  Briefcase, IndianRupee, Layers, BadgeAlert, Trophy
} from "lucide-react";
import { Job, UserProfile } from "../../types";
import { verifyJobEligibility, getAgeRelaxation } from "../../data";

interface JobCardProps {
  key?: string | number;
  job: Job;
  user: UserProfile;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  isApplied: boolean;
  appliedStatus?: string;
  onApply: (notes?: string) => void;
}

export default function JobCard({
  job,
  user,
  isBookmarked,
  onToggleBookmark,
  isApplied,
  appliedStatus,
  onApply
}: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { eligible, reasons } = verifyJobEligibility(job, user);
  const userRelaxation = getAgeRelaxation(user.category);
  const effectiveMaxAgeForUser = job.maxAgeGeneral + userRelaxation;

  // Calculate days left relative to simulated date: 2026-06-10
  const closingDateObj = new Date(job.closingDate);
  const todayObj = new Date("2026-06-10");
  const timeDiff = closingDateObj.getTime() - todayObj.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Determine urgency level for styling
  const isUrgent = daysLeft <= 5;
  const daysLeftColor = isUrgent
    ? "from-rose-500 to-amber-500 text-white animate-pulse"
    : daysLeft <= 10
    ? "from-amber-400 to-orange-500 text-white"
    : "from-indigo-50 to-indigo-100/55 text-indigo-700 border border-indigo-100";

  const notificationLink = job.id === "job-2"
    ? "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf"
    : job.officialLink;

  const applyUrl = job.id === "job-2"
    ? "https://ssc.gov.in/login"
    : job.officialLink;

  const handleApplyClick = () => {
    onApply("Applied via SarkaarG Portal redirection.");
    window.open(applyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      id={`job-card-${job.id}`}
      className={`relative overflow-hidden rounded-2xl border bg-white p-5 transition-all hover:shadow-md ${
        isApplied 
          ? "border-indigo-100 bg-indigo-50/10 shadow-sm shadow-indigo-50/20" 
          : "border-slate-100"
      }`}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      {/* Decorative colored glow edge indicating category/sector */}
      <div 
        className="absolute top-0 left-0 h-full w-1.5"
        style={{
          backgroundColor: 
            job.category === "Defence" ? "#ef4444" :
            job.category === "Banking" ? "#3b82f6" :
            job.category === "Railway" ? "#f59e0b" :
            job.category === "Central" ? "#6366f1" :
            job.category === "PSU" ? "#10b981" : "#8b5cf6"
        }}
      />

      {/* Main card grid layout */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        
        {/* Left column info */}
        <div className="flex-1 space-y-2.5 pl-2 text-left">
          
          {/* Tag Category and Notification Id Row */}
          <div className="flex flex-wrap items-center gap-2">
            <span 
              className="rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white shadow-xs"
              style={{
                backgroundColor: 
                  job.category === "Defence" ? "#ef4444" :
                  job.category === "Banking" ? "#3b82f6" :
                  job.category === "Railway" ? "#f59e0b" :
                  job.category === "Central" ? "#6366f1" :
                  job.category === "PSU" ? "#10b981" : "#8b5cf6"
              }}
            >
              {job.category} Sector
            </span>
            <span className="font-mono text-[10px] font-bold text-slate-400">
              ID: {job.notificationId}
            </span>
            {job.featured && (
              <span className="flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 font-sans text-[9px] font-extrabold tracking-tight text-amber-600 border border-amber-200">
                <Trophy className="h-2.5 w-2.5" />
                HIGH PRIORITY
              </span>
            )}
          </div>

          {/* Job Title and Ministry Agency */}
          <div>
            <h3 className="font-sans text-base font-bold tracking-tight text-slate-800 transition-colors hover:text-indigo-600 line-clamp-2 md:text-lg">
              {job.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-slate-500">
              <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="font-sans text-xs font-semibold leading-tight line-clamp-1">{job.agency}</span>
            </div>
          </div>

          {/* Core Info Badges Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1 sm:grid-cols-3">
            {/* Location */}
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="font-sans text-xs font-medium text-slate-600 line-clamp-1">{job.location}</span>
            </div>

            {/* Salary Range */}
            <div className="flex items-center gap-1.5">
              <IndianRupee className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="font-mono text-xs font-bold text-slate-700">
                ₹{Math.floor(job.salaryMin / 1000)}K - ₹{Math.floor(job.salaryMax / 1000)}K<span className="text-[10px] text-slate-400 font-normal">/mo</span>
              </span>
            </div>

            {/* Minimum Education Limit */}
            <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
              <Award className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="font-sans text-xs font-semibold text-slate-600">
                Req: {job.minQualification}
              </span>
            </div>
          </div>

        </div>

        {/* Right column: Action State Badges & Apply button */}
        <div className="flex flex-col items-stretch gap-3 self-stretch bg-slate-50/40 p-3 rounded-xl md:bg-transparent md:p-0 md:self-auto md:items-end justify-between min-w-[200px]">
          
          {/* Days Left Countdown Banner */}
          <div className={`flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold shadow-xs ${daysLeftColor}`}>
            <Calendar className="h-4 w-4 shrink-0" />
            <span>
              {daysLeft > 0 ? `${daysLeft} Days Left` : "Ended Status"}
            </span>
          </div>

          {/* Verification Checker */}
          <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-2 md:border-none md:pt-0">
            {eligible ? (
              <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-sans text-xs font-bold text-emerald-600 border border-emerald-100">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>You are Eligible</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 font-sans text-xs font-bold text-rose-600 border border-rose-100">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Ineligible (Check Profiler)</span>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Bookmark Flag button */}
              <motion.button
                onClick={onToggleBookmark}
                id={`btn-bookmark-${job.id}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all cursor-pointer ${
                  isBookmarked
                    ? "border-amber-200 bg-amber-50 text-amber-500"
                    : "border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
                title={isBookmarked ? "Remove Bookmark Alert" : "Bookmark Job Alert"}
              >
                <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
              </motion.button>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="grid grid-cols-2 gap-2 w-full md:flex md:w-auto md:justify-end">
            {/* View Details Toggle */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              id={`btn-toggle-expand-${job.id}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white py-2 px-3.5 text-xs font-extrabold text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-700 cursor-pointer text-center"
            >
              <span>Details</span>
              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </motion.button>

            {/* Apply Button */}
            {isApplied ? (
              <span className="flex items-center justify-center gap-1 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500 border border-slate-200">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                {appliedStatus || "Applied"}
              </span>
            ) : (
              <motion.button
                onClick={handleApplyClick}
                id={`btn-apply-${job.id}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-xl py-2 px-4 text-xs font-extrabold tracking-tight text-white transition-all shadow-sm cursor-pointer border text-center ${
                  eligible 
                    ? "bg-indigo-600 hover:bg-indigo-700 border-indigo-650 shadow-indigo-100 hover:shadow" 
                    : "bg-slate-800 hover:bg-slate-900 border-slate-850 shadow-slate-100"
                }`}
              >
                Apply Now
              </motion.button>
            )}
          </div>

        </div>

      </div>

      {/* Expandable detailed drawer panel using framer-motion */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-5 border-t border-slate-100 pt-5 text-left space-y-4 text-sm" id={`drawer-expanded-${job.id}`}>
              
              {/* Detailed Columns Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400">
                    Vacancy Specifications
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-medium font-sans">
                    <li>💼 <strong className="text-slate-800">Total Available Vacancies:</strong> {job.totalVacancies.toLocaleString()} posts nationwide</li>
                    <li>🪙 <strong className="text-slate-800">Exam Fees:</strong> General / OBC: ₹{job.examFeeGeneral} | Reserved: {job.examFeeReserved === 0 ? "Exempted (Free)" : `₹${job.examFeeReserved}`}</li>
                    <li>🎂 <strong className="text-slate-800">Required Age Limits:</strong> {job.minAge} to {job.maxAgeGeneral} years <span className="font-mono text-[10px] text-zinc-400 font-bold">(General limit)</span></li>
                    <li>⏱️ <strong className="text-slate-800">Reservation Age Relaxation (Your Category):</strong> Maximum age limit for you is <strong className="text-indigo-600">{effectiveMaxAgeForUser}</strong> (including +{userRelaxation} yrs for {user.category})</li>
                    <li>🎓 <strong className="text-slate-800">Acceptable Disciplines:</strong> {job.stream.join(", ")}</li>
                    {job.experienceRequired > 0 && (
                      <li className="text-rose-600 font-bold">⚠️ Requires {job.experienceRequired} Year(s) professional experience.</li>
                    )}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400">
                    Syllabus & Selection Scheme
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-medium font-sans">
                    {job.selectionProcess.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-1 text-slate-700">
                        <span className="font-bold text-indigo-500 shrink-0 mr-1">Stage {idx + 1}:</span>
                        <span>{step}</span>
                      </li>
                    ))}
                    {job.examDate && (
                      <li className="mt-1 bg-amber-50 text-amber-800 p-1.5 rounded-lg border border-amber-100 inline-block font-sans text-[11px] font-bold">
                        📅 Scheduled Tentative Exam Date: {new Date(job.examDate).toLocaleDateString("en-IN", {day: "numeric", month: "short", year: "numeric"})}
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Extensive Description */}
              <div className="space-y-1.5">
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400">
                  Detailed Official Mandate
                </h4>
                <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal">
                  {job.description} Candidates must verify certificate authenticity before physical screening. All appointments are governed under the official terms published by the {job.agency}, Central Secretariat.
                </p>
              </div>

              {/* Ineligibility Diagnostic Logger if deficient */}
              {!eligible && reasons.length > 0 && (
                <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-start gap-2 text-left">
                  <BadgeAlert className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-sans text-xs font-bold text-rose-700 leading-tight">
                      Eligibility Review Diagnostic
                    </h5>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-xs text-rose-600 font-medium font-sans">
                      {reasons.map((reason, rIdx) => (
                        <li key={rIdx}>{reason}</li>
                      ))}
                    </ul>
                    <p className="text-[10px] text-rose-400 mt-1 font-semibold leading-normal">
                      💡 Tip: You can adjust your profile statistics (Academic qualification, Date of Birth, fields of selection) in the <strong>Profile Dashboard</strong> to check simulated criteria changes.
                    </p>
                  </div>
                </div>
              )}

              {/* Gazette Links and Official Site Redirect */}
              <div className="flex flex-col gap-2 justify-between items-stretch sm:flex-row sm:items-center border-t border-slate-50 pt-3">
                <span className="font-mono text-[10px] text-slate-400 font-medium block">
                  Closing Deadline: {job.closingDate} ({daysLeft} Days Remain)
                </span>
                
                <a
                  href={notificationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 px-3.5 py-1.5 text-xs font-bold text-slate-700 transition"
                >
                  <span>Notification</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
