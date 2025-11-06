# Deployment Guide - Projects Portfolio

This guide covers how to build, test, and deploy the Next.js projects portfolio section to GitHub Pages.

## Table of Contents

- [Local Development](#local-development)
- [Building for Production](#building-for-production)
- [GitHub Pages Deployment](#github-pages-deployment)
- [Automated Deployment](#automated-deployment)
- [Troubleshooting](#troubleshooting)

---

## Local Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

### Setup

```bash
# Navigate to projects directory
cd projects

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:3000`. The site includes hot-reload, so changes are reflected immediately.

### Development Commands

```bash
# Run development server
npm run dev

# Type check (TypeScript)
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

---

## Building for Production

### Build Command

```bash
# From /projects directory
npm run build
```

This command:
1. Compiles TypeScript to JavaScript
2. Optimizes and bundles all code
3. Generates static HTML for all pages
4. Outputs to `/projects/out` directory
5. Creates pre-rendered pages for all project routes

### Build Output

The build creates a static export in the `out/` directory:

```
out/
├── index.html              # Main projects listing page
├── projects/
│   ├── chatbot-automation/
│   │   └── index.html     # Individual project pages
│   ├── portfolio-builder/
│   └── analytics-dashboard/
├── _next/
│   ├── static/            # JavaScript bundles
│   └── ...
└── images/                # Optimized images
```

### Testing the Build Locally

```bash
# Build the project
npm run build

# Serve the static files (requires http-server or similar)
npx http-server out -p 3000

# Visit http://localhost:3000
```

---

## GitHub Pages Deployment

### Configuration

The project is pre-configured for GitHub Pages with the following settings in `next.config.mjs`:

```javascript
{
  output: 'export',           // Static export
  basePath: '/projects',      // Subdirectory deployment
  trailingSlash: true,        // URL consistency
  images: {
    unoptimized: true         // GitHub Pages compatibility
  }
}
```

### Manual Deployment

#### Method 1: Direct Push (Simple)

```bash
# 1. Build the project
cd projects
npm run build

# 2. Commit changes
cd ..
git add .
git commit -m "deploy: Update projects portfolio"

# 3. Push to main branch
git push origin main
```

GitHub Pages will automatically detect changes and deploy if GitHub Actions is configured.

#### Method 2: Separate Deploy Branch

```bash
# 1. Build the project
cd projects
npm run build

# 2. Copy build output
cp -r out/* ../public/projects/

# 3. Commit and push
cd ..
git add public/projects
git commit -m "deploy: Update projects build"
git push origin main
```

### GitHub Pages Setup

1. **Go to Repository Settings**
   - Navigate to your GitHub repository
   - Click on **Settings**

2. **Configure Pages**
   - In the left sidebar, click **Pages**
   - Under "Build and deployment":
     - **Source**: Select "GitHub Actions" (recommended)
     - OR select "Deploy from a branch" and choose `main` / `/ (root)`

3. **Save and Wait**
   - Click **Save**
   - Wait 1-2 minutes for initial deployment
   - Check the **Actions** tab for deployment status

4. **Custom Domain Setup** (Optional but Recommended)
   - If using a custom domain, add a `CNAME` file to repository root
   - See [Custom Domain Configuration](#custom-domain-configuration) below

5. **Access Your Site**
   - **Custom Domain**: `https://timiolumchev.com/projects/`
   - **GitHub Pages Default**: `https://timiolumchev.github.io/web-resume-portfolio/projects/`

---

## Automated Deployment

### GitHub Actions Workflow

The repository includes a GitHub Actions workflow (`.github/workflows/deploy-projects.yml`) that automatically builds and deploys when changes are pushed to the `projects/` directory.

#### Workflow Features

- **Trigger**: Runs on push to `main` branch when `projects/**` files change
- **Build**: Installs dependencies and builds Next.js project
- **Deploy**: Deploys to GitHub Pages automatically
- **Node Version**: Uses Node.js 20
- **Cache**: Caches npm dependencies for faster builds

#### Workflow File

Located at: `.github/workflows/deploy-projects.yml`

```yaml
name: Deploy Projects to GitHub Pages

on:
  push:
    branches: ["main"]
    paths:
      - 'projects/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# ... rest of workflow
```

#### Manual Trigger

You can also manually trigger the workflow:

1. Go to **Actions** tab in GitHub
2. Select "Deploy Projects to GitHub Pages"
3. Click **Run workflow**
4. Select branch and run

### Monitoring Deployments

1. **Check Actions Tab**
   - View all workflow runs
   - See build logs and errors
   - Monitor deployment progress

2. **Build Status**
   - Green checkmark = successful deployment
   - Red X = failed deployment (check logs)
   - Yellow circle = in progress

3. **Deployment URL**
   - Each successful deployment shows the live URL
   - Click to visit the deployed site

---

## Custom Domain Configuration

This site is deployed with a custom domain: **timiolumchev.com**

### CNAME File Setup

A `CNAME` file in the repository root tells GitHub Pages to use your custom domain:

**File Location:** `/CNAME` (repository root)
**Content:**
```
timiolumchev.com
```

**Important:**
- The CNAME file should contain ONLY the domain name (no `https://`, no `/projects/`)
- This file configures the custom domain for the entire site
- The projects section will be accessible at: `https://timiolumchev.com/projects/`

### DNS Configuration

Ensure your DNS provider (e.g., Cloudflare, Namecheap) has these records:

**For Apex Domain (timiolumchev.com):**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**For WWW Subdomain (optional):**
```
Type: CNAME
Name: www
Value: [username].github.io
```

### GitHub Pages Settings

1. Go to **Settings → Pages**
2. Under "Custom domain", enter: `timiolumchev.com`
3. Check "Enforce HTTPS" (recommended)
4. Wait for DNS check to complete (green checkmark)

### Verification

Test that your custom domain works:
- Main site: `https://timiolumchev.com/`
- Desktop portfolio: `https://timiolumchev.com/resume/`
- Mobile portfolio: `https://timiolumchev.com/resume-mobile/`
- Projects section: `https://timiolumchev.com/projects/`

### Troubleshooting Custom Domain

**Issue: "Domain's DNS record could not be retrieved"**
- Wait 24-48 hours for DNS propagation
- Verify A records are correct
- Check DNS with: `dig timiolumchev.com`

**Issue: HTTPS not working**
- Ensure "Enforce HTTPS" is enabled in GitHub Pages settings
- Wait up to 24 hours for SSL certificate provisioning
- Check that DNS records are correct

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Build Fails with "Image optimization error"

**Error Message:**
```
Error: Image Optimization using Next.js' default loader is not compatible with `next export`.
```

**Solution:**
Ensure `images.unoptimized: true` is set in `next.config.mjs`:

```javascript
module.exports = {
  images: {
    unoptimized: true
  }
}
```

---

#### Issue: Styles Not Loading on GitHub Pages

**Symptoms:**
- Page loads but has no styling
- Console shows 404 errors for CSS files

**Solution:**
Verify `basePath` is set correctly in `next.config.mjs`:

```javascript
module.exports = {
  basePath: '/projects',  // Must match your subdirectory
}
```

Update all image paths to use the basePath:
```typescript
// Incorrect
<Image src="/images/thumb.webp" />

// Correct
<Image src="/projects/images/thumb.webp" />
```

---

#### Issue: 404 on Project Detail Pages

**Symptoms:**
- Main page loads fine
- Individual project pages show 404 error

**Solution:**

1. Ensure `trailingSlash: true` in `next.config.mjs`
2. Verify `generateStaticParams()` is implemented in `[slug]/page.tsx`:

```typescript
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
```

3. Check that all project slugs in `projects.json` match URL-safe format (lowercase, hyphens only)

---

#### Issue: GitHub Actions Fails on `npm ci`

**Error Message:**
```
npm ERR! `npm ci` can only install packages when your package.json and package-lock.json are in sync.
```

**Solution:**

```bash
# Delete package-lock.json and node_modules
cd projects
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Commit the updated lock file
git add package-lock.json
git commit -m "fix: Update package-lock.json"
git push
```

---

#### Issue: Slow Filter Performance

**Symptoms:**
- Filtering projects feels laggy
- UI freezes when typing in search

**Solution:**

Already implemented in `ProjectGrid.tsx` with `useMemo`:

```typescript
const filteredProjects = useMemo(() => {
  let result = filterProjects(projects, filters);
  result = sortProjects(result, filters.sortBy, filters.sortOrder);
  return result;
}, [projects, filters]);
```

If still slow, consider:
- Debouncing search input (300ms delay)
- Virtualizing list for large project counts
- Reducing animation complexity

---

#### Issue: Images Not Displaying

**Symptoms:**
- Broken image icons
- Console shows 404 for image files

**Solution:**

1. **Check image paths start with `/projects/`:**
   ```typescript
   // Correct
   "/projects/images/projects/chatbot-thumb.webp"

   // Incorrect
   "/images/projects/chatbot-thumb.webp"
   "./images/projects/chatbot-thumb.webp"
   ```

2. **Verify images exist in correct directory:**
   ```
   projects/public/images/projects/
   ├── chatbot-thumb.webp
   ├── portfolio-builder-thumb.webp
   └── ...
   ```

3. **Check image format:**
   - Use WebP format for better compression
   - Ensure files are not corrupted
   - Test locally first

---

#### Issue: Deployment Succeeds But Shows Old Content

**Symptoms:**
- GitHub Actions shows success
- Site still displays old version

**Solution:**

1. **Clear browser cache:**
   - Hard refresh: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
   - Open in incognito/private window

2. **Verify GitHub Pages source:**
   - Settings → Pages
   - Check that source is "GitHub Actions"
   - Ensure correct branch is selected

3. **Check deployment timestamp:**
   - Actions tab → View latest deployment
   - Verify it completed after your latest commit

4. **Force rebuild:**
   - Make a small change (add comment to file)
   - Push to trigger new deployment
   - OR manually trigger workflow

---

#### Issue: Module Not Found Errors

**Error Message:**
```
Module not found: Can't resolve '@/components/ProjectCard'
```

**Solution:**

Check `tsconfig.json` has correct path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Ensure imports use correct paths:
```typescript
// Correct
import { ProjectCard } from "@/components/ProjectCard";

// Incorrect
import { ProjectCard } from "../components/ProjectCard";
```

---

## Performance Checklist

Before deploying, ensure:

- [ ] All images are optimized (WebP format, compressed)
- [ ] Build completes without warnings
- [ ] Bundle size is reasonable (<500KB first load)
- [ ] All pages render correctly locally
- [ ] Links and navigation work properly
- [ ] Filters and search perform smoothly
- [ ] Mobile responsiveness is tested
- [ ] Lighthouse score >90 (run `npm run lighthouse`)

---

## Deployment Checklist

- [ ] Code is committed and pushed to main branch
- [ ] Build succeeds locally (`npm run build`)
- [ ] GitHub Actions workflow exists (`.github/workflows/deploy-projects.yml`)
- [ ] GitHub Pages is enabled in repository settings
- [ ] Source is set to "GitHub Actions"
- [ ] Workflow has completed successfully (check Actions tab)
- [ ] Site is accessible at GitHub Pages URL
- [ ] All project pages load correctly
- [ ] Images display properly
- [ ] Filters and search work
- [ ] No console errors on live site

---

## Additional Resources

### Documentation
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)

### Tools
- [WebP Converter (Squoosh)](https://squoosh.app)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Support
- Next.js Discord: https://nextjs.org/discord
- GitHub Community: https://github.community

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code quality

# Deployment
git add .
git commit -m "deploy: Update projects"
git push origin main

# Testing build locally
npx http-server out -p 3000
```

### Important Files

- `next.config.mjs` - Next.js configuration
- `package.json` - Dependencies and scripts
- `.github/workflows/deploy-projects.yml` - Deployment automation
- `src/data/projects.json` - Project data
- `public/images/projects/` - Project images

### Key URLs

- **Local Dev**: `http://localhost:3000`
- **Production (Custom Domain)**: `https://timiolumchev.com/projects/`
- **Production (GitHub Default)**: `https://timiolumchev.github.io/web-resume-portfolio/projects/`
- **Actions**: `https://github.com/timiolumchev/web-resume-portfolio/actions`
- **Settings**: `https://github.com/timiolumchev/web-resume-portfolio/settings/pages`

---

## Need Help?

If you encounter issues not covered in this guide:

1. Check the [GitHub Actions logs](https://github.com/timiolumchev/web-resume-portfolio/actions) for error messages
2. Review the [Next.js deployment documentation](https://nextjs.org/docs/deployment)
3. Search [GitHub Discussions](https://github.com/vercel/next.js/discussions)
4. File an issue in the repository
5. Verify custom domain configuration at [GitHub Pages Settings](https://github.com/timiolumchev/web-resume-portfolio/settings/pages)

---

**Last Updated**: November 2025
**Next.js Version**: 15.0.3
**Node Version**: 20.x
