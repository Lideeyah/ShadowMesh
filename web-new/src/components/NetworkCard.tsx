"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";

interface NetworkCardProps {
    name: string;
    status: "active" | "congested" | "maintenance";
    color: string;
    glowClass: string;
    description: string;
    onConnect: () => void;
    isConnected?: boolean;
}

export default function NetworkCard({ name, status, color, glowClass, description, onConnect, isConnected }: NetworkCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`glass-card p-6 rounded-xl relative overflow-hidden group ${glowClass}`}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity size={48} color={color} />
            </div>

            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold font-space-grotesk tracking-wide">{name}</h3>
                <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-mono bg-black/20 border border-white/10`}>
                    <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                    <span className="uppercase">{status}</span>
                </div>
            </div>

            <p className="text-gray-400 text-sm mb-6 font-inter leading-relaxed">
                {description}
            </p>

            {isConnected ? (
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Connected
                </div>
            ) : (
                <button
                    onClick={onConnect}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:gap-3 transition-all"
                    style={{ color }}
                >
                    Connect <ArrowRight size={16} />
                </button>
            )}
        </motion.div>
    );
}
