const CAROUSEL_INTERVAL = 4000;

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', !isHidden);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  const carousel = document.getElementById('heroCarousel');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
    if (!slides.length) return;

    let current = 0;
    slides.forEach((slide, idx) => {
      if (idx !== 0) slide.classList.add('hidden-slide');
    });

    setInterval(() => {
      slides[current].classList.add('hidden-slide');
      current = (current + 1) % slides.length;
      slides[current].classList.remove('hidden-slide');
    }, CAROUSEL_INTERVAL);
  }
});
