import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ClipboardList,
  Lock,
  PlayCircle,
  RotateCw,
  Timer,
} from "lucide-react";
import { AppShell } from "@/components/mockly/AppShell";
import { Badge, Btn, Card, SectionHeader } from "@/components/mockly/ui";

export const Route = createFileRoute("/_student/student/tests")({
  head: () => ({ meta: [{ title: "Tests · Student · Mockly" }] }),
  component: StudentTests,
});

const tests = [
  { name: "Mock Paper 1", q: 100, min: 45, status: "completed", score: 72 },
  { name: "Mock Paper 2", q: 100, min: 45, status: "completed", score: 68 },
  { name: "Mock Paper 3", q: 100, min: 45, status: "in-progress" },
  { name: "Mock Paper 4", q: 100, min: 45, status: "completed", score: 84 },
  { name: "Mock Paper 5", q: 100, min: 45, status: "available" },
  { name: "Mock Paper 6", q: 100, min: 45, status: "available" },
  { name: "Mock Paper 7", q: 100, min: 45, status: "available" },
  { name: "Mock Paper 8", q: 100, min: 45, status: "available" },
] as const;

function StudentTests() {
  return (
    <AppShell
      role="student"
      title="Mock tests"
      subtitle="Tests available for CCC — your enrolled course."
    >
      <SectionHeader
        title="CCC · 10 tests"
        description="Complete one at a time. Each attempt is final."
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {tests.map((t) => (
          <Card
            key={t.name}
            className={`flex flex-col p-5 ${
              t.status === "completed"
                ? "bg-card/70"
                : "hover:-translate-y-0.5 hover:shadow-elevated"
            } transition`}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-(--brand-ink)">
                <ClipboardList className="h-5 w-5" />
              </div>
              {t.status === "completed" && (
                <Badge tone="success">
                  <CheckCircle2 className="h-3 w-3" /> Completed
                </Badge>
              )}
              {t.status === "in-progress" && (
                <Badge tone="warning">In progress</Badge>
              )}
              {t.status === "available" && (
                <Badge tone="neutral">Available</Badge>
              )}
            </div>

            <p className="mt-4 text-[15px] font-semibold tracking-tight">
              {t.name}
            </p>
            <div className="mt-1 flex items-center gap-3 text-[11.5px] text-muted-foreground">
              <span>{t.q} questions</span>
              <span className="flex items-center gap-1">
                <Timer className="h-3 w-3" /> {t.min} min
              </span>
            </div>

            <div className="mt-5 border-t border-hairline pt-4">
              {t.status === "completed" && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11.5px] text-muted-foreground">
                      Your score
                    </p>
                    <p className="text-[18px] font-semibold tracking-tight">
                      {t.score}%
                    </p>
                  </div>
                  <Btn variant="outline" size="sm" disabled>
                    <Lock className="h-3.5 w-3.5" /> Locked
                  </Btn>
                </div>
              )}
              {t.status === "in-progress" && (
                <Link
                  to="/student/tests"
                  params={{ testId: "mock-3" }}
                  className="block"
                >
                  <Btn variant="primary" size="sm" className="w-full">
                    <RotateCw className="h-3.5 w-3.5" /> Resume test
                  </Btn>
                </Link>
              )}
              {t.status === "available" && (
                <Link
                  to="/student/tests"
                  params={{ testId: "mock-available" }}
                  className="block"
                >
                  <Btn variant="primary" size="sm" className="w-full">
                    <PlayCircle className="h-3.5 w-3.5" /> Start test
                  </Btn>
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
