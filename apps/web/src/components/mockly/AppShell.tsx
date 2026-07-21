import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  BarChart3,
  CreditCard,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import { Logo } from "./Logo";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const academyNav: NavItem[] = [
  { to: "/academy", label: "Dashboard", icon: LayoutDashboard },
  { to: "/academy/students", label: "Students", icon: Users },
  { to: "/academy/courses", label: "Courses", icon: BookOpen },
  { to: "/academy/tests", label: "Tests", icon: ClipboardList },
  { to: "/academy/results", label: "Results", icon: BarChart3 },
  { to: "/academy/billing", label: "Billing", icon: CreditCard },
  { to: "/academy/settings", label: "Settings", icon: Settings },
];

const studentNav: NavItem[] = [
  { to: "/student", label: "Dashboard", icon: LayoutDashboard },
  { to: "/student/tests", label: "Tests", icon: ClipboardList },
  { to: "/student/results", label: "Results", icon: BarChart3 },
  { to: "/student/settings", label: "Settings", icon: Settings },
];

export function AppShell({
  role,
  title,
  subtitle,
  actions,
  children,
}: {
  role: "academy" | "student";
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const nav = role === "academy" ? academyNav : studentNav;
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to: string) => {
    if (to === "/academy" || to === "/student") return pathname === to;
    return pathname === to || pathname.startsWith(to + "/");
  };

  const account =
    role === "academy"
      ? { name: "Excel Academy", meta: "NIE-8842", initials: "EA" }
      : { name: "Ananya Verma", meta: "STU-2049", initials: "AV" };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-62 transform border-r border-hairline bg-sidebar transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-5">
            <Logo />
            <button
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="px-3 pt-2">
            <div className="flex items-center gap-2.5 rounded-lg border border-hairline bg-card px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-(--brand-cream) text-[11px] font-semibold text-(--brand-ink)">
                {account.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">
                  {account.name}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {account.meta}
                </p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>

          <nav className="mt-4 flex-1 space-y-0.5 px-3">
            <p className="px-3 pt-2 pb-1.5 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Workspace
            </p>
            {nav.map((item) => {
              const active = isActive(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                  />
                  {item.label}
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-hairline p-3">
            <div className="space-y-0.5">
              <button className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13px] text-muted-foreground hover:bg-accent/60 hover:text-foreground">
                <LifeBuoy className="h-4 w-4" /> Help & Support
              </button>
              <Link
                to="/"
                className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13px] text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="lg:pl-62">
        <header className="sticky top-0 z-30 border-b border-hairline bg-background/80 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-10">
            <button
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden flex-1 md:block">
              <div className="relative max-w-md">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search students, tests, results…"
                  className="h-9 w-full rounded-md border border-hairline bg-card pr-16 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/15"
                />
                <kbd className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 rounded-md border border-hairline bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
                  ⌘K
                </kbd>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="relative rounded-[10px] border border-hairline bg-card p-2 text-muted-foreground hover:text-foreground">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
              </button>
              <div className="hidden h-9 items-center gap-2 rounded-md border border-hairline bg-card pr-3 pl-1 sm:flex">
                <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-(--brand-ink) text-[11px] font-semibold text-(--brand-cream)">
                  {account.initials}
                </div>
                <span className="text-[13px] font-medium">{account.name}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-300">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-[26px] font-semibold tracking-tight sm:text-[28px]">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
              {actions && (
                <div className="flex flex-wrap items-center gap-2">
                  {actions}
                </div>
              )}
            </div>
            {children}
          </div>
        </main>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-(--brand-ink)/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
}
