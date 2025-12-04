"use client";
// Force rebuild

import { useState } from "react";
import { motion } from "framer-motion";
import NetworkCard from "./NetworkCard";
import { Wallet, Shield, Zap, Globe } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import MockWalletPopup from "./MockWalletPopup";

const networks = [
    { name: "Zcash", status: "active", color: "#F4B728", glowClass: "glow-zcash", description: "Shielded transactions via zk-SNARKs with client-side decryption and selective disclosure." },
    { name: "Mina", status: "active", color: "#E76F51", glowClass: "glow-mina", description: "Verifies ZEC commitments via zkApps. Recursive proofs for cross-chain verification." },
    { name: "Starknet", status: "active", color: "#8B5CF6", glowClass: "glow-starknet", description: "Private DeFi logic using Noir/Garaga circuits. Bridge endpoint for cross-chain proofs." },
    { name: "NEAR", status: "active", color: "#10B981", glowClass: "glow-near", description: "Intents engine & TEE-based AI reasoning for cross-chain private execution." },
];

export default function Dashboard() {
    const { connectWallet } = useWallet();
    const [showConnectPopup, setShowConnectPopup] = useState(false);
    const [selectedNetwork, setSelectedNetwork] = useState("");
    const [connectedNetworks, setConnectedNetworks] = useState<string[]>([]);

    const handleNetworkConnect = () => {
        if (selectedNetwork) {
            setConnectedNetworks(prev => [...prev, selectedNetwork]);
            setShowConnectPopup(false);
        }
    };
    return (
        <div className="space-y-8">
            {showConnectPopup && (
                <MockWalletPopup
                    variant={selectedNetwork === "Ethereum" ? "wallet" : "network"}
                    networkName={selectedNetwork}
                    walletName={
                        selectedNetwork === "Solana" ? "Phantom" :
                            selectedNetwork === "Bitcoin" ? "Leather" :
                                selectedNetwork === "Sui" ? "Sui Wallet" :
                                    selectedNetwork === "Zcash" ? "ZecWallet" :
                                        selectedNetwork === "Mina" ? "Auro Wallet" : "MetaMask"
                    }
                    onConfirm={(walletName, chain) => {
                        if (selectedNetwork === "Ethereum" || !selectedNetwork) {
                            // Wallet mode: use selected wallet from popup
                            if (walletName && chain) {
                                connectWallet(chain, walletName);
                            } else {
                                connectWallet("Ethereum", "MetaMask"); // Fallback
                            }
                        } else {
                            // Network mode
                            handleNetworkConnect();
                            // Connect specific wallets based on network
                            let walletType = "MockWallet";
                            if (selectedNetwork === "Solana") walletType = "Phantom";
                            if (selectedNetwork === "Bitcoin") walletType = "Leather";
                            if (selectedNetwork === "Sui") walletType = "Sui Wallet";
                            if (selectedNetwork === "Zcash") walletType = "ZecWallet";
                            if (selectedNetwork === "Mina") walletType = "Auro Wallet";

                            connectWallet(selectedNetwork, walletType);
                        }
                        setShowConnectPopup(false);
                    }}
                    onCancel={() => setShowConnectPopup(false)}
                />
            )}

            {/* Connected Accounts */}
            <div className="glass-panel p-6 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Wallet size={20} className="text-electric-blue" />
                        Connected Accounts
                    </h2>
                    <button
                        onClick={() => {
                            setSelectedNetwork("Ethereum"); // Default
                            setShowConnectPopup(true);
                        }}
                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all border border-white/10"
                    >
                        + Add Wallet
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {useWallet().wallets.map((wallet) => (
                        <div key={wallet.chain} className="p-4 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl">
                                    {wallet.chain === "Ethereum" ? "🦊" : wallet.chain === "Zcash" ? "🛡️" : "⛓️"}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">{wallet.chain}</div>
                                    <div className="text-xs text-gray-500 font-mono">{wallet.address}</div>
                                </div>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        </div>
                    ))}
                    {useWallet().wallets.length === 0 && (
                        <div className="col-span-full py-8 text-center text-gray-500 text-sm italic">
                            No wallets connected. Connect a wallet to start.
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-zcash/10 text-zcash">
                        <Shield size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-mono">Shielded Balance</p>
                        <p className="text-2xl font-bold font-space-grotesk">1,240.50 ZEC</p>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-mina/10 text-mina">
                        <Wallet size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-mono">Total Value Locked</p>
                        <p className="text-2xl font-bold font-space-grotesk">$42,890.00</p>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-starknet/10 text-starknet">
                        <Zap size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-mono">Active Bridges</p>
                        <p className="text-2xl font-bold font-space-grotesk">3 Active</p>
                    </div>
                </div>
            </div>

            {/* Networks Grid */}
            <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Globe size={20} className="text-gray-400" />
                    Supported Networks
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {networks.map((net) => (
                        // @ts-ignore
                        <NetworkCard
                            key={net.name}
                            {...net}
                            isConnected={connectedNetworks.includes(net.name)}
                            onConnect={() => {
                                setSelectedNetwork(net.name);
                                setShowConnectPopup(true);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
