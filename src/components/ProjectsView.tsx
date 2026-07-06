import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Terminal, Layers, ArrowRight, Eye, X, CheckCircle } from "lucide-react";
import { Project } from "../types";

const PROJECTS: Project[] = [
  {
    id: "aetheris",
    title: "Aetheris Canvas",
    tagline: "Immersive Real-Time WebGL Workspace",
    category: "Immersive 3D & WebSockets",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "A synchronized multiplayer vector workspace utilizing custom shaders and Rust handlers for extreme collaboration.",
    fullOverview: "Aetheris Canvas is a flagship interactive system engineered to support thousands of simultaneous artists. It uses high-frequency binary WebSocket frames for communication and custom WebGL fragment shaders to perform real-time math operations, maintaining ultra-smooth rendering performance on low-spec client devices.",
    metrics: [
      { label: "Rendering Rate", value: "60 FPS solid" },
      { label: "Sync Jitter", value: "< 8ms" },
      { label: "Concurrent Canvas Sync", value: "10,000+" }
    ],
    technologies: ["React", "Three.js", "Rust (Actix-Web)", "WebSockets", "GLSL Shaders", "Tailwind CSS"],
    architecture: [
      "Client-side Canvas controller listening to touch and mouse events.",
      "Custom Rust server processing events into binary streams.",
      "PostgreSQL and Redis storing document node trees."
    ]
  },
  {
    id: "veridia",
    title: "Veridia Protocol",
    tagline: "High-Performance Financial Clearing Engine",
    category: "Fintech & Distributed Infrastructure",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
    description: "A high-throughput decentralized ledger processing thousands of financial operations with sub-millisecond completion.",
    fullOverview: "Veridia Protocol is an enterprise-tier financial transaction clearing pipeline. Engineered with a low-garbage-collection Go routine scheduler, it handles double-entry ledgers, automated liquidity calculations, and cryptographic audits. Secret signing keys are stored exclusively server-side using secure hardware security modules.",
    metrics: [
      { label: "Peak Throughput", value: "250,000 tx/s" },
      { label: "Execution Settle", value: "0.8ms average" },
      { label: "Audit Accuracy", value: "100% Cryptographic" }
    ],
    technologies: ["Go", "gRPC / Protobuf", "Redis Enterprise", "TimescaleDB", "Docker Engine", "ScyllaDB"],
    architecture: [
      "Load balancer routing transactions using ring-hashing algorithms.",
      "Go microservices executing transaction logic under strict mutex locks.",
      "Double-write ledger database schema backed by ScyllaDB for high availability."
    ]
  },
  {
    id: "chronos",
    title: "Chronos Dashboard",
    tagline: "Diagnostic Logistics Anomaly Orchestrator",
    category: "AI & Big Data Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "An analytical dashboard projecting global supply freight coordinates and alerting logistics hubs ahead of issues.",
    fullOverview: "Chronos is a command-and-control dashboard designed for global shipping operators. It integrates real-time satellite telemetry, weather warnings, and predictive AI models to calculate freight transit risks. Using high-efficiency D3 charts, it visualizes deep tabular data streams in smooth vector maps.",
    metrics: [
      { label: "Inbound Coordinates", value: "1.2M points/sec" },
      { label: "Prediction Latency", value: "< 45ms" },
      { label: "Logistical Anomaly Saves", value: "94% Accuracy" }
    ],
    technologies: ["React", "D3.js", "GraphQL API", "FastAPI / Python", "Apache Kafka", "PyTorch"],
    architecture: [
      "Apache Kafka broker streaming telemetry data to a machine-learning engine.",
      "Python microservice executing time-series predictions.",
      "GraphQL subscriptions pushing live alerts to the React frontend."
    ]
  }
];

