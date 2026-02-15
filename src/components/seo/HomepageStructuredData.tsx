import { GAMES } from "@/lib/games";
import {
  createSchemaGraph,
  getBreadcrumbListSchema,
  SITE_URL,
  SCHEMA_IDS,
} from "@/lib/schema";

/**
 * Homepage-specific structured data
 * Note: Organization and WebSite are in root layout
 * This adds: ItemList (games), FAQPage, CollectionPage
 */
export function getHomepageStructuredData() {
  const breadcrumbs = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
  ]);

  // ItemList of games - shows as carousel in search results
  const gamesList = {
    "@type": "ItemList",
    "@id": SCHEMA_IDS.GAMES_LIST,
    name: "Go7Studio Games",
    description: "Games and apps developed by Go7Studio",
    numberOfItems: GAMES.length,
    itemListElement: GAMES.map((game, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: game.title,
      url: `${SITE_URL}/games/${game.slug}`,
      image: game.thumbnail.startsWith("http") ? game.thumbnail : `${SITE_URL}${game.thumbnail}`,
      item: {
        "@type": game.platforms.includes("android") ? "MobileApplication" : "SoftwareApplication",
        name: game.title,
        description: game.description,
        applicationCategory: "GameApplication",
        operatingSystem: game.platforms.includes("android") ? "Android" : "Web",
        url: `${SITE_URL}/games/${game.slug}`,
        offers: game.status === "released"
          ? {
              "@type": "Offer",
              price: 0,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            }
          : {
              "@type": "Offer",
              availability: "https://schema.org/PreOrder",
            },
      },
    })),
  };

  // CollectionPage for homepage
  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/#page`,
    url: SITE_URL,
    name: "Go7Studio - Game Development Studio & Consulting",
    description: "Go7Studio builds fun-first mobile and Roblox games with satisfying progression and juicy polish. Expert game development consulting for indie studios.",
    isPartOf: { "@id": SCHEMA_IDS.WEBSITE },
    about: { "@id": SCHEMA_IDS.ORG },
    mainEntity: { "@id": SCHEMA_IDS.GAMES_LIST },
    breadcrumb: breadcrumbs,
  };

  // FAQPage for common questions (helps with featured snippets)
  const faqPage = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What games does Go7Studio make?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Go7Studio creates mobile idle/tycoon games like Empire Tycoon for Android, and Roblox experiences like Pet Paradise and SlimeSlip. We focus on satisfying progression, polished UX, and replayable gameplay loops.",
        },
      },
      {
        "@type": "Question",
        name: "Does Go7Studio offer game development consulting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Go7Studio offers consulting services including game design, Flutter mobile development, Roblox development, monetization strategy, and MVP prototyping for indie studios and creators.",
        },
      },
      {
        "@type": "Question",
        name: "What is Empire Tycoon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Empire Tycoon is a free-to-play idle business simulation game for Android. Build businesses, automate income, invest in real estate, and scale from a small shop to a business empire. Available on Google Play.",
        },
      },
    ],
  };

  return createSchemaGraph(
    collectionPage,
    gamesList,
    faqPage,
    breadcrumbs,
  );
}

export function HomepageStructuredData() {
  const schemaData = getHomepageStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}
