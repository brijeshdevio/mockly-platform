import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Sparkles,
  Timer,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/mockly/Logo";
import { Btn, Card, Badge } from "@/components/mockly/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mockly — Mock tests, purpose-built for NIELIT academies" },
      {
        name: "description",
        content:
          "Run beautiful, reliable NIELIT mock exams. Onboard students, monitor performance, and keep every result in one calm workspace.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader />
      <Hero />
      <LogosStrip />
      <Features />
      <WhyMockly />
      <Benefits />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-300 items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            {[
              ["Features", "#features"],
              ["How it works", "#how"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-[13.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/student/login"
            className="hidden text-[13.5px] font-medium text-muted-foreground hover:text-foreground sm:inline-flex sm:h-10 sm:items-center sm:px-3"
          >
            Student login
          </Link>
          <Link to="/academy/login">
            <Btn variant="outline" size="md">
              Academy login
            </Btn>
          </Link>
          <Link to="/academy/signup">
            <Btn variant="primary" size="md">
              Get started
              <ArrowRight className="h-3.5 w-3.5" />
            </Btn>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 dot-grid opacity-40" />
      <div className="absolute top-0 left-1/2 -z-10 h-130 w-225 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--brand-cream),transparent_60%)] opacity-70" />

      <div className="mx-auto max-w-300 px-4 pt-20 pb-20 sm:px-6 sm:pt-24 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-3 py-1.5 text-[12px] font-medium text-muted-foreground shadow-soft">
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
            Built for NIELIT coaching centers
          </div>

          <h1 className="mt-6 text-[44px] leading-[1.05] font-semibold tracking-tight sm:text-[56px] lg:text-[64px]">
            Mock tests that
            <br className="hidden sm:block" />{" "}
            <span className="text-(--brand-stone) italic">actually feel</span>{" "}
            like the real exam.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-[16.5px]">
            Mockly gives NIELIT academies a calm, focused workspace to onboard
            students, run CCC, O Level and ADCA mock tests, and see exactly how
            everyone is doing.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <Link to="/academy/signup" className="w-full sm:w-auto">
              <Btn variant="primary" size="lg" className="w-full sm:w-auto">
                Create academy account
                <ArrowRight className="h-4 w-4" />
              </Btn>
            </Link>
            <Link to="/student/login" className="w-full sm:w-auto">
              <Btn variant="outline" size="lg" className="w-full sm:w-auto">
                I'm a student
              </Btn>
            </Link>
          </div>

          <p className="mt-4 text-[12px] text-muted-foreground">
            No card required · 14 day trial · Cancel any time
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <HeroPreview />
        </div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[36px] bg-(--brand-cream)/60 blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-hairline bg-card shadow-elevated">
        <div className="flex items-center gap-2 border-b border-hairline bg-background/50 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-(--brand-cream)" />
            <span className="h-2.5 w-2.5 rounded-full bg-(--brand-cream)" />
            <span className="h-2.5 w-2.5 rounded-full bg-(--brand-cream)" />
          </div>
          <div className="mx-auto flex items-center gap-1.5 rounded-full border border-hairline bg-background px-3 py-1 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3 w-3" /> mockly.app/academy
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
          <div className="hidden border-r border-hairline p-4 lg:block">
            <div className="mb-3 flex items-center gap-2 rounded-[10px] bg-accent px-2.5 py-2 text-[12px] font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-(--brand-cream) text-[10px] font-bold">
                EA
              </div>
              Excel Academy
            </div>
            <div className="space-y-0.5 text-[12px]">
              {[
                ["Dashboard", true],
                ["Students", false],
                ["Courses", false],
                ["Tests", false],
                ["Results", false],
              ].map(([l, active]) => (
                <div
                  key={l as string}
                  className={`flex items-center gap-2 rounded-sm px-2.5 py-1.5 ${
                    active
                      ? "bg-accent font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      active ? "bg-primary" : "bg-(--brand-cream)"
                    }`}
                  />
                  {l}
                </div>
              ))}
            </div>
          </div>
          <div className="p-6">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                  Overview
                </p>
                <h3 className="mt-1 text-[20px] font-semibold tracking-tight">
                  Good morning, Excel Academy
                </h3>
              </div>
              <Badge tone="success">All systems normal</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                ["Students", "248", "+12"],
                ["Tests taken", "1,842", "+96"],
                ["Avg. score", "72%", "+3.4"],
                ["Pass rate", "88%", "+1.1"],
              ].map(([l, v, d]) => (
                <div
                  key={l}
                  className="rounded-lg border border-hairline bg-background p-3.5"
                >
                  <p className="text-[10.5px] font-medium text-muted-foreground">
                    {l}
                  </p>
                  <p className="mt-1.5 text-[20px] font-semibold tracking-tight">
                    {v}
                  </p>
                  <p className="mt-1 text-[10.5px] text-primary">▲ {d}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-hairline bg-background p-4">
              <p className="mb-2.5 text-[11.5px] font-medium text-muted-foreground">
                Recent activity
              </p>
              <div className="space-y-2 text-[12.5px]">
                {[
                  ["Ananya V.", "Completed CCC · Mock 4", "84%"],
                  ["Rohit K.", "Started O Level · Networking", "—"],
                  ["Sana M.", "Completed ADCA · Mock 2", "76%"],
                ].map(([n, a, s]) => (
                  <div
                    key={n}
                    className="flex items-center justify-between border-b border-hairline last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[10px] font-semibold">
                        {n.split(" ")[0][0]}
                      </span>
                      <div>
                        <p className="font-medium">{n}</p>
                        <p className="text-[11px] text-muted-foreground">{a}</p>
                      </div>
                    </div>
                    <span className="text-[11.5px] font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogosStrip() {
  const items = [
    "Excel Academy",
    "InfoTech Institute",
    "Prime NIELIT Center",
    "Sunrise Coaching",
    "TechVista Academy",
    "Zenith Learning",
  ];
  return (
    <section className="border-y border-hairline bg-card/40 py-8">
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-10">
        <p className="text-center text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Trusted by coaching centers preparing thousands of NIELIT students
        </p>
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 opacity-70 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((i) => (
            <div
              key={i}
              className="text-center text-[13px] font-semibold tracking-tight text-(--brand-stone)"
            >
              {i}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    {
      icon: Users,
      title: "Student roster in minutes",
      body: "Add students in bulk, assign courses, and hand over a login code. Done.",
    },
    {
      icon: ClipboardList,
      title: "Ready-made mock library",
      body: "Curated CCC, O Level, and ADCA papers modeled on the actual exam pattern.",
    },
    {
      icon: Timer,
      title: "Real exam conditions",
      body: "Timed sessions, autosave, resume-on-interrupt. No lost progress, ever.",
    },
    {
      icon: LineChart,
      title: "Results without the noise",
      body: "Clear pass rates, averages, and question-by-question review. No fluff.",
    },
    {
      icon: ShieldCheck,
      title: "One attempt, honest scores",
      body: "Locked attempts and audit trails so scores actually mean something.",
    },
    {
      icon: Sparkles,
      title: "A workspace students love",
      body: "Calm, fast, and focused — the opposite of a legacy admin panel.",
    },
  ];
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <Badge tone="accent">Features</Badge>
          <h2 className="mt-4 text-[34px] font-semibold tracking-tight sm:text-[42px]">
            Everything you need to run mocks. Nothing you don't.
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            Mockly is opinionated. We built the exact tools NIELIT academies
            actually use — and left out the rest.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {feats.map((f) => (
            <Card
              key={f.title}
              className="p-6 transition-all hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent text-(--brand-ink)">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-[16px] font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyMockly() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-10">
        <Card className="overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-10 lg:p-14">
              <Badge tone="accent">Why Mockly</Badge>
              <h2 className="mt-4 text-[32px] font-semibold tracking-tight sm:text-[36px]">
                Paper mocks are tired. Spreadsheets are worse.
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
                Coaching centers deserve a tool built for how they actually work
                — not a repurposed LMS, not a form-builder, not a template.
                Mockly is a single calm workspace where students take mocks and
                academies see real results.
              </p>
              <ul className="mt-8 space-y-3.5">
                {[
                  "Set up your academy and roll out mocks the same day.",
                  "One-page results with question-level review.",
                  "No fake analytics. No animated charts. Just the numbers that matter.",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2.5 text-[13.5px]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative bg-(--brand-cream)/50 p-10 lg:p-14">
              <div className="absolute inset-0 dot-grid opacity-30" />
              <div className="relative space-y-3">
                {[
                  ["CCC · Mock Paper 4", "45 min · 100 Q", "Passing 50%"],
                  ["O Level · M1-R5 Set 2", "90 min · 100 Q", "Passing 50%"],
                  ["ADCA · Mock 3", "60 min · 80 Q", "Passing 50%"],
                ].map(([t, s, p], i) => (
                  <div
                    key={t}
                    className="flex items-center justify-between rounded-[16px] border border-hairline bg-background p-4 shadow-soft"
                    style={{ transform: `translateX(${i * 12}px)` }}
                  >
                    <div>
                      <p className="text-[13.5px] font-semibold">{t}</p>
                      <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                        {s}
                      </p>
                    </div>
                    <Badge tone="neutral">{p}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    {
      icon: Zap,
      k: "Setup in 10 minutes",
      v: "From signup to first mock in a single sitting.",
    },
    {
      icon: GraduationCap,
      k: "Student first",
      v: "A test screen that doesn't get in the way.",
    },
    {
      icon: ShieldCheck,
      k: "Locked & fair",
      v: "One attempt, autosave, tamper-resistant.",
    },
    {
      icon: LineChart,
      k: "Honest reporting",
      v: "Pass rate, average score, per-question review.",
    },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <Card key={it.k} className="p-6">
              <it.icon className="h-5 w-5 text-primary" />
              <p className="mt-4 text-[14.5px] font-semibold tracking-tight">
                {it.k}
              </p>
              <p className="mt-1.5 text-[12.5px] text-muted-foreground">
                {it.v}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Create your academy",
      d: "Register with your institute name and get a unique Institute Code.",
    },
    {
      n: "02",
      t: "Add your students",
      d: "Enter students once, assign a course, share their Student Code.",
    },
    {
      n: "03",
      t: "They take mocks. You see results.",
      d: "Students log in and attempt tests. You get results in real time.",
    },
  ];
  return (
    <section id="how" className="py-20 sm:py-28">
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="accent">How it works</Badge>
          <h2 className="mt-4 text-[34px] font-semibold tracking-tight sm:text-[42px]">
            From zero to your first mock in three steps.
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.n} className="relative p-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-background px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                Step {s.n}
              </div>
              <h3 className="text-[18px] font-semibold tracking-tight">
                {s.t}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                {s.d}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Which NIELIT courses does Mockly support?",
      a: "CCC, O Level, and ADCA — the three courses run by most coaching centers.",
    },
    {
      q: "Can students retake a completed test?",
      a: "No. Each mock is one attempt, so scores reflect real exam conditions.",
    },
    {
      q: "What if a student loses internet mid-test?",
      a: "Progress is autosaved. They can log back in and resume where they left off.",
    },
    {
      q: "Can I create my own tests?",
      a: "Not yet. Mockly ships a curated library of tests reviewed for exam accuracy.",
    },
    {
      q: "How are students onboarded?",
      a: "Academies add students; each student gets an Institute Code and Student Code to log in.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-225 px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <Badge tone="accent">FAQ</Badge>
          <h2 className="mt-4 text-[34px] font-semibold tracking-tight sm:text-[42px]">
            Answers, upfront.
          </h2>
        </div>
        <div className="mt-10 space-y-2.5">
          {items.map((it, i) => (
            <div
              key={it.q}
              className="rounded-[18px] border border-hairline bg-card px-5 py-4 shadow-soft"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="text-[14.5px] font-semibold">{it.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                  {it.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="pt-6 pb-24">
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[28px] bg-(--brand-ink) p-10 text-(--brand-cream) sm:p-16">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-[34px] font-semibold tracking-tight text-white sm:text-[42px]">
              Give your students the mock exam experience they deserve.
            </h2>
            <p className="mt-4 text-[15px] text-(--brand-cream)/80">
              Set up your academy in minutes. First month free. No credit card.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link to="/academy/signup">
                <Btn variant="primary" size="lg">
                  Create academy account <ArrowRight className="h-4 w-4" />
                </Btn>
              </Link>
              <Link to="/academy/login">
                <Btn
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  Sign in
                </Btn>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-card/40">
      <div className="mx-auto max-w-300 px-4 py-10 sm:px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-[12.5px] text-muted-foreground">
              Mockly is a premium platform for NIELIT coaching centers to run
              online mock exams.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[12.5px] text-muted-foreground">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#how" className="hover:text-foreground">
              How it works
            </a>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
            <Link to="/academy/login" className="hover:text-foreground">
              Academy login
            </Link>
            <Link to="/student/login" className="hover:text-foreground">
              Student login
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-hairline pt-6 text-[11.5px] text-muted-foreground">
          © {new Date().getFullYear()} Mockly. Crafted for NIELIT academies.
        </div>
      </div>
    </footer>
  );
}
