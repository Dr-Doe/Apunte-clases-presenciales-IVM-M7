import React from 'react';
import { SectionHeader, SubHeader, H3, DetailList, ExamTip } from './Shared';
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
    </div>
  );
}
