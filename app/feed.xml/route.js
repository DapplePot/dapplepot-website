import { listBlogs } from "@/lib/blogApi";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 300;

function escapeXml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let posts = [];
  try {
    const res = await listBlogs({ page: 1, limit: 20 });
    posts = res?.data ?? [];
  } catch {
    posts = [];
  }

  const now = new Date().toUTCString();

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      const pubDate = new Date(p.createdAt).toUTCString();
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(p.excerpt || "")}</description>
      ${p.tag ? `<category>${escapeXml(p.tag)}</category>` : ""}
      ${(p.authors || []).map((a) => `<author>${escapeXml(a)}</author>`).join("")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DapplePot Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Research, insights, and product updates on AI agent security, runtime detection, and OWASP Agentic AI coverage.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
