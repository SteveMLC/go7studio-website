import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Go7Studio apps, games, and services. Learn how we collect, use, and protect your information.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: February 8, 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            Go7Studio (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you use our games, applications, and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Device information (device type, operating system)</li>
            <li>Game progress and statistics</li>
            <li>Analytics data (app usage, feature interactions)</li>
            <li>Advertising identifiers for personalized ads</li>
            <li>Information you provide when contacting support</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Information</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We use collected information to:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Provide and improve our games and services</li>
            <li>Save your game progress</li>
            <li>Display relevant advertisements</li>
            <li>Analyze usage patterns to improve user experience</li>
            <li>Respond to your inquiries and support requests</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
          <p className="text-gray-300 leading-relaxed">
            Our apps may use third-party services including Google AdMob for advertising, Google Play Games for leaderboards and achievements, and Firebase for analytics. These services have their own privacy policies governing their use of your data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="text-gray-300 leading-relaxed">
            We implement reasonable security measures to protect your information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Children&apos;s Privacy</h2>
          <p className="text-gray-300 leading-relaxed">
            Our games are not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p className="text-gray-300 leading-relaxed">
            Depending on your location, you may have rights to access, correct, or delete your personal data. To exercise these rights, please contact us at the email below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
          <p className="text-gray-300 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">
            If you have questions about this Privacy Policy, contact us at: stephen@go7studio.com
          </p>
        </section>
      </div>
    </main>
  );
}
