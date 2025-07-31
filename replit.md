# MoonResume - AI-Powered Resume Builder

## Overview

MoonResume is a modern, cosmic-themed resume builder application that leverages AI to help users create stunning resumes. The application features a full-stack architecture with a React frontend, Express backend, and PostgreSQL database, all styled with a beautiful moon and stars cosmic theme.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript running on Vite
- **Styling**: TailwindCSS with custom cosmic theme variables and shadcn/ui components
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Authentication**: Supabase Auth with magic link email authentication
- **UI Components**: Radix UI primitives with custom cosmic styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with authentication middleware
- **Development**: Hot reloading with Vite integration
- **Error Handling**: Centralized error handling with structured responses

### Data Layer
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple

## Key Components

### Authentication System
- **Provider**: Supabase Auth
- **Method**: Magic link email authentication (passwordless)
- **Session Management**: JWT tokens with automatic refresh
- **Security**: Protected routes with authentication middleware

### Resume Management
- **Builder**: Interactive resume builder with live preview
- **Templates**: Multiple cosmic-themed templates (Galaxy, Nebula, etc.)
- **Versioning**: Resume version history tracking
- **Sharing**: Public sharing with secure tokens

### AI Integration
- **Provider**: OpenAI GPT-4o
- **Features**: 
  - Resume section enhancement
  - Job description matching and scoring
  - Achievement generation
  - Cover letter creation
- **Implementation**: Server-side AI processing with structured responses

### Cosmic Theme System
- **Design**: Moon phases, starfield animations, cosmic gradients
- **Components**: Custom moon phase indicators, animated starfields
- **Colors**: Dark cosmic palette with purple, teal, and yellow accents
- **Animations**: CSS animations for twinkling stars and smooth transitions

## Data Flow

1. **User Authentication**: Magic link → Supabase Auth → JWT token → Protected API access
2. **Resume Creation**: Frontend form → API validation → Database storage → Live preview
3. **AI Enhancement**: User content → OpenAI API → Enhanced suggestions → User approval
4. **Job Matching**: Resume + Job description → AI analysis → Match score + suggestions
5. **Export/Share**: Resume data → Template rendering → PDF generation or public link

## External Dependencies

### Authentication & Database
- **Supabase**: Authentication provider and user management
- **Neon Database**: PostgreSQL hosting with serverless scaling
- **Drizzle ORM**: Type-safe database operations

### AI Services
- **OpenAI API**: GPT-4o for content enhancement and job matching
- **Model**: Latest GPT-4o (May 2024 release)

### Frontend Libraries
- **TanStack React Query**: Server state management and caching
- **Radix UI**: Accessible component primitives
- **TailwindCSS**: Utility-first styling framework
- **Wouter**: Lightweight routing library

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx for TypeScript execution with auto-restart
- **Database**: Drizzle push for schema synchronization

### Production Build
- **Frontend**: Vite build → static assets in dist/public
- **Backend**: ESBuild bundle → single dist/index.js file
- **Database**: Drizzle migrations for schema management

### Environment Configuration
- **Database**: DATABASE_URL for PostgreSQL connection
- **Auth**: Supabase URL and API keys
- **AI**: OpenAI API key for GPT-4o access
- **Sessions**: PostgreSQL session storage configuration

### Scalability Considerations
- **Database**: Serverless PostgreSQL scales automatically
- **Frontend**: Static assets can be served via CDN
- **Backend**: Stateless Express app suitable for horizontal scaling
- **Storage**: In-memory storage implementation can be replaced with persistent storage for production