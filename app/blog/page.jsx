import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import BlogListClient from "@/components/BlogListClient";
import { listBlogs } from "@/lib/blogApi";
import { SITE_URL } from "@/lib/constants";

const TAGS = ["Research", "Insights", "Announcements", "Product Updates"];
const PAGE_SIZE = 9;

// ISR every 5 min; on-demand revalidation via /api/revalidate refreshes on publish.
export const revalidate = 300;

export const metadata = {
  title: "Blog",
  description:
    "Research, insights, and product updates on AI agent security, runtime detection, and OWASP Agentic AI coverage from the DapplePot team.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog | DapplePot",
    description:
      "Research, insights, and product updates on AI agent security, runtime detection, and OWASP Agentic AI coverage.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

async function fetchInitial() {
  try {
    const data = await listBlogs({ page: 1, limit: PAGE_SIZE });
    return { data, error: false };
  } catch {
    return { data: null, error: true };
  }
}

async function fetchAvailableTags() {
  const results = await Promise.all(
    TAGS.map(async (t) => {
      try {
        const res = await listBlogs({ page: 1, limit: 1, tag: t });
        return res?.pagination?.total > 0 ? t : null;
      } catch {
        return null;
      }
    })
  );
  return results.filter(Boolean);
}

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "DapplePot Blog",
  description:
    "Research, insights, and product updates on AI agent security, runtime detection, and OWASP Agentic AI coverage.",
  url: `${SITE_URL}/blog`,
  publisher: {
    "@type": "Organization",
    name: "DapplePot",
    url: SITE_URL,
    logo: `${SITE_URL}/dapplePotLogo.png`,
  },
};

export default async function BlogPage() {
  const [{ data: initialData, error: initialError }, availableTags] =
    await Promise.all([fetchInitial(), fetchAvailableTags()]);

  return (
    <div className="min-h-screen bg-bg pt-[54px] text-text">
      <SiteNav />
      <main className="mx-auto max-w-[1440px] px-6 pt-24 pb-36 md:px-[72px] max-[640px]:px-4 max-[640px]:pt-14 max-[640px]:pb-14">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-purple">
          Blog
        </p>
        <h1 className="mb-4 text-[40px] font-bold leading-[1.15] tracking-[-0.02em] text-[#f1f1f1] max-[640px]:text-[30px]">
          Research, insights &amp; updates
        </h1>
        <p className="mb-10 max-w-[640px] text-base leading-[1.7] text-text">
          Notes from the DapplePot team on AI agent security, runtime detection,
          and what it takes to keep autonomous agents accountable.
        </p>
        <BlogListClient
          initialData={initialData}
          initialError={initialError}
          availableTags={availableTags}
          pageSize={PAGE_SIZE}
        />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
    </div>
  );
}
