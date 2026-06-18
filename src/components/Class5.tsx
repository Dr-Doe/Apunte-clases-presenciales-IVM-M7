import React from 'react';
import { SectionHeader, SubHeader, H3, DetailList, ExamTip, Quiz } from './Shared';
import { MonitorPlay } from 'lucide-react';

export default function Class5() {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title="Clase 5: SCADA, HMI y Gestión Operativa" 
        subtitle="Interfaces, Alarmas y Jerarquías de la Sala de Control" 
        icon={MonitorPlay} 
      />

      <p className="text-slate-700 text-lg leading-relaxed mb-6">
        La información digital que corre en el PLC no sirve si el operador no puede interactuar con ella. SCADA y HMI son el puente entre el mundo del silicio y la toma de decisiones humana.
      </p>

      <SubHeader>Diferencia Crítica: SCADA Central vs HMI Local</SubHeader>
      <div className="overflow-x-auto shadow-sm rounded-lg border border-slate-200 mb-8">
        <table className="w-full text-left bg-white text-slate-800 text-sm md:text-base">
          <thead>
            <tr className="bg-slate-100 text-slate-600">
              <th className="p-3 font-semibold border-b border-slate-200">Característica</th>
              <th className="p-3 font-semibold border-b border-slate-200">HMI (Al pie de máquina)</th>
              <th className="p-3 font-semibold border-b border-slate-200">SCADA (Sala Central)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="p-3 font-semibold text-slate-700">Foco</td>
              <td className="p-3">Operación táctica de un equipo puntual.</td>
              <td className="p-3">Gestión estratégica/global de toda la planta.</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="p-3 font-semibold text-slate-700">Archivos / BD</td>
              <td className="p-3">Históricos muy cortos (o nulos). Operación en tiempo real.</td>
              <td className="p-3">Procesamiento masivo histórico (Historian / Big Data / Trazabilidad).</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="p-3 font-semibold text-slate-700">Entorno y Riesgo</td>
              <td className="p-3">Hardware rugerizado, expuesto a gas y desgaste. Mayor peligro p/operador.</td>
              <td className="p-3">Servidores y pantallas en ambiente 100% climatizado y seguro.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SubHeader>Navegación: La Regla de los Niveles Diciplinados</SubHeader>
      <p className="text-slate-700 mb-3">
        El operador no navega erráticamente, va de una macro a lo micro sin perder contexto de planta.
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6 bg-white p-5 shadow-sm rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 justify-between">
        <li className="flex-1"><strong>Panorama (Overview):</strong> Planta.</li>
        <li className="flex-1"><strong>Área:</strong> Gráfico P&ID de unidad (ej. Separadores).</li>
        <li className="flex-1"><strong>Faceplate:</strong> Pop-up del lazo individual con PID.</li>
        <li className="flex-1"><strong>Diagnóstico:</strong> Trends y código de hardware para instrumentistas.</li>
      </ol>

      <SubHeader>Gestión de Alarmas (Norma ISA 18.2)</SubHeader>
      <p className="text-slate-700 mb-3">
        La "Fatiga de Alarmas" (saturación de bocinas y luces simultáneas) es la causa principal de accidentes graves. El ciclo de vida de una alarma se gestiona meticulosamente:
      </p>
      <DetailList items={[
        { label: "Normal", desc: "La variable está estable dentro del rango de operación." },
        { label: "Activa (No Reconocida)", desc: "Se superó límite técnico. Parpadea en rojo/amarillo (con bocina). El operador DEBE mirarla." },
        { label: "Reconocida (ACK - Acknowledged)", desc: "El operador hace click indicando 'Ya lo vi'. La bocina se apaga y la luz parpadeante queda fija. Es un registro legal (trazabilidad de responsabilidad)." },
        { label: "Shelving (Puesta en estante)", desc: "El operador oculta manual y temporalmente una alarma 'parlanchina' para que no le moleste, generalmente se usa cuando el equipo fue tomado por mantenimiento." },
      ]} />

      <SubHeader>Maniobras Clave: Bypass vs Comandos OP</SubHeader>
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-4">
        <H3>Bypass (Inhibición de Seguridad)</H3>
        <p className="text-slate-700 text-sm">
          Medida extrema. Consiste en cegar o desactivar lógicamente un interbloqueo del SIS (Ej. anular la alarma de 'Alta Temperatura') para que no paré la planta mientras se cambia un termómetro físico con daño mecánico. 
          Requiere LOTO (Bloqueo y etiquetado físico) y permiso jerárquico firme.
        </p>
      </div>

      <ExamTip title="Conceptos Tramposos del Examen">
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Si el operador silencia la consola (ACK), ¿se arregla la planta?</strong> <em>NO.</em> Solo registra legalmente que él es consciente de la falla (mute sonoro). A partir de ahí, él debe actuar (arrancar la bomba, modificar SP).</li>
          <li><strong>Bypass:</strong> Siempre debe estar regulado bajo norma/permisos. Si se usa mal permanentemente (Bypass no normalizado), la planta es una bomba de tiempo ciega.</li>
          <li><strong>Faceplate:</strong> Si quieres cambiar la planta de AUTO a MANUAL o modificar el SetPoint (SP), lo haces desde esta pequeña ventana (Faceplate) que emergió al hacer click en el equipo dentro del plano P&ID en SCADA.</li>
        </ul>
      </ExamTip>

      <Quiz 
        questions={[
          {
            question: "¿Cuál de estas aseveraciones marca correctamente la diferencia entre SCADA Central y un Panel HMI Táctil perimetral?",
            options: [
              "El SCADA siempre se conecta directo por cable serial a cada válvula, el HMI se conecta por satélite a la PC.",
              "El HMI ofrece datos de diagnóstico puro de alta densidad para analistas. El SCADA es simple táctil para mantenimiento sin base de datos.",
              "El HMI está enfocado operacionalmente en equipo local de control táctico expuesto, el SCADA permite el manejo integral macro-estratégico de millones de datos histórico en espacio ciego y seguro.",
              "El HMI almacena los históricos (Historian) que el SCADA carece de capacidad técnica de almacenar."
            ],
            correctIndex: 2,
            explanation: "El SCADA requiere servidores para Big Data histórica. El HMI está pegado a la bomba para control táctico sin servidor de base de datos pesada y no gestiona la planta global."
          },
          {
            question: "En una sala de SCADA salta una alarma Roja, enciende la bocina alta y el icono parpadea intermitentemente sin cesar. Según el ciclo ISA, ¿qué acción es requerida para pasar la luz de intermitente a continua y quitar la alarma al software?",
            options: [
              "Shelving (Modo en el Estante).",
              "Acknowledge o Reconocimiento (ACK) ejecutado de forma manual por el operador visual certificando 'lo vi'.",
              "Cambiar de AUTO a MANUAL.",
              "Modificar el PID desde el Faceplate y esperar que PV supere a Setpoint."
            ],
            correctIndex: 1,
            explanation: "ISA 18.2 establece el botón de Acuse (Acknowledge) como el traspaso de una Alarma Activa No Atendida (parpadeante con audio) al estado Atendida. (El audio cesa pero la luz sigue mientras persista la desviación)."
          }
        ]} 
      />
    </div>
  );
}
