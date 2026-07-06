import React from "react";
import { motion } from "motion/react";
import { Sparkles, Cpu, Zap, Layers, Activity, ArrowRight } from "lucide-react";
import { Tab } from "../types";
import Mitragan3DCanvas from "./Mitragan3DCanvas";
import MitraganLogo from "./MitraganLogo";

interface HomeViewProps {
  onNavigate: (tab: Tab) => void;
  onOpenArchitect: () => void;
}

export default function HomeView({ onNavigate, onOpenArchitect }: HomeViewProps) {
  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-4 overflow-hidden pt-6">
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />

        {/* Floating tech nodes ornament */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Headline and Content */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Elite badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-mono tracking-widest uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Idea To Reality Engineering
            </div>

            {/* Brand Logo & Wordmark */}
            <div className="flex flex-col items-center lg:items-start py-2">
              <MitraganLogo showText={true} size={110} align="responsive" className="scale-95 sm:scale-100 origin-center lg:origin-left" />
            </div>

            <p className="text-lg md:text-xl font-sans font-light text-gray-300 leading-relaxed">
              Engineering <span className="text-white font-medium">bold concepts</span> into high-performance digital realities with absolute architectural precision.
            </p>

            <p className="text-sm text-gray-400 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We are an elite software design and systems architecture studio partnering with pioneering founders and venture-backed teams to build high-end client interfaces, bespoke 3D spaces, and resilient server-side pipelines.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenArchitect}
                className="px-8 py-4 rounded-xl bg-white hover:bg-gray-100 text-black text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-lg shadow-white/5 hover:scale-[1.02]"
              >
                Architect System <Sparkles className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate(Tab.Projects)}
                className="px-8 py-4 rounded-xl bg-[#0C0C0F] hover:bg-[#121216] text-white border border-white/10 hover:border-white/25 text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                Our Expertise <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Interactive 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 w-full"
          >
            <div className="relative">
              {/* Decorative framing lines */}
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-white/20 pointer-events-none" />
              <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-white/20 pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-white/20 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-white/20 pointer-events-none" />

              <Mitragan3DCanvas />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-500 text-[10px] uppercase font-mono tracking-widest pointer-events-none mt-12 lg:mt-0">
          <span className="animate-bounce">↓</span> Scroll to explore
        </div>
      </section>

      {/* Philosophy Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <span className="font-mono text-xs uppercase text-white/50 tracking-widest block">Philosophical Core</span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white">How We Architect Software</h2>
          <p className="text-sm text-gray-400 max-w-lg mx-auto">Craft isn't about doing more. It is about implementing the requested scope with flawless precision, structural purity, and beautiful execution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Precision Development (Large) */}
          <div className="col-span-1 md:col-span-8 p-8 rounded-2xl bg-[#09090C] border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all h-[320px]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl pointer-events-none group-hover:bg-white/[0.04] transition-all" />
            <div className="space-y-4 max-w-xl">
              <div className="p-3 bg-white/5 border border-white/10 text-white rounded-xl w-fit">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-medium text-white">Precision Full-Stack Engineering</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We design and build custom, server-authoritative backends, distributed APIs, and scalable infrastructure topologies. Every variable is type-safe, every query is indexed, and all secret keys remain strictly server-side.
              </p>
            </div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-6">
              Core Stack: Node.js • Go • Rust • PostgreSQL • REST/gRPC
            </div>
          </div>

          {/* Card 2: Interactive 3D/Canvas (Small) */}
          <div className="col-span-1 md:col-span-4 p-8 rounded-2xl bg-[#09090C] border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all h-[320px]">
            <div className="space-y-4">
              <div className="p-3 bg-white/5 border border-white/10 text-white rounded-xl w-fit">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-medium text-white">WebGL & Immersive UX</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We believe in creating high-end sensory feedback—fluid web animations, 3D Canvas views, and custom shaders that elevate interfaces without hurting performance.
              </p>
            </div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              Render Engine: WebGL • Three.js • Canvas2D • Motion
            </div>
          </div>

          {/* Card 3: Deep AI Orchestration (Small) */}
          <div className="col-span-1 md:col-span-4 p-8 rounded-2xl bg-[#09090C] border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all h-[320px]">
            <div className="space-y-4">
              <div className="p-3 bg-white/5 border border-white/10 text-white rounded-xl w-fit">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-medium text-white">Intelligent AI Middleware</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Seamlessly proxying LLMs, structured JSON generators, and multi-modal TTS/Video workflows. Security-first wrappers keep keys private.
              </p>
            </div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              Integration:  API • Multi-modal • JSON Schema
            </div>
          </div>

          {/* Card 4: Architecture Rigor (Large) */}
          <div className="col-span-1 md:col-span-8 p-8 rounded-2xl bg-[#09090C] border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all h-[320px]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl pointer-events-none group-hover:bg-white/[0.04] transition-all" />
            <div className="space-y-4 max-w-xl">
              <div className="p-3 bg-white/5 border border-white/10 text-white rounded-xl w-fit">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-medium text-white">Server-Authoritative Realtime Core</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We handle low-latency system communications and WebSockets. Our custom architecture maintains sync, prevents race conditions, and streams live metrics back to clients flawlessly.
              </p>
            </div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-6">
              Performance: Latency under 50ms • Multi-user Canvas • Live Telemetry
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quote / Glass Section */}
      <section className="max-w-5xl mx-auto px-4 relative">
        <div className="relative p-8 md:p-12 rounded-3xl bg-[#09090D] border border-white/10 overflow-hidden text-center space-y-6 glow-border">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <p className="font-display text-xl md:text-3xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-light italic">
            "Design is not just what it looks like and feels like. Design is how it works. In software, true craftsmanship is the absolute synthesis of pristine aesthetics and flawless engineering."
          </p>
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-xs uppercase tracking-wider text-white">The Mitragan Manifest</span>
            <span className="text-[11px] text-gray-500">Established 2024</span>
          </div>
        </div>
      </section>

      {/* The Implementation Process */}
      <section className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-3">
          <span className="font-mono text-xs uppercase text-white/50 tracking-widest block">Operational Roadmap</span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white">From Idea to Reality</h2>
          <p className="text-sm text-gray-400 max-w-lg mx-auto">Our four-stage engagement model ensures structural alignment, rapid iteration, and flawless software launches.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="absolute top-[34px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-white/5 via-white/20 to-white/5 hidden md:block" />

          {/* Step 1 */}
          <div className="space-y-4 text-center md:text-left relative z-10 group">
            <div className="w-12 h-12 rounded-full bg-[#0E0E12] border border-white/10 flex items-center justify-center font-mono text-sm text-white font-medium mx-auto md:mx-0 group-hover:border-white/30 transition-colors shadow-lg">
              01
            </div>
            <h3 className="text-lg font-display font-medium text-white">System Discovery</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We translate your bold core concepts into crisp functional constraints. We strip away speculative features to isolate and refine the system's high-value core.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-4 text-center md:text-left relative z-10 group">
            <div className="w-12 h-12 rounded-full bg-[#0E0E12] border border-white/10 flex items-center justify-center font-mono text-sm text-white font-medium mx-auto md:mx-0 group-hover:border-white/30 transition-colors shadow-lg">
              02
            </div>
            <h3 className="text-lg font-display font-medium text-white">Structural Blueprint</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We compile type specifications, network architecture blueprints, and highly stylized visual wireframes. We establish the absolute technical framework.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-4 text-center md:text-left relative z-10 group">
            <div className="w-12 h-12 rounded-full bg-[#0E0E12] border border-white/10 flex items-center justify-center font-mono text-sm text-white font-medium mx-auto md:mx-0 group-hover:border-white/30 transition-colors shadow-lg">
              03
            </div>
            <h3 className="text-lg font-display font-medium text-white">High-Fidelity Code</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We implement the design via clean, modular, type-safe React, Tailwind, and custom server APIs. No messy layers or templates—only bespoke code.
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-4 text-center md:text-left relative z-10 group">
            <div className="w-12 h-12 rounded-full bg-[#0E0E12] border border-white/10 flex items-center justify-center font-mono text-sm text-white font-medium mx-auto md:mx-0 group-hover:border-white/30 transition-colors shadow-lg">
              04
            </div>
            <h3 className="text-lg font-display font-medium text-white">Launch & Calibration</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We deploy the services, set up end-to-end security protocols, optimize database index vectors, and implement clear diagnostic telemetry systems.
            </p>
          </div>
        </div>
      </section>

      {/* Instant Start CTA Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#09090C] to-[#030305] border border-white/10 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <h3 className="text-3xl font-display font-medium text-white">Let's Build the Future Together</h3>
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-light">
            Ready to experience Mitragan engineering? Run our AI Project Architect to draft a complete systems blueprint in seconds, or contact our core team to consult on your production roadmap.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={onOpenArchitect}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-gray-100 text-black text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-lg cursor-pointer"
            >
              Draft My Blueprint (AI)
            </button>
            <button
              onClick={() => onNavigate(Tab.Join)}
              className="px-6 py-3.5 rounded-xl bg-[#09090C] hover:bg-[#121216] text-white border border-white/10 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              Inquire Engagement
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
