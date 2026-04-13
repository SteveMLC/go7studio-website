import { GAMES } from "@/lib/games";
import { getFeaturedProjects } from "@/lib/content";
import {
  createSchemaGraph,
  getBreadcrumbListSchema,
  SITE_URL,
  SCHEMA_IDS,
} from "@/lib/schema";

export function getHomepageStructuredData() {
  const breadcrumbs = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
  ]);

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

  const featuredProjects = getFeaturedProjects();
  const projectsList = {
    "@type": "ItemList",
    "@id": SCHEMA_IDS.PROJECTS_LIST,
    name: "Go7Studio Projects",
    description: "Non-game digital products and learning platforms built by Go7Studio",
    numberOfItems: featuredProjects.length,
    itemListElement: featuredProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: `${SITE_URL}/projects/${project.slug}`,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.excerpt,
        applicationCategory: project.category,
        operatingSystem: project.platforms?.join(", ") || "Web",
        url: `${SITE_URL}/projects/${project.slug}`,
      },
    })),
  };

  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/#page`,
    url: SITE_URL,
    name: "Go7Studio - Game Development Studio & Consulting",
    description: "Go7Studio builds fun-first mobile and Roblox games with satisfying progression and juicy polish, plus polished digital product work for serious learning experiences.",
    isPartOf: { "@id": SCHEMA_IDS.WEBSITE },
    about: { "@id": SCHEMA_IDS.ORG },
    mainEntity: { "@id": SCHEMA_IDS.GAMES_LIST },
    breadcrumb: breadcrumbs,
    hasPart: [{ "@id": SCHEMA_IDS.GAMES_LIST }, { "@id": SCHEMA_IDS.PROJECTS_LIST }],
  };

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
          text: "Yes! Go7Studio offers consulting services including game design, Flutter mobile development, Roblox development, monetization strategy, MVP prototyping, and product-oriented UX work for digital experiences.",
        },
      },
      {
        "@type": "Question",
        name: "What kinds of projects does Go7Studio build besides games?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Go7Studio also showcases non-game digital product work, including learning platforms and course-delivery experiences with strong UX, content structure, and accessibility-minded polish.",
        },
      },
    ],
  };

  return createSchemaGraph(
    collectionPage,
    gamesList,
    projectsList,
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
