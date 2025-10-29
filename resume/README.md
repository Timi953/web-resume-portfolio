# 🌊 Timi Olumchev - Interactive AI Portfolio

> A stunning, modern web portfolio featuring WebGL water effects, organic SVG tree timeline, and interactive animations.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://timi953.github.io/web-resume-portfolio/)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)](https://pages.github.com/)

---

## ✨ Key Features

### 🎨 Visual Effects
- **WebGL Water Ripples** - Interactive background with realistic water physics
- **Organic SVG Tree Timeline** - Career journey visualized as a growing tree with leaf-shaped card borders
- **Blob Navigation** - Unique morphing navigation with magnetic interactions
- **Glass Morphism UI** - Modern frosted glass aesthetic with gradient accents
- **Smooth Scroll Animations** - Cards and leaves bloom gracefully as you scroll

### 🤖 AI & Technology Focus
- Comprehensive AI skills showcase (Claude Code, n8n, RAG, Agentic AI)
- Cloud platforms (Amazon Bedrock, GCP, Supabase)
- Interactive career timeline with expandable experience cards
- Colorful language badges (Green for Macedonian, Cyan for English, Blue for Romanian)

### 📱 Responsive & Performant
- Fully responsive across all devices
- GPU-accelerated animations (60 FPS)
- Optimized for performance with requestAnimationFrame
- Accessibility-friendly with keyboard navigation

---

## 🚀 Quick Start

### View Locally

```bash
# Clone the repository
git clone https://github.com/Timi953/web-resume-portfolio.git
cd web-resume-portfolio

# Open in browser
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux

# OR serve with local server
python -m http.server 3000
# Visit http://localhost:3000
```

### Deploy to GitHub Pages

This portfolio is part of a unified hosting setup with automatic device detection:

**Automated Deployment (Recommended):**
1. Push to your GitHub repository's `main` branch
2. GitHub Actions will automatically deploy to GitHub Pages
3. Go to Settings → Pages to verify deployment
4. Your site will be live at `https://yourusername.github.io/repo-name/`

**How it works:**
- Root `/index.html` detects device type and redirects automatically
- Desktop users → `/resume/` (this version with WebGL ripples)
- Mobile users → `/resume-mobile/` (lightweight mobile version)
- Users can manually switch versions using the toggle button
- Preference is stored in localStorage for future visits

**Manual Setup:**
If GitHub Actions isn't enabled:
1. Go to Settings → Pages
2. Select `GitHub Actions` as the source
3. Commit and push - the workflow will run automatically

---

## 📁 Project Structure

```
web-resume-portfolio/
├── index.html                   # Main HTML file
├── Timi_Olumchev_Resume.pdf    # Downloadable resume
├── css/
│   └── portfolio.css           # All styles, animations, and themes
├── js/
│   ├── main.js                 # Entry point and initialization
│   ├── BlobNavigation.js       # Blob navigation system
│   ├── RippleController.js     # Water ripple effects controller
│   └── TimelineTree.js         # Timeline tree with scroll animations
└── README.md                   # This file
```

---

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Custom animations, glass morphism, gradients
- **JavaScript ES6+** - Modules, async/await, IntersectionObserver
- **jQuery & jQuery Ripples** - WebGL water effects
- **Font Awesome 6.4.0** - Icons
- **Google Fonts (Inter)** - Typography
- **SVG** - Organic tree timeline with custom paths

---

## 🎨 Customization

### Update Your Information

**Personal Details** (index.html, lines ~60-90):
```html
<h1>Your Name</h1>
<p>Your Title</p>
```

**Experience Timeline** (js/TimelineTree.js, `getExperiences()` method):
```javascript
{
  company: 'Your Company',
  position: 'Your Position',
  duration: 'Start - End',
  skills: ['Skill1', 'Skill2'],
  achievements: ['Achievement 1', 'Achievement 2']
}
```

**Skills** (index.html, lines ~250-350):
```html
<div class="skill-card">
  <i class="fas fa-your-icon"></i>
  <h3>Your Skill</h3>
</div>
```

**Contact Info** (index.html, lines ~690-710):
```html
<a href="mailto:your@email.com">
<a href="tel:+1234567890">
<a href="https://linkedin.com/in/yourprofile">
```

### Customize Colors

The portfolio uses a cyan-blue-green theme. Edit in `css/portfolio.css`:

```css
/* Primary Colors */
--primary-cyan: #06b6d4;
--primary-blue: #3b82f6;
--accent-green: #22c55e;
--accent-purple: #a855f7;
--accent-indigo: #6366f1;
```

### Adjust Animations

**Leaf appearance speed** (css/portfolio.css, lines ~916-921):
```css
.leaf-border {
  transition: opacity 1.5s ease, transform 1.8s ease;
}
```

**Ripple settings** (js/RippleController.js, lines ~20-35):
```javascript
{
  resolution: 512,
  dropRadius: 20,
  perturbance: 0.04,
  interactive: true
}
```

---

## 🌳 Timeline Tree Features

The organic SVG tree timeline includes:

- **5 Career Positions** - Each represented as a leaf on the tree
- **Color-Coded Leaves** - Green, Indigo, Blue, Purple, Cyan
- **Scroll-Triggered Animations**:
  1. Branch grows from trunk (stroke-dasharray animation)
  2. Leaf border blooms around card (scale + fade + translate)
  3. Card content becomes visible
- **Decorative Elements** - Small branches with tiny leaves between cards
- **Organic Curves** - Trunk uses complex cubic bezier curves for natural appearance

---

## ⚡ Performance Optimizations

- ✅ **GPU Acceleration** - `transform` and `opacity` animations only
- ✅ **requestAnimationFrame** - Frame-synchronized animations
- ✅ **IntersectionObserver** - Lazy-load animations on scroll
- ✅ **Will-Change Hints** - Browser rendering optimization
- ✅ **Passive Event Listeners** - Non-blocking scroll events
- ✅ **Device-Adaptive** - Lower ripple resolution on mobile

---

## 📱 Responsive Design

| Device | Width | Features |
|--------|-------|----------|
| Mobile | < 768px | Simplified tree, centered titles, touch-optimized |
| Tablet | 768px - 1024px | Balanced layout, reduced effects |
| Desktop | > 1024px | Full experience, title on left, all animations |

---

## ♿ Accessibility

- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ ARIA labels where needed
- ✅ Focus indicators on interactive elements
- ✅ Sufficient color contrast (WCAG AA)
- ✅ Alt text for all meaningful images

---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |

**Note**: WebGL required for water effects. Gracefully degrades if unavailable.

---

## 📄 License

This portfolio is free to use for personal purposes. Please provide attribution if you use it as a base for your own portfolio.

---

## 👤 About Me

**Timi Olumchev**
AI Automation Developer | QA Expert

- 📧 Email: tolumcev@gmail.com
- 📞 Phone: +(389)78 650-255
- 🔗 LinkedIn: [timi-olumcev-951770205](https://www.linkedin.com/in/timi-olumcev-951770205/)
- 💻 GitHub: [Timi953](https://github.com/Timi953)
- 📍 Location: Skopje, North Macedonia

---

## 🙏 Credits

- **jQuery Ripples** - WebGL water effect library
- **Font Awesome** - Icon library
- **Google Fonts** - Inter typography
- **Claude Code** - AI-assisted development

---

**Built with 🤖 Claude Code & ❤️**

*Last updated: October 2025*
