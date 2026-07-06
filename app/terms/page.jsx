import LegalLayout from "@/components/LegalLayout";
import { SITE_URL } from "@/lib/constants";

const UPDATED = "June 29, 2026";

export const metadata = {
  title: "Terms of Service — DapplePot",
  description:
    "Terms governing your use of the DapplePot AI agent security platform, SDK, and API.",
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: {
    title: "Terms of Service — DapplePot",
    description:
      "Terms governing your use of the DapplePot AI agent security platform, SDK, and API.",
    url: `${SITE_URL}/terms`,
  },
};

export default function TermsOfService() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      updated={UPDATED}
      intro={
        <>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the DapplePot
          platform operated by DapplePot Pvt. Ltd.
        </>
      }
    >
      <section className="legal-section" id="acceptance">
        <h2>1. Acceptance</h2>
        <p>
          By creating an account, installing the SDK, calling the API, or otherwise accessing the Service,
          you agree to these Terms. If you accept on behalf of an organization, you confirm that you have
          authority to bind it.
        </p>
        <p>
          Enterprise customers operating under a signed Master Services Agreement (&ldquo;MSA&rdquo;) with
          DapplePot: the MSA controls, and these Terms fill in any gaps the MSA does not address.
        </p>
      </section>

      <section className="legal-section" id="definitions">
        <h2>2. Definitions</h2>
        <ul>
          <li><strong>&ldquo;Service&rdquo;</strong> — the DapplePot website, dashboard, SDK, and API operated by DapplePot Pvt. Ltd.</li>
          <li><strong>&ldquo;SDK&rdquo;</strong> — the <code>dapplepot-sdk</code> package and any client libraries we publish.</li>
          <li>
            <strong>&ldquo;Customer Content&rdquo;</strong> — events, prompts, completions, tool inputs and
            outputs, and other data you send to the Service through the SDK or API.
          </li>
          <li>
            <strong>&ldquo;Agent&rdquo;</strong> — a logical AI agent you instrument and identify with an{" "}
            <code>agent_id</code> in the Service.
          </li>
          <li><strong>&ldquo;Plan&rdquo;</strong> — the subscription tier described in §4 or in your MSA.</li>
          <li><strong>&ldquo;End-User&rdquo;</strong> — a person interacting with your Agent.</li>
          <li><strong>&ldquo;You&rdquo; / &ldquo;Customer&rdquo;</strong> — the individual or organization accepting these Terms.</li>
        </ul>
      </section>

      <section className="legal-section" id="account">
        <h2>3. Account</h2>
        <p>
          You must be at least 16 years old, not on a sanctions list, and authorized to use the Service in
          your jurisdiction.
        </p>
        <p>
          You agree to provide accurate signup information and keep it current.{" "}
          <strong>One free trial per natural person</strong>, enforced automatically at signup.
        </p>
        <p>
          You are responsible for the security of your credentials and SDK keys and for all actions taken
          under them. Notify us immediately if you suspect compromise.
        </p>
      </section>

      <section className="legal-section" id="billing">
        <h2>4. Plans, fees, and billing</h2>

        <h3>4.1 Plans</h3>
        <p>
          We offer a Free Trial and the paid Plans <strong>Pro</strong>, <strong>Team</strong>, and{" "}
          <strong>Enterprise</strong>. Current prices, included usage, seat counts, and feature
          allocations for each Plan are published at{" "}
          <a href="https://dapplepot.com/#pricing">dapplepot.com/pricing</a> and shown to you at checkout.
          Enterprise terms are set out in your order form or MSA.
        </p>

        <h3>4.2 Billing</h3>
        <p>
          Self-serve Plans (Pro and Team) are billed by <strong>Lemon Squeezy</strong> acting as our
          Merchant of Record. Lemon Squeezy handles tax, VAT, and GST. Enterprise Plans are invoiced
          directly by DapplePot per your MSA.
        </p>

        <h3>4.3 Annual plans</h3>
        <p>
          Annual prepayment is discounted by approximately two months. Annual fees are prepaid and{" "}
          <strong>non-refundable for partial periods or unused time</strong>.
        </p>

        <h3>4.4 Quotas are hard caps</h3>
        <p>
          Once your monthly event quota is reached, further events are rejected until the next billing
          period or until you upgrade. There are no automatic overage charges.
        </p>

        <h3>4.5 Renewal and cancellation</h3>
        <p>
          Subscriptions auto-renew at the end of each period unless cancelled before the period ends
          through the billing portal (self-serve Plans) or in writing (Enterprise). Cancellation takes
          effect at the end of the current paid period; the workspace remains active until then.
        </p>

        <h3>4.6 Payment failure</h3>
        <p>
          If a payment fails, the billing provider may retry the charge for a reasonable period. If the
          charge is not recovered, the workspace enters the read-only lifecycle described in §9.3.
        </p>

        <h3>4.7 Price changes</h3>
        <p>
          We will give at least 30 days&apos; notice before changing prices on existing Plans. Changes take
          effect on the next renewal after notice.
        </p>

        <h3>4.8 Refunds</h3>
        <p>
          No refunds for partial periods, unused events, or unused seats. Statutory consumer rights, where
          they apply, are not affected.
        </p>
      </section>

      <section className="legal-section" id="trial">
        <h2>5. Free trial</h2>
        <p>
          The Free Trial runs for a fixed period from signup with capped Agents, events, and seats as
          shown on the pricing page. Each natural person is entitled to <strong>one trial</strong>. After
          expiry, the workspace enters the trial lifecycle (§9.3).
        </p>
      </section>

      <section className="legal-section" id="acceptable-use">
        <h2>6. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>use the Service to attack third parties or to evade lawful authority;</li>
          <li>
            reverse-engineer or attempt to extract the source of the dashboard or API (the SDK is
            open-source under Apache 2.0 — see §10.2);
          </li>
          <li>
            probe detection rules with the purpose of enabling another customer to evade DapplePot;
          </li>
          <li>resell, white-label, or wrap the Service without a written agreement with us;</li>
          <li>upload content that is unlawful, infringing, or violates third-party rights;</li>
          <li>
            use the Service in life-safety systems, critical infrastructure, or other high-risk
            applications without an MSA that addresses the use case;
          </li>
          <li>interfere with or disrupt the Service or other customers&apos; use of it.</li>
        </ul>
        <p>We may suspend or terminate access for material breach of this section per §9.</p>
      </section>

      <section className="legal-section" id="customer-content">
        <h2>7. Customer Content and your responsibilities</h2>

        <h3>7.1 Ownership</h3>
        <p>You retain all rights to Customer Content.</p>

        <h3>7.2 License to us</h3>
        <p>
          You grant DapplePot a worldwide, non-exclusive, royalty-free license to host, process, transmit,
          display, and analyze Customer Content <strong>solely to provide the Service to you</strong> and
          to produce derived security findings. We do not use Customer Content to train, fine-tune, or
          improve any machine-learning model.
        </p>

        <h3>7.3 Your representations</h3>
        <p>You represent and warrant that:</p>
        <ul>
          <li>you have the rights and a lawful basis to send End-User data to the Service;</li>
          <li>
            you have provided End-Users any required notices and obtained any required consents under
            applicable law (including GDPR, CCPA, and India&apos;s DPDP Act, as applicable);
          </li>
          <li>your use of the Service complies with applicable law.</li>
        </ul>

        <h3>7.4 Redaction is your responsibility</h3>
        <p>
          The SDK provides options to redact or scrub sensitive content before it is sent to the Service
          (see Privacy Policy §6 and the SDK documentation). DapplePot does not pre-scan inbound payloads
          to remove personal data. You are responsible for configuring the SDK appropriately for your
          data.
        </p>

        <h3>7.5 Action policies</h3>
        <p>
          You configure how each online security check responds — for example, logging only, redacting
          matched content, blocking the call, or terminating the session — in the dashboard. The behavior
          of your agent under those policies, and any consequences of blocked or terminated calls, is your
          responsibility.
        </p>
      </section>

      <section className="legal-section" id="service">
        <h2>8. Service operation</h2>

        <h3>8.1 Security checks are signals, not guarantees</h3>
        <p>
          DapplePot&apos;s online checks and post-session risk scores are designed to surface risk; they
          do not guarantee safety, compliance, or the prevention of any specific attack. You remain
          responsible for production decisions about your agent.
        </p>

        <h3>8.2 Availability</h3>
        <p>
          We provide the Service on a commercially reasonable basis. We do not offer an uptime
          service-level agreement except where you have a signed Enterprise SLA.
        </p>

        <h3>8.3 Changes to the Service</h3>
        <p>
          We may modify the Service from time to time. For material reductions in functionality on paid
          Plans, we will give at least 30 days&apos; notice.
        </p>

        <h3>8.4 Beta features</h3>
        <p>
          Features labelled &ldquo;beta&rdquo;, &ldquo;preview&rdquo;, or similar are provided as-is, may
          change or be removed without notice, and may carry additional terms presented at the time of
          enrolment.
        </p>

        <h3>8.5 Maintenance</h3>
        <p>Planned maintenance will be announced via the dashboard or email where feasible.</p>
      </section>

      <section className="legal-section" id="termination">
        <h2>9. Suspension, termination, and post-termination</h2>

        <h3>9.1 By you</h3>
        <p>
          You may cancel any time through the billing portal (self-serve Plans) or by giving the notice
          specified in your MSA (Enterprise).
        </p>

        <h3>9.2 By us</h3>
        <p>We may suspend or terminate your access for:</p>
        <ul>
          <li>non-payment after the billing provider&apos;s retry window expires;</li>
          <li>material violation of §6 (Acceptable use);</li>
          <li>legal obligation, court order, or government request;</li>
          <li>if continued provision creates a credible risk to other customers or to the Service.</li>
        </ul>
        <p>We will give notice and an opportunity to cure where reasonably possible.</p>

        <h3>9.3 Lifecycle after termination or expiry</h3>
        <ul>
          <li><strong>Trial:</strong> 90 days read-only → 90 days suspended → hard delete (~6 months).</li>
          <li>
            <strong>Pro, Team, Enterprise:</strong> 730 days read-only → 90 days suspended → hard delete
            (~27 months from last payment).
          </li>
        </ul>
        <p>
          &ldquo;Read-only&rdquo; means the dashboard and historical data remain accessible, ingest is
          blocked. &ldquo;Suspended&rdquo; means login is locked behind a plan picker; data remains on
          disk. &ldquo;Hard delete&rdquo; removes data from our primary databases and from sealed archive
          storage.
        </p>

        <h3>9.4 Data export</h3>
        <p>
          During the read-only window, you retain dashboard access to your historical data. Enterprise
          customers additionally receive sealed monthly audit archives.
        </p>

        <h3>9.5 Survival</h3>
        <p>
          Sections that by nature should survive (including §§4 unpaid amounts, 7.3, 10, 11, 12, 13, 14,
          16, 17) will survive termination.
        </p>
      </section>

      <section className="legal-section" id="ip">
        <h2>10. Intellectual property</h2>

        <h3>10.1 Our rights</h3>
        <p>
          DapplePot retains all rights, title, and interest in the Service, the dashboard, detection
          rules, sub-check definitions, and documentation.
        </p>

        <h3>10.2 SDK license</h3>
        <p>
          The DapplePot SDK is licensed under the <strong>Apache License, Version 2.0</strong>, separate
          from these Terms. The SDK&apos;s licence governs your use of the SDK source and binaries; these
          Terms govern your use of the hosted Service the SDK talks to.
        </p>

        <h3>10.3 Feedback</h3>
        <p>
          If you send us suggestions, ideas, or feature requests, we may use them without restriction or
          compensation.
        </p>

        <h3>10.4 No use of Customer Content for model training</h3>
        <p>
          As stated in §7.2 and in the Privacy Policy, we do not use Customer Content to train, fine-tune,
          or improve any machine-learning model. We may compute aggregate operational metadata (event
          counts, latency, error rates, aggregate sub-check hit rates without payload content) to operate
          and improve Service infrastructure.
        </p>

        <h3>10.5 Marks and logos</h3>
        <p>
          Neither party may use the other&apos;s name, logo, or trademarks in marketing materials without
          prior written consent, except as agreed in an MSA or order form.
        </p>
      </section>

      <section className="legal-section" id="confidentiality">
        <h2>11. Confidentiality</h2>
        <p>
          Each party will protect the other&apos;s non-public information with at least the same care it
          uses for its own, and never less than reasonable care, and will use it only to perform under
          these Terms. The obligation does not apply to information that is already public, becomes public
          without breach, was independently developed, was lawfully received from a third party without a
          duty of confidentiality, or is required to be disclosed by law (with prompt notice where
          allowed).
        </p>
      </section>

      <section className="legal-section" id="warranties">
        <h2>12. Warranties and disclaimers</h2>
        <p>Each party warrants it has authority to enter these Terms.</p>
        <div className="legal-callout">
          <strong>
            TO THE FULLEST EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND
            &ldquo;AS AVAILABLE&rdquo;. DAPPLEPOT DISCLAIMS ALL IMPLIED WARRANTIES, INCLUDING
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. DAPPLEPOT DOES NOT
            WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT ALL ATTACKS,
            VULNERABILITIES, OR RISKS WILL BE DETECTED.
          </strong>
        </div>
      </section>

      <section className="legal-section" id="liability">
        <h2>13. Limitation of liability</h2>
        <p><strong>TO THE FULLEST EXTENT PERMITTED BY LAW:</strong></p>

        <h3>13.1 Excluded damages</h3>
        <p>
          Neither party will be liable for indirect, incidental, consequential, special, exemplary, or
          punitive damages, or for loss of profits, revenue, goodwill, or data, even if advised of the
          possibility.
        </p>

        <h3>13.2 Aggregate cap</h3>
        <p>
          Each party&apos;s total aggregate liability arising out of or related to these Terms is capped at
          the <strong>amounts paid by Customer to DapplePot in the 12 months immediately preceding the
          event giving rise to the claim</strong>. For trial users who have not paid, the cap is{" "}
          <strong>USD 100</strong>.
        </p>

        <h3>13.3 Carve-outs</h3>
        <p>
          The exclusions and cap in §13.1 and §13.2 do not apply to: a party&apos;s confidentiality breach,
          indemnification obligations, willful misconduct or fraud, infringement of the other party&apos;s
          intellectual property, or amounts that cannot be limited under applicable law.
        </p>
      </section>

      <section className="legal-section" id="indemnification">
        <h2>14. Indemnification</h2>

        <h3>14.1 By DapplePot</h3>
        <p>
          DapplePot will defend Customer against third-party claims that the Service, as provided by
          DapplePot and used in accordance with these Terms, directly infringes a third party&apos;s
          intellectual property right, and will pay damages finally awarded or agreed in settlement. If
          such a claim arises, DapplePot may, at its option, modify or replace the affected part of the
          Service, procure rights for continued use, or refund the unused portion of pre-paid fees.
        </p>

        <h3>14.2 By Customer</h3>
        <p>
          Customer will defend DapplePot against third-party claims arising from Customer Content,
          Customer&apos;s use of the Service in violation of these Terms, or breach of §7.3 (Customer
          representations), and will pay damages finally awarded or agreed in settlement.
        </p>

        <h3>14.3 Process</h3>
        <p>
          The indemnified party will give prompt notice, allow the indemnifying party to control defence
          and settlement (without admitting fault on the indemnified party&apos;s behalf), and provide
          reasonable cooperation.
        </p>
      </section>

      <section className="legal-section" id="data-protection">
        <h2>15. Data protection</h2>
        <p>
          Our handling of personal data is described in the Privacy Policy at{" "}
          <a href="/privacy">dapplepot.com/privacy</a>. A Data Processing Addendum is available on request
          for customers who require one. For Enterprise customers, the DPA forms part of the MSA.
        </p>
      </section>

      <section className="legal-section" id="changes">
        <h2>16. Changes to the Terms</h2>
        <p>
          We may update these Terms from time to time. For material changes, we will give at least{" "}
          <strong>30 days&apos; notice</strong> by email or via the dashboard. Continued use after the
          effective date constitutes acceptance. Prior versions will be archived and made available on
          request.
        </p>
      </section>

      <section className="legal-section" id="governing-law">
        <h2>17. Governing law and disputes</h2>
        <p>
          These Terms are governed by the laws of <strong>India</strong>, without regard to
          conflict-of-laws principles. The courts located in <strong>Bhopal, Madhya Pradesh</strong> have
          exclusive jurisdiction, subject to either party&apos;s right to seek injunctive relief in any
          competent court.
        </p>
        <p>
          The parties will attempt in good faith to resolve any dispute informally for{" "}
          <strong>30 days</strong> before initiating formal proceedings.
        </p>
        <p>Mandatory consumer-protection rights under your local law are not affected by this section.</p>
      </section>

      <section className="legal-section" id="general">
        <h2>18. General</h2>
        <ul>
          <li>
            <strong>Entire agreement.</strong> These Terms, the Privacy Policy, and any order form or MSA
            between the parties are the entire agreement on the subject and supersede prior discussions.
          </li>
          <li>
            <strong>Assignment.</strong> You may not assign these Terms without our prior written consent.
            DapplePot may assign in connection with a merger, acquisition, or sale of substantially all
            assets.
          </li>
          <li>
            <strong>Waiver.</strong> Failure to enforce a provision is not a waiver of future enforcement.
          </li>
          <li>
            <strong>Severability.</strong> If any provision is held unenforceable, the rest remains in
            effect.
          </li>
          <li>
            <strong>Force majeure.</strong> Neither party is liable for delays or failures caused by events
            beyond reasonable control (acts of God, war, pandemic, internet outages, regulatory action).
          </li>
          <li>
            <strong>Notices.</strong> Notices to Customer go to the email on the account; notices to
            DapplePot go to <a href="mailto:founder@dapplepot.com">founder@dapplepot.com</a> with a copy to
            the address in §19.
          </li>
          <li>
            <strong>Relationship.</strong> The parties are independent contractors; nothing creates a
            partnership, joint venture, agency, or employment relationship.
          </li>
          <li><strong>No third-party beneficiaries.</strong></li>
        </ul>
      </section>

      <section className="legal-section" id="contact">
        <h2>19. Contact</h2>
        <div className="legal-contact-card">
          <div className="legal-contact-name">DapplePot Pvt. Ltd.</div>
          <div className="legal-contact-line">Bhopal, India</div>
          <div className="legal-contact-line" style={{ marginTop: 10 }}>
            <a href="mailto:founder@dapplepot.com">founder@dapplepot.com</a>
          </div>
        </div>
      </section>
    </LegalLayout>
  );
}
