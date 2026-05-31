"use client";
import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

function GitHubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

const PROJECTS = [
  {
    name: "MuAIlim",
    tagline: "AI-powered exam prep for Uzbekistan",
    description:
      "A mobile app helping Uzbek students prepare for national exams using AI. Built with a FastAPI backend powered by the Anthropic Claude API, Supabase database, and an Expo React Native frontend.",
    stack: ["React Native", "Expo", "FastAPI", "Claude API", "Supabase", "TypeScript"],
    github: "https://github.com/SoleSergeant/MuAIlim",
    live: null,
    color: "#2B3490",
    icon: "🎓",
  },
  {
    name: "Fergana Presidential School",
    tagline: "Official school website",
    description:
      "A modern website for the Presidential School in Fergana — Muhammadjon's own school. Built with React and deployed on Vercel.",
    stack: ["React", "Vite", "JavaScript", "Vercel"],
    github: "https://github.com/SoleSergeant/school_website",
    live: "https://school-website-nine-pearl.vercel.app",
    color: "#00D4A0",
    icon: "🏫",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-24" style={{ background: "#F9F8F6" }}>
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-6 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#2B3490" }}>Technical Projects</p>
        <h2 className="text-4xl font-bold mb-12" style={{ color: "#1C1C1E" }}>
          What I've built
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((proj) => (
            <div
              key={proj.name}
              className="bg-white rounded-2xl border p-6 flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: "#E5E7EB" }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: proj.color + "15" }}
                  >
                    {proj.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base" style={{ color: "#1C1C1E" }}>{proj.name}</h3>
                    <p className="text-xs font-medium" style={{ color: proj.color }}>{proj.tagline}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">{proj.description}</p>

              {/* Stack pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {proj.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium px-2.5 py-1 rounded-full border"
                    style={{ borderColor: "#E5E7EB", color: "#6B7280", background: "#F9F8F6" }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-2 pt-4 border-t" style={{ borderColor: "#F3F4F6" }}>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:shadow-sm hover:-translate-y-0.5"
                  style={{ borderColor: "#E5E7EB", color: "#374151", background: "#F9F8F6" }}
                >
                  <GitHubIcon /> GitHub
                </a>
                {proj.live && (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:shadow-sm hover:-translate-y-0.5"
                    style={{ borderColor: proj.color + "50", color: proj.color, background: proj.color + "08" }}
                  >
                    <ExternalLink size={13} /> Live Site
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
