export enum Tab {
  Home = "Home",
  Projects = "Projects",
  Testimonials = "Testimonials",
  Join = "Join Mitragan"
}

export interface RecommendedTech {
  category: string;
  tech: string;
  justification: string;
}

export interface SystemComponent {
  component: string;
  description: string;
  engineeringHighlight: string;
}

export interface TimelinePhase {
  phase: string;
  duration: string;
  milestones: string[];
}

export interface RiskAnalysis {
  risk: string;
  mitigation: string;
}

export interface AIProposal {
  proposalTitle: string;
  visionStatement: string;
  recommendedTechStack: RecommendedTech[];
  systemArchitecture: SystemComponent[];
  timelinePhases: TimelinePhase[];
  riskAnalysis: RiskAnalysis[];
  mitraganEdge: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullOverview: string;
  category: string;
  image: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  architecture: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  metricsImpact: string;
  rating: number;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}
