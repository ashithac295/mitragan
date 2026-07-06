import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Cpu, Layers, Calendar, ShieldAlert, Copy, ArrowRight, Check, Sparkle } from "lucide-react";
import { AIProposal } from "../types";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApply?: (jobTitle: string) => void;
}

const LOADING_STEPS = [
  "Analyzing functional system requirements...",
  "Synthesizing elite technology choices...",
  "Architecting high-frequency data models...",
  "Drafting infrastructure topology...",
  "Calibrating performance and security mitigations...",
  "Polishing final engineering proposal blueprint..."
];

export default function AIAssistantModal({ isOpen, onClose, onSelectApply }: AIAssistantModalProps) {
  const [idea, setIdea] = useState("");
  const [sector, setSector] = useState("SaaS / Cloud Platforms");
  const [budget, setBudget] = useState("Venture-Backed");
  const [timeline, setTimeline] = useState("High Quality (2-3 months)");
  const [additional, setAdditional] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [proposal, setProposal] = useState<AIProposal | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Cycle loading step messages during processing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setIsLoading(true);
    setError(null);
    setProposal(null);

    try {
      const response = await fetch("/api/architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea,
          sector,
          budget,
          timeline,
          additionalDetails: additional,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred during generation.");
      }

      setProposal(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to establish secure connection to Mitragan AI Architect.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!proposal) return;
    const text = `
MITRAGAN TECHNICAL PROPOSAL: ${proposal.proposalTitle}
======================================================
Vision: ${proposal.visionStatement}

RECOMMENDED TECH STACK:
${proposal.recommendedTechStack.map(t => `- [${t.category}]: ${t.tech}\n  Justification: ${t.justification}`).join("\n")}

SYSTEM ARCHITECTURE COMPONENTS:
${proposal.systemArchitecture.map(c => `- ${c.component}: ${c.description}\n  Highlight: ${c.engineeringHighlight}`).join("\n")}

DELIVERY PHASES:
${proposal.timelinePhases.map(p => `- ${p.phase} (${p.duration})\n  Milestones: ${p.milestones.join(", ")}`).join("\n")}

MITRAGAN EDGE:
${proposal.mitraganEdge}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl h-[85vh] bg-[#0A0A0C] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0E0E12]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white animate-pulse">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-display font-medium tracking-tight">Mitragan AI Architect</h2>
                <p className="text-xs text-gray-400 font-sans mt-0.5 font-light">Translate your vision into structured engineering plans instantly</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <AnimatePresence mode="wait">
              {isLoading ? (
                /* Dynamic Loader State */
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="relative flex items-center justify-center mb-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                      className="w-24 h-24 rounded-full border-2 border-t-white border-r-transparent border-b-white/20 border-l-transparent"
                    />
                    <Cpu className="w-8 h-8 text-white absolute animate-pulse" />
                  </div>
                  <motion.h3
                    key={loadingStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-lg font-display text-gray-200 h-8 font-medium"
                  >
                    {LOADING_STEPS[loadingStep]}
                  </motion.h3>
                  <p className="text-xs text-gray-500 mt-2 font-mono uppercase tracking-widest">
                    Synthesizing raw parameters to Mitragan Core Engine
                  </p>
                </motion.div>
              ) : proposal ? (
                /* Proposal View */
                <motion.div
                  key="proposal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Proposal Header Banner */}
                  <div className="p-6 md:p-8 rounded-xl bg-gradient-to-br from-[#09090C] to-[#030305] border border-white/15 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                      <Sparkle className="w-32 h-32" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase text-white mb-4 tracking-widest">
                      <Sparkles className="w-3 h-3 animate-pulse" /> System Architecture blueprint
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-3">
                      {proposal.proposalTitle}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed max-w-3xl font-light">
                      {proposal.visionStatement}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4 pt-6 border-t border-white/10 text-xs text-gray-400 font-mono">
                      <div>
                        <span className="font-mono text-gray-500 uppercase tracking-wider block">Sector</span>
                        <span className="text-gray-200 font-medium">{sector}</span>
                      </div>
                      <div className="w-px h-8 bg-white/10 hidden sm:block" />
                      <div>
                        <span className="font-mono text-gray-500 uppercase tracking-wider block">Target Timeline</span>
                        <span className="text-gray-200 font-medium">{timeline}</span>
                      </div>
                      <div className="w-px h-8 bg-white/10 hidden sm:block" />
                      <div>
                        <span className="font-mono text-gray-500 uppercase tracking-wider block">Budget Tier</span>
                        <span className="text-gray-200 font-medium">{budget}</span>
                      </div>
                    </div>
                  </div>

                  {/* Grid for Tech Stack and System Components */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Tech Stack Block */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-white/60" /> Recommended Tech Stack
                      </h4>
                      <div className="space-y-3">
                        {proposal.recommendedTechStack?.map((tech, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-[#09090C] border border-white/5 space-y-1">
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{tech.category}</span>
                            <div className="text-sm font-display font-medium text-white">{tech.tech}</div>
                            <p className="text-xs text-gray-400 leading-relaxed mt-1 font-light">{tech.justification}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Architecture Components Block */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-white/60" /> Key System Components
                      </h4>
                      <div className="space-y-3">
                        {proposal.systemArchitecture?.map((comp, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-[#09090C] border border-white/5 space-y-1">
                            <div className="text-sm font-display font-medium text-white flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              {comp.component}
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed font-light">{comp.description}</p>
                            <div className="text-[11px] font-mono text-white/80 bg-white/5 px-2 py-0.5 rounded border border-white/10 inline-block mt-2">
                              Engineering Highlight: {comp.engineeringHighlight}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Implementation Timeline */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white/60" /> Delivery Phase Roadmap
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {proposal.timelinePhases?.map((phase, idx) => (
                        <div key={idx} className="p-5 rounded-xl bg-[#09090C] border border-white/5 relative flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] font-mono uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-gray-300">Phase {idx + 1}</span>
                              <span className="text-xs font-mono text-white/80">{phase.duration}</span>
                            </div>
                            <h5 className="text-sm font-display font-medium text-white mb-3">{phase.phase}</h5>
                            <ul className="space-y-1.5">
                              {phase.milestones?.map((milestone, mIdx) => (
                                <li key={mIdx} className="text-xs text-gray-400 flex items-start gap-2 font-light">
                                  <span className="text-white mt-1">✓</span>
                                  <span>{milestone}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risk Mitigation */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-white/60" /> Architectural Risks & Mitigations
                    </h4>
                    <div className="space-y-3">
                      {proposal.riskAnalysis?.map((risk, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#09090C] border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Identified Risk</span>
                            <p className="text-xs text-gray-300 font-medium">{risk.risk}</p>
                          </div>
                          <div className="border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4">
                            <span className="text-[10px] font-mono text-white uppercase tracking-widest block mb-1">Mitragan Mitigation Play</span>
                            <p className="text-xs text-gray-400 leading-relaxed font-light">{risk.mitigation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mitragan Advantage Slogan */}
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center max-w-3xl mx-auto space-y-3">
                    <h5 className="text-sm font-display font-medium text-white">The Mitragan Craft Guarantee</h5>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans font-light">
                      {proposal.mitraganEdge}
                    </p>
                  </div>

                  {/* Footer actions for proposal */}
                  <div className="flex flex-wrap gap-4 justify-between items-center pt-6 border-t border-white/10 font-mono text-xs">
                    <button
                      onClick={() => setProposal(null)}
                      className="px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-all"
                    >
                      Draft Another Project
                    </button>

                    <div className="flex gap-3">
                      <button
                        onClick={handleCopy}
                        className="px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-all flex items-center gap-2"
                      >
                        {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied" : "Copy Blueprint"}
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          if (onSelectApply) {
                            onSelectApply("Custom Proposal Consultation");
                          }
                        }}
                        className="px-6 py-2.5 rounded-lg bg-white hover:bg-gray-100 text-black font-semibold tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5"
                      >
                        Consult Our Engineers <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Form State */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 max-w-3xl mx-auto"
                >
                  <div className="text-center space-y-2 mb-8">
                    <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-white">
                      <Sparkle className="w-6 h-6 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-display font-medium text-white">Initiate Your Engineering Blueprint</h3>
                    <p className="text-sm text-gray-400 max-w-lg mx-auto font-light leading-relaxed">
                      Describe your ambitious digital concept below. Our AI systems will synthesize technology stacks, architectural topology, and project stages tailored to Mitragan standards.
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                      {error}
                    </div>
                  )}

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-widest text-gray-400 block">The Bold Idea *</label>
                      <textarea
                        required
                        rows={3}
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="e.g. Build a high-performance, real-time decentralized order matching system for luxury asset trading with sub-millisecond settling..."
                        className="w-full p-4 rounded-xl bg-[#111115] border border-white/10 hover:border-white/15 focus:border-white focus:outline-none transition-all placeholder:text-gray-600 text-sm leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-widest text-gray-400 block">Digital Sector</label>
                        <select
                          value={sector}
                          onChange={(e) => setSector(e.target.value)}
                          className="w-full p-3.5 rounded-xl bg-[#111115] border border-white/10 hover:border-white/15 focus:border-white focus:outline-none text-sm text-gray-200 transition-all"
                        >
                          <option value="SaaS / Cloud Platforms">SaaS / Cloud Platforms</option>
                          <option value="Immersive 3D & WebGL">Immersive 3D & WebGL</option>
                          <option value="Fintech & Decentralized Ledger">Fintech & Ledger</option>
                          <option value="Autonomous Tech & Robotics">Autonomous Tech</option>
                          <option value="AI / LLM Orchestration">AI Orchestration</option>
                          <option value="Sovereign Digital Identity">Digital Identity</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-widest text-gray-400 block">Timeline Speed</label>
                        <select
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          className="w-full p-3.5 rounded-xl bg-[#111115] border border-white/10 hover:border-white/15 focus:border-white focus:outline-none text-sm text-gray-200 transition-all"
                        >
                          <option value="Rapid MVP (< 4 weeks)">Rapid MVP (&lt; 4 weeks)</option>
                          <option value="High Quality (2-3 months)">High Quality (2-3 months)</option>
                          <option value="Strategic Horizon (6+ months)">Strategic Horizon (6+ months)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-widest text-gray-400 block">Project Scale / Budget</label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full p-3.5 rounded-xl bg-[#111115] border border-white/10 hover:border-white/15 focus:border-white focus:outline-none text-sm text-gray-200 transition-all"
                        >
                          <option value="Bootstrap / Seed Ready">Bootstrap / Seed Ready</option>
                          <option value="Venture-Backed Series">Venture-Backed Series</option>
                          <option value="Enterprise Absolute Precision">Enterprise Custom Suite</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-widest text-gray-400 block">Special Engineering Considerations (Optional)</label>
                      <textarea
                        rows={2}
                        value={additional}
                        onChange={(e) => setAdditional(e.target.value)}
                        placeholder="e.g. Requires end-to-end zero-knowledge encryption, custom shaders, or integration with external hardware systems..."
                        className="w-full p-4 rounded-xl bg-[#111115] border border-white/10 hover:border-white/15 focus:border-white focus:outline-none transition-all placeholder:text-gray-600 text-sm leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={!idea.trim()}
                      className="px-8 py-3.5 rounded-xl bg-white hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white text-sm font-semibold text-black transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5"
                    >
                      Generate Architectural Proposal <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
