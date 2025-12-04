import { IResolvers } from "mercurius";
import { AgentService } from "./services/AgentService";
import { ChainService } from "./services/ChainService";

const agentService = new AgentService();
const chainService = new ChainService();

export const resolvers: IResolvers = {
    Query: {
        health: () => "OK",
        balance: async (_, { chain, address }) => {
            return await chainService.getBalance(chain, address);
        }
    },
    Mutation: {
        executeCommand: async (_, { instruction }) => {
            console.log(`Received instruction: ${instruction}`);

            const actions = await agentService.parseInstruction(instruction);

            // Execute actions on-chain if they are ready
            for (const action of actions) {
                if (action.type === "BRIDGE" && action.status === "PENDING") {
                    try {
                        console.log(`Executing real transaction for action: ${action.details}`);
                        // For demo, we use a dummy recipient if not specified
                        // In production, this would parse the "to" address
                        const recipient = "0x000000000000000000000000000000000000dEaD";

                        // Execute on the source chain (simplified logic)
                        // In a real bridge, this would be a contract call
                        // Here we just send a transfer to simulate the bridge deposit
                        const txHash = await chainService.executeTransaction(
                            "ETHEREUM", // Defaulting to Eth for demo
                            recipient,
                            action.amount || "0"
                        );

                        action.status = "COMPLETED";
                        action.details += ` (Tx: ${txHash})`;
                    } catch (error) {
                        console.error("Transaction failed:", error);
                        action.status = "FAILED";
                        action.details += " (Execution Failed - Check Logs)";
                    }
                }
            }

            return {
                success: true,
                message: "Instruction parsed and executed.",
                actions,
            };
        },
    },
};
