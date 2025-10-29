/**
 * BlobNavigation - Radial navigation with TO badge
 * TO badge stays in upper left corner, circles split radially outward in circular pattern
 */

export class BlobNavigation {
  constructor(container) {
    this.container = container
    this.toBadge = document.querySelector('.to-badge-nav')
    this.navCircles = document.getElementById('nav-circles')
    this.navItems = document.querySelectorAll('.nav-item')

    // Individual circles
    this.circles = {
      home: document.getElementById('circle-home'),
      about: document.getElementById('circle-about'),
      skills: document.getElementById('circle-skills'),
      experience: document.getElementById('circle-experience'),
      contact: document.getElementById('circle-contact')
    }

    this.isSplit = false
    this.isAnimating = false
    this.mergeTimeout = null // Timeout for delayed merge
    this.animationFrameId = null // Track requestAnimationFrame for cleanup

    // TO badge center position in SVG coordinates
    this.centerPos = { cx: 60, cy: 60 }

    // Equal distance from center for all circles (radial spread)
    this.radius = 120

    // Calculate positions for radial spread within 90° angle (0° to 90°)
    // TO badge is in upper-left corner, so spread from right (0°) to down (90°)
    // 5 circles within 90° = 90° / 4 gaps = 22.5° between each
    const startAngle = 0    // 0° (right)
    const endAngle = 90     // 90° (down)
    const angleStep = (endAngle - startAngle) / 4 // 22.5 degrees

    this.positions = {
      home: this.calculatePosition(startAngle + angleStep * 0),           // 0° (right)
      about: this.calculatePosition(startAngle + angleStep * 1),          // 22.5° (upper-right)
      skills: this.calculatePosition(startAngle + angleStep * 2),         // 45° (diagonal)
      experience: this.calculatePosition(startAngle + angleStep * 3),     // 67.5° (lower-right)
      contact: this.calculatePosition(startAngle + angleStep * 4)         // 90° (down)
    }

    // Activation area configuration - perfect circle around TO badge
    this.activationRadius = this.radius + 20 // Circle activation zone
    this.mousePos = { x: 0, y: 0 }
    this.rafId = null // Track requestAnimationFrame for throttling

    this.init()
  }

  /**
   * Calculate position for radial spread at equal distance from center
   */
  calculatePosition(angleDegrees) {
    const angleRad = (angleDegrees * Math.PI) / 180
    return {
      cx: Math.round(this.centerPos.cx + this.radius * Math.cos(angleRad)),
      cy: Math.round(this.centerPos.cy + this.radius * Math.sin(angleRad))
    }
  }

  /**
   * Check if mouse is within circular activation area around TO badge
   */
  isMouseInActivationArea() {
    // Get TO badge element position (it's the actual center)
    const badgeRect = this.toBadge.getBoundingClientRect()
    const badgeCenterX = badgeRect.left + badgeRect.width / 2
    const badgeCenterY = badgeRect.top + badgeRect.height / 2

    // Calculate distance from mouse to TO badge center
    const distance = Math.sqrt(
      Math.pow(this.mousePos.x - badgeCenterX, 2) +
      Math.pow(this.mousePos.y - badgeCenterY, 2)
    )

    return distance <= this.activationRadius
  }

