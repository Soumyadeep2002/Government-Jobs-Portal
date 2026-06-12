import { Job, NotificationAlert, UserProfile } from "./types";

// Current simulated date: 2026-06-10

export const INITIAL_USER_PROFILE: UserProfile = {
  fullName: "Sourabh Sharma",
  email: "sourabh.sharma@gmail.com",
  dob: "2001-08-15", // Age 24 on June 10, 2026
  age: 24,
  qualification: "Graduate",
  stream: "Commerce",
  experienceYears: 7,
  experienceIndustry: "Banking",
  typingSpeed: 40,
  category: "OBC", // Entitled to +3 years relaxation
  statePreference: "New Delhi",
  preferredRoles: ["Administrative Officer", "Branch Manager", "General Manager"],
  languagesKnown: ["English", "Hindi"],
  additionalExperiences: []
};

export const MOCK_NOTIFICATIONS: NotificationAlert[] = [
  {
    id: "notif-nabard-sis-2026",
    title: "NABARD Student Internship Scheme (SIS) 2026-27",
    date: "2026-06-10",
    jobId: "nabard-sis-internship-2026",
    type: "Latest",
    description: "NABARD has announced the prestigious Student Internship Scheme (SIS) for 2026-27 offering monthly stipend and allowances."
  },
  {
    id: "notif-nalco-non-executive-2026",
    title: "NALCO Non-Executive Recruitment 2026",
    date: "2026-06-12",
    jobId: "nalco-non-executive-recruitment-2026",
    type: "Latest",
    description: "National Aluminium Company Limited (NALCO) has opened online registrations for various Non-Executive positions."
  },
  {
    id: "notif-coal-india-mt-2026",
    title: "Coal India Limited Management Trainees Recruitment 2026",
    date: "2026-06-11",
    jobId: "coal-india-management-trainee-recruitment-2026",
    type: "Latest",
    description: "Coal India Limited has announced the openings for 660 Management Trainee vacancies across technical and administrative fields."
  },
  {
    id: "notif-cbi-apprentice-2026",
    title: "Central Bank of India Apprentice Engagement FY 2026-27",
    date: "2026-06-06",
    jobId: "job-cbi-apprentice-2026",
    type: "Latest",
    description: "Central Bank of India has published the formal notification for selecting 3,000 corporate apprentice trainees under the Apprentices Act, 1961."
  },
  {
    id: "notif-pune-peoples-bank",
    title: "Pune People's Bank Clerks & Officers Recruitment",
    date: "2026-06-08",
    jobId: "job-pune-peoples-bank",
    type: "Latest",
    description: "Pune People's Co-operative Bank Ltd. has released a detailed careers advertisement for junior clerk and officer positions."
  },
  {
    id: "notif-ssc-dept-ldce",
    title: "New Promotion Notice: SSC Grade 'C' Stenographer LDCE",
    date: "2026-06-05",
    jobId: "job-ssc-dept-ldce",
    type: "Latest",
    description: "SSC has released the Limited Departmental Competitive Examination (LDCE) scheme and syllabus guidelines for Central Secretariat Service promotions."
  },
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
    id: "job-cbi-apprentice-2026",
    title: "Engagement of Apprentices (F.Y. 2026-27)",
    agency: "Central Bank of India",
    category: "Banking",
    location: "All India (Zonal/District Branches)",
    salaryMin: 15000,
    salaryMax: 15000,
    postedDate: "2026-06-06",
    closingDate: "2026-07-06",
    minQualification: "Graduate",
    stream: ["Any Field", "Commerce", "Science (General)", "Computer Science", "Humanities/Arts", "Law"],
    minAge: 20,
    maxAgeGeneral: 28,
    experienceRequired: 0,
    totalVacancies: 3000,
    notificationId: "CBI-APP-2026-27",
    description: "Notification for the Engagement of Apprentices under the Apprentices Act, 1961 for F.Y. 2026-27. Candidate should have a Graduate degree in any discipline from a recognized University or equivalent. Active registration on the Apprenticeship portal is required. Training duration is 12 months with a monthly stipend of ₹15,000.",
    selectionProcess: [
      "Written Online Examination (Objective type - Quant, Reasoning, English, General Awareness, Computer Knowledge)",
      "Local Language Vetting Test / Proof (Candidate must be proficient in local language of selected state)",
      "Document Verification & Medical Fitness Certification"
    ],
    officialLink: "https://centralbank.bank.in/en/recruitments",
    pdfLink: "https://cache.careers360.mobi/media/uploads/froala_editor/files/Notification-for-the-Engagement-of-Apprentices.pdf",
    featured: true,
    examFeeGeneral: 800,
    examFeeReserved: 600
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
    pdfLink: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf",
    featured: true,
    examFeeGeneral: 100,
    examFeeReserved: 0
  },
  {
    id: "job-ssc-dept-ldce",
    title: "Grade 'C' Junior Secretariat Assistant / Lower Division Clerk",
    agency: "Staff Selection Commission (SSC)",
    category: "Central",
    location: "New Delhi (Central Secretariat)",
    salaryMin: 19900,
    salaryMax: 63200,
    postedDate: "2026-06-05",
    closingDate: "2026-06-26",
    minQualification: "Graduate/12th Pass",
    stream: ["Any Field", "Commerce", "Science (General)", "Computer Science", "Humanities/Arts", "Law"],
    minAge: 18,
    maxAgeGeneral: 50,
    experienceRequired: 3,
    totalVacancies: 227,
    notificationId: "SSC-LDCE-2026-STENO",
    description: "The SSC Senior Secretariat Assistant (SSA) / Upper Division Clerk (UDC) LDCE is a Limited Departmental Competitive Examination conducted by the Staff Selection Commission. It is strictly an internal promotion exam for eligible central government employees to advance their careers, rather than an open recruitment for the general public",
    selectionProcess: [
      "Competitive Paper-1 objective evaluation (English comprehension, General awareness)",
      "Noting, Drafting & Office Procedure (Conventional type)"
    ],
    examDate: "2026-09-05",
    officialLink: "https://ssc.gov.in",
    pdfLink: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/departmental_notice_05062026.pdf",
    featured: true,
    examFeeGeneral: 100,
    examFeeReserved: 0
  },
  {
    id: "job-pune-peoples-bank",
    title: "General Manager, Branch Manager & Assistant Officer Openings",
    agency: "Pune People's Co-operative Bank Ltd.",
    category: "Banking",
    location: "Pune, Maharashtra",
    salaryNotSpecified: true,
    postedDate: "2026-06-08",
    closingDate: "2026-06-30",
    minQualification: "Graduate",
    stream: ["Commerce", "Any Field", "Law", "Computer Science"],
    minAge: 20,
    maxAgeGeneral: 45,
    experienceRequired: 0,
    totalVacancies: 33,
    notificationId: "PPCBL-REC-2026-06",
    description: "Detailed recruitment advertisement for various executive, managerial, and clerical positions across Pune People's Co-operative Bank Ltd. The selection comprises 12 distinct functional designations. Eligible applicants can apply based on post-specific age limits and academic streams.",
    selectionProcess: [
      "Not Available in primary PDF advertisement. Please refer to official application guidelines."
    ],
    officialLink: "https://www.punepeoples.bank.in",
    pdfLink: "https://www.punepeoples.bank.in/assets/careers/Required_20260608.pdf",
    featured: true,
    examFeeGeneral: 0,
    examFeeReserved: 0,
    subPosts: [
      {
        id: "ppcb-gm",
        title: "General Manager",
        minQualification: "Graduate",
        stream: ["Commerce", "Any Field"],
        minAge: 20,
        maxAgeGeneral: 45,
        totalVacancies: 2,
        experienceRequired: 10,
        experienceIndustry: "Banking",
        description: "Requires at least 10 years of experience in the Banking industry."
      },
      {
        id: "ppcb-dgm",
        title: "Dy. General Manager",
        minQualification: "Graduate",
        stream: ["Commerce", "Any Field"],
        minAge: 20,
        maxAgeGeneral: 45,
        totalVacancies: 4,
        experienceRequired: 7,
        experienceIndustry: "Banking",
        description: "Requires at least 7 years of experience in the Banking industry."
      },
      {
        id: "ppcb-dgm-law",
        title: "Deputy General Manager- (Chief Law Officer)",
        minQualification: "Graduate",
        stream: ["Law"],
        minAge: 20,
        maxAgeGeneral: 45,
        totalVacancies: 1,
        experienceRequired: 15,
        experienceIndustry: "Law",
        description: "Requires a minimum of 15 years of court experience (Law)."
      },
      {
        id: "ppcb-agm",
        title: "Assistant General Manager",
        minQualification: "Graduate",
        stream: ["Commerce", "Any Field"],
        minAge: 20,
        maxAgeGeneral: 45,
        totalVacancies: 4,
        experienceRequired: 7,
        experienceIndustry: "Banking",
        description: "Requires at least 7 years of experience in the Banking industry."
      },
      {
        id: "ppcb-agm-inv",
        title: "Assistant General Manager (Investment)",
        minQualification: "Graduate",
        stream: ["Commerce"],
        minAge: 20,
        maxAgeGeneral: 45,
        totalVacancies: 1,
        experienceRequired: 7,
        experienceIndustry: "Banking",
        description: "Requires at least 7 years of experience in the Banking industry (Investment/Treasury specialty)."
      },
      {
        id: "ppcb-bm",
        title: "Branch Manager",
        minQualification: "Graduate",
        stream: ["Commerce", "Any Field"],
        minAge: 20,
        maxAgeGeneral: 45,
        totalVacancies: 10,
        experienceRequired: 7,
        experienceIndustry: "Banking",
        description: "Requires a minimum of 7 years of experience in the Banking industry."
      },
      {
        id: "ppcb-bm-sec",
        title: "Branch Manager (Board Secretary)",
        minQualification: "Graduate",
        stream: ["Law", "Commerce", "Any Field"],
        minAge: 20,
        maxAgeGeneral: 45,
        totalVacancies: 1,
        experienceRequired: 5,
        experienceIndustry: "any industry",
        description: "Requires at least 5 years of secretarial or executive experience in any industry."
      },
      {
        id: "ppcb-bm-estate",
        title: "Branch Manager (Estate Manager)",
        minQualification: "Graduate",
        stream: ["Any Field"],
        minAge: 20,
        maxAgeGeneral: 45,
        totalVacancies: 1,
        experienceRequired: 5,
        experienceIndustry: "Real Estate/Banking",
        description: "Requires a minimum of 5 years of experience in either Real Estate or Banking, or both."
      },
      {
        id: "ppcb-bm-legal",
        title: "Branch Manager (Legal Officer)",
        minQualification: "Graduate",
        stream: ["Law"],
        minAge: 20,
        maxAgeGeneral: 45,
        totalVacancies: 3,
        experienceRequired: 10,
        experienceIndustry: "Law",
        description: "Requires at least 10 years of professional experience in Law."
      },
      {
        id: "ppcb-abm-mkt",
        title: "Assistant Branch Managers (Marketing)",
        minQualification: "Graduate",
        stream: ["Any Field", "Commerce", "Humanities/Arts"],
        minAge: 20,
        maxAgeGeneral: 45,
        totalVacancies: 2,
        experienceRequired: 2,
        experienceIndustry: "Marketing",
        description: "Requires a minimum of 2 years of experience in Marketing."
      },
      {
        id: "ppcb-abm-gd",
        title: "Assistant Branch Managers (Graphic Designer)",
        minQualification: "Graduate",
        stream: ["Any Field", "Computer Science"],
        minAge: 20,
        maxAgeGeneral: 35,
        totalVacancies: 2,
        experienceRequired: 1,
        experienceIndustry: "Designing",
        description: "Requires a minimum of 1 year of professional experience in Designing."
      },
      {
        id: "ppcb-abm-st",
        title: "Assistant Branch Managers(Steno/ Typist)",
        minQualification: "Graduate",
        stream: ["Any Field"],
        minAge: 20,
        maxAgeGeneral: 35,
        totalVacancies: 2,
        typingRequired: true,
        typingSpeedRequired: 40,
        experienceRequired: 2,
        experienceIndustry: "Banking",
        description: "Requires at least 2 years of experience in the Banking industry with a typing speed of 40 wpm."
      }
    ]
  },
  {
    id: "coal-india-management-trainee-recruitment-2026",
    title: "Recruitment of Management Trainees (MT)",
    agency: "Coal India Limited",
    category: "Central",
    location: "All India (Transferable)",
    salaryMin: 60000,
    salaryMax: 180000,
    postedDate: "2026-05-05",
    closingDate: "2026-06-11",
    minQualification: "Graduate",
    stream: ["Engineering", "Computer Science", "Science (General)", "Humanities/Arts", "Any Field"],
    minAge: 18,
    maxAgeGeneral: 30,
    experienceRequired: 0,
    totalVacancies: 660,
    notificationId: "Advertisement No. 03/2026",
    description: "Coal India Limited invites online applications from energetic and promising candidates for the recruitment of Management Trainees in E-1 grade. Recruitment offers excellent research and operational career growth within a premier public sector undertaking.",
    selectionProcess: [
      "Computer Based Online Test (CBT)",
      "Document Verification (DV)",
      "Initial Medical Examination (IME)"
    ],
    officialLink: "https://cdn.digialm.com/EForms/configuredHtml/1258/97495/Index.html",
    pdfLink: "https://g03.tcsion.com//per/g03/pub/726/EForms/image/ImageDocUpload/71161/5/1501287760.pdf",
    featured: true,
    examFeeGeneral: 1180,
    examFeeReserved: 0
  },
  {
    id: "nalco-non-executive-recruitment-2026",
    title: "Recruitment of Non-Executive Posts",
    agency: "National Aluminium Company Limited (NALCO)",
    category: "PSU",
    location: "Odisha / Pan India",
    salaryMin: 29500,
    salaryMax: 90000,
    postedDate: "2026-05-14",
    closingDate: "2026-06-15",
    minQualification: "Graduate/12th Pass",
    stream: ["Engineering", "Science", "Any Field", "Commerce"],
    minAge: 18,
    maxAgeGeneral: 30,
    experienceRequired: 0,
    totalVacancies: 189,
    notificationId: "Advt. No. Code 10260213",
    description: "National Aluminium Company Limited (NALCO) invites online applications for various Non-Executive positions. Selected trainees have career paths in production, maintenance, and finance.",
    selectionProcess: [
      "Written Test (Computer Based Online Test - CBT covering Quant, reasoning, general knowledge)",
      "Trade Test / Skill Test (where applicable based on discipline)",
      "Document Verification & Pre-Employment Medical Examination"
    ],
    officialLink: "https://ibpsreg.ibps.in/nalconeapr26/",
    pdfLink: "https://mudira.nalcoindia.co.in/iorms/Uploaded_Data/Advertisement/639144655968105605_Final%20Adv%2010260213%2014%20May2026.pdf",
    featured: true,
    examFeeGeneral: 100,
    examFeeReserved: 0
  },
  {
    id: "nabard-sis-internship-2026",
    title: "Student Internship Scheme (SIS) 2026-27",
    agency: "National Bank for Agriculture and Rural Development (NABARD)",
    category: "Banking",
    location: "Mumbai (Head Office) / Pan India (Regional Offices)",
    salaryMin: 20000,
    salaryMax: 20000,
    postedDate: "2026-06-10",
    closingDate: "2026-06-16",
    minQualification: "Graduate",
    stream: ["Agriculture", "Commerce", "Humanities/Arts", "Science (General)", "Any Field"],
    minAge: 18,
    maxAgeGeneral: 35,
    experienceRequired: 0,
    totalVacancies: 39,
    notificationId: "NABARD Student Internship Scheme (SIS) 2026-27",
    description: "NABARD invites applications for the Student Internship Scheme (SIS) 2026-27 from PG/PGDM students (completing 1st year) or 5-year Integrated course students (completing 4th year) in Agriculture, Allied Disciplines (Veterinary, Fisheries, etc.), Agri-business, Economics, Agri-economics, Social Sciences, and Management. Indian students studying abroad are also eligible. Selected interns must study one of these five NABARD interventions: (a) Women Farmers in Indian Agriculture: Opportunities, Issues & Way Forward, (b) PACS Computerization Operational Efficiency, (c) FPOs Impact Assessment, Sustainability & Market Linkage, (d) Impact of GI Registration - Post registration opportunities & challenges, or (e) Rural Women Entrepreneurs migrating from SHG to Individual Venture. Remuneration includes a ₹20,000/month stipend (for 8 to 12 weeks), Field Visit Allowance of ₹2,000/day (NER States) or ₹1,500/day (other states) for up to 30 days, Travel Allowance of up to ₹6,000, and Miscellaneous Expenses of ₹2,000 on declaration basis.",
    selectionProcess: [
      "Shortlisting for interview on the basis of a weighted score system based on marks in 10th, 12th, and Graduation.",
      "Final selection is solely on the basis of the personal interview performance (tentatively completed by June 22, 2026)."
    ],
    officialLink: "https://forms.gle/y5j9Ad1CQWLpzRRN8",
    pdfLink: "https://www.nabard.org/auth/writereaddata/WhatsNew/pub_1006260942621858.pdf?csrt=9162878479887398804",
    featured: true,
    examFeeGeneral: 0,
    examFeeReserved: 0,
    subPosts: [
      {
        id: "nabard-sis-ho",
        title: "Head Office Intern (Mumbai)",
        minQualification: "Graduate",
        stream: ["Agriculture", "Commerce", "Humanities/Arts", "Science (General)", "Any Field"],
        minAge: 18,
        maxAgeGeneral: 35,
        totalVacancies: 5,
        salaryMin: 20000,
        salaryMax: 20000,
        experienceRequired: 0,
        description: "Open to eligible students across the entire country. Stationed at the Head Office in Mumbai."
      },
      {
        id: "nabard-sis-ro-te",
        title: "Regional Office (RO) / Training Establishment (TE) Intern",
        minQualification: "Graduate",
        stream: ["Agriculture", "Commerce", "Humanities/Arts", "Science (General)", "Any Field"],
        minAge: 18,
        maxAgeGeneral: 35,
        totalVacancies: 34,
        salaryMin: 20000,
        salaryMax: 20000,
        experienceRequired: 0,
        description: "Exactly 01 seat allocated per RO/TE. Applicants must be either pursuing their PG/integrated degree from that State or be an ordinary resident (belong to) that State."
      }
    ]
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
  "Graduate/12th Pass": 2,
  "Graduate/12th pass": 2,
  "Post Graduate": 4,
  "PhD": 5
};

