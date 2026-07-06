"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function LegalLayout({ eyebrow, title, updated, intro, children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg font-sans text-text antialiased">
      <header className="sticky top-0 z-10 border-b border-border bg-bg/[0.85] backdrop-blur-[10px]">
        <div className="mx-auto flex max-w-[880px] items-center justify-between gap-4 px-6 py-4 max-[640px]:px-[18px] max-[640px]:py-[14px]">
          <Link
            href="/"
            className="inline-flex items-center gap-[10px] text-base font-bold tracking-[-0.01em] text-white no-underline"
          >
            <img
              src="/dapplePotLogo.png"
              alt=""
              className="block h-[22px] w-[22px] rounded"
            />
            DapplePot
          </Link>
          <Link
            href="/"
            className="text-sm text-muted no-underline transition-colors duration-[120ms] hover:text-text"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[760px] px-6 pt-16 pb-24 max-[640px]:px-5 max-[640px]:pt-10 max-[640px]:pb-[72px]">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-purple">
            {eyebrow}
          </p>
        )}
        <h1 className="mb-4 text-[40px] font-bold leading-[1.15] tracking-[-0.02em] text-[#f1f1f1] max-[640px]:text-[30px]">
          {title}
        </h1>

        <div className="mb-10 flex flex-wrap gap-x-5 gap-y-2 border-b border-border pb-7 text-[13px] text-muted">
          <span>
            <strong className="font-medium text-text">Last updated:</strong> {updated}
          </span>
        </div>

        {intro && (
          <p className="mb-8 text-base leading-[1.7] text-text">{intro}</p>
        )}

        {children}
      </main>

      <footer className="mt-16 border-t border-border px-6 py-7 text-center text-[13px] text-muted">
        <span>
          © {new Date().getFullYear()} DapplePot Pvt. Ltd. All rights reserved.
        </span>
        <span className="ml-[14px] inline-flex gap-[18px]">
          <Link
            href="/privacy"
            className="text-muted no-underline transition-colors duration-[120ms] hover:text-text"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-muted no-underline transition-colors duration-[120ms] hover:text-text"
          >
            Terms
          </Link>
          <a
            href="mailto:founder@dapplepot.com"
            className="text-muted no-underline transition-colors duration-[120ms] hover:text-text"
          >
            Contact
          </a>
        </span>
      </footer>
    </div>
  );
}
