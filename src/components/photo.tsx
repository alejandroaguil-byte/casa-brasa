import { useEffect, useState } from "react";
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
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setOk(true);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!ok) {
    return <div className={cn("bg-ink", className)} aria-hidden />;
  }

  return <img src={src} alt={alt} className={cn("bg-ink", className)} />;
}
