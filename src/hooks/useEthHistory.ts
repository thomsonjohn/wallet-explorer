import { useQuery } from "@tanstack/react-query";
import { formatEther } from "viem";
import { config } from "../config";
import { ethereumExplorerTx } from "../lib/ethereum";
import { queryKeys } from "../lib/queryKeys";
import type { TxSummary } from "../lib/types";

type BlockscoutTx = {
  hash: string;
  from: { hash: string };
  to: { hash: string } | null;
  value: string;
  timestamp: string | null;
  status: "ok" | "error" | null;
};

export function useEthHistory(address: `0x${string}` | undefined) {
  return useQuery({
    queryKey: queryKeys.ethHistory(address ?? ""),
    queryFn: async (): Promise<TxSummary[]> => {
      const url = `${config.ethereumIndexerUrl}/api/v2/addresses/${address}/transactions`;
      const res = await fetch(url);

      if (!res.ok) throw new Error(`Indexer responded with ${res.status}`);

      const data: { items: BlockscoutTx[] } = await res.json();

      return data.items.slice(0, 10).map((tx) => ({
        id: tx.hash,
        chain: "ethereum",
        timestamp: tx.timestamp ? Date.parse(tx.timestamp) : null,
        status:
          tx.status === "ok"
            ? "confirmed"
            : tx.status === "error"
              ? "failed"
              : "pending",
        explorerUrl: ethereumExplorerTx(tx.hash),
        direction:
          tx.from.hash.toLowerCase() === address!.toLowerCase() ? "out" : "in",
        amount: formatEther(BigInt(tx.value)),
      }));
    },
    enabled: !!address,
    staleTime: 60_000,
    retry: 1,
  });
}
