import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ChevronRight, GraduationCap, Layers } from "lucide-react";
import { AppShell } from "@/components/mockly/AppShell";
import { Badge, Card } from "@/components/mockly/ui";

export const Route = createFileRoute("/_academy/academy/courses")({
  head: () => ({ meta: [{ title: "Courses · Academy · Mockly" }] }),
  component: Courses,
});

const courses = [
  {
    code: "CCC",
    title: "Course on Computer Concepts",
    body: "Foundational NIELIT program covering computer literacy, GUI, internet, and productivity essentials.",
    tests: 10,
    students: 128,
    duration: "80 hrs",
    tone: "accent" as const,
  },
  {
    code: "O Level",
    title: "Foundation IT Course",
    body: "Four-module NIELIT program: IT Tools, Web Design, Programming, and Internet Technologies.",
    tests: 9,
    students: 74,
    duration: "500 hrs",
    tone: "info" as const,
  },
  {
    code: "ADCA",
    title: "Advanced Diploma in Computer Applications",
    body: "Advanced program covering office suite, DBMS, web technology, and application development.",
    tests: 5,
    students: 46,
    duration: "1 year",
    tone: "success" as const,
  },
];

function Courses() {
  return (
    <AppShell
      role="academy"
      title="Courses"
      subtitle="A curated set of NIELIT courses your students can enroll in. View only — updates come from Mockly."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {courses.map((c) => (
          <Card
            key={c.code}
            className="flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-accent text-(--brand-ink)">
                <BookOpen className="h-5 w-5" />
              </div>
              <Badge tone={c.tone}>{c.code}</Badge>
            </div>
            <h3 className="mt-5 text-[17px] font-semibold tracking-tight">
              {c.title}
            </h3>
            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
              {c.body}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-hairline pt-4 text-[12px]">
              <Meta
                icon={<Layers className="h-3.5 w-3.5" />}
                k="Tests"
                v={String(c.tests)}
              />
              <Meta
                icon={<GraduationCap className="h-3.5 w-3.5" />}
                k="Students"
                v={String(c.students)}
              />
              <Meta
                icon={<span className="text-[10px]">⏱</span>}
                k="Duration"
                v={c.duration}
              />
            </div>
            <button className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-medium text-primary hover:underline">
              View tests <ChevronRight className="h-3.5 w-3.5" />
            </button>
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

function Meta({ icon, k, v }: { icon: React.ReactNode; k: string; v: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon} {k}
      </div>
      <p className="mt-0.5 font-semibold text-foreground">{v}</p>
    </div>
  );
}
