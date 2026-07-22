import { createFileRoute } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { AppShell } from "@/components/mockly/AppShell";
import { Badge, Btn, Card, EmptyState, KPI } from "@/components/mockly/ui";

export const Route = createFileRoute("/_student/student/results")({
  head: () => ({ meta: [{ title: "Results · Student · Mockly" }] }),
  component: StudentResults,
});

const mine = [
  ["CCC · Mock Paper 4", 84, "Pass", "Today, 10:12"],
  ["CCC · Mock Paper 2", 68, "Pass", "Mon, 14:22"],
  ["CCC · Mock Paper 1", 72, "Pass", "Last week"],
] as const;

function StudentResults() {
  const empty = false;
  return (
    <AppShell
      role="student"
      title="My results"
      subtitle="A read-only history of every mock you've attempted."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPI label="Tests attempted" value="4" hint="of 10" />
        <KPI label="Average score" value="76%" hint="Above passing" accent />
        <KPI label="Best score" value="84%" hint="CCC · Mock Paper 4" />
      </div>

      {empty ? (
        <Card className="mt-8 p-8">
          <EmptyState
            title="No results yet"
            description="Once you complete a mock, your score will appear here."
            action={<Btn variant="primary">Take your first mock</Btn>}
          />
        </Card>
      ) : (
        <Card className="mt-8 p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-140 text-[13px]">
              <thead>
                <tr className="border-b border-hairline text-left text-[11.5px] font-medium tracking-wider text-muted-foreground uppercase">
                  <th className="px-6 py-3">Test</th>
                  <th className="px-6 py-3">Score</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Attempt date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {mine.map(([test, pct, status, date]) => (
                  <tr key={test} className="hover:bg-accent/40">
                    <td className="px-6 py-3.5 font-medium">{test}</td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{pct}%</span>
                        <span className="h-1 w-16 overflow-hidden rounded-full bg-accent">
                          <span
                            className="block h-full rounded-full bg-primary"
                            style={{ width: `${pct}%` }}
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge tone="success">{status}</Badge>
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground">
                      {date}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button className="inline-flex items-center gap-1 text-[12px] font-medium text-primary hover:underline">
                        <Eye className="h-3.5 w-3.5" /> Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </AppShell>
  );
}
