# ZAYRO Deployment Guide

## 1. Objetivo
Este archivo define el flujo correcto de actualización de la web:
- primero GitHub
- luego Vercel

## 2. Flujo estándar
1. Asegúrate de estar en la rama principal:
   - `git checkout main`
   - `git pull origin main`
2. Revisa los cambios con:
   - `git status`
   - `git diff --stat`
3. Añade los archivos modificados:
   - `git add .`
4. Crea un commit con mensaje claro:
   - `git commit -m "<descripción corta del cambio>"`
5. Sube los cambios a GitHub:
   - `git push origin main`
6. Despliega a Vercel en producción:
   - `vercel deploy --prod --confirm`

## 3. Reglas de publicación
- Si el pedido es "ACTUALIZA EN LA WEB", sigue este flujo exacto.
- No se debe hacer `vercel deploy` antes de `git push`.
- Si el deploy falla, corrige en local, haz commit y vuelve a subir.

## 4. Archivos clave
- `package.json`: scripts de build.
- `vercel.json`: configuración de despliegue.
- `index.html`, `styles.css`, `script.js`: los cambios principales.

## 5. Consejos prácticos
- Comprueba en local antes de subir: abre `index.html` o usa un servidor.
- Si hay problemas en la vista, revisa la consola del navegador.
- Evita commits con mensajes genéricos como "cambios".
- Usa un mensaje descriptivo: por ejemplo "Arregla responsive de descripción del producto".
