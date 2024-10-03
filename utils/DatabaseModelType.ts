export interface LeetcodeProfileType {
  id: number;
  username: string;
  name: string;
  avatar?: string;
  ranking?: number;
  reputation?: number;
  gitHub?: string;
  linkedIn?: string;
  twitter?: string;
  website: string[];
  country?: string;
  company?: string;
  school?: string;
  skillTags: string[];
  about?: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  recentSubmissions: any; // Assuming Json type can be any valid JSON
  createdAt: Date;
}
