import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ChevronRight, GraduationCap, Layers } from "lucide-react";
import { AppShell } from "@/components/mockly/AppShell";
import { Badge, Card } from "@/components/mockly/ui";
import { courses } from "@/lib/mock/academy/courses";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_academy/academy/courses")({
  head: () => ({ meta: [{ title: "Courses · Academy · Mockly" }] }),
  loader: () => ({ items: courses }),
  component: Courses,
});

function Courses() {
  const { items } = Route.useLoaderData();

  return (
    <AppShell
      role="academy"
      title="Courses"
      subtitle="A curated set of NIELIT courses your students can enroll in. View only — updates come from Mockly."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((c) => (
          <Card
            key={c.code}
            className="flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-accent text-(--brand-ink)">
                <BookOpen className="h-5 w-5" />
              </div>
              <Badge>{c.code}</Badge>
            </div>
            <h3 className="mt-5 text-[17px] font-semibold tracking-tight">
              {c.title}
            </h3>
            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
              {c.description}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-hairline pt-4 text-[12px]">
              <Meta
                icon={<Layers className="h-3.5 w-3.5" />}
                k="Tests"
                v={String(c.stats.tests)}
              />
              <Meta
                icon={<GraduationCap className="h-3.5 w-3.5" />}
                k="Students"
                v={String(c.stats.students)}
              />
              <Meta
                icon={<span className="text-[10px]">⏱</span>}
                k="Duration"
                v={c.stats.duration}
              />
            </div>

            <Button variant={"link"} className={"text-sm mt-3"}>
              View tests <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-dashed border-hairline bg-card/40 p-6 text-center">
        <p className="text-[13px] font-medium">Need a course we don't list?</p>
        <p className="mt-1.5 text-[12.5px] text-muted-foreground">
          Mockly curates the NIELIT catalog centrally. Reach out and we'll
          consider adding it.
        </p>
      </div>
    </AppShell>
  );
}

function Meta({
  icon,
  k,
  v,
}: {
  icon: React.ReactNode;
  k: string;
  v?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon} {k}
      </div>
      <p className="mt-0.5 font-semibold text-foreground">{v}</p>
    </div>
  );
}
