// Header com fundo ao rolar
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

const setMenu = (open) => {
    navMenu.classList.toggle('open', open);
    navToggle.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
};

navToggle.addEventListener('click', () => setMenu(!navMenu.classList.contains('open')));
navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

// Link ativo conforme a seção visível
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...navLinks].map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
    });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach((s) => sectionObserver.observe(s));

// Animação de entrada
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();
