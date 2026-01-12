
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
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
              <div className="relative z-10">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Dashboard Inteligente</h1>
                <p className="text-slate-500 mt-2 max-w-xl">Optimice la operativa de su pyme con herramientas de inteligencia artificial diseñadas para el mercado profesional.</p>
                <div className="mt-8 flex gap-4">
                   <button onClick={() => setView(AppView.MARKETING)} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition">Nueva Campaña</button>
                   <button onClick={() => setView(AppView.REPORT)} className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition">Memoria Técnica</button>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-12 opacity-10 select-none">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: AppView.MARKETING, title: 'Marketing', desc: 'Anuncios y copy estratégico.', color: 'border-indigo-500' },
                { id: AppView.REVIEWS, title: 'Reputación', desc: 'Gestión de feedback de clientes.', color: 'border-emerald-500' },
                { id: AppView.ANALYSIS, title: 'Consultoría', desc: 'Análisis de mercado y viabilidad.', color: 'border-slate-800' }
              ].map(card => (
                <div 
                  key={card.id}
                  onClick={() => setView(card.id)}
                  className={`bg-white p-8 rounded-2xl border-l-4 ${card.color} shadow-sm cursor-pointer hover:shadow-md transition-all group`}
                >
                  <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-1">{card.title}</h3>
                  <p className="text-xs text-slate-500">{card.desc}</p>
                  <div className="mt-4 text-indigo-600 font-bold text-[10px] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition">Acceder →</div>
                </div>
              ))}
            </div>
          </div>
        );
      case AppView.MARKETING: return <div className="animate-fadeIn"><button onClick={() => setView(AppView.DASHBOARD)} className="mb-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900">← Volver</button><MarketingTool /></div>;
      case AppView.REVIEWS: return <div className="animate-fadeIn"><button onClick={() => setView(AppView.DASHBOARD)} className="mb-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900">← Volver</button><ReviewTool /></div>;
      case AppView.ANALYSIS: return <div className="animate-fadeIn"><button onClick={() => setView(AppView.DASHBOARD)} className="mb-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900">← Volver</button><AnalysisTool /></div>;
      case AppView.REPORT: return <div className="animate-fadeIn"><button onClick={() => setView(AppView.DASHBOARD)} className="mb-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900">← Volver</button><Report /></div>;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar currentView={view} setView={setView} />
      <main className="flex-1 p-6 md:p-12 lg:p-16 max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
