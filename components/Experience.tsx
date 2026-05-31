"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, MapPin, Calendar } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";

const dotColor: Record<string, string> = {
  mint: "#00D4A0",
  navy: "#2B3490",
  gray: "#9CA3AF",
};

type ExpEntry = typeof EXPERIENCE[number];

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-24" style={{ background: "#F9F8F6" }}>
      <div
        ref={ref}
        className="max-w-4xl mx-auto px-6 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#00D4A0" }}>Experience</p>
        <h2 className="text-4xl font-bold mb-12" style={{ color: "#1C1C1E" }}>
          The journey so far
        </h2>

        <div className="relative">
          <div
            className="absolute left-4 top-3 bottom-3 w-px"
            style={{ background: "linear-gradient(to bottom, #2B3490, #00D4A0)" }}
          />

          <div className="space-y-3 ml-12">
            {EXPERIENCE.map((exp: ExpEntry, i: number) => (
              <div key={i} className="relative">
                <div
                  className="absolute -left-[2.85rem] top-4 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                  style={{ background: dotColor[exp.color] }}
                />

                <div
                  className="bg-white rounded-xl border overflow-hidden transition-shadow hover:shadow-md cursor-pointer"
                  style={{ borderColor: "#E5E7EB" }}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div className="p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {exp.logo ? (
                        <div className="relative w-9 h-9 shrink-0">
                          <Image src={exp.logo} alt={exp.org} fill className="object-contain" />
                        </div>
                      ) : (
                        <div
                          className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: dotColor[exp.color] }}
                        >
                          {exp.org[0]}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate" style={{ color: "#1C1C1E" }}>{exp.role}</p>
                        <p className="text-xs text-gray-500">{exp.org}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-right">
                      <div className="hidden sm:block text-right">
                        <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                          <Calendar size={11} /> {exp.period}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 justify-end mt-0.5">
                          <MapPin size={11} /> {exp.location}
                        </p>
                      </div>
                      <ChevronDown
                        size={16}
                        className="text-gray-400 transition-transform duration-200 shrink-0"
                        style={{ transform: open === i ? "rotate(180deg)" : "none" }}
                      />
                    </div>
                  </div>

                  {/* Expanded content */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: open === i ? "600px" : "0px" }}
                  >
                    <div className="px-5 pb-5 pt-0 border-t" style={{ borderColor: "#F3F4F6" }}>
                      {/* Role progression timeline (for multi-role entries) */}
                      {"roles" in exp && exp.roles && (
                        <div className="mt-4 mb-4 flex flex-wrap gap-2">
                          {(exp.roles as { title: string; period: string }[]).map((r, ri) => (
                            <div
                              key={ri}
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
                              style={{
                                borderColor: dotColor[exp.color] + "40",
                                background: dotColor[exp.color] + "10",
                                color: dotColor[exp.color],
                              }}
                            >
                              <span className="font-semibold">{r.title}</span>
                              <span className="opacity-60">· {r.period}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <ul className="mt-3 space-y-2">
                        {exp.bullets.map((b: string, j: number) => (
                          <li key={j} className="flex gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dotColor[exp.color] }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
