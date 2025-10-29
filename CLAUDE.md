# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive portfolio website featuring two versions optimized for different devices:
- **Desktop version** (`/resume/`): Full-featured with WebGL water ripples, organic SVG tree timeline, and advanced animations
- **Mobile version** (`/resume-mobile/`): Lightweight, touch-optimized interface with simplified animations

The root `index.html` automatically detects device type and redirects users to the appropriate version. User preference is stored in localStorage.

## Device Detection & Routing

### Root Index.html Logic

The root `/index.html` implements intelligent device detection with the following priority order:

1. **User Preference (Highest Priority)**
   - Checks `localStorage.getItem('resume-version-preference')`
   - Values: `'mobile'` or `'desktop'`
   - Set by manual toggle buttons in each version
   - Persists across browser sessions

2. **Automatic Device Detection**
   If no user preference exists, detects using multiple criteria:
   - **UserAgent matching**: `/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i`
   - **Touch capability**: `'ontouchstart' in window` or `navigator.maxTouchPoints > 0`
   - **Screen width**: `window.screen.width < 768`
   - **Viewport width**: `window.innerWidth < 768`

3. **Decision Algorithm**
   Mobile version if: `userAgent match` OR `(touch + small screen)` OR `(small screen + small viewport)`
   Otherwise: Desktop version

4. **Redirect Targets**
   - Mobile: `/resume-mobile/`
   - Desktop: `/resume/`

### Version Toggle Buttons

Both versions include toggle buttons that:
- Set localStorage preference when clicked
- Redirect to the other version
- Future visits respect this preference over automatic detection

**Desktop Version** (resume/index.html:941-951): "Mobile Version" button → `/resume-mobile/`
**Mobile Version** (resume-mobile/index.html:868-898): "Desktop Version" button → `/resume/`

## Architecture

### Module System

The desktop version uses ES6 modules for code organization:

- **main.js**: Application entry point and orchestration
  - Initializes all components (ripples, navigation, timeline, typewriter)
  - Manages loading overlay and performance monitoring
  - Coordinates smooth scroll and scroll animations

- **RippleController.js**: WebGL water effect management
  - Device-adaptive settings (resolution: 256/384/512 based on device)
  - Automatic cursor tracking via jQuery ripples plugin
  - Ambient drop animations using requestAnimationFrame
  - WebGL support detection with fallback

- **BlobNavigation.js**: Radial navigation system
  - TO badge in upper-left corner acts as navigation hub
  - 5 nav circles spread radially (0° to 90°) on hover
  - Circular activation area around badge (radius + 20px)
  - Smooth animations using CSS transforms and SVG

- **TimelineTree.js**: Career timeline visualization
  - Organic SVG tree with branches growing from trunk
  - 5 experience cards with leaf-shaped borders
  - Scroll-triggered animations: branch → leaf → card
  - Expandable cards with full experience details
  - IntersectionObserver for performance

### SVG Timeline Structure

The experience timeline is rendered as an SVG tree:
- **Trunk path**: Vertical curved path from y=5000 to y=0
- **Branch paths**: Horizontal branches growing to cards (left/right alternating)
- **Leaf borders**: Organic leaf shapes (green, indigo, blue, purple, cyan) that bloom on scroll
- **Cards positioned at**: (250, 4000), (950, 3200), (250, 2400), (950, 1600), (250, 800)

## Development Commands

### Local Development

```bash
# Serve with local server (recommended)
python -m http.server 3000
# Visit http://localhost:3000

# Or use any static file server
npx http-server -p 3000
```

### Testing

No automated test suite. Manual testing workflow:
1. Test both desktop and mobile versions separately
2. Verify device detection and redirect logic in root index.html
3. Test WebGL ripple fallback for non-supported browsers
4. Verify localStorage preference persistence
5. Check responsive breakpoints (mobile < 768px, tablet 768-1024px, desktop > 1024px)

### Building/Deployment

No build step required - static HTML/CSS/JS.

#### GitHub Pages Deployment

**Automatic Setup (Recommended):**
1. Push all files to your GitHub repository's `main` branch
2. Go to repository **Settings → Pages**
3. Under "Build and deployment":
   - Source: Select **"Deploy from a branch"**
   - Branch: Select **"main"** and **"/ (root)"**
   - Click **Save**
4. GitHub will automatically deploy your site
5. Wait 1-2 minutes for deployment to complete
6. Your site will be live at: `https://[username].github.io/[repo-name]/`

**Verify Deployment:**
- Check the "Actions" tab to see deployment status
- Look for a green checkmark indicating successful deployment
- Visit your site URL to test automatic device detection

