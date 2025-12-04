import Fastify from 'fastify';
import cors from '@fastify/cors';
import { bridgeRoutes } from './routes/bridge';
import { agentRoutes } from './routes/agent';

const fastify = Fastify({
    logger: true
});

// Register CORS
fastify.register(cors, {
    origin: true // Allow all origins for demo purposes
});

// Register Routes
fastify.register(bridgeRoutes, { prefix: '/bridge' });
fastify.register(agentRoutes, { prefix: '/agent' });

// Health Check
fastify.get('/', async () => {
    return { status: 'ok', service: 'ShadowMesh API' };
});

const start = async () => {
    try {
        await fastify.listen({ port: 4000, host: '0.0.0.0' });
        console.log('Server running at http://localhost:4000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
