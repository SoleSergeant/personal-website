"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { INITIATIVES } from "@/lib/data";

export default function Initiatives() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="initiatives" className="py-24" style={{ background: "#FFFFFF" }}>
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-6 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#00D4A0" }}>Initiatives</p>
        <h2 className="text-4xl font-bold mb-12" style={{ color: "#1C1C1E" }}>
          What I'm building
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {INITIATIVES.map((init) => (
            <div
              key={init.name}
              className="rounded-2xl border p-6 flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: "#E5E7EB" }}
            >
              {/* Logo / Icon */}
              <div className="h-16 flex items-center mb-5">
                {init.logo ? (
                  <div className="relative h-12 w-36">
                    <Image src={init.logo} alt={init.name} fill className="object-contain object-left" />
                  </div>
                ) : (
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                    style={{ background: init.color }}
                  >
                    {init.name[0]}
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold mb-2" style={{ color: "#1C1C1E" }}>{init.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">{init.description}</p>

              {/* Stats pills */}
              <div className="flex flex-wrap gap-2">
                {init.stats.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: init.color + "18", color: init.color === "#6B7280" ? "#6B7280" : init.color }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