**Important Files for GitHub Pages:**
- `/.nojekyll` - Prevents Jekyll processing (already created)
- `/index.html` - Root entry point with device detection
- `/resume/` - Desktop version files
- `/resume-mobile/` - Mobile version files

## Key Design Patterns

### Performance Optimization

1. **GPU Acceleration**: Only animate `transform` and `opacity`
2. **requestAnimationFrame**: All animations use rAF for smooth 60 FPS
3. **IntersectionObserver**: Lazy-load animations only when elements enter viewport
4. **Passive Event Listeners**: Scroll handlers marked passive
5. **Device-Adaptive**: Lower ripple resolution on mobile/low-end devices

### Scroll Animations

Section fade effects (resume/index.html, lines 792-910):
- Sections fade and scale based on distance from viewport center
- Experience section always stays fully visible (opacity: 1, scale: 1)
- Cards within experience section have independent fade/scale
- Updates only during scroll (debounced with 150ms timeout)

Timeline tree animations (TimelineTree.js):
- Uses IntersectionObserver with threshold: 0.3
- Animation sequence: branch (0.8s) → leaf border (1.5s delay) → card (2s delay)
- Leaf borders animate: opacity (0 → 1), scale (0.7 → 1), translateY (20px → 0)

### Navigation System

Blob navigation behavior:
- Hover/touch within activation radius (140px circle around badge) → split
- Mouse leave area → delayed merge after 300ms
- Navigation uses smooth scroll to anchors with `scrollIntoView()`
- Active section highlighting based on scroll position

## Content Structure

### Experience Data

Experience entries are defined in TimelineTree.js `getExperiences()` method. Each entry contains:
- `id`: Unique identifier for card
- `company`: Company name
- `position`: Job title
- `type`: Employment type (Full-time, Contract, etc.)
- `duration`: Full date range
- `durationShort`: Shortened duration (e.g., "5 mos")
- `location`: Geographic location and remote status
- `current`: Boolean for "Current Position" badge
- `color`: Leaf color (cyan, purple, blue, indigo, green)
- `icon`: FontAwesome icon class
- `skills`: Array of technology/skill tags
- `achievements`: Array of bullet points

### Skills Data

Skills are hardcoded in main.js `initializeSkills()`:
- **Primary AI Skills**: 12 cards with name, icon, color, description
- **QA & DevOps Skills**: 12 compact cards with name and icon
- Skills are rendered dynamically with staggered animation delays

## External Dependencies

All loaded via CDN:
- **jQuery 3.6.0**: Required for ripples plugin
- **jQuery Ripples**: WebGL water effects library
- **Tailwind CSS**: Utility-first CSS framework (configured inline)
- **Font Awesome 6.4.0**: Icon library
- **Google Fonts (Inter)**: Primary typography

## Browser Compatibility

Minimum versions:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

WebGL is required for ripple effects but gracefully degrades to static background.

## Common Modifications

### Update Experience Timeline

Edit `TimelineTree.js` → `getExperiences()` method. Add new entry to the array with all required fields.

### Adjust Ripple Settings

Edit `RippleController.js` → `getOptimalSettings()`. Modify:
- `resolution`: WebGL texture size (256/384/512)
- `dropRadius`: Size of ripple drops
- `perturbance`: Wave intensity (0.02-0.06 range)
- `ambientDropInterval`: Milliseconds between ambient drops

### Customize Colors

Primary theme colors in `css/portfolio.css`:
- `--primary-cyan: #06b6d4`
- `--primary-blue: #3b82f6`
- `--accent-green: #22c55e`
- `--accent-purple: #a855f7`
- `--accent-indigo: #6366f1`

Leaf gradient colors defined in SVG `<defs>` section of resume/index.html.

### Change Tree Structure

Tree coordinates defined in TimelineTree.js constructor:
```javascript
this.treeCoordinates = [
  { x: 250, y: 4000, branchAngle: -15, color: 'green', side: 'left' },
  // ... more entries
]
```

Adjust x, y positions and angles to reposition cards and branches.

## Important Notes

- The mobile version (`/resume-mobile/`) has its own separate HTML/CSS/JS in the `mobile/` subdirectory
- Both versions share the same PDF resume file: `Timi_Olumchev_Resume.pdf`
- Version toggle buttons allow manual switching between desktop/mobile with localStorage persistence
- The typewriter effect in hero section types name first (100ms/char), then subtitle (50ms/char)
- Navigation circles use FontAwesome icon unicode values directly in SVG `<text>` elements
- All transitions use cubic-bezier easing for smooth, organic feel
