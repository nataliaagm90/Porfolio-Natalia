fetch('menu.html')
  .then(response => response.text())
  .then(data => {

    // Cargar el menú en el div
    document.getElementById('menu').innerHTML = data;

    // Página actual
const pagina = decodeURIComponent(window.location.pathname).toLowerCase();

document.querySelectorAll(".nav-link").forEach(link => {

    const href = link.getAttribute("href");

    // SOBRE MÍ
    if (
        href === "home.html" &&
        pagina.includes("home")
    ) {
        link.classList.add("active");
    }

    // PROYECTOS

   

   
  // PROYECTOS
if (
    pagina.includes("proyectos") ||

    pagina.includes("diseñografico") ||
    pagina.includes("aldeasinfantiles_diseñografico") ||
    pagina.includes("sanen_diseñografico") ||
    pagina.includes("sanen_diseñografico") ||
    pagina.includes("natalia_diseñografico") ||

    pagina.includes("diseñoweb") ||

    pagina.includes("videos") ||
    pagina.includes("aldeasinfantiles_video") ||
    pagina.includes("sanen_video") ||
    pagina.includes("fundacionnaturalezahombre_video") ||

    pagina.includes("programacion")
){
    document
        .querySelector('.nav-link[href="proyectos.html"]')
        .classList.add("active");
}

// DISEÑO GRAFICO

if (

    pagina.includes("diseñografico") ||
    pagina.includes("aldeasinfantiles_diseñografico") ||
    pagina.includes("sanen_diseñografico") ||
    pagina.includes("sanen_diseñografico") ||
    pagina.includes("natalia_diseñografico") 
){
    document
        .querySelector('.submenu a[href="diseñografico.html"]')
        .classList.add("active");
}


// Diseño web
if (pagina.includes("diseñoweb")){
    document
        .querySelector('.submenu a[href="diseñoweb.html"]')
        .classList.add("active");
}

// Vídeos
if (
    pagina.includes("videos") ||
    pagina.includes("aldeasinfantiles_video") ||
    pagina.includes("sanen_video") ||
    pagina.includes("fundacionnaturalezahombre_video")
){
    document
        .querySelector('.submenu a[href="videos.html"]')
        .classList.add("active");
}

// Programación
if (pagina.includes("programacion")){
    document
        .querySelector('.submenu a[href="programacion.html"]')
        .classList.add("active");
}

    // BLOG
    if (
        href === "blog.html" &&
        pagina.includes("blog")
    ) {
        link.classList.add("active");
    }

    // CONTACTO
    if (
        href === "contacto.html" &&
        pagina.includes("contacto")
    ) {
        link.classList.add("active");
    }

});


const hamburguer = document.querySelector('.hamburguer');
const navMenu = document.querySelector('.nav-menu');


hamburguer.addEventListener('click', () => {
    hamburguer.classList.toggle('active');
    navMenu.classList.toggle('active');
});

  });


fetch("footer.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("footer").innerHTML = data;

        // Modal
        const modal = document.getElementById("modal");
        const titulo = document.getElementById("titulo-modal");
        const texto = document.getElementById("texto-modal");
        const cerrar = document.querySelector(".cerrar");

        document.getElementById("aviso").addEventListener("click", function(e){
            e.preventDefault();

            titulo.textContent = "AVISO LEGAL";
            texto.innerHTML = `
            
            <p>Este sitio web es propiedad de <strong>Natalia Giménez</strong>, diseñado con la finalidad de mostrar su portfolio profesional de diseño gráfico, diseño web, programación y proyectos audiovisuales. Correo electrónico de contacto: <strong>nataliagimenez.min@gmail.com</strong></p><br>
           
            El objetivo de esta página web es presentar trabajos, proyectos personales y profesionales, así como ofrecer información sobre los servicios de diseño y desarrollo web realizados por la autora.<br>
    

            <p>Todos los contenidos de esta página web, incluyendo textos, imágenes, diseños, logotipos, ilustraciones, vídeos, código fuente y demás elementos gráficos, son propiedad de la autora o cuentan con la correspondiente autorización para su utilización.</p><br>

            <p>Queda prohibida la reproducción, distribución, modificación o utilización de cualquier contenido sin la autorización previa y por escrito de su titular.La autora no garantiza la ausencia de errores en los contenidos publicados, aunque realizará las actuaciones necesarias para corregirlos cuando sean detectados.Asimismo, no se hace responsable del uso que terceros puedan realizar de la información publicada en este sitio web.</p><br>


            <p>Esta página puede contener enlaces a sitios web de terceros, como redes sociales o plataformas externas. La autora no se responsabiliza del contenido ni de las políticas de privacidad de dichos sitios.Los datos personales facilitados mediante el formulario de contacto serán tratados conforme a la Política de Privacidad disponible en esta página web.</p><br>

            <p>Este sitio web utiliza cookies propias y, en su caso, de terceros para mejorar la experiencia del usuario y obtener estadísticas de navegación. Puedes obtener más información en la Política de Cookies.</p><br>

            <p>El presente Aviso Legal se rige por la legislación española. Para cualquier conflicto que pudiera derivarse del acceso o uso de este sitio web, ambas partes se someten a los Juzgados y Tribunales que correspondan conforme a la normativa vigente.
            Última actualización: Julio de 2026.</p>
                
            `;

            modal.style.display = "flex";
        });

        document.getElementById("cookies").addEventListener("click", function(e){
            e.preventDefault();

            titulo.textContent = "Política de Cookies";
            texto.innerHTML = `
                Aquí irá tu política de cookies.
            `;

            modal.style.display = "flex";
        });

        document.getElementById("privacidad").addEventListener("click", function(e){
            e.preventDefault();

            titulo.textContent = "Política de Privacidad";
            texto.innerHTML = `
                Aquí irá tu política de privacidad.
            `;

            modal.style.display = "flex";
        });

        cerrar.addEventListener("click", function(){
            modal.style.display = "none";
        });

        window.addEventListener("click", function(e){
            if(e.target === modal){
                modal.style.display = "none";
            }
        });

    });


function actualizarBarra(porcentaje) {
    const barra = document.getElementById("scroll_bar");
    barra.style.width = porcentaje + "%";
}

let porcentaje = 0;

const intervalo = setInterval(() => {

    porcentaje++;
    actualizarBarra(porcentaje);

    if (porcentaje >= 100) {

        clearInterval(intervalo);

        setTimeout(() => {

            const decision = localStorage.getItem("cookies");

            if(decision){

                // Ya aceptó o rechazó anteriormente
                window.location.href = "home.html";

            }else{

                // Primera visita → mostrar banner
                banner.style.display = "block";

            }

        },300);

    }

},70);


const elementos = document.querySelectorAll(".frases, .imagenes, .video-youtube, .reto-aldeas");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.6
});

elementos.forEach(elemento => observer.observe(elemento));

/*---BANNER COOKIES- ACEPTO---*/

const banner = document.getElementById("cookie-banner");

const aceptar = document.getElementById("aceptarCookies");

const rechazar = document.getElementById("rechazarCookies");



aceptar.addEventListener("click", ()=>{

    localStorage.setItem("cookies","aceptadas");

    banner.style.display = "none";

    window.location.href = "home.html";

});

rechazar.addEventListener("click", ()=>{

    localStorage.setItem("cookies","rechazadas");

    banner.style.display = "none";

    window.location.href = "home.html";

});








