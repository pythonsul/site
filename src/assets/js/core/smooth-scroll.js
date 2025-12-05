// Smooth scroll if page loads with a hash
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
