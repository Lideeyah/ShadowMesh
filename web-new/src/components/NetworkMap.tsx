"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const nodes = [
    { id: 1, x: 20, y: 30, type: "agent", status: "active" },
    { id: 2, x: 50, y: 20, type: "relay", status: "active" },
    { id: 3, x: 80, y: 40, type: "agent", status: "idle" },
    { id: 4, x: 30, y: 70, type: "relay", status: "active" },
    { id: 5, x: 70, y: 80, type: "agent", status: "processing" },
    { id: 6, x: 50, y: 50, type: "core", status: "active" },
];

const connections = [
    { from: 1, to: 2 },
    { from: 2, to: 6 },
    { from: 3, to: 2 },
    { from: 4, to: 6 },
    { from: 5, to: 4 },
    { from: 1, to: 4 },
    { from: 3, to: 5 },
];

export default function NetworkMap() {
    const [activeNode, setActiveNode] = useState<number | null>(null);

    // Simulate network activity
    useEffect(() => {
        const interval = setInterval(() => {
            const randomNode = Math.floor(Math.random() * nodes.length) + 1;
            setActiveNode(randomNode);
            setTimeout(() => setActiveNode(null), 1000);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full min-h-[300px] bg-black/20 rounded-2xl overflow-hidden border border-white/5">
            <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-teal animate-pulse" />
                    <span className="text-xs font-mono text-neon-teal">LIVE MESH VIEW</span>
                </div>
            </div>

            <svg className="absolute inset-0 w-full h-full">
                {/* Connections */}
                {connections.map((conn, i) => {
                    const start = nodes.find(n => n.id === conn.from)!;
                    const end = nodes.find(n => n.id === conn.to)!;
                    return (
                        <motion.line
                            key={i}
                            x1={`${start.x}%`}
                            y1={`${start.y}%`}
                            x2={`${end.x}%`}
                            y2={`${end.y}%`}
                            stroke="rgba(77, 163, 255, 0.2)"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                        />
                    );
                })}

                {/* Active Data Packets */}
                {activeNode && connections.filter(c => c.from === activeNode || c.to === activeNode).map((conn, i) => {
                    const start = nodes.find(n => n.id === conn.from)!;
                    const end = nodes.find(n => n.id === conn.to)!;
                    return (
                        <circle key={`packet-${i}`} r="2" fill="#4EF3C5">
                            <animateMotion
                                dur="1s"
                                repeatCount="1"
                                path={`M${start.x * 4} ${start.y * 3} L${end.x * 4} ${end.y * 3}`} // Simplified path logic for SVG, might need adjustment based on container size
                            />
                            {/* Better approach for responsive SVG lines: use percentage coordinates directly if possible or viewbox */}
                        </circle>
                    );
                })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    className={`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full border border-white/20 ${node.type === "core" ? "bg-electric-blue w-4 h-4" :
                            node.status === "processing" ? "bg-privacy-purple" : "bg-shadow-dark"
                        } ${activeNode === node.id ? "ring-4 ring-neon-teal/20 scale-125 transition-all" : ""}`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + node.id * 0.1 }}
                >
                    {node.type === "core" && (
                        <div className="absolute inset-0 bg-electric-blue rounded-full animate-ping opacity-20" />
                    )}
                </motion.div>
            ))}
        </div>
    );
}
