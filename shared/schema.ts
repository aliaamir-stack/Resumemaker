import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const resumes = pgTable("resumes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  template: text("template").notNull().default("galaxy"),
  content: jsonb("content").notNull(),
  isPublic: boolean("is_public").default(false),
  shareToken: varchar("share_token"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const resumeVersions = pgTable("resume_versions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  resumeId: varchar("resume_id").notNull().references(() => resumes.id, { onDelete: "cascade" }),
  content: jsonb("content").notNull(),
  version: integer("version").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobAnalyses = pgTable("job_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  resumeId: varchar("resume_id").notNull().references(() => resumes.id, { onDelete: "cascade" }),
  jobDescription: text("job_description").notNull(),
  matchScore: integer("match_score").notNull(),
  suggestions: jsonb("suggestions").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  shareToken: true,
});

export const insertResumeVersionSchema = createInsertSchema(resumeVersions).omit({
  id: true,
  createdAt: true,
});

export const insertJobAnalysisSchema = createInsertSchema(jobAnalyses).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;

export type ResumeVersion = typeof resumeVersions.$inferSelect;
export type InsertResumeVersion = z.infer<typeof insertResumeVersionSchema>;

export type JobAnalysis = typeof jobAnalyses.$inferSelect;
export type InsertJobAnalysis = z.infer<typeof insertJobAnalysisSchema>;

// Resume content schema
export const resumeContentSchema = z.object({
  personalInfo: z.object({
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    linkedin: z.string().optional(),
    summary: z.string().optional(),
  }),
  experience: z.array(z.object({
    id: z.string(),
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
    description: z.string(),
    achievements: z.array(z.string()).default([]),
  })).default([]),
  education: z.array(z.object({
    id: z.string(),
    institution: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    gpa: z.string().optional(),
    description: z.string().optional(),
  })).default([]),
  skills: z.array(z.object({
    id: z.string(),
    category: z.string(),
    items: z.array(z.string()),
  })).default([]),
  projects: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()).default([]),
    link: z.string().optional(),
    github: z.string().optional(),
  })).default([]),
  certifications: z.array(z.object({
    id: z.string(),
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
    expiryDate: z.string().optional(),
    credentialId: z.string().optional(),
  })).default([]),
});

export type ResumeContent = z.infer<typeof resumeContentSchema>;
