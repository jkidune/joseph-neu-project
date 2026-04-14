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
    <main className="h-screen w-screen overflow-hidden bg-[#080807] flex flex-col">
      <div className="flex flex-col h-full max-w-[1620px] mx-auto w-full px-6 py-6">

        <Navigation />

        <div className="flex-1 min-h-0 flex gap-16 mt-10">
          {/* Left: Article */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-[12px] uppercase text-[#888]"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {post.category}
                </span>
                <span className="text-[#444]">·</span>
                <span
                  className="text-[12px] text-[#888]"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {post.date}
                </span>
                <span className="text-[#444]">·</span>
                <span
                  className="text-[12px] text-[#888]"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {post.readTime}
                </span>
              </div>

              <h1
                className="text-[44px] font-bold leading-tight tracking-tight text-white mb-8 max-w-[640px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {post.title}
              </h1>

              <div
                className="text-[16px] leading-[1.8] text-[#c5c2c2] max-w-[600px] space-y-4 overflow-hidden"
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
            <div className="flex items-center justify-between border-t border-[rgba(148,148,148,0.2)] pt-6">
              <Link
                href="/news"
                className="text-[13px] uppercase text-[#888] hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                ← All Posts
              </Link>
              <Link
                href={`/news/${next.slug}`}
                className="group flex items-center gap-3 text-[#888] hover:text-white transition-colors"
              >
                <span style={{ fontFamily: "var(--font-geist-mono)" }} className="text-[13px] uppercase">
                  Next: {next.title}
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
          <div className="w-[280px] shrink-0 flex flex-col gap-8 pt-2">
            <div>
              <p
                className="text-[11px] uppercase text-[#555] mb-2"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Category
              </p>
              <p
                className="text-[14px] text-white"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {post.category}
              </p>
            </div>
            <div>
              <p
                className="text-[11px] uppercase text-[#555] mb-2"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Published
              </p>
              <p
                className="text-[14px] text-white"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {post.date}
              </p>
            </div>
            <div>
              <p
                className="text-[11px] uppercase text-[#555] mb-2"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Read Time
              </p>
              <p
                className="text-[14px] text-white"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {post.readTime}
              </p>
            </div>
            <div className="pt-6 border-t border-[rgba(148,148,148,0.2)]">
              <Link
                href="/contact"
                className="cta-btn bg-white text-[#414040] block text-center py-4 font-bold text-[13px] tracking-wide uppercase"
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
