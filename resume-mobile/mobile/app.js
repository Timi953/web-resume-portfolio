// ============================================================================
// Mobile Resume App - Vanilla JavaScript
// Production-ready mobile-optimized interactive resume
// ============================================================================

// DOM Element Cache
const DOM = {
  // Mobile menu elements
  hamburger: null,
  mobileMenu: null,
  mobileOverlay: null,
  menuClose: null,
  navLinks: null,

  // Section elements
  sections: null,

  // Experience cards
  experienceToggles: null,
};

// State management
const state = {
  isMenuOpen: false,
  activeSection: 'home',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Debounce function - limits function calls during rapid events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait = 150) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Smooth scroll to element
 * @param {string} targetId - ID of target element (without #)
 */
const smoothScrollTo = (targetId) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const headerOffset = 70;
  const targetPosition = target.offsetTop - headerOffset;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};

/**
 * Get current scroll position
 * @returns {number} Current scroll position
 */
const getScrollPosition = () => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

// ============================================================================
// MOBILE MENU FUNCTIONALITY
// ============================================================================

/**
 * Open mobile menu
 */
const openMenu = () => {
  if (state.isMenuOpen) return;

  state.isMenuOpen = true;
  DOM.mobileMenu?.classList.add('active');
  DOM.mobileOverlay?.classList.add('active');
  DOM.hamburger?.setAttribute('aria-expanded', 'true');

  // Prevent body scroll when menu is open
  document.body.style.overflow = 'hidden';

  // Focus first link
  const firstLink = DOM.mobileMenu?.querySelector('a');
  firstLink?.focus();
};

/**
 * Close mobile menu
 */
const closeMenu = () => {
  if (!state.isMenuOpen) return;

  state.isMenuOpen = false;
  DOM.mobileMenu?.classList.remove('active');
  DOM.mobileOverlay?.classList.remove('active');
  DOM.hamburger?.setAttribute('aria-expanded', 'false');

  // Restore body scroll
  document.body.style.overflow = '';

  // Return focus to hamburger button
  DOM.hamburger?.focus();
};

/**
 * Toggle mobile menu
 */
const toggleMenu = () => {
  state.isMenuOpen ? closeMenu() : openMenu();
};

/**
 * Handle navigation link click
 * @param {Event} e - Click event
 */
const handleNavClick = (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  e.preventDefault();

  const targetId = link.getAttribute('href').substring(1);

  // Close menu if open
  if (state.isMenuOpen) {
    closeMenu();
  }

  // Small delay to allow menu to close
  setTimeout(() => {
    smoothScrollTo(targetId);
    updateActiveNavLink(targetId);
  }, 100);
};

/**
 * Handle outside click to close menu
 * @param {Event} e - Click event
 */
const handleOutsideClick = (e) => {
  if (!state.isMenuOpen) return;

  // Close menu if clicking overlay
  if (e.target === DOM.mobileOverlay) {
    closeMenu();
  }
};

/**
 * Handle escape key to close menu
 * @param {Event} e - Keyboard event
 */
const handleEscapeKey = (e) => {
  if (e.key === 'Escape' && state.isMenuOpen) {
    closeMenu();
  }
};

// ============================================================================
// ACTIVE SECTION DETECTION
// ============================================================================

/**
 * Update active navigation link based on scroll position
 * @param {string} sectionId - Optional section ID to set as active
 */
const updateActiveNavLink = (sectionId = null) => {
  let activeId = sectionId;

  // If no section provided, detect from scroll position
  if (!activeId && DOM.sections) {
    const scrollPos = getScrollPosition();
    const viewportCenter = scrollPos + (window.innerHeight / 2);

    // Find section closest to viewport center
    let closestSection = null;
    let closestDistance = Infinity;

    DOM.sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollPos + rect.top;
      const sectionCenter = sectionTop + (rect.height / 2);
      const distance = Math.abs(viewportCenter - sectionCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section;
      }
    });

    activeId = closestSection?.id || 'home';
  }

  // Only update if changed
  if (activeId === state.activeSection) return;

  state.activeSection = activeId;

  // Update nav links
  DOM.navLinks?.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${activeId}`) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
};

// ============================================================================
// EXPERIENCE CARD ACCORDION
// ============================================================================

/**
 * Toggle experience card expansion
 * @param {Event} e - Click event
 */
const toggleExperienceCard = (e) => {
  const button = e.currentTarget;
  const card = button.closest('.experience-card');
  if (!card) return;

  const details = card.querySelector('.experience-details');
  if (!details) return;

  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  // Toggle current card
  button.setAttribute('aria-expanded', !isExpanded);

  if (isExpanded) {
    details.classList.remove('expanded');
  } else {
    details.classList.add('expanded');
  }
};

// ============================================================================
// SCROLL EVENT HANDLER
// ============================================================================

/**
 * Handle scroll events (debounced)
 */
const handleScroll = debounce(() => {
  updateActiveNavLink();
}, 150);

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Cache DOM elements
 */
const cacheDOMElements = () => {
  // Mobile menu
  DOM.hamburger = document.querySelector('.hamburger');
  DOM.mobileMenu = document.querySelector('.menu');
  DOM.mobileOverlay = document.querySelector('.menu-overlay');
  DOM.menuClose = document.querySelector('.menu-close');
  DOM.navLinks = document.querySelectorAll('.menu a[href^="#"]');

  // Sections
  DOM.sections = document.querySelectorAll('section[id]');

  // Experience card toggles
  DOM.experienceToggles = document.querySelectorAll('.expand-toggle');
};

/**
 * Attach event listeners
 */
const attachEventListeners = () => {
  // Mobile menu toggle
  DOM.hamburger?.addEventListener('click', toggleMenu);
  DOM.menuClose?.addEventListener('click', closeMenu);

  // Navigation links
  DOM.navLinks?.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });

  // Overlay click to close menu
  DOM.mobileOverlay?.addEventListener('click', handleOutsideClick);

  // Escape key to close menu
  document.addEventListener('keydown', handleEscapeKey);

  // Scroll events (passive for performance)
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Window resize
  window.addEventListener('resize', debounce(() => {
    updateActiveNavLink();
  }, 250), { passive: true });

  // Experience card toggles
  DOM.experienceToggles?.forEach(button => {
    button.addEventListener('click', toggleExperienceCard);
  });

  // Touch events for better mobile interaction
  let touchStartX = 0;
  let touchStartY = 0;

  DOM.mobileMenu?.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  DOM.mobileMenu?.addEventListener('touchmove', (e) => {
    if (!state.isMenuOpen) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const deltaX = touchStartX - touchEndX;
    const deltaY = Math.abs(touchStartY - touchEndY);

    // Swipe right to close menu (if horizontal swipe is more than vertical)
    if (deltaX < -50 && deltaX < -deltaY) {
      closeMenu();
    }
  }, { passive: true });
};

/**
 * Initialize the application
 */
const init = () => {
  // Cache DOM elements
  cacheDOMElements();

  // Attach event listeners
  attachEventListeners();

  // Set initial active section
  updateActiveNavLink();

  console.log('Mobile Resume App initialized successfully');
};

// ============================================================================
// START APPLICATION
// ============================================================================

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM already loaded
  init();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { init, closeMenu, openMenu, smoothScrollTo };
}
