import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_academy/academy")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
