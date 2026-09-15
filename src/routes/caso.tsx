import { createFileRoute, Link } from "@tanstack/react-router";
import { DemoBanner } from "@/components/demo-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/photo";

export const Route = createFileRoute("/caso")({ component: CasoPage });

export function CasoPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <DemoBanner />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-xs tracking-[0.22em] text-muted uppercase">
          Caso · BobbaSystem
        </p>
        <h1 className="mt-3 font-display text-5xl tracking-tight">
          Casa Brasa
        </h1>
        <p className="mt-3 text-sm text-muted">Proyecto demo de portafolio</p>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Un restaurante de Ñuñoa que necesitaba algo más que una página
          bonita: una forma de conseguir mesas y de manejar el servicio
          del día sin perder reservas en WhatsApp.
        </p>

        <figure className="mt-10 overflow-hidden rounded-xl">
          <Photo
            src="/images/hero.svg"
            alt="Interior de Casa Brasa."
            className="photo aspect-16/9 w-full object-cover"
          />
        </figure>

        <section className="mt-12">
          <h2 className="font-display text-3xl">El punto de partida</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            El local funcionaba como tantos en Santiago: la carta en un PDF,
            las reservas por mensaje, el salón anotando cubiertos en un
            cuaderno. Eso alcanzaba hasta que una noche coincidían dos
            cumpleaños y nadie tenía visibilidad de cupo. El Instagram
            traía consultas; el WhatsApp las perdía.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            No faltaba un sistema gigante. Faltaba una presencia clara
            para quien quiere reservar, y un tablero simple para quien
            atiende el turno.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl">Qué se construyó</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Un sitio con la identidad del local — carta, historia, horarios —
            y un flujo de reserva de un minuto. Sobre esa base, un panel
            de salón: servicio del día, mesas, walk-in, estados y notas
            del comensal.
          </p>
          <ul className="mt-6 grid gap-3 text-sm">
            {[
              "Sitio público con carta, historia y llamado a reservar.",
              "Reserva con fecha, hora, cupo real y notas.",
              "Panel de salón: confirmar, sentar, cerrar, no-show.",
              "Mapa de 12 mesas y registro de walk-in.",
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg bg-cream px-4 py-3 leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl">Por qué importa</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            El cliente deja de preguntar “¿tienen mesa a las 21:00?”. El
            salón deja de reconstruir el turno de memoria. La herramienta
            está hecha alrededor de cómo trabaja un restaurante de barrio,
            no alrededor de un software genérico de reservas.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Demuestra el criterio de BobbaSystem: escuchar un problema
            concreto, construir una solución útil para quien la usa, y
            entregarla como un producto que se puede mostrar — no como
            una maqueta.
          </p>
        </section>

        <section className="mt-12 rounded-xl bg-ink p-6 text-paper sm:p-8">
          <p className="text-xs tracking-[0.2em] text-brass uppercase">
            Cómo se usa esta demo
          </p>
          <ol className="mt-5 grid gap-4 text-sm leading-relaxed text-paper/80">
            <li>
              <span className="text-paper">1. Reserva una mesa</span> como
              lo haría un comensal. Recibirás una confirmación en pantalla.
            </li>
            <li>
              <span className="text-paper">2. Entra al salón</span> y
              verás esa reserva en el servicio del día. Confírmala, asígnala
              a una mesa y siéntala.
            </li>
            <li>
              <span className="text-paper">3. Prueba un walk-in</span> para
              ver cómo el local anota a quien llega sin reserva.
            </li>
          </ol>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="cream">
              <Link to="/reservar">Reservar</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/salon">Abrir el salón</Link>
            </Button>
          </div>
        </section>

        <p className="mt-12 text-sm leading-relaxed text-muted">
          Casa Brasa es un restaurante ficticio. El proyecto existe para
          mostrar, con un caso concreto, el tipo de solución que{" "}
          <a
            href="https://bobbasystem.cl"
            className="text-ink underline-offset-4 hover:underline"
          >
            BobbaSystem
          </a>{" "}
          construye para pequeños negocios de Santiago.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
