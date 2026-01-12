
import React from 'react';
import { generateProfessionalPDF } from '../services/pdfService.ts';

const Report: React.FC = () => {
  const exportToPDF = () => {
    const reportTitle = "PYME-Pulse AI: Memoria Técnica";
    const reportSubtitle = "Documentación del Proyecto de Fin de Curso";
    
    // Construimos el texto plano para el PDF basándonos en el contenido del componente
    const content = `
1. RESUMEN EJECUTIVO
Esta memoria técnica documenta el desarrollo de PYME-Pulse AI, una plataforma integral diseñada para mitigar las barreras de entrada de las pequeñas y medianas empresas en el ecosistema de la Inteligencia Artificial. El proyecto se centra en tres pilares: automatización de marketing, gestión reputacional y análisis de consultoría estratégica.

2. ECOSISTEMA TECNOLÓGICO
- Frontend Core: React 18 con TypeScript para un desarrollo robusto y tipado, garantizando la mantenibilidad del código.
- Motor de IA: Integración de Google Gemini SDK utilizando modelos Flash (velocidad) y Pro (razonamiento complejo).
- Diseño & UI: Tailwind CSS para una interfaz minimalista, corporativa y totalmente adaptativa.
- Reporting: Librería jsPDF para la transcodificación de resultados de IA en documentos técnicos exportables.

3. METODOLOGÍA Y SEGURIDAD (BACKEND PROXY)
Uno de los hitos técnicos más críticos ha sido la implementación de un Backend Intermedio (API Proxy). Esta arquitectura garantiza:
- Protección de Activos: La API_KEY se almacena en variables de entorno del servidor (Vercel), impidiendo su exposición.
- Abstracción de Lógica: El frontend delega el procesamiento pesado al servidor.
- Ingeniería de Prompts: Instrucciones que fuerzan un tono institucional y profesional B2B.

4. FASES DE DESARROLLO
- Fase 1: Diseño de Experiencia (UX). Creación de interfaz sobria basada en colores Slate e Indigo.
- Fase 2: Integración de Modelos Generativos. Configuración de esquemas de respuesta JSON para datos estructurados.
- Fase 3: Optimización y Despliegue. Control de versiones Git y despliegue CI/CD.

5. CONCLUSIÓN Y FUTURO
PYME-Pulse AI demuestra que la integración de modelos de lenguaje de última generación bajo una arquitectura segura puede transformar la competitividad de las PYMES.
    `.trim();

    generateProfessionalPDF(reportTitle, reportSubtitle, content, "memoria-tecnica-pyme-pulse");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end max-w-4xl mx-auto px-4">
        <button 
          onClick={exportToPDF}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 transition flex items-center gap-2 shadow-lg"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Exportar Memoria a PDF
        </button>
      </div>

      <div className="bg-white p-8 md:p-16 rounded-3xl shadow-xl border border-slate-200 max-w-4xl mx-auto space-y-12 font-serif leading-relaxed text-slate-800 animate-fadeIn mb-20">
        {/* Encabezado Principal */}
        <div className="text-center space-y-6 border-b border-slate-100 pb-10">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] border border-indigo-100">
              Memoria Técnica de Proyecto Final
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-tight">
              PYME-Pulse AI
            </h1>
            <h2 className="text-lg md:text-xl font-medium text-slate-500 uppercase tracking-[0.15em] mt-1 border-t border-slate-50 pt-4 max-w-md mx-auto">
              Solución de Business Intelligence basada en IA Generativa
            </h2>
          </div>
        </div>

        {/* 1. Introducción */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-indigo-800 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-6 h-px bg-indigo-200"></span> 1. Resumen Ejecutivo
          </h3>
          <p className="text-sm md:text-base text-slate-600">
            Esta memoria técnica documenta el desarrollo de <strong>PYME-Pulse AI</strong>, una plataforma integral diseñada para mitigar las barreras de entrada de las pequeñas y medianas empresas en el ecosistema de la Inteligencia Artificial. El proyecto se centra en tres pilares: automatización de marketing, gestión reputacional y análisis de consultoría estratégica.
          </p>
        </section>

        {/* 2. Stack Tecnológico */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-indigo-800 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-6 h-px bg-indigo-200"></span> 2. Ecosistema Tecnológico
          </h3>
          <p className="text-sm text-slate-600">
            Para garantizar la escalabilidad y el rendimiento profesional, se ha seleccionado el siguiente stack:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-900 text-[10px] uppercase block mb-1">Frontend Core</span>
              <p className="text-[11px] text-slate-500 text-pretty">React 18 con TypeScript para un desarrollo robusto y tipado, garantizando la mantenibilidad del código.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-900 text-[10px] uppercase block mb-1">Motor de IA</span>
              <p className="text-[11px] text-slate-500 text-pretty">Integración de Google Gemini SDK utilizando modelos Flash (velocidad) y Pro (razonamiento complejo).</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-900 text-[10px] uppercase block mb-1">Diseño & UI</span>
              <p className="text-[11px] text-slate-500 text-pretty">Tailwind CSS para una interfaz minimalista, corporativa y totalmente adaptativa (Responsive Design).</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-900 text-[10px] uppercase block mb-1">Reporting</span>
              <p className="text-[11px] text-slate-500 text-pretty">Librería jsPDF para la transcodificación de resultados de IA en documentos técnicos exportables.</p>
            </div>
          </div>
        </section>

        {/* 3. Metodología y Arquitectura de Seguridad */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-indigo-800 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-6 h-px bg-indigo-200"></span> 3. Metodología y Seguridad (Backend Proxy)
          </h3>
          <p className="text-sm text-slate-600">
            Uno de los hitos técnicos más críticos ha sido la implementación de un <strong>Backend Intermedio (API Proxy)</strong>. A diferencia de prototipos básicos, esta arquitectura garantiza:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-sm text-slate-600 font-sans">
            <li><strong>Protección de Activos:</strong> La API_KEY de Google Gemini se almacena exclusivamente en variables de entorno del servidor (Vercel), impidiendo su exposición en el navegador del cliente.</li>
            <li><strong>Abstracción de Lógica:</strong> El frontend se comunica con un endpoint unificado (`/api/ai`), delegando el procesamiento pesado al servidor.</li>
            <li><strong>Ingeniería de Prompts:</strong> Se han diseñado "System Instructions" que fuerzan al modelo a mantener un tono institucional, eliminando sesgos coloquiales y asegurando resultados listos para el ámbito B2B.</li>
          </ul>
        </section>

        {/* 4. Proceso de Implementación */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-indigo-800 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-6 h-px bg-indigo-200"></span> 4. Fases de Desarrollo
          </h3>
          <div className="space-y-6 font-sans">
            <div className="relative pl-8 border-l border-indigo-100 py-1">
              <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-indigo-500"></div>
              <h4 className="text-xs font-bold text-slate-900 uppercase mb-1">Fase 1: Diseño de Experiencia (UX)</h4>
              <p className="text-[11px] text-slate-500">Creación de una interfaz sobria basada en el color Slate y acentos Indigo para transmitir confianza empresarial.</p>
            </div>
            <div className="relative pl-8 border-l border-indigo-100 py-1">
              <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-indigo-500"></div>
              <h4 className="text-xs font-bold text-slate-900 uppercase mb-1">Fase 2: Integración de Modelos Generativos</h4>
              <p className="text-[11px] text-slate-500">Configuración de esquemas de respuesta JSON para el módulo de marketing, asegurando que la IA devuelva datos estructurados (copy + prompt visual).</p>
            </div>
            <div className="relative pl-8 border-l border-indigo-100 py-1">
              <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-indigo-500"></div>
              <h4 className="text-xs font-bold text-slate-900 uppercase mb-1">Fase 3: Optimización y Despliegue</h4>
              <p className="text-[11px] text-slate-500">Control de versiones mediante Git y despliegue continuo (CI/CD) en la nube para garantizar disponibilidad global.</p>
            </div>
          </div>
        </section>

        {/* 5. Conclusión Técnica */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-indigo-800 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-6 h-px bg-indigo-200"></span> 5. Conclusión y Futuro
          </h3>
          <p className="text-sm text-slate-600 italic">
            PYME-Pulse AI demuestra que la integración de modelos de lenguaje de última generación, bajo una arquitectura segura y orientada a procesos de negocio reales, puede transformar radicalmente la competitividad de las PYMES. El sistema queda preparado para futuras integraciones de análisis predictivo y visión por computadora.
          </p>
        </section>

        <div className="pt-16 text-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <p className="text-[10px] text-slate-400 font-sans tracking-[0.2em] uppercase mt-8">Documento Finalizado - Uso Confidencial</p>
        </div>
      </div>
    </div>
  );
};

export default Report;
