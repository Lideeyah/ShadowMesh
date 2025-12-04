import Navbar from "@/components/Navbar";
import AIConsole from "@/components/AIConsole";
import WalletPanel from "@/components/WalletPanel";
import ActivityLog from "@/components/ActivityLog";
import NetworkMap from "@/components/NetworkMap";

export default function ConsolePage() {
    return (
        <main className="min-h-screen bg-shadow-dark pt-24 px-6 pb-6">
            <Navbar />

            <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Console Area */}
                <div className="lg:col-span-8 h-full flex flex-col gap-6">
                    <div className="flex-1 min-h-0">
                        <AIConsole />
                    </div>
                    <div className="h-1/3 min-h-0 hidden lg:block">
                        <NetworkMap />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 h-full flex flex-col gap-6">
                    <div className="flex-1 min-h-0">
                        <WalletPanel />
                    </div>
                    <div className="h-1/3 min-h-0 lg:hidden">
                        <ActivityLog />
                    </div>
                </div>
            </div>
        </main>
    );
}
