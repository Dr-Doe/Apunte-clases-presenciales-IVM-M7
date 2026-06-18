import { Lightbulb, AlertTriangle, AlertCircle, Info, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import React, { useState } from 'react';

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

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function Quiz({ title = "Preguntas para practicar", questions }: { title?: string, questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const score = Object.keys(answers).filter(qIdx => answers[parseInt(qIdx)] === questions[parseInt(qIdx)].correctIndex).length;

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-indigo-600 p-6 text-white text-center">
        <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6" /> {title}
        </h3>
        <p className="opacity-80 mt-1">Pon a prueba tus conocimientos para el examen</p>
      </div>
      <div className="p-6 md:p-8 space-y-8">
        {questions.map((q, qIdx) => {
          const isAnswered = answers[qIdx] !== undefined;
          const isCorrect = answers[qIdx] === q.correctIndex;

          return (
            <div key={qIdx} className="space-y-4">
              <p className="text-lg font-semibold text-slate-800">
                {qIdx + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = answers[qIdx] === oIdx;
                  let btnClass = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700";
                  
                  if (isSelected) btnClass = "border-indigo-500 bg-indigo-50 text-indigo-900 font-medium";
                  
                  if (showResults) {
                    if (oIdx === q.correctIndex) {
                      btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                    } else if (isSelected && !isCorrect) {
                      btnClass = "border-red-500 bg-red-50 text-red-900 line-through opacity-70";
                    } else {
                      btnClass = "border-slate-200 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(qIdx, oIdx)}
                      disabled={showResults}
                      className={cn("w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between", btnClass)}
                    >
                      <span>{opt}</span>
                      {showResults && oIdx === q.correctIndex && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                      {showResults && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                    </button>
                  );
                })}
              </div>
              {showResults && (
                <div className={cn("p-4 rounded-lg mt-2 text-sm", isCorrect ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800")}>
                  <strong>Explicación:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        <div className="pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
          {!showResults ? (
            <button 
              onClick={() => setShowResults(true)}
              disabled={Object.keys(answers).length < questions.length}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Corregir Examen
            </button>
          ) : (
            <div className="text-center">
              <div className="text-3xl font-extrabold text-slate-800 mb-2">
                Puntaje: {score} / {questions.length}
              </div>
              <button 
                onClick={() => {
                  setAnswers({});
                  setShowResults(false);
                }}
                className="text-indigo-600 font-medium hover:underline"
              >
                Volver a intentar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
