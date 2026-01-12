
import React, { useState } from 'react';
import { AppView } from './types.ts';
import Sidebar from './components/Sidebar.tsx';
import { MarketingTool, ReviewTool, AnalysisTool } from './components/Tools.tsx';
import Report from './components/Report.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);

  const renderContent = () => {
    switch (view) {
      case AppView.DASHBOARD:
        return (
          <div className="max-w-4xl animate-fadeIn">
            <header className="mb-12">
              <span className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-3 block">
                Aplicaciones prácticas de la IA en Pymes Grupo 40
              </span>
              <h1 className="text-3xl font-bold text-slate-900">Bienvenido al ecosistema PYME-Pulse</h1>
              <p className="text-slate-500 mt-2 text-lg">Seleccione una herramienta para comenzar a optimizar su negocio con IA.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  id: AppView.MARKETING, 
                  title: 'Marketing y Contenidos', 
                  desc: 'Genere anuncios persuasivos y estrategias de redes sociales de forma instantánea.',
                  btn: 'Abrir Herramienta'
                },
                { 
                  id: AppView.REVIEWS, 
                  title: 'Atención al Cliente', 
                  desc: 'Gestione reseñas y mantenga la reputación de su negocio con respuestas profesionales.',
                  btn: 'Gestionar Reseñas'
                },
                { 
                  id: AppView.ANALYSIS, 
                  title: 'Consultoría Senior', 
                  desc: 'Analice ideas de negocio o problemas operativos con razonamiento estratégico avanzado.',
                  btn: 'Iniciar Análisis'
                },
                { 
                  id: AppView.REPORT, 
                  title: 'Documentación Técnica', 
                  desc: 'Consulte y descargue la memoria detallada de este proyecto fin de curso.',
                  btn: 'Ver Memoria'
                }
              ].map(card => (
                <div 
                  key={card.id}
                  className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{card.title}</h3>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed">{card.desc}</p>
                  <button 
                    onClick={() => setView(card.id)}
                    className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    {card.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case AppView.MARKETING: return <div className="animate-fadeIn"><button onClick={() => setView(AppView.DASHBOARD)} className="mb-8 text-xs font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest">← Volver al panel</button><MarketingTool /></div>;
      case AppView.REVIEWS: return <div className="animate-fadeIn"><button onClick={() => setView(AppView.DASHBOARD)} className="mb-8 text-xs font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest">← Volver al panel</button><ReviewTool /></div>;
      case AppView.ANALYSIS: return <div className="animate-fadeIn"><button onClick={() => setView(AppView.DASHBOARD)} className="mb-8 text-xs font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest">← Volver al panel</button><AnalysisTool /></div>;
      case AppView.REPORT: return <div className="animate-fadeIn"><button onClick={() => setView(AppView.DASHBOARD)} className="mb-8 text-xs font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest">← Volver al panel</button><Report /></div>;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentView={view} setView={setView} />
      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
