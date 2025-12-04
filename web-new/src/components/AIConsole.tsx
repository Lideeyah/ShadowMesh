"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, Sparkles, ShieldCheck, Loader2 } from "lucide-react";
import { useWallet } from "@/context/WalletContext";

interface Message {
    id: string;
    role: "user" | "agent";
    content: string;
    status?: "thinking" | "executing" | "done" | "error";
    steps?: string[];
    txHash?: string;
}

export default function AIConsole() {
    const { bridgeFunds } = useWallet();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "agent",
            content: "ShadowMesh Agent initialized. Secure enclave active. How can I help you today?",
            status: "done",
        },
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsProcessing(true);

        // Call Backend API
        try {
            const response = await fetch('http://localhost:4000/agent/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command: input })
            });
            const data = await response.json();

            const agentMsgId = (Date.now() + 1).toString();
            setMessages((prev) => [
                ...prev,
                {
                    id: agentMsgId,
                    role: "agent",
                    content: data.message,
                    status: "done",
                    steps: data.steps,
                    txHash: data.txHash,
                },
            ]);
        } catch (error) {
            console.error("Agent API Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "agent",
                    content: "Error connecting to agent service. Please try again.",
                    status: "error",
                },
            ]);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col h-full glass-panel rounded-2xl overflow-hidden border border-white/10">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-electric-blue" />
                    <span className="font-heading font-bold text-sm tracking-wide">AGENT CONSOLE</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-neon-teal">
                    <ShieldCheck className="w-3 h-3" />
                    SECURE ENCLAVE
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                        <div
                            className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                ? "bg-electric-blue/20 text-white border border-electric-blue/20 rounded-tr-sm"
                                : "bg-white/5 text-gray-300 border border-white/10 rounded-tl-sm"
                                }`}
                        >
                            {msg.role === "agent" && (
                                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-privacy-purple uppercase tracking-wider">
                                    <Sparkles className="w-3 h-3" />
                                    Shadow Agent
                                </div>
                            )}
                            {msg.content}

                            {/* Steps Visualization */}
                            {msg.steps && msg.steps.length > 0 && (
                                <div className="mt-4 space-y-2 border-t border-white/5 pt-3">
                                    {msg.steps.map((step, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs font-mono text-gray-500">
                                            <div className={`w-1.5 h-1.5 rounded-full ${step.includes("[OK]") || step.includes("[VERIFIED]") || step.includes("[SENT]") || step.includes("[SUCCESS]") ? "bg-neon-teal" : "bg-gray-600 animate-pulse"}`} />
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Success Card */}
                            {msg.status === "done" && msg.role === "agent" && (
                                <div className="mt-4 p-4 rounded-xl bg-neon-teal/10 border border-neon-teal/20 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-neon-teal/20 flex items-center justify-center text-neon-teal">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">Transaction Complete</div>
                                        <div className="text-xs text-gray-400 font-mono">
                                            Hash: {msg.txHash || "0x7f...3a9c"} • Network: Starknet
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
                {isProcessing && messages[messages.length - 1].role === "user" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-gray-500 text-xs ml-4">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Processing secure request...
                    </motion.div>
                )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a command (e.g., 'Bridge 100 USDC to Starknet privately')..."
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-5 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-electric-blue/50 transition-colors font-mono"
                        disabled={isProcessing}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isProcessing}
                        className="absolute right-2 p-2 rounded-lg bg-electric-blue/10 text-electric-blue hover:bg-electric-blue hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-electric-blue transition-all"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </form>
        </div>
    );
}
