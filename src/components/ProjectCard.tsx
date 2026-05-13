import { Link } from "@tanstack/react-router";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      to="/portfolio/$slug"
      params={{ slug: p.slug }}
      aria-label={`Open full case study: ${p.title}`}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl glass transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_30px_80px_-30px_var(--cyan)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
        {p.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.thumbnail}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-accent/15 to-primary/30">
            <div className="absolute inset-0 grid-overlay opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
                {p.category}
              </span>
            </div>
          </div>
        )}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-background/85 px-2 py-1 text-[10px] font-mono text-foreground/85 shadow-sm backdrop-blur">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              p.status === "Completed"
                ? "bg-cyan shadow-[0_0_8px_var(--cyan)]"
                : p.status === "In Progress"
                  ? "bg-violet"
                  : "bg-white/40"
            }`}
          />
          {p.status}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan/80">
            {p.category}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {new Date(p.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
            })}
          </span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {p.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {p.description}
        </p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
          {p.stack.length > 4 && (
            <span className="font-mono text-[10px] text-muted-foreground">
              +{p.stack.length - 4}
            </span>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">{p.difficulty}</span>
          <span className="inline-flex items-center gap-1 text-xs text-foreground transition-transform group-hover:translate-x-0.5">
            Read case study
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
