import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, CreditCard, Download } from "lucide-react";
import { AppShell } from "@/components/mockly/AppShell";
import { Badge, Btn, Card, SectionHeader } from "@/components/mockly/ui";

export const Route = createFileRoute("/_academy/academy/billing")({
  head: () => ({ meta: [{ title: "Billing · Academy · Mockly" }] }),
  component: Billing,
});

const invoices = [
  ["INV-1042", "Growth · Monthly", "Nov 01, 2026", "₹ 4,999", "Paid"],
  ["INV-1031", "Growth · Monthly", "Oct 01, 2026", "₹ 4,999", "Paid"],
  ["INV-1019", "Growth · Monthly", "Sep 01, 2026", "₹ 4,999", "Paid"],
  ["INV-1007", "Starter · Monthly", "Aug 01, 2026", "₹ 1,999", "Paid"],
] as const;

function Billing() {
  return (
    <AppShell
      role="academy"
      title="Billing"
      subtitle="Your plan, payment method, and invoices — all in one place."
      actions={
        <Btn variant="outline">
          <Download className="h-3.5 w-3.5" /> Download all
        </Btn>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge tone="accent">Current plan</Badge>
              <h2 className="mt-3 text-[24px] font-semibold tracking-tight">
                Growth
              </h2>
              <p className="mt-1.5 max-w-md text-[13px] text-muted-foreground">
                Up to 500 students, all NIELIT courses, full mock library,
                unlimited attempts per test cycle.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11.5px] font-medium tracking-widest text-muted-foreground uppercase">
                Billed monthly
              </p>
              <p className="mt-1 text-[26px] font-semibold tracking-tight">
                ₹ 4,999
              </p>
              <p className="text-[11.5px] text-muted-foreground">excl. taxes</p>
            </div>
          </div>

          <div className="mt-6 grid gap-2 text-[12.5px] sm:grid-cols-2">
            {[
              "Up to 500 active students",
              "CCC, O Level and ADCA mock library",
              "Result review & CSV export",
              "Email support within 24h",
            ].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {f}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-hairline bg-background p-4">
            <div className="text-[12.5px]">
              <p className="font-medium">Renews on Dec 01, 2026</p>
              <p className="mt-0.5 text-muted-foreground">
                Auto-renew is on · Next charge ₹ 4,999
              </p>
            </div>
            <div className="flex gap-2">
              <Btn variant="outline" size="sm">
                Change plan
              </Btn>
              <Btn variant="primary" size="sm">
                Upgrade <ArrowUpRight className="h-3.5 w-3.5" />
              </Btn>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <SectionHeader title="Payment method" />
          <div className="rounded-lg border border-hairline bg-background p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-14 items-center justify-center rounded-sm bg-(--brand-ink) text-[10px] font-bold tracking-widest text-(--brand-cream)">
                VISA
              </div>
              <div className="text-[13px]">
                <p className="font-medium">Visa ending in 4821</p>
                <p className="text-[11.5px] text-muted-foreground">
                  Expires 08 / 28
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Btn variant="outline" size="sm">
                Update card
              </Btn>
              <Btn variant="ghost" size="sm">
                Remove
              </Btn>
            </div>
          </div>

          <SectionHeader
            title="Status"
            description="Everything looks healthy."
            action={undefined}
          />
          <div className="space-y-2 text-[12.5px]">
            {[
              ["Billing status", "Active", "success"],
              ["Auto-renew", "On", "neutral"],
              ["Overdue invoices", "None", "success"],
            ].map(([k, v, t]) => (
              <div
                key={k as string}
                className="flex items-center justify-between border-b border-hairline pb-2 last:border-0"
              >
                <span className="text-muted-foreground">{k}</span>
                <Badge tone={t as "success" | "neutral"}>{v}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-0">
        <div className="flex items-center justify-between p-6">
          <div>
            <h3 className="text-[15px] font-semibold tracking-tight">
              Payment history
            </h3>
            <p className="mt-0.5 text-[12.5px] text-muted-foreground">
              Every invoice, ready to download.
            </p>
          </div>
          <CreditCard className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 text-[13px]">
            <thead>
              <tr className="border-y border-hairline text-left text-[11.5px] font-medium tracking-wider text-muted-foreground uppercase">
                <th className="px-6 py-3">Invoice</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {invoices.map(([id, plan, date, amount, status]) => (
                <tr key={id} className="hover:bg-accent/40">
                  <td className="px-6 py-3.5 font-mono text-[12px]">{id}</td>
                  <td className="px-6 py-3.5">{plan}</td>
                  <td className="px-6 py-3.5 text-muted-foreground">{date}</td>
                  <td className="px-6 py-3.5 font-medium">{amount}</td>
                  <td className="px-6 py-3.5">
                    <Badge tone="success">{status}</Badge>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button className="inline-flex items-center gap-1 text-[12px] font-medium text-primary hover:underline">
                      <Download className="h-3.5 w-3.5" /> Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
