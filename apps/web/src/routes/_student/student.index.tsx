import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  PlayCircle,
  Timer,
} from "lucide-react";
import { AppShell } from "@/components/mockly/AppShell";
import { Badge, Btn, Card, KPI, SectionHeader } from "@/components/mockly/ui";

export const Route = createFileRoute("/_student/student/")({
  head: () => ({ meta: [{ title: "Dashboard · Student · Mockly" }] }),
  component: StudentDashboard,
});

function StudentDashboard() {
  return (
    <AppShell
      role="student"
      title="Hi Ananya, ready for a mock?"
      subtitle="You're enrolled in CCC. Your next mock is waiting."
      actions={
        <Link to="/student/tests">
          <Btn variant="primary">
            Start next mock <ArrowRight className="h-3.5 w-3.5" />
          </Btn>
        </Link>
      }
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPI
          label="Available tests"
          value="10"
          hint="CCC course"
          icon={<ClipboardList className="h-4 w-4" />}
        />
        <KPI
          label="Attempted"
          value="4"
          hint="of 10"
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <KPI label="Remaining" value="6" hint="Keep going" />
        <KPI label="Average score" value="76%" hint="Above passing" accent />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card className="p-6">
          <SectionHeader
            title="Continue where you left off"
            description="A mock is currently in progress. Resume before it expires."
          />
          <div className="flex flex-wrap items-center gap-4 rounded-[16px] border border-primary/20 bg-primary/4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-[13px] bg-primary/10 text-primary">
              <PlayCircle className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] font-semibold">CCC · Mock Paper 3</p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                42 of 100 questions answered · 27 min remaining
              </p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background">
                <div className="h-full w-[42%] rounded-full bg-primary" />
              </div>
            </div>
            <Btn variant="primary">Resume test</Btn>
          </div>

          <SectionHeader
            title="Recent results"
            description="Your last few attempts."
            action={
              <Link to="/student/results">
                <Btn variant="ghost" size="sm">
                  View all
                </Btn>
              </Link>
            }
          />
          <div className="divide-y divide-hairline">
            {[
              ["CCC · Mock Paper 4", "84%", "Pass", "Today"],
              ["CCC · Mock Paper 2", "68%", "Pass", "Mon"],
              ["CCC · Mock Paper 1", "72%", "Pass", "Last week"],
            ].map(([t, p, s, d]) => (
              <div
                key={t}
                className="flex items-center justify-between py-3 first:pt-0"
              >
                <div>
                  <p className="text-[13.5px] font-medium">{t}</p>
                  <p className="text-[11.5px] text-muted-foreground">{d}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium">{p}</span>
                  <Badge tone="success">{s}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6">
            <SectionHeader title="Your progress" />
            <div className="flex items-baseline justify-between">
              <span className="text-[12.5px] text-muted-foreground">
                Course completion
              </span>
              <span className="text-[13px] font-medium">40%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-accent">
              <div className="h-full w-[40%] rounded-full bg-primary" />
            </div>
            <p className="mt-3 text-[11.5px] text-muted-foreground">
              4 of 10 mocks attempted. Keep the momentum going.
            </p>
          </Card>
          <Card className="p-6">
            <SectionHeader title="Test tips" />
            <ul className="space-y-2.5 text-[12.5px] text-muted-foreground">
              <li className="flex gap-2">
                <Timer className="mt-0.5 h-3.5 w-3.5 text-primary" />
                Each mock is timed. Pace yourself.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-primary" />
                Answers autosave — connection drops are fine.
              </li>
              <li className="flex gap-2">
                <ClipboardList className="mt-0.5 h-3.5 w-3.5 text-primary" />
                One attempt per test. Give it your best.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
