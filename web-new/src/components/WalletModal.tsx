"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, Shield, Zap } from "lucide-react";
import { useState } from "react";

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (walletName: string) => void;
}

const wallets = [
    { id: "metamask", name: "MetaMask", icon: "🦊", type: "Ethereum" },
    { id: "keplr", name: "Keplr", icon: "⚛️", type: "Cosmos" },
    { id: "argent", name: "Argent X", icon: "🛡️", type: "Starknet" },
    { id: "shadow", name: "Shadow Enclave", icon: "👻", type: "Privacy" },
];

export default function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
    const [connecting, setConnecting] = useState<string | null>(null);

    const handleConnect = (walletId: string) => {
        setConnecting(walletId);
        // Simulate connection delay
        setTimeout(() => {
            onConnect(walletId);
            setConnecting(null);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md bg-[#0B0F19] border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                                <h3 className="font-heading font-bold text-lg">Connect Wallet</h3>
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-4">
                                <p className="text-sm text-gray-400 mb-4">
                                    Select a wallet to connect to the ShadowMesh privacy network.
                                </p>

                                <div className="space-y-3">
                                    {wallets.map((wallet) => (
                                        <button
                                            key={wallet.id}
                                            onClick={() => handleConnect(wallet.id)}
                                            disabled={!!connecting}
                                            className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-electric-blue/30 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-xl">
                                                    {wallet.icon}
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-bold text-white group-hover:text-electric-blue transition-colors">
                                                        {wallet.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 font-mono">
                                                        {wallet.type}
                                                    </div>
                                                </div>
                                            </div>
                                            {connecting === wallet.id && (
                                                <div className="w-5 h-5 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                                    <p className="text-xs text-gray-500">
                                        By connecting, you agree to the <span className="text-electric-blue cursor-pointer hover:underline">Terms of Privacy</span>.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
