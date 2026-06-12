export interface SubPost {
  id: string;
  title: string;
  minQualification: "10th Pass" | "12th Pass" | "Graduate" | "Post Graduate" | "PhD" | "B.Tech/B.E." | "Any Graduate" | "Graduate/12th Pass";
  stream: string[]; // e.g. ["Commerce", "Any Field", "Agriculture"]
  minAge: number;
  maxAgeGeneral: number;
  totalVacancies: number;
  salaryMin?: number;
  salaryMax?: number;
  experienceRequired?: number;
  experienceIndustry?: string; // e.g., "Banking", "Law", "Marketing", "Designing", "Real Estate/Banking", "any industry"
  description?: string;
  typingRequired?: boolean;
  typingSpeedRequired?: number; // e.g. 40
  languagesRequired?: string[];
}

export interface Job {
  id: string;
  title: string;
  agency: string;
  category: "Central" | "State" | "PSU" | "Defence" | "Banking" | "Railway";
  location: string;
  salaryMin?: number; // monthly in INR (optional)
  salaryMax?: number; // monthly in INR (optional)
  salaryNotSpecified?: boolean;
  postedDate: string; // YYYY-MM-DD
  closingDate: string; // YYYY-MM-DD
  minQualification: "10th Pass" | "12th Pass" | "Graduate" | "Post Graduate" | "PhD" | "B.Tech/B.E." | "Any Graduate" | "Graduate/12th Pass";
  stream: string[]; // e.g. ["Any Selection", "Computer Science", "Engineering", "Commerce", "Science", "Humanities", "Agriculture"]
  minAge: number;
  maxAgeGeneral: number;
  experienceRequired: number; // in years
  experienceIndustry?: string;
  totalVacancies: number;
  notificationId: string; // e.g., UPSC-2026-CSE-01
  description: string;
  selectionProcess: string[];
  examDate?: string;
  officialLink: string;
  pdfLink?: string;
  featured?: boolean;
  examFeeGeneral: number;
  examFeeReserved: number;
  subPosts?: SubPost[];
  languagesRequired?: string[];
  typingRequired?: boolean;
  typingSpeedRequired?: number;
}

export interface UserProfile {
  fullName: string;
  email: string;
  dob: string; // YYYY-MM-DD
  age: number;
  qualification: "10th Pass" | "12th Pass" | "Graduate" | "Post Graduate" | "PhD" | "B.Tech/B.E." | "Any Graduate" | "Graduate/12th Pass";
  stream: string; // "Computer Science" | "Mechanical/Civil/Electrical" | "Science (General)" | "Commerce" | "Humanities/Arts" | "Law" | "Agriculture" | "Any Field"
  experienceYears: number;
  experienceIndustry?: string; // "Banking" | "Law" | "Marketing" | "Designing" | "Real Estate" | "Any" | "Other"
  typingSpeed?: number; // e.g. 40 wpm
  category: "General" | "OBC" | "SC" | "ST" | "EWS" | "PwD";
  statePreference: string;
  preferredRoles: string[];
  languagesKnown?: string[];
  additionalExperiences?: Array<{ id: string; years: number; industry: string }>;
}

export interface JobApplication {
  jobId: string;
  status: string;
  appliedDate: string;
  notes?: string;
}

export interface NotificationAlert {
  id: string;
  title: string;
  date: string;
  jobId?: string;
  type: "Urgent" | "Latest" | "Admit Card" | "Result";
  description: string;
}
