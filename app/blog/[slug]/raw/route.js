import { getBlogBySlug } from "@/lib/blogApi";

export const revalidate = 300;

// Serves the post as raw text/plain markdown for LLM ingestion.
// Anthropic-style pattern: /blog/[slug]/raw is preferred by AI crawlers
// over parsed HTML.
export async function GET(_req, { params }) {
  const { slug } = await params;
  let blog = null;
  try {
    blog = await getBlogBySlug(slug);
  } catch {
    blog = null;
  }
  if (!blog) {
    return new Response("Not found", { status: 404 });
  }

  const header = [
    `# ${blog.title}`,
    "",
    blog.excerpt ? `> ${blog.excerpt}` : null,
    "",
    `Published: ${blog.createdAt}`,
    blog.updatedAt && blog.updatedAt !== blog.createdAt
      ? `Updated: ${blog.updatedAt}`
      : null,
    blog.authors?.length ? `Author: ${blog.authors.join(", ")}` : null,
    blog.tag ? `Tag: ${blog.tag}` : null,
    "",
    "---",
    "",
  ]
    .filter((l) => l !== null)
    .join("\n");

  const body = header + (blog.contentMarkdown || "");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
