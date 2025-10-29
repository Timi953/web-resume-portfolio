/**
 * Timeline Tree Component
 * Creates an interactive visual timeline of work experience
 * with expandable cards and tree structure
 */

export class TimelineTree {
  constructor(containerElement) {
    this.container = containerElement
    this.experiences = this.getExperiences()
    this.expandedCards = new Set()

    // Tree coordinates for branch/leaf positioning and animation
    // Each coordinate defines where a branch grows and a leaf appears
    this.treeCoordinates = [
      { x: 250, y: 4000, branchAngle: -15, color: 'green', side: 'left' },
      { x: 950, y: 3200, branchAngle: 15, color: 'indigo', side: 'right' },
      { x: 250, y: 2400, branchAngle: -18, color: 'blue', side: 'left' },
      { x: 950, y: 1600, branchAngle: 20, color: 'purple', side: 'right' },
      { x: 250, y: 800, branchAngle: -12, color: 'cyan', side: 'left' }
    ]

    this.treeObserver = null
  }

  /**
   * Get all work experiences data
   */
  getExperiences() {
    return [
      {
        id: 'weber-media',
        company: 'Weber Media® Consulting GmbH',
        position: 'AI Automation Developer',
        type: 'Contract',
        duration: 'Jun 2025 - Present',
        durationShort: '5 mos',
        location: 'North Macedonia • Remote',
        current: true,
        color: 'cyan',
        icon: 'fa-robot',
        skills: ['n8n', 'Claude Code', 'Supabase', 'Lovable AI', 'MCP', 'Stripe', 'ElevenLabs', 'Veo3', 'Blotato', 'Airtable', 'GCP', 'Amazon Bedrock', 'Docker', 'RAG', 'Agentic AI'],
        achievements: [
          'Design and build SaaS and PaaS solutions powered by AI',
          'Integrate LLMs into existing workflows for enterprise clients',
          'Create agentic AI automation systems with n8n and Claude',
          'Implement RAG and Knowledge Graph-based NLP solutions',
          'Develop cloud-native applications on GCP and AWS'
        ]
      },
      {
        id: 'rldatix',
        company: 'RLDatix & Allocate Macedonia',
        position: 'QA Automation Developer',
        type: 'Full-time',
        duration: 'Dec 2021 - Present',
        durationShort: '3 yrs 11 mos',
        location: 'Skopje, North Macedonia',
        current: false,
        color: 'purple',
        icon: 'fa-code',
        skills: ['Python', 'Robot Framework', 'Selenium', 'SpecFlow', 'Test Automation', 'CI/CD', 'Jenkins', 'GoCD', 'GitHub', 'NUnit', 'Agile'],
        achievements: [
          'Lead the development and maintenance of automated test frameworks for enterprise applications',
          'Drive continuous integration by integrating automated tests into CI/CD pipelines',
          'Collaborate with product owners, developers, and stakeholders for quality assurance',
          'Mentor junior automation engineers and contribute to process improvement initiatives',
          'Significantly improve efficiency and reliability of software releases'
        ]
      },
      {
        id: 'causeway',
        company: 'Causeway Connect',
        position: 'QA Engineer',
        type: 'Full-time',
        duration: 'Sep 2021 - Dec 2021',
        durationShort: '4 mos',
        location: 'Skopje, North Macedonia',
        current: false,
        color: 'blue',
        icon: 'fa-flask',
        skills: ['SpecFlow', 'C#', 'Selenium', 'UI Testing', 'API Testing', 'Agile', 'BDD', 'CSS', 'HTML', 'SQL'],
        achievements: [
          'Developed and executed automated test scripts using SpecFlow and C#',
          'Worked within Agile teams for sprint planning, test case design, and bug tracking',
          'Supported continuous improvement by implementing best practices for automation'
        ]
      },
      {
        id: 'crmt',
        company: 'CRMT Digital',
        position: 'QA Engineer',
        type: 'Full-time',
        duration: 'Sep 2021 - Dec 2021',
        durationShort: '4 mos',
        location: 'Skopje, North Macedonia',
        current: false,
        color: 'indigo',
        icon: 'fa-check-circle',
        skills: ['SpecFlow', 'C#', 'Selenium', 'BDD', 'Test Automation', 'Agile', 'CSS', 'HTML', 'SQL'],
        achievements: [
          'Collaborated with cross-functional teams to develop automated test cases',
          'Delivered high-quality software products through rigorous testing',
          'Performed manual and automated testing for web applications'
        ]
      },
      {
        id: 'dimitrycode',
        company: 'dimITrycode',
        position: 'QA Manual Software Tester',
        type: 'Contract',
        duration: 'Dec 2020 - Dec 2021',
        durationShort: '1 yr 1 mo',
        location: 'Gevgelija, North Macedonia',
        current: false,
        color: 'green',
        icon: 'fa-bug',
        skills: ['Manual Testing', 'SDLC', 'Test Case Design', 'Bug Reporting', 'Quality Assurance'],
        achievements: [
          'Conducted comprehensive manual testing of web and software applications',
          'Collaborated with developers to define test cases and report defects',
          'Gained deep familiarity with Software Development Life Cycle (SDLC)',
          'Ensured timely delivery of high-quality products'
        ]
      }
    ]
  }

