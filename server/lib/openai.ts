import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export async function enhanceResumeSection(section: string, content: string): Promise<{
  enhanced: string;
  suggestions: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert resume writer. Enhance the following ${section} section to make it more compelling, professional, and ATS-friendly. Provide both an enhanced version and specific suggestions for improvement. Respond with JSON in this format: { "enhanced": "improved text", "suggestions": ["suggestion1", "suggestion2"] }`
        },
        {
          role: "user",
          content: content
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      enhanced: result.enhanced || content,
      suggestions: result.suggestions || []
    };
  } catch (error) {
    console.error('Error enhancing resume section:', error);
    return {
      enhanced: content,
      suggestions: ["Unable to generate AI suggestions at this time."]
    };
  }
}

export async function analyzeJobMatch(resumeContent: any, jobDescription: string): Promise<{
  matchScore: number;
  suggestions: string[];
  missingSkills: string[];
  strengths: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert career advisor. Analyze how well this resume matches the job description. Provide a match score (0-100), specific suggestions for improvement, missing skills, and key strengths. Respond with JSON in this format: { "matchScore": number, "suggestions": ["suggestion1"], "missingSkills": ["skill1"], "strengths": ["strength1"] }`
        },
        {
          role: "user",
          content: `Resume: ${JSON.stringify(resumeContent)}\n\nJob Description: ${jobDescription}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      matchScore: Math.max(0, Math.min(100, result.matchScore || 0)),
      suggestions: result.suggestions || [],
      missingSkills: result.missingSkills || [],
      strengths: result.strengths || []
    };
  } catch (error) {
    console.error('Error analyzing job match:', error);
    return {
      matchScore: 0,
      suggestions: ["Unable to analyze job match at this time."],
      missingSkills: [],
      strengths: []
    };
  }
}

export async function generateCoverLetter(resumeContent: any, jobDescription: string, companyName: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert cover letter writer. Create a compelling, personalized cover letter based on the resume and job description. Make it professional, engaging, and tailored to the specific role and company."
        },
        {
          role: "user",
          content: `Please write a cover letter for:\n\nResume: ${JSON.stringify(resumeContent)}\n\nJob Description: ${jobDescription}\n\nCompany: ${companyName}`
        }
      ],
    });

    return response.choices[0].message.content || "Unable to generate cover letter at this time.";
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return "Unable to generate cover letter at this time.";
  }
}

export async function generateAchievements(role: string, company: string, responsibilities: string): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert resume writer. Generate 3-5 quantified achievement bullet points for this role. Focus on measurable results, impact, and accomplishments. Respond with JSON in this format: { "achievements": ["achievement1", "achievement2"] }`
        },
        {
          role: "user",
          content: `Role: ${role} at ${company}\nResponsibilities: ${responsibilities}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result.achievements || [];
  } catch (error) {
    console.error('Error generating achievements:', error);
    return [];
  }
}
