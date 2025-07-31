import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProgressMoon } from "@/components/cosmic/moon-phase";
import { ResumePreview } from "./resume-preview";
import { TemplateSelector } from "./template-selector";
import { Plus, Trash2, Sparkles, Save, Clock } from "lucide-react";
import { type ResumeContent, resumeContentSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { authenticatedRequest } from "@/lib/auth";
import { z } from "zod";

interface ResumeBuilderProps {
  resumeId?: string;
  initialContent?: ResumeContent;
  initialTemplate?: string;
  onSave?: (content: ResumeContent, template: string) => void;
}

export function ResumeBuilder({ 
  resumeId, 
  initialContent, 
  initialTemplate = "galaxy",
  onSave 
}: ResumeBuilderProps) {
  const [content, setContent] = useState<ResumeContent>(
    initialContent || {
      personalInfo: {
        fullName: "",
        email: "",
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
    }
  );
  
  const [template, setTemplate] = useState(initialTemplate);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (resumeId) {
        handleSave(true); // Silent save
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [content, template]);

  const calculateProgress = () => {
    let filledFields = 0;
    let totalFields = 0;

    // Personal info (7 fields, 3 required)
    totalFields += 7;
    if (content.personalInfo.fullName) filledFields++;
    if (content.personalInfo.email) filledFields++;
    if (content.personalInfo.phone) filledFields++;
    if (content.personalInfo.location) filledFields++;
    if (content.personalInfo.website) filledFields++;
    if (content.personalInfo.linkedin) filledFields++;
    if (content.personalInfo.summary) filledFields++;

    // Experience (at least 1)
    totalFields += 2;
    if (content.experience.length > 0) filledFields += 2;

    // Education (at least 1)
    totalFields += 1;
    if (content.education.length > 0) filledFields++;

    // Skills (at least 1)
    totalFields += 1;
    if (content.skills.length > 0) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
  };

  const handleSave = async (silent = false) => {
    setIsSaving(true);
    
    try {
      if (onSave) {
        onSave(content, template);
      }
      
      if (resumeId) {
        await authenticatedRequest('PUT', `/api/resumes/${resumeId}`, {
          content,
          template,
        });
      }
      
      setLastSaved(new Date());
      
      if (!silent) {
        toast({
          title: "Resume saved! ✨",
          description: "Your cosmic resume has been updated.",
        });
      }
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Unable to save your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAIEnhance = async (section: string, currentContent: string) => {
    try {
      const response = await authenticatedRequest('POST', '/api/ai/enhance', {
        section,
        content: currentContent,
      });
      
      const result = await response.json();
      
      toast({
        title: "AI Enhancement Ready! ✨",
        description: `Generated suggestions for your ${section} section.`,
      });
      
      return result;
    } catch (error) {
      toast({
        title: "AI Enhancement Failed",
        description: "Unable to generate AI suggestions. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
    };
    setContent({
      ...content,
      experience: [...content.experience, newExp],
    });
  };

  const removeExperience = (id: string) => {
    setContent({
      ...content,
      experience: content.experience.filter(exp => exp.id !== id),
    });
  };

  const updateExperience = (id: string, updates: any) => {
    setContent({
      ...content,
      experience: content.experience.map(exp => 
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    });
  };

  const addSkillGroup = () => {
    const newSkill = {
      id: Date.now().toString(),
      category: "",
      items: [],
    };
    setContent({
      ...content,
      skills: [...content.skills, newSkill],
    });
  };

  const removeSkillGroup = (id: string) => {
    setContent({
      ...content,
      skills: content.skills.filter(skill => skill.id !== id),
    });
  };

  const updateSkillGroup = (id: string, updates: any) => {
    setContent({
      ...content,
      skills: content.skills.map(skill => 
        skill.id === id ? { ...skill, ...updates } : skill
      ),
    });
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    };
    setContent({
      ...content,
      education: [...content.education, newEdu],
    });
  };

  const removeEducation = (id: string) => {
    setContent({
      ...content,
      education: content.education.filter(edu => edu.id !== id),
    });
  };

  const updateEducation = (id: string, updates: any) => {
    setContent({
      ...content,
      education: content.education.map(edu => 
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-yellow-400">Resume Builder</h1>
          <div className="flex items-center space-x-2">
            <ProgressMoon progress={calculateProgress()} />
            <span className="text-sm text-gray-400">{calculateProgress()}% Complete</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {lastSaved && (
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Saved {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
          <Button 
            onClick={() => handleSave(false)}
            disabled={isSaving}
            className="cosmic-gradient"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor Panel */}
        <div className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4 glassmorphism">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            
            {/* Personal Info Tab */}
            <TabsContent value="personal" className="space-y-4">
              <Card className="glassmorphism border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={content.personalInfo.fullName}
                        onChange={(e) => setContent({
                          ...content,
                          personalInfo: { ...content.personalInfo, fullName: e.target.value }
                        })}
                        placeholder="Your cosmic identity..."
                        className="bg-gray-800/50 border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={content.personalInfo.email}
                        onChange={(e) => setContent({
                          ...content,
                          personalInfo: { ...content.personalInfo, email: e.target.value }
                        })}
                        placeholder="your@email.com"
                        className="bg-gray-800/50 border-gray-600"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={content.personalInfo.phone || ""}
                        onChange={(e) => setContent({
                          ...content,
                          personalInfo: { ...content.personalInfo, phone: e.target.value }
                        })}
                        placeholder="+1 (555) 123-4567"
                        className="bg-gray-800/50 border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={content.personalInfo.location || ""}
                        onChange={(e) => setContent({
                          ...content,
                          personalInfo: { ...content.personalInfo, location: e.target.value }
                        })}
                        placeholder="City, State"
                        className="bg-gray-800/50 border-gray-600"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10"
                        onClick={() => handleAIEnhance('summary', content.personalInfo.summary || "")}
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Enhance
                      </Button>
                    </div>
                    <Textarea
                      id="summary"
                      value={content.personalInfo.summary || ""}
                      onChange={(e) => setContent({
                        ...content,
                        personalInfo: { ...content.personalInfo, summary: e.target.value }
                      })}
                      placeholder="Tell us about your journey among the stars..."
                      className="bg-gray-800/50 border-gray-600 h-24 resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-yellow-400">Work Experience</h3>
                <Button onClick={addExperience} size="sm" className="cosmic-gradient">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Experience
                </Button>
              </div>
              
              <div className="space-y-4">
                {content.experience.map((exp, index) => (
                  <Card key={exp.id} className="glassmorphism border-purple-500/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm text-teal-300">
                          Experience {index + 1}
                        </CardTitle>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Position"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                          className="bg-gray-800/50 border-gray-600"
                        />
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                          className="bg-gray-800/50 border-gray-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          type="date"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          className="bg-gray-800/50 border-gray-600"
                        />
                        <Input
                          type="date"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          disabled={exp.current}
                          className="bg-gray-800/50 border-gray-600"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`current-${exp.id}`}
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                          className="rounded"
                        />
                        <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-300">
                          I currently work here
                        </label>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Description</Label>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10"
                            onClick={() => handleAIEnhance('experience', exp.description)}
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI Enhance
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Describe your responsibilities and achievements..."
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                          className="bg-gray-800/50 border-gray-600 h-20 resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {content.experience.length === 0 && (
                  <Card className="glassmorphism border-dashed border-purple-500/30">
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <p className="text-gray-400 mb-4">No work experience added yet</p>
                      <Button onClick={addExperience} className="cosmic-gradient">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Experience
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-yellow-400">Education</h3>
                <Button onClick={addEducation} size="sm" className="cosmic-gradient">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Education
                </Button>
              </div>
              
              <div className="space-y-4">
                {content.education.map((edu, index) => (
                  <Card key={edu.id} className="glassmorphism border-purple-500/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm text-teal-300">
                          Education {index + 1}
                        </CardTitle>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                          className="bg-gray-800/50 border-gray-600"
                        />
                        <Input
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                          className="bg-gray-800/50 border-gray-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Field of Study"
                          value={edu.field || ""}
                          onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                          className="bg-gray-800/50 border-gray-600"
                        />
                        <Input
                          placeholder="GPA (optional)"
                          value={edu.gpa || ""}
                          onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                          className="bg-gray-800/50 border-gray-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          type="date"
                          placeholder="Start Date"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                          className="bg-gray-800/50 border-gray-600"
                        />
                        <Input
                          type="date"
                          placeholder="End Date"
                          value={edu.endDate || ""}
                          onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                          className="bg-gray-800/50 border-gray-600"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {content.education.length === 0 && (
                  <Card className="glassmorphism border-dashed border-purple-500/30">
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <p className="text-gray-400 mb-4">No education added yet</p>
                      <Button onClick={addEducation} className="cosmic-gradient">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your Education
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-yellow-400">Skills</h3>
                <Button onClick={addSkillGroup} size="sm" className="cosmic-gradient">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Skill Category
                </Button>
              </div>
              
              <div className="space-y-4">
                {content.skills.map((skillGroup, index) => (
                  <Card key={skillGroup.id} className="glassmorphism border-purple-500/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm text-teal-300">
                          Skill Category {index + 1}
                        </CardTitle>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeSkillGroup(skillGroup.id)}
                          className="text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Input
                        placeholder="Category (e.g., Programming Languages)"
                        value={skillGroup.category}
                        onChange={(e) => updateSkillGroup(skillGroup.id, { category: e.target.value })}
                        className="bg-gray-800/50 border-gray-600"
                      />
                      <div className="space-y-2">
                        <Label>Skills (comma-separated)</Label>
                        <Textarea
                          placeholder="JavaScript, React, Node.js, Python..."
                          value={skillGroup.items.join(", ")}
                          onChange={(e) => updateSkillGroup(skillGroup.id, { 
                            items: e.target.value.split(",").map(s => s.trim()).filter(s => s) 
                          })}
                          className="bg-gray-800/50 border-gray-600 h-20 resize-none"
                        />
                      </div>
                      {skillGroup.items.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {skillGroup.items.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-purple-500/20 text-purple-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {content.skills.length === 0 && (
                  <Card className="glassmorphism border-dashed border-purple-500/30">
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <p className="text-gray-400 mb-4">No skills added yet</p>
                      <Button onClick={addSkillGroup} className="cosmic-gradient">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your Skills
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />
          
          {/* Template Selector */}
          <TemplateSelector
            selectedTemplate={template}
            onTemplateChange={setTemplate}
          />
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-6">
          <ResumePreview 
            content={content} 
            template={template}
          />
        </div>
      </div>
    </div>
  );
}
