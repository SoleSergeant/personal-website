"use client";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/data";

function Counter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const p = Math.min((now - start) / 1800, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function Impact() {
  return (
    <section className="py-20" style={{ background: "#2B3490" }}>
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest mb-12 opacity-60" style={{ color: "#00D4A0" }}>
          Impact by the numbers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-4xl md:text-5xl font-bold tabular-nums mb-2"
                style={{ color: "#FFFFFF", fontFamily: "var(--font-geist-mono)" }}
              >
                <Counter target={s.value} prefix={s.prefix ?? ""} suffix={s.suffix} />
              </p>
              <p className="text-sm font-medium opacity-70 text-white">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
