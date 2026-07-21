import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-7 w-7 items-center justify-center rounded-[9px] bg-primary text-primary-foreground shadow-[0_4px_12px_-4px_var(--brand-orange)]">
        <span className="text-[13px] font-bold tracking-tight">M</span>
        <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-(--brand-cream) ring-2 ring-background" />
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-foreground">
        Mockly
      </span>
    </Link>
  );
}
