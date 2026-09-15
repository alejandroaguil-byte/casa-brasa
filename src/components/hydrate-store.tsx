import { useEffect } from "react";
import { useReservations } from "@/lib/store";

export function HydrateStore() {
  useEffect(() => {
    const result = useReservations.persist.rehydrate();
    void Promise.resolve(result).then(() => {
      useReservations.getState().setHydrated(true);
    });
  }, []);
  return null;
}
