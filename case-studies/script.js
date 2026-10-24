document.querySelectorAll('.reveal').forEach((item) => {
  const observer = new IntersectionObserver(([entry], currentObserver) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    currentObserver.unobserve(entry.target);
  }, { threshold: 0.12 });
  observer.observe(item);
});

document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const rail = gallery.querySelector('.shot-rail');
  gallery.querySelector('[data-prev]')?.addEventListener('click', () => {
    rail.scrollBy({ left: -rail.clientWidth * 0.8, behavior: 'smooth' });
  });
  gallery.querySelector('[data-next]')?.addEventListener('click', () => {
    rail.scrollBy({ left: rail.clientWidth * 0.8, behavior: 'smooth' });
  });
});
