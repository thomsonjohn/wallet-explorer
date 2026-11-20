import { Connection } from "@solana/web3.js";
import { config } from "../config";

export const solanaConnection = new Connection(
  config.solanaRpcUrl,
  "confirmed",
);

export const solanaExplorerTx = (signature: string) =>
  `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
