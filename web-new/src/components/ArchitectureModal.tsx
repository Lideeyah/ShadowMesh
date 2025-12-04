"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Shield, FileCode, Network, Lock, Wallet, Server, Layers, ArrowRight } from "lucide-react";

interface ArchitectureModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ArchitectureModal({ isOpen, onClose }: ArchitectureModalProps) {
    if (!isOpen) return null;

    const techStack = [
        {
            icon: Cpu,
            title: "1. AI Inference Layer",
            desc: "Processes user inputs, patterns, data or events. Makes predictions, risk scores, classifications, or routing decisions.",
            why: "Transforms raw inputs → smart interpretations."
        },
        {
            icon: Shield,
            title: "2. Zero‑Knowledge Proof (ZKP) Engine",
            desc: "Allows a user to prove something is true without revealing the underlying data. Used for private identity checks and compliance.",
            why: "Gives ShadowMesh privacy‑preserving verification."
        },
        {
            icon: FileCode,
            title: "3. Smart Contracts",
            desc: "Automated logic on the blockchain that enforces rules without middlemen. Handles credentials and reputation scoring.",
            why: "Guarantees trusted, tamper‑proof records of privacy‑safe events."
        },
        {
            icon: Network,
            title: "4. Cross‑Chain Bridge",
            desc: "Allows assets, proofs, or reputational data to move between multiple blockchains (Polygon, Base, Solana, etc.).",
            why: "Users aren't locked into a single chain."
        },
        {
            icon: Lock,
            title: "5. MPC (Secure Multi‑Party Computation)",
            desc: "Splits sensitive data across multiple nodes so no single entity can see the full information.",
            why: "High‑level security without exposing secrets to anyone."
        },
        {
            icon: Wallet,
            title: "6. Privacy Wallet Infrastructure",
            desc: "Stores and manages ZK credentials, attestations, private tokens, access keys. Not a money wallet.",
            why: "Gives users their own fully private and verifiable identity vault."
        },
        {
            icon: Server,
            title: "7. Backend Orchestration Layer",
            desc: "Coordinates all services: AI, ZKP engine, MPC, smart contracts. Acts as the 'traffic control' of the system.",
            why: "Ensures speed, stability, sequencing, and secure request flows."
        },
        {
            icon: Layers,
            title: "8. Frontend (Glassmorphic Dark UI)",
            desc: "User-facing dashboards, flows, credential views. Visualizes risk scores and cross-chain controls.",
            why: "Makes intelligence + verification simple and intuitive."
        }
    ];

    const flowSteps = [
        "User Interaction (Wallet/SSO)",
        "Backend Orchestration Receives Request",
        "AI Inference Layer Runs (Risk Scoring)",
        "MPC + Privacy Layer Secures Data",
        "ZKP Engine Generates Private Proofs",
        "Smart Contract Interaction (Verify Proof)",
        "Cross‑Chain Bridge Activation (If needed)",
        "Privacy Wallet Receives Outputs",
        "Frontend Displays Final State"
    ];

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-5xl bg-[#0A0A0A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/5 sticky top-0 z-10 backdrop-blur-md">
                    <div>
                        <h2 className="text-2xl font-bold text-white font-space-grotesk">System Architecture</h2>
                        <p className="text-gray-400 text-sm">ShadowMesh Technology Breakdown & Integration Flow</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar space-y-12">

                    {/* Tech Stack Grid */}
                    <section>
                        <h3 className="text-xl font-bold text-electric-blue mb-6 flex items-center gap-2">
                            <Cpu size={24} />
                            Technology Breakdown
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {techStack.map((item, idx) => (
                                <div key={idx} className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-electric-blue/30 transition-all group">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-black/40 text-electric-blue group-hover:scale-110 transition-transform">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg mb-2">{item.title}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-3">{item.desc}</p>
                                            <div className="text-xs font-mono text-neon-teal bg-neon-teal/10 px-3 py-1.5 rounded-lg inline-block">
                                                Why: {item.why}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Integration Flow */}
                    <section>
                        <h3 className="text-xl font-bold text-neon-teal mb-8 flex items-center gap-2">
                            <Network size={24} />
                            Full Integration Flow
                        </h3>
                        <div className="relative">
                            {/* Connecting Line */}
                            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-electric-blue via-neon-teal to-purple-500 opacity-30" />

                            <div className="space-y-6">
                                {flowSteps.map((step, idx) => (
                                    <div key={idx} className="relative flex items-center gap-6 group">
                                        <div className="w-14 h-14 rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center z-10 group-hover:border-electric-blue transition-colors shadow-lg shadow-black">
                                            <span className="font-mono font-bold text-gray-500 group-hover:text-white transition-colors">{idx}</span>
                                        </div>
                                        <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all">
                                            <span className="font-bold text-gray-200">{step}</span>
                                            <ArrowRight size={16} className="text-gray-600 group-hover:text-electric-blue transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </motion.div>
        </div>
    );
}
