# Project Images Directory

This directory contains images for the projects portfolio section.

## Placeholder Files

The following files are currently **empty placeholders** and need to be replaced with actual images:

### Thumbnail Images (1200x630px recommended)
- `chatbot-thumb.webp` - Chatbot Automation thumbnail
- `portfolio-builder-thumb.webp` - AI Portfolio Builder thumbnail
- `dashboard-thumb.webp` - Analytics Dashboard thumbnail

### Screenshot Images (Max 1920px wide)
- `chatbot-screenshot-1.webp` - Chatbot screenshot 1
- `chatbot-screenshot-2.webp` - Chatbot screenshot 2
- `chatbot-screenshot-3.webp` - Chatbot screenshot 3
- `portfolio-builder-1.webp` - Portfolio Builder screenshot 1
- `portfolio-builder-2.webp` - Portfolio Builder screenshot 2
- `dashboard-1.webp` - Analytics Dashboard screenshot

## Image Requirements

### Format
- Use **WebP format** for better compression and performance
- Convert existing images using [Squoosh](https://squoosh.app)

### Dimensions
- **Thumbnails**: 1200x630px (16:9 aspect ratio)
- **Screenshots**: Max 1920px wide, maintain aspect ratio
- **File size**: Aim for <200KB per image after compression

### Naming Convention
- Use lowercase with hyphens
- Format: `[project-slug]-[type]-[number].webp`
- Example: `chatbot-thumb.webp`, `chatbot-screenshot-1.webp`

## Adding New Project Images

When adding a new project:

1. Create thumbnail image (1200x630px)
2. Take 2-3 screenshots of key features
3. Convert all images to WebP format
4. Compress to reduce file size
5. Name files using the convention above
6. Add to this directory
7. Update project data in `src/data/projects.json`

## Tools

- **WebP Conversion**: [Squoosh](https://squoosh.app)
- **Bulk Conversion**: [ImageMagick](https://imagemagick.org/)
- **Screenshot Tool**: [Screely](https://www.screely.com/) for pretty mockups
- **Image Compression**: [TinyPNG](https://tinypng.com/)

## Example Conversion Command

Using ImageMagick to convert PNG/JPG to WebP:

```bash
# Single file
convert input.png -quality 85 output.webp

# Batch conversion
for file in *.png; do convert "$file" -quality 85 "${file%.png}.webp"; done
```

---

**Note**: These placeholder files must be replaced before deploying to production. The site will show broken image icons until real images are added.
