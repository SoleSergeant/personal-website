"use client";
import { useEffect, useRef, useState } from "react";
import { Trophy } from "lucide-react";
import { HONORS, SKILLS } from "@/lib/data";

const medalColor: Record<string, string> = {
  "1st": "#D97706",
  "2nd": "#9CA3AF",
  "3rd": "#CD7C2F",
};

export default function Honors() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="honors" className="py-24" style={{ background: "#F9F8F6" }}>
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-6 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)" }}
      >
        <div className="grid md:grid-cols-2 gap-16">
          {/* Honors */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#00D4A0" }}>Honors</p>
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#1C1C1E" }}>Recognized for excellence</h2>

            <div className="space-y-4">
              {HONORS.map((h) => (
                <div
                  key={h.year}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: medalColor[h.place] + "20" }}
                  >
                    <Trophy size={18} style={{ color: medalColor[h.place] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: "#1C1C1E" }}>
                      <span style={{ color: medalColor[h.place] }}>{h.place} Place</span> — {h.event}
                    </p>
                    <p className="text-xs text-gray-500">{h.detail}</p>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: "#F3F4F6", color: "#6B7280", fontFamily: "var(--font-geist-mono)" }}
                  >
                    {h.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#2B3490" }}>Skills</p>
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#1C1C1E" }}>What I bring</h2>

            <div className="space-y-5">
              {Object.entries(SKILLS).map(([category, skills]) => (
                <div key={category}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border bg-white"
                        style={{ borderColor: "#E5E7EB", color: "#374151" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
