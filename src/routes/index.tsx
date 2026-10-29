import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";
import ProjectCard from "@/components/ProjectCard";
import { SOCIALS } from "@/components/SocialIcons";
import { projectStore, type Project } from "@/lib/projects";
import { AnimatedHeading } from "@/components/AnimatedText";
import { SkillLogo, type SkillIconDef } from "@/components/SkillLogo";

const AuroraHero = lazy(() => import("@/components/AuroraHero"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paul Ayegbusi — Security Engineer • Cloud Security" },
      {
        name: "description",
        content:
          "Cinematic portfolio of Paul Ayegbusi: cloud security, incident response and detection engineering — built in public.",
      },
    ],
  }),
  component: HomePage,
});

// Icons: bundled from pinned `simple-icons@9.6` (Vite `?url`) + small custom marks where SI has no icon.
const SKILL_GROUPS: {
  label: string;
  items: { name: string; def: SkillIconDef }[];
}[] = [
  {
    label: "Cloud platforms & services",
    items: [
      { name: "AWS", def: { kind: "si", si: "amazonaws" } },
      { name: "Azure", def: { kind: "si", si: "microsoftazure" } },
      { name: "Google Cloud", def: { kind: "si", si: "googlecloud" } },
      { name: "Kubernetes", def: { kind: "si", si: "kubernetes" } },
      { name: "Terraform", def: { kind: "si", si: "terraform" } },
      { name: "Docker", def: { kind: "si", si: "docker" } },
      { name: "CloudTrail", def: { kind: "si", si: "amazonaws" } },
      { name: "IAM", def: { kind: "si", si: "amazonaws" } },
    ],
  },
  {
    label: "Security engineering",
    items: [
      { name: "Wazuh", def: { kind: "custom", id: "wazuh" } },
      { name: "Wireshark", def: { kind: "si", si: "wireshark" } },
      { name: "Burp Suite", def: { kind: "si", si: "burpsuite" } },
      { name: "Nmap", def: { kind: "custom", id: "nmap" } },
      { name: "OpenVAS", def: { kind: "custom", id: "openvas" } },
      { name: "Metasploit", def: { kind: "custom", id: "metasploit" } },
    ],
  },
  {
    label: "Detection & telemetry",
    items: [
      { name: "Splunk", def: { kind: "si", si: "splunk" } },
      { name: "ELK / Elastic", def: { kind: "si", si: "elastic" } },
      { name: "Grafana", def: { kind: "si", si: "grafana" } },
    ],
  },
  {
    label: "Development",
    items: [
      { name: "Python", def: { kind: "si", si: "python" } },
      { name: "Flask", def: { kind: "si", si: "flask" } },
      { name: "Bash", def: { kind: "si", si: "gnubash" } },
      { name: "Git", def: { kind: "si", si: "git" } },
      { name: "GitHub", def: { kind: "si", si: "github" } },
    ],
  },
  {
    label: "Operating systems",
    items: [
      { name: "Linux", def: { kind: "si", si: "linux" } },
      { name: "Windows", def: { kind: "si", si: "windows" } },
    ],
  },
];

const METRICS = [
  { v: "120+", l: "Daily Learning Streams" },
  { v: "40+", l: "Security Labs Completed" },
  { v: "100%", l: "Cloud Security Focus" },
  { v: "Active", l: "Cybersecurity Creator" },
];

const TIMELINE = [
  { y: "2022", t: "Started cybersecurity journey", d: "OWASP, TryHackMe, foundational labs." },
  { y: "2023", t: "Cloud security specialization", d: "Deep-dive into AWS IAM, CloudTrail, detection." },
  { y: "2024", t: "Launched public learning", d: "Streaming public learning & writing case studies." },
  { y: "2025", t: "Production-grade projects", d: "Detection packs, IR automation & Kubernetes runtime security." },
];

