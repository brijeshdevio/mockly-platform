import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ClipboardList,
  Download,
  GraduationCap,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/mockly/AppShell";
import { Badge, Btn, Card, KPI, SectionHeader } from "@/components/mockly/ui";

export const Route = createFileRoute("/_academy/academy/")({
  head: () => ({
    meta: [{ title: "Dashboard · Academy · Mockly" }],
  }),
  component: AcademyDashboard,
});

const activity = [
  ["Ananya Verma", "Completed CCC · Mock 4", "84%", "success", "2 min ago"],
  [
    "Rohit Kumar",
    "Started O Level · Networking",
    "In progress",
    "warning",
    "8 min ago",
  ],
  ["Sana Malik", "Completed ADCA · Mock 2", "76%", "success", "22 min ago"],
  ["Vikram Singh", "Completed CCC · Mock 1", "48%", "danger", "1 h ago"],
  [
    "Priya Iyer",
    "Resumed O Level · IT Tools",
    "In progress",
    "warning",
    "1 h ago",
  ],
] as const;

function AcademyDashboard() {
  return (
    <AppShell
      role="academy"
      title="Good morning, Excel Academy"
      subtitle="Here's a quiet look at what's happening across your workspace."
      actions={
        <>
          <Btn variant="outline">
            <Download className="h-3.5 w-3.5" /> Export
          </Btn>
          <Btn variant="primary">
            <Plus className="h-3.5 w-3.5" /> Add student
          </Btn>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI
          label="Total students"
          value="248"
          hint="12 added this week"
          icon={<Users className="h-4 w-4" />}
        />
        <KPI
          label="Total courses"
          value="3"
          hint="CCC · O Level · ADCA"
          icon={<GraduationCap className="h-4 w-4" />}
        />
        <KPI
          label="Total tests"
          value="24"
          hint="Across all courses"
          icon={<ClipboardList className="h-4 w-4" />}
        />
        <KPI
          label="Average score"
          value="72%"
          hint="+3.4 vs last month"
          accent
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6">
          <SectionHeader
            title="Recent activity"
            description="Live feed of student attempts across all courses."
            action={
              <Btn variant="ghost" size="sm">
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </Btn>
            }
          />
          <div className="divide-y divide-hairline">
            {activity.map(([name, action, score, tone, when]) => (
              <div
                key={name}
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[11.5px] font-semibold text-(--brand-ink)">
                  {name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium">{name}</p>
                  <p className="truncate text-[12px] text-muted-foreground">
                    {action}
                  </p>
                </div>
                <Badge tone={tone as "success" | "warning" | "danger"}>
                  {score}
                </Badge>
                <span className="hidden text-[11.5px] text-muted-foreground sm:inline">
                  {when}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6">
            <SectionHeader title="Course distribution" />
            <div className="space-y-3.5">
              {[
                ["CCC", 128, 248],
                ["O Level", 74, 248],
                ["ADCA", 46, 248],
              ].map(([label, val, total]) => {
                const pct = Math.round(
                  ((val as number) / (total as number)) * 100
                );
                return (
                  <div key={label as string}>
                    <div className="mb-1.5 flex items-baseline justify-between text-[12.5px]">
                      <span className="font-medium">{label}</span>
                      <span className="text-muted-foreground">
                        {val} <span className="text-[11px]">· {pct}%</span>
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-accent">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          <Card className="p-6">
            <SectionHeader title="Getting started" />
            <ul className="space-y-2.5 text-[13px]">
              {[
                ["Add your first batch of students", true],
                ["Share Institute Code with students", true],
                ["Assign a course to each student", false],
                ["Encourage first mock attempt", false],
              ].map(([t, done]) => (
                <li key={t as string} className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                      done
                        ? "bg-primary text-primary-foreground"
                        : "border border-hairline bg-background text-muted-foreground"
                    }`}
                  >
                    {done ? "✓" : ""}
                  </span>
                  <span
                    className={done ? "text-muted-foreground line-through" : ""}
                  >
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