export default function ProjectsView() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="space-y-20 pb-16">
      {/* Expertise Section */}
      <section className="max-w-7xl mx-auto px-4 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="font-mono text-xs uppercase text-white/50 tracking-widest block">Capabilities & Expertise</span>
          <h1 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
            Our Elite Digital Specialties
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed font-sans">
            Mitragan operates at the intersection of absolute visual refinement and bulletproof server-side architecture. We do not build standard CRUD apps; we craft immersive, real-time products.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-white mt-1">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-display font-medium text-white">Full-Stack System Design</h4>
                <p className="text-xs text-gray-400 font-light mt-0.5">Bespoke TypeScript/Go backends, secure cookie management, lazy client SDK initialization, and high-performance databases.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-white mt-1">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-display font-medium text-white">Advanced Render Interfaces</h4>
                <p className="text-xs text-gray-400 font-light mt-0.5">Bespoke 3D canvas rendering, fluid motion transitions, responsive design grids, and pristine micro-animations.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-white mt-1">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-display font-medium text-white">Intelligent Proxy Solutions</h4>
                <p className="text-xs text-gray-400 font-light mt-0.5">Secure server-side API proxy routers that safeguard third-party tokens and leverage modern models like Gemini.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative graphic panel */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#09090C] border border-white/10 relative overflow-hidden h-[380px] flex flex-col justify-between glow-border">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-white/50 tracking-wider">MITRAGAN CORE CORE_ENGINE.SYS</span>
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          </div>
          <div className="space-y-3 font-mono text-[11px] text-gray-400 leading-relaxed overflow-hidden">
            <p className="text-white font-semibold">// EXECUTING MITRAGAN CODE SYNTHESIS</p>
            <p>&gt; initializing type_safe_typescript_compiler... OK</p>
            <p>&gt; compiling server_module.ts with target esnext... OK</p>
            <p>&gt; injecting server_side_api_secrets... [SHIELDED]</p>
            <p>&gt; connection established to postgresql database cluster... latency 2ms</p>
            <p>&gt; checking global lint score... 100% compliant</p>
            <p className="text-white">&gt; systems operational. standing by for client project input.</p>
          </div>
          <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-gray-500 font-mono">
            <span>Precision Index: A++</span>
            <span>Version: v2.5.4</span>
          </div>
        </div>
      </section>

      {/* Selected Projects Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <span className="font-mono text-xs uppercase text-white/50 tracking-widest block">Featured Case Studies</span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white">Selected Masterpieces</h2>
          <p className="text-sm text-gray-400 max-w-lg mx-auto">Click any project to dissect its technical architecture and telemetry metrics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group rounded-2xl bg-[#09090C] border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition-all flex flex-col justify-between hover:scale-[1.01] relative"
            >
              <div>
                {/* Hotlinked Image */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/35 transition-colors z-10" />
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale"
                  />
                  <span className="absolute top-4 left-4 z-20 font-mono text-[10px] text-white bg-black/95 border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {proj.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-display font-medium text-white">{proj.title}</h3>
                  <p className="text-xs text-gray-400 font-mono">{proj.tagline}</p>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans mt-2">{proj.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between text-xs font-mono text-white">
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-white/80" /> Dissect System</span>
                <span className="text-gray-500 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Dissection modal/popup */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[#0A0A0C] rounded-2xl border border-white/10 p-6 md:p-8 text-white space-y-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-1.5 rounded-lg border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all cursor-pointer bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Metadata */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">{selectedProject.category}</span>
                <h3 className="text-2xl md:text-3xl font-display font-medium">{selectedProject.title}</h3>
                <p className="text-sm text-gray-400 italic font-light">{selectedProject.tagline}</p>
              </div>

              {/* Cover Image */}
              <div className="h-64 rounded-xl overflow-hidden relative border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale"
                />
              </div>

              {/* Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-white/60">System Blueprint Overview</h4>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans font-light">
                    {selectedProject.fullOverview}
                  </p>

                  <h4 className="text-xs font-mono uppercase tracking-widest text-white/60 pt-4">Pipeline Architecture Node</h4>
                  <ul className="space-y-2.5">
                    {selectedProject.architecture.map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-400 flex items-start gap-2.5 leading-relaxed font-sans">
                        <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right col: Stack and Telemetry metrics */}
                <div className="space-y-6 bg-[#09090C] border border-white/5 rounded-xl p-5">
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Telemetry Specs</h5>
                    <div className="space-y-3">
                      {selectedProject.metrics.map((m, idx) => (
                        <div key={idx} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                          <span className="text-xs text-gray-400 block">{m.label}</span>
                          <span className="font-mono text-sm text-white font-semibold">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Engineering Stack</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  Close System Spec
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
