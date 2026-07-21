import { AuthLayout } from "@/components/mockly/AuthLayout";
import { AcademyLoginForm } from "@/features/auth/components/AcademyLoginForm";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/academy/login")({
  component: AcademyLogin,
});

function AcademyLogin() {
  return (
    <AuthLayout
      eyebrow="Academy login"
      title="Welcome back."
      description="Sign in to manage students, tests and results for your academy."
      footer={
        <>
          New to Mockly?{" "}
          <Link
            to="/academy/signup"
            className="font-medium text-primary hover:underline"
          >
            Create an academy account
          </Link>
          <div className="mt-2">
            Are you a student?{" "}
            <Link
              to="/student/login"
              className="font-medium text-primary hover:underline"
            >
              Student login
            </Link>
          </div>
        </>
      }
    >
      <AcademyLoginForm />
    </AuthLayout>
  );
}
