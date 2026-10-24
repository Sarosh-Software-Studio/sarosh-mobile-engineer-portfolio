const menu = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const closeMenu = () => {
  menu?.classList.remove('open');
  menuToggle?.classList.remove('active');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
};

menuToggle?.addEventListener('click', () => {
  const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.classList.toggle('active', opening);
  menu?.classList.toggle('open', opening);
  document.body.classList.toggle('menu-open', opening);
});

document.querySelectorAll('[data-target]').forEach((button) => {
  button.addEventListener('click', () => {
    document.getElementById(button.dataset.target)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    closeMenu();
  });
});

document.querySelectorAll('.site-nav a, .brand').forEach((link) => link.addEventListener('click', closeMenu));

if (reduceMotion) {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('[data-track]').forEach((element) => {
  element.addEventListener('click', () => {
    const name = element.dataset.track;
    const label = element.dataset.trackLabel;
    if (!name || typeof window.va !== 'function') return;
    window.va('event', { name, label });
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
