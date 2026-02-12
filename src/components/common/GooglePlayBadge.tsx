import Image from "next/image";

type GooglePlayBadgeProps = {
  href: string;
  className?: string;
};

export function GooglePlayBadge({ href, className = "" }: GooglePlayBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on Google Play"
      className={`inline-flex rounded-xl transition duration-200 hover:-translate-y-0.5 hover:drop-shadow-[0_12px_28px_rgba(56,189,248,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky/60 ${className}`}
    >
      <Image
        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
        alt="Get it on Google Play"
        width={646}
        height={250}
        className="h-16 w-auto"
      />
    </a>
  );
}
