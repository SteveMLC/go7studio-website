export const SCHEMA_IDS = {
  ORG: "https://go7studio.com/#org",
  WEBSITE: "https://go7studio.com/#website",
  GAMES_LIST: "https://go7studio.com/games/#list",
} as const;

export const SITE_URL = "https://go7studio.com";

type SchemaNode = Record<string, unknown>;

type BreadcrumbItem = {
  name: string;
  url: string;
};

function absoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export function getOrganizationSchema(): SchemaNode {
  return {
    "@type": ["Organization", "Corporation"],
    "@id": SCHEMA_IDS.ORG,
    name: "Go7Studio",
    legalName: "Go7Studio LLC",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/branding/go7studio-logo-square.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/images/branding/go7studio-logo-square.png`,
    description: "Indie game development studio creating fun-first mobile and Roblox games with satisfying progression, delightful polish, and replayable worlds.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Stephen",
      url: "https://x.com/Steve_mlc",
    },
    sameAs: [
      "https://www.youtube.com/@go7studio",
      "https://x.com/Go7Studio",
      "https://x.com/Steve_mlc",
      "https://discord.gg/go7studio",
      "https://github.com/SteveMLC",
    ],
    knowsAbout: [
      "Mobile Game Development",
      "Flutter Development", 
      "Roblox Game Development",
      "Idle Games",
      "Tycoon Games",
      "Game Monetization",
      "User Experience Design",
    ],
    slogan: "We build playful products that feel polished.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${SITE_URL}/contact`,
      availableLanguage: "English",
    },
  };
}

export function getWebsiteSchema(): SchemaNode {
  return {
    "@type": "WebSite",
    "@id": SCHEMA_IDS.WEBSITE,
    url: SITE_URL,
    name: "Go7Studio",
    publisher: { "@id": SCHEMA_IDS.ORG },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getWebPageSchema(
  url: string,
  name: string,
  mainEntityId?: string,
): SchemaNode {
  const pageUrl = absoluteUrl(url);
  const pageSchema: SchemaNode = {
    "@type": "WebPage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name,
    isPartOf: { "@id": SCHEMA_IDS.WEBSITE },
  };

  if (mainEntityId) {
    pageSchema.about = { "@id": mainEntityId };
    pageSchema.mainEntity = { "@id": mainEntityId };
  }

  return pageSchema;
}

export function getBreadcrumbListSchema(items: BreadcrumbItem[]): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function createSchemaGraph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