export function isIndustryEligible(requiredIndustry: string | undefined, candidateIndustry: string | undefined): boolean {
  if (!candidateIndustry || candidateIndustry === "All" || candidateIndustry.toLowerCase() === "all" || candidateIndustry.toLowerCase() === "any industry" || candidateIndustry.toLowerCase() === "any") return true;
  if (!requiredIndustry || requiredIndustry.trim() === "" || requiredIndustry.toLowerCase() === "any industry" || requiredIndustry.toLowerCase() === "any") {
    return true; // No specific requirement, shown irrespective of filter selected
  }
  
  const req = requiredIndustry.toLowerCase();
  const cand = candidateIndustry.toLowerCase();
  
  if (req === cand) return true;
  
  // Custom check for Real Estate/Banking
  if (req.includes("real estate") && req.includes("banking")) {
    if (cand === "banking" || cand === "real estate") return true;
  }
  
  return false;
}

export function getExperienceYearsForIndustry(requiredIndustry: string | undefined, profile: UserProfile): number {
  let total = 0;
  
  // Checking primary experience
  if (isIndustryEligible(requiredIndustry, profile.experienceIndustry)) {
    total += profile.experienceYears;
  }
  
  // Checking additional experiences
  if (profile.additionalExperiences && profile.additionalExperiences.length > 0) {
    for (const exp of profile.additionalExperiences) {
      if (isIndustryEligible(requiredIndustry, exp.industry)) {
        total += exp.years;
      }
    }
  }
  
  return total;
}

