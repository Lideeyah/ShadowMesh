"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Wallet, ArrowRight, Server, Activity, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface MockWalletPopupProps {
    variant?: "wallet" | "network";
    networkName?: string;
    walletName?: string;
    onConfirm: (walletName?: string, chain?: string) => void;
    onCancel: () => void;
}

const WALLETS = [
    {
        id: "metamask",
        name: "MetaMask",
        chain: "Ethereum",
        icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
    },
    {
        id: "phantom",
        name: "Phantom",
        chain: "Solana",
        icon: "https://upload.wikimedia.org/wikipedia/en/ab/Phantom_wallet_logo.png"
    },
    {
        id: "leather",
        name: "Leather",
        chain: "Bitcoin",
        icon: "https://pbs.twimg.com/profile_images/1696567536682659840/e36q5lMa_400x400.jpg"
    },
    {
        id: "slush",
        name: "Slush",
        chain: "Sui",
        icon: "https://pbs.twimg.com/profile_images/1747653896432926720/f9o9k9j9_400x400.jpg"
    },
    {
        id: "keplr",
        name: "Keplr",
        chain: "Cosmos",
        icon: "https://raw.githubusercontent.com/chainapsis/keplr-wallet/master/docs/.vuepress/public/assets/img/keplr-logo.svg"
    },
    {
        id: "auro",
        name: "Auro",
        chain: "Mina",
        icon: "https://www.aurowallet.com/assets/img/logo.png"
    },
    {
        id: "zecwallet",
        name: "ZecWallet",
        chain: "Zcash",
        icon: "https://www.zecwallet.co/assets/images/zecwallet-logo.png"
    },
];

export default function MockWalletPopup({ variant = "wallet", networkName, walletName, onConfirm, onCancel }: MockWalletPopupProps) {
    const [status, setStatus] = useState<"idle" | "connecting" | "connected">("idle");
    const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
    const [logs, setLogs] = useState<string[]>([]);

    // Network connection simulation
    useEffect(() => {
        if (status === "connecting" && variant === "network") {
            const networkLogs = [
                `Initializing ${networkName} light client...`,
                "Syncing block headers...",
                "Verifying latest ZK-proof...",
                "Establishing secure channel...",
                "Connected."
            ];

            let delay = 0;
            networkLogs.forEach((log, index) => {
                delay += 800;
                setTimeout(() => {
                    setLogs(prev => [...prev, log]);
                    if (index === networkLogs.length - 1) {
                        setStatus("connected");
                        setTimeout(() => onConfirm(), 1000);
                    }
                }, delay);
            });
        }
    }, [status, variant, networkName, onConfirm]);

    const handleWalletSelect = (wallet: typeof WALLETS[0]) => {
        setSelectedWalletId(wallet.id);
        setStatus("connecting");

        // Simulate wallet signature request / connection delay
        setTimeout(() => {
            setStatus("connected");
            setTimeout(() => {
                onConfirm(wallet.name, wallet.chain);
            }, 1000);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md mx-4 glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-electric-blue/10 relative"
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="relative px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-2">
                        {variant === "wallet" ? (
                            <Shield className="w-5 h-5 text-electric-blue" />
                        ) : (
                            <Activity className="w-5 h-5 text-neon-teal" />
                        )}
                        <span className="font-heading font-bold text-sm tracking-wide text-white uppercase">
                            {variant === "wallet" ? "Connect Wallet" : `Connect ${networkName}`}
                        </span>
                    </div>
                    <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="relative p-6 flex flex-col items-center text-center min-h-[320px]">
                    {variant === "wallet" ? (
                        <>
                            <div className="mb-6 text-center">
                                <h3 className="text-xl font-bold font-space-grotesk mb-1 text-white">Select Wallet</h3>
                                <p className="text-gray-400 text-xs">Choose a provider to connect</p>
                            </div>

                            <div className="w-full space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                                {WALLETS.map((wallet) => (
                                    <button
                                        key={wallet.id}
                                        onClick={() => handleWalletSelect(wallet)}
                                        disabled={status !== "idle" && selectedWalletId !== wallet.id}
                                        className={`w-full group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-3 transition-all hover:border-electric-blue/50 flex items-center justify-between ${status !== "idle" && selectedWalletId !== wallet.id ? "opacity-30 grayscale" : ""
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden p-1.5 relative">
                                                <Image
                                                    src={wallet.icon}
                                                    alt={wallet.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-white text-sm">{wallet.name}</div>
                                                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{wallet.chain}</div>
                                            </div>
                                        </div>
                                        {status === "connecting" && selectedWalletId === wallet.id ? (
                                            <div className="w-4 h-4 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
                                        ) : status === "connected" && selectedWalletId === wallet.id ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-electric-blue transition-colors" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        // Network Connection UI
                        <div className="w-full flex flex-col items-center justify-center h-full pt-8">
                            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 relative">
                                {status === "connecting" && (
                                    <svg className="absolute inset-0 w-full h-full animate-spin text-neon-teal/30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="20 10" />
                                    </svg>
                                )}
                                <Server className={`w-10 h-10 ${status === "connected" ? "text-green-500" : "text-neon-teal"}`} />
                            </div>

                            <div className="w-full max-w-xs space-y-2">
                                {status === "idle" && (
                                    <button
                                        onClick={() => setStatus("connecting")}
                                        className="w-full py-3 rounded-xl bg-neon-teal/10 text-neon-teal border border-neon-teal/20 font-bold hover:bg-neon-teal/20 transition-all"
                                    >
                                        Initialize Connection
                                    </button>
                                )}

                                <div className="space-y-1 h-32 overflow-hidden flex flex-col justify-end">
                                    <AnimatePresence>
                                        {logs.map((log, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-xs font-mono text-left flex items-center gap-2 text-gray-400"
                                            >
                                                <div className="w-1 h-1 rounded-full bg-neon-teal" />
                                                {log}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
