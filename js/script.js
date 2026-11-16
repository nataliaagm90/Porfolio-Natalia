/* ==========================================================================
   Portfolio Natalia Giménez · Scripts compartidos
   --------------------------------------------------------------------------
   - Carga del menú y del pie (menu.html / footer.html)
   - Portada de carga (index.html) y aviso de cookies
   - Animación de entrada de las tarjetas de proyectos
   - Cursores personalizados y lupa de la página 404
   ========================================================================== */

(function () {
    'use strict';

    const PAGINAS_DE_PROYECTO = new Set([
        'proyectos.html', 'aitana.html', 'videoaldeas.html', 'cosmeticos.html',
        'marcapersonal.html', 'videothevaluescorner.html', 'pizzeriainteligencia.html',
        'brevosanen.html', 'brevoaldeas.html', 'socialmediasanen.html'
    ]);

    const tieneRaton = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* --- Utilidades ------------------------------------------------------ */

    function paginaActual() {
        const ruta = decodeURIComponent(window.location.pathname).toLowerCase();
        return ruta.split('/').filter(Boolean).pop() || 'index.html';
    }

    function cargarFragmento(contenedor, archivo, alCargar) {
        if (!contenedor) return;
        fetch(archivo)
            .then(respuesta => {
                if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
                return respuesta.text();
            })
            .then(html => {
                contenedor.innerHTML = html;
                if (alCargar) alCargar(contenedor);
            })
            .catch(error => console.error(`Error al cargar ${archivo}:`, error));
    }

    /* --- Cookies --------------------------------------------------------- */

    function leerDecisionCookies() {
        try {
            return localStorage.getItem('cookies');
        } catch (error) {
            return null;
        }
    }

    function guardarDecisionCookies(decision) {
        try {
            localStorage.setItem('cookies', decision);
        } catch (error) {
            console.error('No se pudo guardar la decisión de cookies:', error);
        }
    }

    function hayDecisionCookies() {
        const decision = leerDecisionCookies();
        return decision === 'aceptadas' || decision === 'rechazadas';
    }

    /* Crea el aviso en las páginas que no lo traen en el HTML.
       Así quien entra directamente a un proyecto (por ejemplo desde el CV)
       lo ve sin que se le redirija a la portada. */
    function crearBannerCookies() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Aviso de cookies');
        banner.innerHTML = `
            <p class="cookie-banner__titulo">Cookies</p>
            <p>Utilizamos cookies para mejorar tu experiencia y analizar el tráfico de la web.
               Puedes aceptar todas las cookies o rechazarlas.</p>
            <div class="botones">
                <button type="button" id="rechazarCookies" class="boton boton--secundario">Rechazar</button>
                <button type="button" id="aceptarCookies" class="boton">Aceptar</button>
            </div>`;
        document.body.appendChild(banner);
        return banner;
    }

    function initCookies() {
        const enPortada = paginaActual() === 'index.html';
        let banner = document.getElementById('cookie-banner');

        if (!enPortada && !hayDecisionCookies()) {
            banner = banner || crearBannerCookies();
            banner.classList.add('visible');
        }
        if (!banner) return;

        const decidir = decision => {
            guardarDecisionCookies(decision);
            if (enPortada) {
                window.location.href = 'home.html';
            } else {
                banner.classList.remove('visible');
            }
        };

        const aceptar = banner.querySelector('#aceptarCookies');
        const rechazar = banner.querySelector('#rechazarCookies');
        if (aceptar) aceptar.addEventListener('click', () => decidir('aceptadas'));
        if (rechazar) rechazar.addEventListener('click', () => decidir('rechazadas'));
    }

    /* --- Portada de carga (index.html) ----------------------------------- */

    function initPortadaCarga() {
        const barra = document.querySelector('.barra-carga__progreso');
        if (!barra) return;

        // Si ya se eligió una opción de cookies, se pasa directamente a la home
        if (hayDecisionCookies()) {
            window.location.replace('home.html');
            return;
        }

        let porcentaje = 0;
        const intervalo = window.setInterval(() => {
            porcentaje += 1;
            barra.style.width = `${porcentaje}%`;
            if (porcentaje < 100) return;

            window.clearInterval(intervalo);
            const banner = document.getElementById('cookie-banner');
            if (banner) banner.classList.add('visible');
        }, 30);
    }

    /* --- Menú ------------------------------------------------------------ */

    function initMenu() {
        cargarFragmento(document.getElementById('menu'), 'menu.html', menu => {
            const pagina = paginaActual();

            menu.querySelectorAll('.nav-link').forEach(enlace => {
                const destino = (enlace.getAttribute('href') || '').toLowerCase();
                const activo =
                    (destino === 'proyectos.html' && PAGINAS_DE_PROYECTO.has(pagina)) ||
                    destino === pagina;
                if (activo) {
                    enlace.classList.add('active');
                    enlace.setAttribute('aria-current', 'page');
                }
            });

            const hamburguesa = menu.querySelector('.hamburguesa');
            const navMenu = menu.querySelector('.nav-menu');
            if (!hamburguesa || !navMenu) return;

            const abrirMenu = abierto => {
                hamburguesa.classList.toggle('active', abierto);
                navMenu.classList.toggle('active', abierto);
                hamburguesa.setAttribute('aria-expanded', String(abierto));
            };

            hamburguesa.addEventListener('click', () => {
                abrirMenu(!hamburguesa.classList.contains('active'));
            });
            navMenu.querySelectorAll('a').forEach(enlace => {
                enlace.addEventListener('click', () => abrirMenu(false));
            });
            document.addEventListener('keydown', evento => {
                if (evento.key === 'Escape') abrirMenu(false);
            });
        });
    }

    function initPie() {
        cargarFragmento(document.getElementById('footer'), 'footer.html');
    }

    /* --- Animación de entrada de las tarjetas ---------------------------- */

    function initTarjetasProyectos() {
        const tarjetas = document.querySelectorAll('.card');
        if (!tarjetas.length) return;

        if (!('IntersectionObserver' in window)) {
            tarjetas.forEach(tarjeta => tarjeta.classList.add('visible'));
            return;
        }

        const observador = new IntersectionObserver((entradas, obs) => {
            entradas.forEach(entrada => {
                if (!entrada.isIntersecting) return;
                entrada.target.classList.add('visible');
                obs.unobserve(entrada.target);
            });
        }, { threshold: 0.15 });

        tarjetas.forEach(tarjeta => observador.observe(tarjeta));
    }

    /* --- Línea de tiempo de "Acerca de": se dibuja al llegar a ella ------- */

    function initLineasDeTiempo() {
        const listas = document.querySelectorAll('.lista-datos');
        if (!listas.length) return;

        if (!('IntersectionObserver' in window)) {
            listas.forEach(lista => lista.classList.add('visible'));
            return;
        }

        const observador = new IntersectionObserver((entradas, obs) => {
            entradas.forEach(entrada => {
                if (!entrada.isIntersecting) return;
                entrada.target.classList.add('visible');
                obs.unobserve(entrada.target);
            });
        }, { threshold: 0.3 });

        listas.forEach(lista => observador.observe(lista));
    }

    /* --- Cursores personalizados ----------------------------------------- */

    // Círculo "VER" sobre las tarjetas de la página de proyectos
    function initCursorProyectos() {
        const cursor = document.querySelector('.cursor-proyectos');
        const tarjetas = document.querySelectorAll('.galeria .card');
        if (!cursor || !tarjetas.length || !tieneRaton) return;

        tarjetas.forEach(tarjeta => {
            tarjeta.addEventListener('mouseenter', () => cursor.classList.add('activo'));
            tarjeta.addEventListener('mousemove', evento => {
                cursor.style.left = `${evento.clientX}px`;
                cursor.style.top = `${evento.clientY}px`;
            });
            tarjeta.addEventListener('mouseleave', () => cursor.classList.remove('activo'));
        });
    }

    // Círculo fino sobre las imágenes de cada proyecto
    function initCursorImagenes() {
        const imagenes = document.querySelectorAll('.galeria-imagenes .marco');
        if (!tieneRaton || !imagenes.length) return;

        const cursor = document.createElement('div');
        cursor.className = 'cursor-seguimiento';
        cursor.setAttribute('aria-hidden', 'true');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', evento => {
            cursor.style.left = `${evento.clientX}px`;
            cursor.style.top = `${evento.clientY}px`;
        });

        imagenes.forEach(imagen => {
            imagen.addEventListener('mouseenter', () => cursor.classList.add('activo'));
            imagen.addEventListener('mouseleave', () => cursor.classList.remove('activo'));
        });
    }

    /* --- Página 404: texto que se escribe solo y lupa -------------------- */

    const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Envuelve cada letra en <span class="letra">, salvo la caligrafía, que se dibuja entera
    function separarEnLetras(elemento) {
        [...elemento.childNodes].forEach(nodo => {
            if (nodo.nodeType === Node.TEXT_NODE) {
                const texto = nodo.textContent.replace(/\s+/g, ' ');
                if (!texto.trim()) {
                    nodo.remove();
                    return;
                }
                const fragmento = document.createDocumentFragment();
                [...texto].forEach(caracter => {
                    const letra = document.createElement('span');
                    letra.className = 'letra';
                    letra.textContent = caracter;
                    fragmento.appendChild(letra);
                });
                nodo.replaceWith(fragmento);
            } else if (nodo.nodeType === Node.ELEMENT_NODE && !nodo.classList.contains('caligrafia')) {
                separarEnLetras(nodo);
            }
        });
    }

    function initPagina404() {
        const contenedor = document.querySelector('.texto-lupa');
        if (!contenedor) return;

        const original = contenedor.querySelector('.texto-lupa__original');
        const revelado = contenedor.querySelector('.texto-lupa__revelado');
        const lupa = contenedor.querySelector('.lupa');

        // Los lectores de pantalla leen la frase completa, no letra a letra
        original.setAttribute('aria-label', original.textContent.replace(/\s+/g, ' ').trim());

        // Quita los espacios sobrantes al principio de cada línea
        original.querySelectorAll('.linea').forEach(linea => {
            if (linea.firstChild && linea.firstChild.nodeType === Node.TEXT_NODE) {
                linea.firstChild.textContent = linea.firstChild.textContent.replace(/^\s+/, '');
            }
        });

        separarEnLetras(original);

        // La copia de la lupa es exactamente el mismo HTML que el original
        if (revelado) revelado.innerHTML = original.innerHTML;

        const piezasOriginal = [...original.querySelectorAll('.letra, .caligrafia')];
        const piezasCopia = revelado ? [...revelado.querySelectorAll('.letra, .caligrafia')] : [];

        const mostrar = indice => {
            piezasOriginal[indice].classList.add('visible');
            if (piezasCopia[indice]) piezasCopia[indice].classList.add('visible');
        };

        if (movimientoReducido) {
            piezasOriginal.forEach((_, indice) => mostrar(indice));
        } else {
            escribir(piezasOriginal, mostrar);
        }

        if (revelado && lupa && tieneRaton) initLupa(contenedor, revelado, lupa);
    }

    function escribir(piezas, mostrar) {
        const cursor = document.createElement('span');
        cursor.className = 'cursor-escritura';
        cursor.setAttribute('aria-hidden', 'true');

        let indice = 0;

        const siguiente = () => {
            if (indice >= piezas.length) {
                window.setTimeout(() => cursor.classList.add('oculto'), 1800);
                return;
            }

            const pieza = piezas[indice];
            mostrar(indice);
            pieza.after(cursor);

            const caracter = pieza.textContent;
            let pausa = 55;
            if (pieza.classList.contains('caligrafia')) pausa = 900;
            else if (caracter === ',' || caracter === '!') pausa = 320;
            else if (caracter === ' ') pausa = 70;

            // Pequeña pausa al cambiar de línea, como al escribir de verdad
            const siguientePieza = piezas[indice + 1];
            if (siguientePieza && siguientePieza.closest('.linea') !== pieza.closest('.linea')) pausa += 180;

            indice += 1;
            window.setTimeout(siguiente, pausa);
        };

        window.setTimeout(siguiente, 400);
    }

    // La lupa amplía la copia alrededor del ratón y la recorta en un círculo
    function initLupa(contenedor, revelado, lupa) {
        const AUMENTO = 1.35;
        const radio = () => lupa.offsetWidth / 2;

        contenedor.addEventListener('pointermove', evento => {
            if (evento.pointerType !== 'mouse') return;
            const zona = contenedor.getBoundingClientRect();
            const x = evento.clientX - zona.left;
            const y = evento.clientY - zona.top;

            revelado.style.transformOrigin = `${x}px ${y}px`;
            revelado.style.transform = `scale(${AUMENTO})`;
            revelado.style.clipPath = `circle(${radio() / AUMENTO}px at ${x}px ${y}px)`;

            lupa.style.left = `${x}px`;
            lupa.style.top = `${y}px`;
            lupa.classList.add('activa');
        });

        contenedor.addEventListener('pointerleave', () => {
            revelado.style.clipPath = 'circle(0 at 0 0)';
            lupa.classList.remove('activa');
        });
    }

    /* --- Inicio ---------------------------------------------------------- */

    function iniciar() {
        initMenu();
        initPie();
        initCookies();
        initPortadaCarga();
        initTarjetasProyectos();
        initLineasDeTiempo();
        initCursorProyectos();
        initCursorImagenes();
        initPagina404();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();
