document.addEventListener("DOMContentLoaded", () => {
  /* --- navigation.js --- */
// Mobile Nav & Footer Back to Top
const mobileToggle = document.getElementById('navbar-mobile-toggle');
const mobileMenu = document.getElementById('navbar-mobile-menu');
const menuIcon = document.getElementById('mobile-menu-icon');

if (mobileToggle && mobileMenu) {
  let isOpen = false;
  mobileToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      menuIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>';
    }
  });
}


  /* --- utils.js --- */
// Utilities
window.showToast = function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


});
