"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-electric-blue/10 via-transparent to-transparent opacity-50" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-privacy-purple/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-teal/10 rounded-full blur-[100px]" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 mb-8">
                        <span className="w-2 h-2 rounded-full bg-neon-teal animate-pulse" />
                        SHIELDED AGENT NETWORK V1.0
                    </div>

                    <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Privacy-First <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-teal text-glow">
                            Autonomous Agents
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Execute shielded, multi-chain actions across Zcash, Mina, Starknet, and more using natural language.
                        The first AI agent network that keeps your intent private.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/console">
                            <button className="group relative px-8 py-4 bg-electric-blue text-white rounded-xl font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(77,163,255,0.4)]">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                <span className="flex items-center gap-2">
                                    Launch Console <Terminal className="w-5 h-5" />
                                </span>
                            </button>
                        </Link>

                        <button
                            onClick={() => alert("Documentation is coming soon!")}
                            className="px-8 py-4 glass-panel rounded-xl font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                        >
                            View Documentation <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </section>
    );
}
