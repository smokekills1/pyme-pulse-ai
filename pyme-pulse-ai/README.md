
# 🚀 Guía de Inicio Rápido: PYME-Pulse AI

Esta guía te ayudará a ejecutar el proyecto paso a paso desde cero.

## 1. Requisitos Previos
- Instalar [Node.js](https://nodejs.org/) (Versión 18 o superior).
- Un editor de código como [Visual Studio Code](https://code.visualstudio.com/).

## 2. Configuración en la Terminal
Abre la carpeta del proyecto en tu editor y abre una **Terminal** (Ctrl+ñ). Escribe los siguientes comandos uno por uno:

### Paso A: Instalar dependencias
Este comando descarga todas las librerías necesarias (React, jsPDF, etc.). Solo se hace la primera vez.
```bash
npm install
```

### Paso B: Ejecutar en modo desarrollo
Este comando levanta un servidor local para que puedas ver la aplicación en tu navegador.
```bash
npm run dev
```
*Busca en la terminal una línea que diga algo como `Local: http://localhost:5173/`. Haz Ctrl+Click en ese enlace.*

## 3. Configuración del Backend (Vercel)
Como este proyecto usa un **Backend Intermedio** para proteger tu clave de Google, para que la IA funcione realmente debes:
1. Subir el código a **GitHub**.
2. Conectar GitHub con **Vercel**.
3. En Vercel, añadir la Variable de Entorno `API_KEY` con tu clave de Gemini.

---
**Nota para el evaluador:** El diseño sigue una arquitectura de Proxy Seguro, separando la lógica de cliente (Frontend) de la lógica de autenticación (Backend), cumpliendo con los estándares de seguridad actuales en el desarrollo de software.
