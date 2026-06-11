import { Search, MapPin, Briefcase, IndianRupee, ShieldCheck, RefreshCw, X } from "lucide-react";
import { UserProfile } from "../../types";
import { motion } from "motion/react";
import { getAgeRelaxation } from "../../data";
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
  sortBy: string;
  setSortBy: (sort: string) => void;
  user: UserProfile;
  resetAll: () => void;
  locationsList: string[];
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
}

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
  sortBy,
  setSortBy,
  user,
  resetAll,
  locationsList,
  onUpdateUser
}: FilterPanelProps) {
  const categories = ["All", "Central", "State", "Railway", "Banking", "Defence", "PSU"];
  const qualifications = ["All", "10th Pass", "12th Pass", "Graduate", "B.Tech/B.E.", "Post Graduate", "PhD"];

  return (
    <div id="filter-panel" className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* Search Bar Block with Framer Motion hover states */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        
        {/* Keyword Search */}
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3.5 h-4.5 w-4.5 text-slate-400" />
          <input
            id="filter-search-input"
            type="text"
            placeholder="Search by role title, department, or notification ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-10 text-sm outline-none font-sans font-medium transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")} 
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Location Dropdown Selection */}
        <CustomDropdown
          id="filter-location-select"
          value={selectedLocation}
          onChange={setSelectedLocation}
          options={[{ value: "All", label: "All Regions / Nationwide" }, ...locationsList.map((loc) => ({ value: loc, label: loc }))]}
          icon={<MapPin className="h-4.5 w-4.5" />}
          className="w-full lg:w-60"
        />

        {/* Action Button: Reset */}
        <motion.button
          id="btn-reset-filters"
          onClick={resetAll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-indigo-600 cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Reset</span>
        </motion.button>
      </div>

      {/* Grid containing advanced filter sliders, checkboxes, categories */}
      <div className="mt-5 grid gap-6 border-t border-slate-50 pt-5 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Category Badge Radio Row Selector */}
        <div className="flex flex-col gap-2">
          <label className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">
            Sector Category
          </label>
          <div className="flex flex-wrap gap-1.5" id="sector-category-filters">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    // Reset selected location when category changes unless it is State
                    if (cat !== "State") {
                      setSelectedLocation("All");
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-100" 
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>

          {/* Dynamic Indian States Dropdown when State sector is selected */}
          {selectedCategory === "State" && (
            <div className="mt-2 text-left">
              <CustomDropdown
                id="filter-state-dropdown"
                value={selectedLocation}
                onChange={setSelectedLocation}
                options={[{ value: "All", label: "All Indian States (Any)" }, ...["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry"].map(st => ({ value: st, label: st }))]}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Qualification Dropdown or Checklist */}
        <div className="flex flex-col gap-2 font-normal text-left">
          <label className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">
            QUALIFICATION
          </label>
          <CustomDropdown
            id="filter-qualification-select"
            value={selectedQual}
            onChange={setSelectedQual}
            options={qualifications.map((q) => q === "All" ? { value: "All", label: "Your Qualification" } : { value: q, label: q })}
            icon={<Briefcase className="h-4.5 w-4.5" />}
            className="w-full"
          />
        </div>

        {/* Sorting Selection Dropdown */}
        <div className="flex flex-col gap-2 font-normal text-left">
          <label className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">
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
            className="w-full"
          />
        </div>

      </div>

      {/* Row containing Salary Slider and Elite Reservation Eligibility checkbox */}
      <div className="mt-5 border-t border-slate-50 pt-5">
        
        {/* Salary Slider */}
        <div className="flex flex-col gap-2 max-w-xl text-left">
          <div className="flex justify-between items-center bg-transparent">
            <label className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">
              Min Starting Monthly Salary
            </label>
            <span className="font-mono text-xs font-bold text-indigo-600 flex items-center gap-0.5 bg-indigo-50 px-2 py-0.5 rounded-md">
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
            className="h-2 w-full cursor-pointer rounded-lg bg-slate-100 accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>₹15,000/mo</span>
            <span>₹60,000/mo</span>
            <span>₹1,20,000/mo</span>
          </div>
        </div>

      </div>

      {/* SECTION: Demographics Simulator */}
      <div className="mt-5 border-t border-slate-100 pt-5 bg-indigo-50/20 -mx-5 -mb-5 p-5 rounded-b-2xl">
        <div className="flex flex-col gap-1 text-left mb-4">
          <span className="font-mono text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
            Applicant Profiler & Quota Age Relaxation Simulator
          </span>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Toggle your reservation status and age directly here to test dynamic eligibility constraints across active listings in real time (such as General vs SC/ST reservation relaxation).
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          
          {/* Category Selector */}
          <div className="flex flex-col gap-2 text-left">
            <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">
              RESERVATION CATEGORY
            </span>
            <div className="flex flex-wrap gap-1.5" id="filter-user-category-group">
              {["General", "OBC", "SC", "ST", "PwD", "EWS"].map((cat) => {
                const isSelected = user.category === cat;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => onUpdateUser && onUpdateUser({ category: cat as any })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Age Simulator with inputs */}
          <div className="flex flex-col gap-2 text-left">
            <div className="flex justify-between items-center bg-transparent">
              <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">
                APPLICANT AGE SIMULATOR
              </span>
              <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                {user.age} Years Old
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="filter-user-age-slider"
                type="range"
                min="18"
                max="45"
                step="1"
                value={user.age}
                onChange={(e) => onUpdateUser && onUpdateUser({ age: parseInt(e.target.value) })}
                className="h-2 flex-1 cursor-pointer rounded-lg bg-slate-200 accent-indigo-600"
              />
              <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => onUpdateUser && onUpdateUser({ age: Math.max(18, user.age - 1) })}
                  className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 border-r border-slate-200 text-xs font-bold shrink-0"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateUser && onUpdateUser({ age: Math.min(45, user.age + 1) })}
                  className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 text-xs font-bold shrink-0"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Quick Demo Preset Trigger */}
          <div className="flex flex-col gap-2 text-left col-span-1 md:col-span-2 lg:col-span-1">
            <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">
              RESERVATION LOGIC TEST PRESETS
            </span>
            <div className="grid grid-cols-2 gap-2 h-full">
              <motion.button
                type="button"
                onClick={() => onUpdateUser && onUpdateUser({ age: 31, category: "General" })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col justify-center items-center py-1.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  user.age === 31 && user.category === "General"
                    ? "bg-rose-50 border-rose-300 text-rose-700 shadow-xs scale-[1.02]"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                }`}
              >
                <span className="text-[10px] font-bold">General @ Age 31</span>
                <span className="text-[9px] text-rose-500 font-semibold mt-0.5">Ineligible (e.g. IAS: limit 32)</span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => onUpdateUser && onUpdateUser({ age: 31, category: "SC" })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col justify-center items-center py-1.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  user.age === 31 && (user.category === "SC" || user.category === "ST")
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-xs scale-[1.02]"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                }`}
              >
                <span className="text-[10px] font-bold">SC / ST @ Age 31</span>
                <span className="text-[9px] text-emerald-600 font-semibold mt-0.5">Eligible with +5Yr Quota</span>
              </motion.button>
            </div>
          </div>

        </div>

        {/* Explain the Quota Rule live directly */}
        <div className="mt-4 bg-white border border-indigo-50 rounded-xl p-3 text-left flex items-start gap-2.5 shadow-2xs">
          <div className="bg-indigo-50 text-indigo-600 rounded-lg px-2 py-1 text-[10px] font-mono shrink-0 font-bold">
            RULE CHECKPOINT
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-700 leading-none">
              Age Relaxation Logic Applied:
            </p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
              Standard recruitments like Assistant Audit Officer (SSC) have a General limit of <strong>30 years</strong>, and ISRO SC Scientist has a limit of <strong>28 years</strong>.
              {user.category === "General" || user.category === "EWS" ? (
                <> As a <strong className="text-rose-600">General Category</strong> applicant representing no additional quota relaxation, your maximum permitted age remains strictly <strong className="text-rose-600">as posted (General Limit)</strong>. At your simulated age of <strong className="text-rose-600 font-bold">{user.age}</strong>, you cannot apply to careers with limits below that age.</>
              ) : (
                <> Since your reservation/category is set to <strong className="text-emerald-600">{user.category}</strong>, we've successfully activated a <strong className="text-emerald-600">+{getAgeRelaxation(user.category)} Year</strong> exemption. Your dynamic limit for a standard 30-year limit career is now <strong className="text-indigo-600">{30 + getAgeRelaxation(user.category)} years</strong>. Hence, at age <strong className="text-emerald-600 font-bold">{user.age}</strong>, you are <strong className="text-emerald-600">Fully Permitted</strong> to sit for exams!</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
