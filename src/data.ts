import { Job, NotificationAlert, UserProfile } from "./types";

// Current simulated date: 2026-06-10

export const INITIAL_USER_PROFILE: UserProfile = {
  fullName: "Sourabh Sharma",
  email: "sourabh.sharma@gmail.com",
  dob: "2001-08-15", // Age 24 on June 10, 2026
  age: 24,
  qualification: "Graduate",
  stream: "Computer Science",
  experienceYears: 1,
  category: "OBC", // Entitled to +3 years relaxation
  statePreference: "New Delhi",
  preferredRoles: ["Software Developer", "Administrative Officer", "Scientific Officer"]
};

export const MOCK_NOTIFICATIONS: NotificationAlert[] = [
  {
    id: "notif-1",
    title: "UPSC CSE 2026 Prelims Exam Centers Updated",
    date: "2026-06-09",
    type: "Latest",
    description: "Union Public Service Commission has released the updated list of examination centers and guidelines for the Civil Services Examination 2026."
  },
  {
    id: "notif-2",
    title: "DRDO JRF Admit Card Released",
    date: "2026-06-08",
    jobId: "job-5",
    type: "Admit Card",
    description: "Defence Research and Development Organisation has dispatched physical and digital admit cards for the upcoming Scientist Entry Test."
  },
  {
    id: "notif-3",
    title: "Closing Soon: ISRO Scientist B Application Portal",
    date: "2026-06-10",
    jobId: "job-3",
    type: "Urgent",
    description: "The application link for 142 Scientist B vacancies at ISRO headquarters will close in 2 days. Candidates are advised to submit immediately to avoid server rushes."
  },
  {
    id: "notif-4",
    title: "RBI Grade B Officer Phase-I Results Published",
    date: "2026-06-05",
    type: "Result",
    description: "Reserve Bank of India has announced the list of roll numbers qualified for Phase-II of the Grade B Officers Recruitments."
  },
  {
    id: "notif-5",
    title: "SCC CGL Tier 2 Exam Schedule Released",
    date: "2026-06-07",
    type: "Latest",
    description: "Staff Selection Commission has updated the calendar, scheduling Tier 2 exams across major metro hubs starting early next month."
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Civil Services Officer (IAS/IPS/IFS)",
    agency: "Union Public Service Commission (UPSC)",
    category: "Central",
    location: "All India (Nationwide)",
    salaryMin: 56100,
    salaryMax: 250000,
    postedDate: "2026-05-15",
    closingDate: "2026-06-25", // 15 Days left
    minQualification: "Graduate",
    stream: ["Any Field", "Computer Science", "Mechanical/Civil/Electrical", "Science (General)", "Commerce", "Humanities/Arts", "Law"],
    minAge: 21,
    maxAgeGeneral: 32,
    experienceRequired: 0,
    totalVacancies: 1056,
    notificationId: "UPSC-2026-CSE-12",
    description: "Recruitment to various civil services of the Government of India, including the Indian Administrative Service, Indian Police Service, and Indian Foreign Service representing the highest advisory and administrator roles in the executive branch.",
    selectionProcess: ["Preliminary Examination (objective)", "Main Written Examination (descriptive)", "Personality Test / Interview"],
    examDate: "2026-08-16",
    officialLink: "https://upsc.gov.in",
    featured: true,
    examFeeGeneral: 100,
    examFeeReserved: 0
  },
  {
    id: "job-2",
    title: "Combined Graduate Level (CGL) Exam 2026",
    agency: "Staff Selection Commission (SSC)",
    category: "Central",
    location: "All India (Transferable)",
    salaryMin: 25500,
    salaryMax: 151100,
    postedDate: "2026-05-21",
    closingDate: "2026-06-22", // Submission portal 21-05-2026 to 22-06-2026
    minQualification: "Graduate",
    stream: ["Any Field", "Commerce", "Science (General)", "Computer Science", "Humanities/Arts", "Law"],
    minAge: 18,
    maxAgeGeneral: 30, // 18-30 for Group-B high stakes, 18-32 for JSO, 18-27 for Auditors
    experienceRequired: 0,
    totalVacancies: 12256, // Approx. 12,256 tentative vacancies
    notificationId: "F. No. HQ-C11018/1/2026-C-1",
    description: "Sovereign notice of exam to recruit Group 'B' and Group 'C' administrative officers across all GoI Ministries. Includes Assistant Audit Officer, Assistant Section Officer, Inspector of Income Tax, Inspector (Central Excise), Sub-Inspector in CBI, and Auditor positions. Fees: ₹100; Females, SC/ST, and PwBD are fully exempted. Key Male physical: 157.5 cm height.",
    selectionProcess: [
      "Tier-1 CBT (25 MCQs each for Reasoning, General Awareness, Quant, English) - August/September 2026",
      "Tier-2 CBT (Paper I Compulsory with Math, Eng, Reasoning, GK, and Computer Knowledge) - December 2026",
      "Physical standards measurement and Walking fitness check (for Inspector/Sub-Inspector posts)",
      "Centralized Document Verification at allocated User Departments"
    ],
    examDate: "2026-08-20",
    officialLink: "https://ssc.gov.in/login",
    featured: true,
    examFeeGeneral: 100,
    examFeeReserved: 0
  },
  {
    id: "job-4",
    title: "Grade B Officer (General Admin)",
    agency: "Reserve Bank of India (RBI)",
    category: "Banking",
    location: "Mumbai, Maharashtra",
    salaryMin: 108400,
    salaryMax: 224000,
    postedDate: "2026-06-01",
    closingDate: "2026-07-02", // 22 Days left
    minQualification: "Graduate",
    stream: ["Any Field", "Commerce", "Science (General)", "Computer Science", "Law"],
    minAge: 21,
    maxAgeGeneral: 30,
    experienceRequired: 0,
    totalVacancies: 290,
    notificationId: "RBI-2026-GRADEB",
    description: "Highest entry-level officer cadre representing corporate governance, managing monetary policy publications, coordinating national bank audits, and handling foreign reserve calculations.",
    selectionProcess: ["Phase-I Examination (Objective Reasoning & Aptitude)", "Phase-II Economical & English Descriptive Test", "Central Board Interview"],
    examDate: "2026-08-29",
    officialLink: "https://rbi.org.in",
    featured: true,
    examFeeGeneral: 850,
    examFeeReserved: 100
  },
  {
    id: "job-5",
    title: "Scientist 'B' Technical Specialist",
    agency: "National Informatics Centre (NIC / MeitY)",
    category: "Central",
    location: "All India (Transferable)",
    salaryMin: 56100,
    salaryMax: 177500,
    postedDate: "2026-05-28",
    closingDate: "2026-06-30", // 20 days left
    minQualification: "Graduate",
    stream: ["Computer Science"],
    minAge: 21,
    maxAgeGeneral: 30,
    experienceRequired: 1,
    totalVacancies: 196,
    notificationId: "NIC-MEITY-2026",
    description: "Develop secure software solutions, support public digital clouds (DigiLocker, eWay bills), and provide core high-performance networking setups for all ministries.",
    selectionProcess: ["Direct Screening Written Test", "System Design & Code Integrity Interview"],
    examDate: "2026-08-05",
    officialLink: "https://nic.in",
    featured: false,
    examFeeGeneral: 800,
    examFeeReserved: 0
  },
  {
    id: "job-6",
    title: "Junior Research Fellow (Aerospace Systems)",
    agency: "Defence Research and Development Organisation (DRDO)",
    category: "Central",
    location: "Pune, Maharashtra",
    salaryMin: 37000,
    salaryMax: 54000,
    postedDate: "2026-05-30",
    closingDate: "2026-06-15", // 5 Days left
    minQualification: "B.Tech/B.E.",
    stream: ["Mechanical/Civil/Electrical", "Computer Science"],
    minAge: 18,
    maxAgeGeneral: 28,
    experienceRequired: 0,
    totalVacancies: 15,
    notificationId: "DRDO-ADE-JRF",
    description: "Undertake highly experimental defense prototypes, drone stabilization calculations, and composite alloy test procedures at defense research facilities.",
    selectionProcess: ["CBT Aptitude Evaluation", "Lab Presentation & Viva Voce"],
    examDate: "2026-07-10",
    officialLink: "https://drdo.gov.in",
    featured: false,
    examFeeGeneral: 100,
    examFeeReserved: 0
  },
  {
    id: "job-7",
    title: "Probationary Officer (SBI PO)",
    agency: "State Bank of India",
    category: "Banking",
    location: "All India (State Circles)",
    salaryMin: 65000,
    salaryMax: 115000,
    postedDate: "2026-06-05",
    closingDate: "2026-07-15", // 35 Days left
    minQualification: "Any Graduate",
    stream: ["Any Field", "Commerce", "Humanities/Arts", "Science (General)"],
    minAge: 21,
    maxAgeGeneral: 30,
    experienceRequired: 0,
    totalVacancies: 2000,
    notificationId: "SBI-PO-2026-04",
    description: "Core banking operations, credit appraisal files management, treasury interactions, customer facing management, and branch cash custody supervisor roles.",
    selectionProcess: ["SBI Prelims Test", "SBI Main Examinations with Descriptive Essay", "Group Exercises & Panel Interview"],
    examDate: "2026-09-02",
    officialLink: "https://sbi.co.in",
    featured: true,
    examFeeGeneral: 750,
    examFeeReserved: 0
  },
  {
    id: "job-8",
    title: "Section Officer (Nall-PSU Executive)",
    agency: "National Power Grid Corporation (POWERGRID)",
    category: "PSU",
    location: "Gurugram, Haryana",
    salaryMin: 60000,
    salaryMax: 180000,
    postedDate: "2026-06-02",
    closingDate: "2026-07-10", // 30 Days left
    minQualification: "B.Tech/B.E.",
    stream: ["Mechanical/Civil/Electrical"],
    minAge: 18,
    maxAgeGeneral: 29,
    experienceRequired: 1,
    totalVacancies: 65,
    notificationId: "PGCIL-2026-EXEC",
    description: "Supervise regional high-voltage transmission substation grids, electrical switchyard upgrades, power distribution balancing algorithms and telemetry units monitoring.",
    selectionProcess: ["National GATE Score screening", "Group Discussion", "Executive panel assessment Interview"],
    examDate: "2026-08-11",
    officialLink: "https://powergrid.in",
    featured: false,
    examFeeGeneral: 500,
    examFeeReserved: 0
  },
  {
    id: "job-9",
    title: "Deputy Collector / State Administrative Services",
    agency: "State Public Service Commission",
    category: "State",
    location: "Mumbai & major Districts",
    salaryMin: 56100,
    salaryMax: 185000,
    postedDate: "2026-05-25",
    closingDate: "2026-06-20", // 10 Days left
    minQualification: "Graduate",
    stream: ["Any Field", "Humanities/Arts", "Commerce", "Science (General)", "Law"],
    minAge: 19,
    maxAgeGeneral: 38, // Usually higher state PSC limits
    experienceRequired: 0,
    totalVacancies: 180,
    notificationId: "MPSC-STATE-2026-02",
    description: "Direct management of sub-district land revenue collections, law and order coordination, disaster management directives, and supervision of village authorities.",
    selectionProcess: ["State Prelims CBT", "SPSC Main Subjective Exams", "Interview Board Session"],
    examDate: "2026-09-17",
    officialLink: "https://mpsc.gov.in",
    featured: false,
    examFeeGeneral: 500,
    examFeeReserved: 250
  },
  {
    id: "job-10",
    title: "Senior Administrative Trainee",
    agency: "Oil and Natural Gas Corporation (ONGC)",
    category: "PSU",
    location: "Dehradun, Uttarakhand",
    salaryMin: 90000,
    salaryMax: 240000,
    postedDate: "2026-05-18",
    closingDate: "2026-06-15", // 5 Days left
    minQualification: "Post Graduate",
    stream: ["Commerce", "Humanities/Arts", "Any Field"],
    minAge: 21,
    maxAgeGeneral: 30,
    experienceRequired: 0,
    totalVacancies: 110,
    notificationId: "ONGC-TRAINEE-2026",
    description: "Undertake strategic administration management, corporate compliance auditing, local environment community relations and oil lease procurement files processing.",
    selectionProcess: ["UGC NET qualifying score screening", "Group Dynamics Test", "Interview board"],
    officialLink: "https://ongcindia.com",
    featured: false,
    examFeeGeneral: 300,
    examFeeReserved: 0
  },
  {
    id: "job-11",
    title: "Technical Executive Officer (Naval Command)",
    agency: "Indian Navy (Defence Service)",
    category: "Defence",
    location: "Visakhapatnam, Andhra Pradesh",
    salaryMin: 85000,
    salaryMax: 190000,
    postedDate: "2026-05-22",
    closingDate: "2026-06-16", // 6 Days left
    minQualification: "Graduate",
    stream: ["Mechanical/Civil/Electrical", "Computer Science"],
    minAge: 19,
    maxAgeGeneral: 24, // Very strict age limit!
    experienceRequired: 0,
    totalVacancies: 48,
    notificationId: "NAVY-TECH-2026-I",
    description: "Commissioned as Sub-Lieutenant to manage marine propulsion mechanics, digital warship systems networking, and naval communication relays upkeep.",
    selectionProcess: ["SSB (Service Selection Board) 5-Day psychological & physical tests", "Special Intelligence Medical Test Board"],
    examDate: "2026-07-28",
    officialLink: "https://joinindiannavy.gov.in",
    featured: true,
    examFeeGeneral: 0,
    examFeeReserved: 0
  },
  {
    id: "job-12",
    title: "Deputy Manager (Information Security)",
    agency: "National Bank for Agriculture (NABARD)",
    category: "Banking",
    location: "Delhi/Mumbai Head Offices",
    salaryMin: 95000,
    salaryMax: 210000,
    postedDate: "2026-06-03",
    closingDate: "2026-07-24", // 44 Days left
    minQualification: "Graduate",
    stream: ["Computer Science"],
    minAge: 25, // older minimum
    maxAgeGeneral: 35,
    experienceRequired: 3, // Requires 3 years experience!
    totalVacancies: 35,
    notificationId: "NABARD-2026-MGR",
    description: "Govern agricultural bank digital operations integrity, conduct penetration testing on regional rural banking applications, and manage malware mitigation suites.",
    selectionProcess: ["Specialist Written Exam with practical lab", "Senior Board Interview Panel"],
    examDate: "2026-09-10",
    officialLink: "https://nabard.org",
    featured: false,
    examFeeGeneral: 800,
    examFeeReserved: 150
  },
  {
    id: "job-13",
    title: "Station Master (RRB NTPC)",
    agency: "Indian Railways (Railway Recruitment Board)",
    category: "Railway",
    location: "Zonal Railway Hubs (All India)",
    salaryMin: 35400,
    salaryMax: 112000,
    postedDate: "2026-05-28",
    closingDate: "2026-06-30", // 20 Days left
    minQualification: "Graduate",
    stream: ["Any Field", "Mechanical/Civil/Electrical", "Science (General)", "Computer Science", "Commerce", "Humanities/Arts"],
    minAge: 18,
    maxAgeGeneral: 33,
    experienceRequired: 0,
    totalVacancies: 4210,
    notificationId: "RRB-CEN-NTPC-2026",
    description: "Manage safety of daily train tracking, coordinate station signals operations, schedule pilot duties, handle emergency blockages, and oversee platforms maintenance.",
    selectionProcess: ["Stage 1 CBT (General Aptitude)", "Stage 2 CBT (Subjective Reasoning)", "Computer-Based Aptitude Test (CBAT - Psycho)", "Medical Examination"],
    examDate: "2026-10-04",
    officialLink: "https://rrbcdg.gov.in",
    featured: false,
    examFeeGeneral: 500,
    examFeeReserved: 250
  },
  {
    id: "job-14",
    title: "Secondary School Assistant Clerk",
    agency: "Staff Selection Commission",
    category: "Central",
    location: "Regional State Offices",
    salaryMin: 19900,
    salaryMax: 63200,
    postedDate: "2026-06-01",
    closingDate: "2026-06-15", // 5 Days left
    minQualification: "12th Pass",
    stream: ["Any Field", "Commerce", "Humanities/Arts", "Science (General)"],
    minAge: 18,
    maxAgeGeneral: 27,
    experienceRequired: 0,
    totalVacancies: 820,
    notificationId: "SSC-CHSL-2026-CLK",
    description: "Responsible for register maintenance, physical file transfers, computer typing speed records, standard government letters indexing and customer counters assistance.",
    selectionProcess: ["Tier 1 CBT Screen", "English/Hindi Speed Typing Skill Diagnostic"],
    officialLink: "https://ssc.gov.in",
    featured: false,
    examFeeGeneral: 100,
    examFeeReserved: 0
  },
  {
    id: "job-15",
    title: "Postman / Mail Delivery Assistant",
    agency: "India Post (Ministry of Communications)",
    category: "Central",
    location: "All India Zonal Postal Circles",
    salaryMin: 21700,
    salaryMax: 69100,
    postedDate: "2026-06-02",
    closingDate: "2026-06-25", // 15 Days left
    minQualification: "10th Pass",
    stream: ["Any Field"],
    minAge: 18,
    maxAgeGeneral: 27,
    experienceRequired: 0,
    totalVacancies: 18500,
    notificationId: "POST-AIP-2026-08",
    description: "Deliver physical communications, speed post registered packages, manage registered local biometric verifications, and coordinate cash handling for India Post Payments Bank.",
    selectionProcess: ["Automated academic grade indexing", "Basic local dialect vetting examination"],
    officialLink: "https://indiapost.gov.in",
    featured: false,
    examFeeGeneral: 100,
    examFeeReserved: 0
  }
];

