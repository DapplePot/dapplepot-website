import { SITE_URL } from "@/lib/constants";

// Explicit allow for AI training + retrieval crawlers.
// Preserves the non-standard `LLMs:` directive from source robots.txt
// via the `host` field (Next's Robots type doesn't have a slot for it,
// so we don't emit it here — llms.txt is discovered via the <link
// rel="alternate" type="text/plain"> in the root layout instead).
export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // AI training crawlers — explicit allow
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      // Search / retrieval crawlers
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
