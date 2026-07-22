import type { ReactNode } from "react";

export function Btn({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-[14px] font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";
  const sizes = {
    sm: "h-8 px-3 text-[12.5px]",
    md: "h-10 px-4 text-[13.5px]",
    lg: "h-11 px-5 text-sm",
  };
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_1px_2px_rgba(78,65,59,0.08),0_4px_16px_-4px_rgba(255,109,36,0.4)]",
    secondary: "bg-[var(--brand-ink)] text-white hover:opacity-90",
    outline:
      "border border-hairline bg-card text-foreground hover:bg-accent/60",
    ghost: "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
    danger: "bg-destructive text-destructive-foreground hover:opacity-90",
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({
  className = "",
  children,
  ...props
}: {
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`card-surface ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: "neutral" | "success" | "warning" | "danger" | "accent" | "info";
  children: ReactNode;
  className?: string;
}) {
  const tones = {
    neutral: "bg-accent text-[var(--brand-ink)]",
    success: "bg-[oklch(0.94_0.05_150)] text-[oklch(0.4_0.12_150)]",
    warning: "bg-[oklch(0.95_0.07_85)] text-[oklch(0.45_0.14_65)]",
    danger: "bg-[oklch(0.94_0.06_25)] text-[oklch(0.45_0.18_25)]",
    accent: "bg-primary/10 text-primary",
    info: "bg-[oklch(0.94_0.03_240)] text-[oklch(0.4_0.1_240)]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Input({
  label,
  hint,
  className = "",
  ...props
}: {
  label?: string;
  hint?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-[12.5px] font-medium text-foreground">
          {label}
        </span>
      )}
      <input
        className={`h-11 w-full rounded-lg border border-hairline bg-card px-3.5 text-[13.5px] outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/15 ${className}`}
        {...props}
      />
      {hint && (
        <span className="mt-1.5 block text-[11.5px] text-muted-foreground">
          {hint}
        </span>
      )}
    </label>
  );
}

export function KPI({
  label,
  value,
  hint,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  accent?: boolean;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] font-medium text-muted-foreground">
            {label}
          </p>
          <p
            className={`mt-3 font-semibold tracking-tight ${accent ? "text-primary" : "text-foreground"} text-[28px] leading-none`}
          >
            {value}
          </p>
          {hint && (
            <p className="mt-2 text-[11.5px] text-muted-foreground">{hint}</p>
          )}
        </div>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-accent text-(--brand-ink)">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-0.5 text-[12.5px] text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-hairline bg-card/50 px-6 py-14 text-center">
      {icon && (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[13px] bg-accent text-(--brand-ink)">
          {icon}
        </div>
      )}
      <p className="text-[14.5px] font-semibold">{title}</p>
      {description && (
        <p className="mt-1.5 max-w-sm text-[12.5px] text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Avatar({ name }: { name: string }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[11.5px] font-semibold text-(--brand-ink)">
      {name
        .split(" ")
        .map((w) => w[0])
        .join("")}
    </div>
  );
}
