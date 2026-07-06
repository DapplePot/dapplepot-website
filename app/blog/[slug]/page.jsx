import { notFound } from "next/navigation";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import BlogPostToc from "@/components/BlogPostToc";
import { getBlogBySlug, listBlogs } from "@/lib/blogApi";
import { renderMarkdown, extractHeadings } from "@/lib/markdown";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 300;

// Pre-render known slugs at build time; anything new becomes ISR on demand.
export async function generateStaticParams() {
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
    for (const post of res.data) collected.push({ slug: post.slug });
    const totalPages = res?.pagination?.pages ?? 1;
    if (page >= totalPages) break;
    page += 1;
  }
  return collected;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let blog = null;
  try {
    blog = await getBlogBySlug(slug);
  } catch {
    /* fall through */
  }
  if (!blog) {
    return { title: "Post not found — DapplePot Blog" };
  }
  const url = `${SITE_URL}/blog/${blog.slug}`;
  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || blog.excerpt || "";
  const image = blog.bannerImageUrl;
  return {
    title: `${title} — DapplePot Blog`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: image ? [{ url: image }] : undefined,
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: blog.authors,
      tags: blog.tag ? [blog.tag] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatAuthors(authors) {
  if (!authors || authors.length === 0) return "";
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return authors.join(" & ");
  return `${authors.slice(0, -1).join(", ")} & ${authors[authors.length - 1]}`;
}

function wasMeaningfullyUpdated(createdAt, updatedAt) {
  if (!updatedAt) return false;
  return new Date(createdAt).toDateString() !== new Date(updatedAt).toDateString();
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  let blog = null;
  try {
    blog = await getBlogBySlug(slug);
  } catch {
    blog = null;
  }
  if (!blog) notFound();

  const contentHtml = renderMarkdown(blog.contentMarkdown);
  const headings = extractHeadings(contentHtml);
  const url = `${SITE_URL}/blog/${blog.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt,
    image: blog.bannerImageUrl ? [blog.bannerImageUrl] : undefined,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: (blog.authors || []).map((name) => ({ "@type": "Person", name })),
    publisher: {
      "@type": "Organization",
      name: "DapplePot",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/dapplePotLogo.png`,
      },
    },
    mainEntityOfPage: url,
    keywords: blog.tag,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      { "@type": "ListItem", position: 3, name: blog.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-bg pt-[54px] text-text">
      <SiteNav />
      <main className="mx-auto max-w-[1440px] px-6 pt-24 pb-36 md:px-[72px] max-[640px]:px-4 max-[640px]:pt-14 max-[640px]:pb-14">
        <div className="mb-7 flex items-center gap-2 text-[13px] text-muted">
          <Link
            href="/"
            className="text-muted no-underline transition-colors duration-[120ms] hover:text-text"
          >
            Home
          </Link>
          <span className="opacity-50">›</span>
          <Link
            href="/blog"
            className="text-muted no-underline transition-colors duration-[120ms] hover:text-text"
          >
            Blog
          </Link>
        </div>

        <BlogPostToc
          headings={headings}
          contentHtml={contentHtml}
          header={
            <>
              <h1 className="mb-4 text-[44px] font-bold leading-[1.2] tracking-[-0.02em] text-[#f1f1f1] max-[640px]:text-[28px]">
                {blog.title}
              </h1>
              <div className="mb-8 flex flex-wrap items-center gap-1.5 text-[13.5px] text-muted">
                <span>{formatDate(blog.createdAt)}</span>
                {wasMeaningfullyUpdated(blog.createdAt, blog.updatedAt) && (
                  <>
                    <span className="opacity-50">·</span>
                    <span>Updated {formatDate(blog.updatedAt)}</span>
                  </>
                )}
                {blog.readTime && (
                  <>
                    <span className="opacity-50">·</span>
                    <span>{blog.readTime}</span>
                  </>
                )}
                {blog.tag && (
                  <>
                    <span className="opacity-50">·</span>
                    <span>{blog.tag}</span>
                  </>
                )}
                {blog.authors?.length > 0 && (
                  <>
                    <span className="opacity-50">·</span>
                    <span>By {formatAuthors(blog.authors)}</span>
                  </>
                )}
              </div>
              {blog.bannerImageUrl && (
                <img
                  src={blog.bannerImageUrl}
                  alt=""
                  className="mb-12 mt-12 block aspect-[1200/630] w-full rounded-md border border-border object-cover"
                />
              )}
            </>
          }
        />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </div>
  );
}
