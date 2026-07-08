# ZAYRO Web - Desarrollo seguro

Este documento recoge reglas básicas para editar el proyecto sin romper la página.

## Regla 1: chequear sintaxis antes de guardar
- Si se modifica `script.js`, revisa que no falten llaves `}` ni comas `,` en objetos literales.
- Usa un editor con resaltado de sintaxis o `npm test` si hay una tarea de lint.

## Regla 2: no borrar bloques completos sin copia
- Antes de eliminar secciones grandes de código, copia el bloque en un comentario temporal.
- Si no estás seguro, comenta con `/* ... */` en lugar de borrar.

## Regla 3: `chatFlow` requiere claves únicas
- Cada nodo debe ser un par `clave: { message, options }`.
- No dejes mensajes o opciones sueltos sin una clave en el objeto.

## Regla 4: pruebas rápidas
- Abre `index.html` en el navegador local después de cambios en JavaScript.
- Si la página carga en blanco, busca errores de consola en `F12`.

## Regla 5: estructura del chat
- `chatFlow` define rutas de conversación.
- `handleChatOption()` envía las opciones a la función `handleChatAction()`.
- `renderChatOptions()` crea botones con `action` o `next`.

## Notas de emergencia
- Si la web está en blanco, el error probable es un fallo de sintaxis en `script.js`.
- Busca `Uncaught SyntaxError` en consola y revisa el bloque donde aparece.
