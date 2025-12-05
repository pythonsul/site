const COLOR_MODES = ['dark', 'light', 'system'];

/**
 * Sets the color scheme for the document body and updates the color mode toggle display.
 * @param {string} mode - The color mode to set ('dark', 'light', or 'system').
 */
function setColorScheme(mode = 'system') {
  document.body.classList.remove(...COLOR_MODES);
  document.body.classList.add(mode);
  document.body.setAttribute('data-color-mode', mode);

  const storedMode = storageHelper('color-mode')?.mode;

  const display = document.getElementById('color-mode-toggle');
  if (display) {
    display.classList.remove(...COLOR_MODES);

    if (!storedMode) {
      return display.classList.add('system');
    }
    return display.classList.add(mode);

  }
}

/**
 * Helper function to manage localStorage for color mode.
 * If value is undefined, it retrieves the stored value.
 * If value is provided, it stores it in localStorage.
 * @param {string} key - The key to store/retrieve the value.
 * @param {any} [value] - The value to store. If undefined, retrieves the stored value.
 * @return {any|null} The stored value or null if not found.
 */
function storageHelper(key, value) {
  if (value === undefined) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  localStorage.setItem(key, JSON.stringify(value));
}
/**
 * Handles the color mode toggle button click event.
 * It sets the color scheme based on the button's data attribute or a fallback mode.
 * It also updates the localStorage with the selected mode.
 * @param {HTMLElement} button - The button that was clicked.
 * @param {string} fallbackMode - The fallback mode to use if the button does not have a data-mode attribute.
 */
function colorModeHandler(button, fallbackMode) {
  const mode = button.getAttribute('data-mode') || fallbackMode;

  setColorScheme(mode);

  if (mode === 'system') {
    localStorage.removeItem('color-mode');
  } else {
    storageHelper('color-mode', { mode });
  }

  document
    .querySelectorAll('[data-event-listener="color-mode"]')
    .forEach(el => el.classList.toggle('active', el === button));
}

/**
 * Initializes the color scheme switcher by checking the user's preferred color scheme
 * and applying it. It also sets up event listeners for color mode toggle buttons.
 * It listens for changes in the system color scheme preference and updates accordingly.
 */
function initializeColorSchemeSwitcher() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const systemMode = prefersDark ? 'dark' : 'light';
  const storedMode = storageHelper('color-mode')?.mode;

  const initialMode = storedMode || systemMode;
  setColorScheme(initialMode);

  document.querySelectorAll('[data-event-listener="color-mode"]').forEach(toggle => {
    const mode = toggle.getAttribute('data-mode');
    toggle.classList.toggle('active', mode === initialMode);

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      colorModeHandler(toggle, systemMode);
    });
  });
}

/**
 * Listens for changes in the system color scheme preference
 * and updates the color scheme accordingly.
 */
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', initializeColorSchemeSwitcher);

/**
 * Initializes the color scheme switcher when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', initializeColorSchemeSwitcher);
