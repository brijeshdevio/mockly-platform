import { createFileRoute, Link } from "@tanstack/react-router";
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
import {
  Avatar,
  Badge,
  Btn,
  Card,
  KPI,
  SectionHeader,
} from "@/components/mockly/ui";
import { dashboardStats } from "@/lib/mock/academy/dashboardStats";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_academy/academy/")({
  head: () => ({
    meta: [{ title: "Dashboard · Academy · Mockly" }],
  }),
  loader: () => dashboardStats,
  component: AcademyDashboard,
});

function AcademyDashboard() {
  const { overview, recentActivity, courseDistribution } =
    Route.useLoaderData();

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
          label={overview.totalStudents.title}
          value={overview.totalStudents.value}
          hint={overview.totalStudents.hint}
          icon={<Users className="h-4 w-4" />}
        />
        <KPI
          label={overview.totalCourses.title}
          value={overview.totalCourses.value}
          hint={overview.totalCourses.hint}
          icon={<GraduationCap className="h-4 w-4" />}
        />
        <KPI
          label={overview.totalTests.title}
          value={overview.totalTests.value}
          hint={overview.totalTests.hint}
          icon={<ClipboardList className="h-4 w-4" />}
        />
        <KPI
          label={overview.averageScore.title}
          value={overview.averageScore.value}
          hint={overview.averageScore.hint}
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
              <Link to="/academy/tests">
                <Button variant={"ghost"}>
                  View all <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            }
          />
          <div className="divide-y divide-hairline">
            {recentActivity.map((activity) => (
              <div
                key={activity.name}
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <Avatar name={activity.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium">
                    {activity.name}
                  </p>
                  <p className="truncate text-[12px] text-muted-foreground">
                    {activity.action}
                  </p>
                </div>
                <Badge
                  tone={activity.statusType as "success" | "warning" | "danger"}
                >
                  {activity.statusLabel}
                </Badge>
                <span className="hidden text-[11.5px] text-muted-foreground sm:inline">
                  {activity.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6">
            <SectionHeader title="Course distribution" />
            <div className="space-y-3.5">
              {courseDistribution.map((course) => {
                const pct = Math.round(
                  (course.studentCount / Number(overview.totalStudents.value)) *
                    100,
                );
                return (
                  <div key={course.courseName}>
                    <div className="mb-1.5 flex items-baseline justify-between text-[12.5px]">
                      <span className="font-medium">{course.courseName}</span>
                      <span className="text-muted-foreground">
                        {course.studentCount}{" "}
                        <span className="text-[11px]">
                          · {course.percentage}%
                        </span>
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
        </div>
      </div>
    </AppShell>
  );
}
