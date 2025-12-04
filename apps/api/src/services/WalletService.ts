import { ChainService } from "./ChainService";

export class WalletService {
    private chainService: ChainService;

    constructor() {
        this.chainService = new ChainService();
    }

    async getPortfolio(userId: string) {
        // In a real app, we'd look up the user's addresses
        const chains = ["ZCASH", "MINA", "STARKNET"];

        const portfolio = await Promise.all(chains.map(async (chain) => ({
            chain,
            balance: await this.chainService.getBalance(chain, "mock_address"),
        })));

        return portfolio;
    }
}
