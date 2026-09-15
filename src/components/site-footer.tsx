import { Link } from "@tanstack/react-router";
import { restaurant } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{restaurant.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            Parrilla contemporánea en Ñuñoa. Fuego de carbón, cortes madurados
            y una carta corta que cambia con la estación.
          </p>
        </div>
        <div className="text-sm">
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
            Visítanos
          </p>
          <p className="mt-3 text-ink">{restaurant.address}</p>
          <p className="mt-1 text-muted">
            {restaurant.neighborhood}, {restaurant.city}
          </p>
          <a
            href={`tel:${restaurant.phoneTel}`}
            className="mt-3 block text-ink underline-offset-4 hover:underline"
          >
            {restaurant.phoneDisplay}
          </a>
        </div>
        <div className="text-sm">
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
            El proyecto
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <Link to="/caso" className="text-ink underline-offset-4 hover:underline">
              Caso BobbaSystem
            </Link>
            <Link to="/salon" className="text-ink underline-offset-4 hover:underline">
              Panel del salón
            </Link>
            <a
              href="https://bobbasystem.cl"
              target="_blank"
              rel="noreferrer"
              className="text-ink underline-offset-4 hover:underline"
            >
              bobbasystem.cl
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted sm:px-6">
          Casa Brasa es un restaurante de demostración. Un proyecto demo de{" "}
          <a
            href="https://bobbasystem.cl"
            className="text-ink underline-offset-4 hover:underline"
          >
            BobbaSystem
          </a>{" "}
          para pequeños negocios de Santiago. Fotografías de{" "}
          <a
            href="https://www.pexels.com"
            target="_blank"
            rel="noreferrer"
            className="text-ink underline-offset-4 hover:underline"
          >
            Pexels
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
