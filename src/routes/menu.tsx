import { createFileRoute, Link } from "@tanstack/react-router";
import { DemoBanner } from "@/components/demo-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { formatClp, menu } from "@/lib/data";

export const Route = createFileRoute("/menu")({ component: MenuPage });

function MenuPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <DemoBanner />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-xs tracking-[0.22em] text-muted uppercase">Carta</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight">
          Lo que sale hoy.
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
          Una carta corta, de estación. Los precios están en pesos chilenos.
          Pregunta en sala por el punto de la carne y los vinos por copa.
        </p>

        <div className="mt-12 grid gap-14">
          {menu.map((section) => (
            <section key={section.id}>
              <div className="border-b border-line pb-3">
                <h2 className="font-display text-3xl">{section.title}</h2>
                {section.intro ? (
                  <p className="mt-1 text-sm text-muted">{section.intro}</p>
                ) : null}
              </div>
              <ul className="mt-5 grid gap-5">
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1"
                  >
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-right text-sm tabular-nums text-ember-deep">
                      {formatClp(item.price)}
                      {item.note ? (
                        <span className="ml-1 text-[11px] text-muted">
                          {item.note}
                        </span>
                      ) : null}
                    </p>
                    <p className="col-span-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 rounded-xl bg-ink p-6 text-paper sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-2xl">Una mesa para esta noche.</p>
            <p className="mt-1 text-sm text-paper/65">
              Reserva en un minuto. El salón ve el cupo en tiempo real.
            </p>
          </div>
          <Button asChild variant="cream">
            <Link to="/reservar">Reservar</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
