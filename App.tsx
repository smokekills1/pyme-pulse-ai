import React, { useState } from 'react';
import { View } from './types';
import { generateMarketingCopy, analyzeBusinessIdea, respondToReview } from './services/geminiService';
import { generateProfessionalPDF } from './services/pdfService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Layout Components
  const Card = ({ title, desc, icon, onClick, color }: any) => (
    <button 
      onClick={onClick}
      className="glass-card p-8 rounded-[2rem] text-left hover:shadow-xl hover:scale-[1.02] transition-all group flex flex-col h-full"
    >
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-6 text-white text-xl group-hover:rotate-12 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>
      <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-indigo-600">
        Explorar Herramienta 
        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </button>
  );

  const Header = () => (
    <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Sistema Business Intelligence</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">PYME-Pulse AI<span className="text-indigo-600">.</span></h1>
        <p className="text-slate-500 mt-4 text-lg max-w-xl">Optimización operativa y estratégica mediante modelos de lenguaje de última generación.</p>
      </div>
      <div className="bg-indigo-50 px-6 py-4 rounded-2xl border border-indigo-100 hidden lg:block">
        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Status del Motor</p>
        <p className="text-xs text-slate-600 font-medium">Gemini 3 Pro Online</p>
      </div>
    </header>
  );

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            <Card 
              title="Marketing" 
              desc="Cree campañas persuasivas y estrategias de contenido visual en segundos."
              icon="⚡"
              color="bg-indigo-600"
              onClick={() => setCurrentView(View.MARKETING)}
            />
            <Card 
              title="Reputación" 
              desc="Gestione reseñas y mantenga una imagen profesional impecable."
              icon="💬"
              color="bg-emerald-500"
              onClick={() => setCurrentView(View.REVIEWS)}
            />
            <Card 
              title="Estrategia" 
              desc="Análisis DAFO y consultoría senior para toma de decisiones."
              icon="📊"
              color="bg-amber-500"
              onClick={() => setCurrentView(View.STRATEGY)}
            />
            <Card 
              title="Memoria" 
              desc="Documentación técnica y académica completa del proyecto."
              icon="📄"
              color="bg-slate-800"
              onClick={() => setCurrentView(View.REPORT)}
            />
          </div>
        );

      case View.MARKETING:
        return (
          <ToolLayout 
            title="Generador de Marketing"
            onBack={() => {
              setCurrentView(View.DASHBOARD);
              setResults(null);
            }}
            onSubmit={async (e: any) => {
              e.preventDefault();
              setLoading(true);
              const { product, target, platform } = e.target.elements;
              try {
                const ads = await generateMarketingCopy({
                  product: product.value,
                  target: target.value,
                  platform: platform.value,
                  tone: 'Profesional',
                  length: 'Medio'
                });
                setResults(ads);
              } catch (err: any) { 
                alert(err.message || 'Error al generar contenido de marketing');
              }
              setLoading(false);
            }}
          >
            <div className="space-y-4">
              <input name="product" placeholder="Producto/Servicio" className="w-full p-4 rounded-xl border border-slate-200" required />
              <input name="target" placeholder="Público Objetivo (ej: Jóvenes emprendedores)" className="w-full p-4 rounded-xl border border-slate-200" required />
              <select name="platform" className="w-full p-4 rounded-xl border border-slate-200">
                <option>Instagram/TikTok</option>
                <option>LinkedIn</option>
                <option>Google Ads</option>
              </select>
            </div>
            {results && (
              <div className="mt-8 space-y-6">
                {results.map((ad: any, i: number) => (
                  <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">{ad.text}</p>
                    <div className="p-3 bg-slate-50 rounded-lg text-[10px] text-slate-400 font-mono">
                      PROMPT VISUAL: {ad.imagePrompt}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ToolLayout>
        );

      case View.REVIEWS:
        return (
          <ToolLayout 
            title="Gestor de Reputación Online"
            onBack={() => {
              setCurrentView(View.DASHBOARD);
              setResults(null);
            }}
            onSubmit={async (e: any) => {
              e.preventDefault();
              setLoading(true);
              const { review, business, tone } = e.target.elements;
              try {
                const response = await respondToReview(
                  review.value,
                  business.value,
                  tone.value
                );
                setResults(response);
              } catch (err: any) { 
                alert(err.message || 'Error al generar respuesta');
              }
              setLoading(false);
            }}
          >
            <div className="space-y-4">
              <input 
                name="business" 
                placeholder="Nombre de tu negocio" 
                className="w-full p-4 rounded-xl border border-slate-200" 
                required 
              />
              <textarea 
                name="review" 
                placeholder="Reseña del cliente a la que quieres responder..." 
                className="w-full p-4 rounded-xl border border-slate-200 min-h-[120px]" 
                required 
              />
              <select name="tone" className="w-full p-4 rounded-xl border border-slate-200">
                <option>Profesional</option>
                <option>Cálido y Cercano</option>
                <option>Formal Corporativo</option>
              </select>
            </div>
            {results && (
              <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Respuesta Sugerida</p>
                <p className="text-sm text-slate-700 leading-relaxed">{results}</p>
              </div>
            )}
          </ToolLayout>
        );

      case View.STRATEGY:
        return (
          <ToolLayout 
            title="Análisis Estratégico Senior"
            onBack={() => {
              setCurrentView(View.DASHBOARD);
              setResults(null);
            }}
            onSubmit={async (e: any) => {
              e.preventDefault();
              setLoading(true);
              const idea = e.target.elements.idea.value;
              try {
                const res = await analyzeBusinessIdea(idea);
                setResults(res);
              } catch (err: any) { 
                alert(err.message || 'Error al analizar la idea de negocio');
              }
              setLoading(false);
            }}
          >
            <textarea name="idea" placeholder="Describa su idea o problema operativo..." className="w-full p-4 rounded-xl border border-slate-200 min-h-[150px]" required />
            {results && (
              <div className="mt-8 p-8 bg-white rounded-2xl border border-slate-100 prose prose-slate max-w-none">
                {results.split('\n').map((l: string, i: number) => <p key={i} className="mb-2 text-sm text-slate-600">{l}</p>)}
              </div>
            )}
          </ToolLayout>
        );

      case View.REPORT:
        return (
          <div className="max-w-3xl mx-auto text-center animate-fadeIn">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Memoria Técnica del Proyecto</h2>
              <p className="text-slate-500 mb-8">Documentación detallada sobre la arquitectura, seguridad e impacto de PYME-Pulse AI.</p>
            </div>
            
            <div className="space-y-6">
              <button 
                onClick={() => {
                  const content = `
MEMORIA TÉCNICA - PYME-Pulse AI

1. INTRODUCCIÓN Y CONTEXTO

Este proyecto nace de la necesidad de democratizar el acceso a herramientas de inteligencia artificial avanzada para pequeñas y medianas empresas. PYME-Pulse AI representa una solución integral que combina las capacidades de modelos de lenguaje de última generación con interfaces intuitivas diseñadas específicamente para el contexto empresarial español.

2. ARQUITECTURA TÉCNICA

2.1 Stack Tecnológico
- Frontend: React 18 con TypeScript para garantizar type-safety
- Build Tool: Vite para desarrollo rápido y builds optimizados
- Despliegue: Vercel con funciones serverless
- Motor de IA: Google Gemini 3 (Flash y Pro)
- Generación PDF: jsPDF para documentación profesional

2.2 Arquitectura de Aplicación
La aplicación sigue un patrón de arquitectura cliente-servidor:
- Cliente: SPA (Single Page Application) en React
- Servidor: Funciones serverless en Vercel
- API: Proxy a Google Gemini AI para proteger credenciales

3. MÓDULOS FUNCIONALES

3.1 Generador de Marketing
Utiliza Gemini Flash con esquemas JSON estructurados para generar variantes de campañas publicitarias adaptadas a diferentes plataformas (Instagram, LinkedIn, Google Ads).

3.2 Gestor de Reputación
Sistema de respuesta automática a reseñas con configuración de tono personalizable, manteniendo coherencia de marca y profesionalismo.

3.3 Análisis Estratégico
Emplea Gemini Pro con presupuesto de razonamiento extendido (thinking budget) para análisis DAFO y planificación estratégica de alto nivel.

3.4 Sistema de Documentación
Generación automática de informes PDF con estética corporativa profesional y estructura académica.

4. SEGURIDAD Y BUENAS PRÁCTICAS

4.1 Protección de Credenciales
Las API keys se almacenan exclusivamente en variables de entorno de Vercel, nunca en el código cliente. El proxy serverless actúa como intermediario seguro.

4.2 Validación de Datos
Todos los inputs del usuario pasan por validación tanto en cliente como en servidor antes de ser procesados por la IA.

5. IMPACTO Y RESULTADOS ESPERADOS

Este sistema permite a PYMEs:
- Reducir costes de agencias de marketing
- Mejorar tiempos de respuesta a clientes
- Acceder a consultoría estratégica de nivel profesional
- Generar documentación técnica de calidad

6. TRABAJO FUTURO

Posibles extensiones incluyen:
- Integración con redes sociales para publicación directa
- Sistema de análisis de sentimiento en reseñas
- Dashboard de métricas y KPIs empresariales
- Chatbot conversacional para consultas rápidas

CONCLUSIÓN

PYME-Pulse AI demuestra cómo la inteligencia artificial generativa puede ser una herramienta práctica y accesible para pequeñas empresas, mejorando su competitividad y eficiencia operativa sin requerir inversiones significativas en infraestructura o personal especializado.
                  `;
                  
                  generateProfessionalPDF(
                    "Memoria Técnica del Proyecto",
                    "PYME-Pulse AI - Sistema de Business Intelligence",
                    content,
                    "PYME-Pulse-AI_Memoria-Tecnica"
                  );
                }}
                className="bg-slate-900 text-white px-10 py-5 rounded-3xl font-bold uppercase tracking-widest hover:bg-indigo-600 transition shadow-2xl"
              >
                📄 Descargar Memoria Técnica Completa
              </button>
              
              <p className="text-xs text-slate-400">El documento incluye: Arquitectura, Seguridad, Módulos Funcionales e Impacto Empresarial</p>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-20">
      <div className="max-w-7xl mx-auto">
        <Header />
        {renderContent()}
      </div>
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Procesando con IA de Alta Densidad...</p>
          </div>
        </div>
      )}
    </div>
  );
};

const ToolLayout = ({ title, children, onBack, onSubmit }: any) => (
  <div className="max-w-3xl mx-auto animate-fadeIn">
    <button onClick={onBack} className="mb-8 text-xs font-bold text-slate-400 hover:text-indigo-600 tracking-widest uppercase">← Volver al Panel</button>
    <div className="glass-card p-10 rounded-[2.5rem] shadow-sm">
      <h2 className="text-2xl font-black text-slate-900 mb-8">{title}</h2>
      <form onSubmit={onSubmit}>
        {children}
        <button type="submit" className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
          Ejecutar Análisis
        </button>
      </form>
    </div>
  </div>
);

export default App;