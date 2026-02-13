import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Go7Studio apps, games, and services. Rules and guidelines for using our products.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: February 8, 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            By accessing or using Go7Studio&apos;s applications, websites, and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
          <p className="text-gray-300 leading-relaxed">
            Go7Studio provides mobile games, gaming content, and related services. Our games include Empire Tycoon and other titles available on various app stores and platforms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
          <p className="text-gray-300 leading-relaxed">
            You agree to use our services only for lawful purposes. You may not use our services to transmit harmful, offensive, or illegal content, or to infringe on the rights of others.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
          <p className="text-gray-300 leading-relaxed">
            All content, trademarks, and intellectual property in our games and services are owned by Go7Studio. You may not copy, modify, or distribute our content without permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. In-App Purchases</h2>
          <p className="text-gray-300 leading-relaxed">
            Some of our games offer in-app purchases. All purchases are final and non-refundable unless required by applicable law. Refund requests should be directed to the app store where the purchase was made.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Disclaimers</h2>
          <p className="text-gray-300 leading-relaxed">
            Our services are provided &quot;as is&quot; without warranties of any kind. We do not guarantee uninterrupted or error-free service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-300 leading-relaxed">
            Go7Studio shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
          <p className="text-gray-300 leading-relaxed">
            For questions about these terms, contact us at: stephen@go7studio.com
          </p>
        </section>
      </div>
    </main>
  );
}
