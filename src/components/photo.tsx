import { useState } from "react";
import { cn } from "@/lib/utils";

export function Photo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={cn("bg-ink", className)} aria-hidden />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("bg-ink", className)}
      onError={() => setFailed(true)}
    />
  );
}
