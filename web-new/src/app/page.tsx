"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import Bridge from "@/components/Bridge";
import AIConsole from "@/components/AIConsole";
import SystemArchitecture from "@/components/SystemArchitecture";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <main className="min-h-screen pt-24 pb-12 px-6">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "bridge" && <Bridge />}
            {activeTab === "agent" && <AIConsole />}
            {activeTab === "system" && <SystemArchitecture />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
