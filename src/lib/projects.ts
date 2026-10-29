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
  thumbnail?: string;
  stack: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  difficulty: Difficulty;
  date: string;
  featured?: boolean;
  github?: string;
  problem?: string;
  methodology?: string;
  outcomes?: string;
  challenges?: string;
  lessons?: string;
  highlights?: string[];
}

const STORAGE_KEY = "zeteo:projects:v1";

export const PROJECTS: Project[] = [
  {
    id: "iam-least-privilege",
    slug: "iam-least-privilege-generator",
    title: "IAM Least-Privilege Generator",
    description:
      "A Python tool that turns CloudTrail activity into a minimal IAM policy and deployable Terraform — replacing broad AWS admin permissions with evidence-based least privilege.",
    longDescription:
      "This project tackles the most common cloud security issue: over-privileged IAM roles. It reads CloudTrail activity, maps real API usage to AWS actions and resources, and emits a policy that removes unnecessary access while preserving business functionality.",
    stack: ["AWS", "IAM", "CloudTrail", "Python", "Terraform"],
    category: "Cloud Security",
    status: "Completed",
    difficulty: "Advanced",
    date: "2026-10-29",
    featured: true,
    github: "https://github.com/0xZeteo/iam-least-privilege",
    problem:
      "IAM roles are often attached to managed policies like AmazonS3FullAccess or AmazonEC2FullAccess, creating a huge blast radius when a workload is compromised. The issue is not just access breadth — it is the lack of resource-aware, evidence-based policy design.",
    methodology:
      "The tool ingests CloudTrail logs, filters the role's actual usage, maps actions to IAM resources, and builds a minimal policy based on observed behavior. The generated Terraform output is then validated against AWS policy simulation so allowed and denied actions are explicit.",
    outcomes:
      "The lab reduced a role from roughly 400 permissions to 4 validated actions while preserving the necessary operations. It proved that least privilege can retain real workload function without allowing destructive actions like bucket deletion, EC2 launch, or admin user creation.",
    lessons:
      "Real least privilege is not just about removing actions; it is about proving the role still works in production-like conditions. Resource scoping and action validation matter just as much as permission minimization.",
    highlights: [
      "Reduced a role from ~400 actions to 4",
      "Built deployable Terraform from real CloudTrail usage",
    ],
  },
  {
    id: "devsecops-pipeline",
    slug: "devsecops-ci-cd-security-pipeline",
    title: "DevSecOps CI/CD Security Pipeline",
    description:
      "A GitHub Actions pipeline that blocks secrets leaks, vulnerable code, insecure IaC, and container CVEs before deployment — shifting security left into the delivery process.",
    longDescription:
      "This project automates security checks across the delivery lifecycle. Each push and PR triggers a multi-stage pipeline that enforces secrets scanning, static analysis, infrastructure validation, and dependency/container risk checks before anything reaches production.",
    stack: ["GitHub Actions", "Gitleaks", "Semgrep", "Checkov", "Trivy", "Docker"],
    category: "DevSecOps",
    status: "Completed",
    difficulty: "Intermediate",
    date: "2026-05-20",
    featured: true,
    github: "https://github.com/0xZeteo/devsecops-pipeline-project",
    problem:
      "Security findings were showing up too late in the lifecycle, after code had already been merged and sometimes deployed. The goal was to move detection earlier and make reproduction and remediation cheaper for engineering teams.",
    methodology:
      "The pipeline stages secrets scanning, SAST, IaC validation, and container security checks as enforceable gates. Issues feed into GitHub automation and Slack alerts, ensuring risky changes fail fast with a clear remediation path.",
    outcomes:
      "The project demonstrates a practical shift-left engineering workflow: code fails early, containers are checked before deploy, and misconfigurations are identified before they become production incidents.",
    lessons:
      "Automation is only useful when it creates a clear action loop. Security tooling must be fast, understandable, and integrated into the same workflow developers already use.",
    highlights: [
      "Built a four-stage security gate for every PR",
      "Catches secrets, IaC issues, SAST findings and CVEs early",
    ],
  },
  {
    id: "osint-simulator",
    slug: "osint-simulator",
    title: "OSINT Simulator",
    description:
      "A structured reconnaissance simulator for learning how open-source intelligence is gathered, verified, and turned into actionable investigation findings.",
    longDescription:
      "This project turns OSINT into a repeatable learning workflow. It focuses on how digital investigators collect data from open sources, evaluate source quality, connect clues, and build reliable conclusions without violating ethical or legal boundaries.",
    stack: ["OSINT", "Python", "Security Research", "Linux", "Automation"],
    category: "Research",
    status: "Completed",
    difficulty: "Intermediate",
    date: "2026-10-07",
    featured: true,
    github: "https://github.com/0xZeteo/OSINT-SIMULATOR",
    problem:
      "OSINT education is often fragmented and theoretical. Learners need a workflow that explains not only what information can be found, but how to validate trust, distinguish noise from signal, and connect clues into a meaningful case narrative.",
    methodology:
      "The simulator emphasizes realistic investigative flow: source collection, correlation, triage, and confidence assessment. It is designed to teach the difference between raw public data and usable intelligence.",
    outcomes:
      "The project creates a safe and repeatable environment to learn digital investigation tradecraft while reinforcing source validation, ethical collection, and structured reasoning.",
    lessons:
      "OSINT is not just data collection; it is disciplined interpretation. The value comes from reliability, context, and careful investigation, not simply gathering more results.",
    highlights: [
      "Built a structured investigation workflow around source validation",
      "Emphasizes ethical collection and intelligence reliability",
    ],
  },
  {
    id: "cloud-incident-response",
    slug: "cloud-incident-response-breach-simulation",
    title: "Cloud Incident Response & Breach Simulation",
    description:
      "A simulated AWS breach exercise using Stratus Red Team and native cloud telemetry to teach detection, investigation, and containment for real-world security events.",
    longDescription:
      "This project models a cloud breach end-to-end using AWS logging and detection controls. It shows how attackers abuse identities and services, then compares that against what defenders can actually see in CloudTrail, GuardDuty, and Security Hub.",
    stack: ["AWS", "CloudTrail", "GuardDuty", "Security Hub", "Stratus Red Team"],
    category: "Incident Response",
    status: "Completed",
    difficulty: "Advanced",
    date: "2026-05-23",
    featured: true,
    github: "https://github.com/0xZeteo/-cloud-incident-response",
    problem:
      "Cloud attacks can be stealthy and difficult to investigate if defenders do not understand logging, detection coverage, and triage workflow. A breach can create noise without creating clarity unless the response path is well designed.",
    methodology:
      "Attack scenarios are executed against controlled AWS workloads while telemetry is monitored. Findings are reviewed to determine what was visible, what was missed, and how detection gaps affect response quality.",
    outcomes:
      "The project demonstrates that cloud visibility is necessary but not sufficient. Strong logging matters, but layered detection and response processes are what turn forensics into action.",
    lessons:
      "Defenders need both telemetry and operational clarity. A platform can log activity correctly and still fail to support a strong response unless analysts know how to investigate and contain the event quickly.",
    highlights: [
      "Simulated AWS attack paths and documented response gaps",
      "Focused on forensic visibility, detecion gaps and containment",
    ],
  },
  {
    id: "kubernetes-admission-security-lab",
    slug: "kubernetes-admission-controller-security-lab",
    title: "Kubernetes Admission Controller Security Lab",
    description:
      "A hands-on Kubernetes security lab using Kyverno and an external webhook to block insecure pod configurations, root containers, and unapproved images before deployment.",
    longDescription:
      "This lab explores shift-left enforcement in Kubernetes. Instead of allowing insecure workloads to reach production, policy checks intercept workloads during admission and deny those that violate security rules like root execution, unpinned image tags, or host networking.",
    stack: ["Kubernetes", "Kyverno", "Python", "Flask", "Docker", "kind"],
    category: "Labs",
    status: "Completed",
    difficulty: "Advanced",
    date: "2026-05-22",
    featured: true,
    github: "https://github.com/0xZeteo/Kubernetes-Admission-Controller-Security-Lab",
    problem:
      "Kubernetes misconfigurations are frequent and can quietly expand the attack surface. Insecure workloads often make it into clusters because the platform allows them to reach execution without enforcement at the API layer.",
    methodology:
      "The lab combines built-in Kyverno policies with a custom Python webhook for image allowlisting. It utilizes a local kind cluster to show how admission control can enforce security policy before pods are created.",
    outcomes:
      "The project proves that access control in Kubernetes can be moved earlier in the lifecycle. Insecure workloads are blocked before deployment, reducing operational risk and creating a stronger security baseline.",
    lessons:
      "Policy-as-code is not just a compliance feature; it is a core platform control. The value shows up when security requirements are enforced automatically and consistently across all workloads.",
    highlights: [
      "Denied insecure pods before they reached the cluster",
      "Combined Kyverno policies with a custom allowlist webhook",
    ],
  },
  {
    id: "avams",
    slug: "automated-vulnerability-assessment-system",
    title: "Automated Vulnerability Assessment & Management System",
    description:
      "A Python-driven assessment system that automates scanning, parsing, triage, reporting, and dashboarding for vulnerability management in a simulated fintech environment.",
    longDescription:
      "This project automates the full vulnerability assessment lifecycle: it launches OpenVAS/GVM scans, extracts and classifies findings by severity, produces a formal PDF report, and surfaces results in a dashboard for stakeholders to review and act on.",
    stack: ["Python", "GVM", "OpenVAS", "Flask", "ReportLab", "VMware"],
    category: "Cloud Security",
    status: "Completed",
    difficulty: "Advanced",
    date: "2026-08-30",
    featured: true,
    github: "https://github.com/0xZeteo/Automated-Vulnerability-Assessment-and-Management-System",
    problem:
      "Manual vulnerability assessments are slow, repetitive, and inconsistent. Large scan outputs are difficult to interpret without a workflow that normalizes them into remediation-ready, stakeholder-friendly reporting.",
    methodology:
      "The project chains scan execution, parsing, severity classification, and PDF generation into one workflow. A Flask dashboard provides filtering and drilldown views so findings become easier to understand and prioritize.",
    outcomes:
      "The assessment generated 713 results in a simulated fintech environment, including a substantial number of critical findings, showing how automation can compress assessment cycles while improving consistency and documentation quality.",
    lessons:
      "The strongest value of a vulnerability workflow is not the scan itself — it is converting raw data into prioritized, evidence-backed decisions. That is what turns security tooling into operational value.",
    highlights: [
      "Generated 713 findings across a simulated fintech stack",
      "Combined scanning, reporting and dashboarding in one workflow",
    ],
  },
];

const SEED: Project[] = PROJECTS;

function read(): Project[] {
  if (typeof window === "undefined") return SEED;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
      return SEED;
    }

    const parsed = JSON.parse(raw) as Project[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
      return SEED;
    }

    return parsed;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
    return SEED;
  }
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event("zeteo:projects:changed"));
  },
  remove(id: string) {
    const next = read().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("zeteo:projects:changed"));
  },
  reset() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
    window.dispatchEvent(new Event("zeteo:projects:changed"));
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
