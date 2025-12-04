"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Activity {
    id: number;
    action: string;
    status: "completed" | "processing" | "failed";
    time: string;
    hash: string;
}

const defaultActivities: Activity[] = [
    {
        id: 1,
        action: "Bridge USDC to Starknet",
        status: "completed",
        time: "2 mins ago",
        hash: "0x7f...3a2b",
    },
    {
        id: 2,
        action: "Private ZEC Transfer",
        status: "processing",
        time: "5 mins ago",
        hash: "zk-snark-proof-...",
    },
];

export default function ActivityLog() {
    const [activities, setActivities] = useState<Activity[]>(defaultActivities);

    useEffect(() => {
        const saved = localStorage.getItem("shadow_activity_log");
        if (saved) {
            setActivities(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("shadow_activity_log", JSON.stringify(activities));
    }, [activities]);

    return (
        <div className="glass-panel rounded-2xl p-6 h-full">
            <h3 className="font-heading font-bold text-lg mb-6">Recent Activity</h3>

            <div className="space-y-6">
                {activities.map((item) => (
                    <div key={item.id} className="relative pl-6 border-l border-white/10 last:border-0 pb-6 last:pb-0">
                        <div className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-shadow-dark ${item.status === "completed" ? "bg-neon-teal" : item.status === "processing" ? "bg-electric-blue animate-pulse" : "bg-red-500"
                            }`} />

                        <div className="flex items-start justify-between">
                            <div>
                                <div className="font-medium text-sm text-gray-200">{item.action}</div>
                                <div className="text-xs font-mono text-gray-500 mt-1 truncate max-w-[120px]">{item.hash}</div>
                            </div>
                            <div className="text-right">
                                <div className={`text-xs font-bold capitalize ${item.status === "completed" ? "text-neon-teal" : item.status === "processing" ? "text-electric-blue" : "text-red-500"
                                    }`}>
                                    {item.status}
                                </div>
                                <div className="text-[10px] text-gray-600 mt-1">{item.time}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
