import { useQuery } from "@tanstack/react-query";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { solanaConnection } from "../lib/solana";
import { queryKeys } from "../lib/queryKeys";

export function useSolBalance(address: string | undefined) {
  return useQuery({
    queryKey: queryKeys.solBalance(address ?? ""),
    queryFn: async () => {
      const lamports = await solanaConnection.getBalance(
        new PublicKey(address!),
      );
      return Number(lamports) / LAMPORTS_PER_SOL;
    },
    enabled: !!address,
    refetchInterval: 30_000,
  });
}
