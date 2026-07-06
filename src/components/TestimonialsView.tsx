import React from "react";
import { motion } from "motion/react";
import { Star, ShieldCheck, Trophy, Quote } from "lucide-react";
import { Testimonial } from "../types";

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Elena Rostova",
    role: "VP of Product Engineering",
    company: "Aetheris Decentralized Finance Labs",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote: "Mitragan's engineering rigor is unmatched. They took our highly complex real-time asset settlement concept and delivered a clean, server-authoritative engine that settles millions in transactions with sub-50ms latency. The UI is absolutely stunning.",
    metricsImpact: "99.99% Node Uptime",
    rating: 5
  },
  {
    id: "2",
    name: "Marcus Vance",
    role: "Lead Systems Architect",
    company: "Autonomous Robotics Corp",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "Most studios just throw pre-made templates together. Mitragan is different. They architected our fleet command dashboard from the hardware layer up, using custom high-frequency WebSocket channels and WebGL overlays. A absolute masterclass in craft.",
    metricsImpact: "-40% Server Latency",
    rating: 5
  },
  {
    id: "3",
    name: "Serena Chen",
    role: "Director of UX & Interactive Systems",
    company: "Luxury Brand Ecosystems",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "Our standards for brand aesthetics are ridiculously demanding. Mitragan combined extreme visual beauty (custom shaders, organic interactive layout physics) with impeccable, clean code structures. They respect the scope ceiling like true professionals.",
    metricsImpact: "+120% Engagement Increase",
    rating: 5
  },
  {
    id: "4",
    name: "Devon Harris",
    role: "Principal Blockchain Architect",
    company: "Veridia Protocols",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote: "Security is non-negotiable for our clearing pipelines. Mitragan built a fully isolated proxy server route to shield our cryptographic API endpoints from client exposure. Type-safe TypeScript, strict linter checks, and secure Firestore architectures.",
    metricsImpact: "Zero Security Vulnerabilities",
    rating: 5
  },
  {
    id: "5",
    name: "Naoki Yoshida",
    role: "Senior Games & Web3 Producer",
    company: "Zenith Metaverse Consortium",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    quote: "Our collaborative WebGL canvas presented incredible synchronization challenges. Mitragan built a rock-solid state management system that seamlessly handles 10,000+ simultaneous canvas events. Their layout spacing and editorial typography are pristine.",
    metricsImpact: "10k+ Concurrent Users",
    rating: 5
  },
  {
    id: "6",
    name: "Amanda Keller",
    role: "Founder & CEO",
    company: "Chronos Supply-Chain Dashboard",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    quote: "As a founder, I appreciate studios that build exactly what is defined in the roadmap rather than inflating features. Mitragan delivered our analytics application on budget and ahead of time, with modular code that is incredibly easy to expand.",
    metricsImpact: "Product Launched in 6 Weeks",
    rating: 5
  }
];

export default function TestimonialsView() {
  return (
    <div className="space-y-20 pb-16">
      {/* Testimonials Header & Metrics */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-4 pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-mono tracking-widest uppercase">
          <Trophy className="w-4 h-4" /> Client Satisfaction Index
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-medium text-white tracking-tight leading-tight">
          What Our Clients Say
        </h1>

        <p className="text-sm md:text-base text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed font-light">
          We pride ourselves on constructing software with zero architectural compromise. Hear from the visionary product leads, technology executives, and startup founders who chose Mitragan's engineering craft.
        </p>

        {/* High-End Monospace Metric Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
          <div className="p-6 rounded-xl bg-[#09090C] border border-white/10 space-y-1.5 hover:border-white/20 transition-all text-center">
            <span className="font-mono text-3xl font-semibold text-white tracking-tight block">140+</span>
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest block">Core Projects Delivered</span>
          </div>

          <div className="p-6 rounded-xl bg-[#09090C] border border-white/10 space-y-1.5 hover:border-white/20 transition-all text-center">
            <span className="font-mono text-3xl font-semibold text-white tracking-tight block">99.8%</span>
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest block">Client Satisfaction</span>
          </div>

          <div className="p-6 rounded-xl bg-[#09090C] border border-white/10 space-y-1.5 hover:border-white/20 transition-all text-center">
            <span className="font-mono text-3xl font-semibold text-white tracking-tight block">A++</span>
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest block">Code Quality Rating</span>
          </div>
        </div>
      </section>

      {/* Testimonials 6-Card Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-[#09090C] border border-white/10 flex flex-col justify-between hover:border-white/20 hover:scale-[1.01] transition-all relative group"
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-6 text-white/5 group-hover:text-white/10 transition-all">
                <Quote className="w-12 h-12" />
              </div>

              <div className="space-y-6">
                {/* Stars Rating (Monochrome white) */}
                <div className="flex gap-1 text-white">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>

                {/* Core Endorsement Quote */}
                <p className="text-sm text-gray-300 leading-relaxed font-sans font-light italic">
                  "{test.quote}"
                </p>
              </div>

              {/* User Meta Footer */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-4">
                <img
                  src={test.avatar}
                  alt={test.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-white/10 filter grayscale group-hover:grayscale-0 transition-all"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white font-medium truncate">{test.name}</h4>
                  <p className="text-[10px] text-gray-500 font-sans truncate">{test.role}</p>
                  <p className="text-[10px] text-white/70 font-mono mt-0.5 truncate">{test.company}</p>
                </div>
              </div>

              {/* Metric Impact Badge */}
              <div className="mt-4 px-3 py-1 rounded bg-white/5 border border-white/10 text-center">
                <span className="font-mono text-[9px] text-white uppercase tracking-widest block font-semibold">
                  Impact: {test.metricsImpact}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Signoff */}
      <section className="max-w-4xl mx-auto px-4 text-center py-10 space-y-4">
        <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-white">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-display text-white font-medium">Uncompromising Integrity</h3>
        <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed font-light">
          We treat our client codebases with absolute confidentiality and state-of-the-art security standards. No shared keys, strict type declarations, and fully containerized hosting setups.
        </p>
      </section>
    </div>
  );
}
