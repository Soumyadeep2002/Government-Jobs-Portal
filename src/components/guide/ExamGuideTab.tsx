import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, Search, Calendar, ChevronRight, Sparkles, Award, 
  TrendingUp, Compass, BookOpen, Briefcase, Clock, IndianRupee, 
  SearchCode, Info, ChevronDown, CheckCircle2, ChevronUp, Flame, Play,
  HelpCircle
} from "lucide-react";

// Types for Guide and Roadmaps
interface ExamDetails {
  id: string;
  name: string;
  fullName: string;
  eligibility: string;
  stream: string;
  level: "10th" | "12th" | "Graduate" | "PG/PhD" | "Entrance";
  approxNotification: string;
  approxExam: string;
  difficultyCheck: "Easy" | "Medium" | "High" | "Extremely High";
  prestigeRanking: string;
  subjectFocus: string[];
  startingSalaryOrScope: string;
  description: string;
}

const ROADMAP_DATA: ExamDetails[] = [
  // 10th Pass
  {
    id: "g-ssc-mts",
    name: "SSC MTS & Havaldar",
    fullName: "Staff Selection Commission Multi-Tasking Staff",
    level: "10th",
    eligibility: "Class 10th (Matriculation) from any recognized board",
    stream: "Any Stream",
    approxNotification: "May - June Annually",
    approxExam: "August - September",
    difficultyCheck: "Easy",
    prestigeRanking: "⭐⭐",
    subjectFocus: ["Elementary Math", "General Reasoning", "English Comprehension", "General Awareness"],
    startingSalaryOrScope: "₹28,000 - ₹32,000 / month",
    description: "One of India's most highly sought entries for stable central government service straight after school. Opportunities across ministries, departments, and offices of the Government of India."
  },
  {
    id: "g-post-gds",
    name: "India Post GDS",
    fullName: "Gramin Dak Sevak Recruitment",
    level: "10th",
    eligibility: "Class 10th pass + Basic knowledge of computer and cycling",
    stream: "Any Stream",
    approxNotification: "July - August",
    approxExam: "No Written Exam (Merit Based on 10th Marks)",
    difficultyCheck: "Easy",
    prestigeRanking: "⭐",
    subjectFocus: ["No Exam", "Shortlisted purely based on Matriculation percentage weightage"],
    startingSalaryOrScope: "₹12,000 - ₹24,400 / month",
    description: "Great fast-track entry for countryside and suburban postal services. Highly stable with flexible hours for continuing studies."
  },
  {
    id: "g-rrb-gd",
    name: "RRB Group D",
    fullName: "Railway Recruitment Board Level 1 Posts",
    level: "10th",
    eligibility: "10th Pass or ITI credential",
    stream: "Any Stream / Vocational",
    approxNotification: "September - October",
    approxExam: "December - January",
    difficultyCheck: "Medium",
    prestigeRanking: "⭐⭐",
    subjectFocus: ["General Science", "Mathematics", "General Intelligence & Reasoning", "Current Affairs"],
    startingSalaryOrScope: "₹25,000 - ₹30,000 / month",
    description: "Massive scale national postings in Indian Railways. Exceptional job security, residential allowances, and free medical care for relatives."
  },
  {
    id: "g-agniveer",
    name: "Agniveer Entry",
    fullName: "Indian Armed Forces (Army, Navy, Air Force)",
    level: "10th",
    eligibility: "Class 10th Matric or 12th Pass (based on role) + Physical dimensions check",
    stream: "Any Stream",
    approxNotification: "January - February",
    approxExam: "April - May",
    difficultyCheck: "Medium",
    prestigeRanking: "⭐⭐⭐⭐",
    subjectFocus: ["General Knowledge", "General Science", "Basic Math", "Physical Fitness Test"],
    startingSalaryOrScope: "₹30,000 - ₹40,000 / month + Life Insurance & Seva Nidhi Package",
    description: "Elite 4-year service contract with potential for long-term permanent Commission. Exceptional opportunity for adventurous young minds who want to serve the motherland."
  },

  // 12th Pass
  {
    id: "g-ssc-chsl",
    name: "SSC CHSL",
    fullName: "Combined Higher Secondary Level Exam",
    level: "12th",
    eligibility: "Class 12th Pass (Intermediate)",
    stream: "Any Stream",
    approxNotification: "March - April",
    approxExam: "June - July",
    difficultyCheck: "Medium",
    prestigeRanking: "⭐⭐⭐",
    subjectFocus: ["English Language", "Quantitative Aptitude", "General Intelligence", "General Awareness"],
    startingSalaryOrScope: "₹32,000 - ₹45,000 / month",
    description: "Gateway to premium clerical and administrative assignments like Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operators in central departments."
  },
  {
    id: "g-ssc-steno",
    name: "SSC Stenographer",
    fullName: "Grade C & D Steno Recruitment",
    level: "12th",
    eligibility: "12th standard Pass + Shorthand skill certificate",
    stream: "Any Stream",
    approxNotification: "August - September",
    approxExam: "November (Shorthand test to follow)",
    difficultyCheck: "Medium",
    prestigeRanking: "⭐⭐⭐ (Grade C is highly coveted)",
    subjectFocus: ["English Language & Comprehension", "General Intelligence & Reasoning", "General Awareness (No Math required!)"],
    startingSalaryOrScope: "₹38,000 - ₹62,000 / month",
    description: "Highly unique exam since it does not have any Quantitative Aptitude/Mathematics papers! Perfect for students who excel in language, typing, and listening skills."
  },
  {
    id: "g-nda",
    name: "NDA / NA",
    fullName: "National Defence Academy & Naval Academy Examination",
    level: "12th",
    eligibility: "12th Pass (PCM required for Air Force & Navy, any stream for Army)",
    stream: "Inter / PCM / Commerce / Arts",
    approxNotification: "December and May (Twice a year)",
    approxExam: "April and September",
    difficultyCheck: "High",
    prestigeRanking: "⭐⭐⭐⭐⭐",
    subjectFocus: ["Advanced Mathematics", "General Ability Test (English, Physics, Chemistry, History, Geography)", "SSB Interview (5 days)"],
    startingSalaryOrScope: "Commissioned Lieutenant Rank after 4 years of training (approx. ₹1,00,000+ / mo)",
    description: "One of the most prestigious career entries in India. Selection transforms high-schoolers directly into Gazetted Officers of the Indian Armed Forces with an elite lifestyle."
  },

  // Graduate
  {
    id: "g-upsc-cse",
    name: "UPSC Civil Services",
    fullName: "IAS, IPS, IFS, IRS Recruiting Exam",
    level: "Graduate",
    eligibility: "Any Undergraduate Degree from a recognized college (even final year students)",
    stream: "Any Stream allowed",
    approxNotification: "February",
    approxExam: "Prelims: May/June | Mains: September/October",
    difficultyCheck: "Extremely High",
    prestigeRanking: "⭐⭐⭐⭐⭐",
    subjectFocus: ["GS-1 (History, Geography, Polity, Science)", "CSAT (Aptitude)", "9 Written Descriptive Papers", "Personality Interview"],
    startingSalaryOrScope: "₹72,000 + elite security housing, official transport (Bureaucrat power)",
    description: "Widely regarded as the toughest and most powerful examination in India. Directly recruits the administrative, policing, and foreign policy backbone of the nation."
  },
  {
    id: "g-ssc-cgl",
    name: "SSC CGL",
    fullName: "Combined Graduate Level Examination",
    level: "Graduate",
    eligibility: "Any Bachelor's Degree",
    stream: "Any Stream",
    approxNotification: "June",
    approxExam: "Tier-1: September/October | Tier-2: December",
    difficultyCheck: "High",
    prestigeRanking: "⭐⭐⭐⭐",
    subjectFocus: ["Mathematical Abilities", "Reasoning & General Intelligence", "English Language", "General Awareness", "Computer Knowledge"],
    startingSalaryOrScope: "₹45,000 - ₹95,000 / month (Assistant Section Officers, IT Inspectors)",
    description: "Often called 'Mini IAS'. Recruits Group B and C executives in crucial ministries like Income Tax, External Affairs, Enforcement Directorate (ED), and CBI."
  },
  {
    id: "g-banking-po",
    name: "IBPS / SBI PO & Clerk",
    fullName: "Probationary Officer & Assistant Bank Posts",
    level: "Graduate",
    eligibility: "Graduate in any discipline",
    stream: "Any Stream",
    approxNotification: "SBI: September | IBPS: August",
    approxExam: "Prelims: October/November | Mains: December/January",
    difficultyCheck: "High",
    prestigeRanking: "⭐⭐⭐⭐",
    subjectFocus: ["Quantitative Aptitude", "Data Interpretation", "Logical Reasoning", "English Proficiency", "Banking Awareness", "Descriptive Paper"],
    startingSalaryOrScope: "₹42,000 - ₹68,000 / month",
    description: "Exceptional career path for commerce, engineering, and arts grads who want structured fast-paced promotions, banking perks, and corporate-govt lifestyle balance."
  },
  {
    id: "g-rbi-b",
    name: "RBI Grade B Officer",
    fullName: "Reserve Bank of India Officers in Grade 'B'",
    level: "Graduate",
    eligibility: "Bachelor's Degree with minimum 60% marks in graduation",
    stream: "Any Stream (Economists, Commerce & Engineers favored)",
    approxNotification: "June - July",
    approxExam: "Phase-1: September | Phase-2: October",
    difficultyCheck: "Extremely High",
    prestigeRanking: "⭐⭐⭐⭐⭐",
    subjectFocus: ["Finance & Management", "Economic & Social Issues", "English (Writing Skills)", "Phase-1 general aptitude"],
    startingSalaryOrScope: "₹1,15,000+ / month (World class perks, quarters in metro areas)",
    description: "The elite crown jewel of financial sector careers. Work directly at the central monetary authority of India, regulating national monetary policy and currency reserves."
  },

  // PG & PhD
  {
    id: "g-ugc-net",
    name: "UGC NET / CSIR NET",
    fullName: "National Eligibility Test for Lectureship & JRF",
    level: "PG/PhD",
    eligibility: "Post Graduate (Master's Degree) with minimum 55% marks",
    stream: "Liberal Arts, Sciences, Technology, Humanities, Commerce",
    approxNotification: "April and October (Twice a year)",
    approxExam: "June and December",
    difficultyCheck: "High",
    prestigeRanking: "⭐⭐⭐⭐ (Gatekeeper to Indian Academia)",
    subjectFocus: ["Teaching & Research Aptitude", "Subject-Specific postgraduate domain expertise (e.g. History, Physics, English)"],
    startingSalaryOrScope: "JRF Fellowship: ₹37,000 + HRA stipend | Assistant Professor: Up to ₹1,20,000/mo",
    description: "The mandatory national screening for academic lectureship and PhD sponsorships. Qualify for Junior Research Fellowship to pursue fully funded PhD in key institutions."
  },
  {
    id: "g-gate-psu",
    name: "GATE (PSU Recruitment)",
    fullName: "Graduate Aptitude Test in Engineering",
    level: "Graduate", // Often requires engineering grads but leads to PG or elite PSU jobs
    eligibility: "B.E. / B.Tech / B.Arch / Master's degree in Science",
    stream: "Engineering, Mathematics, Science",
    approxNotification: "August - September",
    approxExam: "February (First two weekends)",
    difficultyCheck: "Extremely High",
    prestigeRanking: "⭐⭐⭐⭐⭐",
    subjectFocus: ["Technical Domain Engineering Questions", "Engineering Mathematics", "General Aptitude & Reasoning"],
    startingSalaryOrScope: "₹85,000 - ₹1,40,000 / month in top PSUs like ONGC, IOCL, NTPC",
    description: "The golden route for technical engineers. Top GATE rankers get directly hired as Executive Trainees at central Public Sector Undertakings (PSUs) with lifetime welfare benefits."
  },
  {
    id: "g-isro-sc",
    name: "ISRO Scientist/Engineer 'SC'",
    fullName: "Indian Space Research Organisation Scientist Recruitment",
    level: "PG/PhD", // Can enter with B.Tech but Master/PhDs are highly credited
    eligibility: "B.Tech/M.Tech with aggregate minimum 65% marks",
    stream: "Aerospace, Mechanical, Computer Science, Electronics, Physics",
    approxNotification: "Tours as per institutional vacancies (approx October)",
    approxExam: "December - January",
    difficultyCheck: "Extremely High",
    prestigeRanking: "⭐⭐⭐⭐⭐ (Prestigious National Asset)",
    subjectFocus: ["Syllabus oriented toward highly conceptual Core Electronics, Robotics, Computing & Rockets", "Technical Panel Interview"],
    startingSalaryOrScope: "₹80,000+ basic + unique aerospace research incentives & space city quarters",
    description: "Design India’s interplanetary rovers, communications satellite arrays, and massive launch vehicles. Dynamic research environment with high social respect."
  },

  // Elite Entrance Exams
  {
    id: "e-cat",
    name: "CAT",
    fullName: "Common Admission Test",
    level: "Entrance",
    eligibility: "Bachelor's Degree with minimum 50% marks (45% for reserved quotas)",
    stream: "Any Stream (Engineers, Humanities, Commerce)",
    approxNotification: "Late July / early August",
    approxExam: "Last Sunday of November",
    difficultyCheck: "Extremely High",
    prestigeRanking: "⭐⭐⭐⭐⭐",
    subjectFocus: ["Verbal Ability & Reading Comprehension (VARC)", "Data Interpretation & Logical Reasoning (DILR)", "Quantitative Ability (QA)"],
    startingSalaryOrScope: "Elite admission to IIMs and premier public B-schools (Avg package ₹22L - ₹35L / year)",
    description: "Gateway to the elite Indian Institutes of Management (IIMs) and elite government institutions. Equips you for high-power bureaucratic management, strategy consulting, and finance."
  },
  {
    id: "e-cuet",
    name: "CUET (UG & PG)",
    fullName: "Common University Entrance Test",
    level: "Entrance",
    eligibility: "Class 12th pass (for UG) / Bachelor's Degree (for PG)",
    stream: "Science, Commerce, Arts, Vocational",
    approxNotification: "February - March",
    approxExam: "May - June",
    difficultyCheck: "Medium",
    prestigeRanking: "⭐⭐⭐⭐",
    subjectFocus: ["Language Test", "Domain-Specific Subjects (e.g. Economics, Physics, Law)", "General Test (GK, Reasoning)"],
    startingSalaryOrScope: "Guaranteed seats in Delhi University (DU), BHU, JNU, and other top-tier central varsities",
    description: "Eliminated the age-old high-school percentile cutoff race! Offers a completely fair standardized gateway to study at Central Government Universities for minimal cost."
  },
  {
    id: "e-neet-pg",
    name: "NEET PG",
    fullName: "National Eligibility cum Entrance Test (Postgraduate)",
    level: "Entrance",
    eligibility: "MBBS degree or provisional certificate + recognized medical council registration",
    stream: "Medical",
    approxNotification: "January - March",
    approxExam: "June - July",
    difficultyCheck: "Extremely High",
    prestigeRanking: "⭐⭐⭐⭐⭐",
    subjectFocus: ["Clinical, Pre-clinical, and Para-clinical Medical Subjects (Syllabus based on full MBBS curriculum)"],
    startingSalaryOrScope: "MD / MS admission in premier Government Medical Colleges, AIIMS, and Central Hospitals",
    description: "Highly competitive gateway for doctors to secure state/national government sponsored postgraduate medical seats, specializing in surgery, internal medicine, pediatrics, etc."
  }
];

