import React from 'react';
import { SectionHeader, SubHeader, H3, DetailList, ExamTip } from './Shared';
import { ShieldAlert } from 'lucide-react';

export default function Class3() {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title="Clase 3: Sistemas de Seguridad y Protección" 
        subtitle="SIS, F&G y Lógica de Enclavamientos (ESD)" 
        icon={ShieldAlert} 
      />

      <p className="text-slate-700 text-lg leading-relaxed mb-6">
        En las plantas industriales operan dos "cerebros" simultáneos: uno para controlar (producir dinero) y otro para proteger (proteger la vida, activos y medioambiente). Deben ser <strong>física y lógicamente independientes</strong>.
      </p>

      <SubHeader>Capa Básica vs Capa de Seguridad (LOPA)</SubHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <strong className="block text-slate-900 text-lg mb-2">BPCS (Control de Proceso)</strong>
          <ul className="text-sm space-y-2 list-disc pl-5 text-slate-700">
            <li><strong>Función:</strong> Prevención dinámica. Mantiene la planta operando eficientemente mediante lazos PID.</li>
            <li><strong>Actitud:</strong> Activo permanentemente.</li>
            <li><strong>Falla:</strong> Provoca pérdida de dinero, pero no debe causar catástrofes.</li>
          </ul>
        </div>
        <div className="bg-red-50 p-5 rounded-xl border border-red-200">
          <strong className="block text-red-900 text-lg mb-2">SIS (Sistema Instrumentado de Seg.)</strong>
          <ul className="text-sm space-y-2 list-disc pl-5 text-red-800">
            <li><strong>Función:</strong> Mitigación ante la emergencia. Lleva la planta a condición de riesgo cero (Estado Seguro).</li>
            <li><strong>Actitud:</strong> Pasivo/Vigía. Solo actúa cuando se sobrepasan los límites (Trip).</li>
            <li><strong>Diseño:</strong> De-energize to trip (Desenergizar para actuar, diseño a prueba de fallas).</li>
          </ul>
        </div>
      </div>

      <SubHeader>Fire & Gas (Detección de Fuego y Gas)</SubHeader>
      <p className="text-slate-700 mb-3">
        El sistema F&G es una de las últimas capas de mitigación (después del SIS de proceso y las válvulas de alivio mecánicas). Su objetivo es detectar fugas y fuentes de ignición en etapas muy tempranas.
      </p>
      <DetailList items={[
        { label: "Gases Inflamables (LEL/LFL)", desc: "Lower Explosive Limit. Detectores puntuales o de sendero abierto (Open Path IR). Alarman la presencia de nubes peligrosas ANTES de llegar al 100% LEL." },
        { label: "Gases Tóxicos", desc: "Monitorean partes por millón (PPM) de gases letales inodoros como el H2S (Ácido sulfhídrico)." },
        { label: "Detección de Llama (Fuego)", desc: "Sensores ópticos rápidos de tecnología UV, IR o IR3 (Multi-espectro) para discriminar llamas reales del sol o soldaduras engañosas." },
      ]} />

      <SubHeader>Lógicas de Votación (Redundancia)</SubHeader>
      <p className="text-slate-700 mb-4">
        Para tener un Nivel de Integridad de Seguridad (SIL) alto, no confiamos en un solo sensor. Los agrupamos en arreglos lógicos.
      </p>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <strong>1oo1 (Uno de Uno):</strong> Un solo sensor tiene el poder de parada. Si ese instrumento falla en falso, la planta para (falsa alarma).
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <strong>1oo2 (Uno de Dos):</strong> De los dos sensores, basta que uno vea peligro para parar todo. Máxima seguridad, pero duplica el riesgo de paradas espurias.
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <strong>2oo2 (Dos de Dos):</strong> Se requiere el acuerdo de ambos. Si uno se estropea (no lee), la seguridad de la planta queda a ciegas.
        </div>
        <div className="bg-emerald-50 p-4 rounded-lg shadow-sm border border-emerald-200">
          <strong className="text-emerald-900">2oo3 (Dos de Tres) - El Estándar de la Industria:</strong> Combina lo mejor de todos. Se requiere que 2 sensores disparen para parar la planta. Si uno da disparo falso, la planta sigue. Si uno muere, la planta sigue protegida por los otros dos (como un 1oo2).
        </div>
      </div>

      <ExamTip type="warning" title="Dato Crítico Causa/Efecto (Examen)">
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Matriz Causa-Efecto:</strong> Documento legal principal de la seguridad. Las filas (Inputs) son <em>Causas</em> (ej. Muy alta presión / PSHH). Las columnas (Outputs) son <em>Efectos</em> (ej. Cerrar válvula de alimentación). La <strong>X</strong> marca la interrelación.</li>
          <li><strong>Jerarquía de Paradas:</strong> 
            <br />- <strong>USD (Unit Shutdown):</strong> Se para un equipo (Ej. un horno).
            <br />- <strong>PSD (Process Shutdown):</strong> Se para un tren complejo de producción.
            <br />- <strong>ESD (Emergency Shutdown):</strong> Peor escenario. Abandono de operaciones, despresurización al Flare y corte general.
          </li>
        </ul>
      </ExamTip>
    </div>
  );
}
