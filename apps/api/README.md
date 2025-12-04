# ShadowMesh API

The backend service for ShadowMesh, handling agent logic and blockchain interactions via `ethers.js`.

## Prerequisites
- Node.js v18+
- An Ethereum Private Key (for executing transactions)

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Environment**:
    Copy `.env.example` (if available) or create `.env`:
    ```env
    PRIVATE_KEY=your_private_key_here
    RPC_URL_ETHEREUM=https://rpc.ankr.com/eth
    # ... add other RPCs as needed
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

## Architecture
- **`AgentService`**: Parses natural language commands into structured actions.
- **`ChainService`**: Manages wallet connections and executes on-chain transactions using `ethers.js`.
