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
    id: "iam-least-privilege",
    slug: "iam-least-privilege-generator",
    title: "IAM Least-Privilege Generator",
    description:
      "Python CLI that analyzes CloudTrail activity and generates a hardened, least-privilege IAM policy plus Terraform for deployment.",
    longDescription:
      "This project addresses one of the most common cloud security findings: over-privileged IAM roles. The tool reads CloudTrail logs, maps actual role activity to IAM actions, and generates a minimal policy that keeps only the permissions the workload actually needs.",
    stack: ["AWS", "IAM", "CloudTrail", "Python", "Terraform"],
    category: "Cloud Security",
    status: "Completed",
    difficulty: "Advanced",
    date: "2026-10-29",
    featured: true,
    github: "https://github.com/0xZeteo/iam-least-privilege",
    problem:
      "IAM roles are commonly attached to broad managed policies such as AmazonS3FullAccess or AmazonEC2FullAccess, expanding attack surface and breaking least-privilege principles.",
    methodology:
      "The workflow ingests CloudTrail log data, extracts the role's actual API calls, maps those calls to IAM action/resource combinations, and emits a minimal policy plus Terraform for deployment. Policy simulation is used to validate what remains allowed versus denied.",
    outcomes:
      "The lab reduced a role from roughly 400 actions to 4 validated actions, proving that the generated policy preserved required functionality while blocking dangerous permissions like bucket deletion, EC2 launches, and admin user creation.",
    lessons:
      "The biggest lesson was that AWS policy simulation and resource scoping matter just as much as action minimization. In IAM, not all actions can be narrowed by resource, and real-world least privilege requires validating both action scope and the actual route used by the workload.",
  },
  {
    id: "devsecops-pipeline",
    slug: "devsecops-ci-cd-security-pipeline",
    title: "DevSecOps CI/CD Security Pipeline",
    description:
      "A GitHub Actions security pipeline that catches leaked secrets, vulnerable code, IaC misconfigurations, and container CVEs before deployment.",
    longDescription:
      "This project implements a shift-left security model in CI/CD. Every push and PR triggers a multi-stage pipeline that fails fast when secrets, weaknesses, or insecure infrastructure are introduced.",
    stack: ["GitHub Actions", "Gitleaks", "Semgrep", "Checkov", "Trivy", "Docker"],
    category: "DevSecOps",
    status: "Completed",
    difficulty: "Intermediate",
    date: "2026-05-20",
    featured: true,
    github: "https://github.com/0xZeteo/devsecops-pipeline-project",
    problem:
      "Security issues were being discovered too late in the lifecycle, after code had already been merged and sometimes deployed. The goal was to enforce controls earlier and stop insecure changes before they reached production.",
    methodology:
      "The pipeline is staged as secrets scanning, SAST, IaC validation, and container vulnerability checks. Each stage must pass before deployment proceeds, and findings can be automatically surfaced as GitHub issues or Slack notifications.",
    outcomes:
      "The project demonstrated how to embed automated security checks directly into developer workflows, creating a repeatable gate that blocks risky commits and elevates security as part of delivery instead of a separate final step.",
    lessons:
      "A good pipeline is not just a set of scanners; it needs clear ownership, useful reporting, and policies that prevent failures from becoming blockers to development velocity. Making the security checks actionable is as important as making them automated.",
  },
  {
    id: "osint-simulator",
    slug: "osint-simulator",
    title: "OSINT Simulator",
    description:
      "A training-focused OSINT simulator designed to model reconnaissance workflows, evidence gathering, and investigation decision-making.",
    longDescription:
      "This project brings OSINT practice into a structured lab environment where the user can explore how digital investigation workflows are built, how information is correlated, and how open-source intelligence is used to form conclusions without overstepping ethical and legal boundaries.",
    stack: ["OSINT", "Python", "Security Research", "Linux", "Automation"],
    category: "Research",
    status: "Completed",
    difficulty: "Intermediate",
    date: "2026-10-07",
    featured: true,
    github: "https://github.com/0xZeteo/OSINT-SIMULATOR",
    problem:
      "OSINT learning is often theoretical and fragmented. The project aims to make reconnaissance workflows more structured, repeatable, and easier to learn through hands-on simulation.",
    methodology:
      "The simulator focuses on realistic investigation flows, emphasizing data collection, source validation, pattern recognition, and the difference between raw information and actionable intelligence.",
    outcomes:
      "The project creates a safe learning environment for understanding how open-source intelligence is assembled and interpreted while reinforcing the importance of responsible collection practices and source verification.",
    lessons:
      "The key lesson is that intelligence quality depends as much on validation and context as it does on collecting data. Useful OSINT is not just about finding information; it is about proving relevance, accuracy, and reliability.",
  },
  {
    id: "cloud-incident-response",
    slug: "cloud-incident-response-breach-simulation",
    title: "Cloud Incident Response & Breach Simulation",
    description:
      "A simulated AWS breach exercise using Stratus Red Team, CloudTrail, GuardDuty, and Security Hub to test detection, logging, and incident handling.",
    longDescription:
      "This project demonstrates how attackers can abuse cloud identities and services, and how defenders can detect and respond to those behaviors with native AWS telemetry and detection services.",
    stack: ["AWS", "CloudTrail", "GuardDuty", "Security Hub", "Stratus Red Team"],
    category: "Incident Response",
    status: "Completed",
    difficulty: "Advanced",
    date: "2026-05-23",
    featured: true,
    github: "https://github.com/0xZeteo/-cloud-incident-response",
    problem:
      "Cloud attacks can be stealthy and difficult to investigate if logging and detection coverage are weak or poorly understood. The exercise highlights where detection gaps appear and how those gaps affect response quality.",
    methodology:
      "Attack scenarios were executed using Stratus Red Team against AWS workloads while CloudTrail and GuardDuty were monitored. Findings were reviewed to assess what was visible, what was missed, and how incident response workflows should be adjusted.",
    outcomes:
      "The project showed that CloudTrail can provide strong forensic visibility, but detections may still be incomplete without thoughtful analytics and response playbooks. It also identified the need for manual triage and layered security controls.",
    lessons:
      "A cloud breach can succeed even when the platform logs activity correctly if the org lacks strong detection and triage workflows. Visibility alone is not enough; responders need detection logic, context, and a clear containment process.",
  },
  {
    id: "kubernetes-admission-security-lab",
    slug: "kubernetes-admission-controller-security-lab",
    title: "Kubernetes Admission Controller Security Lab",
    description:
      "A hands-on Kubernetes security lab using Kyverno and an external validation webhook to block insecure pod configurations and unapproved images.",
    longDescription:
      "This lab explores admission control as a shift-left security control in Kubernetes. Instead of allowing insecure workloads to reach production, policies intercept workloads before they are created and enforce requirements such as verified image tags and non-root runtime settings.",
    stack: ["Kubernetes", "Kyverno", "Python", "Flask", "Docker", "kind"],
    category: "Labs",
    status: "Completed",
    difficulty: "Advanced",
    date: "2026-05-22",
    featured: true,
    github: "https://github.com/0xZeteo/Kubernetes-Admission-Controller-Security-Lab",
    problem:
      "Common Kubernetes misconfigurations such as using the latest tag, running containers as root, or allowing host networking can increase attack surface and make workloads harder to secure.",
    methodology:
      "The lab uses Kyverno policies for built-in policy checks and a custom Python Flask webhook for image allowlisting decisions, giving a practical demonstration of policy-as-code enforcement in a local kind cluster.",
    outcomes:
      "The project proved the value of admission control as a preventive control layer, demonstrating that insecure pods can be blocked before deployment. It also highlighted the importance of handling webhook and content-type edge cases in real environments.",
    lessons:
      "Policy-as-code is one of the strongest patterns in Kubernetes security, but it requires operational care. A policy can block the wrong things if it is too broad, and a webhook can become a bottleneck if not designed with reliability and trust boundaries in mind.",
  },
  {
    id: "avams",
    slug: "automated-vulnerability-assessment-system",
    title: "Automated Vulnerability Assessment & Management System",
    description:
      "A Python-based vulnerability assessment pipeline that scans with GVM/OpenVAS, parses findings, generates PDF reports, and exposes a dashboard for review.",
    longDescription:
      "This final-year style project automates the full vulnerability assessment workflow: scan targets, classify findings by severity, generate a formal report, and visualize results in a dashboard for easier triage and remediation planning.",
    stack: ["Python", "GVM", "OpenVAS", "Flask", "ReportLab", "VMware"],
    category: "Cloud Security",
    status: "Completed",
    difficulty: "Advanced",
    date: "2026-08-30",
    featured: true,
    github: "https://github.com/0xZeteo/Automated-Vulnerability-Assessment-and-Management-System",
    problem:
      "Manual vulnerability assessments are slow, repetitive, and inconsistent. Large scan results are hard to interpret without a structured reporting and triage workflow.",
    methodology:
      "The project automates scanning with GVM/OpenVAS, extracts findings into a structured model, classifies them by CVSS severity, and generates a PDF that can be shared with stakeholders. A Flask dashboard provides live findings and filtering for the assessment team.",
    outcomes:
      "The case study produced a full assessment against a simulated fintech infrastructure, generating 713 findings and showing how automation can shorten assessment cycles while improving consistency and documentation.",
    lessons:
      "Automation pays off most when it turns raw scan output into decision-ready insight. The real value is not just the scan itself; it is the ability to convert findings into remediation priorities and evidence-backed reports.",
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
