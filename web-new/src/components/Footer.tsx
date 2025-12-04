import Link from "next/link";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-shadow-darker py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8">
                        <Image
                            src="/logo.png"
                            alt="ShadowMesh Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-heading font-bold text-xl">ShadowMesh</span>
                </div>

                <div className="flex items-center gap-8 text-sm text-gray-400">
                    <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
                    <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                        <Twitter className="w-5 h-5" />
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 text-center text-xs text-gray-600 font-mono">
                © 2025 ShadowMesh Network. All rights reserved.
            </div>
        </footer>
    );
}
