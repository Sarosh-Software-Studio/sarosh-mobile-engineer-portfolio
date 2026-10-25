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
  const step = () => {
    const shot = rail.querySelector('.shot');
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
    return shot ? shot.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
  };
  gallery.querySelector('[data-prev]')?.addEventListener('click', () => {
    rail.scrollBy({ left: -step(), behavior: 'smooth' });
  });
  gallery.querySelector('[data-next]')?.addEventListener('click', () => {
    rail.scrollBy({ left: step(), behavior: 'smooth' });
  });
});
