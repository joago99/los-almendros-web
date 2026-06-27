document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  const carousel = document.getElementById('heroCarousel');
  if (!carousel) return;
  const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
  if (!slides.length) return;

  let current = slides.findIndex(s => s.classList.contains('active'));
  if (current === -1) { current = 0; slides[0].classList.add('active'); }

  const show = (i) => {
    slides.forEach(s => s.classList.remove('active'));
    slides[i].classList.add('active');
    current = i;
  };

  document.getElementById('prevSlide')?.addEventListener('click', () => {
    show((current - 1 + slides.length) % slides.length);
  });
  document.getElementById('nextSlide')?.addEventListener('click', () => {
    show((current + 1) % slides.length);
  });

  let auto = setInterval(() => show((current + 1) % slides.length), 4000);
  carousel.addEventListener('mouseenter', () => clearInterval(auto));
  carousel.addEventListener('mouseleave', () => {
    clearInterval(auto);
    auto = setInterval(() => show((current + 1) % slides.length), 4000);
  });
});
