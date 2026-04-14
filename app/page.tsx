import Navigation from "@/components/Navigation";
import ShaderCanvas from "@/components/ShaderCanvas";
import { projects } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen h-[100svh] bg-[#080807] flex flex-col justify-between overflow-hidden text-white p-6 md:p-8">
      
      {/* NAVIGATION */}
      <header className="w-full shrink-0 z-10">
        <Navigation />
      </header>

      {/* SHADER CANVAS (Fluid space filler) */}
      <div className="w-full flex-1 relative my-8 overflow-hidden rounded-[40px] md:rounded-[80px] lg:rounded-[120px]">
        <ShaderCanvas />
      </div>

      {/* BOTTOM CONTENT (Bio & Projects) */}
      <section className="w-full shrink-0 flex flex-col lg:flex-row items-end justify-between gap-12 lg:gap-24 relative z-10">
        
        {/* Left: Bio & Stats */}
        <div className="flex-1 max-w-[640px] flex flex-col justify-end items-start gap-6 lg:gap-8">
          <p
            className="text-[24px] md:text-[28px] lg:text-[32px] md:leading-[1.2] leading-[1.3] text-white font-medium"
            style={{ fontFamily: "'PP Neue Montreal', var(--font-space-grotesk), sans-serif" }}
          >
            <span className="inline-block mr-4 md:mr-8 font-normal">(→)</span>
            <span>
              MASONDA is a creative development studio run{" "}
              <a href="#" className="underline underline-offset-4 decoration-1 hover:text-[#f2c55b] transition-colors">by Joseph</a>
              . I build change-making digital products for bold founders who
              refuse to be ignored.
            </span>
          </p>
          <div className="flex flex-col">
            <p
              className="text-[12px] md:text-[14px] uppercase text-[#b2afaf] leading-[1.5] lg:leading-[1.8] font-medium"
              style={{ fontFamily: "'Geist Mono', var(--font-geist-mono), monospace" }}
            >
              <span className="text-white">Outcomes from obsession on quality: </span>
              20+ projects shipped across East Africa &amp; beyond, 3 startups taken to market, $500K+ in product value created + more.
            </p>
          </div>
        </div>

        {/* Right: Projects list */}
        <aside className="w-full lg:w-[500px] xl:w-[600px] flex flex-col shrink-0">
          <h1
            className="text-[12px] md:text-[14px] uppercase text-[#d1d1d1] font-medium mb-4 tracking-wide"
            style={{ fontFamily: "'Geist Mono', var(--font-geist-mono), monospace" }}
          >
            Creative brands I&apos;ve helped_
          </h1>
          <div className="w-full flex flex-col border-t border-[rgba(255,255,255,0.15)]">
            {projects.slice(0, 9).map((project) => (
              <Link
                key={project.slug}
                href={`/works/${project.slug}`}
                className="group relative flex flex-row items-center justify-between py-3 md:py-4 border-b border-[rgba(255,255,255,0.15)] overflow-hidden"
              >
                {/* Background hover fill effect */}
                <div className="absolute inset-0 bg-[#f2c55b] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                
                <span
                  className="relative z-10 text-[18px] md:text-[20px] font-medium tracking-[0.01em] transition-colors duration-300 group-hover:text-black group-hover:translate-x-2 transform"
                  style={{ fontFamily: "'PP Neue Montreal', var(--font-space-grotesk), sans-serif" }}
                >
                  {project.title}
                </span>
                
                <div className="relative z-10 p-[4px] w-[28px] h-[28px] flex items-center justify-center transition-all duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:text-black">
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
              </Link>
            ))}
          </div>
        </aside>

      </section>
    </main>
  );
}
