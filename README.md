# InSilicoVida Research Group Website

A modern, animated website for the InSilicoVida Research Group showcasing research, publications, team members, and software tools.

## Features

- 🎨 Modern UI with GSAP animations
- 🎯 Automatic highlighting of technical terms
- 📱 Fully responsive design
- ⚡ Built with Vite and React
- 🎭 Smooth scroll-triggered animations
- 🌈 Dynamic color highlighting

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project is configured to automatically deploy to GitHub Pages when code is pushed to the `main` branch.

### GitHub Pages Setup

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: Select "GitHub Actions"

2. **Configure Base Path** (if needed):
   - If your repository is NOT `username.github.io`, you need to set the base path
   - In `.github/workflows/deploy.yml`, uncomment and set:
     ```yaml
     VITE_BASE_PATH: /your-repo-name/
     ```
   - Update `vite.config.ts` if you need a different base path

3. **Push to main branch**:
   - The workflow will automatically build and deploy your site
   - Check the Actions tab to see deployment status

### Manual Deployment

You can also trigger deployment manually:
- Go to Actions tab
- Select "Deploy to GitHub Pages" workflow
- Click "Run workflow"

## Project Structure

```
src/
├── components/     # React components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── data/          # Data files
└── lib/           # Library utilities
```

## Technologies

- React 18
- TypeScript
- Vite
- GSAP (animations)
- Tailwind CSS
- React Router
