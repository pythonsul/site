const EVENT_DATE_START_ID = 'event-date-start';
const COUNTDOWN_ELEMENT_ID = 'countdown-timer';
const TIMEZONE_OFFSET = '-03:00'; // Brasilia Time

/**
 * Retrieves the event start date from the DOM, parses it as an ISO date string with timezone,
 * and returns a Date object if valid.
 *
 * @returns {Date|null} The parsed event start date as a Date object, or null if parsing fails or the date is not found.
 */
function getEventDate() {
  const dateText = document.getElementById(EVENT_DATE_START_ID)?.textContent.trim();
  if (!dateText) return null;

  // Appending the timezone in ISO format for better parsing
  const isoDate = `${dateText}:00${TIMEZONE_OFFSET}`;
  const date = new Date(isoDate);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Updates the countdown display with the remaining time until the event.
 * @param {HTMLElement} element - The countdown element to update.
 * @param {Object} time - An object containing the remaining time in days, hours, minutes, and seconds.
 * @param {number} time.days - The number of days remaining.
 * @param {number} time.hours - The number of hours remaining.
 * @param {number} time.minutes - The number of minutes remaining.
 * @param {number} time.seconds - The number of seconds remaining.
 */
function updateCountdownDisplay(element, { days, hours, minutes, seconds }) {
  element.querySelector('#days span').textContent = days;
  element.querySelector('#hours span').textContent = hours;
  element.querySelector('#minutes span').textContent = minutes;
  element.querySelector('#seconds span').textContent = seconds;
}

/**
 * Initializes the countdown timer by calculating the time remaining until the event starts.
 * It updates the countdown display every second until the event starts.
 * If the event has already started, it displays a message indicating that the event has begun.
 */
function initializeCountdown() {
  const countdownElement = document.getElementById(COUNTDOWN_ELEMENT_ID);
  const eventDate = getEventDate();

  if (!eventDate || !countdownElement) {
    return;
  }

  const intervalId = setInterval(() => {
    const now = new Date();
    const timeDiff = eventDate - now;

    if (timeDiff <= 0) {
      clearInterval(intervalId);
      countdownElement.innerHTML = '<span>Evento iniciado!</span>';
      return;
    }

    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const hours = Math.floor((timeDiff / 1000 / 60 / 60) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    updateCountdownDisplay(countdownElement, { days, hours, minutes, seconds });
  }, 1000);
}

/**
 * Initializes the countdown timer when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', initializeCountdown);
