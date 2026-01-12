
# PYME-Pulse AI: Business Intelligence para PYMES

Este proyecto es una solución integral de Inteligencia Artificial diseñada para ayudar a las PYMES a automatizar su marketing, gestionar su reputación online y realizar análisis estratégicos de negocio.

## ✨ Características
- **Marketing Estratégico:** Generación de copy publicitario optimizado para diferentes plataformas.
- **Gestión de Reputación:** Respuestas institucionales automáticas a reseñas de clientes.
- **Consultoría AI:** Análisis DAFO y de viabilidad de ideas de negocio.
- **Exportación PDF:** Generación de informes profesionales con estética corporativa.
- **Arquitectura Segura:** Backend intermedio (Proxy) para proteger las claves de API.

## 🚀 Cómo empezar

### 1. Preparación Local
1. Clona este repositorio o descarga los archivos.
2. Asegúrate de tener Node.js instalado.
3. Instala las dependencias:
   ```bash
   npm install
   ```

### 2. Configuración de GitHub
Para subir este proyecto a tu cuenta:
1. Crea un repositorio nuevo en GitHub.
2. En tu terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PYME-Pulse AI"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

### 3. Despliegue en Vercel (Recomendado)
Este proyecto está preparado para funcionar como "Serverless" en Vercel:
1. Conecta tu repositorio de GitHub a Vercel.
2. **IMPORTANTE:** En la configuración del proyecto en Vercel, ve a `Environment Variables`.
3. Añade una variable llamada `API_KEY` con tu clave de Google Gemini.
4. Despliega. Vercel reconocerá automáticamente la carpeta `api/` como funciones del servidor.

## 🛠 Tecnologías
- **Frontend:** React, Tailwind CSS, TypeScript.
- **IA:** Google Gemini SDK (@google/genai).
- **Documentación:** jsPDF para informes técnicos.
- **Backend:** Vercel Serverless Functions (Node.js).

## 📄 Nota Académica
Este proyecto ha sido desarrollado como trabajo de fin de curso, enfocándose en la **seguridad de datos** (no exponer claves en el cliente) y la **usabilidad profesional** (estética sobria y resultados estructurados).
