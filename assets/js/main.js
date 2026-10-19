'use strict';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

// Responsive menu
const menuToggle = $('.menu-toggle');
const nav = $('#main-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
$$('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

// Project filtering. Change each card's data-categories to customize.
const filters = $$('.filter');
const cards = $$('.project-card');
filters.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filters.forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  let visible = 0;
  cards.forEach((card) => {
    const matches = filter === 'all' || (card.dataset.categories || '').split(' ').includes(filter);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  $('#empty-state').hidden = visible !== 0;
}));

// Persist a chosen theme when storage is available.
const themeButton = $('#theme-toggle');
try {
  if (localStorage.getItem('portfolio-theme') === 'light') document.body.classList.add('light');
} catch (_) { /* local file browsing may restrict storage */ }
function updateThemeLabel() {
  const light = document.body.classList.contains('light');
  themeButton.textContent = light ? '☾' : '☼';
  themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
}
updateThemeLabel();
themeButton?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  updateThemeLabel();
  try { localStorage.setItem('portfolio-theme', document.body.classList.contains('light') ? 'light' : 'dark'); } catch (_) { /* optional */ }
});

// Clipboard feedback. Fallback is useful for browsers viewing local files.
$('#copy-email')?.addEventListener('click', async () => {
  const email = $('#copy-email').dataset.email;
  const feedback = $('#copy-feedback');
  try {
    await navigator.clipboard.writeText(email);
    feedback.textContent = 'Email copied to clipboard.';
  } catch (_) {
    feedback.textContent = `Email: ${email}`;
  }
});
$('#year').textContent = new Date().getFullYear();
