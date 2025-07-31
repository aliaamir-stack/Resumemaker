import { type User, type InsertUser, type Resume, type InsertResume, type ResumeVersion, type InsertResumeVersion, type JobAnalysis, type InsertJobAnalysis } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Resumes
  getResume(id: string): Promise<Resume | undefined>;
  getResumesByUser(userId: string): Promise<Resume[]>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: string, updates: Partial<Resume>): Promise<Resume | undefined>;
  deleteResume(id: string): Promise<boolean>;
  getResumeByShareToken(token: string): Promise<Resume | undefined>;

  // Resume Versions
  getResumeVersions(resumeId: string): Promise<ResumeVersion[]>;
  createResumeVersion(version: InsertResumeVersion): Promise<ResumeVersion>;

  // Job Analyses
  getJobAnalyses(resumeId: string): Promise<JobAnalysis[]>;
  createJobAnalysis(analysis: InsertJobAnalysis): Promise<JobAnalysis>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private resumes: Map<string, Resume>;
  private resumeVersions: Map<string, ResumeVersion>;
  private jobAnalyses: Map<string, JobAnalysis>;

  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.resumeVersions = new Map();
    this.jobAnalyses = new Map();
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      fullName: insertUser.fullName || null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Resumes
  async getResume(id: string): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async getResumesByUser(userId: string): Promise<Resume[]> {
    return Array.from(this.resumes.values()).filter(resume => resume.userId === userId);
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = randomUUID();
    const resume: Resume = {
      ...insertResume,
      id,
      template: insertResume.template || 'galaxy',
      isPublic: insertResume.isPublic || false,
      shareToken: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.resumes.set(id, resume);
    return resume;
  }

  async updateResume(id: string, updates: Partial<Resume>): Promise<Resume | undefined> {
    const resume = this.resumes.get(id);
    if (!resume) return undefined;

    const updatedResume = { 
      ...resume, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.resumes.set(id, updatedResume);
    return updatedResume;
  }

  async deleteResume(id: string): Promise<boolean> {
    return this.resumes.delete(id);
  }

  async getResumeByShareToken(token: string): Promise<Resume | undefined> {
    return Array.from(this.resumes.values()).find(resume => resume.shareToken === token);
  }

  // Resume Versions
  async getResumeVersions(resumeId: string): Promise<ResumeVersion[]> {
    return Array.from(this.resumeVersions.values())
      .filter(version => version.resumeId === resumeId)
      .sort((a, b) => b.version - a.version);
  }

  async createResumeVersion(insertVersion: InsertResumeVersion): Promise<ResumeVersion> {
    const id = randomUUID();
    const version: ResumeVersion = {
      ...insertVersion,
      id,
      createdAt: new Date(),
    };
    this.resumeVersions.set(id, version);
    return version;
  }

  // Job Analyses
  async getJobAnalyses(resumeId: string): Promise<JobAnalysis[]> {
    return Array.from(this.jobAnalyses.values())
      .filter(analysis => analysis.resumeId === resumeId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createJobAnalysis(insertAnalysis: InsertJobAnalysis): Promise<JobAnalysis> {
    const id = randomUUID();
    const analysis: JobAnalysis = {
      ...insertAnalysis,
      id,
      createdAt: new Date(),
    };
    this.jobAnalyses.set(id, analysis);
    return analysis;
  }
}

export const storage = new MemStorage();
