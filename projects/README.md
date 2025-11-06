# Projects Portfolio - Next.js Application

This directory contains the Next.js application for the `/projects/` section of the portfolio.

## Setup Instructions

### 1. Install Dependencies

```bash
cd projects
npm install
```

### 2. Install Shadcn/ui Components

```bash
# Initialize Shadcn/ui (if needed)
npx shadcn@latest init

# Install required components
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add separator
npx shadcn@latest add skeleton
```

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to view the application.

### 4. Build for Production

```bash
npm run build
```

The static export will be generated in the `out/` directory.

## Configuration

### GitHub Pages Static Export

This project is configured for GitHub Pages deployment with:
- **basePath**: `/projects` (for subdirectory hosting)
- **output**: `export` (static site generation)
- **images.unoptimized**: `true` (required for static export)

### Directory Structure

```
projects/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout with metadata
│   │   ├── globals.css   # Global styles + Tailwind
│   ├── components/
│   │   └── ui/           # Shadcn/ui components (to be added)
│   ├── lib/
│   │   ├── utils.ts      # Utility functions (cn helper)
│   │   ├── projects.ts   # Project data functions
│   │   └── constants.ts  # Status colors, category icons
│   ├── types/
│   │   └── project.ts    # TypeScript interfaces
│   └── data/
│       └── projects.json # Project metadata
├── public/
│   └── images/
│       └── projects/     # Project images (add here)
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Next Steps

### Required: Install Component Files
Another agent will create:
- `src/components/ProjectCard.tsx`
- `src/components/ProjectGrid.tsx`
- `src/components/ProjectFilters.tsx`
- `src/components/ProjectDetail.tsx`
- `src/components/BackButton.tsx`
- `src/components/EmptyState.tsx`

### Required: Install Page Files
Another agent will create:
- `src/app/page.tsx` (main projects grid page)
- `src/app/[slug]/page.tsx` (dynamic project detail pages)

### Optional: Add Project Images
1. Add project images to `public/images/projects/`
2. Update paths in `src/data/projects.json`

## Technology Stack

- **Next.js 15.0.3** - App Router with React Server Components
- **React 19** - Latest React features
- **TypeScript 5.3** - Type safety
- **Tailwind CSS 3.4** - Utility-first CSS
- **Shadcn/ui** - Accessible component library
- **Lucide React** - Icon library

## Key Features

- Static Site Generation (SSG)
- Type-safe project data
- Responsive design (mobile, tablet, desktop)
- Dark theme matching existing portfolio
- Accessibility-first (WCAG 2.1 Level AA)
- Performance-optimized
