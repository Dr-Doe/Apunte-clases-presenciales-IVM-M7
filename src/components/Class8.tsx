import React from 'react';
import { SectionHeader, SubHeader, H3, DetailList, ExamTip, Quiz } from './Shared';
import { Search } from 'lucide-react';

export default function Class8() {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title="Clase 8: Diagnóstico y Supervisión" 
        subtitle="Troubleshooting y Diferenciación de Fallas Reales de Ficticias" 
        icon={Search} 
      />

      <p className="text-slate-700 text-lg leading-relaxed mb-6">
        Cuando un sector se viste de alarmas y luces parpadeantes, el supervisor se enfrenta al reloj: detectar si el proceso o el sistema electrónico colapsó. Esta clase te entrena el olfato de diagnóstico.
      </p>

      <SubHeader>Falla de Proceso (Real) vs. Falla de Instrumento</SubHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl">
          <H3>Falla Real de Proceso</H3>
          <ul className="text-sm space-y-2 list-disc pl-5 text-orange-900">
            <li><strong>Trend (Tendencia):</strong> El valor de la presión o temperatura sube o baja de forma <em>física, es decir, dibuja una curva suave o exponencial</em> de acuerdo a leyes de la termodinámica reales.</li>
            <li><strong>Correlación Múltiple:</strong> Afecta al entorno natural. Si explota el tanque y baja la presión de forma abrupta, todos sus congéneres térmicos también mutan (Correlaciona físicamente con otras variables).</li>
            <li><strong>Respuesta de Salida:</strong> Modificando la orden del PLC (OP/MV), la PV no llega al objetivo pero sí se mueve levemente hacia ese sector de la curva.</li>
          </ul>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
          <H3>Falla De Instrumentación Falsa</H3>
          <ul className="text-sm space-y-2 list-disc pl-5 text-slate-800">
            <li><strong>Salto 0/100 o Freeze:</strong> De un segundo a otro, pasó de 80 a 0 mágico y abrupto; o está congelada trazando una línea aburridamente perfecta y quieta ("Frozen Data").</li>
            <li><strong>Status:</strong> Indica color 'Magenta' (o NAMUR - Out-of-Range). Esto significa que el PLC y la red no visualizan al campo. Significa que se cortó el hilo eléctrico (bajó a 0 mA, en vez del mínimo activo tolerado, 4 mA, de ahí la magia de que el CERO no sea cero amperios, para discriminar desconexiones de líneas cortadas físicas).</li>
          </ul>
        </div>
      </div>

      <SubHeader>Puntos de Falla Múltiple Red y Switches</SubHeader>
      <p className="text-slate-700 mb-3">
        El "COMM FAIL" masivo. Cuando un bloque entero compuesto de muchos transmisores se reportan en modo Magenta (cortados), rara es la ocasión estadística, por ende, es prácticamente un error de infraestructura nodal.
      </p>
      <DetailList items={[
        { label: "Switch o Enrutador (Gateways serial-ethernet)", desc: "El punto de fallo nodal más común de pérdida perimetral (el nodo de borde/Switch edge falló o su boca se congeló). Se identifica localizando subredes o anillos muertos de acuerdo a la topología física mostrada de planta." },
        { label: "Redes Físicas y Tormentas IP", desc: "El broadcast storm ocurre si tenemos hubs no estructurados o un cable UTP entra en cortocircuito y genera saturación y pérdida virtual de información (causa latencia masiva de SCADA)." },
      ]} />

      <SubHeader>Problemas Mecánicos en la Válvula de Campo</SubHeader>
      <DetailList items={[
        { label: "Stiction (Fricción / Histéresis de la Válvula)", desc: "El supervisor observa la Válvula (El PLC da orden/Output al 40.. 41..42%) y la respuesta (PV) queda constante. De repente salta brutalmente. Responde como 'a tirones' trabado de forma engomada." },
        { label: "Saturación pura y física", desc: "El controlador ya hizo tope en OP = 100%. Y el Set Point no llega (ej, OP en 100%, SP 90 grados, PV a 60 grados eternamente). Esto delata que hace falta fuerza del compresor, que la bomba está vieja, rota mecánicamente, etc o que las cañerías del límite base industrial pasaron al máximo legal físico." },
      ]} />

      <ExamTip title="Matriz y Orden Táctico en el Examen">
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Si la Matriz de Disparo o ESD indica 'Bajo nivel' y el equipo se cortó:</strong> Tienes que confirmar de acuerdo al tiempo, la velocidad y la curva de tendencia (¿fue el sensor, fue falla en red un 0 amperios o fue el tanque agujereado perdiendo todo el volumen real?).</li>
          <li><strong>Primer paso ante duda en SCADA:</strong> Consultar Arquitectura de C&E (Matriz causa y efecto) y trazar correlaciones. Aislar vía Bypass el loop y pasarlo de Auto a Manual si se debe chequear y desarmar en campo, tras la autorización pertinente LOTO (Lock-out Tag-out).</li>
        </ul>
      </ExamTip>

      <Quiz 
        questions={[
          {
            question: "En su consola SCADA, de manera idéntica y en el mismo segundo, el Tanque 1 de Gas y sus 8 transmisores asociados (presiones, flujos y niveles) decayeron sus valores en Magenta marcando 'COMM_FAIL' a la vez. ¿A qué se atribute más estadísticamente el error inicial en Troubleshooting?",
            options: [
              "Ciclado mecánico de 8 válvulas reventadas juntas (falla real simultánea en todo el fierro).",
              "Saturación o Falla grave de comunicación en un Nodal intermedio, como un switch industrial / Gateway o fibra óptica perimetral.",
              "Error Humano. Un operador tocó un Faceplate de un PLC local en Manual y rompió en Bypass todos los equipos juntos por defecto."
            ],
            correctIndex: 1,
            explanation: "Ocho instrumentos reales y pesados rara vez se rompen solos todos a la vez cayendo a 'COM FAIL'. Ese mensaje denota perdida nodal IP/Serial. Implica siempre verificar switches (Topolía Red) ante todo. No fue una explosión porque todo hubiera quedado en 0 normal (rojo), no 'magenta o bad signal status'."
          },
          {
            question: "El operador observa que en el Lazo de Flujo, el Set Point dicta '45 m3' y el Controlador exige mediante la OP (Output al 100%) máxima capacidad apertura... PERO, el Caudal real (PV) medido se congela limitadamente en solo 30 m3 eternos (Y jamas oscila ni decae). ¿Esto refleja qué problema de Troubleshooting?",
            options: [
              "Fricción de empacaduras y trabe (Stiction).",
              "Saturación Pura Física: El controlador hizo tope al 100%, pero el entorno físico industrial de limitación carece de la fuerza de bomba necesaria. (Limitación real y física, no problema electrónico u PID).",
              "Interlock accionado silencioso, sin activar alarma alguna ni Matriz C&E."
            ],
            correctIndex: 1,
            explanation: "El PID pide al 100%, la válvula está totalmente abierta al máximo, pero solo leemos una fraccion real limitada. Eso significa que 'hay que poner una bomba más grande' o cambiar la Ingeniería del caño. Es Pura Saturación Ciega al Entorno Físico."
          },
          {
            question: "Si ves que la Presión (PV) salta instantáneamente, formando un ángulo recto perfecto de 90 grados a CERO en su tendencia (O de repente de cero a 'Freeze 100') ignorando toda inercia gravitacional.. Esto te indica típicamente:",
            options: [
              "El Operador activó un HMI Local para arrancar la planta.",
              "Rotura inminente física de la línea y bomba reventada termodinámicamente.",
              "Falla Electrónica del Transmisor / Lazo 4-20mA Desconectado súbitamente por falla en cableado y no una variación Termodinámica ni Fluidomecánica real."
            ],
            correctIndex: 2,
            explanation: "Ninguna curva termodinámica (presión, agua o gas fluyendo) dibuja un 'CERO' milisegundo perfecto que grafique una rectitud muerta total de un salto. Este salto milimétrico 'cuadrado' de milisegundos a cero indica un latigazo electrónico de los 4 o los voltios al milisegundo cero, o sea, falla de cableado / instrumento roto electrónico. La física real toma curvas para morir."
          }
        ]} 
      />
    </div>
  );
}
