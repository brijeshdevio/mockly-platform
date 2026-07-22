import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, Search, Timer } from "lucide-react";
import { AppShell } from "@/components/mockly/AppShell";
import { Badge, Card } from "@/components/mockly/ui";
import { courseTests } from "@/lib/mock/academy/tests";

export const Route = createFileRoute("/_academy/academy/tests")({
  head: () => ({ meta: [{ title: "Tests · Academy · Mockly" }] }),
  loader: () => ({ items: courseTests }),
  component: Tests,
});

function Tests() {
  const { items } = Route.useLoaderData();

  return (
    <AppShell
      role="academy"
      title="Tests"
      subtitle="Every mock available to your students, grouped by course."
      actions={
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search tests…"
            className="h-10 w-65 rounded-md border border-hairline bg-card pr-3 pl-9 text-[13px] outline-none focus:ring-2 focus:ring-primary/15"
          />
        </div>
      }
    >
      <div className="space-y-10">
        {items.map((g) => (
          <section key={g.course}>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-[16px] font-semibold tracking-tight">
                {g.course}
              </h2>
              <Badge>{g.tests.length} tests</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.tests.map(([name, q, mins, pass]) => (
                <Card
                  key={name as string}
                  className="flex items-start gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-elevated"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-(--brand-ink)">
                    <ClipboardList className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-semibold">
                      {name}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                      {g.course}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <span className="font-medium text-foreground">{q}</span>{" "}
                        questions
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        <span className="font-medium text-foreground">
                          {mins}
                        </span>{" "}
                        min
                      </span>
                      <span>
                        Pass{" "}
                        <span className="font-medium text-foreground">
                          {pass}%
                        </span>
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
