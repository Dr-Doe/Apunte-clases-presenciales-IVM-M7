import React from 'react';
import { SectionHeader, SubHeader } from './Shared';
import { Table, BookOpen } from 'lucide-react';

export function ComparativeTables() {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title="Tablas Comparativas" 
        subtitle="Diferencias Críticas a Evaluar en el Examen" 
        icon={Table} 
      />

      <SubHeader>1. PLC vs. DCS</SubHeader>
      <div className="overflow-x-auto shadow-sm rounded-lg border border-slate-200 mb-8">
        <table className="w-full text-left bg-white text-slate-800 text-sm md:text-base">
          <thead>
            <tr className="bg-indigo-50 text-indigo-900 border-b border-indigo-100">
              <th className="p-3 font-bold w-1/4">Característica</th>
              <th className="p-3 font-bold w-3/8 border-l border-indigo-100">PLC (Controlador Lógico Programable)</th>
              <th className="p-3 font-bold w-3/8 border-l border-indigo-100">DCS (Sistema de Control Distribuido)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-3 font-semibold text-slate-700 bg-slate-50">Aplicación Base</td>
              <td className="p-3 border-l border-slate-100">Máquinas unitarias, Procesos Discretos de muy alta velocidad.</td>
              <td className="p-3 border-l border-slate-100">Plantas Complejas, Refinerías, Procesos Continuos.</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-700 bg-slate-50">Arquitectura / Control</td>
              <td className="p-3 border-l border-slate-100">Centralizado (generalmente un solo rack domina la zona).</td>
              <td className="p-3 border-l border-slate-100">Distribuido geográficamente. Nodos interconectados (Links) tolerantes a fallos ciegos.</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-700 bg-slate-50">Redundancia</td>
              <td className="p-3 border-l border-slate-100">Opcional, en ciertas adiciones requiere hardware extra voluminoso.</td>
              <td className="p-3 border-l border-slate-100">Nativa (Estándar dentro de la base de diseño de la marca).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SubHeader>2. Control (BPCS) vs. Seguridad (SIS)</SubHeader>
      <div className="overflow-x-auto shadow-sm rounded-lg border border-slate-200 mb-8">
        <table className="w-full text-left bg-white text-slate-800 text-sm md:text-base">
          <thead>
            <tr className="bg-red-50 text-red-900 border-b border-red-100">
              <th className="p-3 font-bold w-1/4">Criterio Operativo</th>
              <th className="p-3 font-bold w-3/8 border-l border-red-100">Alarma de Proceso / BPCS</th>
              <th className="p-3 font-bold w-3/8 border-l border-red-100">Parada de Emergencia (ESD) / SIS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-3 font-semibold text-slate-700 bg-slate-50">Objetivo del Hardware</td>
              <td className="p-3 border-l border-slate-100">Evitar Parada de Planta, maximizar la eficiencia en PID.</td>
              <td className="p-3 border-l border-slate-100">Evitar Evento Catastrófico que atente vidas o medio y activos.</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-700 bg-slate-50">Tipo de Lógica Lazo</td>
              <td className="p-3 border-l border-slate-100">Analógica/Regulatoria (ej. Válvula regulándose al 60%). Activo continuo.</td>
              <td className="p-3 border-l border-slate-100">Discreta/Binaria (Válvula de golpe y corte 100% CERRADO/ABIERTO). Vigía/Pasiva.</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-700 bg-slate-50">Intervención Humana</td>
              <td className="p-3 border-l border-slate-100">Obligatoria para Acusar Recibo y ajustar en panel.</td>
              <td className="p-3 border-l border-slate-100">Cero intervención requerida (Acción Autónoma Inmediata al romper Set Point de Seguridad).</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Glossary() {
  const terms = [
    { term: "PV (Process Variable)", def: "Variable de Proceso. El valor físico en la vida real captado por el transmisor, en tiempo real. Ej: Nivel de un tanque, Caudal en litros." },
    { term: "SP (Set Point)", def: "Punto de Consigna. El parámetro maestro que el operador le carga al PLC para definir lo que él desea que la máquina sostenga de forma constante." },
    { term: "MV/OP (Manipulated Variable)", def: "Salida del Controlador. El porciento de esfuerzo que el cerebro o sistema le traslada a la válvula de forma real. Va de 0 a 100%." },
    { term: "ACK (Acknowledge)", def: "Botón de 'Reconocimiento' en Consola SCADA ante alarmas. Silencia la sirena audible para indicar atención; es un registro normativo y legal sobre la persona y operador que acuso acuse de recepción a la falla técnica inminente." },
    { term: "LOPA", def: "Layers of Protection Analysis (Análisis de Capas de Protección). Es la pirámide de la salvaguardia funcional. Capa verde de BPCS hasta las rojas y pasivas de diques y Fire & Gas." },
    { term: "Windup (Saturación Integral)", def: "Cuando el Modo Integral del PID 'acumula internamente un error infinito' porque es incapaz físicamente de modificar la realidad de la planta. Provoca tiempos de reacción mortal o peligrosamente erráticos al desaparecer la causa original." },
    { term: "Interlock (Enclavamiento)", def: "Cadena de bloqueos programados. Un 'Interlock' dictamina en código qué bombas deben apagar obligatoriamente si cierra determinada válvula." },
    { term: "Fail-Safe (Falla Segura)", def: "Desenergize To Trip. El instrumento no tiene que contar con corriente eléctrica real/energía para irse o forzar el estado que ponga al seguro el ambiente o máquina de fábrica." },
    { term: "Bypass Lógico o Físico", def: "Deshabilitar normativamente (temporal, bajo protocolos y permiso del Jefe/Gerente de la planta/fábrica LOTO) una zona que dispara alarmas críticas o paradas para realizar su mantenimiento/calibración con el sector operando." },
    { term: "Override", def: "Consiste en utilizar múltiples lazos y un switch 'selector (Alto/Bajo)' sobre la misma válvula de la fábrica, arrebatándose inteligentemente la dominancia cuando existen emergencias en base y protección limitante de los equipos para garantizar la salvaguarda de vida interna y externa de la propia instalación." },
    { term: "Split-Range", def: "Modo PID de partición de señales OP (ej. Un 50% de la fuerza se usa para vapor [Válvula de vapor o calefacción] y el otro 50% para enfriar con nitrógeno/agua helada). Dos Músculos/válvulas, movidos por una simple neurona inteligente/PLC." }
  ];

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      <SectionHeader 
        title="Glosario Técnico" 
        subtitle="Terminología clave para el examen multiple choice" 
        icon={BookOpen} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {terms.map((t, idx) => (
          <div key={idx} className="bg-white p-4 shadow-sm border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
            <h4 className="text-indigo-800 font-bold mb-2 text-lg border-b border-indigo-50 pb-2">{t.term}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{t.def}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
