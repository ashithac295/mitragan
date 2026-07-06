import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, MapPin, Clock, Send, CheckCircle2, ShieldAlert, Upload, Paperclip, Trash2, Terminal } from "lucide-react";
import { Job } from "../types";

const JOBS: Job[] = [
  {
    id: "creative-dev",
    title: "Creative Developer (WebGL & Interactive UX)",
    department: "Interactive Interface Division",
    location: "Global / Remote",
    type: "Full-Time",
    description: "Architect fluid interactive layouts, write custom Three.js fragment shaders, and design sensory-rich micro-interactions that elevate system visual standards.",
    requirements: [
      "Advanced proficiency with WebGL, Canvas2D APIs, and Three.js/Pixi.js.",
      "Expert knowledge of Tailwind CSS, React functional hooks, and motion layout triggers.",
      "Strong aesthetic sensibility—proven track record of designing editorial, high-contrast digital experiences."
    ]
  },
  {
    id: "systems-arch",
    title: "Senior Systems Architect (Rust / Go / Distributed)",
    department: "Distributed Infrastructure & Ledgers",
    location: "Singapore / Hybrid",
    type: "Full-Time",
    description: "Design low-latency, server-authoritative backends, model high-frequency WebSocket sync routines, and safeguard API schemas behind premium proxies.",
    requirements: [
      "5+ years engineering performance-critical software in Rust, Go, or C++.",
      "Deep understanding of distributed memory models, mutexes, and WebSocket channels.",
      "Familiarity with ScyllaDB, PostgreSQL index structures, and secure cloud run containers."
    ]
  },
  {
    id: "product-strat",
    title: "Lead Product & UX Strategist",
    department: "Strategic System Discovery",
    location: "Global / Remote",
    type: "Full-Time",
    description: "Lead deep discovery cycles with founders, translate broad bold visions into tight functional scopes, and design visual structural wireframes.",
    requirements: [
      "Demonstrated experience designing structured user-journey pipelines for complex B2B/SaaS systems.",
      "Ability to translate raw technical specifications into clear, elegant, scannable display text.",
      "Strong alignment with minimalist scope ceilings—proven experience designing single-view layouts."
    ]
  }
];

