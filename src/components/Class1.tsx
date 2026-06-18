import React from 'react';
import { SectionHeader, SubHeader, H3, DetailList, ExamTip } from './Shared';
import { Cpu } from 'lucide-react';

export default function Class1() {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title="Clase 1: El Cerebro del Control" 
        subtitle="PLC, DCS y Arquitectura de Control Automático" 
        icon={Cpu} 
      />

      <p className="text-slate-700 text-lg leading-relaxed mb-6">
        Históricamente, la automatización pasó de ser manual (válvulas in situ) a mecánica/neumática, hasta llegar a la era electrónica y digital actual, donde el control está centralizado.
      </p>

      <SubHeader>La Evolución del Hardware</SubHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 shadow-sm rounded-xl border border-slate-200">
          <H3>PLC (Controlador Lógico Programable)</H3>
          <p className="text-slate-600 mb-3">Diseñado para tareas discretas y velocidad. Sustituyó a los antiguos relés.</p>
          <ul className="text-sm space-y-1 list-disc pl-5 text-slate-700">
            <li>Uso: Procesos discretos, control secuencial, máquinas.</li>
            <li>Coste: Más económico.</li>
            <li>Redundancia: Opcional, a veces compleja.</li>
          </ul>
        </div>
        <div className="bg-white p-5 shadow-sm rounded-xl border border-slate-200">
          <H3>DCS (Sistema de Control Distribuido)</H3>
          <p className="text-slate-600 mb-3">Diseñado para plantas completas donde la inteligencia se distribuye en nodos.</p>
          <ul className="text-sm space-y-1 list-disc pl-5 text-slate-700">
            <li>Uso: Procesos continuos y complejos (refinerías).</li>
            <li>Redundancia: Nativa y estándar en el sistema.</li>
            <li>Ventaja: Ante una falla de comunicación con el panel, el controlador local sigue actuando (Autonomía de control).</li>
          </ul>
        </div>
      </div>

      <SubHeader>Arquitectura Interna del PLC</SubHeader>
      <DetailList items={[
        { label: "CPU y Memoria", desc: "La EEPROM (no volátil) guarda la lógica de control. La RAM se usa para datos temporales durante el escaneo." },
        { label: "Bus de Entrada/Salida (E/S)", desc: "El canal de comunicación interno que vincula la CPU con las tarjetas de hardware." },
        { label: "Módulo de Alimentación", desc: "Provee la energía estabilizada. Fallas aquí provocan reinicios inesperados del sistema entero." },
      ]} />

      <SubHeader>Señales: El Lenguaje Físico</SubHeader>
      <div className="bg-slate-100 p-6 rounded-xl space-y-4 text-slate-800">
        <div>
          <strong>1. Señales Discretas (Digitales):</strong> Valores 0 o 1 (ON/OFF). 
          Ejemplos: <em>Pulsadores, finales de carrera, alarmas de nivel (LSHH), estado de un motor.</em>
        </div>
        <div>
          <strong>2. Señales Analógicas:</strong> Rango continuo de valores, típicamente de 4 a 20 mA o 0 a 10 V. Todo valor de 4 a 20 se mapea a una escala de ingeniería (ej: 0 a 100 psi).
        </div>
        <div>
          <strong>Conversión A/D:</strong> El PLC no lee "presión" físicamente. Convierte los mAh en palabras de bits (Words, ej. 16 bits) para procesarlas numéricamente.
        </div>
      </div>

      <H3>Tecnologías de Módulos de Salida Discreta</H3>
      <DetailList items={[
        { label: "Relés (Mecánicos)", desc: "Compatibles con AC/DC. Manejan altas cargas pero sufren desgaste mecánico y son lentos (20 ms)." },
        { label: "Transistores (Sólidos)", desc: "Exclusivos para DC. Altísima velocidad (1 ms), aptos para señales PWM (frecuencia). Vida útil casi ilimitada." },
        { label: "Triacs (Sólidos)", desc: "Diseñados exclusivamente para manejar cargas de AC (corriente alterna)." },
      ]} />

      <ExamTip title="¿Cómo diagnosticar una salida de PLC en campo?">
        En un multiple choice, si te preguntan por diagnóstico rápido de salidas de PLC:
        <ul className="list-decimal pl-5 mt-2 space-y-1">
          <li><strong>LED encendido / Carga apagada:</strong> La falla es <em>externa</em> (fusible quemado, cable roto o la carga final falló).</li>
          <li><strong>LED apagado / Carga encendida:</strong> Es un problema <em>interno</em> del módulo (como un cortocircuito sólido en el triac/transistor o un contacto de relé congelado/pegado).</li>
        </ul>
      </ExamTip>

      <SubHeader>Lenguajes de Programación (Norma IEC 61131-3)</SubHeader>
      <DetailList items={[
        { label: "Ladder (LD / Diagrama en Escalera)", desc: "El más usado. Símbolos de relés y contactos. Muy visual. Se ejecuta por 'scan' periódico." },
        { label: "Lista de Instrucciones (IL)", desc: "Código básico booleano (AND, OR, LD)." },
        { label: "Diagrama de Bloques (FBD)", desc: "Lógica gráfica basada en bloques funcionales (&, >, OR)." },
        { label: "Texto Estructurado (ST)", desc: "Lenguaje de alto nivel (tipo Pascal o C) para algoritmos matemáticos complejos." },
        { label: "GrafCET (SFC)", desc: "Diagrama de estados ideal para procesos netamente secuenciales de pasos condicionados." },
      ]} />

      <ExamTip title="Conceptos Clave para el Examen">
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Autonomía del DCS:</strong> Si se pierde internet/red hacia los monitores de los operadores (HMI), los controladores DCS <em>NO se detienen</em>; siguen ejecutando su lazo local cerrado (autonomía).</li>
          <li><strong>Memoria:</strong> El programa (la lógica) NO se borra si se corta la luz porque reside en la <strong>EEPROM</strong> (No volátil). Para datos volátiles rápidos, usa RAM.</li>
        </ul>
      </ExamTip>
    </div>
  );
}
