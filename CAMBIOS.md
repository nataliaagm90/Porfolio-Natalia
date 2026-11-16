# Limpieza y reestructuración del código (16/11/2026)

El diseño se mantiene. Lo que cambia es cómo está organizado el código, y algunos tamaños se han igualado para que sean coherentes en toda la web.

La copia de los archivos originales está en `_copia-original-2026-11-16/`. Cuando compruebes que todo funciona, puedes borrar esa carpeta.

## Sistema de estilos (css/style.css)

Todo sale de las variables definidas al principio del archivo. Para cambiar un color, un tamaño o un espacio en toda la web, basta con tocar la variable.

| Variable | Uso |
|---|---|
| `--texto-display` | Titular grande ("Diseñadora gráfica y digital", "Hola, soy Natalia", "¿Hablamos?") |
| `--texto-h2` | Títulos de sección (¿Qué hago?, Experiencia…) |
| `--texto-titulo` | Título de cada proyecto |
| `--texto-destacado` | Subtítulos y entradillas |
| `--texto-h3` | Nombres de tarjeta, columnas de "Qué hago" y etiquetas de la ficha (Cliente, Rol…) |
| `--texto-cuerpo` | Párrafos |
| `--texto-pequeno` | Pie de página y textos secundarios |
| `--texto-mini` | Etiquetas tipo píldora |
| `--color-texto` | Color del texto general (gris oscuro #3C3C3C, nunca negro puro) |
| `--margen-lateral` | Margen izquierdo/derecho igual para menú, contenido y pie |
| `--borde-marco` | Borde turquesa de todas las imágenes (2 px) |

Componentes reutilizables:
- `.boton` / `.boton boton--secundario`: todos los botones tienen el mismo tamaño y estilo.
- `.etiqueta`: categorías de proyecto y herramientas.
- `.marco`: cualquier imagen o vídeo con borde turquesa.
- `.titular` y `.caligrafia`: titular gris con palabra en Birthstone turquesa.

## HTML
- Idioma de todas las páginas: español (`lang="es"`). Cada página tiene su título y su descripción para Google y LinkedIn.
- Un solo `h1` por página y jerarquía h1 → h2 → h3 correcta.
- `acercade.html` tenía un documento HTML entero duplicado dentro: corregido.
- Las fichas de proyecto (Cliente, Rol, Disciplina, Herramientas) usan una lista de definición (`<dl>`). Las mayúsculas se aplican por CSS, así que el texto se escribe normal.
- Todas las páginas de proyecto comparten la misma estructura y la misma navegación: Anterior · Todos los proyectos · Siguiente.
- Textos alternativos (`alt`) reales en todas las imágenes; antes muchas ponían "Video Aldeas Infantiles".
- Erratas corregidas: inteligencia, desarrollo, manteniendo, edición, vídeo, Premiere Pro, Pizzería Verde Masa…
- El botón "Anterior" de Roséa no llevaba a ningún sitio: ahora lleva al email de Aldeas.
- La página 404 vuelve a `home.html`.
- Las tarjetas comentadas sin imagen de `proyectos.html` (Idealista, Stratbuks, cartelería, baraja…) se han quitado del HTML. Están en la copia original.

## JavaScript
- Ya no se redirige a la portada de carga a quien entra directamente a un proyecto (por ejemplo, desde un enlace del CV). El aviso de cookies aparece en la página en la que esté.
- La barra de carga de la portada dura unos 3 segundos (antes 7). Para volver a como estaba, cambia `30` por `70` en `initPortadaCarga`.

## Imágenes
Se han creado copias con nombres limpios y, en el caso de las más pesadas, optimizadas. La web ya usa las nuevas:

| Antes | Ahora |
|---|---|
| natalia/Firefly_Me gustaria mantener… (1,4 MB) | natalia/natalia-gimenez.jpg (105 KB) |
| cosmeticos/colorete-movil.png (4,4 MB) | cosmeticos/rosea-colorete.jpg (269 KB) |
| cosmeticos/maquillaje-ordenador.png (1,3 MB) | cosmeticos/rosea-maquillaje-ordenador.jpg (118 KB) |
| cosmeticos/Firefly_manten la imagen… (1,2 MB) | cosmeticos/rosea-coleccion.jpg (88 KB) |
| cosmeticos/Firefly_ene l jabon… | cosmeticos/rosea-jabon.jpg |
| portadas proyectos/RestauranteIA.png (1,9 MB) | portadas proyectos/verde-masa.jpg (256 KB) |
| aldeas/email/Firefly_… (3 archivos) | aldeas/email/email-aldeas-portada / -movil / -detalle.jpg |
| sanen/email/Firefly_… | sanen/email/email-sanen-portada.jpg |
| sanen/socialmedia/Firefly_… | sanen/socialmedia/sanen-perfil-instagram.jpg |
| iconos/redes/SVG/Mesa de trabajo 14/15/16.svg | icono-email / icono-linkedin / icono-instagram.svg |

Los archivos antiguos siguen en las carpetas. Ya no se usan, así que puedes borrarlos.

## Pendiente (no se puede hacer solo con código)
- Los enlaces de Aviso legal, Cookies y Privacidad apuntan a `#`: hacen falta los textos legales con tus datos.
- El aviso de cookies dice que se analiza el tráfico, pero la web no tiene ninguna herramienta de analítica instalada. Ajusta el texto o instala la analítica.
