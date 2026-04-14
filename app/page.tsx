import Navigation from "@/components/Navigation";
import ShaderCanvas from "@/components/ShaderCanvas";
import { projects } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#080807] flex flex-col">

      {/* Nav — padded, max-width container */}
      <div className="shrink-0 w-full px-6 pt-6">
        <div className="max-w-[1620px] mx-auto">
          <Navigation />
        </div>
      </div>

      {/* Shader — full bleed, fills remaining vertical space */}
      <div className="flex-1 min-h-0 w-full mt-5">
        <ShaderCanvas />
      </div>

      {/* Bottom content — pinned to bottom, padded */}
      <div className="shrink-0 w-full px-6 pb-6">
        <div className="max-w-[1620px] mx-auto flex items-end justify-between gap-10">

          {/* Left: Bio */}
          <div className="flex-1 min-w-0 flex flex-col gap-[14px]">
            <p
              className="text-[28px] leading-[1.25] text-white"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <span className="inline-block mr-8 font-normal">(→)</span>
              <span>
                MASONDA is a creative development studio run{" "}
                <span className="underline underline-offset-2">by Joseph</span>
                . I build change-making digital products for bold founders who
                refuse to be ignored.
              </span>
            </p>
            <p
              className="text-[13px] uppercase text-[#b2afaf] leading-[1.5] max-w-[420px]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <span className="text-white font-semibold">
                Outcomes from obsession on craft:{" "}
              </span>
              20+ projects shipped across East Africa &amp; beyond, 3 startups
              taken to market, $500K+ in product value created + more.
            </p>
          </div>

          {/* Right: Projects list */}
          <div className="flex-1 min-w-0 flex flex-col gap-0">
            <p
              className="text-[13px] uppercase text-[#d1d1d1] font-medium mb-2"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Creative brands we&apos;ve helped_
            </p>
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/works/${project.slug}`}
                className="project-row border-b border-[rgba(148,148,148,0.4)] flex items-center justify-between px-1 py-[6px]"
              >
                <span
                  className="text-[17px] font-medium tracking-[0.01em]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {project.title}
                </span>
                <span className="arrow-wrap">
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
              </Link>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
