import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile, Job, JobApplication } from "../types";
import { 
  User, GraduationCap, Briefcase, Tag, Map, HelpCircle, 
  Settings, Bookmark, CheckCircle2, AlertCircle, FileSearch,
  Check, Edit3, ArrowRight, ShieldCheck, Hourglass, Landmark
} from "lucide-react";
import { getAgeRelaxation, verifyJobEligibility } from "../data";
import CustomDropdown from "./CustomDropdown";

// Helper to extract short user-friendly names from selection stages
function getStageShortName(stageStr: string, index: number): string {
  const s = stageStr.toLowerCase();
  if (s.includes("tier-1") || s.includes("tier 1") || s.includes("prelim")) return "Prelims";
  if (s.includes("tier-2") || s.includes("tier 2") || s.includes("main")) return "Mains";
  if (s.includes("interview") || s.includes("panel assessment") || s.includes("viva") || s.includes("viva voce")) return "Interview";
  if (s.includes("document verification") || s.includes("doc")) return "Document Verification";
  if (s.includes("physical standards") || s.includes("physical")) return "Physical Test";
  if (s.includes("screening")) return "Screening Test";
  if (s.includes("gate score")) return "GATE Screening";
  if (s.includes("ssc (service selection board)")) return "SSB Testing";
  if (s.includes("specialist written exam")) return "Specialist Written";
  if (s.includes("tier 1 cbt")) return "Tier 1 CBT";
  if (s.includes("academic grade indexing")) return "Academic Indexing";
  return `Stage ${index + 1}`;
}

// Generate complete ordered list of application progress steps based on the selection process
export function getStatusStepsForJob(job: Job): string[] {
  const steps: string[] = [
    "Visited",
    "Registered",
    "Application in Progress",
    "Exam Fees Paid"
  ];

  const rawStages = job.selectionProcess.map((item, index) => getStageShortName(item, index));
  const stages: string[] = [];
  const seen = new Set<string>();
  
  rawStages.forEach((stage) => {
    let finalStage = stage;
    let counter = 2;
    while (seen.has(finalStage)) {
       finalStage = `${stage} ${counter}`;
       counter++;
    }
    seen.add(finalStage);
    stages.push(finalStage);
  });
  
  stages.forEach((stage, idx) => {
    const sl = stage.toLowerCase();
    if (sl.includes("document") || sl.includes("physical")) {
      if (!steps.includes("Document Verified")) {
        steps.push("Document Verified");
      }
    } else {
      if (idx === 0) {
        steps.push("Admit Card Downloaded");
        steps.push(`${stage} Cleared`);
        steps.push(`${stage} not Qualified`);
      } else {
        steps.push(`${stage} Admit Card Downloaded`);
        steps.push(`${stage} Cleared`);
        steps.push(`${stage} not Qualified`);
      }
    }
  });

  steps.push("Selected");
  steps.push("Rejected");

  return steps;
}

// Animated celebration particle shower cascade
function CelebrationParticles() {
  const count = 60;
  const colors = ["#4f46e5", "#10b981", "#f59e0b", "#ec4899", "#3b82f6", "#22c55e"];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 8 + 6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const duration = Math.random() * 2 + 1.5;
        const endX = startX + (Math.random() * 40 - 20);
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: `${startX}vw`,
              top: "-5%",
            }}
            initial={{ y: "-5vh", opacity: 1, scale: 0.5 }}
            animate={{ 
              y: "105vh", 
              x: `${endX - startX}vw`,
              opacity: [1, 1, 0],
              scale: [0.5, 1.2, 0.2],
              rotate: Math.random() * 360
            }}
            transition={{
              duration: duration,
              delay: delay,
              ease: "easeOut",
              repeat: Infinity
            }}
          />
        );
      })}
    </div>
  );
}

interface ProfileTabProps {
  user: UserProfile;
  onChangeUser: (updatedUser: UserProfile) => void;
  bookmarkedJobs: Job[];
  onToggleBookmark: (jobId: string) => void;
  applications: JobApplication[];
  jobs: Job[];
  onUpdateAppStatus: (jobId: string, status: JobApplication["status"]) => void;
  onChangeApplications: (apps: JobApplication[]) => void;
}

