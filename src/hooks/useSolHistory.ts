import { useQuery } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { solanaConnection, solanaExplorerTx } from "../lib/solana";
import { queryKeys } from "../lib/queryKeys";
import type { TxSummary } from "../lib/types";
import { formatUnits } from "viem";

export function useSolHistory(address: string | undefined) {
  return useQuery({
    queryKey: queryKeys.solHistory(address ?? ""),
    queryFn: async (): Promise<TxSummary[]> => {
      const sigs = await solanaConnection.getSignaturesForAddress(
        new PublicKey(address!),
        { limit: 10 },
      );

      const txs = await solanaConnection.getParsedTransactions(
        sigs.map((s) => s.signature),
        { maxSupportedTransactionVersion: 0 },
      );

      return sigs.map((s, i): TxSummary => {
        const tx = txs[i];
        let amount: string | undefined;
        let direction: "in" | "out" | undefined;

        if (tx?.meta) {
          const index = tx.transaction.message.accountKeys.findIndex(
            (k) => k.pubkey.toBase58() === address,
          );
          if (index !== -1) {
            const delta =
              BigInt(tx.meta.postBalances[index]) -
              BigInt(tx.meta.preBalances[index]);
            direction = delta < 0n ? "out" : "in";
            const abs = delta < 0n ? -delta : delta; // Math.abs doesn't take bigint
            amount = formatUnits(abs, 9); // lamports -> SOL, exactly
          }
        }

        return {
          id: s.signature,
          chain: "solana",
          timestamp: s.blockTime != null ? Number(s.blockTime) * 1000 : null,
          status: s.err ? "failed" : "confirmed",
          explorerUrl: solanaExplorerTx(s.signature),
          direction,
          amount,
        };
      });
    },
    enabled: !!address,
    staleTime: 60_000,
  });
}
