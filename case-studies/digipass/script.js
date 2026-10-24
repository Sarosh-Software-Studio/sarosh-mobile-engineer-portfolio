const revealItems = document.querySelectorAll('.reveal');

revealItems.forEach((item) => {
  const delay = item.dataset.delay;
  if (delay) item.style.setProperty('--delay', `${delay}ms`);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13 }
);

revealItems.forEach((item) => observer.observe(item));

const authButton = document.querySelector('#authButton');
const phonePrompt = document.querySelector('#phonePrompt');
let demoBusy = false;

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

authButton.addEventListener('click', async () => {
  if (demoBusy) return;
  demoBusy = true;
  authButton.classList.remove('success');
  authButton.classList.add('scanning');
  phonePrompt.textContent = 'Looking for your assigned reader…';
  await wait(1100);
  phonePrompt.textContent = 'Reader found · proving credential…';
  await wait(1250);
  authButton.classList.remove('scanning');
  authButton.classList.add('success');
  phonePrompt.textContent = 'Authenticated';
  await wait(2200);
  authButton.classList.remove('success');
  phonePrompt.textContent = 'Ready near your assigned reader';
  demoBusy = false;
});
