"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { INITIATIVES } from "@/lib/data";

function TelegramIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.04l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.496.546z"/>
    </svg>
  );
}

function WebIcon() {
  return <ExternalLink size={13} />;
}

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

        <div className="grid md:grid-cols-2 gap-6">
          {INITIATIVES.map((init) => (
            <div
              key={init.name}
              className="rounded-2xl border p-6 flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: "#E5E7EB" }}
            >
              {/* Logo */}
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
              <div className="flex flex-wrap gap-2 mb-4">
                {init.stats.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: init.color + "18", color: init.color }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Links */}
              {"links" in init && init.links && init.links.length > 0 && (
                <div className="flex gap-2 pt-4 border-t" style={{ borderColor: "#F3F4F6" }}>
                  {(init.links as { label: string; href: string; icon: string }[]).map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:shadow-sm hover:-translate-y-0.5"
                      style={{ borderColor: init.color + "50", color: init.color, background: init.color + "08" }}
                    >
                      {link.icon === "telegram" ? <TelegramIcon /> : <WebIcon />}
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
