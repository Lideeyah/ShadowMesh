"use client";

import { motion } from "framer-motion";
import { Zap, Lock, Globe, Cpu, Layers, EyeOff } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Autonomous Execution",
        description: "Agents that plan, bridge, and execute complex multi-chain workflows automatically.",
        color: "text-electric-blue",
    },
    {
        icon: Lock,
        title: "Shielded by Default",
        description: "Transactions are generated locally and proven with ZK-SNARKs before broadcasting.",
        color: "text-neon-teal",
    },
    {
        icon: Globe,
        title: "Multi-Chain Native",
        description: "Seamless interoperability between Zcash, Mina, Starknet, NEAR, and Axelar.",
        color: "text-privacy-purple",
    },
];

const privacyStack = [
    {
        title: "Zero-Knowledge Proofs",
        desc: "Verify correctness without revealing data.",
        tech: "Mina / Starknet",
    },
    {
        title: "Fully Homomorphic Encryption",
        desc: "Compute on encrypted data without decrypting.",
        tech: "Fhenix / Nillion",
    },
    {
        title: "Trusted Execution Environments",
        desc: "Secure enclaves for private agent logic.",
        tech: "Intel SGX / AWS Nitro",
    },
];

export default function Features() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Capabilities Grid */}
                <div className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
                            Beyond Smart Contracts
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            ShadowMesh agents possess the autonomy to navigate the fragmented crypto landscape while keeping your intent completely hidden.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group"
                            >
                                <div className={`p-4 rounded-xl bg-white/5 w-fit mb-6 ${feature.color} group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="font-heading text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Privacy Stack */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-privacy-purple/10 to-transparent blur-3xl -z-10" />

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
                                The Privacy Triad
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                We combine three cutting-edge technologies to ensure total privacy for both computation and state.
                            </p>

                            <div className="space-y-6">
                                {privacyStack.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1 p-2 rounded-lg bg-white/5 text-neon-teal">
                                            <EyeOff className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{item.title}</h4>
                                            <p className="text-gray-400 text-sm mb-1">{item.desc}</p>
                                            <span className="text-xs font-mono text-electric-blue">{item.tech}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Abstract Visualization of the Stack */}
                            <div className="aspect-square rounded-full border border-white/10 relative flex items-center justify-center animate-[spin_60s_linear_infinite]">
                                <div className="absolute inset-0 border border-dashed border-white/20 rounded-full m-12" />
                                <div className="absolute inset-0 border border-white/5 rounded-full m-24" />
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="glass-panel p-8 rounded-2xl text-center backdrop-blur-2xl">
                                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-privacy-purple mb-2">
                                        100%
                                    </div>
                                    <div className="text-sm font-mono text-gray-400">SHIELDED</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
