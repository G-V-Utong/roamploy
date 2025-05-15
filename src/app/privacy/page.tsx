import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

const Privacy = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <div className="bg-muted py-8">
          <div className="container m-auto px-4 md:px-6">
            <div className="w-full max-w-3xl mx-auto space-y-2">
              <h1 className="text-3xl font-bold">Roamploy Privacy Policy</h1>
              <p className="text-sm">
                Last Updated: May 14, 2025
              </p>

              <p>
                At Roamploy, we are committed to protecting your privacy and
                ensuring the security of your personal data. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our platform at{" "}
                <a
                  className="text-blue-600 underline"
                  href="https://www.roamploy.com"
                >
                  https://www.roamploy.com
                </a>
                , including our website, mobile applications, and related
                services (collectively, the “Services”). By using Roamploy, you
                agree to the practices described in this policy. If you do not
                agree, please do not use our Services.
              </p>
              <p>
                Roamploy, based in Lagos, Nigeria, operates as a data controller
                under the Nigeria Data Protection Act 2023 (NDPA) and complies
                with applicable global privacy laws, including the NDPR and GDPR
                where relevant. We aim to be transparent about our data
                practices and your rights as a data subject.
              </p>

              <section>
                <h2 className="text-xl font-semibold mt-6">
                  1. Information We Collect
                </h2>
                <p>
                  We collect information to provide and improve our Services,
                  connecting remote job seekers with employers. The types of
                  data we collect include:
                </p>

                <h3 className="font-semibold mt-4">
                  a. Personal Data You Provide
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Account Information:</strong> Full name, email
                    address, phone number (optional), and password.
                  </li>
                  <li>
                    <strong>Profile Information:</strong> Resume, cover letter,
                    education, work experience, skills, certifications, profile
                    photo (optional). Employers provide company name, contact
                    details, job listings.
                  </li>
                  <li>
                    <strong>Communications:</strong> Messages, inquiries,
                    feedback.
                  </li>
                  <li>
                    <strong>Application Data:</strong> Submitted documents like
                    portfolios, references.
                  </li>
                  <li>
                    <strong>Payment Information:</strong> Collected via secure
                    third-party processors.
                  </li>
                </ul>

                <h3 className="font-semibold mt-4">
                  b. Automatically Collected Data
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Technical Data:</strong> IP, device, browser, OS,
                    usage stats.
                  </li>
                  <li>
                    <strong>Cookies & Tracking:</strong> Cookies, beacons,
                    analytics tools.
                  </li>
                  <li>
                    <strong>Log Data:</strong> Server logs for actions/events.
                  </li>
                </ul>

                <h3 className="font-semibold mt-4">
                  c. Data from Third Parties
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Login via third-party services (e.g., LinkedIn, Google).
                  </li>
                  <li>Candidate referrals or employer/job preference data.</li>
                </ul>

                <p>
                  We do not collect sensitive personal data unless voluntarily
                  provided and with explicit consent.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mt-6">
                  2. How We Use Your Information
                </h2>
                <p>
                  We use your data to deliver, maintain, and enhance our
                  Services based on lawful grounds including consent, contract,
                  legal obligations, and legitimate interest. Use cases include:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Account and profile management.</li>
                  <li>Job matching and employer tools.</li>
                  <li>Platform communication and support.</li>
                  <li>Improving algorithms and functionality.</li>
                  <li>Sending promotional emails (with consent).</li>
                  <li>Legal compliance and fraud prevention.</li>
                </ul>
                <p>
                  We retain your data only as long as necessary, with policies
                  for account inactivity and legal retention obligations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mt-6">
                  3. Legal Bases for Processing
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Consent:</strong> For optional data.
                  </li>
                  <li>
                    <strong>Contract Performance:</strong> For core services.
                  </li>
                  <li>
                    <strong>Legal Obligation:</strong> Regulatory compliance.
                  </li>
                  <li>
                    <strong>Legitimate Interests:</strong> Platform
                    optimization, fraud prevention.
                  </li>
                  <li>
                    <strong>Vital Interests:</strong> Rare safety-related
                    scenarios.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mt-6">
                  4. How We Share Your Information
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>With other users (e.g., job applications).</li>
                  <li>
                    With service providers (e.g., Stripe, Google Analytics).
                  </li>
                  <li>Legal compliance with courts or authorities.</li>
                  <li>Business transfers with user notice.</li>
                  <li>With your consent (e.g., integrations).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mt-6">
                  5. Your Data Subject Rights
                </h2>
                <p>Under NDPA, NDPR, and GDPR you have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access and correct your data.</li>
                  <li>Request deletion or restriction.</li>
                  <li>Data portability and objection to processing.</li>
                  <li>Withdraw consent or file a complaint.</li>
                </ul>
                <p>
                  Contact us at{" "}
                  <a
                    className="text-blue-600 underline"
                    href="mailto:privacy@roamploy.com"
                  >
                    contact@roamploy.com
                  </a>{" "}
                  or via{" "}
                  <a
                    className="text-blue-600 underline"
                    href="https://www.roamploy.com/contact"
                  >
                    https://www.roamploy.com/contact
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mt-6">6. Data Security</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Encryption in transit and at rest.</li>
                  <li>Access controls and confidentiality agreements.</li>
                  <li>Audits and DPIAs.</li>
                  <li>Vendor compliance with NDPA and GDPR.</li>
                </ul>
                <p>
                  We notify affected users and regulators within 72 hours of a
                  breach.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mt-6">
                  7. International Data Transfers
                </h2>
                <p>
                  We transfer data globally using SCCs and other safeguards. We
                  obtain consent where necessary and assess risks for sensitive
                  data transfers.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mt-6">
                  8. Cookies and Tracking Technologies
                </h2>
                <p>We use cookies for:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Essential functionality.</li>
                  <li>Performance insights (e.g., Google Analytics).</li>
                  <li>Personalized job search tools.</li>
                  <li>Marketing (with consent).</li>
                </ul>
                <p>
                  Manage settings at{" "}
                  <a
                    className="text-blue-600 underline"
                    href="https://www.roamploy.com/cookies"
                  >
                    https://www.roamploy.com/cookies
                  </a>{" "}
                  or in your browser.
                </p>
              </section>

              <p className="text-sm">End of Privacy Policy</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
