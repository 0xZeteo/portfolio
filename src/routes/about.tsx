import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedHeading } from "@/components/AnimatedText";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Paul Ayegbusi — Zeteosec" },
      {
        name: "description",
        content:
          "Paul Ayegbusi — security engineer focused on cloud security (AWS, Azure, GCP), detection engineering, and incident response. Building in public as Zeteosec.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-overlay opacity-40" />
      <div className="pointer-events-none fixed inset-x-0 top-24 -z-10 mx-auto h-96 max-w-4xl rounded-full bg-gradient-to-r from-primary/30 via-accent/20 to-primary/25 blur-3xl" />

      <header className="relative px-4 pb-16 pt-36">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan/80">
            About
          </p>
          <AnimatedHeading
            text="Paul Ayegbusi"
            delay={0.05}
            className="mt-4 text-balance text-5xl font-semibold tracking-[-0.04em] sm:text-6xl md:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="mt-4 max-w-2xl font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground"
          >
            Security engineer · Cloud security · Cybersecurity creator
          </motion.p>
        </div>
      </header>

      <section className="relative px-4 pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.15fr_1fr] md:items-start">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-[15px] leading-relaxed text-muted-foreground"
          >
            <p className="text-foreground/95">
              I&apos;m Paul Ayegbusi — a security engineer focused on cloud security,
              detection engineering, and incident response across{" "}
              <span className="text-foreground">AWS, Azure, and GCP</span>. I
              document labs, case studies, and real builds under the{" "}
              <span className="text-foreground">Zeteosec</span> brand.
            </p>
            <p>
              My work sits where cloud-native infrastructure meets telemetry and
              response: IAM and control-plane risk, logging pipelines, detection
              content, and playbooks that shorten time to contain.
            </p>
            <p>
              I learn in public — streams, write-ups, and open repos — so others
              can follow the same path without guessing what “good” looks like in
              a modern security engineering practice.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                View portfolio →
              </Link>
              <a
                href="mailto:hello@zeteosec.com"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm transition-colors hover:border-cyan/50"
              >
                Email
              </a>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="space-y-4"
          >
            {[
              { k: "Focus", v: "Cloud & detection" },
              { k: "Clouds", v: "AWS · Azure · GCP" },
              { k: "Modes", v: "IR, SIEM, DevSecOps" },
              { k: "Brand", v: "Zeteosec (content & streams)" },
            ].map((c) => (
              <div key={c.k} className="rounded-2xl glass p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan/80">
                  {c.k}
                </p>
                <p className="mt-2 text-base font-medium text-foreground">{c.v}</p>
              </div>
            ))}
          </motion.aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
