PYME-Pulse AI
SISTEMA DE INTELIGENCIA DE NEGOCIO
ID INFORME: 68Z8RGU4T
FECHA EMISIÓN: 12/1/2026
PYME-Pulse AI: Memoria Técnica
Documentación del Proyecto de Fin de Curso
1. RESUMEN EJECUTIVO
Esta memoria técnica documenta el desarrollo de PYME-Pulse AI, una plataforma integral diseñada para
mitigar las barreras de entrada de las pequeñas y medianas empresas en el ecosistema de la Inteligencia
Artificial. El proyecto se centra en tres pilares: automatización de marketing, gestión reputacional y análisis
de consultoría estratégica.
2. ECOSISTEMA TECNOLÓGICO
- Frontend Core: React 18 con TypeScript para un desarrollo robusto y tipado, garantizando la mantenibilidad
del código.
- Motor de IA: Integración de Google Gemini SDK utilizando modelos Flash (velocidad) y Pro (razonamiento
complejo).
- Diseño & UI: Tailwind CSS para una interfaz minimalista, corporativa y totalmente adaptativa.
- Reporting: Librería jsPDF para la transcodificación de resultados de IA en documentos técnicos
exportables.
3. METODOLOGÍA Y SEGURIDAD (BACKEND PROXY)
Uno de los hitos técnicos más críticos ha sido la implementación de un Backend Intermedio (API Proxy).
Esta arquitectura garantiza:
- Protección de Activos: La API_KEY se almacena en variables de entorno del servidor (Vercel), impidiendo
su exposición.
- Abstracción de Lógica: El frontend delega el procesamiento pesado al servidor.
- Ingeniería de Prompts: Instrucciones que fuerzan un tono institucional y profesional B2B.
4. FASES DE DESARROLLO
- Fase 1: Diseño de Experiencia (UX). Creación de interfaz sobria basada en colores Slate e Indigo.
- Fase 2: Integración de Modelos Generativos. Configuración de esquemas de respuesta JSON para datos
estructurados.
- Fase 3: Optimización y Despliegue. Control de versiones Git y despliegue CI/CD.
5. CONCLUSIÓN Y FUTURO
PYME-Pulse AI demuestra que la integración de modelos de lenguaje de última generación bajo una
arquitectura segura puede transformar la competitividad de las PYMES.
