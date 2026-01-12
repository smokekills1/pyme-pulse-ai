
import React from 'react';
import { AppView } from '../types.ts';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Panel Principal' },
    { id: AppView.MARKETING, label: 'Marketing Estratégico' },
    { id: AppView.REVIEWS, label: 'Gestión de Reputación' },
    { id: AppView.ANALYSIS, label: 'Análisis de Negocio' },
    { id: AppView.REPORT, label: 'Memoria Técnica' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-8 hidden md:flex flex-col border-r border-slate-800">
      <div className="mb-12">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
          PYME-PULSE
        </h1>
        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-[0.2em] font-semibold">Business Intelligence</p>
      </div>
      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
              currentView === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20 font-medium' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-8 border-t border-slate-800 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
        Versión Corporativa 2024
      </div>
    </aside>
  );
};

export default Sidebar;