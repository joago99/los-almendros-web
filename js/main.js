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
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
  if (!slides.length) return;

  let current = 0;

  const show = (index) => {
    slides.forEach((slide) => slide.classList.add('hidden-slide'));
    slides[index].classList.remove('hidden-slide');
  };

  show(current);

  document.getElementById('prevSlide')?.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    show(current);
  });

  document.getElementById('nextSlide')?.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    show(current);
  });

  let auto = setInterval(() => {
    current = (current + 1) % slides.length;
    show(current);
  }, 4000);

  carousel.addEventListener('mouseenter', () => clearInterval(auto));
  carousel.addEventListener('mouseleave', () => {
    auto = setInterval(() => {
      current = (current + 1) % slides.length;
      show(current);
    }, 4000);
  });
});
