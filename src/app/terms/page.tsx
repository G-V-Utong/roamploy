import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

const Terms = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <div className="bg-muted py-8">
          <div className="container m-auto px-4 md:px-6">
            <div className="w-full max-w-3xl mx-auto space-y-2">
              <h1 className="text-3xl font-bold mb-8">
                Roamploy Terms of Service
              </h1>

              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Introduction
                </h2>
                <p className="leading-relaxed">
                  Roamploy is a cutting-edge platform designed to transform how
                  remote job seekers and employers connect in today’s dynamic,
                  digital-first work environment. Based in Lagos, Nigeria, and
                  accessible globally via{" "}
                  <a
                    href="https://www.roamploy.com"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.roamploy.com
                  </a>
                  , Roamploy serves a diverse user base across industries,
                  empowering individuals to find remote opportunities and
                  enabling companies to discover top remote talent. As a
                  centralized hub, Roamploy facilitates seamless connections,
                  matching skilled professionals with remote roles that align
                  with their expertise and aspirations.
                </p>
              </section>

              {/* Purpose of Use */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Purpose of Use
                </h2>
                <p className="leading-relaxed">
                  Roamploy’s core mission is to bridge the gap between remote
                  job seekers and employers, providing a streamlined platform
                  for meaningful professional connections. In an era of rapid
                  technological advancement and growing demand for flexible
                  work, Roamploy leverages innovative tools to transcend
                  traditional recruitment barriers. By harnessing digital
                  networks, Roamploy empowers individuals to take charge of
                  their remote careers and enables employers to identify ideal
                  candidates for their distributed teams.
                </p>
              </section>

              {/* The Agreement Between Users and Roamploy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  The Agreement Between Users and Roamploy
                </h2>
                <p className="eading-relaxed mb-4">
                  By engaging with Roamploy, users—whether job seekers or
                  employers—enter a binding agreement governed by the terms and
                  conditions outlined herein. This agreement fosters a
                  collaborative ecosystem where both parties uphold their
                  responsibilities and rights, ensuring mutual benefit.
                </p>
                <h3 className="text-xl font-medium mb-2">
                  For Job Seekers
                </h3>
                <p className="leading-relaxed mb-4">
                  This agreement requires providing accurate, comprehensive
                  information in professional profiles and engaging with
                  employers respectfully. By joining Roamploy, job seekers
                  embrace a platform designed to advance their remote careers,
                  leveraging tools and resources to maximize their potential.
                </p>
                <h3 className="text-xl font-medium mb-2">
                  For Employers
                </h3>
                <p className="leading-relaxed mb-4">
                  Employers commit to posting authentic remote job
                  opportunities, maintaining transparent communication
                  throughout the hiring process, and respecting candidates’
                  privacy. Through Roamploy, employers access robust features to
                  streamline recruitment and build high-performing remote teams.
                </p>
                <p className="leading-relaxed">
                  This agreement is both a legal framework and a reflection of
                  our shared vision to redefine remote work. Roamploy serves as
                  a partner, equipping users with tools to succeed in a
                  competitive global job market. We pledge to enhance the
                  platform’s capabilities, innovate with industry trends, and
                  uphold the highest standards of security and data protection,
                  ensuring success is achievable for all.
                </p>
                <p className="leading-relaxed mt-4">
                  We warmly welcome job seekers and employers to the Roamploy
                  community. Together, we’ll shape the future of remote work,
                  one opportunity at a time. Welcome to Roamploy, where remote
                  careers thrive, and businesses grow.
                </p>
              </section>

              {/* Acceptance of Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Acceptance of Terms
                </h2>
                <p className="leading-relaxed">
                  By using Roamploy, you agree to comply with these terms and
                  conditions ("Terms"), which form a legally binding agreement
                  governing your access to and use of our services. If you do
                  not agree with these Terms, you may not use the platform.
                </p>
                <p className="leading-relaxed mt-4">
                  Roamploy may update these Terms at any time, with changes
                  effective upon posting on{" "}
                  <a
                    href="https://www.roamploy.com"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.roamploy.com
                  </a>
                  . It is your responsibility to review the Terms regularly.
                  Continued use of Roamploy after changes constitutes acceptance
                  of the updated Terms.
                </p>
                <p className="leading-relaxed mt-4">
                  Our platform connects remote job seekers and employers
                  worldwide. Job seekers can create profiles, showcase skills,
                  and access remote job listings, while employers gain access to
                  a diverse talent pool, streamlining their hiring process. By
                  accepting these Terms, you confirm you are of legal age to
                  enter this agreement or have authority to bind your
                  organization. Breaches of these Terms may result in account
                  suspension or termination, at Roamploy’s discretion.
                </p>
                <p className="leading-relaxed mt-4">
                  These Terms, along with referenced policies, form the entire
                  agreement between you and Roamploy, superseding prior
                  agreements. If any provision is unenforceable, the remaining
                  provisions remain in effect. For questions, contact us via{" "}
                  <a
                    href="https://www.roamploy.com"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.roamploy.com
                  </a>
                  .
                </p>
              </section>

              {/* Eligibility - Qualifications */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Eligibility - Qualifications
                </h2>
                <h3 className="text-xl font-medium mb-2">
                  Eligibility for Using the Service
                </h3>
                <p className="leading-relaxed mb-4">
                  To use Roamploy, you must be at least 14 years old, or older
                  if required by local laws for us to provide services without
                  parental consent. Creating accounts with false information or
                  for users under 14 violates our Terms.
                </p>
                <h3 className="text-xl font-medium mb-2">
                  Account Holder Responsibilities
                </h3>
                <ul className="list-disc pl-6 leading-relaxed">
                  <li>
                    <strong>Exclusive Use</strong>: Accounts must be registered
                    in your real name and are limited to one per user. Sharing
                    accounts is prohibited.
                  </li>
                  <li>
                    <strong>Account Security</strong>: Use a strong,
                    confidential password and maintain its secrecy.
                  </li>
                  <li>
                    <strong>Non-transferability</strong>: Accounts and
                    connections cannot be transferred.
                  </li>
                  <li>
                    <strong>Compliance</strong>: Adhere to applicable laws and
                    Roamploy’s guidelines.
                  </li>
                  <li>
                    <strong>Ownership</strong>: Your account is your personal
                    property, but if services are purchased by a third party
                    (e.g., an employer), they may manage access to paid features
                    without owning your account.
                  </li>
                </ul>
                <p className="leading-relaxed mt-4">
                  You are responsible for all account activity unless it is
                  closed or reported for misuse.
                </p>
              </section>

              {/* Fee Structure and Payment Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Fee Structure and Payment Terms
                </h2>
                <p className="leading-relaxed">
                  Roamploy’s fee structure is transparent, detailing costs for
                  premium services, such as featured job listings or advanced
                  search tools. Fees may be one-time, recurring, or usage-based,
                  with clear payment deadlines (e.g., monthly or annually)
                  outlined at{" "}
                  <a
                    href="https://www.roamploy.com"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.roamploy.com
                  </a>
                  .
                </p>
              </section>

              {/* Accepted Payment Methods */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Accepted Payment Methods
                </h2>
                <p className="leading-relaxed">
                  Roamploy supports multiple payment methods, including
                  credit/debit cards and electronic transfers, with potential
                  currency or regional restrictions to ensure compliance and
                  efficiency.
                </p>
              </section>

              {/* Late Payment and Non-Payment Policies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Late Payment and Non-Payment Policies
                </h2>
                <p className="leading-relaxed">
                  Late or non-payment may result in late fees, service
                  suspension, or account termination. Roamploy provides a grace
                  period for late payments and a process to restore services
                  upon payment correction.
                </p>
              </section>

              {/* Refund and Cancellation Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Refund and Cancellation Policy
                </h2>
                <p className="leading-relaxed">
                  Roamploy’s refund policy outlines conditions for refunds, such
                  as service interruptions, with time limits and procedures
                  detailed at{" "}
                  <a
                    href="https://www.roamploy.com"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.roamploy.com
                  </a>
                  . Cancellation processes and any associated costs are clearly
                  communicated, ensuring transparency.
                </p>
              </section>

              {/* User Accounts */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  User Accounts
                </h2>
                <p className="leading-relaxed">
                  Creating and managing a Roamploy account is key to a seamless
                  experience. Users must provide accurate information (e.g.,
                  name, contact details, professional background) and avoid
                  misleading data to maintain platform integrity. Protect your
                  login credentials and notify Roamploy immediately of
                  suspicious activity via{" "}
                  <a
                    href="https://www.roamploy.com"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.roamploy.com
                  </a>
                  . Regularly update profiles with new skills or experiences to
                  enhance visibility and improve job-matching outcomes. Adhering
                  to these guidelines fosters a trusted, vibrant Roamploy
                  community.
                </p>
              </section>

              {/* User Responsibilities */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  User Responsibilities
                </h2>
                <p className="leading-relaxed mb-4">
                  As Roamploy users, you play a vital role in maintaining
                  platform credibility:
                </p>
                <ul className="list-disc pl-6 leading-relaxed">
                  <li>
                    <strong>Accuracy</strong>: Provide truthful, up-to-date
                    profile information to support transparent job matching.
                  </li>
                  <li>
                    <strong>Ethical Behavior</strong>: Avoid illegal or harmful
                    activities, including fraud, harassment, or discrimination,
                    and uphold professional ethics to foster an inclusive
                    community.
                  </li>
                </ul>
                <p className="leading-relaxed mt-4">
                  By fulfilling these responsibilities, you contribute to a
                  trustworthy environment that amplifies Roamploy’s impact on
                  the global remote job market.
                </p>
              </section>

              {/* Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Intellectual Property
                </h2>
                <p className="leading-relaxed">
                  Users retain ownership of content uploaded to Roamploy, such
                  as profiles and job listings. By sharing content, you grant
                  Roamploy a non-exclusive, worldwide, royalty-free license to
                  use, modify, and distribute it solely for platform operations
                  and improvement. This license ends when you remove your
                  content, though shared or integrated content may persist.
                  Ensure your content does not infringe on third-party
                  intellectual property rights, as you are solely responsible
                  for violations.
                </p>
              </section>

              {/* Privacy and Data Protection */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Privacy and Data Protection
                </h2>
                <p className="leading-relaxed mb-4">
                  Roamploy prioritizes your privacy and data security:
                </p>
                <ul className="list-disc pl-6 leading-relaxed">
                  <li>
                    <strong>Data Collection</strong>: We collect details like
                    name, contact information, skills, and browsing behavior to
                    personalize your experience.
                  </li>
                  <li>
                    <strong>Use of Data</strong>: Data supports profile
                    management, job recommendations, and platform analytics
                    (anonymized where applicable).
                  </li>
                  <li>
                    <strong>Data Protection</strong>: Industry-standard
                    measures, including encryption and regular security
                    assessments, safeguard your data.
                  </li>
                  <li>
                    <strong>Compliance</strong>: Roamploy adheres to global data
                    protection laws, such as Nigeria’s Data Protection
                    Regulation (NDPR) and GDPR, ensuring robust privacy
                    standards.
                  </li>
                </ul>
                <p className="leading-relaxed mt-4">
                  For privacy inquiries, contact us via{" "}
                  <a
                    href="https://www.roamploy.com"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.roamploy.com
                  </a>
                  .
                </p>
              </section>

              {/* Job Postings and Applications */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Job Postings and Applications
                </h2>
                <h3 className="text-xl font-medium mb-2">
                  Job Posting
                </h3>
                <p className="leading-relaxed mb-4">
                  Employers can post remote job listings via their Roamploy
                  dashboard, specifying titles, descriptions, qualifications,
                  and deadlines. Listings are reviewed for compliance before
                  going live to our global user base.
                </p>
                <h3 className="text-xl font-medium mb-2">
                  Applying for Jobs
                </h3>
                <p className="leading-relaxed">
                  Job seekers can filter listings by location, industry, or job
                  type, applying directly with resumes and cover letters. Track
                  application status and communicate with employers through the
                  platform.
                </p>
              </section>

              {/* Premium Services and Fees */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Premium Services and Fees
                </h2>
                <p className="leading-relaxed">
                  Roamploy’s core features are free, but premium services (e.g.,
                  featured listings, advanced search) enhance visibility and
                  functionality. Fees are transparently outlined at{" "}
                  <a
                    href="https://www.roamploy.com"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.roamploy.com
                  </a>
                  , with flexible options to suit user needs.
                </p>
              </section>

              {/* Communication and Interaction Guidelines */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Communication and Interaction Guidelines
                </h2>
                <ul className="list-disc pl-6 leading-relaxed">
                  <li>
                    <strong>Respectful Behavior</strong>: Engage with courtesy
                    and professionalism; discriminatory or harassing behavior is
                    prohibited.
                  </li>
                  <li>
                    <strong>Honest Representation</strong>: Provide accurate
                    information and avoid misrepresentation.
                  </li>
                  <li>
                    <strong>Professional Language</strong>: Use appropriate,
                    professional tone in all communications.
                  </li>
                  <li>
                    <strong>no Spam</strong>: Unsolicited messages or promotions
                    are forbidden.
                  </li>
                  <li>
                    <strong>Privacy</strong>: Respect others’ confidentiality
                    and do not share personal information without consent.
                  </li>
                  <li>
                    <strong>Reporting</strong>: Report violations via{" "}
                    <a
                      href="https://www.roamploy.com"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.roamploy.com
                    </a>
                    .
                  </li>
                  <li>
                    <strong>Zero Tolerance for Harassment</strong>: Harassment
                    based on protected characteristics is strictly prohibited.
                  </li>
                  <li>
                    <strong>Content Moderation</strong>: Roamploy may moderate
                    content to ensure compliance, with potential warnings or
                    account actions for violations.
                  </li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Failure to follow these guidelines may result in account
                  suspension or termination.
                </p>
              </section>

              {/* Content Moderation */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Content Moderation
                </h2>
                <p className="leading-relaxed mb-4">
                  Roamploy maintains a professional environment through:
                </p>
                <ul className="list-disc pl-6 leading-relaxed">
                  <li>
                    <strong>Automated Filters</strong>: Algorithms detect
                    inappropriate content.
                  </li>
                  <li>
                    <strong>Reporting Mechanism</strong>: Users can report
                    violations via the platform.
                  </li>
                  <li>
                    <strong>Manual Review</strong>: Our team reviews reported
                    content against guidelines.
                  </li>
                  <li>
                    <strong>Consequences</strong>: Violations may lead to
                    warnings, content removal, suspension, or termination.
                  </li>
                  <li>
                    <strong>Appeals</strong>: Users can appeal moderation
                    decisions.
                  </li>
                  <li>
                    <strong>Continuous Improvement</strong>: We refine
                    moderation processes to ensure effectiveness.
                  </li>
                </ul>
              </section>

              {/* Third-Party Links */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Third-Party Links
                </h2>
                <p className="leading-relaxed">
                  Roamploy may include third-party links for convenience, but we
                  do not endorse or control these resources. Users access them
                  at their own risk and should review third-party terms. For
                  issues, contact the third-party platform directly.
                </p>
              </section>

              {/* Liability and Dispute Resolution */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Liability and Dispute Resolution
                </h2>
                <h3 className="text-xl font-medium mb-2">
                  Liability Limits
                </h3>
                <ul className="list-disc pl-6 leading-relaxed mb-4">
                  <li>
                    Roamploy is not liable for direct, indirect, or
                    consequential damages from platform use or inability to use
                    it.
                  </li>
                  <li>
                    We do not guarantee information accuracy; reliance is at
                    your risk.
                  </li>
                  <li>
                    Roamploy is not responsible for user actions or omissions.
                  </li>
                </ul>
                <h3 className="text-xl font-medium mb-2">
                  Dispute Resolution
                </h3>
                <ul className="list-disc pl-6 leading-relaxed">
                  <li>Disputes will first be addressed informally.</li>
                  <li>
                    Unresolved disputes proceed to mediation, then binding
                    arbitration under mutually agreed rules.
                  </li>
                  <li>
                    Arbitration awards are final, but parties may seek judicial
                    relief if needed.
                  </li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Consult a legal professional to ensure compliance with local
                  laws.
                </p>
              </section>

              {/* Termination and Suspension */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Termination and Suspension
                </h2>
                <p className="leading-relaxed mb-4">
                  Roamploy may suspend or terminate accounts for:
                </p>
                <ul className="list-disc pl-6 leading-relaxed mb-4">
                  <li>Breaching Terms</li>
                  <li>Providing false information</li>
                  <li>Illegal activities</li>
                  <li>Harassment or misconduct</li>
                  <li>Spam or misuse</li>
                  <li>Security concerns</li>
                  <li>Non-payment</li>
                  <li>Non-compliance with guidelines</li>
                </ul>
                <p className="leading-relaxed">
                  Actions depend on violation severity, with notification
                  provided where possible. Users may appeal via{" "}
                  <a
                    href="https://www.roamploy.com"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.roamploy.com
                  </a>
                  .
                </p>
              </section>

              {/* Changes to Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Changes to Terms
                </h2>
                <p className="leading-relaxed">
                  Roamploy may update these Terms at any time, effective upon
                  posting at{" "}
                  <a
                    href="https://www.roamploy.com"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.roamploy.com
                  </a>
                  . Continued use implies acceptance. Review Terms periodically,
                  and cease use if you disagree with changes. Significant
                  updates will be communicated via platform notifications.
                </p>
              </section>

              {/* Governing Law */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Governing Law
                </h2>
                <p className="leading-relaxed">
                  This agreement is governed by the laws of Nigeria, with
                  disputes subject to the exclusive jurisdiction of Lagos
                  courts. Both parties consent to this jurisdiction.
                </p>
              </section>

              {/* Severability */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Severability
                </h2>
                <p className="leading-relaxed">
                  If any provision is unenforceable, the remaining provisions
                  remain valid. Unenforceable provisions will be replaced to
                  reflect the original intent.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Contact Information
                </h2>
                <p className="leading-relaxed">
                  For inquiries, visit{" "}
                  <a
                    href="https://www.roamploy.com"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.roamploy.com
                  </a>{" "}
                  or contact:
                </p>
                <p className="leading-relaxed mt-4">
                  <strong>Roamploy</strong>
                  <br />
                  Attention: Legal Team (Roamploy User Agreement)
                  <br />
                  Lagos, Nigeria
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:contact@roamploy.com"
                    className="text-blue-600 hover:underline"
                  >
                    contact@roamploy.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
