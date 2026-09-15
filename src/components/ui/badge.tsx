import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
  {
    variants: {
      tone: {
        muted: "bg-paper-deep text-muted",
        ember: "bg-ember/12 text-ember-deep",
        ok: "bg-ok/12 text-ok",
        warn: "bg-warn/14 text-warn",
        danger: "bg-danger/12 text-danger",
        ink: "bg-ink text-paper",
        brass: "bg-brass/16 text-ink-soft",
      },
    },
    defaultVariants: { tone: "muted" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props} />
  );
}
