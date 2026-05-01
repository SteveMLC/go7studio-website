import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070b12]">
      <header className="border-b border-white/10 bg-black/30">
        <div className="container-px flex h-14 items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-semibold text-white">
              Go7Studio Admin
            </Link>
            <nav className="flex items-center gap-4 text-white/60">
              <Link href="/admin" className="hover:text-white">
                Overview
              </Link>
              <Link href="/admin/blog" className="hover:text-white">
                Blog
              </Link>
              <Link href="/admin/queue" className="hover:text-white">
                Queue
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/45">
            <Link href="/" className="hover:text-white">
              View site →
            </Link>
          </div>
        </div>
      </header>
      <main className="container-px py-10">{children}</main>
    </div>
  );
}
