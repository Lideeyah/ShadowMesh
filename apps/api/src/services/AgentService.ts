export interface AgentAction {
    id: string;
    type: "TRANSFER" | "BRIDGE" | "SWAP" | "DONATE";
    chain: "ZCASH" | "MINA" | "STARKNET" | "NEAR" | "AXELAR";
    amount?: string;
    token?: string;
    recipient?: string;
    privacyMode: "SHIELDED" | "TRANSPARENT";
    status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    details: string;
}

export class AgentService {
    async parseInstruction(instruction: string): Promise<AgentAction[]> {
        // In a real implementation, this would call an LLM (OpenAI/Gemini)
        // For MVP, we use regex-based intent detection

        const actions: AgentAction[] = [];
        const lower = instruction.toLowerCase();

        // Regex for parsing "bridge [amount] [token] to [chain]"
        const bridgeRegex = /(?:bridge|send|transfer)\s+([\d,]+(?:\.\d+)?)\s+(\w+)\s+(?:to|on)\s+(?:my\s+|the\s+)?(\w+)/i;
        const match = instruction.match(bridgeRegex);

        if (match) {
            const amount = match[1].replace(/,/g, "");
            const token = match[2].toUpperCase();
            const targetChain = match[3].toUpperCase();

            // Map common names to standard chain IDs
            let chainId: "STARKNET" | "ZCASH" | "MINA" | "AXELAR" = "AXELAR"; // Default
            if (targetChain.includes("STARK")) chainId = "STARKNET";
            if (targetChain.includes("ZEC") || targetChain.includes("CASH")) chainId = "ZCASH";
            if (targetChain.includes("MINA")) chainId = "MINA";

            actions.push({
                id: Date.now().toString(),
                type: "BRIDGE",
                chain: chainId,
                amount: amount,
                token: token,
                privacyMode: "SHIELDED",
                status: "PENDING",
                details: `Bridging ${amount} ${token} to ${targetChain}`,
            });
        }

        if (actions.length === 0) {
            // Default fallback for unparseable commands
            actions.push({
                id: Date.now().toString(),
                type: "TRANSFER",
                chain: "ZCASH",
                privacyMode: "SHIELDED",
                status: "PENDING",
                details: "Unknown intent, defaulting to private transfer check",
            });
        }

        return actions;
    }
}
