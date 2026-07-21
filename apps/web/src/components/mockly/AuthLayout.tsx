import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  footer,
  side,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
        {/* Form side */}
        <div className="flex flex-col px-6 py-8 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            <Logo />
            <Link
              to="/"
              className="text-[12.5px] font-medium text-muted-foreground hover:text-foreground"
            >
              ← Back to home
            </Link>
          </div>

          <div className="flex flex-1 items-center py-10">
            <div className="mx-auto w-full max-w-[420px]">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                {eyebrow}
              </p>
              <h1 className="mt-3 text-[30px] leading-tight font-semibold tracking-tight sm:text-[34px]">
                {title}
              </h1>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                {description}
              </p>

              <div className="mt-8">{children}</div>

              {footer && (
                <div className="mt-6 text-[13px] text-muted-foreground">
                  {footer}
                </div>
              )}
            </div>
          </div>

          <p className="text-[11.5px] text-muted-foreground">
            © {new Date().getFullYear()} Mockly · NIELIT mock exams, done right.
          </p>
        </div>

        {/* Illustration side */}
        <div className="relative hidden overflow-hidden bg-[var(--brand-cream)] lg:block">
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative flex h-full flex-col justify-between p-16">
            {side ?? <DefaultSide />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DefaultSide() {
  return (
    <>
      <div className="max-w-md">
        <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background/70 px-3 py-1.5 text-[11.5px] font-medium text-[var(--brand-ink)] backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Trusted by coaching centers across India
        </div>
        <h2 className="mt-6 text-[32px] leading-tight font-semibold tracking-tight text-[var(--brand-ink)]">
          A calmer way to run{" "}
          <em className="text-primary not-italic">NIELIT</em> mock exams.
        </h2>
      </div>
      <div className="space-y-3">
        {[
          ["1,842", "Mocks taken this week"],
          ["88%", "Average academy pass rate"],
          ["10 min", "From signup to first test"],
        ].map(([v, l]) => (
          <div
            key={l as string}
            className="flex items-baseline justify-between rounded-[16px] border border-hairline bg-background/70 px-5 py-4 backdrop-blur"
          >
            <span className="text-[13px] text-muted-foreground">{l}</span>
            <span className="text-[22px] font-semibold tracking-tight text-[var(--brand-ink)]">
              {v}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
