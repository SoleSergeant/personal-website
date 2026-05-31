"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

const roles = ["Project Leader", "Community Builder", "Vibe Coder", "Event Organizer"];

function AnimatedCounter({ target, prefix = "", suffix = "", duration = 2000 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden" style={{ background: "#F9F8F6" }}>
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#2B3490 1px, transparent 1px), linear-gradient(90deg, #2B3490 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div className="order-2 md:order-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00D4A0] animate-pulse" />
              <span className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                Fergana, Uzbekistan
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-4" style={{ color: "#1C1C1E" }}>
              Muhammadjon<br />
              <span style={{ color: "#2B3490" }}>Ozodjonov</span>
            </h1>

            <div className="h-8 mb-6 overflow-hidden">
              <p
                className="text-xl font-medium transition-all duration-300"
                style={{
                  color: "#00D4A0",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-8px)",
                }}
              >
                {roles[roleIndex]}
              </p>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md">
              At 17, I build things that move — teams, events, and communities.
              Secretary General of TuronMUN. CEO of Code Caravan.
              Based in Central Asia, thinking globally.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-6 py-3 rounded-full text-white font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                style={{ background: "#2B3490" }}
              >
                Let's Talk
              </a>
              <a
                href="#experience"
                onClick={(e) => { e.preventDefault(); document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-6 py-3 rounded-full font-semibold text-sm border-2 transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{ borderColor: "#2B3490", color: "#2B3490" }}
              >
                View My Work
              </a>
              <a
                href="https://www.linkedin.com/in/muhammadjon-ozodjonov"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-semibold text-sm border-2 transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                style={{ borderColor: "#00D4A0", color: "#00D4A0" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
                Connect on LinkedIn
              </a>
            </div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              {[
                { target: 9000, prefix: "$", suffix: "+", label: "Raised" },
                { target: 400, suffix: "+", label: "Participants" },
                { target: 7, suffix: "+", label: "Partnerships" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold tabular-nums" style={{ color: "#2B3490", fontFamily: "var(--font-geist-mono)" }}>
                    <AnimatedCounter target={s.target} prefix={s.prefix ?? ""} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Photo */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative">
              {/* Decorative ring */}
              <div
                className="absolute -inset-3 rounded-2xl opacity-20"
                style={{ background: "linear-gradient(135deg, #2B3490, #00D4A0)" }}
              />
              <div className="relative w-72 h-96 md:w-80 md:h-[26rem] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/muhammadjon.jpg"
                  alt="Muhammadjon Ozodjonov speaking at an event"
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/20 to-transparent" />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2.5 shadow-lg border border-gray-100"
              >
                <p className="text-xs text-gray-500 font-medium">Currently</p>
                <p className="text-sm font-semibold" style={{ color: "#2B3490" }}>
                  Sec. General @ TuronMUN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors animate-bounce"
      >
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
