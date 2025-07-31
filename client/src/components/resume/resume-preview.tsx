import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share, ExternalLink } from "lucide-react";
import { type ResumeContent } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  content: ResumeContent;
  template: string;
  className?: string;
}

export function ResumePreview({ content, template, className }: ResumePreviewProps) {
  const renderGalaxyTemplate = () => (
    <div className="bg-white text-gray-900 p-8 shadow-2xl min-h-[800px]">
      {/* Header */}
      <div className="border-b-2 border-purple-600 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {content.personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-xl text-purple-600 font-medium mb-3">
          {content.personalInfo.summary || "Professional Title"}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {content.personalInfo.email && <span>{content.personalInfo.email}</span>}
          {content.personalInfo.phone && <span>{content.personalInfo.phone}</span>}
          {content.personalInfo.location && <span>{content.personalInfo.location}</span>}
        </div>
      </div>

      {/* Experience */}
      {content.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-purple-600 border-b border-purple-200 pb-2 mb-4">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {content.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="font-semibold text-lg">{exp.position}</h3>
                <p className="text-purple-600 font-medium">
                  {exp.company} • {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
                <p className="text-sm mt-2 text-gray-700">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {content.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-purple-600 border-b border-purple-200 pb-2 mb-4">
            SKILLS
          </h2>
          <div className="space-y-2">
            {content.skills.map((skillGroup) => (
              <div key={skillGroup.id}>
                <h3 className="font-semibold mb-1">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {content.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-purple-600 border-b border-purple-200 pb-2 mb-4">
            EDUCATION
          </h2>
          <div className="space-y-3">
            {content.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-purple-600">{edu.institution}</p>
                <p className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate || "Present"}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderNebulaTemplate = () => (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 shadow-2xl min-h-[800px]">
      {/* Header */}
      <div className="border-b border-teal-400 pb-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {content.personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-xl text-teal-400 font-medium mb-3">
          {content.personalInfo.summary || "Professional Title"}
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
          {content.personalInfo.email && <span>{content.personalInfo.email}</span>}
          {content.personalInfo.phone && <span>{content.personalInfo.phone}</span>}
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-6">
          {/* Experience */}
          {content.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-teal-400 mb-4">EXPERIENCE</h2>
              <div className="space-y-4">
                {content.experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-teal-400 text-sm">
                      {exp.company} • {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                    <p className="text-xs mt-1 text-gray-300">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Skills */}
          {content.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-teal-400 mb-4">SKILLS</h2>
              <div className="space-y-2">
                {content.skills.map((skillGroup) => (
                  <div key={skillGroup.id}>
                    <h3 className="font-semibold text-sm">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skillGroup.items.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 text-xs bg-teal-400/20 text-teal-300 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {content.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-teal-400 mb-4">EDUCATION</h2>
              <div className="space-y-2">
                {content.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-sm">{edu.degree}</h3>
                    <p className="text-teal-400 text-xs">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderLunarTemplate = () => (
    <div className="bg-gradient-to-br from-yellow-50 to-purple-50 text-gray-900 p-8 shadow-2xl min-h-[800px]">
      {/* Creative header with circle */}
      <div className="flex items-start space-x-6 mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {(content.personalInfo.fullName || "YN").split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {content.personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-xl text-purple-600 font-medium mb-3">
            {content.personalInfo.summary || "Professional Title"}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {content.personalInfo.email && <span>{content.personalInfo.email}</span>}
            {content.personalInfo.phone && <span>{content.personalInfo.phone}</span>}
          </div>
        </div>
      </div>

      {/* Rest of content similar to galaxy but with more creative styling */}
      {content.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
            EXPERIENCE
          </h2>
          <div className="space-y-4">
            {content.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-yellow-400 pl-4">
                <h3 className="font-semibold text-lg">{exp.position}</h3>
                <p className="text-purple-600 font-medium">
                  {exp.company} • {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
                <p className="text-sm mt-2 text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills with creative badges */}
      {content.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
            SKILLS
          </h2>
          <div className="space-y-3">
            {content.skills.map((skillGroup) => (
              <div key={skillGroup.id}>
                <h3 className="font-semibold mb-2">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-yellow-400 to-purple-500 text-white rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderTemplate = () => {
    switch (template) {
      case "nebula":
        return renderNebulaTemplate();
      case "lunar":
        return renderLunarTemplate();
      default:
        return renderGalaxyTemplate();
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-teal-300">Live Preview</h3>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            className="border-gray-600 hover:bg-gray-700"
          >
            <Download className="w-4 h-4 mr-1" />
            PDF
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="border-gray-600 hover:bg-gray-700"
          >
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="border-gray-600 hover:bg-gray-700"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Preview
          </Button>
        </div>
      </div>
      
      <Card className="bg-white shadow-2xl h-96 overflow-y-auto">
        {renderTemplate()}
      </Card>
    </div>
  );
}
