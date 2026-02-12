import { getGameBySlug } from "@/lib/games";
import { getGameStructuredData } from "@/components/seo/GameStructuredData";

type HeadProps = {
  params: { slug: string };
};

export default function Head({ params }: HeadProps) {
  const game = getGameBySlug(params.slug);

  if (!game) return null;

  const { applicationSchema, videoSchema } = getGameStructuredData(game);

  return (
    <>
      <script
        id={`${game.slug}-application-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(applicationSchema),
        }}
      />
      {videoSchema ? (
        <script
          id={`${game.slug}-video-jsonld`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoSchema),
          }}
        />
      ) : null}
    </>
  );
}
