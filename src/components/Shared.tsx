import { Lightbulb, AlertTriangle, AlertCircle, Info, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import React from 'react';

// Tip Box for Exam hints
export function ExamTip({ title = "Tip de Examen", children, type = "exam" }: { title?: string, children: React.ReactNode, type?: "exam" | "warning" | "info" }) {
  const styles = {
    exam: "bg-amber-50 border-amber-500 text-amber-900 border-l-4",
    warning: "bg-red-50 border-red-500 text-red-900 border-l-4",
    info: "bg-blue-50 border-blue-500 text-blue-900 border-l-4",
  };
  const iconColors = {
    exam: "text-amber-600",
    warning: "text-red-600",
    info: "text-blue-600",
  };
  return (
    <div className={cn("p-4 my-6 rounded-r-xl shadow-sm", styles[type])}>
      <div className="flex items-center gap-2 font-bold mb-2">
        {type === 'exam' && <Lightbulb className={cn("w-6 h-6", iconColors[type])} />}
        {type === 'warning' && <AlertTriangle className={cn("w-6 h-6", iconColors[type])} />}
        {type === 'info' && <Info className={cn("w-6 h-6", iconColors[type])} />}
        <span className={cn("text-lg", iconColors[type])}>{title}</span>
      </div>
      <div className="text-[15px] leading-relaxed opacity-90">
        {children}
      </div>
    </div>
  );
}

export function SectionHeader({ title, subtitle, icon: Icon }: { title: string, subtitle?: string, icon?: any }) {
  return (
    <div className="border-b border-slate-200 pb-4 mb-8">
      <div className="flex items-center gap-3 text-indigo-700 mb-2">
        {Icon && <Icon className="w-8 h-8" />}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
      </div>
      {subtitle && <p className="text-slate-500 text-lg">{subtitle}</p>}
    </div>
  );
}

export function SubHeader({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold flex items-center gap-2 mt-8 mb-4 text-slate-800 border-b border-slate-100 pb-2">{children}</h2>;
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-bold mt-6 mb-3 text-slate-700">{children}</h3>;
}

export function DetailList({ items }: { items: { label: string; desc: string | React.ReactNode }[] }) {
  return (
    <ul className="space-y-3 my-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-slate-700">
          <div className="min-w-[4px] mt-2 h-[4px] bg-indigo-400 rounded-full" />
          <span className="leading-relaxed">
            <strong className="text-slate-900 font-semibold mr-1">{item.label}:</strong>
            {item.desc}
          </span>
        </li>
      ))}
    </ul>
  );
}
