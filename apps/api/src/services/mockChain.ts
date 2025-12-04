export const mockChainState = {
    balances: {
        zcash: 1240.50,
        mina: 500.00,
        starknet: 12.5,
        near: 150.0
    },
    transactions: [] as any[]
};

export const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateTxHash = () => '0x' + Math.random().toString(16).substr(2, 40);
