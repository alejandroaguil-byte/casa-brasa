export const restaurant = {
  name: "Casa Brasa",
  tagline: "Parrilla contemporánea",
  neighborhood: "Ñuñoa",
  city: "Santiago",
  address: "Av. Irarrázaval 3482, Ñuñoa",
  phoneDisplay: "+56 9 8765 2104",
  phoneTel: "+56987652104",
  email: "reservas@casabrasa.cl",
  instagram: "@casabrasa.nunoa",
  mapUrl: "https://maps.google.com/?q=Av.+Irarr%C3%A1zaval+3482+Nunoa+Santiago",
  seats: 44,
  tables: 12,
};

export const hours = [
  { days: "Lunes", value: "Cerrado", closed: true },
  { days: "Martes a jueves", value: "12:30–16:00 · 19:30–23:00", closed: false },
  { days: "Viernes y sábado", value: "12:30–16:00 · 19:30–23:30", closed: false },
  { days: "Domingo", value: "13:00–17:00", closed: false },
] as const;

export const lunchSlots = ["12:30", "13:00", "13:30", "14:00", "14:30", "15:00"];
export const dinnerSlots = ["19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
export const sundaySlots = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];

export const occasions = [
  "Sin ocasión especial",
  "Cumpleaños",
  "Aniversario",
  "Reunión de trabajo",
  "Primera visita",
] as const;

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  note?: string;
  featured?: boolean;
};

export type MenuSection = {
  id: string;
  title: string;
  intro?: string;
  items: MenuItem[];
};

export const menu: MenuSection[] = [
  {
    id: "para-partir",
    title: "Para partir",
    intro: "Platos pensados para compartir en la mesa.",
    items: [
      {
        name: "Provoleta a las brasas",
        description: "Orégano, ají cacho de cabra y pan amasado.",
        price: 8900,
        featured: true,
      },
      {
        name: "Empanadas de pino",
        description: "Carne, cebolla, huevo y aceituna. Horneadas al minuto.",
        price: 4200,
        note: "unidad",
      },
      {
        name: "Pulpo a la parrilla",
        description: "Paprika ahumada, aceite de oliva y limón de Pica.",
        price: 14900,
        featured: true,
      },
      {
        name: "Ensalada chilena",
        description: "Tomate, cebolla nueva, cilantro y aceite de oliva.",
        price: 6900,
      },
    ],
  },
  {
    id: "parrilla",
    title: "Parrilla",
    intro: "Cortes madurados, fuego de carbón y punto a elección.",
    items: [
      {
        name: "Bife de chorizo",
        description: "350 g. Chimichurri de la casa y papas rústicas.",
        price: 18900,
        featured: true,
      },
      {
        name: "Entraña",
        description: "280 g. Sal de mar y pebre de tomate asado.",
        price: 17400,
      },
      {
        name: "Asado de tira",
        description: "Para dos. Hueso largo, 40 minutos de brasa.",
        price: 32900,
        note: "para 2",
      },
      {
        name: "Pollo al spiedo",
        description: "Medio pollo, jugo de parrilla y ensalada de estación.",
        price: 13900,
      },
      {
        name: "Salmón de Calbuco",
        description: "Piel crocante, mantequilla de hierbas y limón.",
        price: 16800,
      },
    ],
  },
  {
    id: "vinos",
    title: "Copa y botella",
    items: [
      {
        name: "Carmenère, Maipo",
        description: "Copa de la casa. Ciruela, pimentón y tanino suave.",
        price: 5900,
        note: "copa",
      },
      {
        name: "Cabernet Sauvignon, Colchagua",
        description: "Botella. Estructura clásica, final de grafito.",
        price: 24900,
      },
      {
        name: "Sauvignon Blanc, Casablanca",
        description: "Copa. Ruda, lima y un filo mineral.",
        price: 5500,
        note: "copa",
      },
      {
        name: "Pisco sour de la casa",
        description: "Pisco 40°, clara, limón de Pica y amargo.",
        price: 6900,
      },
    ],
  },
  {
    id: "postres",
    title: "Cierre",
    items: [
      {
        name: "Leche asada",
        description: "Azúcar quemada y vainilla de Papudo.",
        price: 5900,
        featured: true,
      },
      {
        name: "Panqueque con manjar",
        description: "Manjar de campo y naranja confitada.",
        price: 6200,
      },
    ],
  },
];

export const tables = [
  { id: "T1", seats: 2 },
  { id: "T2", seats: 2 },
  { id: "T3", seats: 2 },
  { id: "T4", seats: 2 },
  { id: "T5", seats: 4 },
  { id: "T6", seats: 4 },
  { id: "T7", seats: 4 },
  { id: "T8", seats: 4 },
  { id: "T9", seats: 4 },
  { id: "T10", seats: 4 },
  { id: "T11", seats: 6 },
  { id: "T12", seats: 6 },
] as const;

