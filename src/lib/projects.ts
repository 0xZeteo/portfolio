export type ProjectCategory =
  | "Cloud Security"
  | "Incident Response"
  | "Detection Engineering"
  | "SIEM"
  | "DevSecOps"
  | "Web Security"
  | "Labs"
  | "Research";

export type ProjectStatus = "Completed" | "In Progress" | "Planned";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail?: string; // url or data url
  stack: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  difficulty: Difficulty;
  date: string; // ISO
  featured?: boolean;
  github?: string;
  problem?: string;
  methodology?: string;
  outcomes?: string;
  challenges?: string;
  lessons?: string;
}

const STORAGE_KEY = "zeteo:projects:v1";

const SEED: Project[] = [
  {
    id: "1",
    slug: "aws-incident-response-lab",
    title: "AWS Incident Response Lab",
    description:
      "Built a full IR lab in AWS with CloudTrail, GuardDuty, and automated SOAR-style playbooks for credential compromise.",
    stack: ["AWS", "CloudTrail", "GuardDuty", "Lambda", "Python"],
    category: "Cloud Security",
    status: "Completed",
    difficulty: "Advanced",
    date: "2025-09-12",
    featured: true,
    github: "https://github.com/",
    problem:
      "Detect and contain compromised IAM credentials within minutes across a multi-account AWS organization.",
    methodology:
      "Centralized CloudTrail → S3 → Athena. GuardDuty findings forwarded via EventBridge to a Lambda playbook that disables keys, snapshots EBS, and posts to Slack.",
    outcomes:
      "MTTC reduced from hours to under 4 minutes in lab simulations across 3 attack scenarios.",
  },
  {
    id: "2",
    slug: "siem-detection-pack-windows",
    title: "Windows Detection Pack for Wazuh",
    description:
      "Curated Sigma-to-Wazuh detection ruleset covering credential dumping, lateral movement and persistence.",
    stack: ["Wazuh", "Sigma", "Sysmon", "PowerShell"],
    category: "Detection Engineering",
    status: "Completed",
    difficulty: "Intermediate",
    date: "2025-08-02",
    featured: true,
  },
  {
    id: "3",
    slug: "kubernetes-runtime-security",
    title: "Kubernetes Runtime Security with Falco",
    description:
      "Deployed Falco + Falcosidekick on a k3s cluster with custom rules for crypto-miner and reverse-shell detection.",
    stack: ["Kubernetes", "Falco", "Helm", "Grafana"],
    category: "DevSecOps",
    status: "Completed",
    difficulty: "Advanced",
    date: "2025-07-18",
    featured: true,
  },
  {
    id: "4",
    slug: "phishing-triage-automation",
    title: "Phishing Triage Automation",
    description:
      "Flask + Python service that ingests reported emails, detonates URLs in a sandbox and writes a triage report.",
    stack: ["Python", "Flask", "Docker", "VirusTotal"],
    category: "Incident Response",
    status: "In Progress",
    difficulty: "Intermediate",
    date: "2025-10-01",
  },
  {
    id: "5",
    slug: "elk-home-soc",
    title: "Home SOC on ELK Stack",
    description:
      "End-to-end SOC at home: Beats agents → Logstash → Elasticsearch → Kibana with curated dashboards and alerts.",
    stack: ["ELK", "Beats", "Sigma", "Linux"],
    category: "SIEM",
    status: "Completed",
    difficulty: "Intermediate",
    date: "2025-05-22",
  },
  {
    id: "6",
    slug: "owasp-top10-research",
    title: "OWASP Top 10 — Hands-on Notes",
    description:
      "A long-form research log walking through each OWASP Top 10 category with real labs and remediations.",
    stack: ["BurpSuite", "OWASP", "Docker"],
    category: "Web Security",
    status: "Completed",
    difficulty: "Beginner",
    date: "2025-03-04",
  },
];

function read(): Project[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
      return SEED;
    }
    return JSON.parse(raw) as Project[];
  } catch {
    return SEED;
  }
}

function write(items: Project[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("zeteo:projects:changed"));
}

export const projectStore = {
  list(): Project[] {
    return read().sort((a, b) => +new Date(b.date) - +new Date(a.date));
  },
  get(slug: string): Project | undefined {
    const key = decodeURIComponent(slug ?? "")
      .trim()
      .toLowerCase()
      .replace(/\/$/, "");
    if (!key) return undefined;
    return read().find((p) => p.slug.toLowerCase() === key);
  },
  upsert(p: Project) {
    const all = read();
    const i = all.findIndex((x) => x.id === p.id);
    if (i >= 0) all[i] = p;
    else all.push(p);
    write(all);
  },
  remove(id: string) {
    write(read().filter((p) => p.id !== id));
  },
  reset() {
    write(SEED);
  },
};

export const CATEGORIES: ProjectCategory[] = [
  "Cloud Security",
  "Incident Response",
  "Detection Engineering",
  "SIEM",
  "DevSecOps",
  "Web Security",
  "Labs",
  "Research",
];

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
