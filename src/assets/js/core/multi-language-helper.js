const ML_SELECTOR = '[data-event-listener="go-to-translated-page"]';
const DEFAULT_CONTENT_LANG = 'pt-br';
const CONTENT_KEY_ATTRIBUTE = 'data-content-key';
const SITE_CONTENT_DATA_URL = '/index.json';

/**
 * Returns the content key of the current page
 */
function getContentKey() {
  return (
    document.querySelector(`[${CONTENT_KEY_ATTRIBUTE}]`)
      ?.getAttribute(CONTENT_KEY_ATTRIBUTE) || 'home'
  );
}

/**
 * Builds the path prefix for a given language
 */
function getLangPath(lang) {
  return lang === DEFAULT_CONTENT_LANG ? '' : `/${lang}`;
}

/**
 * Loads site content data for the given language
 */
async function loadSiteContent(lang) {
  const langPath = getLangPath(lang);
  const response = await fetch(`${langPath}${SITE_CONTENT_DATA_URL}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch site content for lang "${lang}"`);
  }
  return response.json();
}

/**
 * Navigates to the translated page for the given language
 */
async function goToTranslatedPage(lang) {
  try {
    const { content, pages } = await loadSiteContent(lang);
    const contentKey = getContentKey();
    const entry = [...content, ...pages].find(item => item.key === contentKey);

    const langPath = getLangPath(lang) || '/';
    const targetLink = entry?.link || `${langPath}${window.location.hash}`;

    window.location.href = targetLink;
  } catch (error) {
    console.error('Error switching language:', error);
  }
}

/**
 * Initializes the multi-language helper
 */
function initializeMultiLanguageHelper() {
  document.querySelectorAll(ML_SELECTOR).forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      if (!lang) return;

      await goToTranslatedPage(lang);
    });
  });
}

document.addEventListener('DOMContentLoaded', initializeMultiLanguageHelper);
