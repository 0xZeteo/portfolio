import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/about", label: "About" },
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <div
          className={`flex items-center justify-between gap-6 rounded-full px-4 py-2 transition-all duration-300 ${
            scrolled ? "glass-strong w-full" : "w-full"
          }`}
        >
          <Link to="/" className="group flex items-center gap-2">
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan/25 to-violet/25 ring-1 ring-border">
              <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_2px_var(--cyan)]" />
            </span>
            <span className="font-mono text-sm tracking-tight text-foreground">
              Zeteo<span className="text-cyan">sec</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground bg-muted/70" }}
                activeOptions={{ exact: l.to === "/" || l.to === "/about" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="/#contact"
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </a>
          </nav>
          <a
            href="mailto:hello@zeteosec.com"
            className="hidden rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-cyan/50 hover:text-foreground md:inline-flex"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
