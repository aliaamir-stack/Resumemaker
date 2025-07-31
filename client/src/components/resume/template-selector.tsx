import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const templates = [
  {
    id: "galaxy",
    name: "Galaxy Professional",
    description: "Clean, modern design perfect for tech professionals",
    category: "Professional",
    preview: (
      <div className="bg-gradient-to-br from-white to-gray-100 p-3 rounded-lg h-24 shadow-sm">
        <div className="space-y-1">
          <div className="h-2 bg-purple-600 rounded w-3/4"></div>
          <div className="h-1 bg-gray-400 rounded w-1/2"></div>
          <div className="space-y-0.5 mt-2">
            <div className="h-1 bg-gray-300 rounded w-full"></div>
            <div className="h-1 bg-gray-300 rounded w-5/6"></div>
            <div className="h-1 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "nebula",
    name: "Nebula Executive",
    description: "Sophisticated design for senior roles and executive positions",
    category: "Executive",
    preview: (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-3 rounded-lg h-24 shadow-sm">
        <div className="space-y-1">
          <div className="h-2 bg-teal-400 rounded w-2/3"></div>
          <div className="h-1 bg-gray-400 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-1 mt-2">
            <div className="space-y-0.5">
              <div className="h-0.5 bg-gray-500 rounded w-full"></div>
              <div className="h-0.5 bg-gray-500 rounded w-3/4"></div>
            </div>
            <div className="space-y-0.5">
              <div className="h-0.5 bg-gray-500 rounded w-full"></div>
              <div className="h-0.5 bg-gray-500 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "lunar",
    name: "Lunar Creative",
    description: "Bold, creative layout perfect for designers and creative professionals",
    category: "Creative",
    preview: (
      <div className="bg-gradient-to-br from-yellow-100 to-purple-100 p-3 rounded-lg h-24 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="h-2 bg-yellow-500 rounded w-1/2"></div>
          </div>
          <div className="h-1 bg-purple-500 rounded w-2/5"></div>
          <div className="space-y-0.5 mt-2">
            <div className="h-1 bg-gray-400 rounded w-full"></div>
            <div className="h-1 bg-gray-400 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    ),
  },
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
  className?: string;
}

export function TemplateSelector({ 
  selectedTemplate, 
  onTemplateChange,
  className 
}: TemplateSelectorProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-gray-200 mb-3">
        Choose Your Cosmic Template
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "glassmorphism cursor-pointer transition-all hover:scale-105",
              selectedTemplate === template.id 
                ? "border-2 border-yellow-400 shadow-lg shadow-yellow-400/20" 
                : "border border-purple-500/30 hover:border-yellow-400/50"
            )}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="p-4 space-y-3">
              {template.preview}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">{template.name}</h4>
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs",
                      template.category === "Professional" && "bg-purple-500/20 text-purple-300",
                      template.category === "Executive" && "bg-teal-500/20 text-teal-300",
                      template.category === "Creative" && "bg-yellow-500/20 text-yellow-300"
                    )}
                  >
                    {template.category}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {template.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button 
          variant="outline" 
          className="border-purple-500/30 hover:bg-purple-500/10"
        >
          View All 12 Templates
        </Button>
      </div>
    </div>
  );
}
