import { AuthLayout } from "@/components/mockly/AuthLayout";
import { AcademySignupForm } from "@/features/auth/components/AcademySignupForm";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_auth/academy/signup")({
  component: AcademySignup,
});

function AcademySignup() {
  return (
    <AuthLayout
      eyebrow="Academy signup"
      title="Set up your academy."
      description="Register your coaching center and get a unique Institute Code you'll share with students."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/academy/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </>
      }
      side={<SignupSide />}
    >
      <AcademySignupForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/academy/login"
          className="font-medium text-foreground underline"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

function SignupSide() {
  const items = [
    "Roll out mocks in the same sitting",
    "Curated CCC, O Level and ADCA tests",
    "Per-student and per-test result review",
    "One calm workspace, no clutter",
  ];
  return (
    <>
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background/70 px-3 py-1.5 text-[11.5px] font-medium text-[var(--brand-ink)] backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Free for 14
          days
        </div>
        <h2 className="mt-6 max-w-md text-[32px] leading-tight font-semibold tracking-tight text-[var(--brand-ink)]">
          Everything your academy needs on day one.
        </h2>
        <ul className="mt-8 space-y-3">
          {items.map((i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-[14px] border border-hairline bg-background/70 px-4 py-3 text-[13.5px] backdrop-blur"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              {i}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[18px] border border-hairline bg-background/70 p-5 text-[13px] text-[var(--brand-ink)] backdrop-blur">
        <p className="font-medium">Your Institute Code</p>
        <p className="mt-1.5 text-[11.5px] text-muted-foreground">
          Generated automatically once you sign up. Share it with students so
          they can log in.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-[10px] border border-dashed border-hairline bg-background px-3 py-2 font-mono text-[13px] tracking-[0.18em]">
          NIE — •••• ••
        </div>
      </div>
    </>
  );
}
