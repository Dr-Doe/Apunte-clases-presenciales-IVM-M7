import React from 'react';
import { SectionHeader, SubHeader, H3, DetailList, ExamTip, Quiz } from './Shared';
import { Network } from 'lucide-react';

export default function Class7() {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title="Clase 7: Estrategias de Control Especiales" 
        subtitle="Rango Partido (Split-Range) y Control por Sobreescritura (Override)" 
        icon={Network} 
      />

      <p className="text-slate-700 text-lg leading-relaxed mb-6">
        No todo proceso se soluciona con "un sensor, un controlador y una válvula". A veces, las limitaciones físicas exigen que los controladores cooperen o luchen por el mando para estabilizar o proteger.
      </p>

      <SubHeader>Estrategia 1: Control de Rango Partido (Split-Range)</SubHeader>
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-6">
        <strong className="text-indigo-900 block mb-2 text-lg">Un Cerebro — Múltiples Músculos</strong>
        <p className="text-indigo-800 text-sm">
          Se utiliza <strong>un único controlador (PID)</strong> cuya acción (de 0 a 100%) se divide para manejar <strong>dos o más actuadores finales (válvulas)</strong>.
        </p>
      </div>

      <DetailList items={[
        { label: "Caso de uso clásico", desc: "El control de temperatura de un reactor. Una válvula inyecta vapor (calienta) y otra válvula inyecta agua (enfría)." },
        { label: "El Punto de Cruce (Split Point)", desc: "Normalmente al 50% de la salida del OP. Desde el 0% al 50%, la válvula de Frío se cierra gradualmente. Al 50%, AMBAS válvulas están cerradas (Punto de reposo térmico sin gastar energía). Del 50% al 100%, se abre gradualmente el vapor." },
        { label: "Riesgos del Ciclado", desc: "Si el controlador está mal sintonizado (es 'demasiado nervioso'), el PID oscila alrededor del punto de cruce, inyectando vapor y agua constantemente. Esto genera un desgaste mecánico y desperdicio energético brutal." },
      ]} />

      <SubHeader>Estrategia 2: Control Override (Sobreescritura)</SubHeader>
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mb-6">
        <strong className="text-emerald-900 block mb-2 text-lg">Múltiples Cerebros — Único Músculo (Válvula)</strong>
        <p className="text-emerald-800 text-sm">
          Dos o más controladores compiten para comandar <strong>la misma válvula final</strong>, pero lo regulan a través de una compuerta lógica (Un "Selector" de Señal que oficia de árbitro).
        </p>
      </div>

      <DetailList items={[
        { label: "Filosofía Base", desc: "El lazo principal siempre busca producir dinero (ej. máximo flujo/producción). El lazo secundario (override) está en alerta y protegerá la máquina (ej. protección contra muy alta o muy baja presión que podría explotar equipos)." },
        { label: "Selector Automático Lógico", desc: "Se usan bloques lógicos conutadores, pueden ser de Alta (HS - High Selector) donde pasa la orden de mayor %, o Baja (LS - Low Selector), donde pasa la señal menor." },
        { label: "El peligro del 'Arrebato' (Overshoot)", desc: "Si la Variable crítica choca la pared muy rápido, el 'Selector Override' le arrebata el control al lazo de flujo y frena la válvula violentamente generando golpes de ariete si no se suaviza." },
      ]} />

      <SubHeader>El Gran Enemigo del Override: Integral Windup</SubHeader>
      <div className="bg-white p-5 shadow-sm rounded-xl border border-red-200 mb-6">
        <p className="text-slate-700 text-sm">
          Imagina que el Lazo Principal tiene el control. El Lazo Secundario (el vigía) tiene un Offset enorme (porque el equipo está seguro, lejos de su interbloqueo). El <em>Lazo Integral (I)</em> del vigía, por matemática pura, tratará de sumar corrección hasta alcanzar su extremo mental (saturación o Windup).
          <br /><br />
          Si hay una emergencia, y el vigía Override DEBE tomar el control, no podrá hacerlo a tiempo. Estará "borracho matemáticamente", tardará minutos en des-saturarse y se generará una explosión (Falla del equipo). 
          <br /><br />
          <strong>La Solución (Antisaturación externa):</strong> Se programa un <em>External Reset</em>. El controlador Override mantiene un canal abierto ('Feedback') leyendo qué hace la Válvula físicamente en ese instante. Nunca se carga mentalmente lejos de lo que hace el Lazo Principal. Así podrá "arrebatar" suavemente el control sin chocar en ceros ni clímax de bits.
        </p>
      </div>

      <ExamTip title="¿Split Range o Override para el examen?">
        Las palabras clave que te darán la respuesta correcta en el Choice:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Si el texto dice: "Controlador único manejando <strong>válvula de llenado y válvula de venteo</strong> a la par" → Es Split-Range.</li>
          <li>Si el texto dice: "Controlador de Flujo buscando producción y Controlador de Presión <strong>en estado de guarda como Restricción</strong>" → Es Override (o Control Selector).</li>
          <li>Recuerda: HS (Pasa la señal mayor), LS (Pasa la menor).</li>
          <li>En Override es OBLIGATORIO evitar la saturación integral. Sin "windup protection", el sistema es un peligro técnico inerte al tratar de arrebatar la señal.</li>
        </ul>
      </ExamTip>

      <Quiz 
        questions={[
          {
            question: "¿Qué es y cómo funciona el Control de Rango Partido (Split-Range)?",
            options: [
              "Un sistema donde 1 controlador enruta su esfuerzo (OP de 0-100) para repartir órdenes distintas (ej. Mitad Calienta, Mitad Enfría) usando 2 o más válvulas simultáneas o transicionales.",
              "Sistema de múltiples medidores de redundancia donde si se rompe uno, asume el 2do.",
              "Válvula de triple orificio accionada manualmente por SCADA."
            ],
            correctIndex: 0,
            explanation: "En Split-Range, el esfuerzo 100% de la salida del PID (OP) se divide en subrangos. P.ej dictando 0-50% a la válvula de agua, y 50-100% al vapor. 1 cerebro maneja 2 músculos o más."
          },
          {
            question: "En un control con selector o Override, ¿cuál es su fin primordial y cuál es el mayor peligro en su implementación de software si no se configura bien el PID esclavo 'en guardia'?",
            options: [
              "Hacer Rango-partido. Peligro: Fallo en internet.",
              "Otorgarle a la Seguridad Prioridad limitando parámetros del activo (pisando a producción). Mayor Peligro: Integral Windup (saturación en modo espera que retrasa o anula el traspaso de poder al chocar).",
              "Bajar Causa Efectos mediante PLC a manual. Peligro: Bumpless transition no efectiva saltando variables de 0% a 50%."
            ],
            correctIndex: 1,
            explanation: "El Override superpone la Seguridad Limitante. Si el Integrador (I) del lazo bloqueado en standby se satura porque sufre offset inalcanzable, jamás despertará a tiempo para la restricción (Satura a Windup por carecer de External Feedback de la posición real de la válvula)."
          }
        ]} 
      />
    </div>
  );
}
