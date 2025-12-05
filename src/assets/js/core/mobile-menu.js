/**
 * Initializes the mobile menu toggle functionality.
 * Handles opening/closing the menu and updates ARIA attributes for accessibility.
 * Closes the menu when clicking outside of it.
 */
const MOBILE_MENU_TOGGLE = 'mobile-menu-button';
const MOBILE_MENU_CONTAINER = 'mobile-menu';

/**
 * Sets up event listeners for mobile menu interactions.
 */
function initializeMobileMenu() {
  const mobileMenuButton = document.getElementById(MOBILE_MENU_TOGGLE);
  if (!mobileMenuButton) return;

  const menu = document.getElementById(MOBILE_MENU_CONTAINER);
  if (!menu) return;

  mobileMenuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = menu.classList.toggle('open');
    mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
      menu.classList.remove('open');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeMobileMenu);