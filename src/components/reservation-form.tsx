import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MAX_PARTY,
  formatLongDate,
  isClosedDay,
  occasions,
  santiagoDateISO,
  slotsForDate,
} from "@/lib/data";
import { useReservations } from "@/lib/store";
import { cn } from "@/lib/utils";

function upcomingDates(count = 14) {
  const out: string[] = [];
  for (let i = 0; i < count + 4 && out.length < count; i += 1) {
    const iso = santiagoDateISO(i);
    if (!isClosedDay(iso)) out.push(iso);
  }
  return out;
}

export function ReservationForm({
  compact = false,
}: {
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const addReservation = useReservations((s) => s.addReservation);
  const remainingAt = useReservations((s) => s.remainingAt);
  const dates = useMemo(() => upcomingDates(12), []);

  const [date, setDate] = useState(dates[0] ?? santiagoDateISO(0));
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState<string>(occasions[0]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const slots = slotsForDate(date);
  const remaining = time ? remainingAt(date, time) : 0;

  function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim()) {
      setError("Necesitamos tu nombre y un teléfono de contacto.");
      return;
    }
    if (!time) {
      setError("Elige un horario para la mesa.");
      return;
    }
    if (remainingAt(date, time) < partySize) {
      setError("Ese horario ya no tiene cupo para ese número de personas.");
      return;
    }
    const row = addReservation({
      name,
      phone,
      email,
      date,
      time,
      partySize,
      notes,
      occasion,
      source: "web",
    });
    void navigate({
      to: "/reservar",
      search: { ok: row.id },
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-2">
        <Label>Fecha</Label>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {dates.map((iso) => {
            const selected = iso === date;
            const [y, m, d] = iso.split("-").map(Number);
            const dt = new Date(y, m - 1, d);
            const weekday = dt.toLocaleDateString("es-CL", { weekday: "short" });
            return (
              <button
                key={iso}
                type="button"
                onClick={() => {
                  setDate(iso);
                  setTime("");
                }}
                className={cn(
                  "flex min-w-16 flex-col items-center rounded-lg px-3 py-2 text-center transition-colors duration-150",
                  selected
                    ? "bg-ink text-paper"
                    : "bg-cream text-ink ring-1 ring-line hover:bg-paper-deep",
                )}
              >
                <span className="text-[10px] tracking-wide uppercase opacity-70">
                  {weekday.replace(".", "")}
                </span>
                <span className="font-display text-lg leading-none">{d}</span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted capitalize">{formatLongDate(date)}</p>
      </div>

      <div className="grid gap-2">
        <Label>Horario</Label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {slots.map((slot) => {
            const left = remainingAt(date, slot);
            const disabled = left < partySize;
            const selected = time === slot;
            return (
              <button
                key={slot}
                type="button"
                disabled={disabled}
                onClick={() => setTime(slot)}
                className={cn(
                  "h-11 rounded-lg text-sm tabular-nums transition-colors duration-150",
                  selected
                    ? "bg-ember text-cream"
                    : disabled
                      ? "bg-paper-deep text-muted/50"
                      : "bg-cream text-ink ring-1 ring-line hover:bg-paper-deep",
                )}
              >
                {slot}
              </button>
            );
          })}
        </div>
        {time ? (
          <p className="text-xs text-muted tabular-nums">
            Quedan {remaining} cubiertos en este horario.
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="party">Personas</Label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="size-11 rounded-lg bg-cream ring-1 ring-line"
            onClick={() => setPartySize((n) => Math.max(1, n - 1))}
            aria-label="Menos personas"
          >
            −
          </button>
          <span className="min-w-8 text-center font-display text-2xl tabular-nums">
            {partySize}
          </span>
          <button
            type="button"
            className="size-11 rounded-lg bg-cream ring-1 ring-line"
            onClick={() => setPartySize((n) => Math.min(MAX_PARTY, n + 1))}
            aria-label="Más personas"
          >
            +
          </button>
          <span className="text-sm text-muted">máximo {MAX_PARTY}</span>
        </div>
      </div>

      <div className={cn("grid gap-4", compact ? "" : "sm:grid-cols-2")}>
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Camila Rojas"
            autoComplete="name"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+56 9 1234 5678"
            autoComplete="tel"
            required
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Correo (opcional)</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.cl"
          autoComplete="email"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="occasion">Ocasión</Label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="h-11 w-full rounded-lg bg-cream px-3.5 text-sm text-ink shadow-[inset_0_0_0_1px_var(--color-line)] outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-ember)]"
        >
          {occasions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="notes">Notas para la casa</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Alergias, silla para niña, mesa tranquila…"
        />
      </div>

      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Confirmar reserva
      </Button>
    </form>
  );
}
