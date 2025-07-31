# MoonResume - AI-Powered Resume Builder

A beautiful, cosmic-themed resume builder with AI enhancement capabilities.

## Features

- 🌙 **Cosmic Theme**: Beautiful space-inspired design with animated starfields
- 🤖 **AI-Powered**: GPT-4o integration for resume enhancement and job matching
- 📧 **Magic Link Auth**: Passwordless authentication via Supabase
- 📄 **Multiple Templates**: Galaxy, Nebula, and Lunar resume designs
- 🎯 **Job Matching**: AI analysis of resume-job fit with improvement suggestions
- 💌 **Cover Letters**: AI-generated personalized cover letters
- 📱 **Responsive**: Works perfectly on desktop and mobile

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Supabase Auth
- **AI**: OpenAI GPT-4o
- **UI Components**: Radix UI, shadcn/ui

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase recommended)
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aliaamir-stack/Resumemaker.git
cd Resumemaker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Add these to your environment or .env file
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## Deployment

### Vercel Deployment

1. Fork or push this repository to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `OPENAI_API_KEY`: Your OpenAI API key
4. Deploy!

### Database Setup

For Supabase:
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > Database
3. Copy the connection string and replace `[YOUR-PASSWORD]` with your database password
4. Use this as your `DATABASE_URL`

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   └── lib/         # Utilities and configurations
├── server/          # Express backend
│   ├── lib/         # Server utilities (AI, auth)
│   ├── routes.ts    # API routes
│   └── storage.ts   # Data storage interface
├── shared/          # Shared types and schemas
└── vercel.json      # Vercel deployment config
```

## API Endpoints

- `POST /api/auth/user` - Get authenticated user
- `GET /api/resumes` - List user's resumes
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/ai/enhance` - AI content enhancement
- `POST /api/job-match` - Job matching analysis
- `POST /api/cover-letter` - Generate cover letter

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details