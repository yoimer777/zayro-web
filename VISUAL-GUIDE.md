# ZAYRO Visual & UI Guide

## 1. Resumen de identidad
- Marca: ZAYRO — propuesta urbana, premium y minimalista.
- Estilo: fondo oscuro con detalles cálidos dorados, tipografía sólida y alto contraste.
- Objetivo: sensación de lujo discreto + claridad funcional para navegar y comprar.

## 2. Colores principales
- `--zayro-black`: #0b0b0a
- `--zayro-charcoal`: #1a1816
- `--zayro-bone`: #f5f3ef
- `--zayro-mist`: #9c958c
- `--zayro-accent`: #b8915a

### Uso recomendado
- Fondo general: `--zayro-black`
- Paneles y cards suaves: `--zayro-charcoal` o transparencias negras.
- Texto principal: `--zayro-bone`
- Texto secundario: `--zayro-mist`
- Accentos, botones y bordes destacados: `--zayro-accent`

## 3. Tipografías
- Base: `font-family: 'Inter', sans-serif;`
- Títulos grandes y secciones premium: `font-family: 'Anton', sans-serif;`
- Peso general: `700` en botones y títulos, `400-500` en párrafos.

## 4. Botones
### Botón estándar
- Clase base: `.button`
- Tamaño: `padding: 1rem 1.4rem`, `min-height: 54px`
- Border radius: `18px`
- Transición suave en hover/active.

### Botón primario
- Clase: `.button--primary`
- Fondo: `var(--zayro-accent)`
- Texto: `var(--zayro-black)`
- Hover: `#fff9df`
- Uso: acciones principales, enviar, comprar, confirmar.

### Botón ghost
- Clase: `.button--ghost`
- Fondo transparente claro, borde suave, texto blanco.
- Uso: acciones secundarias, cerrar, cancelar, ver más.

### Botones especiales
- `.button--large`: botones destacados de llamada a la acción en secciones grandes.
- `.product-cta`: botón en tarjetas de catálogo.
- `.variant-button`: botón de selección de talle/corte.

## 5. Catálogo y cards
### Estructura habitual
- `article.product-card.product-card--catalog`
- Imagen en `.product-card__media`
- Texto en `.product-card__body`
- Botón de acción: `button.button.product-cta`
- Etiqueta de marca: `.card__label`
- Título: `h3`

### Tipos de contenido
- Título corto y directo.
- Precio o texto de consulta: `p.product-price`.
- Botón siempre claro: "Ver producto".
- Las imágenes deben ser buenas, con `alt` descriptivo.

### Catálogos nuevos
- Guardar imágenes en `assets/catalog-images/`.
- Usar nombres de archivo limpios y con mayúsculas mínimas.
- Incluir `alt` que describa marca + modelo.
- Mantener la estructura de `product-card--catalog` usada en `index.html`.

## 6. Detalle de producto
- El panel de detalle usa `.detail-info` para separar información.
- Texto de price/status/hint debe quedar compacto y legible.
- Sección de "Descripción" es un cuadro con `.detail-section`.
- Selecciones de variantes usan `.variant-button` y deben ser pequeñas pero táctiles.

## 7. Textos y jerarquía
- Heading de secciones: `h2` o `h3` con tracking amplio y mayúsculas cuando corresponda.
- Los títulos de sección pequeños usan `.detail-section-title` en mayúsculas.
- Texto de párrafo: siempre color claro sobre fondo oscuro.
- Mensajes secundarios: `var(--zayro-mist)`.

## 8. Layout y espaciado
- Contenedores principales usan `width: var(--container)`.
- Secciones con `gap` cómodos y no demasiado pegados.
- En detalle de producto, el contenido se adapta con `grid` y `@media`.
- En móviles, cada bloque debe ser `100%` y no apilar demasiado ancho.

## 9. Iconos y enlaces
- Links claros y con foco visible.
- Botones de WhatsApp / Instagram deben estar visibles pero no robar atención.
- El icono flotante de carrito y el chat se mantienen en esquina.

## 10. Cómo subir catálogos y productos
1. Añade la imagen en `assets/catalog-images/`.
2. Añade una nueva `article.product-card.product-card--catalog` dentro del `catalog-grid`.
3. Rellena:
   - `data-product-id` con un identificador sencillo.
   - `img src` y `alt` descriptivo.
   - marca en `.card__label`.
   - nombre en `h3`.
   - precio en `p.product-price`.
   - botón `button.button.product-cta`.
4. Para productos destacados o nueva línea, sigue el mismo layout de cards.

## 11. Despliegue y actualización de la web
### Regla fija de despliegue
- Siempre primero `GitHub`, luego `Vercel`.
- Si el cliente dice *"ACTUALIZA EN LA WEB"*, el paso es:
  1. `git add .`
  2. `git commit -m "<mensaje claro>"`
  3. `git push origin main`
  4. `vercel deploy --prod --confirm`

### Nota importante
- Nunca desplegar directamente en Vercel sin subir primero a GitHub.
- El repositorio principal es `origin/main`.
- Esto es una política que queda guardada para todas las mejoras futuras.

## 12. Reglas de estilo para futuras mejoras
- Usa siempre variables CSS para colores y contenedores.
- Mantén la paleta simple: oscuro + hueso + acento dorado.
- Los botones deben ser consistentes y legibles en móvil.
- El catálogo debe ser claro, con acciones inmediatas y fotos limpias.
- Los cambios grandes de diseño deben revisarse en local antes de subir.

## 13. Archivo de referencia
- `styles.css` es la fuente única del estilo visual.
- `index.html` contiene la estructura de catálogo, botones y modales.
- `README-DEV.md` describe reglas de edición y deployment.
- `VISUAL-GUIDE.md` es la guía viviente para la identidad visual.
