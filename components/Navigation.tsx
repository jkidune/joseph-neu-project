"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Clock from "./Clock";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between w-full shrink-0">
      {/* Left cluster */}
      <div className="flex items-center gap-[36px]">
        <div className="flex items-center gap-[36px]">
          <Link
            href="/"
            className="text-[32px] font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            MASONDA
          </Link>
          <span
            className="text-[#c5c2c2] text-[15px] uppercase"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            <Clock />
          </span>
        </div>
        <div
          className="flex items-center gap-[26px] text-[#c5c2c2] text-[15px] uppercase"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          <Link
            href="/works"
            className={`hover:text-white transition-colors duration-200 ${pathname === "/works" || pathname.startsWith("/works/") ? "text-white" : ""}`}
          >
            WORKS
          </Link>
          <Link
            href="/news"
            className={`hover:text-white transition-colors duration-200 ${pathname === "/news" || pathname.startsWith("/news/") ? "text-white" : ""}`}
          >
            NEWS
          </Link>
        </div>
      </div>

      {/* Center */}
      <p
        className="text-[18px] text-white font-medium tracking-wide"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        BOOKING PROJECTS FOR Q3
      </p>

      {/* Right CTA */}
      <Link
        href="/contact"
        className="cta-btn bg-white px-[14px] py-[11px] text-[#414040] text-[14px] font-bold tracking-wide uppercase"
        style={{ fontFamily: "var(--font-space-mono)" }}
      >
        BOOK DISCOVERY CALL WITH ME
      </Link>
    </nav>
  );
}
