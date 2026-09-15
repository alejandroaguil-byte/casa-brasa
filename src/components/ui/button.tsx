import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[color,background-color,border-color,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/50 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-ember text-cream hover:bg-ember-deep",
        ink: "bg-ink text-paper hover:bg-ink-soft",
        cream: "bg-paper text-ink hover:bg-cream",
        ghost:
          "bg-transparent text-paper hover:bg-white/8",
        outline:
          "bg-transparent text-ink ring-1 ring-line hover:bg-paper-deep",
        subtle: "bg-paper-deep text-ink hover:bg-line",
        danger: "bg-danger text-cream hover:bg-danger/90",
      },
      size: {
        sm: "h-9 rounded-md px-3.5 text-sm",
        md: "h-11 rounded-lg px-5 text-sm",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "size-11 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