export default function JoinView({ prefilledJob }: { prefilledJob?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(prefilledJob || "Creative Developer (WebGL & Interactive UX)");
  const [profile, setProfile] = useState("");
  const [statement, setStatement] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [mockFileName, setMockFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync role state with prefilled job changes
  React.useEffect(() => {
    if (prefilledJob) {
      setRole(prefilledJob);
    }
  }, [prefilledJob]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setMockFileName(selectedFile.name);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setMockFileName(droppedFile.name);
      simulateUpload();
    }
  };

  const removeFile = () => {
    setFile(null);
    setMockFileName("");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !statement) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate cryptographic validation telemetry
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Clear form
      setName("");
      setEmail("");
      setProfile("");
      setStatement("");
      removeFile();
    }, 2500);
  };

  return (
    <div className="space-y-24 pb-16">
      {/* Intro Header */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-4 pt-10">
        <span className="font-mono text-xs uppercase text-white/50 tracking-widest block">Join the Collective</span>
        <h1 className="text-4xl md:text-6xl font-display font-medium text-white tracking-tight leading-tight">
          Build the Future with Us
        </h1>
        <p className="text-sm md:text-base text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed font-light">
          Mitragan is always seeking exceptional, zero-compromise developers, systems architects, and product leads who refuse cookie-cutter template designs in favor of engineering precision.
        </p>

        {/* Core Cultural pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-10 text-left">
          <div className="p-5 rounded-xl bg-[#09090C] border border-white/5 space-y-2">
            <span className="font-mono text-xs text-white block font-semibold">01 / PRECISION</span>
            <h4 className="text-sm font-display font-medium text-white">Zero-Sloppiness</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">We write strict type-safe code, document core architectures, and secure all API variables on the server.</p>
          </div>

          <div className="p-5 rounded-xl bg-[#09090C] border border-white/5 space-y-2">
            <span className="font-mono text-xs text-white block font-semibold">02 / CRAFT</span>
            <h4 className="text-sm font-display font-medium text-white">Visual Refinement</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">Typography, margin grid spacing, and micro-animations matter. We respect visual layouts like master artists.</p>
          </div>

          <div className="p-5 rounded-xl bg-[#09090C] border border-white/5 space-y-2">
            <span className="font-mono text-xs text-white block font-semibold">03 / FOCUS</span>
            <h4 className="text-sm font-display font-medium text-white">Strict Scope Ceilings</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">We focus entirely on delivering the defined functional requirements flawlessly. No bloated features, no noise.</p>
          </div>

          <div className="p-5 rounded-xl bg-[#09090C] border border-white/5 space-y-2">
            <span className="font-mono text-xs text-white block font-semibold">04 / AUTONOMY</span>
            <h4 className="text-sm font-display font-medium text-white">Elite Ownership</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">We operate in lightweight remote collectives. You take direct ownership of your components from specs to telemetry.</p>
          </div>
        </div>
      </section>

      {/* Grid of Open Careers and Application Form */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left col: Career Roles List */}
        <div className="lg:col-span-6 space-y-8">
          <h2 className="text-2xl font-display font-medium text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-white/80" /> Active Open Positions
          </h2>

          <div className="space-y-6">
            {JOBS.map((job) => (
              <div
                key={job.id}
                onClick={() => setRole(job.title)}
                className={`p-6 rounded-2xl border transition-all text-left cursor-pointer group ${
                  role === job.title
                    ? "bg-white/[0.03] border-white/30 shadow-md shadow-white/5"
                    : "bg-[#09090C] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">{job.department}</span>
                  <div className="flex items-center gap-3 text-[10px] text-gray-500 font-mono">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                  </div>
                </div>

                <h3 className="text-lg font-display font-medium text-white mb-2 group-hover:text-white/80 transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">{job.description}</p>

                <div className="space-y-1.5 pt-3 border-t border-white/5">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Requirements Matrix</span>
                  <ul className="space-y-1 text-xs text-gray-400 font-sans">
                    {job.requirements.map((req, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-1.5">
                        <span className="text-white/60">▪</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                  <span className="text-[10px] font-mono text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Select Role for Application →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right col: Interactive Submission Form */}
        <div className="lg:col-span-6 space-y-8">
          <h2 className="text-2xl font-display font-medium text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-white/80" /> Apply or Ask Anything
          </h2>

          <div className="p-6 md:p-8 rounded-2xl bg-[#09090C] border border-white/10 shadow-xl relative glow-border min-h-[500px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                /* Submitting State Telemetry */
                <motion.div
                  key="submitting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-12"
                >
                  <div className="relative flex items-center justify-center mb-6">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="w-16 h-16 rounded-full border border-t-white border-r-transparent border-b-white/10 border-l-transparent"
                    />
                    <Upload className="w-6 h-6 text-white absolute" />
                  </div>
                  <h3 className="text-lg font-display font-medium text-white">Encrypting Submission</h3>
                  <div className="space-y-2 max-w-xs mx-auto text-center">
                    <p className="text-xs text-gray-500 font-mono animate-pulse uppercase tracking-widest">Compiling parameters.pkg</p>
                    <p className="text-[11px] text-gray-400 font-sans leading-relaxed">Securing core identification records and routing submission vector to Mitragan Core ledgers.</p>
                  </div>
                </motion.div>
              ) : isSubmitted ? (
                /* Success Animated State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mx-auto text-white">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-medium text-white">Credentials Recorded</h3>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                    Your application and structural inquiry have been registered successfully on our backend ledger. Our lead engineers will review your credentials and reach out to establish a secure discovery channel.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 font-mono uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                /* Interactive Form Form */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {error && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Form fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block">Candidate Name *</label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Elena Rostova"
                        className="w-full p-3 rounded-lg bg-[#111115] border border-white/10 focus:border-white focus:outline-none transition-all text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block">Secure Email *</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. elena@aetheris.io"
                        className="w-full p-3 rounded-lg bg-[#111115] border border-white/10 focus:border-white focus:outline-none transition-all text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block">Target Role / Purpose</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3 rounded-lg bg-[#111115] border border-white/10 focus:border-white focus:outline-none transition-all text-xs text-gray-300"
                      >
                        <option value="Creative Developer (WebGL & Interactive UX)">Creative Dev (WebGL)</option>
                        <option value="Senior Systems Architect (Rust / Go / Distributed)">Systems Arch (Rust/Go)</option>
                        <option value="Lead Product & UX Strategist">Product Lead (Discovery)</option>
                        <option value="Custom Architectural Consultation">Project Consultation</option>
                        <option value="General Engineering Talents">General Engineering</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block">GitHub / LinkedIn URL</label>
                      <input
                        type="url"
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                        placeholder="e.g. github.com/rostova-arch"
                        className="w-full p-3 rounded-lg bg-[#111115] border border-white/10 focus:border-white focus:outline-none transition-all text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block">Statement of craftsmanship *</label>
                    <textarea
                      required
                      rows={3}
                      value={statement}
                      onChange={(e) => setStatement(e.target.value)}
                      placeholder="Why do you seek Mitragan's zero-compromise standards? What bold system or design have you implemented?"
                      className="w-full p-3 rounded-lg bg-[#111115] border border-white/10 focus:border-white focus:outline-none transition-all text-xs text-white leading-relaxed"
                    />
                  </div>

                  {/* Drag and Drop Upload Box */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block">Credentials / CV Upload</label>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-dashed border-white/10 hover:border-white/30 rounded-xl p-4 text-center cursor-pointer bg-[#111115] transition-all space-y-2 group"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />
                      {mockFileName ? (
                        <div className="flex items-center justify-between bg-[#15151B] p-2.5 rounded-lg border border-white/5 text-left text-xs text-gray-300">
                          <div className="flex items-center gap-2 min-w-0">
                            <Paperclip className="w-4 h-4 text-white shrink-0" />
                            <span className="truncate text-gray-200">{mockFileName}</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile();
                            }}
                            className="p-1 text-gray-500 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="py-2">
                          <Upload className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors mx-auto mb-2" />
                          <p className="text-xs text-gray-400">Drag & drop your PDF CV here or <span className="text-white">browse</span></p>
                          <p className="text-[9px] text-gray-600 mt-1">Supported formats: PDF, DOC, DOCX up to 10MB</p>
                        </div>
                      )}

                      {/* Mock upload progress bar */}
                      {mockFileName && uploadProgress < 100 && (
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-white transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission Action */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-white hover:bg-gray-100 text-black font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-white/5"
                    >
                      Record Submission <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
