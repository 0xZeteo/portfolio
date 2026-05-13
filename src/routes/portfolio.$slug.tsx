import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { projectStore, type Project } from "@/lib/projects";

export const Route = createFileRoute("/portfolio/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Zeteosec` },
      {
        name: "description",
        content: `Case study: ${params.slug.replace(/-/g, " ")}.`,
      },
    ],
  }),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { slug } = useParams({ from: "/portfolio/$slug" });
  const [project, setProject] = useState<Project | undefined>();
  const [related, setRelated] = useState<Project[]>([]);

  useEffect(() => {
    const sync = () => {
      const p = projectStore.get(slug);
      setProject(p);
      if (p) {
        setRelated(
          projectStore
            .list()
            .filter((x) => x.category === p.category && x.id !== p.id)
            .slice(0, 3),
        );
      }
    };
    sync();
    window.addEventListener("zeteo:projects:changed", sync);
    return () => window.removeEventListener("zeteo:projects:changed", sync);
  }, [slug]);

  if (!project) {
    return (
      <>
        <div className="mx-auto max-w-3xl px-4 pt-32 pb-20 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan/80">
            Not found
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-gradient">
            That project doesn’t exist
          </h1>
          <Link
            to="/portfolio"
            className="mt-6 inline-flex rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            Back to portfolio
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* HERO */}
      <header className="relative isolate overflow-hidden px-4 pb-16 pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-80 max-w-4xl rounded-full bg-gradient-to-r from-primary/35 via-accent/25 to-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-40" />
        <div className="mx-auto max-w-4xl">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            ← All projects
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
              {project.category}
            </span>
            <span className="rounded-full border border-border bg-muted/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
              {project.status}
            </span>
            <span className="rounded-full border border-border bg-muted/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
              {project.difficulty}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {new Date(project.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.03em] text-gradient sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {project.longDescription || project.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-foreground/90"
              >
                {t}
              </span>
            ))}
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              View on GitHub →
            </a>
          )}
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="px-4">
        <div className="mx-auto aspect-[21/9] max-w-5xl overflow-hidden rounded-3xl glass">
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover" />
          ) : (
            <div className="relative h-full w-full bg-gradient-to-br from-primary/40 via-accent/20 to-primary/35">
              <div className="absolute inset-0 grid-overlay opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
                  {project.category}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_220px]">
          <article className="space-y-10">
            <Block title="Problem">
              {project.problem ||
                "Document the security gap or operational challenge this project addresses."}
            </Block>
            <Block title="Methodology">
              {project.methodology ||
                "Walk through architecture, tooling and detection logic step by step."}
            </Block>
            <Block title="Outcomes">
              {project.outcomes ||
                "Quantify the impact: faster MTTR, coverage, alerts triaged or detections added."}
            </Block>
            {project.challenges && (
              <Block title="Challenges">{project.challenges}</Block>
            )}
            {project.lessons && (
              <Block title="Key lessons">{project.lessons}</Block>
            )}
          </article>

          <aside className="h-fit space-y-4 rounded-2xl glass p-5 lg:sticky lg:top-28">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Tools
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {project.stack.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-cyan" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Status
              </p>
              <p className="mt-1 text-sm">{project.status}</p>
            </div>
            <div className="border-t border-border pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Difficulty
              </p>
              <p className="mt-1 text-sm">{project.difficulty}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight">Related</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/portfolio/$slug"
                  params={{ slug: r.slug }}
                  className="rounded-2xl glass p-5 transition-colors hover:border-cyan/30"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan/80">
                    {r.category}
                  </p>
                  <h3 className="mt-2 text-base font-medium">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {r.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-gradient">{title}</h2>
      <div className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
