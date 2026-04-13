import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { ProjectLink } from "@/lib/content";
import { getProjectLinkClasses } from "./projectMeta";

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

export function ProjectCtaBand({
  heading,
  description,
  primaryLink,
  secondaryLink,
}: {
  heading: string;
  description: string;
  primaryLink?: ProjectLink;
  secondaryLink?: ProjectLink;
}) {
  return (
    <section className="mt-12">
      <div className="glass-card overflow-hidden p-8 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_auto] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-white/45">Next step</p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{heading}</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/70">{description}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            {[primaryLink, secondaryLink].filter(Boolean).map((link) => {
              if (!link) return null;
              const icon = isExternal(link.href) ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />;

              return isExternal(link.href) ? (
                <a
                  key={`${link.kind}:${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={getProjectLinkClasses(link.kind)}
                >
                  {link.label}
                  {icon}
                </a>
              ) : (
                <Link key={`${link.kind}:${link.href}`} href={link.href} className={getProjectLinkClasses(link.kind)}>
                  {link.label}
                  {icon}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
