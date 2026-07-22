import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/mockly/AppShell";
import { Btn, Card, Input, SectionHeader } from "@/components/mockly/ui";
import { Copy } from "lucide-react";

export const Route = createFileRoute("/_academy/academy/settings")({
  head: () => ({ meta: [{ title: "Settings · Academy · Mockly" }] }),
  component: Settings,
});

function Settings() {
  return (
    <AppShell
      role="academy"
      title="Settings"
      subtitle="Keep your academy details and access up to date."
    >
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-0.5 text-[13px]">
            {[
              ["#profile", "Profile", true],
              ["#access", "Access & password", false],
              ["#institute", "Institute code", false],
              ["#danger", "Danger zone", false],
            ].map(([h, l, active]) => (
              <a
                key={h as string}
                href={h as string}
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
          <Card className="p-6" id="profile">
            <SectionHeader
              title="Academy profile"
              description="Basic info shown across your workspace."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Institute name"
                defaultValue="Excel Coaching Academy"
              />
              <Input label="Owner name" defaultValue="Priya Sharma" />
              <Input label="Phone number" defaultValue="+91 98220 21048" />
              <Input label="City" defaultValue="Lucknow" />
            </div>
            <div className="mt-6 flex justify-end gap-2 border-t border-hairline pt-4">
              <Btn variant="ghost">Cancel</Btn>
              <Btn variant="primary">Save changes</Btn>
            </div>
          </Card>

          <Card className="p-6" id="access">
            <SectionHeader
              title="Password"
              description="Use a strong password. We'll never ask you to share it."
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

          <Card className="p-6" id="institute">
            <SectionHeader
              title="Institute code"
              description="Share this with students so they can sign in."
            />
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-md border border-dashed border-hairline bg-background px-4 py-3 font-mono text-[15px] tracking-[0.18em]">
                NIE — 8842
              </div>
              <Btn variant="outline" size="sm">
                <Copy className="h-3.5 w-3.5" /> Copy code
              </Btn>
            </div>
          </Card>

          <Card
            className="border-destructive/30 bg-destructive/3 p-6"
            id="danger"
          >
            <SectionHeader
              title="Danger zone"
              description="Irreversible actions. Please be sure."
            />
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-destructive/20 bg-background p-4">
              <div className="text-[13px]">
                <p className="font-medium">Delete academy</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  Permanently remove this academy and all associated student
                  data.
                </p>
              </div>
              <Btn variant="danger" size="sm">
                Delete academy
              </Btn>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
