import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { restaurant } from "@/lib/data";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Casa" },
  { to: "/menu", label: "Carta" },
  { to: "/reservar", label: "Reservar" },
  { to: "/salon", label: "Salón" },
] as const;

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "relative z-20",
        dark ? "text-paper" : "text-ink",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight">
            {restaurant.name}
          </span>
          <span
            className={cn(
              "hidden text-[11px] tracking-[0.18em] uppercase sm:inline",
              dark ? "text-paper/50" : "text-muted",
            )}
          >
            Ñuñoa
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "tracking-wide transition-opacity duration-150",
                pathname === link.to
                  ? "opacity-100"
                  : dark
                    ? "opacity-55 hover:opacity-100"
                    : "text-muted hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant={dark ? "cream" : "ink"}>
            <Link to="/reservar">Reservar mesa</Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          className={cn(
            "border-t px-4 py-3 md:hidden",
            dark ? "border-line-dark bg-ink-soft" : "border-line bg-cream",
          )}
        >
          <nav className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