export type ReservationStatus =
  | "pendiente"
  | "confirmada"
  | "sentada"
  | "completada"
  | "cancelada"
  | "no-show";

export type ReservationSource = "web" | "walk-in" | "telefono";

export type Reservation = {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  partySize: number;
  notes: string;
  occasion: string;
  status: ReservationStatus;
  tableId?: string;
  createdAt: string;
  source: ReservationSource;
};

export const statusLabel: Record<ReservationStatus, string> = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  sentada: "En mesa",
  completada: "Cerrada",
  cancelada: "Cancelada",
  "no-show": "No llegó",
};

export const MAX_PARTY = 10;
export const SLOT_COVER_CAP = 16;

export function formatClp(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function santiagoDateISO(offsetDays = 0) {
  const now = new Date();
  const asSantiago = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Santiago" }),
  );
  asSantiago.setDate(asSantiago.getDate() + offsetDays);
  const y = asSantiago.getFullYear();
  const m = String(asSantiago.getMonth() + 1).padStart(2, "0");
  const d = String(asSantiago.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function weekdayIndex(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

export function isClosedDay(iso: string) {
  return weekdayIndex(iso) === 1;
}

export function slotsForDate(iso: string) {
  if (isClosedDay(iso)) return [];
  if (weekdayIndex(iso) === 0) return sundaySlots;
  return [...lunchSlots, ...dinnerSlots];
}

export function serviceForTime(time: string): "almuerzo" | "cena" {
  return time < "17:00" ? "almuerzo" : "cena";
}

export function formatLongDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function newId() {
  return crypto.randomUUID();
}

export function seedReservations(): Reservation[] {
  const today = santiagoDateISO(0);
  const tomorrow = santiagoDateISO(1);
  const inTwo = santiagoDateISO(2);
  const created = "2026-09-15T12:00:00.000-03:00";

  const rows: Omit<Reservation, "createdAt">[] = [
    {
      id: "seed-camila",
      name: "Camila Rojas",
      phone: "+56 9 8123 4410",
      email: "camila.rojas@mail.cl",
      date: today,
      time: "13:00",
      partySize: 2,
      notes: "Mesa cerca de la ventana si se puede.",
      occasion: "Primera visita",
      status: "confirmada",
      tableId: "T2",
      source: "web",
    },
    {
      id: "seed-matias",
      name: "Matías Contreras",
      phone: "+56 9 7762 1903",
      email: "mcontreras@correo.cl",
      date: today,
      time: "13:30",
      partySize: 4,
      notes: "",
      occasion: "Reunión de trabajo",
      status: "sentada",
      tableId: "T6",
      source: "telefono",
    },
    {
      id: "seed-fernanda",
      name: "Fernanda Lagos",
      phone: "+56 9 6540 2281",
      email: "fer.lagos@gmail.com",
      date: today,
      time: "20:00",
      partySize: 2,
      notes: "Aniversario. Traemos una botella.",
      occasion: "Aniversario",
      status: "confirmada",
      tableId: "T3",
      source: "web",
    },
    {
      id: "seed-diego",
      name: "Diego Muñoz",
      phone: "+56 9 9901 3345",
      email: "dmunoz@empresa.cl",
      date: today,
      time: "20:30",
      partySize: 6,
      notes: "Un invitado vegetariano.",
      occasion: "Sin ocasión especial",
      status: "pendiente",
      source: "web",
    },
    {
      id: "seed-javiera",
      name: "Javiera Soto",
      phone: "+56 9 8455 1022",
      email: "javiera.soto@outlook.com",
      date: today,
      time: "21:00",
      partySize: 3,
      notes: "",
      occasion: "Cumpleaños",
      status: "confirmada",
      tableId: "T8",
      source: "web",
    },
    {
      id: "seed-andres",
      name: "Andrés Paredes",
      phone: "+56 9 7210 8894",
      email: "andres.p@correo.cl",
      date: tomorrow,
      time: "13:00",
      partySize: 2,
      notes: "",
      occasion: "Sin ocasión especial",
      status: "confirmada",
      source: "web",
    },
    {
      id: "seed-valentina",
      name: "Valentina Núñez",
      phone: "+56 9 6112 4077",
      email: "vnunez@mail.cl",
      date: tomorrow,
      time: "20:30",
      partySize: 4,
      notes: "Silla para niña de 4 años.",
      occasion: "Sin ocasión especial",
      status: "pendiente",
      source: "web",
    },
    {
      id: "seed-tomas",
      name: "Tomás Herrera",
      phone: "+56 9 8330 5519",
      email: "tomas.h@gmail.com",
      date: inTwo,
      time: "21:00",
      partySize: 2,
      notes: "",
      occasion: "Primera visita",
      status: "confirmada",
      source: "telefono",
    },
  ];

  return rows.map((row) => ({
    ...row,
    createdAt: created,
  }));
}