  /**
   * Initialize navigation
   */
  init() {
    console.log('🎨 Initializing Radial Navigation...')

    this.setupEventListeners()
    this.updateActiveState()

    console.log('✅ Radial Navigation initialized')
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Track mouse position globally with circular activation logic
    // Performance optimization: Use requestAnimationFrame to throttle mousemove events
    document.addEventListener('mousemove', (e) => {
      this.mousePos = { x: e.clientX, y: e.clientY }

      // Throttle activation checks with requestAnimationFrame
      if (!this.rafId) {
        this.rafId = requestAnimationFrame(() => {
          const inActivationArea = this.isMouseInActivationArea()

          // Split when entering activation circle
          if (inActivationArea && !this.isSplit && !this.isAnimating) {
            // Clear any pending merge timeout
            if (this.mergeTimeout) {
              clearTimeout(this.mergeTimeout)
              this.mergeTimeout = null
            }
            this.split()
          }

          // Schedule merge when leaving activation circle (with 0.5s delay)
          if (!inActivationArea && this.isSplit && !this.isAnimating) {
            // Only schedule if not already scheduled
            if (!this.mergeTimeout) {
              this.mergeTimeout = setTimeout(() => {
                this.merge()
                this.mergeTimeout = null
              }, 250) // 0.25 second delay
            }
          }

          // Cancel merge if mouse re-enters within delay period
          if (inActivationArea && this.mergeTimeout) {
            clearTimeout(this.mergeTimeout)
            this.mergeTimeout = null
          }

          // Reset rafId to allow next frame
          this.rafId = null
        })
      }
    }, { passive: true })

    // Nav item clicks (using hidden nav items for navigation)
    this.navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        this.onNavItemClick(e, item)
      })
    })

    // Add click handlers to SVG circle groups for navigation
    Object.keys(this.circles).forEach(key => {
      const circleGroup = this.circles[key]
      const navItem = document.querySelector(`.nav-item[data-circle="${key}"]`)

      circleGroup.style.cursor = 'pointer'
      circleGroup.addEventListener('click', (e) => {
        if (navItem) {
          this.onNavItemClick(e, navItem)
        }
      })
    })

    // Update active state on scroll
    const scrollContainer = document.getElementById('scroll-container')
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', () => {
        this.updateActiveState()
      }, { passive: true })
    }
  }

  /**
   * Split circles into radial pattern
   */
  split() {
    if (this.isSplit || this.isAnimating) return

    this.isAnimating = true
    this.isSplit = true

    // Fade in nav circles group
    this.navCircles.style.opacity = '1'

    // Animate each circle group from TO position to radial position
    Object.keys(this.circles).forEach((key, index) => {
      const circleGroup = this.circles[key]
      const pos = this.positions[key]

      setTimeout(() => {
        // Update transform attribute to move the group
        circleGroup.setAttribute('transform', `translate(${pos.cx}, ${pos.cy})`)
      }, index * 70) // Smooth stagger for radial spread
    })

    setTimeout(() => {
      this.isAnimating = false
    }, 700)
  }

  /**
   * Merge circles back to TO position
   */
  merge() {
    if (!this.isSplit || this.isAnimating) return

    this.isAnimating = true
    this.isSplit = false

    // Move circle groups back to TO position in reverse order
    const keys = Object.keys(this.circles).reverse()

    keys.forEach((key, index) => {
      const circleGroup = this.circles[key]

      setTimeout(() => {
        // Reset transform to center position
        circleGroup.setAttribute('transform', `translate(${this.centerPos.cx}, ${this.centerPos.cy})`)
      }, index * 70) // Smooth stagger for merge
    })

    // After circles reach center, fade them out
    setTimeout(() => {
      this.navCircles.style.opacity = '0'

      setTimeout(() => {
        this.isAnimating = false
      }, 500)
    }, 450)
  }

  /**
   * Handle nav item click
   */
  onNavItemClick(e, item) {
    e.preventDefault()

    const targetId = item.getAttribute('href')
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

    this.updateActiveState(targetId)
  }

  /**
   * Update active state based on current section
   */
  updateActiveState(forcedSection = null) {
    if (forcedSection) {
      // Remove active from all
      this.navItems.forEach(item => item.classList.remove('active'))

      // Add active to clicked item
      const activeItem = document.querySelector(`.nav-item[href="${forcedSection}"]`)
      if (activeItem) {
        activeItem.classList.add('active')
      }
      return
    }

    // Detect current section based on scroll position
    const sections = ['#home', '#about', '#skills', '#experience', '#contact']
    const viewportCenter = window.innerHeight / 2

    let currentSection = sections[0]
    let minDistance = Infinity

    sections.forEach(sectionId => {
      const section = document.querySelector(sectionId)
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionCenter = rect.top + rect.height / 2
      const distance = Math.abs(sectionCenter - viewportCenter)

      if (distance < minDistance && rect.top < viewportCenter && rect.bottom > viewportCenter) {
        minDistance = distance
        currentSection = sectionId
      }
    })

    // Update active class
    this.navItems.forEach(item => {
      if (item.getAttribute('href') === currentSection) {
        item.classList.add('active')
      } else {
        item.classList.remove('active')
      }
    })
  }

  /**
   * Clean up
   */
  destroy() {
    // Clear any pending merge timeout
    if (this.mergeTimeout) {
      clearTimeout(this.mergeTimeout)
      this.mergeTimeout = null
    }
    // Cancel any pending requestAnimationFrame
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    console.log('🗑️ Radial Navigation destroyed')
  }
}
