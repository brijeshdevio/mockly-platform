import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_student/student")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