// Helper to determine the Age relaxation based on Category.
export function getAgeRelaxation(category: UserProfile["category"]): number {
  switch (category) {
    case "OBC": return 3;
    case "SC":
    case "ST": return 5;
    case "PwD": return 10;
    default: return 0; // General, EWS
  }
}

// Qual Ranking Map
export const QUAL_RANKING = {
  "10th Pass": 1,
  "12th Pass": 2,
  "Graduate": 3,
  "Any Graduate": 3,
  "B.Tech/B.E.": 3,
  "Post Graduate": 4,
  "PhD": 5
};

// Returns boolean indicating eligibility and a string array of failed reasons if not eligible
export function verifyJobEligibility(job: Job, profile: UserProfile): { eligible: boolean; reasons: string[] } {
  const reasons: string[] = [];
  
  // 1. Check Age limits with relaxation
  const relaxation = getAgeRelaxation(profile.category);
  const effectiveMaxAge = job.maxAgeGeneral + relaxation;
  if (profile.age < job.minAge) {
    reasons.push(`Minimum age required is ${job.minAge}, you are ${profile.age}.`);
  }
  if (profile.age > effectiveMaxAge) {
    reasons.push(`Maximum age with ${profile.category} relaxation (+${relaxation} years) is ${effectiveMaxAge}, you are ${profile.age}.`);
  }

  // 2. Check academic qualification ranks
  const userRank = QUAL_RANKING[profile.qualification] || 0;
  const jobRank = QUAL_RANKING[job.minQualification] || 0;
  
  if (userRank < jobRank) {
    reasons.push(`Minimum qualification required is ${job.minQualification}, you have configured ${profile.qualification}.`);
  }

  // 3. Technical qualification specific match
  if (job.minQualification === "B.Tech/B.E." && profile.qualification !== "B.Tech/B.E.") {
    // If user has higher PG or PhD but not technical stream, count as mismatch unless stream represents technical field info
    if (profile.stream !== "Computer Science" && profile.stream !== "Mechanical/Civil/Electrical") {
      reasons.push(`Requires active B.Tech/B.E. or technical engineering domain.`);
    }
  }

  // 4. Stream relevance check
  const requiresSpecificStream = job.stream.length > 0 && !job.stream.includes("Any Field") && !job.stream.includes("Any Graduate");
  if (requiresSpecificStream) {
    const streamMatched = job.stream.some(s => {
      if (s === "Computer Science" && profile.stream === "Computer Science") return true;
      if (s === "Mechanical/Civil/Electrical" && profile.stream === "Mechanical/Civil/Electrical") return true;
      if (s === "Science (General)" && (profile.stream === "Science (General)" || profile.stream === "Computer Science")) return true;
      if (s === "Commerce" && profile.stream === "Commerce") return true;
      if (s === "Humanities/Arts" && profile.stream === "Humanities/Arts") return true;
      if (s === "Law" && profile.stream === "Law") return true;
      return false;
    });
    if (!streamMatched) {
      reasons.push(`Requires specialization in ${job.stream.join(", ")}, you specialize in ${profile.stream}.`);
    }
  }

  // 5. Experience years check
  if (profile.experienceYears < job.experienceRequired) {
    reasons.push(`Requires at least ${job.experienceRequired} years of experience, you have ${profile.experienceYears} year(s).`);
  }

  return {
    eligible: reasons.length === 0,
    reasons
  };
}

