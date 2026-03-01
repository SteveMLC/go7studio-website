import type { Metadata } from "next";
import { InsightsDashboard } from "@/components/insights/InsightsDashboard";

export const metadata: Metadata = {
  title: "Engineering Insights",
  description: "Live GitHub activity visualization for Go7Studio engineering work.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <section className="container-px py-10">
      <InsightsDashboard />
    </section>
  );
}
