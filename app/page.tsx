import Navigation from "@/components/Navigation";
import ShaderCanvas from "@/components/ShaderCanvas";
import { projects } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#080807] flex flex-col items-center overflow-x-hidden py-3 text-white">
      {/* CONTAINER */}
      <div className="w-full max-w-[1416px] flex flex-col items-center gap-[53px]">
        {/* NAVIGATION */}
        <div className="w-full h-[43px] flex items-center shrink-0">
          <Navigation />
        </div>

        {/* Shader container */}
        <div className="w-full h-[448px] shrink-0 rounded-[243px] overflow-hidden relative">
          <ShaderCanvas />
        </div>

        {/* CONTENT */}
        <div className="w-full flex flex-row items-start justify-between gap-[10px] h-auto min-h-[355px]">
          {/* Left: Bio */}
          <div className="w-[708px] flex flex-col justify-end items-start gap-[23px]">
            <p
              className="text-[32px] leading-[38px] text-white font-medium"
              style={{ fontFamily: "'PP Neue Montreal', var(--font-space-grotesk), sans-serif" }}
            >
              <span className="inline-block mr-4 font-normal">(→)</span>
              <span>
                MASONDA is a creative development studio run{" "}
                <span className="underline underline-offset-2">by Joseph</span>
                . I build change-making digital products for bold founders who
                refuse to be ignored.
              </span>
            </p>
            <p
              className="text-[14px] uppercase text-[#ffffff] leading-[18px] max-w-[431px] font-medium"
              style={{ fontFamily: "'Geist Mono', var(--font-geist-mono), monospace" }}
            >
              Outcomes from obsession on quality: 20+ projects shipped across East Africa &amp; beyond, 3 startups taken to market, $500K+ in product value created + more.
            </p>
          </div>

          {/* Right: Projects list */}
          <div className="w-[708px] flex flex-col items-start gap-[10px]">
            <p
              className="text-[14px] uppercase text-[#d1d1d1] font-medium mb-2 leading-[18px]"
              style={{ fontFamily: "'Geist Mono', var(--font-geist-mono), monospace" }}
            >
              Creative brands we&apos;ve helped_
            </p>
            <div className="w-full flex border-t border-[rgba(148,148,148,0.4)] flex-col">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/works/${project.slug}`}
                  className="project-row group border-b border-[rgba(148,148,148,0.4)] flex flex-row items-center justify-between px-1 py-[8px] h-[38px]"
                >
                  <span
                    className="text-[18px] font-medium tracking-[0.01em] leading-[22px]"
                    style={{ fontFamily: "'PP Neue Montreal', var(--font-space-grotesk), sans-serif" }}
                  >
                    {project.title}
                  </span>
                  <div className="flex flex-row justify-center items-center p-[4px_6px] w-[26px] h-[22px]">
                    <span className="arrow-wrap relative transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">
                      <svg
                        className="arrow-icon"
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
