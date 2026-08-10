import logo from "@/assets/afripixel-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Afripixel Solutions"
      className={cn("h-9 w-auto object-contain", className)}
      loading="eager"
      decoding="async"
    />
  );
}
