/**
 * Collapse module for toggling visibility of content sections.
 * 
 * This module attaches click event listeners to elements matching
 * the COLLAPSE_TOGGLE_SELECTOR. When toggled, it updates the visibility
 * of the associated collapse content and icon, and sets a data attribute
 * to reflect the current state.
 *
 * Usage:
 * - Add `data-event-listener="collapse-toggle"` to the toggle element.
 * - Place `.collapse-content` elements inside the toggle element.
 * - Optionally, include an icon with `.card-collapse` class inside the toggle.
 */

const COLLAPSE_TOGGLE_SELECTOR = '[data-event-listener="collapse-toggle"]';
const COLLAPSE_CONTENT_SELECTOR = '.collapse-content';
const COLLAPSE_VISIBLE_ATTRIBUTE = 'data-collapse-visible';
const COLLAPSE_TOGGLE_ICON_SELECTOR = '.card-collapse';
const COLLAPSE_CONTENT_VISIBLE_CLASS = 'visible';

/**
 * Initializes collapse functionality by attaching event listeners
 * to all collapse toggle elements in the document.
 */
function initializeCollapse() {
  document.querySelectorAll(COLLAPSE_TOGGLE_SELECTOR).forEach(toggle => {
    toggle.addEventListener('click', event => {
      event.preventDefault();

      const collapseToggleIcon = toggle.querySelector(COLLAPSE_TOGGLE_ICON_SELECTOR);
      const targetElements = toggle.querySelectorAll(COLLAPSE_CONTENT_SELECTOR);

      if (targetElements.length) {
        // Toggle icon visibility class if icon exists
        if (collapseToggleIcon) {
          collapseToggleIcon.classList.toggle(COLLAPSE_CONTENT_VISIBLE_CLASS);
        }

        // Toggle content visibility and update attribute
        targetElements.forEach(el => {
          el.classList.toggle(COLLAPSE_CONTENT_VISIBLE_CLASS);
          el.setAttribute(
            COLLAPSE_VISIBLE_ATTRIBUTE,
            el.classList.contains(COLLAPSE_CONTENT_VISIBLE_CLASS) ? 'true' : 'false'
          );
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initializeCollapse);