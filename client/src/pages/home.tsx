import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoonPhase, ProgressMoon } from "@/components/cosmic/moon-phase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Rocket, 
  Eye, 
  Bot, 
  Target, 
  FileText, 
  Share, 
  History,
  Star,
  Sparkles,
  Download,
  ExternalLink,
  Mail,
  Users,
  Check,
  Play,
  Crown,
  Menu,
  X
} from "lucide-react";

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState("galaxy");

  const features = [
    {
      icon: Eye,
      title: "Live Preview",
      description: "Watch your resume come to life in real-time as you type. Switch between beautiful templates instantly.",
      color: "from-purple-500 to-yellow-400",
      accent: "text-yellow-400",
      borderColor: "border-purple-500/30"
    },
    {
      icon: Bot,
      title: "AI Enhancement",
      description: "Smart AI suggestions improve your content. Generate achievements, polish wording, and optimize for ATS.",
      color: "from-teal-400 to-purple-500",
      accent: "text-teal-400",
      borderColor: "border-teal-400/30"
    },
    {
      icon: Target,
      title: "Job Matching",
      description: "Paste any job description and get instant tailoring suggestions with match scores using moon phases.",
      color: "from-yellow-400 to-purple-500",
      accent: "text-yellow-400",
      borderColor: "border-yellow-400/30"
    },
    {
      icon: FileText,
      title: "Cover Letter Magic",
      description: "Generate personalized cover letters instantly using your resume data and target job information.",
      color: "from-purple-500 to-teal-400",
      accent: "text-purple-400",
      borderColor: "border-purple-500/30"
    },
    {
      icon: Share,
      title: "Export & Share",
      description: "Download as PDF or share with custom links. Password protect and track views with analytics.",
      color: "from-teal-400 to-yellow-400",
      accent: "text-teal-400",
      borderColor: "border-teal-400/30"
    },
    {
      icon: History,
      title: "Version Control",
      description: "Save multiple resume versions for different roles. Compare changes and track your career evolution.",
      color: "from-yellow-400 to-purple-500",
      accent: "text-yellow-400",
      borderColor: "border-yellow-400/30"
    }
  ];

  const templates = [
    {
      id: "galaxy",
      name: "Galaxy Professional",
      description: "Clean, modern design perfect for tech professionals and creative roles",
      category: "Most Popular",
      categoryColor: "text-yellow-400",
      preview: (
        <div className="bg-gradient-to-br from-white to-gray-100 p-3 rounded-lg shadow-lg">
          <div className="space-y-2">
            <div className="h-3 bg-purple-600 rounded w-3/4"></div>
            <div className="h-2 bg-gray-400 rounded w-1/2"></div>
            <div className="space-y-1 mt-3">
              <div className="h-2 bg-gray-300 rounded w-full"></div>
              <div className="h-2 bg-gray-300 rounded w-5/6"></div>
              <div className="h-2 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "nebula",
      name: "Nebula Executive",
      description: "Sophisticated design for senior roles and executive positions",
      category: "Executive",
      categoryColor: "text-teal-400",
      preview: (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-3 rounded-lg shadow-lg">
          <div className="space-y-2">
            <div className="h-3 bg-teal-400 rounded w-2/3"></div>
            <div className="h-2 bg-gray-400 rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="space-y-1">
                <div className="h-1 bg-gray-500 rounded w-full"></div>
                <div className="h-1 bg-gray-500 rounded w-3/4"></div>
              </div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-500 rounded w-full"></div>
                <div className="h-1 bg-gray-500 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "lunar",
      name: "Lunar Creative",
      description: "Bold, creative layout perfect for designers and creative professionals",
      category: "Creative",
      categoryColor: "text-purple-400",
      preview: (
        <div className="bg-gradient-to-br from-yellow-100 to-purple-100 p-3 rounded-lg shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <div className="h-3 bg-yellow-500 rounded w-1/2"></div>
            </div>
            <div className="h-2 bg-purple-500 rounded w-2/5"></div>
            <div className="space-y-1 mt-3">
              <div className="h-2 bg-gray-400 rounded w-full"></div>
              <div className="h-2 bg-gray-400 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const pricingPlans = [
    {
      name: "Crescent",
      phase: "crescent" as const,
      price: 0,
      description: "Perfect for getting started",
      features: [
        "3 Resume templates",
        "Basic AI suggestions", 
        "PDF export",
        { text: "Advanced AI features", included: false }
      ],
      buttonText: "Start Free",
      buttonStyle: "glassmorphism hover:bg-gray-800/50"
    },
    {
      name: "Full Moon",
      phase: "full" as const,
      price: 9,
      description: "For serious job seekers",
      popular: true,
      features: [
        "12 Premium templates",
        "Advanced AI enhancement",
        "Job matching analysis", 
        "Cover letter generator",
        "Version history"
      ],
      buttonText: "Upgrade to Pro",
      buttonStyle: "cosmic-gradient hover:scale-105"
    },
    {
      name: "Stellar",
      phase: "full" as const,
      price: 29,
      description: "For teams and enterprises",
      icon: Crown,
      features: [
        "Everything in Pro",
        "Custom branding",
        "Team collaboration",
        "Priority support"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900"
    }
  ];

  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Craft Your Perfect
                <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-teal-400 bg-clip-text text-transparent block">
                  Cosmic Resume
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Harness the power of AI to create stunning resumes that land you your dream job. 
                Watch your career soar like the stars above.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/auth">
                <Button className="cosmic-gradient px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform animate-pulse-glow">
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Building Free
                </Button>
              </Link>
              <Button variant="outline" className="glassmorphism px-8 py-4 text-lg font-semibold border-purple-500/30 hover:bg-purple-500/10">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-teal-400" />
                <span>10,000+ Users</span>
              </div>
            </div>
          </div>
          
          {/* Hero Resume Preview */}
          <div className="relative animate-float">
            <div className="glassmorphism rounded-2xl p-8 shadow-2xl border border-purple-500/30">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-600">
                <div className="flex items-start space-x-6 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 flex items-center justify-center">
                    <div className="text-xl font-bold text-white">AR</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-yellow-400">Alex Rodriguez</h3>
                    <p className="text-teal-400 font-medium">Senior Software Engineer</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                      <span>alex@moonresume.com</span>
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-purple-400 font-semibold mb-2">EXPERIENCE</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-white">Senior Software Engineer</h5>
                        <p className="text-sm text-yellow-400">TechNova Inc. • 2021 - Present</p>
                        <p className="text-xs text-gray-400 mt-1">Led development of AI-powered features...</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-purple-400 font-semibold mb-2">SKILLS</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">React</Badge>
                      <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">Node.js</Badge>
                      <Badge className="bg-teal-400/20 text-teal-400 border-teal-400/30">AI/ML</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 glassmorphism rounded-full p-3 border border-yellow-400/30">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Features That
              <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent block">
                Shine Bright
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover powerful AI-driven features designed to make your resume stand out in the cosmic job market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`glassmorphism hover:scale-105 transition-transform border ${feature.borderColor}`}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${feature.accent}`}>{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                  {feature.title === "Live Preview" && (
                    <div className="mt-4 flex items-center space-x-2">
                      <ProgressMoon progress={30} />
                      <ProgressMoon progress={100} />
                      <span className="text-xs text-gray-400">Progress indicator</span>
                    </div>
                  )}
                  {feature.title === "AI Enhancement" && (
                    <div className="mt-4 text-xs text-teal-400">
                      <Sparkles className="w-3 h-3 mr-1 inline" />
                      Powered by OpenAI
                    </div>
                  )}
                  {feature.title === "Job Matching" && (
                    <div className="mt-4 flex items-center space-x-1">
                      <MoonPhase phase="full" size="sm" />
                      <MoonPhase phase="full" size="sm" />
                      <MoonPhase phase="full" size="sm" />
                      <MoonPhase phase="crescent" size="sm" />
                      <span className="text-xs text-gray-400 ml-2">85% Match</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              See It In
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent block">
                Action
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Experience the magic of real-time resume building with AI assistance.
            </p>
          </div>
          
          <div className="glassmorphism rounded-2xl p-8 border border-purple-500/30">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-yellow-400">Resume Builder</h3>
                  <div className="flex items-center space-x-2">
                    <ProgressMoon progress={60} />
                    <span className="text-sm text-gray-400">60% Complete</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
                    <Input 
                      placeholder="Your cosmic identity..." 
                      className="bg-gray-800/50 border-purple-500/30 text-white placeholder-gray-400"
                      value="Alex Rodriguez"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Professional Title</label>
                    <div className="relative">
                      <Input 
                        placeholder="What's your stellar role..." 
                        className="bg-gray-800/50 border-purple-500/30 text-white placeholder-gray-400"
                        value="Senior Software Engineer"
                        readOnly
                      />
                      <Button size="sm" variant="ghost" className="absolute right-2 top-1 text-yellow-400 hover:text-yellow-300">
                        <Sparkles className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Work Experience</label>
                    <Textarea 
                      placeholder="Tell us about your journey among the stars..."
                      className="bg-gray-800/50 border-purple-500/30 text-white placeholder-gray-400 h-24 resize-none"
                      value="Led development of AI-powered features that increased user engagement by 40%. Architected scalable microservices..."
                      readOnly
                    />
                    <div className="flex items-center justify-between mt-2">
                      <Button size="sm" variant="ghost" className="text-teal-400 hover:text-teal-300">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Improve This Section
                      </Button>
                      <span className="text-xs text-gray-400">Auto-saving...</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Choose Your Cosmic Template</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {templates.map((template) => (
                      <Button
                        key={template.id}
                        variant="outline"
                        className={`glassmorphism p-3 h-auto flex-col space-y-2 ${
                          selectedTemplate === template.id 
                            ? 'border-2 border-yellow-400' 
                            : 'border border-purple-500/30 hover:border-yellow-400/50'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="h-16 w-full">
                          {template.preview}
                        </div>
                        <p className="text-xs text-gray-300">{template.name.split(' ')[0]}</p>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Live Preview Panel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-teal-400">Live Preview</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="glassmorphism border-gray-600">
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                    <Button size="sm" variant="outline" className="glassmorphism border-gray-600">
                      <Share className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
                
                <Card className="bg-white shadow-2xl h-96 overflow-y-auto">
                  <div className="p-6 text-gray-900">
                    <div className="border-b-2 border-purple-600 pb-4 mb-4">
                      <h2 className="text-2xl font-bold">Alex Rodriguez</h2>
                      <p className="text-lg text-purple-600 font-medium">Senior Software Engineer</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span>alex@moonresume.com</span>
                        <span>+1 (555) 123-4567</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-purple-600 border-b border-purple-300 pb-1 mb-2">PROFESSIONAL EXPERIENCE</h3>
                        <div>
                          <h4 className="font-semibold">Senior Software Engineer</h4>
                          <p className="text-purple-600 text-sm">TechNova Inc. • 2021 - Present</p>
                          <p className="text-sm mt-1">Led development of AI-powered features that increased user engagement by 40%. Architected scalable microservices...</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-purple-600 border-b border-purple-300 pb-1 mb-2">SKILLS</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">React</span>
                          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">Node.js</span>
                          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">AI/ML</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <div className="glassmorphism rounded-lg p-4 border border-yellow-400/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">AI Suggestions</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <Check className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Consider adding quantified achievements</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-3 h-3 rounded-full bg-purple-400 mt-1 flex-shrink-0"></div>
                      <span className="text-gray-300">Add technical leadership experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section id="templates" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Cosmic
              <span className="bg-gradient-to-r from-yellow-400 to-teal-400 bg-clip-text text-transparent block">
                Templates
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Choose from our collection of professionally designed, ATS-friendly templates.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className="glassmorphism hover:scale-105 transition-transform border border-purple-500/30 group">
                <CardContent className="p-6">
                  <div className="mb-4 h-24">
                    {template.preview}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-400">{template.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${template.categoryColor}`}>{template.category}</span>
                    <Button 
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-purple-500 hover:bg-purple-600"
                    >
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="cosmic-gradient px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform">
              View All 12 Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-teal-400 to-yellow-400 bg-clip-text text-transparent block">
                Cosmic Journey
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Start free and upgrade when you're ready to reach for the stars.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`glassmorphism p-8 transition-colors ${
                  plan.popular 
                    ? 'border-2 border-yellow-400 relative' 
                    : 'border border-purple-500/30 hover:border-purple-500/60'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-4 flex items-center justify-center">
                      {plan.icon ? (
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-purple-500 rounded-full flex items-center justify-center">
                          <plan.icon className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <MoonPhase phase={plan.phase} size="md" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-purple-400 mb-2">{plan.name}</h3>
                    <p className="text-gray-300">{plan.description}</p>
                  </div>
                  
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        {typeof feature === 'string' ? (
                          <>
                            <Check className="w-4 h-4 text-teal-400 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-500">{feature.text}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full py-3 transition-all ${plan.buttonStyle}`}>
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glassmorphism rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Ready to Launch Your
              <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-teal-400 bg-clip-text text-transparent block">
                Career Journey?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already transformed their resumes with the power of AI. 
              Your dream job is just one stellar resume away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth">
                <Button className="cosmic-gradient px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform animate-pulse-glow">
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Building Now
                </Button>
              </Link>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span>4.9/5 from 10,000+ users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glassmorphism border-t border-purple-500/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MoonPhase phase="full" size="sm" />
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                  MoonResume
                </span>
              </div>
              <p className="text-gray-400">
                Craft stellar resumes with the power of AI and launch your career into orbit.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-yellow-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-yellow-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-yellow-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                  </svg>
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 p-0 h-auto">Features</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 p-0 h-auto">Templates</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 p-0 h-auto">Pricing</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 p-0 h-auto">AI Tools</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 p-0 h-auto">Help Center</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 p-0 h-auto">Tutorials</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 p-0 h-auto">Contact</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 p-0 h-auto">Status</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 p-0 h-auto">About</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 p-0 h-auto">Blog</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 p-0 h-auto">Careers</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 p-0 h-auto">Privacy</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-purple-500/20 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 MoonResume. Made with ✨ by Ali Aamir Khan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
