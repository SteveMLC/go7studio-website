import type { ProjectCategory, ProjectLink, ProjectStatus } from "@/lib/content";

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  live: "Live",
  beta: "Beta",
  "in-development": "In Development",
  "client-work": "Client Work",
  internal: "Internal",
};

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "education-platform": "Education Platform",
  "learning-hub": "Learning Hub",
  "client-platform": "Client Platform",
  "internal-product": "Internal Product",
  "creative-tool": "Creative Tool",
  saas: "SaaS",
};

export function getProjectStatusLabel(status: ProjectStatus) {
  return PROJECT_STATUS_LABELS[status];
}

export function getProjectCategoryLabel(category: ProjectCategory) {
  return PROJECT_CATEGORY_LABELS[category];
}

export function getProjectStatusClasses(status: ProjectStatus) {
  switch (status) {
    case "live":
      return "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30";
    case "beta":
      return "bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30";
    case "client-work":
      return "bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30";
    case "internal":
      return "bg-white/10 text-white/80 ring-1 ring-white/10";
    case "in-development":
    default:
      return "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30";
  }
}

export function getProjectLinkClasses(kind: ProjectLink["kind"]) {
  switch (kind) {
    case "primary":
    case "live":
      return "btn-primary inline-flex items-center justify-center gap-2";
    case "contact":
    case "secondary":
    case "case-study":
    default:
      return "btn-secondary inline-flex items-center justify-center gap-2";
  }
}
