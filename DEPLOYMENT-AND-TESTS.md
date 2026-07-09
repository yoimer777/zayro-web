# ZAYRO Web - Despliegue y pruebas

Fecha: 2026-07-08

## Resumen

Este documento recoge los pasos usados para desplegar la versión actual, el estado de la pasarela de pago y un test básico de la página.

## Entorno y cuentas usadas

- Proyecto Git local: `/home/ing-ospino/zayro-web`
- GitHub repo: `https://github.com/yoimer777/zayro-web.git`
- Vercel account: `yoimer938-4797`
- Vercel team: `zayrocom` (slug: `zayro`)
- Vercel project: `zayro-web`
- Vercel project ID: `prj_zxmfLNFhzqYQSV6MfYn3q4VZCO56`
- Producción actual: `https://zayro-web.vercel.app`
- WhatsApp de ventas: `+57 301 673 1498`

> Nota: no se deben almacenar contraseñas ni claves secretas en este repositorio.

## Comandos de despliegue usados

1. Instalar Vercel CLI:
   - `npm install -g vercel@54.21.1`
2. Verificar sesión de Vercel:
   - `vercel whoami`
3. Desplegar a producción desde el directorio del proyecto:
   - `vercel deploy --prod --confirm`
4. Opcional para inspección:
   - `vercel inspect .`

## Configuración Vercel actual

- `vercel.json` contiene:
  - `version: 2`
  - `cleanUrls: true`
  - `outputDirectory: '.'`
  - `buildCommand: 'npm run build'`
  - `installCommand: 'npm install'`

- `package.json` define `build` como un script estático:
  - `npm run build` imprime `Static site build complete`

## Flujo actual de compra

- El sitio tiene carrito, modal de checkout y botón `Enviar pedido por WhatsApp`.
- No hay pasarela de pagos integrada en el frontend.
- El checkout es un flujo de cotización/consulta por WhatsApp:
  - Se recogen nombre, ciudad y correo.
  - Se arma un mensaje con los productos del carrito.
  - Se abre `https://wa.me/573016731498` con el mensaje codificado.
- Los métodos de pago declarados en el sitio y términos son:
  - Nequi
  - Llaves (Bancolombia)
  - Coordinación directa por WhatsApp

## Resultados de prueba / test básico

### 1. Verificación de contenido principal

- `index.html` carga el hero con:
  - `Presencia. Identidad.`
  - `Fragancias y estilo urbano.`
  - `Envíos nacionales. Asesoría personalizada.`
- La sección `PAGOS · ENVÍOS` muestra los chips:
  - `Nequi`, `Llaves`, `WhatsApp`
- El FAQ muestra claramente la política de pagos y envío.

### 2. Flujo de carrito y checkout

- Está presente el carrito lateral (`cart-sidebar`).
- El botón `Enviar pedido por WhatsApp` se habilita cuando hay productos.
- El modal de checkout recoge:
  - Nombre
  - Ciudad
  - Email opcional
- El mensaje se genera y abre WhatsApp correctamente. No hay procesamiento interno de pagos.

### 3. Estado de pasarela de pagos

- No hay integración con Stripe, PayU, MercadoPago, o pasarela similar.
- El checkout actual es puro WhatsApp + coordinación manual.
- El sitio funciona como `lead-generation` y `presale`, no como e-commerce con pago directo.

### 4. Páginas de soporte y legal

- `terminos.html` describe claramente el proceso actual:
  - productos se agregan al carrito
  - luego el cliente es contactado por WhatsApp
  - el pago se realiza fuera de la plataforma
- `privacidad.html` existe para política de datos.

## Qué le falta al sitio para una tienda completa

1. Pasarela de pagos integrada:
   - Stripe, PayU, MercadoPago, Nequi Checkout o nueva API de pagos.
