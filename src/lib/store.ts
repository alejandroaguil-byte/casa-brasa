import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type Reservation,
  type ReservationSource,
  type ReservationStatus,
  SLOT_COVER_CAP,
  newId,
  seedReservations,
} from "@/lib/data";

type Draft = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  partySize: number;
  notes: string;
  occasion: string;
  source: ReservationSource;
  tableId?: string;
  status?: ReservationStatus;
};

type Store = {
  reservations: Reservation[];
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  addReservation: (draft: Draft) => Reservation;
  updateStatus: (id: string, status: ReservationStatus) => void;
  assignTable: (id: string, tableId: string | undefined) => void;
  removeReservation: (id: string) => void;
  resetDemo: () => void;
  coversAt: (date: string, time: string, exceptId?: string) => number;
  remainingAt: (date: string, time: string, exceptId?: string) => number;
};

const active: ReservationStatus[] = ["pendiente", "confirmada", "sentada"];

export const useReservations = create<Store>()(
  persist(
    (set, get) => ({
      reservations: seedReservations(),
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      addReservation: (draft) => {
        const row: Reservation = {
          id: newId(),
          name: draft.name.trim(),
          phone: draft.phone.trim(),
          email: draft.email.trim(),
          date: draft.date,
          time: draft.time,
          partySize: draft.partySize,
          notes: draft.notes.trim(),
          occasion: draft.occasion,
          status: draft.status ?? "pendiente",
          tableId: draft.tableId,
          createdAt: new Date().toISOString(),
          source: draft.source,
        };
        set((state) => ({ reservations: [row, ...state.reservations] }));
        return row;
      },
      updateStatus: (id, status) =>
        set((state) => ({
          reservations: state.reservations.map((row) =>
            row.id === id ? { ...row, status } : row,
          ),
        })),
      assignTable: (id, tableId) =>
        set((state) => ({
          reservations: state.reservations.map((row) =>
            row.id === id ? { ...row, tableId } : row,
          ),
        })),
      removeReservation: (id) =>
        set((state) => ({
          reservations: state.reservations.filter((row) => row.id !== id),
        })),
      resetDemo: () => set({ reservations: seedReservations() }),
      coversAt: (date, time, exceptId) =>
        get()
          .reservations.filter(
            (row) =>
              row.date === date &&
              row.time === time &&
              active.includes(row.status) &&
              row.id !== exceptId,
          )
          .reduce((sum, row) => sum + row.partySize, 0),
      remainingAt: (date, time, exceptId) =>
        Math.max(0, SLOT_COVER_CAP - get().coversAt(date, time, exceptId)),
    }),
    {
      name: "casa-brasa-reservas",
      skipHydration: true,
      partialize: (state) => ({ reservations: state.reservations }),
    },
  ),
);
