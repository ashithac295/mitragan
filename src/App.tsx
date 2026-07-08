import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Shield, Sun, Moon } from "lucide-react";
import { Tab } from "./types";
import HomeView from "./components/HomeView";
import ProjectsView from "./components/ProjectsView";
import TestimonialsView from "./components/TestimonialsView";
import JoinView from "./components/JoinView";
import AIAssistantModal from "./components/AIAssistantModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [isArchitectOpen, setIsArchitectOpen] = useState(false);
  const [prefilledJob, setPrefilledJob] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const handleSelectApply = (jobTitle: string) => {
    setPrefilledJob(jobTitle);
    setActiveTab(Tab.Join);
  };

  return (
    <div className={`min-h-screen bg-[#070709] bg-grid-pattern text-white flex flex-col font-sans selection:bg-white/20 selection:text-white transition-colors duration-500 ${theme === "light" ? "light-theme" : ""
      }`}>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#070709]/80 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4 transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => {
              setActiveTab(Tab.Home);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="flex flex-row items-center gap-2">
              <img
                src="/mitragan_cent_logo.png"
                alt="Mitragan"
                className={`w-11 h-11 object-contain transition-all duration-300 ${theme === "light" ? "" : "invert"
                  }`}
              />
              <img
                src="/mitragan_word.png"
                alt="MITRAGAN"
                className={`h-6 object-contain transition-all duration-300 ${theme === "light" ? "" : "invert"
                  }`}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0A0A0D] border border-white/5 p-1 rounded-full">
            {Object.values(Tab).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  // Clear prefilled context unless explicitly set
                  if (tab !== Tab.Join) setPrefilledJob("");
                }}
                className={`px-4.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeTab === tab
                  ? "bg-white text-black font-semibold shadow-md shadow-white/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {tab === Tab.Join ? "Join Mitragan" : tab}
              </button>
            ))}
          </nav>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            {/* Elegant Day/Night Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-[1.05] ${theme === "light"
                ? "bg-black/5 border-black/10 text-black hover:bg-black/10"
                : "bg-[#0F0F12] border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                }`}
              title={theme === "light" ? "Switch to Night Mode" : "Switch to Day Mode"}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-[#070709]" />
              ) : (
                <Sun className="w-4 h-4 text-white" />
              )}
            </button>

            <button
              onClick={() => setIsArchitectOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#0F0F12] hover:bg-white hover:text-black border border-white/10 hover:border-white/20 text-xs font-mono uppercase tracking-wider text-white font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Architect
            </button>
          </div>
        </div>

        {/* Mobile Navigation Strip */}
        <div className="flex md:hidden items-center justify-around mt-4 pt-3 border-t border-white/5">
          {Object.values(Tab).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab !== Tab.Join) setPrefilledJob("");
              }}
              className={`text-[9px] font-mono uppercase tracking-widest py-1 px-2.5 rounded ${activeTab === tab
                ? "text-white bg-white/5 border border-white/10 font-bold"
                : "text-gray-500"
                }`}
            >
              {tab === Tab.Join ? "Careers" : tab}
            </button>
          ))}
        </div>
      </header>

      {/* Main Render Target */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === Tab.Home && (
              <HomeView
                onNavigate={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onOpenArchitect={() => setIsArchitectOpen(true)}
                theme={theme}
              />
            )}

            {activeTab === Tab.Projects && <ProjectsView />}

            {activeTab === Tab.Testimonials && <TestimonialsView />}

            {activeTab === Tab.Join && (
              <JoinView prefilledJob={prefilledJob} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Element */}
      <footer className="border-t border-white/5 bg-[#09090C] py-12 px-4 md:px-8 mt-16 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Col 1: Branding Signature */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left justify-center md:justify-start">
            <img
              src="/mitragan_cent_logo.png"
              alt="Mitragan"
              className={`w-11 h-11 object-contain transition-all duration-300 ${theme === "light" ? "" : "invert"
                }`}
            />
            <div className="space-y-1">
              <img
                src="/mitragan_word.png"
                alt="MITRAGAN"
                className={`h-4 object-contain transition-all duration-300 ${theme === "light" ? "" : "invert"
                  }`}
              />
              <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs mx-auto md:mx-0">
                An elite engineering agency partnering with pioneering teams to compile precision systems, beautiful interfaces, and secure server pipelines.
              </p>
            </div>
          </div>

          {/* Col 2: High-end Values Slogan */}
          <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/80">Core Axiom</span>
            <span className="text-xs italic">"Absolute precision is the highest form of software craft."</span>
          </div>

          {/* Col 3: Copyright and Credentials */}
          <div className="space-y-2 text-center md:text-right text-xs text-gray-500">
            <p>© 2026 Mitragan. All rights reserved.</p>
            <div className="flex items-center justify-center md:justify-end gap-1 text-[10px] text-gray-600 font-mono">
              <Shield className="w-3.5 h-3.5 text-white/60" /> Credentials Shielded Server-Side
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for AI Architect */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsArchitectOpen(true)}
          className="group relative p-4 rounded-full bg-white hover:bg-gray-200 text-black shadow-lg shadow-white/20 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105"
        >
          {/* Subtle Outer Pulsing Wave */}
          <span className="absolute inset-0 rounded-full bg-white/20 animate-ping pointer-events-none" />
          <Sparkles className="w-5 h-5" />

          {/* Text Tooltip */}
          <span className="absolute right-14 bg-[#0A0A0D] border border-white/10 text-white font-mono text-[9px] uppercase tracking-widest py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            AI Project Architect
          </span>
        </button>
      </div>

      {/* Interactive AI Architect Modal */}
      <AIAssistantModal
        isOpen={isArchitectOpen}
        onClose={() => setIsArchitectOpen(false)}
        onSelectApply={handleSelectApply}
      />
    </div>
  );
}
