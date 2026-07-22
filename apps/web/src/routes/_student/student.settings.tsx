import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/mockly/AppShell";
import { Btn, Card, Input, SectionHeader } from "@/components/mockly/ui";

export const Route = createFileRoute("/_student/student/settings")({
  head: () => ({ meta: [{ title: "Settings · Student · Mockly" }] }),
  component: StudentSettings,
});

function StudentSettings() {
  return (
    <AppShell
      role="student"
      title="Settings"
      subtitle="Update your profile and password."
    >
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-0.5 text-[13px]">
            {[
              ["Profile", true],
              ["Password", false],
              ["Enrollment", false],
            ].map(([l, active]) => (
              <a
                key={l as string}
                href="#"
                className={`block rounded-[10px] px-3 py-2 font-medium ${
                  active
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/60"
                }`}
              >
                {l}
              </a>
            ))}
          </div>
        </nav>

        <div className="space-y-6">
          <Card className="p-6">
            <SectionHeader
              title="Profile"
              description="Editable — keep it accurate."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full name" defaultValue="Ananya Verma" />
              <Input label="Phone number" defaultValue="+91 98220 21048" />
            </div>
            <div className="mt-6 flex justify-end gap-2 border-t border-hairline pt-4">
              <Btn variant="ghost">Cancel</Btn>
              <Btn variant="primary">Save changes</Btn>
            </div>
          </Card>

          <Card className="p-6">
            <SectionHeader
              title="Password"
              description="Use a strong, memorable password."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Current password" type="password" />
              <span className="hidden sm:block" />
              <Input label="New password" type="password" />
              <Input label="Confirm new password" type="password" />
            </div>
            <div className="mt-6 flex justify-end gap-2 border-t border-hairline pt-4">
              <Btn variant="ghost">Cancel</Btn>
              <Btn variant="primary">Update password</Btn>
            </div>
          </Card>

          <Card className="p-6">
            <SectionHeader
              title="Enrollment details"
              description="Managed by your academy — read only."
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Institute code", "NIE — 8842"],
                ["Student code", "STU-2049"],
                ["Course", "CCC"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-lg border border-dashed border-hairline bg-background/60 p-4"
                >
                  <p className="text-[11.5px] font-medium tracking-widest text-muted-foreground uppercase">
                    {k}
                  </p>
                  <p className="mt-1.5 font-mono text-[13.5px] tracking-[0.14em]">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
