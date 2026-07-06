export const API_BASE =
  process.env.NEXT_PUBLIC_BLOG_API_BASE || "https://api.dapplepot.com";

async function handle(res) {
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Blog API request failed with ${res.status}`);
  }
  return res.json();
}

export async function listBlogs(
  { page = 1, limit = 9, search, tag, revalidate } = {}
) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search) params.set("search", search);
  if (tag) params.set("tag", tag);

  const fetchOpts =
    typeof revalidate === "number" ? { next: { revalidate } } : undefined;

  const res = await fetch(`${API_BASE}/v1/blogs?${params.toString()}`, fetchOpts);
  return handle(res);
}

export async function getBlogBySlug(slug, { revalidate } = {}) {
  const fetchOpts =
    typeof revalidate === "number" ? { next: { revalidate } } : undefined;

  const res = await fetch(
    `${API_BASE}/v1/blogs/${encodeURIComponent(slug)}`,
    fetchOpts
  );
  return handle(res);
}
