import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MOCK_JOBS, MOCK_NOTIFICATIONS, INITIAL_USER_PROFILE, 
  verifyJobEligibility, calculateJobRecommendationScore, getAgeRelaxation,
  QUAL_RANKING, isIndustryEligible, getExperienceYearsForIndustry
} from "./data";
import { Job, UserProfile, JobApplication } from "./types";
import Navbar from "./components/layout/Navbar";
import FilterPanel from "./components/jobs/FilterPanel";
import JobCard from "./components/jobs/JobCard";
import NotificationSection from "./components/notifications/NotificationSection";
import ProfileTab from "./components/profile/ProfileTab";
import ExamGuideTab from "./components/guide/ExamGuideTab";
import AmbientGlow from "./components/effects/AmbientGlow";
import HeroSection from "./components/home/HeroSection";
import ValueBentoGrid from "./components/home/ValueBentoGrid";
import { 
  Building2, MapPin, Landmark, Search, ShieldCheck, 
  Sparkles, Award, ArrowRight, CheckCircle2, Bookmark, CheckSquare, Zap, Clock, TrendingUp
} from "lucide-react";

export default function App() {
  // --- Dark Mode State with Automatic HTML Ingress Override ---
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("sarkarg_dark_mode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("sarkarg_dark_mode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // --- Lazy State Initialization (Prevents hydration/infinite loops) ---
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("govjobs_user_profile_v2");
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem("govjobs_bookmarks_v2");
    return saved ? JSON.parse(saved) : ["job-3"]; // default bookmark
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem("govjobs_applications_v2");
    return saved ? JSON.parse(saved) : [
      { jobId: "job-1", status: "Application in Progress", appliedDate: "2026-06-05", notes: "UPSC pre-test center selected at New Delhi." }
    ];
  });

  // --- Views Navigation ---
  // "home" | "jobs" | "profile" | "guide"
  const [currentView, setView] = useState<"home" | "jobs" | "profile" | "guide">("home");
  
  // Under "jobs" view: "browse" | "recommendations" | "active_listings"
  const [jobsSubTab, setJobsSubTab] = useState<"browse" | "recommendations" | "active_listings">("browse");
  const [activeListingsSearchTerm, setActiveListingsSearchTerm] = useState("");

  // --- Filter states ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedQual, setSelectedQual] = useState("All");
  const [minMonthlySalary, setMinMonthlySalary] = useState(15000);
  const [showEligibleOnly, setShowEligibleOnly] = useState(false);
  const [maxExperience, setMaxExperience] = useState<string>("All");
  const [sortBy, setSortBy] = useState("closingSoon");

  // --- Home Quick Search Banner ---
  const [homeSearchInput, setHomeSearchInput] = useState("");

  // --- Save states back to LocalStorage ---
  useEffect(() => {
    localStorage.setItem("govjobs_user_profile_v2", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("govjobs_bookmarks_v2", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("govjobs_applications_v2", JSON.stringify(applications));
  }, [applications]);

  // --- Generate helper lists ---
  const locationsList = Array.from(new Set(MOCK_JOBS.map((j) => {
    if (j.location.includes("All India") || j.location.includes("Nationwide")) return "";
    return j.location.split(",")[0].trim();
  }))).filter(Boolean);

  // --- Search trigger from Landing Page ---
  const handleHomeSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(homeSearchInput);
    setJobsSubTab("browse");
    setView("jobs");
  };

  // --- Category Card Clicks from Landing Page ---
  const handleCategoryCardClick = (category: string) => {
    setSelectedCategory(category);
    setJobsSubTab("browse");
    setView("jobs");
  };

  // --- Toggle bookmark state ---
  const handleToggleBookmark = (jobId: string) => {
    if (bookmarks.includes(jobId)) {
      setBookmarks(bookmarks.filter((id) => id !== jobId));
    } else {
      setBookmarks([...bookmarks, jobId]);
    }
  };

  // --- Apply Now Submit state ---
  const handleApplyJob = (jobId: string, notes?: string) => {
    const freshApp: JobApplication = {
      jobId,
      status: "Visited",
      appliedDate: new Date().toISOString().split("T")[0],
      notes
    };
    setApplications([...applications, freshApp]);
  };

  // --- Edit/Update App status in profile ---
  const handleUpdateAppStatus = (jobId: string, status: JobApplication["status"]) => {
    setApplications(
      applications.map((app) => (app.jobId === jobId ? { ...app, status } : app))
    );
  };

  // --- Filter and Sort Engine ---
  const filteredJobs = MOCK_JOBS.filter((job) => {
    // 1. Text Search matching title, agency, notification id
    const input = searchTerm.toLowerCase().trim();
    const textMatch = 
      job.title.toLowerCase().includes(input) ||
      job.agency.toLowerCase().includes(input) ||
      job.notificationId.toLowerCase().includes(input);

    if (input && !textMatch) return false;

    // 2. Region / Location filter
    if (selectedLocation !== "All") {
      const isAllIndia = job.location.toLowerCase().includes("all india") || job.location.toLowerCase().includes("nationwide");
      const isSpecLocation = job.location.toLowerCase().includes(selectedLocation.toLowerCase());
      if (!isSpecLocation && !isAllIndia) return false;
    }

    // 3. Organization Sector Category
    if (selectedCategory !== "All" && job.category !== selectedCategory) return false;

    // 4. Minimum academic qualification (Only filters completely out of list if Match Strict Eligibility Only is active)
    if (showEligibleOnly && selectedQual !== "All") {
      // Show jobs matching selected qualification or below (ranking-based, e.g. Graduate can apply for 12th/10th Pass)
      const selectedRank = QUAL_RANKING[selectedQual as keyof typeof QUAL_RANKING] || 0;
      const jobRank = QUAL_RANKING[job.minQualification as keyof typeof QUAL_RANKING] || 0;
      if (selectedRank < jobRank) return false;
    }

    // 5. Min Monthly Salary
    if (job.salaryMin !== undefined && job.salaryMin < minMonthlySalary) return false;

    // Candidate Profile Eligibility Conditions (only active if showEligibleOnly is true)
    if (showEligibleOnly) {
      const activeProfiler = selectedQual !== "All" ? { ...user, qualification: selectedQual } : user;

      // 5b. Academic Stream / Specialization Relevance filter
      if (activeProfiler.stream !== "Any Field") {
        const mainMatched = job.stream.some(s => {
          if (s === "Any Field" || s === "Any Graduate") return true;
          if (s === "Computer Science" && activeProfiler.stream === "Computer Science") return true;
          if (s === "Mechanical/Civil/Electrical" && activeProfiler.stream === "Mechanical/Civil/Electrical") return true;
          if (s === "Science (General)" && (activeProfiler.stream === "Science (General)" || activeProfiler.stream === "Computer Science")) return true;
          if (s === "Commerce" && activeProfiler.stream === "Commerce") return true;
          if (s === "Humanities/Arts" && activeProfiler.stream === "Humanities/Arts") return true;
          if (s === "Law" && activeProfiler.stream === "Law") return true;
          if (s === "Agriculture" && activeProfiler.stream === "Agriculture") return true;
          return false;
        });

        const subMatched = job.subPosts?.some(sp => {
          return sp.stream.some(s => {
            if (s === "Any Field" || s === "Any Graduate") return true;
            if (s === "Computer Science" && activeProfiler.stream === "Computer Science") return true;
            if (s === "Mechanical/Civil/Electrical" && activeProfiler.stream === "Mechanical/Civil/Electrical") return true;
            if (s === "Science (General)" && (activeProfiler.stream === "Science (General)" || activeProfiler.stream === "Computer Science")) return true;
            if (s === "Commerce" && activeProfiler.stream === "Commerce") return true;
            if (s === "Humanities/Arts" && activeProfiler.stream === "Humanities/Arts") return true;
            if (s === "Law" && activeProfiler.stream === "Law") return true;
            if (s === "Agriculture" && activeProfiler.stream === "Agriculture") return true;
            return false;
          });
        });

        if (!mainMatched && !subMatched) return false;
      }

      // 5c. Candidate Experience Filter
      // "the experience limit should mean experience of the candidate."
      // "show all jobs if there is no experience required"
      if (job.experienceRequired && job.experienceRequired > 0) {
        const relevanceExp = getExperienceYearsForIndustry(job.experienceIndustry, activeProfiler);
        if (relevanceExp < job.experienceRequired) return false;
      }
      
      // Check experience for sub-posts if any
      if (job.subPosts && job.subPosts.length > 0) {
        const hasExpRequiredSubPost = job.subPosts.some(sp => sp.experienceRequired && sp.experienceRequired > 0);
        if (hasExpRequiredSubPost) {
          const matchesAnySubPostExp = job.subPosts.some(sp => {
            const required = sp.experienceRequired || 0;
            if (required === 0) return true; // No experience required for this subpost
            const candExp = getExperienceYearsForIndustry(sp.experienceIndustry, activeProfiler);
            return candExp >= required;
          });
          if (!matchesAnySubPostExp) return false;
        }
      }

      // 5d. Languages Known Filter
      // "give the option to add the languages. which will filter the jobs out if they have any specific requirement. show all jobs if there is no languages required."
      if (job.languagesRequired && job.languagesRequired.length > 0) {
        const userLangs = activeProfiler.languagesKnown || [];
        const hasRequiredLanguage = job.languagesRequired.some(jl => 
          userLangs.some(ul => ul.toLowerCase().trim() === jl.toLowerCase().trim())
        );
        if (!hasRequiredLanguage) return false;
      }
      // Check languages required in any sub-posts
      if (job.subPosts && job.subPosts.length > 0) {
        const hasLangRequiredSubPost = job.subPosts.some(sp => sp.languagesRequired && sp.languagesRequired.length > 0);
        if (hasLangRequiredSubPost) {
          const matchesAnySubPostLang = job.subPosts.some(sp => {
            const reqs = sp.languagesRequired || [];
            if (reqs.length === 0) return true; // No language required
            const userLangs = activeProfiler.languagesKnown || [];
            return reqs.some(jl => 
              userLangs.some(ul => ul.toLowerCase().trim() === jl.toLowerCase().trim())
            );
          });
          if (!matchesAnySubPostLang) return false;
        }
      }

      // 5e. Typing Speed Filter
      if (job.typingRequired && job.typingSpeedRequired) {
        const candSpeed = activeProfiler.typingSpeed || 0;
        if (candSpeed < job.typingSpeedRequired) return false;
      }
      if (job.subPosts && job.subPosts.length > 0) {
        const hasTypingRequiredSubPost = job.subPosts.some(sp => sp.typingRequired && sp.typingSpeedRequired);
        if (hasTypingRequiredSubPost) {
          const matchesAnySubPostTyping = job.subPosts.some(sp => {
            const reqSpeed = sp.typingSpeedRequired || 0;
            if (!sp.typingRequired || reqSpeed === 0) return true;
            const candSpeed = activeProfiler.typingSpeed || 0;
            return candSpeed >= reqSpeed;
          });
          if (!matchesAnySubPostTyping) return false;
        }
      }

      // 6. Strict Profile Eligibility Toggle (matches academic background, age, reservation relaxations, stream, and field of study!)
      const { eligible } = verifyJobEligibility(job, activeProfiler, false); // Do not ignore experience!
      if (!eligible) return false;
    }

    return true;
  });

  // --- Apply Sorting ---
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "closingSoon") {
      return new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime();
    }
    if (sortBy === "salaryHigh") {
      return (b.salaryMin ?? 0) - (a.salaryMin ?? 0);
    }
    if (sortBy === "vacanciesHigh") {
      return b.totalVacancies - a.totalVacancies;
    }
    if (sortBy === "postedNewest") {
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    }
    return 0;
  });

  // --- Personalized Recommendations Generator ---
  // Filters for jobs showing recommended compatibility score >= 40 for this specific user
  const recommendedJobs = MOCK_JOBS.map((job) => {
    return {
      job,
      score: calculateJobRecommendationScore(job, user)
    };
  }).sort((a, b) => b.score - a.score); // Highest scores first!

  // --- Active Listings (Search-Only without other filters) ---
  const filteredActiveListingsJobs = MOCK_JOBS.filter((job) => {
    const input = activeListingsSearchTerm.toLowerCase().trim();
    if (!input) return true;
    return (
      job.title.toLowerCase().includes(input) ||
      job.agency.toLowerCase().includes(input) ||
      job.notificationId.toLowerCase().includes(input) ||
      (job.description && job.description.toLowerCase().includes(input))
    );
  });

  // --- Reset All Filters ---
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedLocation("All");
    setSelectedCategory("All");
    setSelectedQual("All");
    setMinMonthlySalary(15000);
    setShowEligibleOnly(false);
    setMaxExperience("All");
    setSortBy("closingSoon");
  };

  // --- Deep Link from alert click ---
  const handleSelectJobFromAlert = (jobId: string) => {
    // Search directly for this job ID
    setSearchTerm(jobId);
    setJobsSubTab("browse");
    setView("jobs");
  };

  const bookmarkedObjects = MOCK_JOBS.filter((j) => bookmarks.includes(j.id));
  const activeAlertsCount = MOCK_NOTIFICATIONS.length;

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-[#080c14] font-sans text-slate-800 dark:text-slate-200 antialiased selection:bg-indigo-100 selection:text-indigo-800 transition-colors duration-300">
      
      {/* Dynamic Ambient Mouse Glow Field */}
      <AmbientGlow darkMode={darkMode} />

      {/* 1. Header Navigation */}
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        user={user} 
        notificationsCount={bookmarks.length} 
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* 2. Main Container with Entrance Animation */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          
          {/* ==================== VIEW A: HOME / LANDING PAGE ==================== */}
          {currentView === "home" && (
            <motion.div
              key="view-home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-10"
              id="view-home-container"
            >
              
              {/* Giant Elegant Hero welcome Section (Apple aesthetics) */}
              <HeroSection />

              {/* Bento Grid: 3-column value info block (Cred-like clean aesthetic) */}
              <ValueBentoGrid />

              {/* TWO COLUMN ROW: Featured listings (Left 2/3) & Bulletin notifications (Right 1/3) - Bulletproof Entrance Transitions! */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="grid gap-6 lg:grid-cols-3"
              >
                
                {/* Left COLUMN: Featured jobs */}
                <div className="lg:col-span-2 space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-1">
                    <h2 className="font-sans text-lg font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-indigo-600" />
                      Featured Recruitment Opportunities
                    </h2>
                    <motion.button
                      onClick={() => {
                        setJobsSubTab("browse");
                        setView("jobs");
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <span>Explore all {MOCK_JOBS.length} vacancies</span>
                      <span>→</span>
                    </motion.button>
                  </div>

                  <div className="space-y-4" id="home-featured-listings">
                    {MOCK_JOBS.filter((j) => j.featured).map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        user={user}
                        isBookmarked={bookmarks.includes(job.id)}
                        onToggleBookmark={() => handleToggleBookmark(job.id)}
                        isApplied={applications.some((app) => app.jobId === job.id)}
                        appliedStatus={applications.find((app) => app.jobId === job.id)?.status}
                        onApply={(notes) => handleApplyJob(job.id, notes)}
                        ignoreExperience={false}
                      />
                    ))}
                  </div>

                </div>

                {/* Right COLUMN: Notifications feed */}
                <div className="lg:col-span-1">
                  <NotificationSection 
                    notifications={MOCK_NOTIFICATIONS} 
                    onSelectJob={handleSelectJobFromAlert} 
                  />
                </div>

              </motion.div>

            </motion.div>
          )}

          {/* ==================== VIEW B: JOBS PORTAL BROWSE & RECOMMENDATIONS ==================== */}
          {currentView === "jobs" && (
            <motion.div
              key="view-jobs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              id="view-jobs-container"
            >
              
              {/* Header Title & Tab selectors (Centered and Enlarged) */}
              <div className="flex flex-col items-center border-b border-slate-100 pb-5 gap-3" id="jobs-header-row">

                {/* THREE tabs for active listings vs Personalized Recommendations */}
                <div className="inline-flex rounded-2xl bg-slate-100/80 p-1.5 shadow-xs flex-wrap md:flex-nowrap justify-center" id="jobs-sub-tabs">
                  <motion.button
                    onClick={() => setJobsSubTab("browse")}
                    id="btn-subtab-browse"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-xl px-6 py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer ${
                      jobsSubTab === "browse"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                    }`}
                  >
                    Filter Jobs
                  </motion.button>
                  
                  <motion.button
                    onClick={() => {
                      setJobsSubTab("recommendations");
                    }}
                    id="btn-subtab-recommendations"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative rounded-xl px-6 py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                      jobsSubTab === "recommendations"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                    }`}
                  >
                    <span>Personalized Matches</span>
                  </motion.button>

                  <motion.button
                    onClick={() => setJobsSubTab("active_listings")}
                    id="btn-subtab-active-listings"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-xl px-6 py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer ${
                      jobsSubTab === "active_listings"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                    }`}
                  >
                    Browse Active Listings ({MOCK_JOBS.length})
                  </motion.button>
                </div>

                {/* Guide Text for Tabs with human/literal labeling */}
                <p className="text-center font-sans text-xs text-slate-500 font-medium">
                  {jobsSubTab === "browse" && "🔍 Filter Jobs: Search and fine-tune opportunities matching specific regions, salary scales, required experience, and qualification fields."}
                  {jobsSubTab === "recommendations" && "🌟 Personalized Matches: View recommendations sorted automatically by scanning your custom profile qualifications and preferences."}
                  {jobsSubTab === "active_listings" && "📋 Browse Active Listings: List all recruitment circulars currently active on the site - use keyword search to highlight matching items."}
                </p>
              </div>

              {/* BROWSE ACTIVE LISTINGS SUBTAB */}
              {jobsSubTab === "browse" && (
                <div className="space-y-6" id="jobs-browse-layout">
                  {/* Realtime Filters Block */}
                  <FilterPanel
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedQual={selectedQual}
                    setSelectedQual={setSelectedQual}
                    minMonthlySalary={minMonthlySalary}
                    setMinMonthlySalary={setMinMonthlySalary}
                    showEligibleOnly={showEligibleOnly}
                    setShowEligibleOnly={setShowEligibleOnly}
                    maxExperience={maxExperience}
                    setMaxExperience={setMaxExperience}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    user={user}
                    resetAll={handleResetFilters}
                    locationsList={locationsList}
                    onUpdateUser={(updated) => setUser(prev => ({ ...prev, ...updated }))}
                  />

                  {/* Search Results Summary Row */}
                  <div className="flex items-center justify-between font-sans text-xs text-slate-450 font-bold uppercase tracking-wider px-2">
                    <span>
                      Returned {sortedJobs.length} of {MOCK_JOBS.length} Vacancies
                    </span>
                    
                    {showEligibleOnly && (
                      <span className="text-emerald-600 font-extrabold">
                        ✓ Strictly filter matching Category {user.category} Quota
                      </span>
                    )}
                  </div>

                  {/* Listings loop */}
                  {sortedJobs.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                      <Search className="h-10 w-10 text-slate-300 mx-auto opacity-70" />
                      <h4 className="font-sans text-sm font-bold text-slate-700 mt-4">
                        No Matching Vacancies Found
                      </h4>
                      <p className="font-sans text-xs text-slate-450 max-w-sm mx-auto mt-1 font-medium leading-relaxed">
                        Adjust your parameters (lower starting salary slider, toggle off "Match Strict Eligibility Only", or keyword clear checkups) to view active rosters.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="mt-4 rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-indigo-600 transition"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4" id="listings-grid">
                      <AnimatePresence>
                        {sortedJobs.map((job) => (
                          <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <JobCard
                              job={job}
                              user={selectedQual !== "All" ? { ...user, qualification: selectedQual } : user}
                              isBookmarked={bookmarks.includes(job.id)}
                              onToggleBookmark={() => handleToggleBookmark(job.id)}
                              isApplied={applications.some((app) => app.jobId === job.id)}
                              appliedStatus={applications.find((app) => app.jobId === job.id)?.status}
                              onApply={(notes) => handleApplyJob(job.id, notes)}
                              ignoreExperience={false}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}

                </div>
              )}

              {/* PERSONALIZED RECOMMENDATIONS SUBTAB */}
              {jobsSubTab === "recommendations" && (
                <div className="space-y-6" id="jobs-recommendations-layout">
                  
                  {/* Informational Profile Match Banner explaining logic */}
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 p-r text-left relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-indigo-100/10 to-transparent pointer-events-none" />
                    
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shrink-0 shadow-md shadow-indigo-100">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      
                      <div className="space-y-1.5 flex-1">
                        <h3 className="font-sans text-sm font-extrabold text-indigo-950">
                          Tailored Allocation Recommendations
                        </h3>
                        
                        <p className="font-sans text-xs text-slate-650 leading-relaxed font-semibold">
                          Our customized matcher has evaluated your logged qualifications (Academic: <strong className="text-indigo-650">{user.qualification} ({user.stream})</strong>, DOB: <strong className="text-indigo-650">{user.dob}</strong>, Quota: <strong className="text-indigo-650">{user.category}</strong> with age benefit <strong className="text-indigo-650">+{getAgeRelaxation(user.category)} years</strong>) to sort opportunities.
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="rounded-lg bg-white/80 border border-indigo-100/50 px-2.5 py-1 text-[10px] font-bold text-indigo-700">
                            🎯 Preferred Roles focus: {user.preferredRoles.join(", ")}
                          </span>
                          <span className="rounded-lg bg-white/80 border border-indigo-100/50 px-2.5 py-1 text-[10px] font-bold text-indigo-700">
                            📍 State circles: {user.statePreference}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setView("profile")}
                        className="rounded-xl border border-indigo-200 bg-white hover:bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700 cursor-pointer self-start sm:self-auto shrink-0 transition"
                      >
                        Adjust Profiler Settings
                      </button>
                    </div>
                  </div>

                  {/* Recommendation list loop */}
                  <div className="space-y-4" id="listings-recommendations-grid">
                    {recommendedJobs.map(({ job, score }) => {
                      const { eligible } = verifyJobEligibility(job, user);
                      
                      // Format score style
                      const scoreColorStyle = 
                        score >= 80 ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                        score >= 60 ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                        "bg-zinc-50 text-zinc-650 border-zinc-100";

                      return (
                        <div 
                          key={job.id} 
                          className={`relative rounded-2xl border block overflow-hidden p-1.5 ${
                            eligible ? "border-slate-100" : "border-rose-100 bg-rose-50/10 opacity-75"
                          }`}
                        >
                          {/* Scoring floating banner badge */}
                          <div className="absolute top-4 right-14 z-10 flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold tracking-tight uppercase shadow-xs bg-white">
                            <span className="font-sans text-slate-400">Match score:</span>
                            <span 
                              className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                                score >= 80 ? "bg-emerald-100 text-emerald-800" : "bg-indigo-100 text-indigo-800"
                              }`}
                            >
                              {score}%
                            </span>
                          </div>

                          <JobCard
                            job={job}
                            user={user}
                            isBookmarked={bookmarks.includes(job.id)}
                            onToggleBookmark={() => handleToggleBookmark(job.id)}
                            isApplied={applications.some((app) => app.jobId === job.id)}
                            appliedStatus={applications.find((app) => app.jobId === job.id)?.status}
                            onApply={(notes) => handleApplyJob(job.id, notes)}
                          />

                          {/* Extra match reasoning block at bottom */}
                          <div className="bg-slate-50/50 rounded-b-xl px-5 py-2 text-left border-t border-slate-100/40 text-[10px] sm:text-xs font-sans text-slate-500 font-medium leading-none">
                            💡 <strong className="text-slate-600">Why matched:</strong> {
                              !eligible ? "Ineligible status (Fail) overrides parameters" :
                              score >= 80 ? `Strong alignment in Computer Science stream, ${user.statePreference} locale and matches target roles!` :
                              `Eligible matching. Matches General recruitment standard. Update ${user.statePreference} state preferences to scale score higher.`
                            }
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {/* BROWSE ACTIVE LISTINGS SUBTAB (Without filters, with search bar) */}
              {jobsSubTab === "active_listings" && (
                <div className="space-y-6" id="jobs-active-listings-layout">
                  {/* Search Bar Block */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs text-left">
                    <div className="max-w-2xl">
                      <label className="block font-sans text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                        Search Active Listings
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={activeListingsSearchTerm}
                          onChange={(e) => setActiveListingsSearchTerm(e.target.value)}
                          placeholder="Search job titles, agencies, notification IDs, description keywords..."
                          className="w-full text-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 px-4 py-3 pl-11 text-sm font-sans font-semibold placeholder:text-slate-400 outline-none focus:border-indigo-550 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 transition-all font-semibold"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      </div>
                      <p className="mt-2 text-[11px] text-slate-400 font-medium font-sans">
                        Showing all {filteredActiveListingsJobs.length} active announcements in alphabetical order by department. No criteria-matching filters applied here.
                      </p>
                    </div>
                  </div>

                  {/* Listings Grid */}
                  {filteredActiveListingsJobs.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 text-center" id="listings-empty">
                      <Search className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                      <h3 className="font-sans text-sm font-bold text-slate-700 dark:text-slate-300">
                        No match for "{activeListingsSearchTerm}"
                      </h3>
                      <p className="font-sans text-xs text-slate-400 mt-1">
                        Try modifying your keyword search to discover matching notifications.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4" id="listings-active-grid">
                      <AnimatePresence>
                        {filteredActiveListingsJobs.map((job) => (
                          <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <JobCard
                              job={job}
                              user={user}
                              isBookmarked={bookmarks.includes(job.id)}
                              onToggleBookmark={() => handleToggleBookmark(job.id)}
                              isApplied={applications.some((app) => app.jobId === job.id)}
                              appliedStatus={applications.find((app) => app.jobId === job.id)?.status}
                              onApply={(notes) => handleApplyJob(job.id, notes)}
                              ignoreExperience={false}
                              hideEligibility={true}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              )}



            </motion.div>
          )}

          {/* ==================== VIEW C: PROFILE DASHBOARD VIEW ==================== */}
          {currentView === "profile" && (
            <motion.div
              key="view-profile"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              id="view-profile-container"
            >
              
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3 text-left">
                <h1 className="font-sans text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                  Profile Dashboard
                </h1>
              </div>

              {/* Multi Tab Profile component */}
              <ProfileTab
                user={user}
                onChangeUser={setUser}
                bookmarkedJobs={bookmarkedObjects}
                onToggleBookmark={handleToggleBookmark}
                applications={applications}
                jobs={MOCK_JOBS}
                onUpdateAppStatus={handleUpdateAppStatus}
                onChangeApplications={setApplications}
              />

            </motion.div>
          )}

          {/* ==================== VIEW D: INTERACTIVE EXAM ROADS GUIDE ==================== */}
          {currentView === "guide" && (
            <motion.div
              key="view-guide"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              id="view-guide-container"
            >
              <ExamGuideTab />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 3. Global Footer (minimalist & authentic) */}
      <footer className="bg-white dark:bg-[#0b0f19] border-t border-slate-100 dark:border-slate-800 py-12 mt-20 text-center text-xs text-slate-400 font-semibold font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="max-w-md mx-auto leading-relaxed text-slate-450 dark:text-slate-500 font-semibold">
            Built with love by Soumyadeep Ghosh
          </p>
        </div>
      </footer>

    </div>
  );
}
