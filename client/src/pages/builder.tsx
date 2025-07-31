import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ResumeBuilder } from "@/components/resume/resume-builder";
import { authenticatedRequest, getCurrentUser } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { type ResumeContent } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Builder() {
  const params = useParams();
  const [location, setLocation] = useLocation();
  const resumeId = params.id;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check authentication
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['/api/auth/user'],
    queryFn: async () => {
      const response = await authenticatedRequest('POST', '/api/auth/user');
      return response.json();
    },
    retry: false,
  });

  // Fetch existing resume if editing
  const { data: resume, isLoading: resumeLoading } = useQuery({
    queryKey: ['/api/resumes', resumeId],
    queryFn: async () => {
      if (!resumeId) return null;
      const response = await authenticatedRequest('GET', `/api/resumes/${resumeId}`);
      return response.json();
    },
    enabled: !!resumeId && !!user,
  });

  // Create new resume mutation
  const createMutation = useMutation({
    mutationFn: async ({ content, template }: { content: ResumeContent; template: string }) => {
      const response = await authenticatedRequest('POST', '/api/resumes', {
        title: content.personalInfo.fullName 
          ? `${content.personalInfo.fullName}'s Resume` 
          : 'Untitled Resume',
        template,
        content,
        isPublic: false,
      });
      return response.json();
    },
    onSuccess: (newResume) => {
      queryClient.invalidateQueries({ queryKey: ['/api/resumes'] });
      toast({
        title: "Resume created! ✨",
        description: "Your new cosmic resume has been created successfully.",
      });
      // Redirect to edit the newly created resume
      setLocation(`/builder/${newResume.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      setLocation('/auth');
    }
  }, [user, userLoading, setLocation]);

  const handleSave = async (content: ResumeContent, template: string) => {
    if (!resumeId) {
      // Create new resume
      createMutation.mutate({ content, template });
    }
    // For existing resumes, the ResumeBuilder component handles saving internally
  };

  if (userLoading || (resumeId && resumeLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glassmorphism p-8 rounded-2xl">
          <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your cosmic workspace...</p>
        </div>
      </div>
    );
  }

  // If we're editing a resume that doesn't exist or user doesn't have access
  if (resumeId && !resumeLoading && !resume) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="glassmorphism p-8 rounded-2xl text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Resume Not Found</h2>
          <p className="text-gray-300 mb-6">
            The resume you're looking for doesn't exist or you don't have permission to access it.
          </p>
          <Link href="/dashboard">
            <Button className="cosmic-gradient">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const defaultContent: ResumeContent = {
    personalInfo: {
      fullName: "",
      email: user?.email || "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  };

  return (
    <div className="pt-16">
      {/* Back button */}
      <div className="px-6 py-4 border-b border-purple-500/20">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <ResumeBuilder
        resumeId={resumeId}
        initialContent={resume?.content || defaultContent}
        initialTemplate={resume?.template || "galaxy"}
        onSave={handleSave}
      />
    </div>
  );
}