const CERTS = [
  { name: "MCBTA", issuer: "Cyber Warfare", date: "In progress" },
  { name: "MCRTA", issuer: "Cyber Warfare", date: "In progress" },
  { name: "ISC2 CC", issuer: "ISC2", date: "Planned 2025" },
];

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const sync = () => setProjects(projectStore.list());
    sync();
    window.addEventListener("zeteo:projects:changed", sync);
    return () => window.removeEventListener("zeteo:projects:changed", sync);
  }, []);

  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-x-hidden overflow-y-visible px-4 pb-20 pt-24">
        <Suspense
          fallback={
            <div className="absolute inset-0 -z-10 min-h-[100svh] bg-background" />
          }
        >
          <AuroraHero />
        </Suspense>
        <Particles density={50} />

        <div className="relative z-10 mx-auto max-w-4xl overflow-visible px-1 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan shadow-[0_0_10px_var(--cyan)]" />
            <span className="font-mono">Building in public — live now</span>
          </motion.div>

          <div className="relative z-10 mt-6 overflow-visible">
            <AnimatedHeading
              text="Paul Ayegbusi"
              delay={0.1}
              className="relative z-10 text-balance text-6xl font-semibold tracking-[-0.04em] sm:text-7xl md:text-8xl"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.85, ease: easeOutExpo }}
            className="mx-auto mt-5 max-w-xl font-mono text-sm uppercase tracking-[0.25em] text-cyan/90"
          >
            Security Engineer · Cloud Security · Cybersecurity Creator
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: easeOutExpo }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Documenting my journey through cloud security, incident response,
            detection engineering and hands-on cybersecurity projects — building
            in public.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.42, ease: easeOutExpo }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-[0_8px_30px_-8px_var(--cyan)] transition-transform hover:-translate-y-0.5"
            >
              View Projects
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-cyan/50"
            >
              Download CV
            </a>
            <a
              href={SOCIALS.find((s) => s.name === "YouTube")?.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-cyan/50"
            >
              Watch on YouTube
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mt-10 flex items-center justify-center gap-2"
          >
            {SOCIALS.map(({ name, href, Icon }) => (
              <motion.a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                variants={staggerItem}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-cyan/40"
              >
                <Icon className="h-3.5 w-3.5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="glass rounded-xl p-3 font-mono text-[11px] text-muted-foreground animate-float-slow">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/60" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
              <span className="h-2 w-2 rounded-full bg-green-400/60" />
              <span className="ml-2 text-muted-foreground">~/paul</span>
            </div>
            <div className="mt-2">
              <span className="text-cyan">$</span> aws guardduty list-findings
              --severity HIGH
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl glass md:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px", amount: 0.2 }}
            variants={staggerContainer}
          >
            {METRICS.map((m) => (
              <motion.div
                key={m.l}
                variants={staggerItem}
                className="group relative bg-background/30 px-6 py-8 text-center transition-colors hover:bg-muted/25"
              >
                <motion.div
                  className="text-3xl font-semibold tracking-tight text-gradient-accent"
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: easeOutExpo }}
                >
                  {m.v}
                </motion.div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {m.l}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            kicker="Selected work"
            title="Featured projects"
            sub="Hands-on labs, detection packs and cloud-native security tooling."
            cta={{ to: "/portfolio", label: "All projects →" }}
          />
          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px", amount: 0.15 }}
            variants={staggerContainer}
          >
            {featured.length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                  <motion.div key={i} variants={staggerItem}>
                    <div className="aspect-[4/5] rounded-2xl glass shimmer" />
                  </motion.div>
                ))
              : featured.map((p) => (
                  <motion.div key={p.id} variants={staggerItem}>
                    <ProjectCard p={p} />
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>

      <section id="about" className="relative px-4 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan/80">
              About
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.02em] text-gradient sm:text-5xl">
              Hi, I&apos;m Paul Ayegbusi.
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                I&apos;m a security engineer focused on cloud security, detection
                engineering and incident response across AWS, Azure and GCP.
                I build hands-on labs and ship them as public case studies
                under <span className="text-foreground">Zeteosec</span>.
              </p>
              <p>
                Read the longer story, focus areas, and how I work on the
                dedicated about page.
              </p>
            </div>
            <motion.div
              className="mt-7 flex flex-wrap gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
                >
                  Full about →
                </Link>
              </motion.div>
              <motion.div variants={staggerItem}>
                <a
                  href="mailto:hello@zeteosec.com"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm transition-colors hover:border-cyan/50"
                >
                  Work with me
                </a>
              </motion.div>
              <motion.div variants={staggerItem}>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm transition-colors hover:border-cyan/50"
                >
                  See my work
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: easeOutExpo, delay: 0.06 }}
          >
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan/20 via-transparent to-violet/20 blur-2xl" />
            <motion.div
              className="grid grid-cols-2 gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { k: "Focus", v: "Cloud Security" },
                { k: "Clouds", v: "AWS · Azure · GCP" },
                { k: "Stack", v: "Detection & IR" },
                { k: "Mode", v: "Building in public" },
              ].map((c) => (
                <motion.div key={c.k} variants={staggerItem} className="rounded-2xl glass p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan/80">
                    {c.k}
                  </p>
                  <p className="mt-2 text-base font-medium">{c.v}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            kicker="Tooling"
            title="Skills & stack"
            sub="The tools I reach for across cloud, detection and offensive labs."
          />
          <div className="mt-10 space-y-10">
            {SKILL_GROUPS.map((group, gi) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: gi * 0.04, ease: easeOutExpo }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {group.label}
                </p>
                <motion.div
                  className="mt-4 flex flex-wrap gap-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
                  }}
                >
                  {group.items.map((s) => (
                    <motion.div
                      key={`${group.label}-${s.name}`}
                      variants={{
                        hidden: { opacity: 0, y: 14, scale: 0.97 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { duration: 0.35, ease: easeOutExpo },
                        },
                      }}
                      className="group flex items-center gap-2.5 rounded-xl glass px-3.5 py-2.5 transition-all hover:-translate-y-0.5 hover:border-cyan/30 hover:shadow-[0_10px_30px_-12px_var(--cyan)]"
                    >
                      <SkillLogo def={s.def} imgProps={{ className: "h-5 w-5 shrink-0" }} />
                      <span className="text-sm text-foreground/90">{s.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            kicker="Credentials"
            title="Certifications"
            sub="In progress and planned for 2025."
          />
          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {CERTS.map((c) => (
              <motion.div
                key={c.name}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-2xl glass p-6"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan/10 blur-3xl transition-opacity group-hover:opacity-100" />
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/15 to-violet/15 ring-1 ring-border">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-cyan">
                      <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {c.date}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                <button className="mt-5 inline-flex items-center gap-1.5 text-xs text-foreground/80 transition-colors hover:text-cyan">
                  Verify
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            kicker="Journey"
            title="Timeline"
            sub="Key milestones along the way."
          />
          <ol className="relative mt-12 border-l border-border pl-8">
            {TIMELINE.map((step, i) => (
              <motion.li
                key={step.y}
                initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: easeOutExpo,
                }}
                className="relative pb-12 last:pb-0"
              >
                <span className="absolute -left-[34px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-background ring-1 ring-cyan/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_var(--cyan)]" />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan/80">
                  {step.y}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  {step.t}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.d}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            kicker="From the lab"
            title="Latest content"
            sub="The newest case studies and labs, fresh off the workbench."
            cta={{ to: "/portfolio", label: "All content →" }}
          />
          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {projects.slice(0, 3).length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                  <motion.div key={i} variants={staggerItem}>
                    <div className="aspect-[4/5] rounded-2xl glass shimmer" />
                  </motion.div>
                ))
              : projects.slice(0, 3).map((p) => (
                  <motion.div key={p.id} variants={staggerItem}>
                    <ProjectCard p={p} />
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  sub,
  cta,
}: {
  kicker: string;
  title: string;
  sub?: string;
  cta?: { to: string; label: string };
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.55, ease: easeOutExpo }}
      >
        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan/80"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: easeOutExpo }}
        >
          {kicker}
        </motion.p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
          {title}
        </h2>
        {sub && (
          <motion.p
            className="mt-3 text-sm leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08, ease: easeOutExpo }}
          >
            {sub}
          </motion.p>
        )}
      </motion.div>
      {cta && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: easeOutExpo }}
        >
          <Link
            to={cta.to}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-cyan/50 hover:text-foreground"
          >
            {cta.label}
          </Link>
        </motion.div>
      )}
    </div>
  );
}
