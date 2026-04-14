import Navigation from "@/components/Navigation";
import { projects, getProject } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — MASONDA`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];
  const prev = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <main className="min-h-screen w-full bg-[#080807] flex flex-col overflow-x-hidden text-white">
      <div className="flex flex-col h-full max-w-[1620px] mx-auto w-full px-4 md:px-6 py-6 border-transparent">

        <header className="shrink-0 z-10 w-full mb-6 relative">
          <Navigation />
        </header>

        <div className="flex-1 w-full flex flex-col lg:flex-row gap-12 mt-4 md:mt-10 border-transparent">
          {/* Left: Project details */}
          <div className="flex-1 flex flex-col justify-between border-transparent w-full">
            <div className="border-transparent">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-[11px] md:text-[12px] uppercase text-[#888]"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {project.category}
                </span>
                <span className="text-[#444]">·</span>
                <span
                  className="text-[11px] md:text-[12px] text-[#888]"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {project.year}
                </span>
              </div>

              <h1
                className="text-[36px] md:text-[52px] font-bold leading-none tracking-tight text-white mb-6 md:mb-8"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {project.title}
              </h1>

              <p
                className="text-[15px] md:text-[17px] leading-[1.7] text-[#c5c2c2] mb-6 md:mb-8 max-w-[560px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {project.longDescription}
              </p>

              <div className="flex gap-2 flex-wrap mb-10 lg:mb-0">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] md:text-[12px] uppercase border border-[rgba(148,148,148,0.35)] px-3 py-1 text-[#999]"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation between projects */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[rgba(148,148,148,0.2)] pt-6 mt-8 sm:mt-0 gap-4 sm:gap-0 w-full border-transparent">
              <Link
                href={`/works/${prev.slug}`}
                className="group flex flex-row items-center gap-3 text-[#888] hover:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="10" y1="13" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="1" y1="4" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{ fontFamily: "var(--font-geist-mono)" }} className="text-[12px] md:text-[13px] uppercase">
                  {prev.title}
                </span>
              </Link>

              <Link
                href="/works"
                className="text-[12px] md:text-[13px] uppercase text-[#888] hover:text-white transition-colors hidden sm:block"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                All Works
              </Link>

              <Link
                href={`/works/${next.slug}`}
                className="group flex flex-row items-center gap-3 text-[#888] hover:text-white transition-colors"
              >
                <span style={{ fontFamily: "var(--font-geist-mono)" }} className="text-[12px] md:text-[13px] uppercase">
                  {next.title}
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="1" y1="13" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="4" y1="1" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="13" y1="10" x2="13" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Color swatch + CTA */}
          <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-6 mt-6 lg:mt-0">
            {/* Color block as visual placeholder */}
            <div
              className="w-full h-[240px] lg:h-auto lg:flex-1 rounded-[32px]"
              style={{ background: `linear-gradient(135deg, ${project.color}33 0%, ${project.color}88 50%, ${project.color}22 100%)`, border: `1px solid ${project.color}44` }}
            >
              <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-8">
                <div
                  className="w-16 h-16 rounded-full"
                  style={{ background: project.color }}
                />
                <p
                  className="text-[11px] md:text-[13px] uppercase text-[#888] text-center"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {project.category}
                </p>
              </div>
            </div>

            {/* CTA */}
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn w-full bg-white text-[#414040] text-center py-4 font-bold text-[13px] md:text-[14px] tracking-wide uppercase"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                VIEW LIVE PROJECT ↗
              </Link>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
