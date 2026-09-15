import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-lg bg-cream px-3.5 text-sm text-ink shadow-[inset_0_0_0_1px_var(--color-line)] placeholder:text-muted outline-none transition-[box-shadow] duration-150 focus-visible:shadow-[inset_0_0_0_2px_var(--color-ember)] disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
