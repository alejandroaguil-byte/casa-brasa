import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { z } from "zod";
import { DemoBanner } from "@/components/demo-banner";
import { ReservationForm } from "@/components/reservation-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { formatLongDate, restaurant } from "@/lib/data";
import { useReservations } from "@/lib/store";

const searchSchema = z.object({
  ok: z.string().optional(),
});

export const Route = createFileRoute("/reservar")({
  validateSearch: searchSchema,
  component: ReservarPage,
});

function ReservarPage() {
  const { ok } = Route.useSearch();
  const reservation = useReservations((s) =>
    ok ? s.reservations.find((row) => row.id === ok) : undefined,
  );

  return (
    <div className="min-h-screen bg-paper text-ink">
      <DemoBanner />
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div>
          <p className="text-xs tracking-[0.22em] text-muted uppercase">
            Reservas
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-tight">
            {reservation ? "Mesa anotada." : "Reserva tu mesa."}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {reservation
              ? "El salón ya tiene tu reserva. Si necesitas cambiar el horario, escríbenos o llama a la casa."
              : "Elige día y hora. El cupo se descuenta al confirmar — nadie más toma esa mesa a la misma hora."}
          </p>

          {reservation ? (
            <div className="mt-8 rounded-xl bg-cream p-6 shadow-[var(--shadow-border)]">
              <div className="flex items-center gap-2 text-ok">
                <Check className="size-5" />
                <span className="text-sm font-medium tracking-wide uppercase">
                  Confirmación
                </span>
              </div>
              <dl className="mt-5 grid gap-3 text-sm">
                <Row label="Nombre" value={reservation.name} />
                <Row
                  label="Fecha"
                  value={`${formatLongDate(reservation.date)} · ${reservation.time}`}
                />
                <Row
                  label="Personas"
                  value={String(reservation.partySize)}
                />
                {reservation.occasion !== "Sin ocasión especial" ? (
                  <Row label="Ocasión" value={reservation.occasion} />
                ) : null}
                {reservation.notes ? (
                  <Row label="Notas" value={reservation.notes} />
                ) : null}
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="ink">
                  <Link to="/salon">Ver en el salón</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/reservar">Hacer otra reserva</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-xl bg-cream p-5 shadow-[var(--shadow-border)] sm:p-7">
              <ReservationForm />
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-8">
          <figure className="overflow-hidden rounded-xl">
            <img
              src="/images/fachada.jpg"
              alt="Casa Brasa de noche en Irarrázaval."
              className="photo aspect-4/3 w-full object-cover"
            />
          </figure>
          <div className="mt-6 rounded-xl bg-ink p-6 text-paper">
            <p className="font-display text-2xl">{restaurant.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-paper/65">
              {restaurant.address}
              <br />
              Lunes cerrado. Almuerzo y cena de martes a sábado.
              Domingo solo almuerzo.
            </p>
            <p className="mt-4 text-sm text-paper/80">
              {restaurant.phoneDisplay}
            </p>
            <p className="mt-6 text-xs leading-relaxed text-paper/50">
              En un restaurante real, esta reserva llegaría al panel del
              salón y a un WhatsApp de confirmación. Aquí puedes abrir el
              panel y verla en la lista del día.
            </p>
          </div>
        </aside>
      </main>
      <SiteFooter />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3">
      <dt className="text-muted">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
