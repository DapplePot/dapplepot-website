"use client";

import { useEffect, useRef, useState } from "react";

// Client-only wrapper that renders the TOC + article body and drives the
// scroll-based active-heading highlight. `header` (JSX from the server
// component) is rendered inside the article column so title, meta, and
// banner sit in the same grid row as the TOC — matching source layout.
export default function BlogPostToc({ headings, contentHtml, header }) {
  const [activeId, setActiveId] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    // Instant top-of-page on mount — protects against Next's client
    // nav landing us mid-scroll when arriving from a scrolled route.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const pick = () => {
      if (!contentRef.current) return;
      const els = Array.from(
        contentRef.current.querySelectorAll("h1[id], h2[id], h3[id]")
      );
      if (els.length === 0) return;
      const triggerLine = 120;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= triggerLine) current = el.id;
      }
      setActiveId(current);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    return () => window.removeEventListener("scroll", pick);
  }, [contentHtml]);

  return (
    <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[240px_1fr]">
      {headings.length > 0 && (
        <aside className="sticky top-[90px] max-lg:hidden">
          <div className="flex flex-col gap-[10px] border-r border-border pr-5">
            <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
              On this page
            </span>
            <div className="flex flex-col gap-2">
              {headings.map((h) => {
                const isActive = activeId === h.id;
                const indent =
                  h.level === 2 ? "pl-[14px]" : h.level === 3 ? "pl-[28px]" : "";
                return (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`text-[13px] leading-[1.4] no-underline transition-colors duration-[120ms] ${indent} ${
                      isActive ? "text-purple" : "text-muted hover:text-text"
                    }`}
                  >
                    {h.text}
                  </a>
                );
              })}
            </div>
          </div>
        </aside>
      )}
      <article className="min-w-0">
        {header}
        <div
          ref={contentRef}
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        <div className="mt-[70px] border-t border-border-2 pt-10 text-center text-sm text-muted">
          <p>
            Found this helpful? Let us know at{" "}
            <a
              href="mailto:founder@dapplepot.com"
              className="text-purple underline decoration-purple/40 underline-offset-[2px] hover:decoration-purple"
            >
              founder@dapplepot.com
            </a>
            .
          </p>
        </div>
      </article>
    </div>
  );
}
