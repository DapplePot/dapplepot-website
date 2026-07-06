"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listBlogs } from "@/lib/blogApi";

function formatMonthYear(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
}

export default function BlogListClient({
  initialData,
  initialError,
  availableTags,
  pageSize,
}) {
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState(initialError ? "error" : "ready");
  // Track whether this is the first render — skip the client fetch on mount
  // so we use the server-rendered initialData instead of double-fetching.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    // Instant top-of-page on mount — protects against Next's client
    // nav landing us mid-scroll when arriving from a scrolled route.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    let cancelled = false;
    setStatus("loading");
    listBlogs({
      page,
      limit: pageSize,
      tag: tag || undefined,
      search: search || undefined,
    })
      .then((res) => {
        if (cancelled) return;
        setData(res);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [hydrated, page, tag, search, pageSize]);

  const blogs = data?.data ?? [];
  const totalPages = data?.pagination?.pages ?? 1;

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-7">
        <div className="flex flex-wrap gap-2">
          <button
            className={`cursor-pointer rounded-[2px] border px-[14px] py-[6px] text-[13px] font-medium transition-[color,border-color,background] duration-[120ms] ${
              tag === ""
                ? "border-purple/40 bg-purple/10 text-purple"
                : "border-border bg-transparent text-muted hover:border-border-2 hover:text-text"
            }`}
            onClick={() => {
              setTag("");
              setPage(1);
            }}
          >
            All
          </button>
          {availableTags.map((t) => (
            <button
              key={t}
              className={`cursor-pointer rounded-[2px] border px-[14px] py-[6px] text-[13px] font-medium transition-[color,border-color,background] duration-[120ms] ${
                tag === t
                  ? "border-purple/40 bg-purple/10 text-purple"
                  : "border-border bg-transparent text-muted hover:border-border-2 hover:text-text"
              }`}
              onClick={() => {
                setTag(t);
                setPage(1);
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative max-w-[280px] flex-1 basis-[220px]">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="4.8" stroke="currentColor" strokeWidth="1.4" />
            <path d="M9.6 9.6L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-[2px] border border-border bg-bg-3 py-[9px] pl-[34px] pr-[14px] text-sm text-text outline-none transition-colors duration-[120ms] placeholder:text-muted focus:border-purple"
          />
        </div>
      </div>

      <div className="grid min-h-[460px] content-center gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {status === "error" && (
          <p className="col-span-full py-10 text-center text-[15px] text-muted">
            Couldn&apos;t load blog posts right now. Please try again later.
          </p>
        )}
        {status === "ready" && blogs.length === 0 && (
          <p className="col-span-full py-10 text-center text-[15px] text-muted">
            No posts found.
          </p>
        )}
        {status === "ready" &&
          blogs.length > 0 &&
          blogs.map((blog, index) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex animate-blog-card-in flex-col border border-border bg-bg-3 text-inherit no-underline transition-[border-color,transform] duration-150 hover:-translate-y-[2px] hover:border-border-2"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="relative w-full aspect-[1200/630] bg-bg-2">
                {blog.bannerImageUrl && (
                  <img
                    src={blog.bannerImageUrl}
                    alt=""
                    loading="lazy"
                    className="block h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                  />
                )}
                <span className="absolute right-[10px] top-[10px] rounded-[3px] border border-purple/30 bg-purple/[0.22] px-[10px] py-1 text-[11px] font-semibold text-purple">
                  {blog.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-[18px_18px_20px]">
                <h2 className="mb-[14px] text-[17px] font-bold leading-[1.35] text-[#f1f1f1]">
                  {blog.title}
                </h2>
                <p className="mb-4 flex-1 overflow-hidden text-ellipsis text-sm leading-[1.6] text-muted [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [display:-webkit-box] [line-clamp:3]">
                  {blog.excerpt}
                </p>
                <div className="mt-[14px] flex items-center justify-between gap-3 border-t border-border pt-[14px]">
                  <span className="text-[12.5px] uppercase tracking-[0.04em] text-muted">
                    {formatMonthYear(blog.createdAt)}
                  </span>
                  <span className="inline-flex items-center gap-[5px] text-xs font-semibold uppercase tracking-[0.04em] text-purple">
                    Read{" "}
                    <span className="inline-block transition-transform duration-150 group-hover:translate-x-[3px]">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {status === "ready" && totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-5 text-sm text-muted">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="cursor-pointer rounded-[2px] border border-border bg-bg-3 px-4 py-2 text-sm text-text transition-[border-color,opacity] duration-[120ms] enabled:hover:border-border-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="cursor-pointer rounded-[2px] border border-border bg-bg-3 px-4 py-2 text-sm text-text transition-[border-color,opacity] duration-[120ms] enabled:hover:border-border-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
