import dotenv from "dotenv";
dotenv.config();

export const config = {
    privateKey: process.env.PRIVATE_KEY,
    rpc: {
        ethereum: process.env.RPC_URL_ETHEREUM || "https://rpc.ankr.com/eth",
        sepolia: process.env.RPC_URL_SEPOLIA || "https://rpc.ankr.com/eth_sepolia",
        polygon: process.env.RPC_URL_POLYGON || "https://polygon-rpc.com",
        arbitrum: process.env.RPC_URL_ARBITRUM || "https://arb1.arbitrum.io/rpc",
    }
};
