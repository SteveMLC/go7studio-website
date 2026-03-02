export function HowToSchema({ title, steps }: { title: string; steps: string[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    step: steps.map((text) => ({ "@type": "HowToStep", text })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
