import React, { useState, useEffect } from 'react';
import Class1 from './components/Class1';
import Class2 from './components/Class2';
import Class3 from './components/Class3';
import Class5 from './components/Class5';
import Class7 from './components/Class7';
import Class8 from './components/Class8';
import { ComparativeTables, Glossary } from './components/TablesAndGlossary';
import { BookOpen, Cpu, Activity, ShieldAlert, MonitorPlay, Network, Search, Table, GraduationCap, Menu, X } from 'lucide-react';

const SECTIONS = [
  { id: 'c1', title: 'Clase 1: PLC y DCS', icon: Cpu, component: Class1 },
  { id: 'c2', title: 'Clase 2: Tipos de Control y PID', icon: Activity, component: Class2 },
  { id: 'c3', title: 'Clase 3: Seguridad SIS & F&G', icon: ShieldAlert, component: Class3 },
  { id: 'c5', title: 'Clase 5: SCADA y HMI', icon: MonitorPlay, component: Class5 },
  { id: 'c7', title: 'Clase 7: Split-Range y Override', icon: Network, component: Class7 },
  { id: 'c8', title: 'Clase 8: Diagnóstico de Fallas', icon: Search, component: Class8 },
  { id: 't', title: 'Tablas Comparativas', icon: Table, component: ComparativeTables },
  { id: 'g', title: 'Glosario Términos Clave', icon: BookOpen, component: Glossary },
];

export default function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSection]);

  const ActiveComponent = SECTIONS.find(s => s.id === activeSection)?.component || Class1;

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-40 bg-slate-900 text-slate-300 w-72 h-full flex flex-col transition-transform duration-300
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-white/10 mb-4 bg-slate-950">
          <div className="flex items-center gap-3 text-white mb-2">
            <GraduationCap className="w-8 h-8 text-indigo-400" />
            <h1 className="text-xl font-bold leading-tight">Apunte Master<br/><span className="text-sm font-normal text-indigo-300">Sistemas SCADA e Inst.</span></h1>
          </div>
          <p className="text-xs text-slate-400 mt-2">Preparación para Examen Multiple Choice</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-4 pb-8 space-y-1">
          {SECTIONS.map(sec => {
            const isActive = activeSection === sec.id;
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                title={sec.title}
                onClick={() => {
                  setActiveSection(sec.id);
                  setMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-md font-semibold' 
                    : 'hover:bg-slate-800 hover:text-slate-100'}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-100' : 'text-slate-500'}`} />
                <span className="text-[15px] truncate">{sec.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto bg-slate-50/50">
        {/* Cover ambient design element */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-indigo-100/50 to-transparent pointer-events-none -z-10" />
        
        <div className="p-6 md:p-12 lg:p-16 max-w-5xl mx-auto min-h-full">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