export function verifySubPostEligibility(subPost: any, profile: UserProfile, ignoreExperience?: boolean): { eligible: boolean; reasons: string[] } {
  const reasons: string[] = [];
  
  // 1. Age check
  const relaxation = getAgeRelaxation(profile.category);
  const effectiveMaxAge = subPost.maxAgeGeneral + relaxation;
  if (profile.age < subPost.minAge) {
    reasons.push(`Min age required is ${subPost.minAge}, you are ${profile.age}.`);
  }
  if (profile.age > effectiveMaxAge) {
    reasons.push(`Max age with relaxation (+${relaxation} yrs) is ${effectiveMaxAge}, you are ${profile.age}.`);
  }

  // 2. Qual Rank check
  const userRank = QUAL_RANKING[profile.qualification] || 0;
  const subRank = QUAL_RANKING[subPost.minQualification as keyof typeof QUAL_RANKING] || 0;
  if (userRank < subRank) {
    reasons.push(`Req: ${subPost.minQualification}, you have ${profile.qualification}.`);
  }

  // 3. Tech check
  if (subPost.minQualification === "B.Tech/B.E." && profile.qualification !== "B.Tech/B.E.") {
    if (profile.stream !== "Computer Science" && profile.stream !== "Mechanical/Civil/Electrical") {
      reasons.push(`Requires professional B.Tech/B.E. degree.`);
    }
  }

  // 4. Stream check
  const requiresSpecificStream = subPost.stream.length > 0 && !subPost.stream.includes("Any Field") && !subPost.stream.includes("Any Graduate");
  if (requiresSpecificStream) {
    const streamMatched = subPost.stream.some((s: string) => {
      if (s === "Computer Science" && profile.stream === "Computer Science") return true;
      if (s === "Mechanical/Civil/Electrical" && profile.stream === "Mechanical/Civil/Electrical") return true;
      if (s === "Science (General)" && (profile.stream === "Science (General)" || profile.stream === "Computer Science")) return true;
      if (s === "Commerce" && profile.stream === "Commerce") return true;
      if (s === "Humanities/Arts" && profile.stream === "Humanities/Arts") return true;
      if (s === "Law" && profile.stream === "Law") return true;
      if (s === "Agriculture" && profile.stream === "Agriculture") return true;
      return false;
    });
    if (!streamMatched) {
      reasons.push(`Req Stream: ${subPost.stream.join(", ")}, you have ${profile.stream}.`);
    }
  }

  // 5. Experience
  const expNeeded = subPost.experienceRequired || 0;
  const requiredIndustry = subPost.experienceIndustry;

  if (!ignoreExperience && expNeeded > 0) {
    const candidateExpForSubPost = getExperienceYearsForIndustry(requiredIndustry, profile);
    if (candidateExpForSubPost < expNeeded) {
      reasons.push(`Req ${expNeeded} yrs of ${requiredIndustry || "any"} experience, you have ${candidateExpForSubPost} yrs total.`);
    }
  }

  // Typing Speed Check
  if (subPost.typingRequired && subPost.typingSpeedRequired) {
    const userSpeed = profile.typingSpeed || 0;
    if (userSpeed < subPost.typingSpeedRequired) {
      reasons.push(`Req speed ${subPost.typingSpeedRequired} wpm, you have ${userSpeed} wpm.`);
    }
  }

  // Languages Required Check
  if (subPost.languagesRequired && subPost.languagesRequired.length > 0) {
    const userLanguages = profile.languagesKnown || [];
    const hasRequiredLanguage = subPost.languagesRequired.some(jl => 
      userLanguages.some(ul => ul.toLowerCase().trim() === jl.toLowerCase().trim())
    );
    if (!hasRequiredLanguage) {
      reasons.push(`Requires language proficiency in: ${subPost.languagesRequired.join(", ")}, you configured: ${userLanguages.join(", ") || "None"}.`);
    }
  }

  return {
    eligible: reasons.length === 0,
    reasons
  };
}

