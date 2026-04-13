import Image from "next/image";
import type { ProjectMedia } from "@/lib/content";

function getAspectClass(aspectRatio?: ProjectMedia["aspectRatio"]) {
  switch (aspectRatio) {
    case "4:3":
      return "aspect-[4/3]";
    case "3:2":
      return "aspect-[3/2]";
    case "1:1":
      return "aspect-square";
    case "phone":
      return "aspect-[9/16]";
    case "16:9":
    default:
      return "aspect-video";
  }
}

function isDirectVideo(src: string) {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

function isExternal(url: string) {
  return /^https?:\/\//i.test(url);
}

export function ProjectMediaGallery({ media, title = "Project media" }: { media?: ProjectMedia[]; title?: string }) {
  if (!media?.length) return null;

  return (
    <section className="mt-10">
      <div className="mb-5 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.22em] text-white/45">Media</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {media.map((item) => {
          const aspectClass = getAspectClass(item.aspectRatio);

          return (
            <figure key={`${item.type}:${item.src}`} className="glass-card overflow-hidden p-3">
              <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${aspectClass}`}>
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : item.type === "video" || isDirectVideo(item.src) ? (
                  <video
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    poster={item.poster}
                  >
                    <source src={item.src} />
                  </video>
                ) : (
                  <iframe
                    src={item.src}
                    title={item.alt}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy={isExternal(item.src) ? "strict-origin-when-cross-origin" : undefined}
                    allowFullScreen
                  />
                )}
              </div>
              {item.caption ? <figcaption className="px-2 pb-2 pt-4 text-sm leading-6 text-white/60">{item.caption}</figcaption> : null}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
