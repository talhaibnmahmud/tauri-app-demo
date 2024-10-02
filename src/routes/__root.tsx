import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { Separator } from "@/components/ui/separator";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      }))
    );

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 pt-4 flex  items-center space-x-4">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Separator orientation="vertical" />
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <Separator className="my-2" />

      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
