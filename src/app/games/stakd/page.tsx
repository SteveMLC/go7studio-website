import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sortbloom - Zen Block Puzzle | Go7Studio",
  robots: {
    index: false,
    follow: true,
  },
};

export default function StakdRedirect() {
  redirect("/games/sortbloom");
}
