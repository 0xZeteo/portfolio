import { SOCIALS } from "./SocialIcons";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative mt-32 border-t border-border bg-gradient-to-b from-transparent to-muted/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/80">
              Get in touch
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-gradient">
              Open to internships, collaborations & startup security roles.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Reach out for cloud security work, detection engineering, or to
              collaborate on a public learning stream.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:hello@paulayegbusi.com"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                Email me →
              </a>
              <a
                href={SOCIALS[0].href}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm transition-colors hover:border-foreground/20"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-cyan/50 hover:text-foreground hover:shadow-[0_0_24px_-4px_var(--cyan)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p className="font-mono">© {new Date().getFullYear()} Zeteosec — built in public.</p>
          <p className="font-mono">Cloud Security • Detection • Incident Response</p>
        </div>
      </div>
    </footer>
  );
}
