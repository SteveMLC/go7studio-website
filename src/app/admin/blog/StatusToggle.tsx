"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type Status = "draft" | "published";

interface Props {
  slug: string;
  status: string;
}

export function StatusToggle({ slug, status }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = (status as Status) ?? "draft";
  const next: Status = current === "published" ? "draft" : "published";
  const buttonLabel = pending
    ? "Working…"
    : current === "published"
      ? "Unpublish"
      : "Publish now";

  async function flip() {
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blog/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, newStatus: next }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? `Status ${res.status}`);
      }
      // Wait briefly so the writer has time to merge, then refresh.
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Flip failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={flip}
        disabled={pending}
        className="inline-flex items-center gap-1.5 rounded-md border border-brand-teal/40 bg-brand-teal/10 px-3 py-1.5 text-xs font-medium text-[#5eead4] transition hover:bg-brand-teal/20 disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
        {buttonLabel}
      </button>
      {error ? <p className="text-[11px] text-rose-300">{error}</p> : null}
    </div>
  );
}
