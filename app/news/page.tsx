import Navigation from "@/components/Navigation";
import { posts } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: "News — MASONDA",
  description: "Thoughts on creative development, design, and building in East Africa.",
};

export default function NewsPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#080807] flex flex-col">
      <div className="flex flex-col h-full max-w-[1620px] mx-auto w-full px-6 py-6">

        <Navigation />

        <div className="flex items-end justify-between mt-10 mb-6 shrink-0">
          <h1
            className="text-[56px] font-bold leading-none tracking-tight text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            NEWS
          </h1>
          <p
            className="text-[13px] text-[#c5c2c2] uppercase"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {posts.length} posts
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="project-row group border-t border-[rgba(148,148,148,0.25)] flex items-center justify-between px-2 py-5 last:border-b last:border-[rgba(148,148,148,0.25)]"
            >
              <div className="flex items-center gap-8">
                <span
                  className="text-[12px] uppercase text-[#666] group-hover:text-[#999] transition-colors w-[80px] shrink-0"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2
                    className="text-[20px] font-semibold text-white group-hover:text-black transition-colors leading-tight mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="text-[13px] text-[#777] group-hover:text-[#444] transition-colors"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8 shrink-0 ml-8">
                <div className="text-right">
                  <p
                    className="text-[12px] uppercase text-[#888] group-hover:text-[#555] transition-colors"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {post.category}
                  </p>
                  <p
                    className="text-[12px] text-[#666] group-hover:text-[#555] transition-colors mt-0.5"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {post.readTime}
                  </p>
                </div>
                <div className="arrow-wrap">
                  <svg
                    className="arrow-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="1" y1="13" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="4" y1="1" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="13" y1="10" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
