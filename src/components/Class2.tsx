import React from 'react';
import { SectionHeader, SubHeader, H3, DetailList, ExamTip } from './Shared';
import { Activity } from 'lucide-react';

export default function Class2() {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title="Clase 2: Tipos de Control y Sintonía" 
        subtitle="Lazo Feedback, On-Off y PID" 
        icon={Activity} 
      />

      <p className="text-slate-700 text-lg leading-relaxed mb-6">
        Cualquier sistema automático se apoya en el lazo cerrado (feedback loop) para mantenerse estable frente a perturbaciones.
      </p>

      <SubHeader>Anatomía del Lazo de Control</SubHeader>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 bg-white p-4 shadow-sm rounded-xl border-l-4 border-l-indigo-500">
          <strong className="block text-indigo-900 mb-1">1. Medición (PV)</strong>
          <span className="text-sm text-slate-600"><em>Process Variable</em>. Los "ojos" del sistema. Valor real medido por el sensor.</span>
        </div>
        <div className="flex-1 bg-white p-4 shadow-sm rounded-xl border-l-4 border-l-indigo-500">
          <strong className="block text-indigo-900 mb-1">2. Decisión (SP y Controlador)</strong>
          <span className="text-sm text-slate-600">Calcula el error entre PV y el <em>Setpoint</em> (SP, valor deseado). El cerebro del lazo.</span>
        </div>
        <div className="flex-1 bg-white p-4 shadow-sm rounded-xl border-l-4 border-l-indigo-500">
          <strong className="block text-indigo-900 mb-1">3. Acción (MV/OP)</strong>
          <span className="text-sm text-slate-600"><em>Manipulated Variable / Output</em>. Los "músculos". La salida del controlador hacia la válvula o motor.</span>
        </div>
      </div>

      <SubHeader>Escalas en la Interfaz</SubHeader>
      <DetailList items={[
        { label: "Escala de Ingeniería", desc: "El valor con unidad física que entiende el operador: bar, °C, m³/h." },
        { label: "Escala Porcentual", desc: "La señal normalizada del 0 al 100%, correspondiente de forma eléctrica a 4 - 20 mA." },
      ]} />

      <SubHeader>Control de Dos Posiciones (On-Off)</SubHeader>
      <p className="text-slate-700 mb-3">
        El actuador no tiene puntos intermedios: está 0% o 100% abierto. Ideal para procesos con gran inercia térmica (hornos, tanques de agua grandes).
      </p>
      <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
        <strong className="text-red-800">El Problema: Ciclado Rápido</strong>
        <p className="text-red-700 text-sm mt-1 mb-2">
          Si el PV ronda exactamente el SP, la válvula se abre y cierra frenéticamente (zapateo), causando inestabilidad, ruido y destrucción física del relé o actuador.
        </p>
        <span className="inline-block bg-white text-red-900 px-3 py-1 rounded-md text-sm font-semibold border border-red-200 shadow-sm">
          Solución: Brecha Diferencial (Gap / Dead Band)
        </span>
        <p className="text-red-700 text-sm mt-2">
          Se establecen puntos de corte asimétricos (ej. apaga en 102°C, enciende si baja de 98°C). Esto protege el hardware a cambio de una pequeña oscilación conocida.
        </p>
      </div>

      <SubHeader>Sintonía de Lazo: El Controlador PID</SubHeader>
      <p className="text-slate-700 mb-4">
        Busca que el error sea exactamente cero y que el proceso se mantenga estable sin saltos, accionando la válvula de forma proporcional (ej, válvula al 43%).
      </p>

      <DetailList items={[
        { 
          label: "1. Acción Proporcional (P)", 
          desc: "Actúa sobre el error PRESENTE. Multiplica el error por una Ganancia (Kp). Solo existe si hay error. Provoca indefectiblemente un Offset (error de estado estacionario) porque para mantener la válvula a un % que no sea 0, necesita que el error sea distinto de 0." 
        },
        { 
          label: "2. Acción Integral (I)", 
          desc: "Actúa sobre el PASADO. Suma el error acumulado a lo largo del tiempo. Su principal poder es eliminar el Offset de manera definitiva. Su mayor peligro técnico es el Windup." 
        },
        { 
          label: "3. Acción Derivativa (D)", 
          desc: "Actúa sobre el FUTURO. Mide la velocidad de cambio del error. Su función es 'pisar el freno' para evitar un Overshoot (pasarse de largo). No se usa en señales ruidosas porque reacciona caóticamente." 
        },
      ]} />

      <ExamTip title="Peligros Clásicos de PID">
        Para resolver casos prácticos en el examen, recuerda esto:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Offset (Error residual):</strong> Si un lazo se estabiliza, pero "lejos" del setpoint deseado y no llega nunca, <em>le falta acción Integral (I)</em>.</li>
          <li><strong>Windup (Saturación de integral):</strong> Ocurre cuando el controlador intenta corregir algo imposible (ej. válvula 100% abierta pero falta presión). El Integral sigue "acumulando" error mentalmente. Al normalizarse, el lazo tardará muchísimo en reaccionar.</li>
          <li><strong>Ruido en la señal:</strong> Si tu Variable de Proceso es muy inestable/ruidosa (ej. caudalímetros que oscilan mucho), <em>nunca habilites la acción Derivativa (D)</em>. Hará que la válvula vibre locamente.</li>
        </ul>
      </ExamTip>

      <SubHeader>Modos de Operación</SubHeader>
      <DetailList items={[
        { label: "Modo Automático (AUTO)", desc: "El lazo está cerrado. El PLC toma decisiones según el Setpoint definido y envía la orden (OP) al elemento final." },
        { label: "Modo Manual (MAN)", desc: "El lazo se rompe. El operador envía directamente el Output (OP %, ej. 40%) hacia la válvula. Se usa para arranques y mantenimiento." },
      ]} />

      <ExamTip>
        <strong>¿Qué es Bumpless Transfer?</strong> Es la capacidad técnica (software/hardware) que permite pasar el controlador de modo MANUAL a AUTO (o viceversa) sin que la válvula dé un salto violento (golpe de ariete). 
      </ExamTip>
    </div>
  );
}
