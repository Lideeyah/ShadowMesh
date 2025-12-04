import { ethers } from "ethers";
import { config } from "../config";

export class ChainService {
    private providers: Record<string, ethers.JsonRpcProvider> = {};
    private wallet: ethers.Wallet | null = null;

    constructor() {
        // Initialize providers from config
        this.providers = {
            "ETHEREUM": new ethers.JsonRpcProvider(config.rpc.ethereum),
            "SEPOLIA": new ethers.JsonRpcProvider(config.rpc.sepolia),
            "POLYGON": new ethers.JsonRpcProvider(config.rpc.polygon),
            "ARBITRUM": new ethers.JsonRpcProvider(config.rpc.arbitrum),
        };

        // Initialize wallet if private key is available
        if (config.privateKey) {
            this.wallet = new ethers.Wallet(config.privateKey);
        }
    }

    async getBalance(chain: string, address: string): Promise<string> {
        const provider = this.getProvider(chain);
        if (!provider) {
            throw new Error(`Unsupported chain: ${chain}`);
        }

        try {
            const balance = await provider.getBalance(address);
            return ethers.formatEther(balance);
        } catch (error) {
            console.error(`Error fetching balance for ${chain}:`, error);
            throw new Error(`Failed to fetch balance`);
        }
    }

    async executeTransaction(chain: string, to: string, amount: string): Promise<string> {
        if (!this.wallet) {
            throw new Error("Wallet not initialized. Private key missing.");
        }

        const provider = this.getProvider(chain);
        if (!provider) {
            throw new Error(`Unsupported chain: ${chain}`);
        }

        // Connect wallet to the specific chain provider
        const connectedWallet = this.wallet.connect(provider);

        try {
            const tx = await connectedWallet.sendTransaction({
                to: to,
                value: ethers.parseEther(amount)
            });

            console.log(`Transaction sent on ${chain}: ${tx.hash}`);
            return tx.hash;
        } catch (error) {
            console.error(`Transaction failed on ${chain}:`, error);
            throw new Error("Transaction execution failed");
        }
    }

    private getProvider(chain: string): ethers.JsonRpcProvider | undefined {
        return this.providers[chain.toUpperCase()];
    }

    // Helper to validate addresses
    isValidAddress(address: string): boolean {
        return ethers.isAddress(address);
    }
}
