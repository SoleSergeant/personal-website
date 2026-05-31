"use client";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24" style={{ background: "#FFFFFF" }}>
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-6 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)" }}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#00D4A0" }}>
              About
            </p>
            <h2 className="text-4xl font-bold mb-6 leading-tight" style={{ color: "#1C1C1E" }}>
              I build things<br />
              <span style={{ color: "#2B3490" }}>that actually move.</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              I'm Muhammadjon — a 17-year-old Economics & Computer Science student at the
              Presidential School in Fergana, Uzbekistan. I sit at the intersection of
              leadership and technology, building systems, teams, and environments where
              talented people do their best work.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              I started as a volunteer. Ten months later I was running the organization.
              That's not luck — it's showing up, taking ownership, and scaling fast.
            </p>
            <p className="text-gray-600 leading-relaxed">
              I'm drawn to initiatives that are early-stage, high-impact, and underestimated —
              the kind where the gap between what exists and what's possible is still wide open.
              If you're building something meaningful in Central Asia's tech or youth development
              space, let's talk.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["English — Full Professional", "Uzbek — Native", "FerPS '27", "Cinephile"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border"
                  style={{ borderColor: "#E5E7EB", color: "#6B7280" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — quote card */}
          <div className="space-y-4">
            <blockquote
              className="relative rounded-2xl p-8 border-l-4"
              style={{ background: "#EFF6FF", borderColor: "#2B3490" }}
            >
              <p className="text-xl font-semibold leading-snug italic" style={{ color: "#2B3490" }}>
                "I started as a volunteer. Ten months later I was running the organization."
              </p>
              <p className="mt-4 text-sm text-gray-500 font-medium">— Muhammadjon Ozodjonov</p>
            </blockquote>

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "4", label: "Departments led simultaneously" },
                { num: "20+", label: "Team members managed" },
                { num: "4+", label: "Roles in 1 year at TuronMUN" },
                { num: "17", label: "Years old" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-4 border"
                  style={{ borderColor: "#E5E7EB", background: "#FAFAFA" }}
                >
                  <p className="text-2xl font-bold mb-1" style={{ color: "#2B3490", fontFamily: "var(--font-geist-mono)" }}>
                    {item.num}
                  </p>
                  <p className="text-xs text-gray-500 leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
