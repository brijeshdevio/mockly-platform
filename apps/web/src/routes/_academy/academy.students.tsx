import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { AppShell } from "@/components/mockly/AppShell";
import { Avatar, Badge, Btn, Card, Input } from "@/components/mockly/ui";
import { students } from "@/lib/mock/academy/students";

export const Route = createFileRoute("/_academy/academy/students")({
  head: () => ({ meta: [{ title: "Students · Academy · Mockly" }] }),
  loader: () => ({ students }),
  component: Students,
});

function Students() {
  const [openDialog, setOpen] = useState(false);
  const { students } = Route.useLoaderData();

  return (
    <AppShell
      role="academy"
      title="Students"
      subtitle="Manage everyone enrolled in your academy."
      actions={
        <>
          <Btn variant="outline">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </Btn>
          <Btn variant="primary" onClick={() => setOpen(true)}>
            <Plus className="h-3.5 w-3.5" /> Add student
          </Btn>
        </>
      }
    >
      <Card className="p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-hairline p-4">
          <div className="relative min-w-55 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search by name, phone, code…"
              className="h-10 w-full rounded-md border border-hairline bg-background pr-3 pl-9 text-[13px] outline-none focus:ring-2 focus:ring-primary/15"
            />
          </div>
          <FilterChip label="Course: All" />
          <FilterChip label="Status: Active" />
          <Btn variant="ghost" size="sm">
            <SlidersHorizontal className="h-3.5 w-3.5" /> More
          </Btn>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-180 text-[13px]">
            <thead>
              <tr className="border-b border-hairline text-left text-[11.5px] font-medium tracking-wider text-muted-foreground uppercase">
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Student code</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {students.map((student) => (
                <tr key={student.id} className="group hover:bg-accent/40">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={student.name} />

                      <span className="font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-muted-foreground">
                    {student.phone}
                  </td>
                  <td className="px-6 py-3.5">
                    <Badge tone="neutral">{student.course}</Badge>
                  </td>
                  <td className="px-6 py-3.5 font-mono text-[12px] text-muted-foreground">
                    {student.course}
                  </td>
                  <td className="px-6 py-3.5">
                    <Badge
                      tone={student.status === "Active" ? "success" : "warning"}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />{" "}
                      {student.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button className="rounded-md p-1.5 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-accent">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-hairline px-4 py-3 text-[12.5px] text-muted-foreground sm:flex-row">
          <span>Showing 1–8 of 248 students</span>
          <div className="flex items-center gap-1">
            <Btn variant="outline" size="sm">
              Previous
            </Btn>
            <Btn
              variant="ghost"
              size="sm"
              className="bg-accent text-foreground"
            >
              1
            </Btn>
            <Btn variant="ghost" size="sm">
              2
            </Btn>
            <Btn variant="ghost" size="sm">
              3
            </Btn>
            <span className="px-1">…</span>
            <Btn variant="ghost" size="sm">
              31
            </Btn>
            <Btn variant="outline" size="sm">
              Next
            </Btn>
          </div>
        </div>
      </Card>

      {openDialog && <AddStudentDialog onClose={() => setOpen(false)} />}
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

function AddStudentDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-(--brand-ink)/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-hairline bg-card p-6 shadow-elevated">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[18px] font-semibold tracking-tight">
              Add a student
            </h3>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              A unique Student Code is generated automatically.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form className="mt-6 space-y-4">
          <Input label="Full name" placeholder="Ananya Verma" />
          <Input label="Phone number" placeholder="+91 98220 21048" />
          <div>
            <span className="mb-1.5 block text-[12.5px] font-medium">
              Course
            </span>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-lg border border-hairline bg-card px-3.5 pr-9 text-[13.5px] outline-none focus:ring-2 focus:ring-primary/15">
                <option>CCC</option>
                <option>O Level</option>
                <option>ADCA</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <div className="rounded-lg border border-dashed border-hairline bg-background/60 p-4">
            <p className="text-[11.5px] font-medium tracking-widest text-muted-foreground uppercase">
              Auto-generated
            </p>
            <p className="mt-1.5 font-mono text-[14px] tracking-[0.14em]">
              STU-2057
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Btn variant="outline" onClick={onClose} type="button">
              Cancel
            </Btn>
            <Btn variant="primary" type="button">
              Add student
            </Btn>
          </div>
        </form>
      </div>
    </div>
  );
}
