import { AuthLayout } from "@/components/mockly/AuthLayout";
import { StudentLoginForm } from "@/features/auth/components/StudentLoginForm";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/_auth/student/login")({
  component: StudentLogin,
});

function StudentLogin() {
  return (
    <AuthLayout
      eyebrow="Student login"
      title="Sign in to start."
      description="Use the Institute Code and Student Code your academy shared with you."
      footer={
        <>
          Trouble logging in? Ask your academy to check your Student Code, or{" "}
          <Link
            to="/academy/login"
            className="font-medium text-primary hover:underline"
          >
            switch to academy login
          </Link>
          .
        </>
      }
      side={<StudentSide />}
    >
      <StudentLoginForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Are you an academy?{" "}
        <Link
          to="/academy/login"
          className="font-medium text-foreground underline"
        >
          Academy sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

function StudentSide() {
  return (
    <>
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background/70 px-3 py-1.5 text-[11.5px] font-medium text-(--brand-ink) backdrop-blur">
          <GraduationCap className="h-3.5 w-3.5" />
          For students
        </div>
        <h2 className="mt-6 max-w-md text-[32px] leading-tight font-semibold tracking-tight text-(--brand-ink)">
          Focus on the test. We'll handle the rest.
        </h2>
      </div>
      <div className="rounded-[18px] border border-hairline bg-background/70 p-5 backdrop-blur">
        <p className="text-[12.5px] font-medium text-(--brand-ink)">
          Before you begin
        </p>
        <ul className="mt-3 space-y-2.5 text-[12.5px] text-muted-foreground">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            Each mock is a single attempt — treat it like the real exam.
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            If your connection drops, log back in and resume where you left off.
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            You can review your answers right after submission.
          </li>
        </ul>
      </div>
    </>
  );
}
