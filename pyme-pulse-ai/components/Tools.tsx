
import React, { useState, useEffect } from 'react';
import { generateMarketingCopy, respondToReview, analyzeBusinessIdea } from '../services/geminiService.ts';
import { generateProfessionalPDF } from '../services/pdfService.ts';
import { MarketingOptions, MarketingVariant } from '../types.ts';

const LOADING_MESSAGES = [
  "Iniciando motor de IA...",
  "Analizando público objetivo...",
  "Escaneando tendencias de mercado...",
  "Redactando propuestas creativas...",
  "Finalizando variantes de campaña...",
  "Casi listo..."
];

export const MarketingTool = () => {
  const [options, setOptions] = useState<MarketingOptions>({
    product: '',
    target: '',
    platform: 'LinkedIn',
    tone: 'Analítico',
    length: 'medium'
  });
  const [variants, setVariants] = useState<MarketingVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async () => {
    if (!options.product || !options.target) return;
    setLoading(true);
    setError(null);
    setCopiedIndex(null);
    try {
      const results = await generateMarketingCopy(options);
      if (!results || results.length === 0) {
        throw new Error("La IA no devolvió resultados. Inténtelo de nuevo.");
      }
      setVariants(results);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Error al conectar con el servidor de IA.");
    } finally {
      setLoading(false);
    }
  };

  const exportMarketingPDF = () => {
    const fullContent = variants.map((v, i) => 
      `--- PROPUESTA 0${i+1} ---\n\nTEXTO DEL ANUNCIO:\n${v.text}\n\nCONCEPTO VISUAL SUGERIDO:\n${v.imagePrompt}\n\n\n`
    ).join('\n');
    
    generateProfessionalPDF(
      "Estrategia de Contenidos AI",
      `Campaña para ${options.platform} | Tono: ${options.tone}`,
      fullContent,
      `marketing-${options.platform.toLowerCase()}`
    );
  };

  return (
    <div className="flex flex-col xl:flex-row gap-10">
      <div className="xl:w-1/3 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit sticky top-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-indigo-600 rounded-full"></div>
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Campaña de Marketing</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Producto o Servicio</label>
            <textarea 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none transition text-sm" 
              rows={3}
              placeholder="¿Qué ofrece su empresa?"
              value={options.product}
              onChange={(e) => setOptions({...options, product: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Público Objetivo</label>
            <input 
              type="text" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none transition text-sm" 
              placeholder="Ej: Directivos de RRHH, Dueños de PYMES..."
              value={options.target}
              onChange={(e) => setOptions({...options, target: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Canal</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm appearance-none"
                value={options.platform}
                onChange={(e) => setOptions({...options, platform: e.target.value})}
              >
                <option>LinkedIn</option>
                <option>Instagram</option>
                <option>Facebook Ads</option>
                <option>Email Marketing</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tono</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm appearance-none"
                value={options.tone}
                onChange={(e) => setOptions({...options, tone: e.target.value})}
              >
                <option>Analítico</option>
                <option>Persuasivo</option>
                <option>Institucional</option>
                <option>Directo</option>
                <option>Humorístico</option>
                <option>Inspirador</option>
                <option>Educativo</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !options.product || !options.target}
            className={`w-full py-4 rounded-xl font-bold uppercase text-[11px] tracking-widest transition flex items-center justify-center gap-2 ${
              loading ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-900 text-white hover:bg-slate-800'
            } disabled:opacity-50`}
          >
            {loading ? (
              <>
                <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                Procesando...
              </>
            ) : 'Crear Propuestas'}
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-8">
        {loading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-14 bg-slate-100 rounded-xl border border-slate-200 flex items-center px-4">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {LOADING_MESSAGES[loadingStep]}
               </span>
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-8 space-y-4">
                <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                <div className="h-20 bg-slate-50 rounded w-full"></div>
                <div className="h-10 bg-slate-50 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-xl">!</div>
            <h3 className="text-red-900 font-bold uppercase text-xs tracking-widest mb-2">Error de Generación</h3>
            <p className="text-red-700 text-sm max-w-xs">{error}</p>
            <button onClick={handleGenerate} className="mt-6 text-[10px] font-bold text-red-600 underline uppercase tracking-widest">Reintentar Ahora</button>
          </div>
        ) : variants.length > 0 ? (
          <>
            <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest">3 Estrategias generadas con éxito</span>
              <button 
                onClick={exportMarketingPDF}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-[10px] font-bold uppercase border border-indigo-200 hover:bg-indigo-600 hover:text-white transition"
              >
                Descargar Informe PDF
              </button>
            </div>
            <div className="space-y-6">
              {variants.map((v, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-indigo-200 transition">
                  <div className="px-6 py-3 bg-slate-50 border-b flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Opción 0{i+1}</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(v.text);
                        setCopiedIndex(i);
                        setTimeout(() => setCopiedIndex(null), 2000);
                      }}
                      className="text-[10px] font-bold text-indigo-600 uppercase"
                    >
                      {copiedIndex === i ? '¡Copiado!' : 'Copiar Texto'}
                    </button>
                  </div>
                  <div className="p-8 space-y-6">
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-medium">{v.text}</p>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase mb-2">Sugerencia Creativa Visual</span>
                      <p className="text-xs text-slate-500 italic leading-relaxed">{v.imagePrompt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-300 bg-slate-50/50">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 opacity-20"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            <p className="text-sm font-medium tracking-tight">Complete el formulario y pulse el botón</p>
            <p className="text-[10px] uppercase font-bold mt-2 opacity-50 tracking-[0.2em]">Los resultados aparecerán aquí</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const ReviewTool = () => {
  const [review, setReview] = useState('');
  const [bizName, setBizName] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRespond = async () => {
    if (!review || !bizName) return;
    setLoading(true);
    try {
      const text = await respondToReview(review, bizName);
      setResult(text);
    } catch (e) {
      console.error(e);
      alert("Error al conectar con la IA de reputación.");
    } finally {
      setLoading(false);
    }
  };

  const exportReviewPDF = () => {
    generateProfessionalPDF(
      "Gestión de Crisis y Reputación",
      `Empresa: ${bizName} | Respuesta Institucional`,
      `RESEÑA RECIBIDA:\n"${review}"\n\n--------------------------------\n\nPROPUESTA DE RESPUESTA OFICIAL:\n\n${result}`,
      `respuesta-cliente-${bizName.toLowerCase().replace(/\s/g, '-')}`
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Gestión de Reputación</h2>
        </div>
        <div className="space-y-6">
          <input 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-emerald-500" 
            placeholder="Nombre comercial..."
            value={bizName}
            onChange={(e) => setBizName(e.target.value)}
          />
          <textarea 
            rows={4}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-emerald-500" 
            placeholder="Pegue aquí el comentario del cliente..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button 
            onClick={handleRespond}
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold uppercase text-[11px] tracking-widest hover:bg-emerald-800 transition disabled:opacity-50"
          >
            {loading ? 'Redactando...' : 'Generar Respuesta Institucional'}
          </button>
        </div>
      </div>

      {result && (
        <div className="animate-fadeIn space-y-4">
          <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 italic text-sm text-emerald-900 leading-relaxed shadow-inner">
            {result}
          </div>
          <button 
            onClick={exportReviewPDF}
            className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-emerald-600 hover:text-emerald-700 transition"
          >
            Descargar como Comunicado PDF
          </button>
        </div>
      )}
    </div>
  );
};

export const AnalysisTool = () => {
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!idea) return;
    setLoading(true);
    try {
      const text = await analyzeBusinessIdea(idea);
      setResult(text);
    } catch (e) {
      console.error(e);
      alert("El análisis estratégico ha fallado. Reintente.");
    } finally {
      setLoading(false);
    }
  };

  const exportAnalysisPDF = () => {
    generateProfessionalPDF(
      "Auditoría Estratégica AI",
      "Análisis de Viabilidad y Mercado",
      `DESCRIPCIÓN DE LA SITUACIÓN:\n${idea}\n\n--------------------------------\n\nINFORME DE CONSULTORÍA:\n\n${result}`,
      "auditoria-estrategica"
    );
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-slate-800 rounded-full"></div>
        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Consultoría Estratégica</h2>
      </div>
      <div className="space-y-8">
        <textarea 
          rows={5}
          className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed outline-none focus:ring-1 focus:ring-slate-500" 
          placeholder="Describa su idea de negocio, problema operativo o cambio estratégico..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <button 
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase text-[11px] tracking-widest hover:bg-slate-800 transition shadow-lg disabled:opacity-50"
        >
          {loading ? 'Consultando IA Senior...' : 'Ejecutar Análisis Estratégico'}
        </button>
      </div>

      {result && (
        <div className="mt-12 animate-fadeIn space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Resultado del Análisis</span>
            <button 
              onClick={exportAnalysisPDF}
              className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition"
            >
              Exportar Informe PDF
            </button>
          </div>
          <div className="prose prose-slate max-w-none">
            {result.split('\n').map((line, i) => (
              <p key={i} className="text-sm text-slate-600 leading-loose mb-3">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
