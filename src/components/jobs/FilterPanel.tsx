import { useState } from "react";
import { Search, MapPin, Briefcase, IndianRupee, ShieldCheck, RefreshCw, X, GraduationCap, Plus, Trash2, Globe, Keyboard, ExternalLink, SlidersHorizontal, UserCheck } from "lucide-react";
import { UserProfile } from "../../types";
import { motion } from "motion/react";
import CustomDropdown from "../common/CustomDropdown";

interface FilterPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedQual: string;
  setSelectedQual: (qual: string) => void;
  minMonthlySalary: number;
  setMinMonthlySalary: (sal: number) => void;
  showEligibleOnly: boolean;
  setShowEligibleOnly: (show: boolean) => void;
  maxExperience: string;
  setMaxExperience: (exp: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  user: UserProfile;
  resetAll: () => void;
  locationsList: string[];
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
}

const LANGUAGES_POOL = [
  "Assamese", "Bengali", "Bodo", "Dogri", "English", "Gujarati", "Hindi", "Kannada", 
  "Kashmiri", "Konkani", "Maithili", "Malayalam", "Manipuri", "Marathi", "Nepali", 
  "Odia", "Punjabi", "Sanskrit", "Santali", "Sindhi", "Tamil", "Telegu", "Urdu"
];

