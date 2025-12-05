const DROPDOWN_ARROW_LEFT = '--dropdown-arrow-left';
const DROPDOWN_MENU_POSITION_OFFSET = '-3px';

/**
 * Applies the correct position to the dropdown menu based on its bounding rectangle.
 * Ensures the dropdown menu is always fully visible in the viewport.
 * @param {HTMLElement} menu
 */
function applyDropdownMenuPosition(menu) {
  const { left, right } = menu.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  if (right > viewportWidth) {
    Object.assign(menu.style, {
      left: 'auto',
      right: DROPDOWN_MENU_POSITION_OFFSET,
      transform: 'none',
    });
  } else if (left < 0) {
    Object.assign(menu.style, {
      left: DROPDOWN_MENU_POSITION_OFFSET,
      right: 'auto',
      transform: 'none',
    });
  }
}

/**
 * Positions the dropdown arrow centered to the toggle button.
 * @param {HTMLElement} toggle
 * @param {HTMLElement} menu
 */
function setDropdownArrowPosition(toggle, menu) {
  const toggleRect = toggle.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const arrowLeft = toggleRect.left + toggleRect.width / 2 - menuRect.left;

  menu.style.setProperty(DROPDOWN_ARROW_LEFT, `${arrowLeft}px`);
}

/**
 * Closes all open dropdowns except the current one (optional).
 * @param {HTMLElement} [excludeContainer] - container to exclude from closing
 */
function closeAllDropdowns(excludeContainer = null) {
  const openDropdowns = document.querySelectorAll('[aria-expanded="true"]');

  openDropdowns.forEach((dropdown) => {
    if (dropdown !== excludeContainer) {
      dropdown.setAttribute('aria-expanded', 'false');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (menu) menu.classList.remove('visible');
    }
  });
}

/**
 * Initializes a single dropdown
 * @param {HTMLElement} container
 */
function setupDropdown(container) {
  const toggle = container.querySelector('.dropdown-toggle');
  const menu = container.querySelector('.dropdown-menu');

  if (!toggle || !menu) {
    console.warn('Missing dropdown toggle or menu in:', container);
    return;
  }

  const openDropdown = () => {
    container.setAttribute('aria-expanded', 'true');
    menu.classList.add('visible');

    closeAllDropdowns(container); // close others
    applyDropdownMenuPosition(menu);
    setDropdownArrowPosition(toggle, menu);
  };

  const closeDropdown = () => {
    container.setAttribute('aria-expanded', 'false');
    menu.classList.remove('visible');
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    const expanded = container.getAttribute('aria-expanded') === 'true';
    expanded ? closeDropdown() : openDropdown();
  };

  toggle.addEventListener('click', toggleDropdown);
}

/**
 * Handles clicks outside any dropdown to close all.
 * Attached only once to document.
 * @param {MouseEvent} e
 */
function handleClickOutsideDropdown(e) {
  if (!e.target.closest('[data-event-listener="dropdown"]')) {
    closeAllDropdowns();
  }
}

/**
 * Initializes all dropdowns on the page.
 */
function initializeDropdowns() {
  const dropdowns = document.querySelectorAll('[data-event-listener="dropdown"]');
  if (!dropdowns.length) return;

  dropdowns.forEach(setupDropdown);
  document.addEventListener('click', handleClickOutsideDropdown);
}

/**
 * Initializes the dropdowns when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', initializeDropdowns);
