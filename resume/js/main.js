/**
 * Main Application Entry Point
 * Initializes the portfolio with all interactive features
 */

import { RippleController } from './RippleController.js'
import { TimelineTree } from './TimelineTree.js'
import { BlobNavigation } from './BlobNavigation.js'

/**
 * Portfolio Application Class
 */
class PortfolioApp {
  constructor() {
    this.rippleController = null
    this.timelineTree = null
    this.blobNavigation = null
    this.isInitialized = false
  }

  /**
   * Initialize the entire application
   */
  async init() {
    console.log('🚀 Initializing Portfolio...')

    // Show loading overlay
    this.showLoading()

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve)
      })
    }

    try {
      // Initialize components
      await this.initializeRippleEffect()
      this.initializeBlobNavigation()
      this.initializeTypewriter()
      this.initializeSkills()
      this.initializeTimeline()
      this.initializeSmoothScroll()
      this.initializeScrollAnimations()

      // Hide loading overlay - reduce delay
      setTimeout(() => {
        this.hideLoading()
        this.isInitialized = true
        console.log('✅ Portfolio initialized successfully!')
      }, 500)

    } catch (error) {
      console.error('❌ Error initializing portfolio:', error)
      this.hideLoading()
    }
  }

  /**
   * Show loading overlay
   */
  showLoading() {
    const overlay = document.getElementById('loading-overlay')
    if (overlay) {
      overlay.style.display = 'flex'
    }
  }

  /**
   * Hide loading overlay with fade out
   */
  hideLoading() {
    const overlay = document.getElementById('loading-overlay')
    if (overlay) {
      overlay.style.opacity = '0'
      setTimeout(() => {
        overlay.style.display = 'none'
        overlay.remove() // Remove from DOM completely
      }, 600)
    }
  }

  /**
   * Initialize water ripple background effect
   */
  async initializeRippleEffect() {
    const container = document.getElementById('ripple-container')
    if (!container) {
      console.warn('⚠️ Ripple container not found')
      return
    }
    this.rippleController = new RippleController(container)
    await this.rippleController.init()
  }

  /**
   * Initialize typewriter effect for hero section
   */
  initializeTypewriter() {
    const nameElement = document.getElementById('typewriter-name')
    const subtitleElement = document.getElementById('typewriter-subtitle')

    if (!nameElement || !subtitleElement) return

    const name = 'Timi Olumchev'
    const subtitle = 'QA Automation Developer turned AI Builder'

    let nameIndex = 0
    let subtitleIndex = 0
    let lastNameTime = 0
    let lastSubtitleTime = 0
    const nameSpeed = 100 // ms per character
    const subtitleSpeed = 50 // ms per character

    // Optimized typewriter using rAF
    function typeName(timestamp) {
      if (!lastNameTime) lastNameTime = timestamp

      const elapsed = timestamp - lastNameTime

      if (elapsed >= nameSpeed) {
        if (nameIndex < name.length) {
          nameElement.textContent = name.substring(0, nameIndex + 1)
          nameIndex++
          lastNameTime = timestamp
          requestAnimationFrame(typeName)
        } else {
          // Name complete - hide cursor and start subtitle
          const blinkingCursor = document.querySelector('.animate-blink')
          if (blinkingCursor) {
            setTimeout(() => {
              blinkingCursor.style.display = 'none'
            }, 500)
          }
          setTimeout(() => {
            requestAnimationFrame(typeSubtitle)
          }, 500)
        }
      } else {
        requestAnimationFrame(typeName)
      }
    }

    function typeSubtitle(timestamp) {
      if (!lastSubtitleTime) lastSubtitleTime = timestamp

      const elapsed = timestamp - lastSubtitleTime

      if (elapsed >= subtitleSpeed) {
        if (subtitleIndex < subtitle.length) {
          subtitleElement.textContent = subtitle.substring(0, subtitleIndex + 1)
          subtitleIndex++
          lastSubtitleTime = timestamp
          requestAnimationFrame(typeSubtitle)
        }
      } else {
        requestAnimationFrame(typeSubtitle)
      }
    }

    // Start typing name
    requestAnimationFrame(typeName)
  }

  /**
   * Initialize blob navigation
   */
  initializeBlobNavigation() {
    const navContainer = document.querySelector('.blob-nav-container')
    if (!navContainer) {
      console.warn('⚠️ Blob navigation container not found')
      return
    }

    this.blobNavigation = new BlobNavigation(navContainer)
  }

  /**
   * Initialize skills section with dynamic content
   */
  initializeSkills() {
    const primarySkillsContainer = document.getElementById('primary-skills')
    const qaSkillsContainer = document.getElementById('qa-skills')

    if (!primarySkillsContainer || !qaSkillsContainer) return

    // Primary AI Skills
    const primarySkills = [
      { name: 'Claude Code', icon: 'fa-code-branch', color: 'cyan', description: 'AI-powered coding assistant' },
      { name: 'n8n', icon: 'fa-sitemap', color: 'purple', description: 'Workflow automation platform' },
      { name: 'RAG', icon: 'fa-book-reader', color: 'blue', description: 'Retrieval-Augmented Generation' },
      { name: 'Agentic AI', icon: 'fa-brain', color: 'indigo', description: 'Autonomous AI systems' },
      { name: 'Supabase', icon: 'fa-server', color: 'green', description: 'Backend as a Service' },
      { name: 'MCP', icon: 'fa-puzzle-piece', color: 'cyan', description: 'Model Context Protocol' },
      { name: 'Amazon Bedrock', icon: 'fa-layer-group', color: 'orange', description: 'AWS AI foundation' },
      { name: 'GCP', icon: 'fa-cloud', color: 'blue', description: 'Google Cloud Platform' },
      { name: 'Docker', icon: 'fa-cube', color: 'cyan', description: 'Containerization platform' },
      { name: 'Knowledge Graphs', icon: 'fa-project-diagram', color: 'purple', description: 'Semantic data modeling' },
      { name: 'Lovable AI', icon: 'fa-wand-magic-sparkles', color: 'pink', description: 'AI development platform' },
      { name: 'ElevenLabs', icon: 'fa-microphone-lines', color: 'indigo', description: 'AI voice synthesis' }
    ]

    // QA & DevOps Skills
    const qaSkills = [
      { name: 'Python', icon: 'fa-file-code' },
      { name: 'Robot Framework', icon: 'fa-robot' },
      { name: 'Selenium', icon: 'fa-globe' },
      { name: 'SpecFlow', icon: 'fa-list-check' },
      { name: 'CI/CD', icon: 'fa-arrows-spin' },
      { name: 'Jenkins', icon: 'fa-gears' },
      { name: 'GitHub', icon: 'fa-code-branch' },
      { name: 'API Testing', icon: 'fa-arrow-right-arrow-left' },
      { name: 'UI Testing', icon: 'fa-window-restore' },
      { name: 'C#', icon: 'fa-file-code' },
      { name: 'NUnit', icon: 'fa-flask-vial' },
      { name: 'Agile', icon: 'fa-circle-notch' }
    ]

    // Render primary skills
    primarySkills.forEach((skill, index) => {
      const skillCard = document.createElement('div')
      skillCard.className = 'skill-card'
      skillCard.style.animationDelay = `${index * 0.1}s`
      skillCard.innerHTML = `
        <i class="fas ${skill.icon}"></i>
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
      `
      primarySkillsContainer.appendChild(skillCard)
    })

    // Render QA skills
    qaSkills.forEach((skill, index) => {
      const skillCard = document.createElement('div')
      skillCard.className = 'skill-card'
      skillCard.style.animationDelay = `${index * 0.05}s`
      skillCard.innerHTML = `
        <i class="fas ${skill.icon}"></i>
        <h3>${skill.name}</h3>
      `
      qaSkillsContainer.appendChild(skillCard)
    })
  }

  /**
   * Initialize timeline tree
   */
  initializeTimeline() {
    const timelineContainer = document.getElementById('timeline-tree')
    if (!timelineContainer) {
      console.warn('⚠️ Timeline container not found')
      return
    }

    this.timelineTree = new TimelineTree(timelineContainer)
    this.timelineTree.render()
  }

  /**
   * Initialize smooth scrolling for anchor links with snap integration
   */
  initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
          // Use scrollIntoView for proper snap integration (no navbar offset needed - transparent nav)
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      })
    })
  }

  /**
   * Initialize scroll animations for elements
   */
  initializeScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target) // Only animate once
        }
      })
    }, observerOptions)

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el)
    })

    // Observe all cards
    document.querySelectorAll('.glass-card, .stat-card, .service-card').forEach(el => {
      observer.observe(el)
    })
  }

  /**
   * Destroy and cleanup
   */
  destroy() {
    if (this.rippleController) {
      this.rippleController.destroy()
    }

    if (this.timelineTree) {
      this.timelineTree.destroy()
    }

    if (this.blobNavigation) {
      this.blobNavigation.destroy()
    }

    this.isInitialized = false
    console.log('🗑️ Portfolio destroyed')
  }
}

// Initialize app when script loads
const app = new PortfolioApp()
app.init()

// Make app globally accessible for debugging
window.portfolioApp = app

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('⏸️ Page hidden')
  } else {
    console.log('▶️ Page visible')
  }
})

// Log performance metrics
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0]
  if (perfData) {
    console.log('📊 Performance Metrics:')
    console.log(`  DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`)
    console.log(`  Page Load: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`)
    console.log(`  Total Load Time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`)
  }
})

// Error handling
window.addEventListener('error', (event) => {
  console.error('💥 Global error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('💥 Unhandled promise rejection:', event.reason)
})