2. Confirmación de pedido y página de agradecimiento.
3. Gestión de inventario / stock en backend.
4. Cálculo de envío dinámico según ciudad y peso.
5. Opciones de pago directo en el sitio, no solo por WhatsApp.
6. Validación y mensajes de error más claros en el checkout.
7. Historial de pedido o seguimiento con número de orden.
8. Mejora de SEO y accesibilidad:
   - schema.org para productos
   - alt completo en imágenes
   - etiquetas de Open Graph
9. Tests automáticos futuros:
   - pruebas de UI con Playwright o Cypress
   - validación de enlaces y de flujo de checkout

## Recomendaciones para futuros cambios

- Mantener la navegación y el checkout actuales mientras se implementa la pasarela.
- Añadir primero un botón de pago opcional que no rompa la línea de WhatsApp.
- Guardar el estado del carrito en `localStorage` como ya está hecho.
- No eliminar el flujo de asesoría por WhatsApp, porque es el valor actual.

## Política y automatización propuesta

**1. Política de la página**

- Incluir una sección breve de política de pagos en `terminos.html` y `privacidad.html`.
- Dejar claro que los pedidos se confirman con WhatsApp y que el pago puede ser por transferencias a Nequi, Llaves o tarjeta si se integra pasarela.
- Añadir aviso de protección de datos: nombre, ciudad y correo se usan solo para la compra y envío.
- Incluir cláusula de “pedido bajo confirmación” y posible plazo de entrega 2-7 días hábiles.

**2. Pasarela de pagos**

- Recomendado: Stripe o MercadoPago para cobrar con tarjeta y pago en línea.
- Alternativa local: Nequi Checkout o PayU Colombia.
- Primero integrar un botón de “Pagar con tarjeta” que abra un checkout seguro sin romper la venta por WhatsApp.
- Si se desea solución rápida y gratuita, usar el modo de cobro manual vía WhatsApp y dejar la pasarela para la próxima iteración.

**3. Automatización de mensajes**

- WhatsApp: dejar el flujo actual y luego crear mensaje automático al confirmar pedido.
  - Ejemplo: “Pedido recibido: [productos], [envase], [nombre], [ciudad], [email]. Te responde un asesor en minutos.”
- Correo: agregar envío automático de correo al completar la orden con el resumen y datos de contacto.
  - Esto requiere un servicio SMTP o email API (SendGrid, Mailgun, Amazon SES).

**4. Requerimientos para la próxima actualización**

- Implementar backend ligero o función serverless que:
  - genere la orden
  - envíe correo de confirmación
  - registre estado de pago
  - active webhook de pago si se integra Stripe/MercadoPago.
- Mantener el flujo actual de WhatsApp para no cortar ventas mientras se prueba.

**5. Estimación de costos**

- Integración de pago: generalmente gratuita en desarrollo, pero la pasarela cobra comisiones por transacción.
  - Stripe: 3.99% + COP 900 por transacción (aprox.) en Colombia.
  - MercadoPago: 4.49% + COP 900 (aprox.) dependiendo del plan.
  - Nequi Checkout: puede tener comisión menor, pero depende del acuerdo.
- Email transaccional: muchas plataformas ofrecen plan gratuito limitado.
  - SendGrid / Mailgun / Amazon SES gratis hasta 1000-2000 emails/mes.
- Infraestructura: Vercel ya está en uso y el hosting está cubierto si se mantiene en plan gratuito.
- Desarrollo: si trabajas con un desarrollador, hay costo adicional de implementación, pero la página en sí no necesita hosting pagado extra si sigue en Vercel.

> Nota: para producción no se recomienda enviar pagos sensibles solo por WhatsApp. El paso seguro es agregar pasarela y confirmación por correo.

## Notas importantes

- El despliegue en Vercel ya está activo y funcionando en `https://zayro-web.vercel.app`.
- El dominio `https://zayrocom.vercel.app` no es el alias de producción actual.
- Si el cliente pide actualizar, usar la cuenta Vercel `yoimer938-4797` y el equipo `zayrocom`.
- Para actualizaciones futuras, primero hacer commit + push a `main` y luego desplegar si es necesario.
