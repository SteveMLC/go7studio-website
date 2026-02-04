import Link from "next/link";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="container-px py-16 sm:py-20">
      <div className="glass-card grid gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-white/75">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-brand-pink via-brand-orange to-brand-blue">
              <Image
                src="/images/branding/go7studio-logo-square.png"
                alt="Go7Studio"
                width={20}
                height={20}
                className="rounded"
              />
            </span>
            About Go7Studio
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Small studio. High polish. Built for momentum.
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-white/75 sm:text-base">
            <p>
              Go7Studio is a small, hands-on team building games and apps with an obsessive focus on usability, performance, and feel. We also partner with creators and teams who need product design and development support—from prototypes to production.
            </p>
            <p>
              Whether it&apos;s a mobile tycoon strategy, a Roblox experience built for chaos with friends, or a handy utility app, we design every project around the same principles: clear UX, satisfying feedback, and shipping real value.
            </p>
            <p>
              We&apos;re constantly experimenting, polishing, and shipping. If you&apos;re here, you&apos;re early—and we&apos;re excited to build what&apos;s next.
            </p>
          </div>

          <div className="mt-8">
            <Link href="/games" className="btn-secondary inline-flex">
              See projects
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-sm font-medium text-white">Fun + UX First</p>
            <p className="mt-1 text-sm text-white/70">
              Delightful experiences that still respect the user.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-sm font-medium text-white">Polish Matters</p>
            <p className="mt-1 text-sm text-white/70">
              Motion, feedback, and clarity make the difference.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-sm font-medium text-white">Ship, Learn, Improve</p>
            <p className="mt-1 text-sm text-white/70">
              Launch early, iterate fast, and improve continuously.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