export default function FilterPanel({
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
  selectedCategory,
  setSelectedCategory,
  selectedQual,
  setSelectedQual,
  minMonthlySalary,
  setMinMonthlySalary,
  showEligibleOnly,
  setShowEligibleOnly,
  maxExperience,
  setMaxExperience,
  sortBy,
  setSortBy,
  user,
  resetAll,
  locationsList,
  onUpdateUser
}: FilterPanelProps) {
  const [langQuery, setLangQuery] = useState("");
  const categories = ["All", "Central", "State", "Railway", "Banking", "Defence", "PSU"];
  const qualifications = ["All", "10th Pass", "12th Pass", "Graduate", "B.Tech/B.E.", "Post Graduate", "PhD"];

  // Language management
  const handleAddLanguage = (lang: string) => {
    const trimmed = lang.trim();
    if (!trimmed) return;
    const current = user.languagesKnown || [];
    if (!current.some(l => l.toLowerCase() === trimmed.toLowerCase())) {
      onUpdateUser && onUpdateUser({ languagesKnown: [...current, trimmed] });
    }
    setLangQuery("");
  };

  const handleRemoveLanguage = (lang: string) => {
    const current = user.languagesKnown || [];
    onUpdateUser && onUpdateUser({ languagesKnown: current.filter(l => l !== lang) });
  };

  // Additional experiences management
  const handleAddExperience = () => {
    const current = user.additionalExperiences || [];
    const updated = [...current, { id: Date.now().toString(), years: 1, industry: "Banking" }];
    onUpdateUser && onUpdateUser({ additionalExperiences: updated });
  };

  const handleUpdateAdditionalExperience = (id: string, years: number, industry: string) => {
    const current = user.additionalExperiences || [];
    const updated = current.map(exp => exp.id === id ? { ...exp, years, industry } : exp);
    onUpdateUser && onUpdateUser({ additionalExperiences: updated });
  };

  const handleRemoveAdditionalExperience = (id: string) => {
    const current = user.additionalExperiences || [];
    const updated = current.filter(exp => exp.id !== id);
    onUpdateUser && onUpdateUser({ additionalExperiences: updated });
  };

  return (
    <div id="filter-panel" className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-md transition-all">
      {/* Header Info Panel */}
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800 text-left">
        <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400">
          <SlidersHorizontal className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-sans text-base font-extrabold text-slate-900 dark:text-white">Recruitment Circle Adjuster</h3>
          <p className="font-sans text-xs text-slate-450 dark:text-slate-500 font-medium mt-0.5">Filter circulars, sort vacancies, and simulate your eligibility parameters in real-time.</p>
        </div>
      </div>

      {/* SEARCH BAR & PRIMARY CONTROLS BLOCK */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Keyword Search */}
        <div className="relative flex-1 text-left">
          <Search className="absolute top-3.5 left-4 h-4.5 w-4.5 text-slate-400" />
          <input
            id="filter-search-input"
            type="text"
            placeholder="Search by role title, department, or notification ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 py-3 pr-4 pl-11 text-sm outline-none font-sans font-semibold text-slate-850 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-400 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")} 
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          )}
        </div>

        {/* Region Location Filter */}
        <div className="w-full sm:w-64 text-left">
          <CustomDropdown
            id="filter-location-select"
            value={selectedLocation}
            onChange={setSelectedLocation}
            options={[{ value: "All", label: "All Regions / Nationwide" }, ...locationsList.map((loc) => ({ value: loc, label: loc }))]}
            icon={<MapPin className="h-4.5 w-4.5" />}
            className="w-full bg-slate-50/30 dark:bg-slate-800/20"
          />
        </div>

        {/* Action Button: Reset All */}
        <motion.button
          id="btn-reset-filters"
          onClick={resetAll}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-750 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer shrink-0"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Reset</span>
        </motion.button>
      </div>

      {/* COLLAPSIBLE / TWO-COLUMN LAYOUT SHIFT */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-slate-100 dark:border-slate-800/80 pt-6">
        
        {/* LEFT COLUMN: JOB VACANCY CRITERIA (6 lg columns) */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-850">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              🎯 Job Vacancy Criteria & sorting
            </span>
          </div>

          {/* Sector Category */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-sans font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
              Recruitment Sector
            </span>
            <div className="flex flex-wrap gap-1.5" id="sector-category-filters">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (cat !== "State") {
                        setSelectedLocation("All");
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-bold tracking-tight transition-all cursor-pointer ${
                      isActive 
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-150" 
                        : "bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {cat}
                  </motion.button>
                );
              })}
            </div>

            {/* Dynamic State Selection */}
            {selectedCategory === "State" && (
              <motion.div 
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-left max-w-sm"
              >
                <CustomDropdown
                  id="filter-state-dropdown"
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  options={[
                    { value: "All", label: "All Indian States (Any)" },
                    ...[
                      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
                      "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
                      "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
                      "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
                      "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry"
                    ].map(st => ({ value: st, label: st }))
                  ]}
                  className="w-full bg-slate-50/50"
                />
              </motion.div>
            )}
          </div>

          {/* Sorting Parameters */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-[11px] font-sans font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
              Sort Listings By
            </label>
            <CustomDropdown
              id="filter-sort-select"
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: "closingSoon", label: "Nearest Closing Dates (Urgent First)" },
                { value: "salaryHigh", label: "Highest Starting Salary (INR)" },
                { value: "vacanciesHigh", label: "Highest Number of Vacancies" },
                { value: "postedNewest", label: "Latest Notification Posts" }
              ]}
              className="w-full max-w-md bg-white dark:bg-slate-900"
            />
          </div>

          {/* Wage Slider */}
          <div className="flex flex-col gap-3.5 text-left max-w-md bg-slate-50/35 dark:bg-slate-800/10 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            <div className="flex justify-between items-center bg-transparent">
              <label className="text-[11px] font-sans font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
                Min Starting Monthly Salary
              </label>
              <span className="font-mono text-xs font-bold text-indigo-650 dark:text-indigo-400 flex items-center gap-0.5 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 rounded-lg border border-indigo-100/50 dark:border-indigo-950">
                <IndianRupee className="h-3 w-3" />
                {minMonthlySalary.toLocaleString("en-IN")}/mo
              </span>
            </div>
            <input
              id="filter-salary-range"
              type="range"
              min="15000"
              max="120000"
              step="5000"
              value={minMonthlySalary}
              onChange={(e) => setMinMonthlySalary(parseInt(e.target.value))}
              className="h-2 w-full cursor-pointer rounded-lg bg-slate-200 dark:bg-slate-705 accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] font-semibold font-mono text-slate-400">
              <span>₹15k</span>
              <span>₹60k</span>
              <span>₹1.2L</span>
            </div>
          </div>

          {/* SMART SUITABILITY CONTROL BANNER */}
          <div className="max-w-md pt-2">
            <label className="text-[11px] font-sans font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block mb-2">
              Smart Verification Matcher
            </label>
            <label className="flex items-start gap-3.5 cursor-pointer select-none rounded-2xl border border-indigo-100/60 dark:border-indigo-900/40 bg-indigo-50/15 dark:bg-indigo-950/10 p-4 hover:bg-indigo-50/25 dark:hover:bg-indigo-950/15 transition shadow-xs">
              <input
                id="filter-strict-eligibility"
                type="checkbox"
                checked={showEligibleOnly}
                onChange={(e) => setShowEligibleOnly(e.target.checked)}
                className="h-5 w-5 cursor-pointer rounded accent-indigo-600 shrink-0 mt-0.5"
              />
              <div className="flex flex-col text-left">
                <span className="font-sans text-xs font-bold text-indigo-950 dark:text-indigo-300 leading-none">
                  Match Strict Eligibility Only
                </span>
                <span className="font-sans text-[10.5px] text-slate-500 dark:text-slate-400 font-semibold mt-1.5 leading-relaxed">
                  When active, hides vacant positions that do not match your candidate criteria. Rotate off to inspect all postings and see comprehensive diagnostic failures.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* RIGHT COLUMN: SIMULATOR ELIGIBILITY PROFILER (6 lg columns) */}
        <div className="lg:col-span-6 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-150/40 dark:border-slate-800/80 rounded-3xl p-6 text-left space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-100/40 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50/60 dark:bg-indigo-950/40 rounded-lg text-indigo-600 dark:text-indigo-400">
                <UserCheck className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                👤 Candidate Profile Simulator
              </span>
            </div>
            <span className="rounded-full bg-indigo-100/60 dark:bg-indigo-950 px-2.5 py-0.5 text-[10px] font-extrabold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
              Live Evaluation
            </span>
          </div>

          {/* Sub-row 1: Academics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Qualification Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-sans font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Override Qualification Level
              </label>
              <CustomDropdown
                id="filter-qualification-select"
                value={selectedQual}
                onChange={setSelectedQual}
                options={qualifications.map((q) => q === "All" ? { value: "All", label: "Candidate Qualification" } : { value: q, label: q })}
                icon={<GraduationCap className="h-4 w-4" />}
                className="w-full bg-white dark:bg-slate-900"
              />
            </div>

            {/* Academic Stream */}
            <div className="flex flex-col gap-1.5" id="filter-academic-stream-block">
              <label className="text-[10px] font-sans font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Stream / Specialization
              </label>
              <CustomDropdown
                id="filter-stream-select"
                value={user.stream}
                onChange={(val) => onUpdateUser && onUpdateUser({ stream: val as any })}
                options={[
                  { value: "Any Field", label: "Any General Background" },
                  { value: "Computer Science", label: "Computer Science / IT" },
                  { value: "Mechanical/Civil/Electrical", label: "Engineering (Mech/Civ/Elec)" },
                  { value: "Science (General)", label: "Science (B.Sc / General)" },
                  { value: "Commerce", label: "Commerce / Accounting (B.Com)" },
                  { value: "Humanities/Arts", label: "Humanities / Arts (BA)" },
                  { value: "Law", label: "Law/Legal Studies (LLB)" },
                  { value: "Agriculture", label: "Agriculture / Forestry" }
                ]}
                icon={<GraduationCap className="h-4 w-4" />}
                className="w-full bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          {/* Sub-row 2: Primary Work Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end bg-white dark:bg-slate-900/65 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
            {/* Candidate Experience Slider */}
            <div className="flex flex-col gap-1.5 text-left" id="filter-experience-block">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-sans font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Primary Experience
                </label>
                <span className="font-mono text-[11px] font-extrabold text-indigo-650 bg-indigo-50 px-1.5 py-0.5 rounded">
                  {user.experienceYears} Years
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="filter-candidate-experience-slider"
                  type="range"
                  min="0"
                  max="60"
                  step="1"
                  value={user.experienceYears}
                  onChange={(e) => onUpdateUser && onUpdateUser({ experienceYears: parseInt(e.target.value) })}
                  className="h-1.5 flex-1 cursor-pointer rounded-lg bg-slate-200 dark:bg-slate-700 accent-indigo-600"
                />
                <div className="flex rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-850 shrink-0">
                  <button
                    type="button"
                    onClick={() => onUpdateUser && onUpdateUser({ experienceYears: Math.max(0, user.experienceYears - 1) })}
                    className="px-1.5 py-0.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 border-r border-slate-200 dark:border-slate-750 text-[10px] font-bold shrink-0"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateUser && onUpdateUser({ experienceYears: Math.min(60, user.experienceYears + 1) })}
                    className="px-1.5 py-0.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 text-[10px] font-bold shrink-0"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Experience Industry select */}
            <div className="flex flex-col gap-1.5" id="filter-experience-industry-block">
              <label className="text-[10px] font-sans font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Primary Industry Field
              </label>
              <CustomDropdown
                id="filter-candidate-industry-select"
                value={user.experienceIndustry || "All"}
                onChange={(val) => onUpdateUser && onUpdateUser({ experienceIndustry: val })}
                options={[
                  { value: "All", label: "Show All (No Industry)" },
                  { value: "Banking", label: "Banking Row" },
                  { value: "Law", label: "Law / Judicial Services" },
                  { value: "Marketing", label: "Marketing / Commercial Sales" },
                  { value: "Designing", label: "Designing Systems" },
                  { value: "Real Estate", label: "Real Estate / Properties" },
                  { value: "Other", label: "Other Domain / Miscellaneous" }
                ]}
                icon={<Briefcase className="h-4 w-4" />}
                className="w-full bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          {/* Sub-row 3: Additional Multi-Industry Experience rows */}
          <div className="border-t border-slate-200/55 dark:border-slate-800 pt-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-sans font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="h-3 w-3 text-indigo-500" />
                Additional experience segments ({ (user.additionalExperiences || []).length })
              </span>
              <motion.button
                type="button"
                onClick={handleAddExperience}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 font-sans text-[10px] font-extrabold text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition border border-indigo-150/40 cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                Add Segment
              </motion.button>
            </div>
            
            {(user.additionalExperiences || []).length > 0 ? (
              <div className="space-y-3">
                {(user.additionalExperiences || []).map((exp, idx) => (
                  <div key={exp.id || idx} className="rounded-xl border border-dashed border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/50 p-3.5 flex flex-col gap-3 shadow-xs">
                    <span className="font-sans text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest block border-b border-slate-50 dark:border-slate-900 pb-1">
                      Experience Segment #{idx + 2}
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                      {/* Slider */}
                      <div className="flex flex-col gap-1 text-left">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-sans font-bold text-slate-400 uppercase">years</span>
                          <span className="font-mono text-[10px] font-extrabold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/80 px-1 rounded">
                            {exp.years} Yrs
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            id={`add-exp-slider-${exp.id}`}
                            type="range"
                            min="0"
                            max="60"
                            step="1"
                            value={exp.years}
                            onChange={(e) => handleUpdateAdditionalExperience(exp.id, parseInt(e.target.value), exp.industry)}
                            className="h-1 flex-1 cursor-pointer rounded bg-slate-200 dark:bg-slate-700 accent-indigo-500"
                          />
                          <div className="flex rounded border border-slate-200 dark:border-slate-700 overflow-hidden bg-white shrink-0">
                            <button
                              type="button"
                              onClick={() => handleUpdateAdditionalExperience(exp.id, Math.max(0, exp.years - 1), exp.industry)}
                              className="px-1 py-0.5 text-slate-500 hover:bg-slate-55 border-r border-slate-200 text-[10px] font-bold shrink-0"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateAdditionalExperience(exp.id, Math.min(60, exp.years + 1), exp.industry)}
                              className="px-1 py-0.5 text-slate-500 hover:bg-slate-55 text-[10px] font-bold shrink-0"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 text-left">
                          <CustomDropdown
                            id={`add-exp-industry-${exp.id}`}
                            value={exp.industry}
                            onChange={(val) => handleUpdateAdditionalExperience(exp.id, exp.years, val)}
                            options={[
                              { value: "Banking", label: "Banking Operations" },
                              { value: "Law", label: "Law / Legal Practice" },
                              { value: "Marketing", label: "Marketing / Ad Sales" },
                              { value: "Designing", label: "Designing / Creatives" },
                              { value: "Real Estate", label: "Real Estate Properties" },
                              { value: "Other", label: "Other Technical Field" }
                            ]}
                            icon={<Briefcase className="h-3 w-3" />}
                            className="w-full bg-slate-50/50"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveAdditionalExperience(exp.id)}
                          className="text-rose-500 hover:text-rose-700 p-2 bg-rose-50/40 hover:bg-rose-50 border border-rose-100/35 rounded-lg transition shrink-0 flex items-center justify-center cursor-pointer h-7 w-7"
                          title="Delete domain row"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 italic p-3 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200/50 dark:border-slate-800">
                💡 Single-industry profile. Incorporate secondary roles to query wider vacancies.
              </p>
            )}
          </div>

          {/* Sub-row 4: Demographics Age & Quotas */}
          <div className="border-t border-slate-200/55 dark:border-slate-800 pt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category selector */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-sans font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider">
                  Reservation Category Quota
                </span>
                <div className="flex flex-wrap gap-1" id="filter-user-category-group">
                  {["General", "OBC", "SC", "ST", "PwD", "EWS"].map((cat) => {
                    const isSelected = user.category === cat;
                    return (
                      <motion.button
                        key={cat}
                        onClick={() => onUpdateUser && onUpdateUser({ category: cat as any })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-lg px-2 py-1 text-[10px] font-extrabold transition-all cursor-pointer border ${
                          isSelected
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white dark:bg-slate-900 text-slate-550 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        {cat}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Age Simulator with Manual adjustment */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center bg-transparent">
                  <span className="text-[10px] font-sans font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider">
                    Applicant Age Simulator
                  </span>
                  <span className="font-mono text-[10px] font-extrabold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded">
                    {user.age} Years Old
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="filter-user-age-slider"
                    type="range"
                    min="18"
                    max="45"
                    step="1"
                    value={user.age}
                    onChange={(e) => onUpdateUser && onUpdateUser({ age: parseInt(e.target.value) })}
                    className="h-1.5 flex-1 cursor-pointer rounded bg-slate-200 dark:bg-slate-705 accent-indigo-600"
                  />
                  <div className="flex rounded border border-slate-200 dark:border-slate-700 overflow-hidden bg-white shrink-0">
                    <button
                      type="button"
                      onClick={() => onUpdateUser && onUpdateUser({ age: Math.max(18, user.age - 1) })}
                      className="px-1 py-0.5 text-slate-500 hover:bg-slate-100 text-[9px] font-extrabold shrink-0 border-r border-slate-200"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateUser && onUpdateUser({ age: Math.min(45, user.age + 1) })}
                      className="px-1 py-0.5 text-slate-500 hover:bg-slate-100 text-[9px] font-extrabold shrink-0"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-row 5: Languages and Key/Typing Skills */}
          <div className="border-t border-slate-200/55 dark:border-slate-800 pt-4 space-y-4">
            
            {/* Languages Known Block */}
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-indigo-500" />
                Languages Spoken
              </span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type language (Hindi, English etc.) & press Enter..."
                  value={langQuery}
                  onChange={(e) => setLangQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (langQuery.trim()) {
                        handleAddLanguage(langQuery);
                      }
                    }
                  }}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-755 bg-white dark:bg-slate-900 py-2 px-3 text-xs outline-none font-sans font-semibold text-slate-750 dark:text-white transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white"
                />
                
                {/* Auto Suggestions dropdown */}
                {langQuery.trim() !== "" && (
                  <div className="absolute z-30 mt-1 max-h-36 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                    {LANGUAGES_POOL.filter(lang => 
                      lang.toLowerCase().includes(langQuery.toLowerCase()) &&
                      !(user.languagesKnown || []).some(existing => existing.toLowerCase() === lang.toLowerCase())
                    ).length > 0 ? (
                      LANGUAGES_POOL.filter(lang => 
                        lang.toLowerCase().includes(langQuery.toLowerCase()) &&
                        !(user.languagesKnown || []).some(existing => existing.toLowerCase() === lang.toLowerCase())
                      ).map(lang => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => handleAddLanguage(lang)}
                          className="w-full rounded-lg px-2.5 py-1.5 text-left text-[11px] font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition cursor-pointer"
                        >
                          + {lang}
                        </button>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddLanguage(langQuery)}
                        className="w-full rounded-lg px-2.5 py-1.5 text-left text-[11px] font-medium text-slate-400 italic hover:bg-indigo-50 hover:text-indigo-600 transition cursor-pointer"
                      >
                        Add custom "{langQuery}"
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Tag Items List */}
              <div className="flex flex-wrap gap-1 min-h-[24px]">
                {(user.languagesKnown && user.languagesKnown.length > 0) ? (
                  user.languagesKnown.map((lang) => (
                    <span
                      key={lang}
                      className="inline-flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-100/60 px-2 py-0.5 font-sans text-[10px] font-bold text-indigo-750"
                    >
                      {lang}
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(lang)}
                        className="text-indigo-400 hover:text-indigo-600 cursor-pointer"
                      >
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 italic">
                    Show all jobs regardless of language requirements
                  </span>
                )}
              </div>
            </div>

            {/* Typing speed input */}
            <div className="flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
              <span className="font-sans text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider flex items-center gap-1.5">
                <Keyboard className="h-3.5 w-3.5 text-indigo-500" />
                Keyboard Typing Speed
              </span>
              <div className="flex items-center relative rounded-xl border border-slate-200 bg-white dark:bg-slate-900 overflow-hidden focus-within:border-indigo-400 focus-within:bg-white transition">
                <input
                  type="text"
                  placeholder="Enter typing speed..."
                  value={user.typingSpeed !== undefined && !isNaN(user.typingSpeed) && user.typingSpeed > 0 ? user.typingSpeed : ""}
                  onChange={(e) => {
                    const val = e.target.value.trim();
                    const numeric = val === "" ? 0 : parseInt(val);
                    onUpdateUser && onUpdateUser({ typingSpeed: isNaN(numeric) ? 0 : numeric });
                  }}
                  className="w-full p-2 px-3 text-xs outline-none font-sans font-semibold text-slate-750 dark:text-white bg-transparent"
                />
                <span className="font-mono text-[10px] font-extrabold text-slate-450 px-3 bg-slate-50 h-[32px] flex items-center border-l border-slate-150">
                  WPM
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <span>Not sure about your speed?</span>
                <a
                  href="https://www.livechat.com/typing-speed-test/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5 font-bold"
                >
                  Take speed test
                  <ExternalLink className="h-2.5 w-2.5 text-indigo-500" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
