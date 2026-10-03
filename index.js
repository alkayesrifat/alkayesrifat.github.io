document.addEventListener("DOMContentLoaded", () => {
  /* --- lightbox.js --- */
// Lightbox
const figures = document.querySelectorAll('.gallery-figure');
const lightboxRoot = document.getElementById('lightbox-root');
const lbImgWrap = document.getElementById('lb-img-wrap');
const lbMainImg = document.getElementById('lb-main-img');
const lbCaption = document.getElementById('lb-caption');
const lbCounter = document.getElementById('lb-counter');
const lbClose = document.getElementById('lb-close-btn');
const lbPrev = document.getElementById('lb-prev-btn');
const lbNext = document.getElementById('lb-next-btn');

let currentIdx = 0;
const imagesData = Array.from(figures).map((fig, idx) => {
  const img = fig.querySelector('img');
  const caption = fig.querySelector('.gallery-caption span');
  fig.setAttribute('data-idx', idx);
  fig.addEventListener('click', () => openLightbox(idx));
  return { src: img.src, alt: img.alt, caption: caption ? caption.textContent : '' };
});

function openLightbox(idx) {
  if (!lightboxRoot) return;
  currentIdx = idx;
  updateLightbox();
  lightboxRoot.style.display = 'flex';
  void lightboxRoot.offsetWidth;
  lightboxRoot.classList.add('lb-visible');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxRoot) return;
  lightboxRoot.classList.remove('lb-visible');
  document.body.style.overflow = '';
  setTimeout(() => {
    lightboxRoot.style.display = 'none';
  }, 320);
}

function updateLightbox() {
  if (!imagesData.length || !lightboxRoot) return;
  const data = imagesData[currentIdx];
  lbMainImg.src = data.src;
  lbMainImg.alt = data.alt;
  lbCaption.textContent = data.caption;
  lbCounter.textContent = `${currentIdx + 1} / ${imagesData.length}`;
}

function showNext() {
  currentIdx = (currentIdx + 1) % imagesData.length;
  updateLightbox();
}

function showPrev() {
  currentIdx = (currentIdx - 1 + imagesData.length) % imagesData.length;
  updateLightbox();
}

if (lightboxRoot) {
  lightboxRoot.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox-root') closeLightbox();
  });
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  if (lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  if (lbImgWrap) lbImgWrap.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('keydown', (e) => {
    if (lightboxRoot.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
}


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
