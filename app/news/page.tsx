import Navigation from "@/components/Navigation";
import { posts } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: "News — MASONDA",
  description: "Thoughts on creative development, design, and building in East Africa.",
};

export default function NewsPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#080807] flex flex-col text-white">
      <div className="flex flex-col h-full max-w-[1620px] mx-auto w-full px-4 md:px-6 py-6 border-transparent">

        <header className="shrink-0 z-10 w-full mb-6">
          <Navigation />
        </header>

        <div className="flex items-end justify-between mt-4 md:mt-10 mb-6 shrink-0 border-transparent">
          <h1
            className="text-[40px] md:text-[56px] font-bold leading-none tracking-tight text-white border-transparent"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            NEWS
          </h1>
          <p
            className="text-[11px] md:text-[13px] text-[#c5c2c2] uppercase border-transparent"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {posts.length} posts
          </p>
        </div>

        <div className="flex-1 w-full flex flex-col border-transparent">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="group border-t border-[rgba(148,148,148,0.25)] flex flex-col md:flex-row md:items-center justify-between px-2 py-5 last:border-b last:border-[rgba(148,148,148,0.25)] relative overflow-hidden"
            >
              {/* Background hover fill effect */}
              <div className="absolute inset-0 bg-[#f2c55b] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 hidden md:block"></div>
              
              <div className="flex flex-row md:items-center gap-4 md:gap-8 relative z-10 w-full md:w-auto">
                <span
                  className="text-[12px] uppercase text-[#666] md:group-hover:text-[#999] transition-colors w-[20px] md:w-[80px] shrink-0 pt-1 md:pt-0"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h2
                    className="text-[18px] md:text-[20px] font-semibold text-white md:group-hover:text-black transition-colors leading-tight mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="text-[12px] md:text-[13px] text-[#777] md:group-hover:text-[#444] transition-colors line-clamp-2 md:line-clamp-none"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 shrink-0 mt-4 md:mt-0 pl-[36px] md:pl-0 md:ml-8 relative z-10 w-full md:w-auto">
                <div className="text-left md:text-right flex flex-row md:flex-col gap-2 md:gap-0">
                  <p
                    className="text-[11px] md:text-[12px] uppercase text-[#888] md:group-hover:text-[#555] transition-colors"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {post.category}
                  </p>
                  <p
                    className="text-[11px] md:text-[12px] text-[#666] md:group-hover:text-[#555] transition-colors md:mt-0.5"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {post.readTime}
                  </p>
                </div>
                <div className="p-[4px] w-[28px] h-[28px] flex items-center justify-center transition-all duration-300 md:group-hover:-translate-x-2 md:group-hover:-translate-y-2 md:group-hover:text-black">
                  <span className="arrow-wrap">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="1" y1="13" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="4" y1="1" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="13" y1="10" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
