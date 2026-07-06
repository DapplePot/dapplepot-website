"use client";

import { useEffect } from "react";

const DEFAULT_TITLE = "DapplePot — AI Agent Security & Monitoring Platform";

function applyMeta(selector, attr, value) {
  if (!value) return null;
  const tag = document.querySelector(selector);
  if (!tag) return null;
  const prev = tag.getAttribute(attr);
  tag.setAttribute(attr, value);
  return { tag, attr, prev };
}

// Client-side title/meta updater. In Next.js this is mostly redundant since
// `metadata` and `generateMetadata` exports render the correct <head> on the
// server — but the landing page's client-only behavior kept it here as a
// belt-and-braces default for pages that don't opt into server metadata.
export function useDocumentMeta({ title, description, image, url }) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title || DEFAULT_TITLE;

    const resets = [
      applyMeta('meta[name="description"]', "content", description),
      applyMeta('meta[property="og:title"]', "content", title),
      applyMeta('meta[property="og:description"]', "content", description),
      applyMeta('meta[property="og:image"]', "content", image),
      applyMeta('meta[property="og:url"]', "content", url),
      applyMeta('meta[name="twitter:title"]', "content", title),
      applyMeta('meta[name="twitter:description"]', "content", description),
      applyMeta('meta[name="twitter:image"]', "content", image),
      applyMeta('link[rel="canonical"]', "href", url),
    ].filter(Boolean);

    return () => {
      document.title = prevTitle;
      resets.forEach(({ tag, attr, prev }) => {
        if (prev !== null) tag.setAttribute(attr, prev);
      });
    };
  }, [title, description, image, url]);
}
