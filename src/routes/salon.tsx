import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  RotateCcw,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { DemoBanner } from "@/components/demo-banner";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type Reservation,
  type ReservationStatus,
  formatLongDate,
  isClosedDay,
  santiagoDateISO,
  slotsForDate,
  statusLabel,
  tables,
} from "@/lib/data";
import { useReservations } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/salon")({ component: SalonPage });

const statusTone: Record<ReservationStatus, "muted" | "ember" | "ok" | "warn" | "danger" | "brass"> = {
  pendiente: "warn",
  confirmada: "ember",
  sentada: "ok",
  completada: "muted",
  cancelada: "danger",
  "no-show": "danger",
};

function SalonPage() {
  const today = santiagoDateISO(0);
  const [date, setDate] = useState(today);
  const [query, setQuery] = useState("");
  const [walkInOpen, setWalkInOpen] = useState(false);
  const reservations = useReservations((s) => s.reservations);
  const updateStatus = useReservations((s) => s.updateStatus);
  const assignTable = useReservations((s) => s.assignTable);
  const addReservation = useReservations((s) => s.addReservation);
  const resetDemo = useReservations((s) => s.resetDemo);

  const dayRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reservations
      .filter((row) => row.date === date)
      .filter((row) =>
        q
          ? `${row.name} ${row.phone} ${row.notes}`.toLowerCase().includes(q)
          : true,
      )
      .sort((a, b) => a.time.localeCompare(b.time) || a.name.localeCompare(b.name));
  }, [reservations, date, query]);

  const live = dayRows.filter((row) =>
    ["pendiente", "confirmada", "sentada"].includes(row.status),
  );
  const covers = live.reduce((sum, row) => sum + row.partySize, 0);
  const seated = live
    .filter((row) => row.status === "sentada")
    .reduce((sum, row) => sum + row.partySize, 0);
  const pending = live.filter((row) => row.status === "pendiente").length;
  const occupiedTables = new Set(
    live.filter((row) => row.tableId && row.status === "sentada").map((row) => row.tableId),
  );

  const slots = slotsForDate(date);
  const grouped = slots
    .map((slot) => ({
      slot,
      rows: dayRows.filter((row) => row.time === slot),
    }))
    .filter((group) => group.rows.length > 0);

  const extras = dayRows.filter((row) => !slots.includes(row.time));
  if (extras.length) {
    grouped.push({ slot: "Otros", rows: extras });
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <DemoBanner />
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.22em] text-muted uppercase">
              Operación
            </p>
            <h1 className="mt-2 font-display text-4xl tracking-tight">
              Salón
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              El panel que usa el local. Confirma, sienta y cierra mesas del
              día. Los datos viven en este navegador — puedes resetear la demo.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="ink"
              onClick={() => setWalkInOpen((v) => !v)}
            >
              Walk-in
            </Button>
            <Button type="button" variant="outline" onClick={() => resetDemo()}>
              <RotateCcw className="size-4" />
              Resetear demo
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat
            icon={<CalendarDays className="size-4" />}
            label="Reservas vivas"
            value={String(live.length)}
          />
          <Stat
            icon={<Users className="size-4" />}
            label="Cubiertos"
            value={`${covers}`}
          />
          <Stat
            icon={<UtensilsCrossed className="size-4" />}
            label="En mesa"
            value={`${seated}`}
          />
          <Stat
            icon={<Users className="size-4" />}
            label="Pendientes"
            value={String(pending)}
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <Label htmlFor="salon-date">Día de servicio</Label>
            <Input
              id="salon-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <p className="text-xs capitalize text-muted">
              {isClosedDay(date)
                ? "Lunes: la casa está cerrada."
                : formatLongDate(date)}
            </p>
          </div>
          <div className="grid flex-1 gap-1">
            <Label htmlFor="salon-q">Buscar</Label>
            <Input
              id="salon-q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nombre, teléfono o nota"
            />
          </div>
        </div>

        {walkInOpen ? (
          <WalkInForm
            date={date}
            onClose={() => setWalkInOpen(false)}
            onSave={(draft) => {
              addReservation(draft);
              setWalkInOpen(false);
            }}
          />
        ) : null}

        <section className="mt-10">
          <h2 className="font-display text-2xl">Mesas</h2>
          <p className="mt-1 text-sm text-muted">
            12 mesas · las ocupadas corresponden a reservas en mesa ahora.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {tables.map((table) => {
              const busy = occupiedTables.has(table.id);
              const guest = live.find(
                (row) => row.tableId === table.id && row.status === "sentada",
              );
              return (
                <div
                  key={table.id}
                  className={cn(
                    "rounded-lg px-3 py-3",
                    busy ? "bg-ink text-paper" : "bg-cream text-ink ring-1 ring-line",
                  )}
                >
                  <p className="text-xs tracking-wide uppercase opacity-70">
                    {table.id} · {table.seats}p
                  </p>
                  <p className="mt-1 truncate text-sm font-medium">
                    {guest ? guest.name.split(" ")[0] : "Libre"}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 pb-16">
          <h2 className="font-display text-2xl">Servicio del día</h2>
          {grouped.length === 0 ? (
            <p className="mt-4 rounded-xl bg-cream px-4 py-8 text-sm text-muted">
              No hay reservas para este día. Prueba el walk-in o vuelve a hoy.
            </p>
          ) : (
            <div className="mt-5 grid gap-8">
              {grouped.map((group) => (
                <div key={group.slot}>
                  <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                    {group.slot}
                  </p>
                  <ul className="mt-3 grid gap-3">
                    {group.rows.map((row) => (
                      <ReservationCard
                        key={row.id}
                        row={row}
                        onStatus={(status) => updateStatus(row.id, status)}
                        onTable={(tableId) => assignTable(row.id, tableId)}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-cream px-4 py-4 shadow-[var(--shadow-border)]">
      <div className="flex items-center gap-2 text-muted">
        {icon}
        <span className="text-[11px] tracking-wide uppercase">{label}</span>
      </div>
      <p className="mt-2 font-display text-3xl tabular-nums leading-none">
        {value}
      </p>
    </div>
  );
}

function ReservationCard({
  row,
  onStatus,
  onTable,
}: {
  row: Reservation;
  onStatus: (status: ReservationStatus) => void;
  onTable: (tableId: string | undefined) => void;
}) {
  const next: { label: string; status: ReservationStatus }[] =
    row.status === "pendiente"
      ? [
          { label: "Confirmar", status: "confirmada" },
          { label: "Cancelar", status: "cancelada" },
        ]
      : row.status === "confirmada"
        ? [
            { label: "Sentar", status: "sentada" },
            { label: "No llegó", status: "no-show" },
          ]
        : row.status === "sentada"
          ? [{ label: "Cerrar mesa", status: "completada" }]
          : [];

  return (
    <li className="rounded-xl bg-cream p-4 shadow-[var(--shadow-border)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium">{row.name}</h3>
            <Badge tone={statusTone[row.status]}>{statusLabel[row.status]}</Badge>
            <Badge>
              {row.source === "web"
                ? "Web"
                : row.source === "walk-in"
                  ? "Walk-in"
                  : "Teléfono"}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted">
            {row.partySize} personas · {row.phone}
            {row.occasion !== "Sin ocasión especial" ? ` · ${row.occasion}` : ""}
          </p>
          {row.notes ? (
            <p className="mt-2 text-sm leading-relaxed">{row.notes}</p>
          ) : null}
        </div>
        <select
          value={row.tableId ?? ""}
          onChange={(e) => onTable(e.target.value || undefined)}
          className="h-11 rounded-lg bg-paper px-3 text-sm shadow-[inset_0_0_0_1px_var(--color-line)] outline-none"
          aria-label="Asignar mesa"
        >
          <option value="">Sin mesa</option>
          {tables.map((table) => (
            <option key={table.id} value={table.id}>
              {table.id} · {table.seats}p
            </option>
          ))}
        </select>
      </div>
      {next.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {next.map((action) => (
            <Button
              key={action.status}
              type="button"
              size="sm"
              variant={
                action.status === "cancelada" || action.status === "no-show"
                  ? "outline"
                  : "ink"
              }
              onClick={() => onStatus(action.status)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}
    </li>
  );
}

function WalkInForm({
  date,
  onClose,
  onSave,
}: {
  date: string;
  onClose: () => void;
  onSave: (draft: {
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    partySize: number;
    notes: string;
    occasion: string;
    source: "walk-in";
    status: "sentada";
    tableId?: string;
  }) => void;
}) {
  const slots = slotsForDate(date);
  const [name, setName] = useState("Walk-in");
  const [partySize, setPartySize] = useState(2);
  const [time, setTime] = useState(slots[0] ?? "13:00");
  const [tableId, setTableId] = useState<string>(tables[0].id);

  if (isClosedDay(date)) {
    return (
      <div className="mt-6 rounded-xl bg-paper-deep px-4 py-4 text-sm text-muted">
        No se registran walk-in los lunes.
        <button type="button" className="ml-3 underline" onClick={onClose}>
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <form
      className="mt-6 grid gap-4 rounded-xl bg-ink p-5 text-paper sm:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        onSave({
          name,
          phone: "Walk-in",
          email: "",
          date,
          time,
          partySize,
          notes: "",
          occasion: "Sin ocasión especial",
          source: "walk-in",
          status: "sentada",
          tableId,
        });
      }}
    >
      <div className="sm:col-span-2">
        <p className="font-display text-xl">Anotar walk-in</p>
      </div>
      <div className="grid gap-2">
        <Label className="text-paper/55">Nombre</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label className="text-paper/55">Personas</Label>
        <Input
          type="number"
          min={1}
          max={10}
          value={partySize}
          onChange={(e) => setPartySize(Number(e.target.value) || 1)}
        />
      </div>
      <div className="grid gap-2">
        <Label className="text-paper/55">Horario</Label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="h-11 rounded-lg bg-cream px-3 text-sm text-ink"
        >
          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <Label className="text-paper/55">Mesa</Label>
        <select
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          className="h-11 rounded-lg bg-cream px-3 text-sm text-ink"
        >
          {tables.map((table) => (
            <option key={table.id} value={table.id}>
              {table.id} · {table.seats}p
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-2 sm:col-span-2">
        <Button type="submit" variant="cream">
          Sentar ahora
        </Button>
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
