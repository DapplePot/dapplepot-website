import { listBlogs } from "@/lib/blogApi";
import { SITE_URL } from "@/lib/constants";

// ISR: revalidate the sitemap every 5 minutes; on-demand
// revalidation via /api/revalidate refreshes it on publish.
export const revalidate = 300;

async function fetchAllSlugs() {
  const collected = [];
  let page = 1;
  const limit = 100;

  for (let i = 0; i < 20; i++) {
    let res;
    try {
      res = await listBlogs({ page, limit });
    } catch {
      break;
    }
    if (!res?.data?.length) break;
    for (const post of res.data) {
      collected.push({
        slug: post.slug,
        updatedAt: post.updatedAt || post.createdAt,
      });
    }
    const totalPages = res?.pagination?.pages ?? 1;
    if (page >= totalPages) break;
    page += 1;
  }
  return collected;
}

export default async function sitemap() {
  const posts = await fetchAllSlugs();
  const now = new Date();

  const routes = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const postRoutes = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...routes, ...postRoutes];
}
