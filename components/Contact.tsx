"use client";
import { useEffect, useRef, useState, FormEvent } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-all focus:border-[#2B3490] focus:ring-2 focus:ring-[#2B3490]/10";

  return (
    <section id="contact" className="py-24" style={{ background: "#FFFFFF" }}>
      <div
        ref={ref}
        className="max-w-4xl mx-auto px-6 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)" }}
      >
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#00D4A0" }}>Contact</p>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#1C1C1E" }}>
              Let's build<br />
              <span style={{ color: "#2B3490" }}>something.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you're an organization, a collaborator, or someone who believes in
              youth-led change — I'd love to hear from you.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:ozodjonovm1@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "#EFF6FF" }}
                >
                  <Mail size={18} style={{ color: "#2B3490" }} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Email</p>
                  <p className="text-sm font-semibold group-hover:underline" style={{ color: "#2B3490" }}>
                    ozodjonovm1@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/muhammadjon-ozodjonov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "#EFF6FF" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#2B3490">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">LinkedIn</p>
                  <p className="text-sm font-semibold group-hover:underline" style={{ color: "#2B3490" }}>
                    muhammadjon-ozodjonov
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                <CheckCircle size={48} style={{ color: "#00D4A0" }} />
                <h3 className="text-xl font-bold" style={{ color: "#1C1C1E" }}>Message sent!</h3>
                <p className="text-gray-500 text-sm">I'll get back to you as soon as I can.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-[#2B3490] underline underline-offset-2 mt-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className={inputClass}
                    style={{ borderColor: "#E5E7EB" }}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className={inputClass}
                    style={{ borderColor: "#E5E7EB" }}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="What are you building?"
                    className={inputClass + " resize-none"}
                    style={{ borderColor: "#E5E7EB" }}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500">Something went wrong. Try emailing directly.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: "#2B3490" }}
                >
                  <Send size={15} />
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
