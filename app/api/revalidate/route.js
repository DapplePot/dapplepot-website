import { revalidatePath, revalidateTag } from "next/cache";

// On-demand revalidation. Your blog admin should POST here on publish
// or update, so the ISR cache flushes immediately instead of waiting
// for the 5-minute idle revalidation window.
//
// curl -X POST https://www.dapplepot.com/api/revalidate \
//   -H "Content-Type: application/json" \
//   -d '{"secret":"...","slug":"my-post"}'
//
// Body: { secret: string, slug?: string, path?: string }
// If neither slug nor path is provided, revalidates /blog and sitemap only.
export async function POST(req) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return new Response(JSON.stringify({ error: "REVALIDATE_SECRET not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (body?.secret !== secret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const revalidated = [];

  if (body?.slug) {
    revalidatePath(`/blog/${body.slug}`);
    revalidated.push(`/blog/${body.slug}`);
  }
  if (body?.path) {
    revalidatePath(body.path);
    revalidated.push(body.path);
  }

  // Always refresh list, feed, sitemap on any publish
  revalidatePath("/blog");
  revalidatePath("/feed.xml");
  revalidatePath("/sitemap.xml");
  revalidated.push("/blog", "/feed.xml", "/sitemap.xml");

  return Response.json({ revalidated, now: Date.now() });
}