// Calculate match score out of 100 indicating percentage recommended
export function calculateJobRecommendationScore(job: Job, profile: UserProfile): number {
  const { eligible } = verifyJobEligibility(job, profile);
  if (!eligible) {
    // Highly penalized if ineligible but still provide partial match if age/qualification are close
    return 20;
  }

  let score = 50; // base score for fully eligible

  // Preference matching - Streams
  const matchedStream = job.stream.includes(profile.stream) || job.stream.includes("Any Field") || job.stream.includes("Any Graduate");
  if (matchedStream) score += 15;

  // Prefer state / locations
  const isAllIndia = job.location.toLowerCase().includes("all india") || job.location.toLowerCase().includes("nationwide");
  const isPreferredState = job.location.toLowerCase().includes(profile.statePreference.toLowerCase());
  if (isPreferredState) {
    score += 20;
  } else if (isAllIndia) {
    score += 10;
  }

  // Preferred Roles matching titles
  const matchesPreferredRole = profile.preferredRoles.some(role => 
    job.title.toLowerCase().includes(role.toLowerCase()) || 
    job.agency.toLowerCase().includes(role.toLowerCase())
  );
  if (matchesPreferredRole) {
    score += 15;
  }

  // Cap at 100, min at 30
  return Math.min(100, Math.max(30, score));
}
