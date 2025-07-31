# Deployment Guide

## GitHub Setup

### 1. Initialize Git and Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: MoonResume AI-powered resume builder"

# Add your GitHub repository as remote
git remote add origin https://github.com/aliaamir-stack/Resumemaker.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Download Project Files

If you want to download the project locally:
1. Use the download button in Replit's file panel
2. Or clone from GitHub after pushing: `git clone https://github.com/aliaamir-stack/Resumemaker.git`

## Vercel Deployment

### 1. Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `aliaamir-stack/Resumemaker`

### 2. Configure Environment Variables

In Vercel dashboard, add these environment variables:

```
DATABASE_URL=your_supabase_connection_string
OPENAI_API_KEY=your_openai_api_key
```

### 3. Build Settings (Vercel should auto-detect)

- **Build Command**: `npm run build:client`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### 4. Deploy

Click "Deploy" - Vercel will build and deploy your app automatically!

## Environment Variables Setup

### Database (Supabase)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy "Connection string" from "Transaction pooler"
5. Replace `[YOUR-PASSWORD]` with your database password
6. Use this as `DATABASE_URL`

### OpenAI API
1. Go to [platform.openai.com](https://platform.openai.com)
2. Navigate to API Keys
3. Create new secret key
4. Use this as `OPENAI_API_KEY`

## Post-Deployment

After deployment:
1. Your app will be live at `https://your-project-name.vercel.app`
2. Test authentication by signing in with magic link
3. Test AI features by creating a resume
4. Set up custom domain (optional) in Vercel dashboard

## Troubleshooting

### Common Issues:
- **Build fails**: Check environment variables are set correctly
- **Database connection**: Verify DATABASE_URL format and credentials
- **AI features not working**: Confirm OPENAI_API_KEY is valid
- **Authentication issues**: Check Supabase configuration

### Support:
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- OpenAI docs: [platform.openai.com/docs](https://platform.openai.com/docs)