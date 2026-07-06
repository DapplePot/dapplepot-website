"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_URL, DOCS_URL } from "@/lib/constants";

// Same nav markup/styles as the landing page hero nav. Section links
// client-side navigate to "/" with a hash; the landing page scrolls to
// that hash on mount (see its own hash-scroll effect).
const SECTION_LINKS = [
  { hash: "#product", label: "Product" },
  { hash: "#problem", label: "Enterprise" },
  { hash: "#solution", label: "Solution" },
  { hash: "#teams", label: "For your team" },
  { hash: "#owasp", label: "Coverage" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [navScrolled, setNavScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setNavScrolled(scrollY > 40);
      setScrollPct(docHeight > 0 ? scrollY / docHeight : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isBlog = pathname?.startsWith("/blog");

  const navBg = navScrolled
    ? "bg-bg-2 border-border-2"
    : "bg-bg-3 border-border";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-4 md:px-7 h-[54px] w-full overflow-hidden border-b transition-[background,border-color] duration-[250ms] ${navBg}`}
    >
      {/* Scroll progress bar — visible once scrolled */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[linear-gradient(90deg,var(--color-purple)_0%,var(--color-blue)_60%,transparent_100%)] transition-opacity duration-300 ${
          navScrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: `scaleX(${scrollPct})` }}
      />

      <Link
        href="/"
        className="flex shrink-0 items-center gap-[9px] font-sans text-base font-bold tracking-[-0.01em] text-white no-underline max-[960px]:absolute max-[960px]:left-1/2 max-[960px]:-translate-x-1/2"
      >
        <span className="flex h-[26px] w-[26px] items-center justify-center overflow-hidden rounded">
          <img
            src="/dapplePotLogo.png"
            alt="DapplePot"
            width={20}
            height={20}
            className="block rounded-[3px]"
          />
        </span>
        DapplePot
      </Link>

      <ul
        className={`flex list-none gap-[2px] font-label max-[960px]:fixed max-[960px]:inset-x-0 max-[960px]:top-[52px] max-[960px]:z-[99] max-[960px]:flex-col max-[960px]:border-b max-[960px]:border-border max-[960px]:bg-[rgba(10,10,14,0.97)] max-[960px]:px-0 max-[960px]:py-[8px_0_16px] max-[960px]:backdrop-blur-[20px] ${
          menuOpen ? "max-[960px]:flex" : "max-[960px]:hidden"
        }`}
      >
        {SECTION_LINKS.map((link) => (
          <li key={link.hash} className="max-[960px]:w-full">
            <Link
              href={`/${link.hash}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-[2px] px-[14px] py-[6px] text-[15px] font-medium text-muted no-underline transition-[color,background] duration-150 hover:bg-white/5 hover:text-text max-[960px]:block max-[960px]:rounded-none max-[960px]:px-[20px] max-[960px]:py-[12px]"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="max-[960px]:w-full">
          <Link
            href="/blog"
            onClick={() => setMenuOpen(false)}
            className={`rounded-[2px] px-[14px] py-[6px] text-[15px] font-medium no-underline transition-[color,background] duration-150 hover:bg-white/5 hover:text-text max-[960px]:block max-[960px]:rounded-none max-[960px]:px-[20px] max-[960px]:py-[12px] ${
              isBlog ? "bg-white/10 text-text" : "text-muted"
            }`}
          >
            Blogs
          </Link>
        </li>
        <li className="max-[960px]:w-full">
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="rounded-[2px] px-[14px] py-[6px] text-[15px] font-semibold text-purple no-underline transition-[color,background] duration-150 hover:bg-purple/10 max-[960px]:block max-[960px]:rounded-none max-[960px]:px-[20px] max-[960px]:py-[12px]"
          >
            Docs ↗
          </a>
        </li>
      </ul>

      <button
        className="hidden shrink-0 cursor-pointer flex-col justify-center gap-[5px] border-none bg-transparent p-0 max-[960px]:-order-1 max-[960px]:flex h-[36px] w-[36px]"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle navigation"
      >
        <span
          className={`block h-[1.5px] w-[20px] origin-center bg-text transition-transform duration-[220ms] ${
            menuOpen ? "translate-y-[6.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[1.5px] w-[20px] origin-center bg-text transition-opacity duration-150 ${
            menuOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-[1.5px] w-[20px] origin-center bg-text transition-transform duration-[220ms] ${
            menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
          }`}
        />
      </button>

      <a
        href={APP_URL}
        className="inline-flex shrink-0 items-center gap-[7px] rounded-[2px] bg-purple px-[18px] py-[8px] text-sm font-semibold text-[#0e0e14] no-underline transition-[opacity,background] duration-150 hover:bg-[#a594e0] hover:opacity-[0.88] max-[960px]:hidden"
      >
        Get started →
      </a>
    </nav>
  );
}
