import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { config } from "../config";

export const ethereumClient = createPublicClient({
  chain: sepolia,
  transport: http(config.ethereumRpcUrl),
});

export const ethereumExplorerTx = (hash: string) =>
  `https://sepolia.etherscan.io/tx/${hash}`;
