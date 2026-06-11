export interface Job {
  id: string;
  title: string;
  agency: string;
  category: "Central" | "State" | "PSU" | "Defence" | "Banking" | "Railway";
  location: string;
  salaryMin: number; // monthly in INR
  salaryMax: number; // monthly in INR
  postedDate: string; // YYYY-MM-DD
  closingDate: string; // YYYY-MM-DD
  minQualification: "10th Pass" | "12th Pass" | "Graduate" | "Post Graduate" | "PhD" | "B.Tech/B.E." | "Any Graduate";
  stream: string[]; // e.g. ["Any Selection", "Computer Science", "Engineering", "Commerce", "Science", "Humanities"]
  minAge: number;
  maxAgeGeneral: number;
  experienceRequired: number; // in years
  totalVacancies: number;
  notificationId: string; // e.g., UPSC-2026-CSE-01
  description: string;
  selectionProcess: string[];
  examDate?: string;
  officialLink: string;
  featured?: boolean;
  examFeeGeneral: number;
  examFeeReserved: number;
}

export interface UserProfile {
  fullName: string;
  email: string;
  dob: string; // YYYY-MM-DD
  age: number;
  qualification: "10th Pass" | "12th Pass" | "Graduate" | "Post Graduate" | "PhD" | "B.Tech/B.E." | "Any Graduate";
  stream: string; // "Computer Science" | "Mechanical/Civil/Electrical" | "Science (General)" | "Commerce" | "Humanities/Arts" | "Law" | "Any Field"
  experienceYears: number;
  category: "General" | "OBC" | "SC" | "ST" | "EWS" | "PwD";
  statePreference: string;
  preferredRoles: string[];
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