// Returns boolean indicating eligibility and a string array of failed reasons if not eligible
export function verifyJobEligibility(job: Job, profile: UserProfile, ignoreExperience?: boolean): { eligible: boolean; reasons: string[] } {
  // If the job has sub-posts, user is eligible for the overarching job if eligible for AT LEAST ONE subPost!
  if (job.subPosts && job.subPosts.length > 0) {
    const eligibleSubposts = job.subPosts.filter(sp => verifySubPostEligibility(sp, profile, ignoreExperience).eligible);
    if (eligibleSubposts.length > 0) {
      return { eligible: true, reasons: [] };
    } else {
      const allReasons = job.subPosts.map(sp => {
        const check = verifySubPostEligibility(sp, profile, ignoreExperience);
        return `[${sp.title}]: ${check.reasons.join(", ")}`;
      });
      return {
        eligible: false,
        reasons: ["Does not match criteria for any sub-posts:", ...allReasons]
      };
    }
  }

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
      if (s === "Agriculture" && profile.stream === "Agriculture") return true;
      return false;
    });
    if (!streamMatched) {
      reasons.push(`Requires specialization in ${job.stream.join(", ")}, you specialize in ${profile.stream}.`);
    }
  }

  // 5. Experience years check
  if (!ignoreExperience && job.experienceRequired > 0) {
    const candidateExpForJob = getExperienceYearsForIndustry(job.experienceIndustry, profile);
    if (candidateExpForJob < job.experienceRequired) {
      reasons.push(`Requires at least ${job.experienceRequired} years of ${job.experienceIndustry || "any"} experience, you have ${candidateExpForJob} year(s) matching.`);
    }
  }

  // Languages Required Check
  if (job.languagesRequired && job.languagesRequired.length > 0) {
    const userLanguages = profile.languagesKnown || [];
    const hasRequiredLanguage = job.languagesRequired.some(jl => 
      userLanguages.some(ul => ul.toLowerCase().trim() === jl.toLowerCase().trim())
    );
    if (!hasRequiredLanguage) {
      reasons.push(`Requires language proficiency in: ${job.languagesRequired.join(", ")}, you configured: ${userLanguages.join(", ") || "None"}.`);
    }
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
