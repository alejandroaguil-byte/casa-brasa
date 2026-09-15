import { Link } from "@tanstack/react-router";

export function DemoBanner() {
  return (
    <div className="bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-[11px] tracking-wide sm:px-6">
        <p className="min-w-0 truncate text-paper/70">
          Demo de portafolio ·{" "}
          <span className="text-paper">BobbaSystem</span>
        </p>
        <Link
          to="/caso"
          className="shrink-0 text-brass underline-offset-4 hover:underline"
        >
          Ver el caso
        </Link>
      </div>
    </div>
  );
}
