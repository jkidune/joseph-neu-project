"use client";

import Navigation from "@/components/Navigation";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, wire to a form API (Resend, Formspree, etc.)
    setSent(true);
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#080807] flex flex-col">
      <div className="flex flex-col h-full max-w-[1620px] mx-auto w-full px-6 py-6">

        <Navigation />

        <div className="flex-1 min-h-0 flex items-center justify-center mt-8">
          <div className="w-full max-w-[900px]">

            {!sent ? (
              <>
                <div className="flex items-end justify-between mb-10">
                  <h1
                    className="text-[56px] font-bold leading-none tracking-tight text-white"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    LET&apos;S BUILD
                    <br />
                    SOMETHING.
                  </h1>
                  <p
                    className="text-[14px] text-[#888] max-w-[280px] text-right leading-relaxed"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    Currently booking Q3 2025 projects. Drop a message and I&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[11px] uppercase text-[#666]"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                      htmlFor="name"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Joseph Masonda"
                      className="bg-transparent border border-[rgba(148,148,148,0.3)] px-4 py-3 text-white text-[15px] placeholder:text-[#444] focus:outline-none focus:border-white transition-colors"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[11px] uppercase text-[#666]"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                      htmlFor="email"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="hello@company.com"
                      className="bg-transparent border border-[rgba(148,148,148,0.3)] px-4 py-3 text-white text-[15px] placeholder:text-[#444] focus:outline-none focus:border-white transition-colors"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    />
                  </div>

                  {/* Company */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[11px] uppercase text-[#666]"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                      htmlFor="company"
                    >
                      Company / Project
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="bg-transparent border border-[rgba(148,148,148,0.3)] px-4 py-3 text-white text-[15px] placeholder:text-[#444] focus:outline-none focus:border-white transition-colors"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    />
                  </div>

                  {/* Budget */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[11px] uppercase text-[#666]"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                      htmlFor="budget"
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="bg-[#080807] border border-[rgba(148,148,148,0.3)] px-4 py-3 text-white text-[15px] focus:outline-none focus:border-white transition-colors appearance-none"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      <option value="" disabled>Select a range</option>
                      <option value="<5k">Under $5,000</option>
                      <option value="5-15k">$5,000 – $15,000</option>
                      <option value="15-30k">$15,000 – $30,000</option>
                      <option value="30k+">$30,000+</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="col-span-2 flex flex-col gap-2">
                    <label
                      className="text-[11px] uppercase text-[#666]"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                      htmlFor="message"
                    >
                      Tell me about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="What are you building and why does it matter?"
                      className="bg-transparent border border-[rgba(148,148,148,0.3)] px-4 py-3 text-white text-[15px] placeholder:text-[#444] focus:outline-none focus:border-white transition-colors resize-none"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    />
                  </div>

                  {/* Submit */}
                  <div className="col-span-2 flex items-center justify-between">
                    <p
                      className="text-[12px] text-[#555]"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                    >
                      I respond within 24 hours.
                    </p>
                    <button
                      type="submit"
                      className="cta-btn bg-white text-[#414040] px-8 py-4 font-bold text-[14px] tracking-wide uppercase cursor-pointer"
                      style={{ fontFamily: "var(--font-space-mono)" }}
                    >
                      SEND MESSAGE →
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center gap-6 h-full py-24">
                <p className="text-[64px]">→</p>
                <h2
                  className="text-[40px] font-bold text-white"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Message sent.
                </h2>
                <p
                  className="text-[16px] text-[#888] max-w-[400px]"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  I&apos;ll be in touch within 24 hours. Talk soon, {form.name.split(" ")[0]}.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-[13px] uppercase text-[#666] hover:text-white transition-colors mt-4"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  Send another →
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
