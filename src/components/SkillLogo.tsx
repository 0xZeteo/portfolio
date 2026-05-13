import type { ImgHTMLAttributes, ReactElement } from "react";

/** SVGs vendored under `public/icons/simple/` (Simple Icons, MIT). */
function simpleIconUrl(si: string): string {
  const base = import.meta.env.BASE_URL;
  const root = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${root}/icons/simple/${si}.svg`;
}

const SI_SLUGS = new Set([
  "amazonaws",
  "microsoftazure",
  "googlecloud",
  "kubernetes",
  "docker",
  "terraform",
  "splunk",
  "elastic",
  "grafana",
  "wireshark",
  "burpsuite",
  "python",
  "flask",
  "gnubash",
  "git",
  "github",
  "linux",
  "windows",
]);

function WazuhIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <title>Wazuh</title>
      <path
        fill="#00A9E0"
        d="M12 2 3 6.5v11L12 22l9-4.5v-11L12 2zm-1.2 14.1-3.6-6.2 2-.1 1.7 3 1.7-3 2 .1-3.6 6.2h-1.2zm4.9-1.1-1.4-2.4 1.4-2.4 1.4 2.4-1.4 2.4z"
      />
    </svg>
  );
}

function NmapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <title>Nmap</title>
      <circle cx="12" cy="12" r="9" fill="none" stroke="#5A9F3C" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="#5A9F3C" strokeWidth="1.4" opacity="0.85" />
      <path
        fill="#5A9F3C"
        d="M12 5.5c.3 2.2 2.1 4 4.3 4.3-2.2.3-4 2.1-4.3 4.3-.3-2.2-2.1-4-4.3-4.3 2.2-.3 4-2.1 4.3-4.3z"
      />
    </svg>
  );
}

function OpenvasIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <title>OpenVAS</title>
      <path
        fill="#00A651"
        d="M12 2 4 5.8v6.4c0 4.5 3.2 8.7 8 9.8 4.8-1.1 8-5.3 8-9.8V5.8L12 2zm0 3.2 4.9 2.2v4.2c0 1.9-1.1 3.6-2.8 4.4l-.9.4-.9-.4c-1.7-.8-2.8-2.5-2.8-4.4V7.4L12 5.2z"
      />
    </svg>
  );
}

function MetasploitIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <title>Metasploit</title>
      <path
        fill="#2596BE"
        d="M6 4h7c3.3 0 6 2.7 6 6s-2.7 6-6 6h-3v4H6V4zm7 8.2c1.2 0 2.2-1 2.2-2.2 0-1.2-1-2.2-2.2-2.2H9.8v4.4H13z"
      />
    </svg>
  );
}

const CUSTOM: Record<string, (p: { className?: string }) => ReactElement> = {
  wazuh: WazuhIcon,
  nmap: NmapIcon,
  openvas: OpenvasIcon,
  metasploit: MetasploitIcon,
};

export type SkillIconDef =
  | { kind: "si"; si: string }
  | { kind: "custom"; id: keyof typeof CUSTOM };

export function SkillLogo({
  def,
  imgProps,
}: {
  def: SkillIconDef;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
}) {
  const cls = imgProps?.className ?? "h-5 w-5";

  if (def.kind === "custom") {
    const Cmp = CUSTOM[def.id];
    return Cmp ? <Cmp className={cls} /> : null;
  }

  if (!SI_SLUGS.has(def.si)) return null;

  return (
    <img
      src={simpleIconUrl(def.si)}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
      {...imgProps}
      className={cls}
    />
  );
}
