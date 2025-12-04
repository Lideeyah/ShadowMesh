"use client";

import { motion } from "framer-motion";
import { Ghost, LayoutDashboard, ArrowRightLeft, Bot, Settings, Layers } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import MockWalletPopup from "./MockWalletPopup";
import ArchitectureModal from "./ArchitectureModal";

interface NavbarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "bridge", label: "Private Bridge", icon: ArrowRightLeft },
        { id: "agent", label: "AI Agent", icon: Bot },
        { id: "system", label: "System", icon: Layers },
    ];

    const { isConnected, wallets, connectWallet, disconnectWallet } = useWallet();
    const [showConnectPopup, setShowConnectPopup] = useState(false);
    const [showArchitecture, setShowArchitecture] = useState(false);

    return (
        <>
            <ArchitectureModal isOpen={showArchitecture} onClose={() => setShowArchitecture(false)} />

            {showConnectPopup && (
                <MockWalletPopup
                    variant="wallet"
                    onConfirm={(walletName, chain) => {
                        if (walletName && chain) {
                            connectWallet(chain, walletName);
                        } else {
                            connectWallet("Ethereum", "MetaMask");
                        }
                        setShowConnectPopup(false);
                    }}
                    onCancel={() => setShowConnectPopup(false)}
                />
            )}
            <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowArchitecture(true)}>
                        <div className="relative w-10 h-10">
                            <Image
                                src="/logo.png"
                                alt="ShadowMesh Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold font-space-grotesk tracking-tight">
                            Shadow<span className="text-electric-blue">Mesh</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all ${activeTab === item.id ? "text-black" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {activeTab === item.id && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <item.icon size={16} />
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowArchitecture(true)}
                            className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                            title="System Architecture"
                        >
                            <Settings size={20} />
                        </button>
                        {isConnected ? (
                            <div className="flex items-center gap-2">
                                {wallets.slice(0, 2).map((wallet, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => disconnectWallet(wallet.address)}
                                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono hover:bg-red-500/10 hover:border-red-500/50 transition-all flex items-center gap-2"
                                        title="Click to disconnect"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        {wallet.chain}: {wallet.address.slice(0, 6)}...
                                    </button>
                                ))}
                                {wallets.length > 2 && (
                                    <span className="text-xs text-gray-500">+{wallets.length - 2} more</span>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowConnectPopup(true)}
                                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-bold transition-all hover:scale-105"
                            >
                                Connect Wallet
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
