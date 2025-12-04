"use client";

import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";

export default function WalletPanel() {
    const [hideBalances, setHideBalances] = useState(false);
    const { assets } = useWallet();

    return (
        <div className="glass-panel rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-lg">Portfolio</h3>
                <button
                    onClick={() => setHideBalances(!hideBalances)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                    {hideBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto scrollbar-hide">
                {assets.map((asset, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-[10px] font-bold">
                                    {asset.symbol}
                                </div>
                                <div>
                                    <div className="font-bold text-sm">{asset.name}</div>
                                    <div className="text-xs text-gray-500">{asset.chain}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono font-bold text-sm">
                                    {hideBalances ? "****" : asset.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {hideBalances ? "****" : `$${(asset.balance * asset.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${asset.type === "Shielded"
                                ? "bg-neon-teal/10 border-neon-teal/20 text-neon-teal"
                                : asset.type === "ZK-App"
                                    ? "bg-privacy-purple/10 border-privacy-purple/20 text-privacy-purple"
                                    : "bg-gray-500/10 border-gray-500/20 text-gray-400"
                                }`}>
                                {asset.type}
                            </span>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white" title="Send">
                                    <ArrowUpRight className="w-3 h-3" />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white" title="Receive">
                                    <ArrowDownLeft className="w-3 h-3" />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white" title="Swap">
                                    <RefreshCw className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium text-gray-300">
                Add New Chain
            </button>
        </div>
    );
}
