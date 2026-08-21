import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/afripixel-logo.png"
      alt="Afripixel Solutions"
      className={cn("h-9 w-auto object-contain", className)}
      loading="eager"
      decoding="async"
    />
  );
}