export default function ProfileTab({
  user,
  onChangeUser,
  bookmarkedJobs,
  onToggleBookmark,
  applications,
  jobs,
  onUpdateAppStatus,
  onChangeApplications
}: ProfileTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<"details" | "applications" | "bookmarks">("details");
  const [isEditing, setIsEditing] = useState(false);

  // Dynamic stage tracker alerts & celebrations states
  const [stageMessage, setStageMessage] = useState<{
    type: "success" | "info" | "error";
    title: string;
    description: string;
  } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebratedJob, setCelebratedJob] = useState<Job | null>(null);

  // Confirmation state for removals (Two-step verification!)
  const [confirmingDeleteAppId, setConfirmingDeleteAppId] = useState<string | null>(null);
  const [confirmingDeleteBookmarkId, setConfirmingDeleteBookmarkId] = useState<string | null>(null);

  // Undo backups state
  const [recentlyDeletedApp, setRecentlyDeletedApp] = useState<JobApplication | null>(null);
  const [recentlyDeletedBookmarkId, setRecentlyDeletedBookmarkId] = useState<string | null>(null);

  // Undo timing displays
  const [showAppUndoToast, setShowAppUndoToast] = useState(false);
  const [showBookmarkUndoToast, setShowBookmarkUndoToast] = useState(false);

  // --- Tracked Job Deletion and Recover ---
  const handleRemoveAppRequest = (jobId: string) => {
    setConfirmingDeleteAppId(jobId);
  };

  const handleRemoveAppConfirm = (jobId: string) => {
    const target = applications.find(a => a.jobId === jobId);
    if (target) {
      setRecentlyDeletedApp(target);
      setShowAppUndoToast(true);
      setConfirmingDeleteAppId(null);

      onChangeApplications(applications.filter(a => a.jobId !== jobId));

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        setShowAppUndoToast(false);
      }, 5000);
    }
  };

  const handleAppUndo = () => {
    if (recentlyDeletedApp) {
      onChangeApplications([...applications, recentlyDeletedApp]);
      setRecentlyDeletedApp(null);
      setShowAppUndoToast(false);
    }
  };

  // --- Bookmark Deletion and Recover ---
  const handleRemoveBookmarkConfirm = (jobId: string) => {
    setRecentlyDeletedBookmarkId(jobId);
    setShowBookmarkUndoToast(true);
    setConfirmingDeleteBookmarkId(null);

    onToggleBookmark(jobId);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setShowBookmarkUndoToast(false);
    }, 5000);
  };

  const handleBookmarkUndo = () => {
    if (recentlyDeletedBookmarkId) {
      onToggleBookmark(recentlyDeletedBookmarkId);
      setRecentlyDeletedBookmarkId(null);
      setShowBookmarkUndoToast(false);
    }
  };

  // Form states matching profile
  const [fullName, setFullName] = useState(user.fullName);
  const [dob, setDob] = useState(user.dob);
  const [qualification, setQualification] = useState(user.qualification);
  const [stream, setStream] = useState(user.stream);
  const [experienceYears, setExperienceYears] = useState(user.experienceYears);
  const [category, setCategory] = useState(user.category);
  const [statePreference, setStatePreference] = useState(user.statePreference);
  const [roleInput, setRoleInput] = useState(user.preferredRoles.join(", "));

  // Handle DoB change to calculate real age
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDob(value);
    
    // Auto-calculate age
    if (value) {
      const birthDate = new Date(value);
      const today = new Date("2026-06-10"); // simulated date
      let derivedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        derivedAge--;
      }
      if (derivedAge > 0) {
        // limit bounds safely
        derivedAge = Math.min(65, Math.max(16, derivedAge));
      }
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate final age just to make sure
    const birthDate = new Date(dob);
    const todayObj = new Date("2026-06-10");
    let calculatedAge = todayObj.getFullYear() - birthDate.getFullYear();
    const m = todayObj.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && todayObj.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    
    const parsedRoles = roleInput
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const updated: UserProfile = {
      fullName,
      email: user.email,
      dob,
      age: calculatedAge || 24,
      qualification,
      stream,
      experienceYears: Number(experienceYears),
      category,
      statePreference,
      preferredRoles: parsedRoles.length > 0 ? parsedRoles : ["Officer"]
    };

    onChangeUser(updated);
    setIsEditing(false);
  };

  const reservationRelaxation = getAgeRelaxation(user.category);

  // Status mapping to colors / descriptions
  const getStatusColorAndLabels = (status: string, steps: string[]) => {
    const lower = status.toLowerCase();
    
    // Find index for progress calculating
    const idx = steps.findIndex(s => s.toLowerCase() === status.toLowerCase());
    const currentStepIndex = idx !== -1 ? idx : 0;
    const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / steps.length) * 100));

    if (lower === "selected") {
      return {
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        text: "Allocated & Appointed 🎉",
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
        progress: 100
      };
    }
    
    if (lower === "rejected") {
      return {
        bg: "bg-rose-50 text-rose-700 border-rose-250",
        text: "Application Rejected",
        icon: <AlertCircle className="h-4 w-4 text-rose-550" />,
        progress: progressPercent
      };
    }

    if (lower.includes("not qualified")) {
      return {
        bg: "bg-rose-50 text-rose-700 border-rose-220",
        text: `${status}`,
        icon: <AlertCircle className="h-4 w-4 text-rose-500" />,
        progress: progressPercent
      };
    }

    if (lower.includes("cleared")) {
      return {
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        text: status,
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
        progress: progressPercent
      };
    }

    if (lower.includes("admit card") || lower.includes("hall ticket")) {
      return {
        bg: "bg-purple-50 text-purple-700 border-purple-200",
        text: status,
        icon: <Landmark className="h-4 w-4 text-purple-600" />,
        progress: progressPercent
      };
    }

    if (lower === "visited") {
      return {
        bg: "bg-slate-100 text-slate-700 border-slate-205",
        text: "Redirection Link Visited",
        icon: <Settings className="h-4 w-4 text-slate-500" />,
        progress: 10
      };
    }

    if (lower === "registered") {
      return {
        bg: "bg-sky-50 text-sky-700 border-sky-150",
        text: "Registration Candidate Vetted",
        icon: <Check className="h-4 w-4 text-sky-500" />,
        progress: 25
      };
    }

    if (lower === "application in progress") {
      return {
        bg: "bg-amber-50 text-amber-700 border-amber-150",
        text: "Form Fill-up In Progress",
        icon: <FileSearch className="h-4 w-4 text-amber-500" />,
        progress: 40
      };
    }

    if (lower === "exam fees paid") {
      return {
        bg: "bg-teal-55 text-teal-705 border-teal-200",
        text: "Application Exam Fees Paid",
        icon: <ShieldCheck className="h-4 w-4 text-teal-600" />,
        progress: 55
      };
    }

    if (lower === "document verified") {
      return {
        bg: "bg-teal-50 text-teal-700 border-teal-200",
        text: "Document Verified",
        icon: <ShieldCheck className="h-4 w-4 text-teal-600" />,
        progress: progressPercent
      };
    }

    return {
      bg: "bg-indigo-55 text-indigo-705 border-indigo-200",
      text: status,
      icon: <Check className="h-4 w-4 text-indigo-500" />,
      progress: progressPercent
    };
  };

  const handleStatusSelect = (jobId: string, newStatus: string) => {
    onUpdateAppStatus(jobId, newStatus);

    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const lower = newStatus.toLowerCase();

    if (lower.includes("not qualified")) {
      const stageName = newStatus.replace(/ not qualified/i, "");
      setStageMessage({
        type: "error",
        title: "💪 Hard Luck - Keep Moving!",
        description: `Do not lose hope! Although you did not qualify in the ${stageName} for ${job.title}, this is an opportunity to review criteria and attempt again. Perseverance guarantees success!`
      });
      setTimeout(() => {
        setStageMessage(prev => prev && prev.title?.includes("Hard Luck") ? null : prev);
      }, 7000);
    } else if (lower.includes("cleared")) {
      const stageName = newStatus.replace(/ cleared/i, "");
      setStageMessage({
        type: "success",
        title: "🎉 Passed Stage Success!",
        description: `Stellar work! You have successfully cleared ${stageName} for ${job.title}. Keep pushing toward national service!`
      });
      setTimeout(() => {
        setStageMessage(prev => prev && prev.title?.includes("Passed Stage") ? null : prev);
      }, 7000);
    } else if (lower === "selected" || lower.includes("selected")) {
      setCelebratedJob(job);
      setShowCelebration(true);
    } else if (lower === "rejected") {
      setStageMessage({
        type: "error",
        title: "❌ Application Closed",
        description: `Your application status for ${job.title} has been closed/not shortlisted. Keep checking matching vacancies!`
      });
      setTimeout(() => {
        setStageMessage(prev => prev && prev.title?.includes("Closed") ? null : prev);
      }, 7050);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-4" id="profile-dashboard-layout">
      
      {/* Side bar Column: User Overview Summary Card */}
      <div className="lg:col-span-1 space-y-4 text-left">
        
        {/* Profile Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 to-indigo-650" />
          
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl font-extrabold text-indigo-600 shadow-inner mt-2 uppercase">
            {user.fullName.substring(0, 2)}
          </div>

          <h3 className="font-sans text-base font-extrabold text-slate-800 mt-3 tracking-tight">
            {user.fullName}
          </h3>
          <p className="font-sans text-[11px] text-slate-400 font-medium">{user.email}</p>

          <div className="mt-4 inline-flex items-center gap-1 rounded bg-indigo-50 border border-indigo-100 px-2 py-0.5 font-mono text-[9px] font-bold text-indigo-700 uppercase tracking-wide">
            Category Code: {user.category}
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4 space-y-2 text-left text-xs text-slate-600">
            <div className="flex justify-between font-sans">
              <span className="text-slate-400 font-medium">Verified Age:</span>
              <strong className="text-slate-700">{user.age} Years</strong>
            </div>
            <div className="flex justify-between font-sans">
              <span className="text-slate-400 font-medium">Education:</span>
              <strong className="text-slate-700">{user.qualification}</strong>
            </div>
            <div className="flex justify-between font-sans">
              <span className="text-slate-400 font-medium">Domain:</span>
              <strong className="text-slate-700 truncate max-w-[120px]">{user.stream}</strong>
            </div>
            <div className="flex justify-between font-sans">
              <span className="text-slate-400 font-medium">Total Exp:</span>
              <strong className="text-slate-700">{user.experienceYears} Years</strong>
            </div>
          </div>
        </div>

        {/* Dynamic Nav Sub Tabs selection */}
        <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto p-1 bg-slate-50 rounded-xl lg:bg-transparent lg:p-0">
          <button
            onClick={() => setActiveSubTab("details")}
            id="subtab-details"
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold leading-none cursor-pointer transition-all flex-1 lg:flex-none text-left ${
              activeSubTab === "details"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100/70"
            }`}
          >
            <Settings className="h-4 w-4 shrink-0" />
            <span>Profile Configuration</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab("applications")}
            id="subtab-applications"
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold leading-none cursor-pointer transition-all flex-1 lg:flex-none justify-between ${
              activeSubTab === "applications"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100/70"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Job Trackers</span>
            </div>
            <span className={`h-4.5 min-w-[18px] text-[10px] font-bold rounded-full flex items-center justify-center font-mono ${activeSubTab === "applications" ? "bg-white text-indigo-600" : "bg-slate-100 text-slate-500"}`}>
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab("bookmarks")}
            id="subtab-bookmarks"
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold leading-none cursor-pointer transition-all flex-1 lg:flex-none justify-between ${
              activeSubTab === "bookmarks"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100/70"
            }`}
          >
            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 shrink-0" />
              <span>Job Alert Bookmarks</span>
            </div>
            <span className={`h-4.5 min-w-[18px] text-[10px] font-bold rounded-full flex items-center justify-center font-mono ${activeSubTab === "bookmarks" ? "bg-white text-indigo-600" : "bg-slate-100 text-slate-500"}`}>
              {bookmarkedJobs.length}
            </span>
          </button>
        </div>

      </div>

      {/* Main Content Column Panels */}
      <div className="lg:col-span-3 text-left bg-white rounded-2xl border border-slate-100 p-5 shadow-xs min-h-[400px]">
        
        {/* SUBTAB 1: DETAILS */}
        {activeSubTab === "details" && (
          <div id="panel-profile-details">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5">
              <div>
                <h3 className="font-sans text-base font-extrabold text-slate-800 tracking-tight flex items-center gap-1.5">
                  <User className="h-5 w-5 text-indigo-600" />
                  General & Qualification Configuration
                </h3>
                <p className="font-sans text-xs text-slate-400 mt-1 font-medium">
                  We use these precise statistics to calculate your eligibility and show matching reservation relaxations.
                </p>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  id="btn-edit-profile"
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Configure Settings</span>
                </button>
              )}
            </div>

            {/* Editing Form View */}
            {isEditing ? (
              <form onSubmit={handleProfileSave} className="space-y-5" id="form-profile-edit">
                <div className="grid gap-4 sm:grid-cols-2">
                  
                  {/* Name field */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-slate-500 uppercase mb-1.5">
                      Full Candidate Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-sans font-semibold outline-none focus:border-indigo-500 bg-slate-50/50"
                    />
                  </div>

                  {/* DOB field */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-slate-500 uppercase mb-1.5">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={handleDobChange}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-mono font-semibold outline-none focus:border-indigo-500 bg-slate-50/50"
                    />
                  </div>

                  {/* Academic Level */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-slate-500 uppercase mb-1.5">
                      Highest Academic Certification
                    </label>
                    <select
                      value={qualification}
                      onChange={(e: any) => setQualification(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-sans font-semibold outline-none focus:border-indigo-500 bg-slate-50/50"
                    >
                      <option value="10th Pass">10th Pass (High School)</option>
                      <option value="12th Pass">12th Pass (Senior Secondary)</option>
                      <option value="Graduate">Graduate (B.A., B.Sc., B.Com)</option>
                      <option value="B.Tech/B.E.">B.Tech / B.E. (Bachelor of Engineering)</option>
                      <option value="Post Graduate">Post Graduate (M.A., M.Sc., MBA)</option>
                      <option value="PhD">PhD Doctorates</option>
                    </select>
                  </div>

                  {/* Stream Selection */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-slate-500 uppercase mb-1.5">
                      Stream / Field of Study
                    </label>
                    <select
                      value={stream}
                      onChange={(e) => setStream(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-sans font-semibold outline-none focus:border-indigo-500 bg-slate-50/50"
                    >
                      <option value="Any Field">Any Field / General Discipline</option>
                      <option value="Computer Science">Computer Science & IT Systems</option>
                      <option value="Mechanical/Civil/Electrical">Engineering (Core Branches)</option>
                      <option value="Science (General)">Science & Physical Research</option>
                      <option value="Commerce">Commerce & Accounting</option>
                      <option value="Humanities/Arts">Humanities, Arts & Languages</option>
                      <option value="Law">Law & Legal Jurisprudence</option>
                    </select>
                  </div>

                  {/* Quota Category code */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-slate-500 uppercase mb-1.5">
                      Social Quota Category
                    </label>
                    <select
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-sans font-semibold outline-none focus:border-indigo-500 bg-slate-50/50"
                    >
                      <option value="General">General Quota (Unreserved / UR)</option>
                      <option value="OBC">Other Backward Classes (OBC - Non Creamy)</option>
                      <option value="SC">Scheduled Castes (SC)</option>
                      <option value="ST">Scheduled Tribes (ST)</option>
                      <option value="EWS">Economically Weaker Section (EWS)</option>
                      <option value="PwD">Persons with Benchmark Disabilities (PwD)</option>
                    </select>
                    {reservationRelaxation > 0 && (
                      <span className="block text-[10px] text-indigo-600 font-extrabold mt-1">
                        🌟 Valid OBC/SC/ST/PwD certificate permits up to +{reservationRelaxation} Years max age limit extension dynamically!
                      </span>
                    )}
                  </div>

                  {/* Experience in years */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-slate-500 uppercase mb-1.5">
                      Post-Academic Work Experience (Years)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-mono font-semibold outline-none focus:border-indigo-500 bg-slate-50/50"
                    />
                  </div>

                  {/* Preferred Location */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-slate-500 uppercase mb-1.5">
                      Preferred State Region
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. New Delhi, Maharashtra"
                      value={statePreference}
                      onChange={(e) => setStatePreference(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-sans font-semibold outline-none focus:border-indigo-500 bg-slate-50/50"
                    />
                  </div>

                  {/* Preferred Roles */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-slate-500 uppercase mb-1.5">
                      Key Roles comma-separated list
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Software, Accountant, Officer"
                      value={roleInput}
                      onChange={(e) => setRoleInput(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-sans font-semibold outline-none focus:border-indigo-500 bg-slate-50/50"
                    />
                  </div>

                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="btn-save-profile-confirm"
                    className="rounded-xl bg-indigo-600 hover:bg-indigo-750 px-5 py-2.5 text-xs font-bold text-white border border-indigo-700"
                  >
                    Commit & Synchronize Profile
                  </button>
                </div>
              </form>
            ) : (
              /* Non editing static representation grid */
              <div className="space-y-6">
                
                {/* Visual representation of Reservation Quota age relaxation */}
                <div className="bg-indigo-50/50 border border-indigo-100/60 rounded-xl p-4 flex items-start gap-3">
                  <ShieldCheck className="h-6 w-6 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-xs font-bold text-indigo-900 leading-tight">
                      Social Quota Benefit Diagnostics (Status: ACTIVE)
                    </h4>
                    <p className="font-sans text-xs text-slate-600 mt-1 leading-normal font-medium">
                      Your registered category is <strong className="text-indigo-700">{user.category}</strong>. Under Central Civil Services recruitment norms, you receive a dynamic age limit extension of <strong className="text-amber-600">+{reservationRelaxation} years</strong>. For example, for any job with a general age limit of 30, your customized limit is automatically elevated to <strong className="text-zinc-700 font-bold">{30 + reservationRelaxation}</strong>!
                    </p>
                  </div>
                </div>

                {/* Grid detailing profile */}
                <div className="grid gap-6 sm:grid-cols-2">
                  
                  {/* Qualification Card */}
                  <div className="p-4 rounded-xl border border-slate-100 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
                      Academic Background
                    </span>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-indigo-500" />
                      <strong className="text-slate-700 font-sans text-sm">{user.qualification}</strong>
                    </div>
                    <span className="text-[11px] block text-slate-500 font-medium font-sans">
                      Specialisation domain stream: <strong className="text-slate-600">{user.stream}</strong>
                    </span>
                  </div>

                  {/* Experience Card */}
                  <div className="p-4 rounded-xl border border-slate-100 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
                      Post-Academic Work
                    </span>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-indigo-500" />
                      <strong className="text-slate-700 font-sans text-sm">{user.experienceYears} Years Experience</strong>
                    </div>
                    <span className="text-[11px] block text-slate-500 font-medium font-sans">
                      Preferred States for postings: <strong className="text-slate-600">{user.statePreference}</strong>
                    </span>
                  </div>

                </div>

                {/* Sub row Preferred Roles tags representation */}
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400">
                    Your Monitored Role Alert Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.preferredRoles.map((role, idx) => (
                      <span key={idx} className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 font-sans">
                        🔍 {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick note on SSO verification */}
                <div className="text-[10px] font-mono text-slate-400 font-medium leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                  ⚡ All credentials logged here have been simulated against the national single sign-on (DigiLocker) sandbox. Standard forms automatically extract and verify these declarations upon clicking 'Apply Now'.
                </div>

              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: APPLICATIONS STATUS TRACKER */}
        {activeSubTab === "applications" && (
          <div id="panel-profile-applications">
            <div className="border-b border-slate-100 pb-3 mb-5">
              <h3 className="font-sans text-base font-extrabold text-slate-800 tracking-tight flex items-center gap-1.5">
                <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                Submitted Application Status Trackers
              </h3>
              <p className="font-sans text-xs text-slate-400 mt-1 font-medium">
                Review your real-time stage progress, scheduled written exams, and hall ticket dispatches.
              </p>
            </div>

            {showAppUndoToast && recentlyDeletedApp && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 bg-indigo-600 text-white px-4 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold shadow-md border border-indigo-700 font-sans"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Tracker removed. Revert this action? (expires in 5s)</span>
                </div>
                <button 
                  onClick={handleAppUndo}
                  className="bg-white text-indigo-650 px-2.5 py-1 rounded-lg font-bold hover:bg-slate-50 transition-colors cursor-pointer text-[10px]"
                >
                  Undo
                </button>
              </motion.div>
            )}

            {applications.length === 0 ? (
              <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <Briefcase className="h-10 w-10 text-slate-350 mx-auto opacity-60" />
                <h4 className="font-sans text-sm font-bold text-slate-700 mt-3">No Active Applications Found</h4>
                <p className="font-sans text-xs text-slate-400 max-w-sm mx-auto mt-1 font-medium">
                  Go to the <strong>Jobs tab</strong>, verify your criteria compatibility and click "Apply Now" to launch your fast-track submission.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {applications.map((app) => {
                  const job = jobs.find((j) => j.id === app.jobId);
                  if (!job) return null;

                  const steps = getStatusStepsForJob(job);
                  const { bg, text, icon, progress } = getStatusColorAndLabels(app.status, steps);

                  return (
                    <div 
                      key={app.jobId} 
                      className="rounded-xl border border-slate-100 bg-white p-4 space-y-4 shadow-xs"
                      id={`app-tracker-card-${app.jobId}`}
                    >
                      {/* Job Header */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-50 pb-3">
                        <div className="text-left">
                          <span className="font-mono text-[9px] font-bold text-slate-400 block uppercase">
                            Agency Code: {job.notificationId}
                          </span>
                          <h4 className="font-sans text-sm font-bold text-slate-800 line-clamp-1">
                            {job.title}
                          </h4>
                          <span className="font-sans text-xs font-semibold text-slate-500">
                            {job.agency}
                          </span>
                        </div>

                        {/* Custom Dropdown replacement with animated and matched typography */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 shrink-0">
                          <label className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0 text-left">
                            Update Stage:
                          </label>
                          <CustomDropdown
                            id={`status-dropdown-${app.jobId}`}
                            value={app.status}
                            onChange={(val) => handleStatusSelect(app.jobId, val)}
                            options={steps.map(step => ({ value: step, label: step }))}
                            className="w-full sm:w-60"
                          />
                        </div>
                      </div>

                      {/* Info & Applied Date */}
                      <div className="grid gap-3 sm:grid-cols-3 text-xs text-slate-600 font-sans">
                        <div>
                          <span className="text-slate-400 block">Applied On:</span>
                          <strong className="text-slate-700">{new Date(app.appliedDate).toLocaleDateString("en-IN", {day: "numeric", month: "long", year: "numeric"})}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Exam Date Scheduled:</span>
                          <strong className="text-slate-700">
                            {job.examDate ? new Date(job.examDate).toLocaleDateString("en-IN", {day: "numeric", month: "short", year: "numeric"}) : "To Be Decided (TBD)"}
                          </strong>
                        </div>
                        <div className="flex items-center gap-1.5 pt-1 sm:pt-0">
                          <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold border ${bg}`}>
                            {icon}
                            <span>{text}</span>
                          </span>
                        </div>
                      </div>

                      {/* Interactive Progress Connector Line */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <span>Progress: {progress}% Complete</span>
                          {app.status === "Selected" && <span className="text-emerald-600 font-extrabold">CONGRATULATIONS! ALLOCATION DELIVERED</span>}
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{ 
                              width: `${progress}%`,
                              backgroundColor: app.status.toLowerCase() === "selected" ? "#10b981" : (app.status.toLowerCase() === "rejected" || app.status.toLowerCase().includes("not qualified")) ? "#ef4444" : "#4f46e5"
                            }}
                          />
                        </div>

                        {/* Interactive Steps Circles */}
                        <div className="hidden sm:flex justify-between text-[9px] font-bold text-slate-400 font-sans pt-1">
                          <span className={progress >= 10 ? "text-indigo-600 font-semibold" : ""}>1. Visited</span>
                          <span className={progress >= 25 ? "text-indigo-600 font-semibold" : ""}>2. Registered</span>
                          <span className={progress >= 50 ? "text-indigo-600 font-semibold" : ""}>3. Fees Paid</span>
                          <span className={progress >= 70 ? "text-indigo-600 font-semibold" : ""}>4. Exam Level</span>
                          <span className={
                            app.status.toLowerCase() === "selected" 
                              ? "text-emerald-600 font-extrabold" 
                              : (app.status.toLowerCase().includes("not qualified") || app.status.toLowerCase() === "rejected")
                              ? "text-rose-600 font-extrabold"
                              : ""
                          }>5. Allocation</span>
                        </div>
                      </div>

                      {/* Notes Section if any */}
                      {app.notes && (
                        <div className="rounded-lg bg-slate-50 p-2.5 text-xs text-slate-500 text-left">
                          <strong className="text-slate-700 block">Candidate Reference Notes:</strong>
                          <span className="block mt-0.5 font-normal italic">"{app.notes}"</span>
                        </div>
                      )}

                      {/* Clear tracker option with verification step */}
                      <div className="pt-3 border-t border-slate-100 flex flex-wrap justify-between items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-medium">Auto-synced with single sign on</span>
                        {confirmingDeleteAppId === app.jobId ? (
                          <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 px-2 py-1 rounded-lg border border-rose-200/50">
                            <span className="text-[10px] font-bold">Remove this track?</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveAppConfirm(app.jobId)}
                              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-[9px] px-2 py-0.5 rounded cursor-pointer"
                            >
                              Yes, Clear
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmingDeleteAppId(null)}
                              className="bg-slate-100 dark:bg-slate-800 text-slate-655 dark:text-slate-300 font-bold text-[9px] px-2 py-0.5 rounded cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleRemoveAppRequest(app.jobId)}
                            className="text-[10px] text-rose-500 hover:text-rose-700 font-bold cursor-pointer hover:underline"
                          >
                            ✕ Remove Tracker
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 3: SAVED ALERTS / BOOKMARKS */}
        {activeSubTab === "bookmarks" && (
          <div id="panel-profile-bookmarks">
            <div className="border-b border-slate-100 pb-3 mb-5">
              <h3 className="font-sans text-base font-extrabold text-slate-800 tracking-tight flex items-center gap-1.5">
                <Bookmark className="h-5 w-5 text-indigo-600" />
                My Monitored Job Alerts
              </h3>
              <p className="font-sans text-xs text-slate-400 mt-1 font-medium">
                Keep track of closing deadlines and access rapid diagnostic testing for these specific alerts.
              </p>
            </div>

            {showBookmarkUndoToast && recentlyDeletedBookmarkId && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 bg-indigo-600 text-white px-4 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold shadow-md border border-indigo-700 font-sans"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Alert removed. Undo option expires in 5 seconds...</span>
                </div>
                <button 
                  onClick={handleBookmarkUndo}
                  className="bg-white text-indigo-650 px-2.5 py-1 rounded-lg font-bold hover:bg-slate-50 transition-colors cursor-pointer text-[10px]"
                >
                  Undo
                </button>
              </motion.div>
            )}

            {bookmarkedJobs.length === 0 ? (
              <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <Bookmark className="h-10 w-10 text-slate-350 mx-auto opacity-60" />
                <h4 className="font-sans text-sm font-bold text-slate-700 mt-3">No Saved Alerts Found</h4>
                <p className="font-sans text-xs text-slate-400 max-w-sm mx-auto mt-1 font-medium">
                  Select bookmark ribbons on job listings to append them here. We will prompt email alerts 3 days prior to expiration.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {bookmarkedJobs.map((job) => {
                  const { eligible } = verifyJobEligibility(job, user);
                  
                  // Calculate days left
                  const closingDateObj = new Date(job.closingDate);
                  const todayObj = new Date("2026-06-10");
                  const timeDiff = closingDateObj.getTime() - todayObj.getTime();
                  const dLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

                  return (
                    <div 
                      key={job.id} 
                      className="rounded-xl border border-slate-150 bg-white p-4 space-y-3 shadow-xs relative text-left"
                      id={`bookmark-mini-card-${job.id}`}
                    >
                      <div>
                        <span className="font-mono text-[9px] font-bold text-indigo-600 uppercase">
                          {job.category} Sector • Gazette {job.notificationId}
                        </span>
                        <h4 className="font-sans text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">
                          {job.title}
                        </h4>
                        <span className="font-sans text-[11px] text-slate-500 block">
                          {job.agency}
                        </span>
                      </div>

                      <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-xs font-sans">
                        <div>
                          <span className="text-slate-400 block text-[9px]">Days Till Close:</span>
                          <strong className={dLeft <= 5 ? "text-rose-600" : "text-slate-700"}>{dLeft} Days</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px]">Salary Match:</span>
                          <strong className="text-indigo-600">₹{Math.floor(job.salaryMin / 1000)}k/mo</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px]">Diagnosis:</span>
                          {eligible ? (
                            <strong className="text-emerald-600">Qualified</strong>
                          ) : (
                            <strong className="text-rose-600">Failed</strong>
                          )}
                        </div>
                      </div>

                      {/* Remove Bookmark trigger and deep-link details */}
                      <div className="flex justify-between items-center pt-1 border-t border-slate-50">
                        {confirmingDeleteBookmarkId === job.id ? (
                          <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 p-1 rounded-lg border border-rose-200/40">
                            <span className="text-[9px] font-bold">Delete?</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveBookmarkConfirm(job.id)}
                              className="bg-rose-600 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded cursor-pointer"
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmingDeleteBookmarkId(null)}
                              className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-[8px] px-1.5 py-0.5 rounded cursor-pointer"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmingDeleteBookmarkId(job.id)}
                            className="text-[10px] text-rose-500 hover:text-rose-700 font-extrabold cursor-pointer hover:underline"
                          >
                            ✕ Remove Alert
                          </button>
                        )}
                        
                        <span className="text-[10px] text-slate-450 font-mono font-medium">
                          Deadline: {job.closingDate}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* --- Pop out stage messages (toasts) --- */}
      <AnimatePresence>
        {stageMessage && (
          <div className="fixed bottom-6 right-6 left-6 sm:left-auto sm:w-[420px] z-50">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className={`rounded-2xl p-4 shadow-xl border flex gap-3 text-left ${
                stageMessage.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                  : stageMessage.type === "error"
                  ? "bg-rose-50 border-rose-200 text-rose-950"
                  : "bg-slate-50 border-slate-200 text-slate-900"
              }`}
            >
              <div className="text-xl shrink-0">
                {stageMessage.type === "success" ? "🏆" : "🎯"}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-sans text-xs font-extrabold uppercase tracking-widest text-[10px]">
                  {stageMessage.title}
                </h4>
                <p className="font-sans text-xs font-semibold mt-1 opacity-90 leading-relaxed">
                  {stageMessage.description}
                </p>
              </div>
              <button
                onClick={() => setStageMessage(null)}
                className="text-xs font-bold self-start opacity-60 hover:opacity-100 p-1"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Selected / Allocation Celebration Overlay Modal --- */}
      <AnimatePresence>
        {showCelebration && celebratedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
            <CelebrationParticles />
            
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl relative border border-emerald-100 text-center animate-duration-300"
              id="celebration-modal-box"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-4xl mb-5 shadow-inner animate-bounce text-emerald-600">
                🇮🇳
              </div>

              <h2 className="font-sans text-2xl font-extrabold text-emerald-600 tracking-tight leading-tight">
                CONGRATULATIONS!
              </h2>
              <p className="font-sans text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">
                Official Selection Allocation Delivered
              </p>

              <div className="bg-emerald-50/50 rounded-2xl p-4 my-6 text-left border border-emerald-100 max-w-md mx-auto">
                <span className="block font-mono text-[9px] font-bold text-emerald-600 uppercase tracking-wider">
                  Post of Appointment:
                </span>
                <span className="block font-sans text-base font-extrabold text-slate-800 mt-1 leading-tight">
                  {celebratedJob.title}
                </span>
                <span className="block font-sans text-xs font-semibold text-slate-500 mt-0.5">
                  Agency Code: {celebratedJob.agency}
                </span>
                <div className="mt-3 text-xs text-slate-600 font-medium font-sans border-t border-emerald-100/60 pt-2.5">
                  🏛️ Under Gazette Notice <strong className="text-zinc-800">{celebratedJob.notificationId}</strong>, you have successfully qualified in all recruitment evaluation checkpoints. Your allocation is confirmed.
                </div>
              </div>

              <p className="text-[11px] text-slate-500 font-medium max-w-sm mx-auto mb-6 leading-relaxed">
                Your credentials have been successfully updated in the centrally managed database, and official call letters are available on your registered email.
              </p>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowCelebration(false);
                  setCelebratedJob(null);
                }}
                className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-750 px-6 py-3.5 text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-emerald-100"
              >
                Thank You! Close Box
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
