import { createFileRoute, Outlet } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";

/** Layout: child routes render in `<Outlet />` (`/` → grid, `/$slug` → case study). */
export const Route = createFileRoute("/portfolio")({
  component: PortfolioLayout,
});

function PortfolioLayout() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
