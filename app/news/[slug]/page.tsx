import Navigation from "@/components/Navigation";
import { posts, getPost } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — MASONDA`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === post.slug);
  const next = posts[(currentIndex + 1) % posts.length];

  return (
    <main className="min-h-screen w-full bg-[#080807] flex flex-col overflow-x-hidden text-white">
      <div className="flex flex-col h-full max-w-[1620px] mx-auto w-full px-4 md:px-6 py-6 border-transparent">

        <header className="shrink-0 z-10 w-full mb-6 relative">
          <Navigation />
        </header>

        <div className="flex-1 w-full flex flex-col lg:flex-row gap-12 lg:gap-16 mt-4 md:mt-10 border-transparent">
          {/* Left: Article */}
          <div className="flex-1 flex flex-col justify-between border-transparent w-full">
            <div className="border-transparent">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6">
                <span
                  className="text-[11px] md:text-[12px] uppercase text-[#888]"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {post.category}
                </span>
                <span className="text-[#444] hidden sm:block">·</span>
                <span
                  className="text-[11px] md:text-[12px] text-[#888]"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {post.date}
                </span>
                <span className="text-[#444] hidden sm:block">·</span>
                <span
                  className="text-[11px] md:text-[12px] text-[#888] w-full sm:w-auto mt-1 sm:mt-0"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {post.readTime}
                </span>
              </div>

              <h1
                className="text-[32px] md:text-[44px] font-bold leading-tight tracking-tight text-white mb-6 md:mb-8 max-w-[640px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {post.title}
              </h1>

              <div
                className="text-[15px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#c5c2c2] max-w-[600px] space-y-4 mb-10 overflow-hidden"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {post.content.split("\n\n").map((para, i) => (
                  <p key={i} className={para.startsWith("**") ? "font-semibold text-white" : ""}>
                    {para.replace(/\*\*/g, "")}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom nav */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[rgba(148,148,148,0.2)] pt-6 gap-4 sm:gap-0 mt-6 sm:mt-0">
              <Link
                href="/news"
                className="text-[12px] md:text-[13px] uppercase text-[#888] hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                ← All Posts
              </Link>
              <Link
                href={`/news/${next.slug}`}
                className="group flex flex-row items-center gap-3 text-[#888] hover:text-white transition-colors"
              >
                <span style={{ fontFamily: "var(--font-geist-mono)" }} className="text-[12px] md:text-[13px] uppercase">
                  Next: <span className="hidden sm:inline">{next.title}</span><span className="sm:hidden">Post</span>
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="1" y1="13" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="4" y1="1" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="13" y1="10" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: metadata sidebar */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6 lg:gap-8 pt-6 lg:pt-2 border-t lg:border-t-0 border-[rgba(148,148,148,0.2)]">
            <div className="flex flex-row lg:flex-col justify-between lg:justify-start gap-4">
              <div className="flex-1 lg:flex-none">
                <p
                  className="text-[10px] md:text-[11px] uppercase text-[#555] mb-1 md:mb-2"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  Category
                </p>
                <p
                  className="text-[13px] md:text-[14px] text-white"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {post.category}
                </p>
              </div>
              <div className="flex-1 lg:flex-none">
                <p
                  className="text-[10px] md:text-[11px] uppercase text-[#555] mb-1 md:mb-2"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  Published
                </p>
                <p
                  className="text-[13px] md:text-[14px] text-white"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {post.date}
                </p>
              </div>
              <div className="flex-1 lg:flex-none hidden sm:block">
                <p
                  className="text-[10px] md:text-[11px] uppercase text-[#555] mb-1 md:mb-2"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  Read Time
                </p>
                <p
                  className="text-[13px] md:text-[14px] text-white"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {post.readTime}
                </p>
              </div>
            </div>
            
            <div className="w-full pt-4 lg:pt-6 border-t border-[rgba(148,148,148,0.2)]">
              <Link
                href="/contact"
                className="cta-btn w-full bg-white text-[#414040] block text-center py-4 font-bold text-[13px] tracking-wide uppercase"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                BOOK A CALL ↗
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
