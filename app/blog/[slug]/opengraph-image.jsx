import { ImageResponse } from "next/og";
import { getBlogBySlug } from "@/lib/blogApi";

export const runtime = "nodejs";
export const alt = "DapplePot blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Prefers the API-provided bannerImageUrl (matches how the post already
// renders on the page). Falls back to a title-card generated with
// ImageResponse when no banner is available or the fetch fails.
export default async function Image({ params }) {
  const { slug } = await params;
  let blog = null;
  try {
    blog = await getBlogBySlug(slug);
  } catch {
    blog = null;
  }

  if (blog?.bannerImageUrl) {
    try {
      const res = await fetch(blog.bannerImageUrl);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        return new Response(buf, {
          headers: { "Content-Type": res.headers.get("content-type") || "image/png" },
        });
      }
    } catch {
      /* fall through to generated card */
    }
  }

  const title = blog?.title || "DapplePot";
  const tag = blog?.tag || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#050505",
          color: "#f1f1f1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: "#9080d4",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
            DapplePot
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {tag && (
            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                padding: "6px 14px",
                borderRadius: 4,
                background: "rgba(144,128,212,0.15)",
                border: "1px solid rgba(144,128,212,0.3)",
                color: "#9080d4",
                fontSize: 18,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {tag}
            </div>
          )}
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -1,
              maxWidth: "90%",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 22, color: "#8a8a8a" }}>dapplepot.com/blog</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
