/**
 * Ripple Controller for Portfolio
 * Manages water ripple background effects using jQuery.ripples
 * Optimized for maximum performance with cursor tracking
 */

export class RippleController {
  constructor(containerElement) {
    this.container = containerElement
    this.isInitialized = false
    this.ambientDropInterval = null
    this.ambientDropRafId = null // Track requestAnimationFrame for ambient drops
    this.lastDropTime = 0 // Track last drop timestamp
    this.settings = this.getOptimalSettings()

    console.log('🌊 RippleController initialized with settings:', this.settings)
  }

  /**
   * Detect device capabilities and return optimal settings
   */
  getOptimalSettings() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 || isMobile

    // Performance profiles - matching login screen settings
    if (isMobile) {
      return {
        resolution: 256,           // Lower resolution for mobile
        dropRadius: 20,            // Match login screen
        perturbance: 0.04,         // Match login screen
        interactive: true,         // Enables automatic cursor ripples
        crossOrigin: '',
        ambientDropInterval: 6000  // Less frequent drops
      }
    } else if (isLowEndDevice) {
      return {
        resolution: 384,           // Medium resolution
        dropRadius: 20,            // Match login screen
        perturbance: 0.04,         // Match login screen
        interactive: true,         // Enables automatic cursor ripples
        crossOrigin: '',
        ambientDropInterval: 5000
      }
    } else {
      return {
        resolution: 512,           // High resolution for powerful devices
        dropRadius: 20,            // Match login screen
        perturbance: 0.04,         // Match login screen
        interactive: true,         // Enables automatic cursor ripples
        crossOrigin: '',
        ambientDropInterval: 4000  // Match login screen
      }
    }
  }

  /**
   * Check if WebGL is supported
   */
  isWebGLSupported() {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      return !!gl
    } catch (e) {
      return false
    }
  }

  /**
   * Initialize ripple effects
   */
  async init() {
    if (!this.container) {
      console.error('❌ Ripple container not found!')
      return
    }

    // Check WebGL support
    if (!this.isWebGLSupported()) {
      console.warn('⚠️ WebGL not supported - ripple effect disabled')
      this.fallbackBackground()
      return
    }

    // Wait for jQuery to be available
    await this.waitForJQuery()

    console.log('🚀 Initializing water ripple effect...')

    try {
      // Check if ripples plugin is available
      if (!window.jQuery || !window.jQuery.fn.ripples) {
        console.error('❌ jQuery ripples plugin not loaded!')
        this.fallbackBackground()
        return
      }

      // Apply ripple effect to container with optimal settings
      // interactive: true makes ripples follow cursor movement automatically
      window.jQuery(this.container).ripples({
        resolution: this.settings.resolution,
        dropRadius: this.settings.dropRadius,
        perturbance: this.settings.perturbance,
        interactive: true,  // CRITICAL: enables automatic cursor tracking ripples
        crossOrigin: this.settings.crossOrigin
      })


      console.log('🎯 Interactive cursor ripples enabled - move your mouse across the background!')

      // Start ambient drops
      this.startAmbientDrops()

      // Pause when tab is hidden to save resources
      this.addVisibilityHandler()

      this.isInitialized = true
      console.log('✅ Water ripple effect initialized - move your mouse to see ripples!')
    } catch (error) {
      console.error('❌ Failed to initialize ripples:', error)
      this.fallbackBackground()
    }
  }

  /**
   * Fallback background if WebGL fails
   */
  fallbackBackground() {
    if (this.container) {
      // Keep the background image even without ripples
      this.container.style.backgroundImage = "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')"
      this.container.style.backgroundSize = 'cover'
      this.container.style.backgroundPosition = 'center'
      console.log('ℹ️ Using fallback static background (WebGL not supported)')
    }
  }

  /**
   * Pause/resume ripples when tab visibility changes
   */
  addVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop()
        console.log('⏸️ Ripple effects paused (tab hidden)')
      } else {
        this.startAmbientDrops()
        console.log('▶️ Ripple effects resumed (tab visible)')
      }
    })
  }

  /**
   * Wait for jQuery to be loaded
   */
  waitForJQuery() {
    return new Promise((resolve) => {
      const checkJQuery = () => {
        if (window.jQuery) {
          resolve()
        } else {
          setTimeout(checkJQuery, 100)
        }
      }
      checkJQuery()
    })
  }

  /**
   * Start ambient water drops for continuous effect
   * Performance optimization: Use requestAnimationFrame loop instead of setInterval
   */
  startAmbientDrops() {
    this.lastDropTime = performance.now()

    const ambientLoop = (timestamp) => {
      if (!this.isInitialized || !window.jQuery) return

      // Calculate time since last drop
      const elapsed = timestamp - this.lastDropTime

      // Only create drop if enough time has passed (maintaining original interval timing)
      if (elapsed >= this.settings.ambientDropInterval) {
        const $el = window.jQuery(this.container)
        const x = Math.random() * $el.outerWidth()
        const y = Math.random() * $el.outerHeight()
        const dropRadius = 10 + Math.random() * 10
        const strength = 0.03 + Math.random() * 0.03

        try {
          $el.ripples('drop', x, y, dropRadius, strength)
        } catch (error) {
          console.error('Error creating ambient drop:', error)
        }

        // Reset timer for next drop
        this.lastDropTime = timestamp
      }

      // Continue the loop
      this.ambientDropRafId = requestAnimationFrame(ambientLoop)
    }

    // Start the animation loop
    this.ambientDropRafId = requestAnimationFrame(ambientLoop)

    console.log('✅ Ambient water drops started (interval:', this.settings.ambientDropInterval, 'ms)')
  }

  /**
   * Stop ambient drops
   */
  stop() {
    // Clean up requestAnimationFrame
    if (this.ambientDropRafId) {
      cancelAnimationFrame(this.ambientDropRafId)
      this.ambientDropRafId = null
    }
    // Keep legacy interval cleanup for compatibility
    if (this.ambientDropInterval) {
      clearInterval(this.ambientDropInterval)
      this.ambientDropInterval = null
    }
  }

  /**
   * Destroy controller and cleanup
   */
  destroy() {
    this.stop()

    if (this.isInitialized && window.jQuery && this.container) {
      try {
        window.jQuery(this.container).ripples('destroy')
        console.log('🗑️ Ripple effect destroyed')
      } catch (error) {
        console.error('Error destroying ripples:', error)
      }
    }

    this.isInitialized = false
  }
}
