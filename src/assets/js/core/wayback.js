/**
 * Initializes Wayback UI components: enables draggable functionality for the Wayback container,
 * handles Wayback button redirection, and adjusts header margin to avoid overlay with the Wayback banner.
 *
 * @function initializeWaybackComponents
 */
function initializeWaybackComponents() {
  const waybackContainer = document.getElementById('wayback-container');
  const waybackButton = document.getElementById('wayback-button');
  const waybackBanner = document.querySelector('.wayback-banner');
  const legacyHeader = document.querySelector('header, #header, .header, .site-header, .main-header, .menu-scroll');

  if (!waybackContainer || !waybackButton || !waybackBanner) return;

  let isDragging = false;
  let offsetX = 0, offsetY = 0;

  waybackContainer.addEventListener('mousedown', (e) => {
    if (waybackButton.contains(e.target)) return;
    isDragging = true;
    const rect = waybackContainer.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    waybackContainer.style.transition = 'none';
    e.preventDefault();
  });

  function onMouseMove(e) {
    if (!isDragging) return;
    const maxX = window.innerWidth - waybackContainer.offsetWidth;
    const maxY = window.innerHeight - waybackContainer.offsetHeight;
    const newLeft = Math.min(Math.max(e.clientX - offsetX, 0), maxX);
    const newTop = Math.min(Math.max(e.clientY - offsetY, 0), maxY);
    Object.assign(waybackContainer.style, {
      left: `${newLeft}px`,
      top: `${newTop}px`,
      right: 'auto',
      bottom: 'auto',
      position: 'fixed',
    });
  }

  function onMouseUp() {
    if (isDragging) {
      isDragging = false;
      waybackContainer.style.transition = '';
    }
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  waybackButton.addEventListener('click', () => {
    const urlBack = waybackButton.getAttribute('data-url-back');
    if (urlBack) window.location.href = urlBack;
  });

  if (legacyHeader && waybackBanner) {
    legacyHeader.style.marginTop = `${waybackBanner.offsetHeight}px`;
  }
}

document.addEventListener('DOMContentLoaded', initializeWaybackComponents);
