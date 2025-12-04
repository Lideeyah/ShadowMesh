import { FastifyInstance } from 'fastify';
import { mockChainState, simulateDelay, generateTxHash } from '../services/mockChain';

export async function bridgeRoutes(fastify: FastifyInstance) {
    fastify.post('/quote', async (request, reply) => {
        // Mock quote
        return {
            fee: 0.001,
            estimatedTime: 120, // seconds
            rate: 1.0 // 1:1 peg for wrapped assets
        };
    });

    fastify.post('/prove', async (request, reply) => {
        await simulateDelay(2000); // Simulate ZK proof generation
        return {
            proof: 'mock_zk_proof_' + Math.random().toString(36).substring(7),
            status: 'verified'
        };
    });

    fastify.post('/submit', async (request: any, reply) => {
        const { amount, from, to } = request.body;
        await simulateDelay(1000); // Simulate network propagation

        const txHash = generateTxHash();
        mockChainState.transactions.push({
            hash: txHash,
            type: 'bridge',
            amount,
            from,
            to,
            timestamp: Date.now()
        });

        return {
            success: true,
            txHash,
            message: `Successfully bridged ${amount} from ${from} to ${to}`
        };
    });
}
