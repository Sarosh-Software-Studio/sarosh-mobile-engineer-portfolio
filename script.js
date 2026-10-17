const header = document.querySelector('[data-header]');
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

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const dots = carousel.querySelector('.carousel-dots');
  let activeIndex = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement('i');
    dot.classList.toggle('active', index === 0);
    dots?.append(dot);
  });

  const showSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => slide.classList.toggle('active', index === activeIndex));
    dots?.querySelectorAll('i').forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
  };

  carousel.querySelector('.previous')?.addEventListener('click', () => showSlide(activeIndex - 1));
  carousel.querySelector('.next')?.addEventListener('click', () => showSlide(activeIndex + 1));
});

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
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const contactForm = document.querySelector('[data-contact-form]');
const formNote = document.querySelector('[data-form-note]');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const subject = String(data.get('subject') || '').trim() || 'Portfolio inquiry';
  const message = String(data.get('message') || '').trim();
  const body = [name ? `Name: ${name}` : '', email ? `Reply email: ${email}` : '', '', message].filter(Boolean).join('\n');
  if (formNote) formNote.textContent = 'Opening your email app with this message prefilled…';
  window.location.href = `mailto:sarosh.mobileengineer@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(body)}`;
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
