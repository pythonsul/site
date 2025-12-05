const SCHEDULE_SECTION_SELECTOR = '#schedule';
const SCHEDULE_TAB_BUTTON_SELECTOR = '.schedule-tab-button';
const SCHEDULE_TAB_CONTENT_SELECTOR = '.schedule-tab-content';
const ACTIVE_CLASS = 'active';
const ARIA_EXPANDED_ATTRIBUTE = 'aria-expanded';
const MOBILE_TABLET_MEDIA_QUERY = '(max-width: 1024px)';

/**
 * Manages the schedule tabs so that, on mobile and tablet viewports,
 * only the selected day's sessions are visible. On desktop widths,
 * all sessions remain visible while retaining the active state metadata.
 */
function initializeScheduleTabs() {
  const scheduleSection = document.querySelector(SCHEDULE_SECTION_SELECTOR);
  if (!scheduleSection) {
    return;
  }

  const tabButtons = Array.from(scheduleSection.querySelectorAll(SCHEDULE_TAB_BUTTON_SELECTOR));
  const tabPanels = Array.from(scheduleSection.querySelectorAll(SCHEDULE_TAB_CONTENT_SELECTOR));

  if (!tabButtons.length || !tabPanels.length) {
    return;
  }

  const mediaQuery = window.matchMedia(MOBILE_TABLET_MEDIA_QUERY);

  tabButtons.forEach(button => {
    button.setAttribute('type', 'button');
  });

  const getButtonTarget = button => button.getAttribute('data-schedule-tab-target');
  const getPanelTarget = panel => panel.getAttribute('data-schedule-tab-content');

  const showPanel = (panel, shouldShow) => {
    if (mediaQuery.matches) {
      panel.toggleAttribute('hidden', !shouldShow);
      panel.style.display = shouldShow ? '' : 'none';
    } else {
      panel.removeAttribute('hidden');
      panel.style.display = '';
    }
    panel.classList.toggle(ACTIVE_CLASS, shouldShow);
  };

  const activateTab = target => {
    if (!target) {
      return;
    }

    let matched = false;

    tabPanels.forEach(panel => {
      const panelTarget = getPanelTarget(panel);
      const isMatch = panelTarget === target;
      if (isMatch) {
        matched = true;
      }
      showPanel(panel, isMatch);
    });

    tabButtons.forEach(button => {
      const isMatch = getButtonTarget(button) === target;
      button.classList.toggle(ACTIVE_CLASS, isMatch);
      button.setAttribute(ARIA_EXPANDED_ATTRIBUTE, isMatch ? 'true' : 'false');
    });

    if (!matched && tabPanels.length) {
      const fallbackTarget = getPanelTarget(tabPanels[0]);
      if (fallbackTarget && fallbackTarget !== target) {
        activateTab(fallbackTarget);
      }
    }
  };

  const syncWithViewport = () => {
    if (mediaQuery.matches) {
      const activePanel =
        tabPanels.find(panel => panel.classList.contains(ACTIVE_CLASS)) || tabPanels[0];

      if (activePanel) {
        activateTab(getPanelTarget(activePanel));
      }
    } else {
      tabPanels.forEach(panel => {
        panel.removeAttribute('hidden');
        panel.style.display = '';
      });
      tabButtons.forEach(button => {
        button.setAttribute(ARIA_EXPANDED_ATTRIBUTE, 'true');
      });
    }
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', event => {
      if (!mediaQuery.matches) {
        return;
      }

      const target = getButtonTarget(button);
      if (!target) {
        return;
      }

      event.preventDefault();
      activateTab(target);
    });
  });

  syncWithViewport();

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', syncWithViewport);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(syncWithViewport);
  }
}

document.addEventListener('DOMContentLoaded', initializeScheduleTabs);