  /**
   * Initialize and render the timeline
   */
  render() {
    if (!this.container) {
      console.error('Timeline container not found!')
      return
    }

    // Clear container
    this.container.innerHTML = ''

    // Create timeline structure
    const timelineWrapper = document.createElement('div')
    timelineWrapper.className = 'timeline-wrapper'

    this.experiences.forEach((exp, index) => {
      const timelineItem = this.createTimelineItem(exp, index)
      timelineWrapper.appendChild(timelineItem)
    })

    this.container.appendChild(timelineWrapper)

    // Add event listeners for expand/collapse
    this.addEventListeners()

    // Animate timeline on scroll
    this.observeTimeline()

    // Initialize tree growth animations
    // This will observe when cards come into view and trigger branch/leaf animations
    this.observeTreeGrowth()
  }

  /**
   * Create a single timeline item
   */
  createTimelineItem(exp, index) {
    const item = document.createElement('div')
    item.className = 'timeline-item fade-in'
    item.style.animationDelay = `${index * 0.2}s`
    item.setAttribute('data-id', exp.id)

    const isExpanded = this.expandedCards.has(exp.id)

    item.innerHTML = `
      <div class="timeline-connector ${exp.color}"></div>
      <div class="timeline-card glass-card ${exp.current ? 'timeline-card-current' : ''}" data-color="${exp.color}" data-index="${index}">
        <!-- Badge -->
        ${exp.current ? '<div class="current-badge">Current Position</div>' : ''}

        <!-- Header -->
        <div class="timeline-card-header">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <div class="timeline-icon ${exp.color}">
                  <i class="fas ${exp.icon}"></i>
                </div>
                <div>
                  <h3 class="text-xl md:text-2xl font-bold text-white">${exp.position}</h3>
                  <p class="text-${exp.color}-400 font-semibold">${exp.company}</p>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 text-sm text-gray-400 mb-3">
                <span><i class="fas fa-briefcase mr-1"></i>${exp.type}</span>
                <span><i class="fas fa-calendar mr-1"></i>${exp.durationShort}</span>
                <span><i class="fas fa-map-marker-alt mr-1"></i>${exp.location}</span>
              </div>
            </div>
            <button class="expand-btn" data-id="${exp.id}" aria-label="Toggle details">
              <i class="fas fa-chevron-down transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}"></i>
            </button>
          </div>
        </div>

        <!-- Skills -->
        <div class="flex flex-wrap gap-2 mb-4">
          ${exp.skills.slice(0, 6).map(skill => `
            <span class="skill-chip skill-chip-${exp.color}">${skill}</span>
          `).join('')}
          ${exp.skills.length > 6 ? `
            <span class="skill-chip skill-chip-${exp.color}">+${exp.skills.length - 6} more</span>
          ` : ''}
        </div>

        <!-- Expandable Content -->
        <div class="timeline-card-content ${isExpanded ? 'expanded' : ''}">
          <div class="timeline-card-inner">
            <h4 class="text-white font-semibold mb-3 flex items-center">
              <i class="fas fa-star text-${exp.color}-400 mr-2"></i>
              Key Achievements
            </h4>
            <ul class="space-y-2">
              ${exp.achievements.map(achievement => `
                <li class="text-gray-300 flex items-start">
                  <i class="fas fa-check text-${exp.color}-400 mr-2 mt-1 flex-shrink-0"></i>
                  <span>${achievement}</span>
                </li>
              `).join('')}
            </ul>

            ${exp.skills.length > 6 ? `
              <div class="mt-4 pt-4 border-t border-white/10">
                <h4 class="text-white font-semibold mb-3">All Technologies Used</h4>
                <div class="flex flex-wrap gap-2">
                  ${exp.skills.map(skill => `
                    <span class="skill-chip skill-chip-${exp.color}">${skill}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <div class="mt-4 text-sm text-gray-500">
              <i class="fas fa-clock mr-1"></i>
              ${exp.duration}
            </div>
          </div>
        </div>
      </div>
    `

    return item
  }

  /**
   * Add event listeners for expand/collapse
   */
  addEventListeners() {
    const expandBtns = this.container.querySelectorAll('.expand-btn')

    expandBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const id = btn.getAttribute('data-id')
        this.toggleCard(id)
      })
    })
  }

  /**
   * Toggle card expansion
   */
  toggleCard(id) {
    const card = this.container.querySelector(`[data-id="${id}"]`)
    if (!card) return

    const content = card.querySelector('.timeline-card-content')
    const icon = card.querySelector('.expand-btn i')
    const timelineItem = card.closest('.timeline-item')

    // Get the card index for leaf scaling
    const cardIndex = Array.from(this.container.querySelectorAll('[data-id]')).indexOf(card)
    const leaf = document.querySelector(`#leaf-${cardIndex + 1}`)

    if (this.expandedCards.has(id)) {
      // Collapse
      this.expandedCards.delete(id)
      content.classList.remove('expanded')
      icon.classList.remove('rotate-180')

      // Reset leaf scale on collapse
      if (leaf) {
        leaf.style.transform = 'scale(1)'
      }

      // Re-center the collapsed card
      setTimeout(() => {
        if (timelineItem) {
          this.centerCard(timelineItem)
        }
      }, 100) // Small delay to allow collapse animation to start
    } else {
      // Expand
      this.expandedCards.add(id)
      content.classList.add('expanded')
      icon.classList.add('rotate-180')

      // Scale up leaf on expansion
      if (leaf) {
        leaf.style.transform = 'scale(1.05)'
      }

      // Center the expanded card
      setTimeout(() => {
        if (timelineItem) {
          this.centerCard(timelineItem)
        }
      }, 100) // Small delay to allow expansion animation to start
    }
  }

  /**
   * Center a card in the viewport, accounting for navbar and card height
   */
  centerCard(timelineItem) {
    if (!timelineItem) return

    // Get card position and dimensions (navbar is now transparent, no offset needed)
    const cardRect = timelineItem.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const cardHeight = cardRect.height

    // If card is taller than viewport, align top with small padding
    if (cardHeight > viewportHeight * 0.95) {
      const padding = 20 // 20px padding from top
      const targetTop = padding
      const scrollOffset = cardRect.top - targetTop

      const scrollContainer = document.getElementById('scroll-container')
      if (scrollContainer) {
        scrollContainer.scrollBy({
          top: scrollOffset,
          behavior: 'smooth'
        })
      }
    } else {
      // Card fits - center it in full viewport
      const targetCenter = viewportHeight / 2
      const cardCenter = cardRect.top + (cardHeight / 2)
      const scrollOffset = cardCenter - targetCenter

      const scrollContainer = document.getElementById('scroll-container')
      if (scrollContainer) {
        scrollContainer.scrollBy({
          top: scrollOffset,
          behavior: 'smooth'
        })
      }
    }
  }

  /**
   * Observe timeline items for scroll animations
   */
  observeTimeline() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, options)

    const items = this.container.querySelectorAll('.timeline-item')
    items.forEach(item => observer.observe(item))
  }

  /**
   * Observe tree growth animations based on scroll position
   * Triggers branch growth and leaf border appearance when cards come into viewport
   */
  observeTreeGrowth() {
    const options = {
      threshold: 0.3,
      rootMargin: '0px 0px -20% 0px'
    }

    let visibleCount = 0

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index)
          // Grow the branch first
          this.growBranch(index)
          // Then bloom the leaf border after a delay for smooth appearance
          setTimeout(() => this.bloomLeafBorder(index), 900)
          // Show decorative branches after 2 cards are visible
          visibleCount++
          if (visibleCount >= 2) {
            setTimeout(() => this.showDecorativeBranches(), 1500)
          }
        }
      })
    }, options)

    // Observe each timeline card for tree growth animation
    document.querySelectorAll('.timeline-card').forEach((el, i) => {
      if (!el.dataset.index) {
        el.dataset.index = i
      }
      observer.observe(el)
    })

    this.treeObserver = observer
  }

  /**
   * Trigger branch growth animation
   * @param {number} index - Index of the branch to grow
   */
  growBranch(index) {
    const branch = document.querySelector(`#branch-${index + 1}`)
    if (branch) {
      branch.classList.add('grown')
    }
  }

  /**
   * Trigger leaf border bloom animation
   * @param {number} index - Index of the leaf border to bloom
   */
  bloomLeafBorder(index) {
    const leafBorder = document.querySelector(`#leaf-border-${index + 1}`)
    if (leafBorder) {
      leafBorder.classList.add('bloomed')
    }
  }

  /**
   * Show decorative branches with small leaves
   */
  showDecorativeBranches() {
    const decorativeBranches = document.querySelector('.decorative-branches')
    if (decorativeBranches) {
      decorativeBranches.classList.add('visible')
    }
  }

  /**
   * Destroy timeline and cleanup
   */
  destroy() {
    // Disconnect tree observer to prevent memory leaks
    if (this.treeObserver) {
      this.treeObserver.disconnect()
      this.treeObserver = null
    }

    if (this.container) {
      this.container.innerHTML = ''
    }
    this.expandedCards.clear()
  }
}
