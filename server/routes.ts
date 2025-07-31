import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { verifySupabaseToken } from "./lib/supabase";
import { enhanceResumeSection, analyzeJobMatch, generateCoverLetter, generateAchievements } from "./lib/openai";
import { insertUserSchema, insertResumeSchema, insertJobAnalysisSchema, resumeContentSchema, type User } from "@shared/schema";
import { z } from "zod";

// Extend Request interface to include user
interface AuthenticatedRequest extends Request {
  user: User;
}

// Middleware to verify authentication
async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  const user = await verifySupabaseToken(token);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Find or create user in our storage
  let dbUser = await storage.getUserByEmail(user.email!);
  if (!dbUser) {
    dbUser = await storage.createUser({
      email: user.email!,
      fullName: user.user_metadata?.full_name || null,
    });
  }

  (req as AuthenticatedRequest).user = dbUser;
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/user", requireAuth, async (req: AuthenticatedRequest, res) => {
    res.json(req.user);
  });

  // Resume routes
  app.get("/api/resumes", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const resumes = await storage.getResumesByUser(req.user.id);
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  app.get("/api/resumes/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const resume = await storage.getResume(req.params.id);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      if (resume.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      res.json(resume);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resume" });
    }
  });

  app.post("/api/resumes", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const resumeData = insertResumeSchema.parse({
        ...req.body,
        userId: req.user.id,
      });
      const resume = await storage.createResume(resumeData);
      res.json(resume);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid resume data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create resume" });
    }
  });

  app.put("/api/resumes/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const resume = await storage.getResume(req.params.id);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      if (resume.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updates = req.body;
      const updatedResume = await storage.updateResume(req.params.id, updates);
      res.json(updatedResume);
    } catch (error) {
      res.status(500).json({ message: "Failed to update resume" });
    }
  });

  app.delete("/api/resumes/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const resume = await storage.getResume(req.params.id);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      if (resume.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      await storage.deleteResume(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete resume" });
    }
  });

  // Public resume sharing
  app.get("/api/share/:token", async (req, res) => {
    try {
      const resume = await storage.getResumeByShareToken(req.params.token);
      if (!resume || !resume.isPublic) {
        return res.status(404).json({ message: "Resume not found or not public" });
      }
      res.json(resume);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch shared resume" });
    }
  });

  // AI Enhancement routes
  app.post("/api/ai/enhance", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const { section, content } = req.body;
      if (!section || !content) {
        return res.status(400).json({ message: "Section and content are required" });
      }

      const result = await enhanceResumeSection(section, content);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to enhance content" });
    }
  });

  app.post("/api/ai/achievements", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const { role, company, responsibilities } = req.body;
      if (!role || !responsibilities) {
        return res.status(400).json({ message: "Role and responsibilities are required" });
      }

      const achievements = await generateAchievements(role, company || "", responsibilities);
      res.json({ achievements });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate achievements" });
    }
  });

  // Job matching
  app.post("/api/job-match", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const { resumeId, jobDescription } = req.body;
      if (!resumeId || !jobDescription) {
        return res.status(400).json({ message: "Resume ID and job description are required" });
      }

      const resume = await storage.getResume(resumeId);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      if (resume.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const analysis = await analyzeJobMatch(resume.content, jobDescription);
      
      // Save the analysis
      const jobAnalysis = await storage.createJobAnalysis({
        resumeId,
        jobDescription,
        matchScore: analysis.matchScore,
        suggestions: analysis as any,
      });

      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze job match" });
    }
  });

  // Cover letter generation
  app.post("/api/cover-letter", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const { resumeId, jobDescription, companyName } = req.body;
      if (!resumeId || !jobDescription) {
        return res.status(400).json({ message: "Resume ID and job description are required" });
      }

      const resume = await storage.getResume(resumeId);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      if (resume.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const coverLetter = await generateCoverLetter(resume.content, jobDescription, companyName || "");
      res.json({ coverLetter });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate cover letter" });
    }
  });

  // Resume versions
  app.get("/api/resumes/:id/versions", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const resume = await storage.getResume(req.params.id);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      if (resume.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const versions = await storage.getResumeVersions(req.params.id);
      res.json(versions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch versions" });
    }
  });

  app.post("/api/resumes/:id/versions", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const resume = await storage.getResume(req.params.id);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      if (resume.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const versions = await storage.getResumeVersions(req.params.id);
      const nextVersion = Math.max(0, ...versions.map(v => v.version)) + 1;

      const version = await storage.createResumeVersion({
        resumeId: req.params.id,
        content: resume.content as any,
        version: nextVersion,
      });

      res.json(version);
    } catch (error) {
      res.status(500).json({ message: "Failed to create version" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
