import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  CATEGORIES,
  projectStore,
  slugify,
  type Difficulty,
  type Project,
  type ProjectCategory,
  type ProjectStatus,
} from "@/lib/projects";
import { adminAuth } from "@/lib/auth";

/** Secret portfolio CMS — not linked from the public site. Bookmark `/console`. */
export const Route = createFileRoute("/console")({
  head: () => ({
    meta: [
      { title: "Console — Zeteosec" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ConsolePage,
});

function ConsolePage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(adminAuth.isAuthed());
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div className="relative min-h-screen bg-background px-4 pb-20 pt-16">
      <div className="pointer-events-none fixed inset-0 -z-10 grid-overlay opacity-30" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 mx-auto h-72 max-w-3xl rounded-full bg-gradient-to-r from-primary/25 via-accent/15 to-primary/20 blur-3xl" />
      {authed ? (
        <Dashboard onLogout={() => { adminAuth.logout(); setAuthed(false); }} />
      ) : (
        <Login onSuccess={() => setAuthed(true)} />
      )}
    </div>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl glass-strong p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan/80">
          Restricted
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gradient">
          Console sign-in
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the admin password to manage portfolio projects.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (adminAuth.login(pw)) onSuccess();
            else setErr("Wrong password");
          }}
          className="mt-6 space-y-3"
        >
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(""); }}
            placeholder="Password"
            className="w-full rounded-xl border border-border bg-muted/60 px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20"
          />
          {err && <p className="text-xs text-red-400">{err}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-foreground py-2.5 text-sm font-medium text-background"
          >
            Unlock
          </button>
        </form>
        <p className="mt-4 font-mono text-[10px] text-muted-foreground">
          why are you here? this isn't the admin password. if you think it should be, ask me about it on twitter <a href="https://x.com/@zeteo_sec" className="text-cyan hover:underline">@zeteo_sec</a>.
        </p>
      </div>
    </div>
  );
}

