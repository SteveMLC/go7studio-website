import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/content";

export const runtime = "nodejs";
export const alt = "Go7Studio AI Lab post";
export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPostBySlug(params.slug);
  const title = post?.title ?? "Go7Studio AI Lab";
  const pillar = (post?.pillar ?? "AI Lab").toUpperCase();
  const isAiLab = pillar.toLowerCase().includes("ai lab");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B0F1A",
          backgroundImage:
            "radial-gradient(ellipse at top right, rgba(232, 121, 249, 0.18) 0%, transparent 55%), radial-gradient(ellipse at bottom left, rgba(59, 130, 246, 0.18) 0%, transparent 55%), radial-gradient(ellipse at center, rgba(251, 146, 60, 0.10) 0%, transparent 70%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#FFFFFF",
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 22px",
              borderRadius: 999,
              background: isAiLab ? "rgba(49, 151, 149, 0.18)" : "rgba(255, 255, 255, 0.08)",
              border: `1px solid ${isAiLab ? "rgba(49, 151, 149, 0.55)" : "rgba(255, 255, 255, 0.15)"}`,
              fontSize: 22,
              letterSpacing: 4,
              fontWeight: 600,
              color: isAiLab ? "#5EEAD4" : "#E5E7EB",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: isAiLab ? "#5EEAD4" : "#FB923C",
              }}
            />
            {pillar}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 80 ? 56 : 64,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: -1,
            color: "#FFFFFF",
            maxWidth: "100%",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background:
                  "linear-gradient(135deg, #E879F9 0%, #FB923C 50%, #3B82F6 100%)",
              }}
            />
            Go7Studio
          </div>
          <div style={{ fontSize: 22, color: "#94A3B8", letterSpacing: 0.5 }}>
            go7studio.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
