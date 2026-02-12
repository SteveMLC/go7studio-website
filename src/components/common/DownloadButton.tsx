import { Download } from "lucide-react";

type DownloadButtonProps = {
  href: string;
  label: string;
  className?: string;
};

export function DownloadButton({ href, label, className = "" }: DownloadButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-8 py-4 text-base font-semibold text-ink-950 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(45,212,191,0.32)] hover:animate-pulse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky/60 ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg, #2DD4BF 0%, #38BDF8 100%)",
      }}
    >
      <Download className="h-5 w-5" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