export default function ExamGuideTab() {
  const [selectedLevel, setSelectedLevel] = useState<"All" | "10th" | "12th" | "Graduate" | "PG/PhD" | "Entrance">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedExamId, setExpandedExamId] = useState<string | null>(null);

  // --- Dynamic Career Quiz / Pathway Wizard State ---
  const [wizardStep, setWizardStep] = useState<number>(0);
  const [quizQualifications, setQuizQualifications] = useState<string>("");
  const [quizStream, setQuizStream] = useState<string>("");
  const [quizMotivation, setQuizMotivation] = useState<string>("");
  const [quizResult, setQuizResult] = useState<ExamDetails[] | null>(null);

  // Process and filter the roadmap guidelines
  const filteredExams = useMemo(() => {
    return ROADMAP_DATA.filter((exam) => {
      // Level check
      if (selectedLevel !== "All" && exam.level !== selectedLevel) return false;

      // Text query check
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        return (
          exam.name.toLowerCase().includes(query) ||
          exam.fullName.toLowerCase().includes(query) ||
          exam.eligibility.toLowerCase().includes(query) ||
          exam.stream.toLowerCase().includes(query) ||
          exam.startingSalaryOrScope.toLowerCase().includes(query) ||
          exam.subjectFocus.some(s => s.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [selectedLevel, searchQuery]);

  // Handle dream planner submit
  const handleRunWizard = () => {
    if (!quizQualifications) return;
    
    // Logic to select top 2 or 3 exams matching inputs
    const results = ROADMAP_DATA.filter((exam) => {
      // Map qualification
      let levelMatch = false;
      if (quizQualifications === "10th" && exam.level === "10th") levelMatch = true;
      if (quizQualifications === "12th" && (exam.level === "10th" || exam.level === "12th")) levelMatch = true;
      if (quizQualifications === "Graduate" && (exam.level === "10th" || exam.level === "12th" || exam.level === "Graduate" || exam.level === "Entrance")) levelMatch = true;
      if (quizQualifications === "PG/PhD" && exam.level === "PG/PhD") levelMatch = true;
      if (exam.level === "Entrance" && quizQualifications === "Graduate") levelMatch = true; // Entrance can apply
      if (!levelMatch && exam.level === "Entrance") levelMatch = true; // Let them match entrance anyway

      // Stream compatibility
      const streamMatch = quizStream === "Any" || 
                          exam.stream.toLowerCase().includes("any") || 
                          exam.stream.toLowerCase().includes(quizStream.toLowerCase()) ||
                          exam.stream.toLowerCase().includes("inter");

      return levelMatch && streamMatch;
    });

    // Sort or filter according to Vibe/Motivation
    const sortedResults = [...results].sort((a, b) => {
      if (quizMotivation === "Prestige") {
        return b.prestigeRanking.length - a.prestigeRanking.length;
      }
      if (quizMotivation === "FastEntry") {
        // easy first
        const score = (name: string) => name.toLowerCase().includes("mts") || name.toLowerCase().includes("gds") ? 10 : 1;
        return score(b.name) - score(a.name);
      }
      return 0;
    });

    setQuizResult(sortedResults.slice(0, 3));
    setWizardStep(3); // Result view
  };

  const handleResetQuiz = () => {
    setWizardStep(0);
    setQuizQualifications("");
    setQuizStream("");
    setQuizMotivation("");
    setQuizResult(null);
  };

  const difficultyBadgeStyle = (diff: string) => {
    switch (diff) {
      case "Easy": return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/60";
      case "Medium": return "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/60";
      case "High": return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-100 dark:border-amber-900/60";
      case "Extremely High": return "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-100 dark:border-rose-900/60";
      default: return "bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-400 border-slate-200";
    }
  };

  return (
    <div className="space-y-10" id="exam-guide-view">
      
      {/* 1. Header Banner & Intro - Distinctive, Modern styling */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-[#0b0f19] to-slate-950 border border-indigo-900/40 p-8 sm:p-12 text-left shadow-lg">
        {/* Abstract background graphics representing search/growth curves */}
        <div className="absolute inset-x-0 bottom-0 top-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute right-0 bottom-0 h-48 w-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 top-10 h-36 w-36 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1 text-[11px] font-extrabold text-indigo-300 uppercase tracking-widest leading-none">
            <Sparkles className="h-3 w-3 text-indigo-400" />
            Empowering Aspirants Nationwide
          </div>
          
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            National <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-amber-200 bg-clip-text text-transparent">
              Exams Knowledge Hub
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl font-medium">
            Tired of outdated, stale, unreadable government information posts? Instantly learn about all major national entrance and recruitment exams—spanning from 10th-pass entries to senior postgrad/PhD tracks—with precise timing estimates, academic streams, and syllabus insights.
          </p>

          <div className="flex flex-wrap gap-3.5 pt-2">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-indigo-200 font-bold">
              <GraduationCap className="h-4.5 w-4.5 text-indigo-400" />
              10th, 12th, Degree & PhD
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-amber-200 font-bold">
              <Award className="h-4.5 w-4.5 text-amber-400" />
              Govt College Admissions
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Dream Career Planner Quiz - Engaging gamification! */}
      <div className="rounded-2xl border border-indigo-100 dark:border-indigo-950/70 bg-white dark:bg-[#0c1220] p-6 sm:p-8 shadow-xs relative overflow-hidden" id="interactive-dream-planner">
        <div className="absolute right-0 bottom-0 h-40 w-41 bg-indigo-500/[0.02] dark:bg-indigo-500/[0.04] rounded-full pointer-events-none" />
        
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          
          <div className="space-y-2 lg:w-2/5 text-left">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 shadow-inner">
              <Compass className="h-5 w-5" />
            </div>
            <h2 className="font-sans text-lg font-extrabold text-slate-800 dark:text-white tracking-tight">
              Interactive Career Compass
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Find which exams match your background! This runs instantly in your browser at zero-cost with no external API dependency.
            </p>
          </div>

          <div className="flex-1 bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-100 dark:border-slate-800/80">
            {wizardStep === 0 && (
              <div className="space-y-4 text-left">
                <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                  Question 1 of 3
                </span>
                <h3 className="font-sans text-sm font-bold text-slate-800 dark:text-white leading-tight">
                  What is your current highest academic qualification?
                </h3>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 pt-1">
                  {[
                    { id: "10th", label: "10th Pass" },
                    { id: "12th", label: "12th / Inter" },
                    { id: "Graduate", label: "Graduate Degree" },
                    { id: "PG/PhD", label: "PG & research" }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => {
                        setQuizQualifications(lvl.id);
                        setWizardStep(1);
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold text-center cursor-pointer transition ${
                        quizQualifications === lvl.id
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-750"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {wizardStep === 1 && (
              <div className="space-y-4 text-left">
                <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                  Question 2 of 3
                </span>
                <h3 className="font-sans text-sm font-bold text-slate-800 dark:text-white leading-tight">
                  Select your core academic stream/interest domain:
                </h3>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 pt-1">
                  {[
                    { id: "Any", label: "Any Stream" },
                    { id: "Engineering", label: "Tech / Engineering" },
                    { id: "Medical", label: "Medical / Science" },
                    { id: "Liberal Arts", label: "Arts & Commerce" }
                  ].map((stream) => (
                    <button
                      key={stream.id}
                      onClick={() => {
                        setQuizStream(stream.id);
                        setWizardStep(2);
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold text-center cursor-pointer transition ${
                        quizStream === stream.id
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-750"
                      }`}
                    >
                      {stream.label}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setWizardStep(0)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 transition"
                >
                  ← Go Back
                </button>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-4 text-left">
                <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                  Question 3 of 3
                </span>
                <h3 className="font-sans text-sm font-bold text-slate-800 dark:text-white leading-tight">
                  What is your absolute highest priority in a career?
                </h3>
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {[
                    { id: "Prestige", label: "Prestige & Gazetted Status (IAS/Army Officer)" },
                    { id: "Stability", label: "Pension Benefits & Balanced Life" },
                    { id: "FastEntry", label: "Direct entry with low barrier" }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setQuizMotivation(m.id);
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold text-center cursor-pointer transition flex items-center justify-center ${
                        quizMotivation === m.id
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-750"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                
                <div className="flex gap-4 pt-2">
                  <button 
                    onClick={() => setWizardStep(1)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 transition self-center"
                  >
                    ← Go Back
                  </button>
                  <button
                    disabled={!quizMotivation}
                    onClick={handleRunWizard}
                    className="ml-auto rounded-xl bg-amber-500 hover:bg-amber-600 font-sans text-xs font-extrabold text-slate-950 px-5 py-2.5 transition flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Discover Ideal Roadmap →
                  </button>
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-4 text-left animate-fadeIn">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider">
                    ✓ 3 Highly Suitable Roads Found
                  </span>
                  <button 
                    onClick={handleResetQuiz}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
                  >
                    Recheck Quiz
                  </button>
                </div>

                <div className="space-y-2.5">
                  {quizResult && quizResult.length > 0 ? (
                    quizResult.map((exam) => (
                      <div 
                        key={exam.id}
                        className="rounded-xl border border-indigo-50 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 flex items-center justify-between hover:shadow-xs transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-800 dark:text-white">
                              {exam.name}
                            </span>
                            <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/50 px-2 py-0.5 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tight">
                              {exam.level} tier
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 font-medium">
                            {exam.fullName}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <span className={`inline-block text-[9px] font-extrabold uppercase border px-2 py-0.5 rounded-full ${difficultyBadgeStyle(exam.difficultyCheck)}`}>
                            {exam.difficultyCheck} Prep
                          </span>
                          <p className="text-[11px] text-slate-800 dark:text-slate-200 font-bold leading-none">
                            {exam.startingSalaryOrScope}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 bg-white dark:bg-slate-900 rounded-xl">
                      <HelpCircle className="h-6 w-6 text-slate-300 mx-auto" />
                      <p className="text-xs text-slate-500 font-bold mt-2">No custom match. Try searching the full library below!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* 3. Browse Roads / Unified Exam Database */}
      <div className="space-y-6" id="exam-guide-database">
        
        {/* Dynamic Navigation Tiers for exams */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-100/60 dark:bg-slate-950/60 self-start">
            {[
              { id: "All", label: "Full Library" },
              { id: "10th", label: "10th Grade" },
              { id: "12th", label: "12th Grade" },
              { id: "Graduate", label: "Graduate Level" },
              { id: "PG/PhD", label: "PG / PhD & Research" },
              { id: "Entrance", label: "Elite Entrance (CAT, CUET, NEET)" }
            ].map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedLevel(tier.id as any)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-250 cursor-pointer ${
                  selectedLevel === tier.id
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          {/* Clean Glassy Text Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exams, exam dates or fields..."
              className="w-full rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-2 pl-10 pr-4 font-sans text-xs font-semibold focus:border-indigo-500 focus:outline-none dark:placeholder-slate-500"
            />
          </div>
        </div>

        {/* Exam Roster Map Cards */}
        <div className="grid gap-6 md:grid-cols-2" id="exam-guide-cards-grid">
          <AnimatePresence mode="popLayout">
            {filteredExams.map((exam) => {
              const isOpen = expandedExamId === exam.id;

              return (
                <motion.div
                  key={exam.id}
                  layoutId={`exam-card-${exam.id}`}
                  className={`rounded-2xl border bg-white dark:bg-[#0c1220] transition-all overflow-hidden text-left relative flex flex-col ${
                    isOpen 
                      ? "border-indigo-400 dark:border-indigo-500 ring-1 ring-indigo-400/20 shadow-md col-span-1 md:col-span-2" 
                      : "border-slate-100 dark:border-slate-800/80 hover:shadow-sm"
                  }`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top ribbon indicators */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-tight">
                            {exam.level === "Entrance" ? "Entrance Admission" : `${exam.level} Pass Entry`}
                          </span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border uppercase tracking-tight ${difficultyBadgeStyle(exam.difficultyCheck)}`}>
                            {exam.difficultyCheck} Prep
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-400 shrink-0" title="Prestige Index Rating">
                          {exam.prestigeRanking}
                        </span>
                      </div>

                      {/* Header block */}
                      <h3 className="font-sans text-base font-extrabold text-slate-900 dark:text-white mt-3.5 tracking-tight group-hover:text-indigo-600 transition">
                        {exam.name}
                      </h3>
                      <p className="font-sans text-xs text-slate-450 dark:text-slate-400 font-bold uppercase tracking-wider mt-1.5 leading-none">
                        {exam.fullName}
                      </p>

                      <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {exam.description}
                      </p>

                      {/* Two key milestones */}
                      <div className="grid grid-cols-2 gap-4 mt-4 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100/40 dark:border-slate-800">
                        <div className="space-y-1">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Approx Notification
                          </span>
                          <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 shrink-0" />
                            {exam.approxNotification}
                          </span>
                        </div>
                        <div className="space-y-1 border-l border-slate-200 dark:border-slate-800 pl-4">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Approx Exam Month
                          </span>
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 shrink-0" />
                            {exam.approxExam}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer toggler */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-none">
                          EST. Remuneration / Admission
                        </span>
                        <span className="text-xs font-extrabold text-slate-800 dark:text-slate-350 inline-flex items-center gap-1">
                          <IndianRupee className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                          {exam.startingSalaryOrScope}
                        </span>
                      </div>

                      <button
                        onClick={() => setExpandedExamId(isOpen ? null : exam.id)}
                        className={`rounded-lg border border-slate-200 dark:border-slate-750 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 transition flex items-center gap-1 cursor-pointer`}
                      >
                        {isOpen ? "See Less" : "Details & Syllabus"} 
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Syllabus / Deep expansion drawer */}
                  {isOpen && (
                    <motion.div 
                      className="bg-indigo-50/15 dark:bg-slate-900/40 border-t border-indigo-100/50 dark:border-slate-800 p-5 font-sans space-y-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {/* Qualification info strip */}
                      <div className="grid gap-3 sm:grid-cols-2 text-xs">
                        <div className="space-y-1">
                          <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                            ELIGIBILITY CRITERIA
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                            {exam.eligibility}
                          </p>
                        </div>
                        <div className="space-y-1 sm:border-l sm:border-slate-200/60 dark:sm:border-slate-800 sm:pl-4">
                          <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                            CORE ACADEMIC STREAM
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold">
                            {exam.stream}
                          </p>
                        </div>
                      </div>

                      {/* Subject focus benchmarks */}
                      <div className="space-y-2">
                        <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                          CORE SUBJECT WEIGHTAGE & FOCUS AREAS
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {exam.subjectFocus.map((subject, idx) => (
                            <span 
                              key={idx}
                              className="rounded-lg bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-100/30 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-400"
                            >
                              📚 {subject}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Interactive preparation milestone tip */}
                      <div className="rounded-xl border border-indigo-100/60 dark:border-slate-800 bg-white dark:bg-slate-950 p-3.5 flex items-start gap-2.5 shadow-2xs">
                        <Info className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="text-xs font-extrabold text-indigo-950 dark:text-indigo-300 leading-none">
                            Prep Compass Recommendation
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                            For {exam.name}, standard candidates begin their preparatory mocks approximately <strong>{exam.difficultyCheck === "Easy" ? "3 months" : "8-12 months"}</strong> prior to notification date to comfortably secure the percentile index. Keep tracking syllabus releases here!
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredExams.length === 0 && (
            <div className="col-span-2 text-center py-16 bg-white dark:bg-[#0c1220] rounded-2xl border border-slate-150-100 dark:border-slate-800">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto opacity-70" />
              <h4 className="font-sans text-sm font-bold text-slate-700 dark:text-slate-300 mt-4">
                No Exams Match Filters
              </h4>
              <p className="font-sans text-xs text-slate-450 dark:text-slate-500 max-w-sm mx-auto mt-1 font-medium leading-relaxed">
                Clear the search box or check our dynamic tiers (such as 10th pass, 12th pass) to review available career path guidelines.
              </p>
              <button
                onClick={() => {
                  setSelectedLevel("All");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-xl bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 transition"
              >
                Clear Database Filter
              </button>
            </div>
          )}
        </div>

      </div>

      {/* 4. Elegant SEO Footnotes & Schema Fold - Professional, high trustworthiness index! */}
      <div className="rounded-2xl border border-slate-150-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/25 p-6 sm:p-8 text-left space-y-6" id="seo-schema-collateral">
        <div className="space-y-1.5 border-b border-slate-200/60 dark:border-slate-800 pb-3">
          <span className="font-mono text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
            National Directory Info Schema
          </span>
          <h2 className="font-sans text-base font-extrabold text-slate-800 dark:text-white mt-1 tracking-tight">
            Frequently Asked Career Pathway Questions (FAQs) & SEO Index
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 text-xs">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">
              Q: What is the age relaxation rule for General vs SC/ST candidates?
            </h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Ans: Under central regulations, Reserved categories get significant age relaxation benefits. SC/ST candidates receive +5 years, OBC gets +3 years, and PwD candidates can access +10 years, which dynamically scales the posted general limits (e.g., matching SSC CGL basic limit of 30 up to 35 for SC/ST).
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">
              Q: Can 12th pass or final year students write the Civil Services (UPSC CSE)?
            </h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Ans: Candidates must possess an undergraduate degree to be fully admitted. However, undergraduate senior/final-year students whose pending examination results will be declared prior to descriptive stage entry are completely eligible to participate in standard preliminary selection rounds!
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">
              Q: What is the difference between GATE and UPSC Engineering Services (ESE)?
            </h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Ans: GATE is a single-paper academic aptitude test for M.Tech/PhD seats and direct recruitment into central PSUs (NTPC, PowerGrid, IndianOil). UPSC ESE evaluates multi-tier descriptive and interview criteria for highly prestigious Class 'A' civilian gazetted appointments in Indian Railways, defense depots, and Telecom departments.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">
              Q: Why study elite entrance exams like CAT or CLAT on SarkaarG?
            </h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Ans: Elite entrance exams lead to admission in State and Central Government managed institutions (IIMs, National Law Universities, IITs). Graduates from these elite government colleges secure outstanding direct-hire positions in statutory frameworks, public banks, advisory panels, and central directories.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-250 border-slate-200/60 dark:border-slate-800 flex flex-wrap gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
          <span>🏷️ Tags:</span>
          <span>#SarkariExamCalendar</span>
          <span>#UPSC2026Roadmap</span>
          <span>#SSCCGLSyllabusWeightage</span>
          <span>#EntranceTestDatabase</span>
          <span>#AgniveerNotificationdates</span>
          <span>#CUETSyllabusAdmissions</span>
        </div>
      </div>

    </div>
  );
}
