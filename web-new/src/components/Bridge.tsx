"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, ShieldCheck, Loader2 } from "lucide-react";

export default function Bridge() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState(1); // 1: Input, 2: Proof Gen, 3: Success

    const handleBridge = async () => {
        setIsProcessing(true);
        setStep(2);

        try {
            // 1. Generate Proof
            const proveRes = await fetch('http://localhost:4000/bridge/prove', { method: 'POST' });
            await proveRes.json();

            // 2. Submit Bridge Tx
            const submitRes = await fetch('http://localhost:4000/bridge/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 10, from: 'Zcash', to: 'Mina' })
            });
            await submitRes.json();

            setStep(3);
        } catch (err) {
            console.error("Bridge Error:", err);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="glass-panel p-8 rounded-2xl border-t border-white/10 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-zcash/10 blur-[100px] -z-10" />

                <h2 className="text-2xl font-bold font-space-grotesk mb-6 flex items-center gap-3">
                    <ArrowRightLeft className="text-zcash" />
                    Private Bridge
                </h2>

                {step === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                                <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">From</label>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-zcash/20 flex items-center justify-center text-zcash font-bold">Z</div>
                                    <span className="font-bold text-lg">Zcash</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                                <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">To</label>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-mina/20 flex items-center justify-center text-mina font-bold">M</div>
                                    <span className="font-bold text-lg">Mina</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Amount to Bridge</label>
                            <div className="flex justify-between items-end">
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="bg-transparent text-3xl font-mono font-bold outline-none w-full placeholder:text-gray-700"
                                />
                                <span className="text-sm text-gray-400 mb-2">ZEC</span>
                            </div>
                        </div>

                        <button
                            onClick={handleBridge}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-zcash to-mina text-black font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                        >
                            Generate Proof & Bridge
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                        <Loader2 className="w-16 h-16 text-zcash animate-spin mx-auto mb-6" />
                        <h3 className="text-xl font-bold mb-2">Generating ZK Proof...</h3>
                        <p className="text-gray-400 text-sm">Verifying shielded note commitment on client-side.</p>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Bridge Successful!</h3>
                        <p className="text-gray-400 text-sm mb-6">Your wrapped assets are now available on Mina.</p>
                        <button
                            onClick={() => setStep(1)}
                            className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold"
                        >
                            Bridge More
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
