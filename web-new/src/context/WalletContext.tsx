"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Asset = {
    symbol: string;
    name: string;
    balance: number;
    value: number;
    type: "Shielded" | "Transparent" | "ZK-App";
    chain: string;
};

export type ConnectedWallet = {
    address: string;
    chain: string;
    type: string;
    icon?: string;
};

type WalletContextType = {
    assets: Asset[];
    bridgeFunds: (amount: number, fromChain: string, toChain: string, symbol: string) => void;
    isConnected: boolean;
    wallets: ConnectedWallet[];
    connectWallet: (chain?: string, type?: string) => void;
    disconnectWallet: (address: string) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const initialAssets: Asset[] = [
    { symbol: "ZEC", name: "Zcash", balance: 145.20, value: 30, type: "Shielded", chain: "Zcash" },
    { symbol: "MINA", name: "Mina", balance: 2500.00, value: 0.75, type: "ZK-App", chain: "Mina" },
    { symbol: "ETH", name: "Ethereum", balance: 1.45, value: 2500, type: "Transparent", chain: "Starknet" },
    { symbol: "USDC", name: "USD Coin", balance: 5000.00, value: 1, type: "Shielded", chain: "Noble" },
];

export function WalletProvider({ children }: { children: ReactNode }) {
    const [assets, setAssets] = useState<Asset[]>(initialAssets);
    const [wallets, setWallets] = useState<ConnectedWallet[]>([]);

    const isConnected = wallets.length > 0;

    const connectWallet = (chain: string = "Ethereum", type: string = "MetaMask") => {
        // Mock address generation based on chain
        let address = "";
        let icon = "";

        switch (chain) {
            case "Ethereum":
                address = "0x71C...9A2";
                icon = "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg";
                break;
            case "Starknet":
                address = "0xSTR...KNT";
                icon = "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"; // Placeholder or Starknet specific
                break;
            case "Zcash":
                address = "zs1...8x9";
                icon = "https://www.zecwallet.co/assets/images/zecwallet-logo.png";
                type = "ZecWallet";
                break;
            case "Mina":
                address = "B62...q1z";
                icon = "https://www.aurowallet.com/assets/img/logo.png";
                type = "Auro Wallet";
                break;
            case "Solana":
                address = "HN7...9k2";
                icon = "https://upload.wikimedia.org/wikipedia/en/ab/Phantom_wallet_logo.png";
                type = "Phantom";
                break;
            case "Bitcoin":
                address = "bc1...q2p";
                icon = "https://pbs.twimg.com/profile_images/1696567536682659840/e36q5lMa_400x400.jpg";
                type = "Leather";
                break;
            case "Sui":
                address = "0x3a...1f9";
                icon = "https://pbs.twimg.com/profile_images/1747653896432926720/f9o9k9j9_400x400.jpg";
                type = "Slush";
                break;
            default:
                address = "0x" + Math.random().toString(16).slice(2, 10);
                icon = "/icons/default.png";
        }

        // Prevent duplicates
        if (!wallets.find(w => w.chain === chain)) {
            setWallets(prev => [...prev, { address, chain, type, icon }]);
        }
    };

    const disconnectWallet = (address: string) => {
        setWallets(prev => prev.filter(w => w.address !== address));
    };

    const bridgeFunds = (amount: number, fromChain: string, toChain: string, symbol: string) => {
        setAssets((prev) => {
            const newAssets = prev.map((asset) => {
                // Deduct from source
                if (asset.chain.toLowerCase() === fromChain.toLowerCase() && asset.symbol === symbol) {
                    return { ...asset, balance: asset.balance - amount };
                }
                // Add to destination if it exists
                if (asset.chain.toLowerCase() === toChain.toLowerCase() && asset.symbol === symbol) {
                    return { ...asset, balance: asset.balance + amount };
                }
                return asset;
            });

            // Check if destination asset exists
            const destExists = newAssets.some(
                (a) => a.chain.toLowerCase() === toChain.toLowerCase() && a.symbol === symbol
            );

            if (!destExists) {
                // Find source asset to copy metadata
                const sourceAsset = prev.find(
                    (a) => a.chain.toLowerCase() === fromChain.toLowerCase() && a.symbol === symbol
                );

                if (sourceAsset) {
                    newAssets.push({
                        ...sourceAsset,
                        chain: toChain, // Use the target chain name
                        balance: amount,
                        type: "Shielded", // Default to shielded for bridged assets
                    });
                }
            }

            return newAssets;
        });
    };

    return (
        <WalletContext.Provider value={{ assets, bridgeFunds, isConnected, wallets, connectWallet, disconnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
