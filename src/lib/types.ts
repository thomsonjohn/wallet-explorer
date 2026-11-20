export type TxStatus = "pending" | "confirmed" | "failed";

export type TxSummary = {
  id: string;
  chain: "solana" | "ethereum";
  timestamp: number | null;
  status: TxStatus;
  explorerUrl: string;
  direction?: "in" | "out";
  amount?: string;
};
