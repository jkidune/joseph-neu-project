import Navigation from "@/components/Navigation";
import { projects } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: "Works — MASONDA",
  description: "Projects built by MASONDA creative development studio.",
};

export default function WorksPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#080807] flex flex-col">
      <div className="flex flex-col h-full max-w-[1620px] mx-auto w-full px-6 py-6">

        {/* Navigation */}
        <Navigation />

        {/* Page title */}
        <div className="flex items-end justify-between mt-10 mb-6 shrink-0">
          <h1
            className="text-[56px] font-bold leading-none tracking-tight text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            WORKS
          </h1>
          <p
            className="text-[13px] text-[#c5c2c2] uppercase"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {projects.length} projects
          </p>
        </div>

        {/* Projects grid */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="grid grid-cols-2 gap-[1px] h-full border border-[rgba(148,148,148,0.2)]">
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                href={`/works/${project.slug}`}
                className="project-card group relative flex flex-col justify-between p-6 border-[rgba(148,148,148,0.2)] overflow-hidden cursor-pointer"
                style={{
                  borderRight: i % 2 === 0 ? "1px solid rgba(148,148,148,0.2)" : undefined,
                  borderBottom: i < projects.length - 2 ? "1px solid rgba(148,148,148,0.2)" : undefined,
                }}
              >
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className="text-[12px] uppercase text-[#888] group-hover:text-[#555] transition-colors"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                    >
                      {project.category}
                    </span>
                    <span
                      className="text-[12px] text-[#888] group-hover:text-[#555] transition-colors"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                    >
                      {project.year}
                    </span>
                  </div>
                  <h2
                    className="text-[26px] font-semibold leading-tight text-white group-hover:text-black transition-colors"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {project.title}
                  </h2>
                </div>

                <div className="relative z-10">
                  <p
                    className="text-[13px] text-[#888] group-hover:text-[#444] transition-colors leading-relaxed mb-4 line-clamp-2"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] uppercase border border-[rgba(148,148,148,0.35)] group-hover:border-[rgba(0,0,0,0.25)] px-2 py-0.5 text-[#999] group-hover:text-[#555] transition-colors"
                          style={{ fontFamily: "var(--font-geist-mono)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="arrow-wrap">
                      <svg
                        className="arrow-icon"
                        width="18"
                        height="18"
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
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
