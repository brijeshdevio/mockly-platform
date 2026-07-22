import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Check, Download, Eye, Search, X } from "lucide-react";
import { AppShell } from "@/components/mockly/AppShell";
import { Badge, Btn, Card, KPI } from "@/components/mockly/ui";

export const Route = createFileRoute("/_academy/academy/results")({
  head: () => ({ meta: [{ title: "Results · Academy · Mockly" }] }),
  component: Results,
});

const rows = [
  ["Ananya Verma", "CCC", "Mock Paper 4", 84, 100, "Pass", "Today, 10:12"],
  ["Sana Malik", "ADCA", "Mock 2", 76, 100, "Pass", "Today, 09:04"],
  ["Vikram Singh", "CCC", "Mock Paper 1", 48, 100, "Fail", "Yesterday, 18:30"],
  [
    "Priya Iyer",
    "O Level",
    "IT Tools · Set 2",
    71,
    100,
    "Pass",
    "Yesterday, 16:22",
  ],
  ["Kabir Nair", "CCC", "Mock Paper 2", 66, 100, "Pass", "Yesterday, 14:10"],
  ["Meera Gupta", "ADCA", "Mock 1", 82, 100, "Pass", "Mon, 11:44"],
  [
    "Aarav Shah",
    "O Level",
    "Web Design · Set 1",
    59,
    100,
    "Pass",
    "Mon, 10:02",
  ],
  [
    "Rohit Kumar",
    "O Level",
    "Networking · Set 1",
    41,
    100,
    "Fail",
    "Sun, 15:20",
  ],
] as const;

function Results() {
  const [detail, setDetail] = useState<(typeof rows)[number] | null>(null);
  return (
    <AppShell
      role="academy"
      title="Results"
      subtitle="Performance across every student and every attempt."
      actions={
        <Btn variant="outline">
          <Download className="h-3.5 w-3.5" /> Export
        </Btn>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPI label="Average score" value="72%" hint="Across 1,842 attempts" />
        <KPI label="Pass rate" value="88%" hint="Threshold: 50%" />
        <KPI
          label="Attempts this week"
          value="184"
          hint="+22 vs last week"
          accent
        />
      </div>

      <Card className="mt-8 p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-hairline p-4">
          <div className="relative min-w-55 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search student or test…"
              className="h-10 w-full rounded-md border border-hairline bg-background pr-3 pl-9 text-[13px] outline-none focus:ring-2 focus:ring-primary/15"
            />
          </div>
          <FilterChip label="Course: All" />
          <FilterChip label="Status: All" />
          <FilterChip label="Last 30 days" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-205 text-[13px]">
            <thead>
              <tr className="border-b border-hairline text-left text-[11.5px] font-medium tracking-wider text-muted-foreground uppercase">
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Test</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">%</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {rows.map((r) => {
                const [name, course, test, score, out, status, date] = r;
                const pct = Math.round((score / out) * 100);
                return (
                  <tr
                    key={`${name}-${test}`}
                    className="group hover:bg-accent/40"
                  >
                    <td className="px-6 py-3.5 font-medium">{name}</td>
                    <td className="px-6 py-3.5">
                      <Badge tone="neutral">{course}</Badge>
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground">
                      {test}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-[12.5px]">
                      {score}/{out}
                    </td>
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
                      <Badge tone={status === "Pass" ? "success" : "danger"}>
                        {status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground">
                      {date}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => setDetail(r)}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium text-primary opacity-0 group-hover:opacity-100 hover:bg-accent"
                      >
                        <Eye className="h-3.5 w-3.5" /> Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-hairline px-4 py-3 text-[12.5px] text-muted-foreground">
          <span>Showing 8 of 1,842 attempts</span>
          <div className="flex items-center gap-1">
            <Btn variant="outline" size="sm">
              Previous
            </Btn>
            <Btn variant="outline" size="sm">
              Next
            </Btn>
          </div>
        </div>
      </Card>

      {detail && <ResultDetail row={detail} onClose={() => setDetail(null)} />}
    </AppShell>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-hairline bg-background px-3 text-[12.5px] font-medium hover:bg-accent/60">
      {label}
      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
    </button>
  );
}

function ResultDetail({
  row,
  onClose,
}: {
  row: (typeof rows)[number];
  onClose: () => void;
}) {
  const [name, course, test, score, out, status] = row;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-(--brand-ink)/40 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-2xl flex-col border-l border-hairline bg-card">
        <div className="flex items-start justify-between border-b border-hairline p-6">
          <div>
            <p className="text-[11.5px] font-semibold tracking-[0.16em] text-primary uppercase">
              Result review · Read only
            </p>
            <h3 className="mt-2 text-[20px] font-semibold tracking-tight">
              {name} · {test}
            </h3>
            <p className="mt-0.5 text-[12.5px] text-muted-foreground">
              {course} · {score}/{out} · {Math.round((score / out) * 100)}% ·{" "}
              <Badge
                tone={status === "Pass" ? "success" : "danger"}
                className="ml-1"
              >
                {status}
              </Badge>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Correct", `${score}`, "success"],
              ["Incorrect", `${out - score}`, "danger"],
              ["Time taken", "38 min", "neutral"],
            ].map(([k, v, t]) => (
              <div
                key={k as string}
                className="rounded-lg border border-hairline bg-background p-4"
              >
                <p className="text-[11.5px] font-medium text-muted-foreground">
                  {k}
                </p>
                <p className="mt-1.5 text-[20px] font-semibold tracking-tight">
                  {v}
                </p>
                <Badge
                  tone={t as "success" | "danger" | "neutral"}
                  className="mt-2"
                >
                  {t === "success"
                    ? "Marks earned"
                    : t === "danger"
                      ? "Marks lost"
                      : "Duration"}
                </Badge>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[11.5px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Question review
          </p>
          <div className="mt-3 space-y-3">
            {[
              [
                "Q1",
                "Which of the following is an input device?",
                true,
                "Keyboard",
                "Keyboard",
              ],
              ["Q2", "1 KB is equal to?", true, "1024 bytes", "1024 bytes"],
              [
                "Q3",
                "Full form of URL?",
                false,
                "Uniform Resource Locator",
                "Universal Resource Link",
              ],
              [
                "Q4",
                "Shortcut to copy text on Windows?",
                true,
                "Ctrl + C",
                "Ctrl + C",
              ],
              [
                "Q5",
                "Which protocol is used for secure web browsing?",
                false,
                "HTTPS",
                "HTTP",
              ],
            ].map(([n, q, ok, correct, given]) => (
              <div
                key={n as string}
                className="rounded-lg border border-hairline bg-background p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13px]">
                    <span className="font-mono text-[11.5px] text-muted-foreground">
                      {n}.
                    </span>{" "}
                    {q}
                  </p>
                  <Badge tone={ok ? "success" : "danger"}>
                    {ok ? (
                      <>
                        <Check className="h-3 w-3" /> Correct
                      </>
                    ) : (
                      <>
                        <X className="h-3 w-3" /> Incorrect
                      </>
                    )}
                  </Badge>
                </div>
                <div className="mt-2.5 grid gap-1.5 text-[12px]">
                  <div className="flex gap-2">
                    <span className="w-24 text-muted-foreground">
                      Correct answer
                    </span>
                    <span className="font-medium">{correct}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-24 text-muted-foreground">
                      Student answer
                    </span>
                    <span
                      className={
                        ok ? "font-medium" : "font-medium text-destructive"
                      }
                    >
                      {given}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
