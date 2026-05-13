import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { CATEGORIES, projectStore, type Project, type ProjectCategory } from "@/lib/projects";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Zeteosec" },
      {
        name: "description",
        content:
          "Cybersecurity portfolio: cloud security labs, detection engineering, incident response and DevSecOps projects.",
      },
      { property: "og:title", content: "Portfolio — Zeteosec" },
      {
        property: "og:description",
        content:
          "Browse Zeteosec's hands-on cybersecurity projects across cloud, detection, IR and SIEM.",
      },
    ],
  }),
  component: PortfolioIndexPage,
});

type Sort = "newest" | "oldest" | "az";

function PortfolioIndexPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [q, setQ] = useState("");
  const [active, setActive] = useState<ProjectCategory | "All">("All");
  const [sort, setSort] = useState<Sort>("newest");

  useEffect(() => {
    const sync = () => setItems(projectStore.list());
    sync();
    window.addEventListener("zeteo:projects:changed", sync);
    return () => window.removeEventListener("zeteo:projects:changed", sync);
  }, []);

  const filtered = useMemo(() => {
    let arr = items;
    if (active !== "All") arr = arr.filter((p) => p.category === active);
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.stack.some((t) => t.toLowerCase().includes(s)),
      );
    }
    arr = [...arr];
    if (sort === "newest") arr.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (sort === "oldest") arr.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    if (sort === "az") arr.sort((a, b) => a.title.localeCompare(b.title));
    return arr;
  }, [items, active, q, sort]);

  const counts = useMemo(() => {
    const m = new Map<ProjectCategory | "All", number>();
    m.set("All", items.length);
    for (const c of CATEGORIES) m.set(c, items.filter((p) => p.category === c).length);
    return m;
  }, [items]);

  return (
    <>
      <header className="relative px-4 pb-10 pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-50" />
        <div className="pointer-events-none absolute inset-x-0 top-20 -z-10 mx-auto h-72 max-w-3xl rounded-full bg-gradient-to-r from-primary/35 via-accent/25 to-primary/30 blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan/80">
            Portfolio
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-5xl font-semibold tracking-[-0.03em] text-gradient sm:text-6xl">
            Projects, labs & research.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            A growing catalogue of cybersecurity work — filtered, searchable,
            and updated as I build in public.
          </p>
        </div>
      </header>

      <section className="sticky top-3 z-30 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="glass-strong flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects, tools, tags…"
                className="w-full rounded-xl border border-border bg-muted/60 py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-cyan/50 focus:ring-1 focus:ring-cyan/25"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-xl border border-border bg-muted/60 px-3 py-2.5 text-sm outline-none focus:border-cyan/50"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A → Z</option>
            </select>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {(["All", ...CATEGORIES] as const).map((c) => {
              const isActive = active === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all ${
                    isActive
                      ? "border-cyan/40 bg-cyan/10 text-foreground shadow-[0_0_24px_-6px_var(--cyan)]"
                      : "border-border bg-muted/40 text-muted-foreground hover:border-foreground/15 hover:text-foreground"
                  }`}
                >
                  {c}
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {counts.get(c) ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-0 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <div className="rounded-2xl glass p-16 text-center">
              <p className="text-sm text-muted-foreground">
                No projects match your filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