const EMPTY: Project = {
  id: "",
  slug: "",
  title: "",
  description: "",
  longDescription: "",
  thumbnail: "",
  stack: [],
  category: "Cloud Security",
  status: "Completed",
  difficulty: "Intermediate",
  date: new Date().toISOString().slice(0, 10),
  featured: false,
  github: "",
  problem: "",
  methodology: "",
  outcomes: "",
  challenges: "",
  lessons: "",
};

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    const sync = () => setItems(projectStore.list());
    sync();
    window.addEventListener("zeteo:projects:changed", sync);
    return () => window.removeEventListener("zeteo:projects:changed", sync);
  }, []);

  const filtered = useMemo(
    () =>
      items.filter((p) =>
        p.title.toLowerCase().includes(q.toLowerCase()),
      ),
    [items, q],
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan/80">
            Console
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gradient">
            Portfolio control
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add, edit and remove projects. Stored locally in your browser.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing({ ...EMPTY, id: crypto.randomUUID() })}
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            + New project
          </button>
          <button
            onClick={onLogout}
            className="rounded-full border border-border bg-muted/40 px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          className="flex-1 rounded-xl border border-border bg-muted/60 px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-cyan/50"
        />
        <button
          onClick={() => {
            if (confirm("Reset to seed projects? This deletes your edits.")) projectStore.reset();
          }}
          className="rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-xs text-muted-foreground hover:text-foreground"
        >
          Reset to seed
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl glass">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {p.featured && (
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]" />
                    )}
                    <span>{p.title}</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">/{p.slug}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.status}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {new Date(p.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setEditing({ ...p })}
                    className="rounded-md border border-border bg-muted/40 px-3 py-1 text-xs hover:border-cyan/50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${p.title}"?`)) projectStore.remove(p.id);
                    }}
                    className="ml-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-300 hover:border-red-500/40"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  No projects.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <ProjectEditor
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={(p) => {
            const final: Project = {
              ...p,
              slug: p.slug?.trim() ? slugify(p.slug) : slugify(p.title),
              stack: p.stack.filter(Boolean),
            };
            projectStore.upsert(final);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function ProjectEditor({
  initial,
  onClose,
  onSave,
}: {
  initial: Project;
  onClose: () => void;
  onSave: (p: Project) => void;
}) {
  const [p, setP] = useState<Project>(initial);
  const [stackInput, setStackInput] = useState(initial.stack.join(", "));

  const set = <K extends keyof Project>(k: K, v: Project[K]) =>
    setP((prev) => ({ ...prev, [k]: v }));

  const onFile = (f: File | null) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => set("thumbnail", String(reader.result));
    reader.readAsDataURL(f);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-foreground/20 backdrop-blur-sm">
      <div className="ml-auto flex h-full w-full max-w-2xl flex-col border-l border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan/80">
              {initial.title ? "Editing" : "New project"}
            </p>
            <h2 className="mt-1 text-lg font-semibold">{p.title || "Untitled project"}</h2>
          </div>
          <button onClick={onClose} className="rounded-full border border-border px-3 py-1 text-xs">
            Close
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <Field label="Title">
            <input
              value={p.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Slug (optional — auto-generated)">
            <input
              value={p.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder={slugify(p.title) || "my-project"}
              className={inputCls}
            />
          </Field>
          <Field label="Short description">
            <textarea
              value={p.description}
              onChange={(e) => set("description", e.target.value)}
              rows={2}
              className={inputCls}
            />
          </Field>
          <Field label="Long description">
            <textarea
              value={p.longDescription}
              onChange={(e) => set("longDescription", e.target.value)}
              rows={3}
              className={inputCls}
            />
          </Field>
          <Field label="Thumbnail">
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                className="block w-full text-xs text-muted-foreground file:mr-3 file:rounded-md file:border file:border-border file:bg-muted/60 file:px-3 file:py-1.5 file:text-xs file:text-foreground"
              />
              {p.thumbnail && (
                <button
                  onClick={() => set("thumbnail", "")}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
            {p.thumbnail && (
              <img src={p.thumbnail} alt="" className="mt-3 h-32 w-full rounded-lg object-cover" />
            )}
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select
                value={p.category}
                onChange={(e) => set("category", e.target.value as ProjectCategory)}
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Status">
              <select
                value={p.status}
                onChange={(e) => set("status", e.target.value as ProjectStatus)}
                className={inputCls}
              >
                {(["Completed", "In Progress", "Planned"] as ProjectStatus[]).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Difficulty">
              <select
                value={p.difficulty}
                onChange={(e) => set("difficulty", e.target.value as Difficulty)}
                className={inputCls}
              >
                {(["Beginner", "Intermediate", "Advanced"] as Difficulty[]).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Date">
              <input
                type="date"
                value={p.date.slice(0, 10)}
                onChange={(e) => set("date", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="Tech stack (comma-separated)">
            <input
              value={stackInput}
              onChange={(e) => {
                setStackInput(e.target.value);
                set("stack", e.target.value.split(",").map((s) => s.trim()).filter(Boolean));
              }}
              placeholder="AWS, Python, Docker"
              className={inputCls}
            />
          </Field>
          <Field label="GitHub URL">
            <input
              value={p.github}
              onChange={(e) => set("github", e.target.value)}
              placeholder="https://github.com/..."
              className={inputCls}
            />
          </Field>

          <details className="rounded-xl border border-border bg-muted/30 p-4">
            <summary className="cursor-pointer text-sm">Case study sections</summary>
            <div className="mt-4 space-y-4">
              <Field label="Problem"><textarea value={p.problem} onChange={(e) => set("problem", e.target.value)} rows={3} className={inputCls} /></Field>
              <Field label="Methodology"><textarea value={p.methodology} onChange={(e) => set("methodology", e.target.value)} rows={3} className={inputCls} /></Field>
              <Field label="Outcomes"><textarea value={p.outcomes} onChange={(e) => set("outcomes", e.target.value)} rows={3} className={inputCls} /></Field>
              <Field label="Challenges"><textarea value={p.challenges} onChange={(e) => set("challenges", e.target.value)} rows={3} className={inputCls} /></Field>
              <Field label="Key lessons"><textarea value={p.lessons} onChange={(e) => set("lessons", e.target.value)} rows={3} className={inputCls} /></Field>
            </div>
          </details>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!p.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="h-4 w-4 rounded border-border bg-muted/60"
            />
            Feature on homepage
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
          <button onClick={onClose} className="rounded-full border border-border px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            onClick={() => onSave(p)}
            disabled={!p.title.trim()}
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
          >
            Save project
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-muted/60 px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
