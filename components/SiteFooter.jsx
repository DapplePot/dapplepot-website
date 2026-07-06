import Link from "next/link";
import { CALENDLY_URL } from "@/lib/constants";

// Uses the source design's markup + class names. The `.footer-*` rules
// live in globals.css @layer components so this component looks identical
// on every route — landing (where landing-page.css also defines these
// rules identically), blog, and legal.
export default function SiteFooter() {
  return (
    <footer className="footer-new">
      <div className="footer-top">
        <div className="footer-brand-col">
          <Link href="/" className="footer-logo">
            <span className="logo-mark">
              <img
                src="/dapplePotLogo.png"
                alt="DapplePot"
                width={18}
                height={18}
                style={{ borderRadius: "3px", display: "block" }}
              />
            </span>
            DapplePot
          </Link>
          <p className="footer-tagline">
            We onboard teams personally. Book a call and we&apos;ll show you exactly
            how DapplePot fits your stack — no commitment required.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-cta"
          >
            Book a demo →
          </a>
        </div>

        <div className="footer-nav-cols">
          <div className="footer-nav-col">
            <div className="footer-nav-hdr">Company</div>
            <a href="mailto:founder@dapplepot.com" className="footer-nav-link">
              founder@dapplepot.com
            </a>
            <a
              href="https://x.com/DapplePot"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-nav-link"
            >
              X / Twitter
            </a>
            <a
              href="https://www.linkedin.com/company/DapplePot/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-nav-link"
            >
              LinkedIn
            </a>
          </div>

          <div className="footer-nav-col">
            <div className="footer-nav-hdr">Resources</div>
            <Link href="/blog" className="footer-nav-link">
              Blog
            </Link>
            <a
              href="https://docs.dapplepot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-nav-link"
            >
              SDK Documentation
            </a>
          </div>

          <div className="footer-nav-col">
            <div className="footer-nav-hdr">Legal</div>
            <Link href="/privacy" className="footer-nav-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-nav-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">
          © {new Date().getFullYear()} DapplePot Pvt. Ltd. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
