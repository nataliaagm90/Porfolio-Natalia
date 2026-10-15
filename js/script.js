/* Portfolio Natalia Giménez — scripts compartidos */
(function () {
    'use strict';

    const PROJECT_PAGES = new Set([
        'proyectos.html', 'aitana.html', 'videoaldeas.html', 'cosmeticos.html',
        'marcapersonal.html', 'videothevaluescorner.html', 'pizzeriainteligencia.html',
        'brevosanen.html', 'brevoaldeas.html', 'socialmediasanen.html'
    ]);

    function readCookieDecision() {
        try {
            return localStorage.getItem('cookies');
        } catch (error) {
            console.error('No se pudo consultar la decisión de cookies:', error);
            return null;
        }
    }

    function saveCookieDecision(decision) {
        try {
            localStorage.setItem('cookies', decision);
            window.location.href = 'home.html';
        } catch (error) {
            console.error('No se pudo guardar la decisión:', error);
        }
    }

    function getCurrentPage() {
        const path = decodeURIComponent(window.location.pathname).toLowerCase();
        return path.split('/').filter(Boolean).pop() || 'index.html';
    }

    function loadFragment(container, file, onLoaded) {
        if (!container) return;
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                if (onLoaded) onLoaded(container);
            })
            .catch(error => console.error(`Error al cargar ${file}:`, error));
    }

    function initMenu() {
        const container = document.getElementById('menu');
        loadFragment(container, 'menu.html', menu => {
            const page = getCurrentPage();
            menu.querySelectorAll('.nav-link').forEach(link => {
                const target = (link.getAttribute('href') || '').toLowerCase();
                const active =
                    (target === 'home.html' && page === 'home.html') ||
                    (target === 'proyectos.html' && PROJECT_PAGES.has(page)) ||
                    (target === 'contacto.html' && page === 'contacto.html');
                if (active) link.classList.add('active');
            });

            const hamburger = menu.querySelector('.hamburguer');
            const navMenu = menu.querySelector('.nav-menu');
            if (!hamburger || !navMenu) return;

            const setMenuOpen = open => {
                hamburger.classList.toggle('active', open);
                navMenu.classList.toggle('active', open);
                hamburger.setAttribute('aria-expanded', String(open));
            };

            hamburger.addEventListener('click', () => {
                setMenuOpen(!hamburger.classList.contains('active'));
            });
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => setMenuOpen(false));
            });
            document.addEventListener('keydown', event => {
                if (event.key === 'Escape') setMenuOpen(false);
            });
        });
    }

    function initFooter() {
        loadFragment(document.getElementById('footer'), 'footer.html');
    }

    function initProjectCards() {
        const cards = document.querySelectorAll('.card');
        if (!cards.length) return;

        if (!('IntersectionObserver' in window)) {
            cards.forEach(card => card.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                currentObserver.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        cards.forEach(card => observer.observe(card));
    }

    function initIndexLoader() {
        const bar = document.getElementById('scroll_bar');
        if (!bar) return;

        let percentage = 0;
        const interval = window.setInterval(() => {
            percentage += 1;
            bar.style.width = `${percentage}%`;
            if (percentage < 100) return;

            window.clearInterval(interval);
            window.setTimeout(() => {
                const decision = readCookieDecision();
                if (decision === 'aceptadas' || decision === 'rechazadas') {
                    window.location.href = 'home.html';
                    return;
                }
                const banner = document.getElementById('cookie-banner');
                if (banner) banner.style.display = 'block';
                else console.error('No se encuentra el banner de cookies.');
            }, 300);
        }, 70);
    }

function initCookieButtons() {
    const accept = document.getElementById('aceptarCookies');
    const reject = document.getElementById('rechazarCookies');

    if (accept) {
        accept.addEventListener('click', function (event) {
            event.preventDefault();
            saveCookieDecision('aceptadas');
        });
    }

    if (reject) {
        reject.addEventListener('click', function (event) {
            event.preventDefault();
            saveCookieDecision('rechazadas');
        });
    }
}

    function initProjectCursor() {
        const cursor = document.querySelector('.cursor-proyectos');
        const cards = document.querySelectorAll('.galeria .card');
        const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!cursor || !cards.length || !supportsHover) return;

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => cursor.classList.add('activo'));
            card.addEventListener('mousemove', event => {
                cursor.style.left = `${event.clientX}px`;
                cursor.style.top = `${event.clientY}px`;
            });
            card.addEventListener('mouseleave', () => cursor.classList.remove('activo'));
        });
    }

    function initHomeEntrance() {
        if (getCurrentPage() === 'home.html') {
            window.requestAnimationFrame(() => document.body.classList.add('home-lista'));
        }
    }
  
    function initCursorSeguimiento() {
        // Activar únicamente en dispositivos con ratón
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }

        // Evitar crear el cursor más de una vez
        if (document.querySelector('.cursor-seguimiento')) {
            return;
        }

        const tarjetas = document.querySelectorAll('.galeria-imagenes .tarjeta');

        if (!tarjetas.length) {
            return;
        }

        // Crear el cursor circular de las páginas individuales
        const cursor = document.createElement('div');
        cursor.className = 'cursor-seguimiento';
        cursor.setAttribute('aria-hidden', 'true');
        document.body.appendChild(cursor);

        // Seguir el ratón
        document.addEventListener('mousemove', function (event) {
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
        });

        // Mostrar y ocultar el cursor en cada imagen
        tarjetas.forEach(function (tarjeta) {
            tarjeta.addEventListener('mouseenter', function () {
                cursor.classList.add('activo');
            });

            tarjeta.addEventListener('mouseleave', function () {
                cursor.classList.remove('activo');
            });
        });
    }



    function initPortfolio() {
        const page = getCurrentPage();
        const decision = readCookieDecision();
        if (page !== 'index.html' && decision !== 'aceptadas' && decision !== 'rechazadas') {
            const path = window.location.pathname;
            const base = path.substring(0, path.lastIndexOf('/') + 1);
            window.location.replace(`${base}index.html`);
            return;
        }

        initMenu();
        initFooter();
        initProjectCards();
        initIndexLoader();
        initCookieButtons();
        initProjectCursor();
        initHomeEntrance();
        initCursorSeguimiento();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPortfolio);
    } else {
        initPortfolio();
    }
})();
