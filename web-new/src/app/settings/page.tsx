"use client";

import Navbar from "@/components/Navbar";
import { Shield, Server, Lock, Eye } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [privacyMode, setPrivacyMode] = useState("max");
    const [rpcNode, setRpcNode] = useState("mainnet");

    return (
        <main className="min-h-screen bg-shadow-dark pt-24 px-6 pb-6">
            <Navbar />

            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-electric-blue/10 text-electric-blue">
                        <Shield className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="font-heading font-bold text-3xl">Settings</h1>
                        <p className="text-gray-400">Configure your privacy enclave and network preferences.</p>
                    </div>
                </div>

                {/* Privacy Configuration */}
                <div className="glass-panel rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="w-5 h-5 text-neon-teal" />
                        <h2 className="font-bold text-xl">Privacy Configuration</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => setPrivacyMode("max")}
                            className={`p-6 rounded-xl border text-left transition-all ${privacyMode === "max"
                                ? "bg-neon-teal/10 border-neon-teal text-white"
                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                }`}
                        >
                            <div className="font-bold mb-2">Maximum Privacy</div>
                            <div className="text-sm opacity-80">
                                Always use shielded pools. ZK-proofs generated locally. Slower but most secure.
                            </div>
                        </button>

                        <button
                            onClick={() => setPrivacyMode("balanced")}
                            className={`p-6 rounded-xl border text-left transition-all ${privacyMode === "balanced"
                                ? "bg-electric-blue/10 border-electric-blue text-white"
                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                }`}
                        >
                            <div className="font-bold mb-2">Balanced Mode</div>
                            <div className="text-sm opacity-80">
                                Use transparent bridges for speed when acceptable. Optimistic privacy.
                            </div>
                        </button>
                    </div>
                </div>

                {/* Network Settings */}
                <div className="glass-panel rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Server className="w-5 h-5 text-electric-blue" />
                        <h2 className="font-bold text-xl">Network Nodes</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${rpcNode === "mainnet" ? "bg-green-500" : "bg-gray-600"}`} />
                                <div>
                                    <div className="font-medium">ShadowMesh Mainnet (Alpha)</div>
                                    <div className="text-xs text-gray-500">rpc.shadowmesh.network • 14ms latency</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setRpcNode("mainnet")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${rpcNode === "mainnet"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-white/5 text-gray-400 hover:text-white"
                                    }`}
                            >
                                {rpcNode === "mainnet" ? "Active" : "Select"}
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${rpcNode === "local" ? "bg-green-500" : "bg-gray-600"}`} />
                                <div>
                                    <div className="font-medium">Local Enclave (Dev)</div>
                                    <div className="text-xs text-gray-500">localhost:3000 • 0ms latency</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setRpcNode("local")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${rpcNode === "local"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-white/5 text-gray-400 hover:text-white"
                                    }`}
                            >
                                {rpcNode === "local" ? "Active" : "Select"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
