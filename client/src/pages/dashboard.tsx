import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ProgressMoon } from "@/components/cosmic/moon-phase";
import { authenticatedRequest, getCurrentUser } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Search, 
  FileText, 
  Edit, 
  Trash2, 
  Share, 
  Download,
  Clock,
  Eye,
  MoreVertical,
  Copy
} from "lucide-react";
import { type Resume } from "@shared/schema";

export default function Dashboard() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
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

  // Fetch resumes
  const { data: resumes = [], isLoading, refetch } = useQuery({
    queryKey: ['/api/resumes'],
    queryFn: async () => {
      const response = await authenticatedRequest('GET', '/api/resumes');
      return response.json();
    },
    enabled: !!user,
  });

  // Delete resume mutation
  const deleteMutation = useMutation({
    mutationFn: async (resumeId: string) => {
      await authenticatedRequest('DELETE', `/api/resumes/${resumeId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/resumes'] });
      toast({
        title: "Resume deleted",
        description: "Your resume has been successfully deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete resume. Please try again.",
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

  const filteredResumes = resumes.filter((resume: Resume) =>
    resume.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTemplateDisplayName = (template: string) => {
    switch (template) {
      case 'galaxy': return 'Galaxy Professional';
      case 'nebula': return 'Nebula Executive';
      case 'lunar': return 'Lunar Creative';
      default: return template;
    }
  };

  const getResumeProgress = (resume: Resume) => {
    const content = resume.content as any;
    let filledFields = 0;
    let totalFields = 10;

    if (content.personalInfo?.fullName) filledFields++;
    if (content.personalInfo?.email) filledFields++;
    if (content.personalInfo?.summary) filledFields++;
    if (content.experience?.length > 0) filledFields += 2;
    if (content.education?.length > 0) filledFields++;
    if (content.skills?.length > 0) filledFields++;
    if (content.personalInfo?.phone) filledFields++;
    if (content.personalInfo?.location) filledFields++;
    if (content.projects?.length > 0) filledFields++;
    if (content.certifications?.length > 0) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
  };

  const handleDeleteResume = (resumeId: string) => {
    if (window.confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      deleteMutation.mutate(resumeId);
    }
  };

  const handleShareResume = async (resume: Resume) => {
    if (resume.shareToken) {
      const shareUrl = `${window.location.origin}/share/${resume.shareToken}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Share link copied!",
          description: "The resume share link has been copied to your clipboard.",
        });
      } catch (error) {
        toast({
          title: "Share link",
          description: shareUrl,
        });
      }
    }
  };

  if (userLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glassmorphism p-8 rounded-2xl">
          <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your cosmic workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-yellow-400 mb-2">
                Welcome back, {user?.fullName || user?.email}
              </h1>
              <p className="text-gray-300">
                Continue crafting your stellar resumes and land your dream job.
              </p>
            </div>
            <Link href="/builder">
              <Button className="cosmic-gradient px-6 py-3 hover:scale-105 transition-transform">
                <Plus className="w-5 h-5 mr-2" />
                Create New Resume
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glassmorphism border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Resumes</p>
                  <p className="text-3xl font-bold text-purple-400">{resumes.length}</p>
                </div>
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphism border-teal-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-3xl font-bold text-teal-400">
                    {resumes.filter((r: Resume) => getResumeProgress(r) >= 80).length}
                  </p>
                </div>
                <ProgressMoon progress={100} className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphism border-yellow-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">In Progress</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {resumes.filter((r: Resume) => getResumeProgress(r) < 80).length}
                  </p>
                </div>
                <ProgressMoon progress={50} className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-600"
            />
          </div>
        </div>

        {/* Resumes Grid */}
        {filteredResumes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume: Resume) => {
              const progress = getResumeProgress(resume);
              
              return (
                <Card key={resume.id} className="glassmorphism border-purple-500/30 hover:border-purple-400/50 transition-colors group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-white truncate">{resume.title}</CardTitle>
                        <p className="text-sm text-gray-400 mt-1">
                          {getTemplateDisplayName(resume.template)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ProgressMoon progress={progress} />
                        <span className="text-xs text-gray-400">{progress}%</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(resume.updatedAt!).toLocaleDateString()}
                        </span>
                      </div>
                      {resume.isPublic && (
                        <Badge variant="secondary" className="bg-teal-500/20 text-teal-300">
                          <Eye className="w-3 h-3 mr-1" />
                          Public
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Link href={`/builder/${resume.id}`} className="flex-1">
                        <Button size="sm" className="w-full cosmic-gradient">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-gray-600 hover:bg-gray-700"
                        onClick={() => handleShareResume(resume)}
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-gray-600 hover:bg-gray-700"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-red-400 hover:bg-red-500/10"
                        onClick={() => handleDeleteResume(resume.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="glassmorphism border-dashed border-purple-500/30">
            <CardContent className="flex flex-col items-center justify-center py-16">
              {searchQuery ? (
                <>
                  <Search className="w-16 h-16 text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No resumes found</h3>
                  <p className="text-gray-400 mb-6">
                    No resumes match your search for "{searchQuery}"
                  </p>
                  <Button onClick={() => setSearchQuery("")} variant="outline" className="border-purple-500/30">
                    Clear Search
                  </Button>
                </>
              ) : (
                <>
                  <FileText className="w-16 h-16 text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No resumes yet</h3>
                  <p className="text-gray-400 mb-6">
                    Create your first cosmic resume and start your journey to the stars.
                  </p>
                  <Link href="/builder">
                    <Button className="cosmic-gradient px-6 py-3">
                      <Plus className="w-5 h-5 mr-2" />
                      Create Your First Resume
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
