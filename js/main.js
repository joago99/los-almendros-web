document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
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

  const dotsContainer = document.getElementById('carouselDots');
  const dots = [];
  if (dotsContainer) {
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir a imagen ${idx + 1}`);
      dot.setAttribute('aria-selected', idx === current ? 'true' : 'false');
      dot.addEventListener('click', () => goTo(idx));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  const goTo = (i) => {
    slides.forEach(s => s.classList.remove('active'));
    if (dots[i]) dots[i].setAttribute('aria-selected', 'true');
    slides[i].classList.add('active');
    current = i;
  };
  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  document.getElementById('prevSlide')?.addEventListener('click', prev);
  document.getElementById('nextSlide')?.addEventListener('click', next);

  let auto = setInterval(next, 4000);
  carousel.addEventListener('mouseenter', () => clearInterval(auto));
  carousel.addEventListener('mouseleave', () => {
    clearInterval(auto);
    auto = setInterval(next, 4000);
  });
});
