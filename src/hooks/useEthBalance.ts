import { useQuery } from "@tanstack/react-query";
import { formatEther } from "viem";
import { ethereumClient } from "../lib/ethereum";
import { queryKeys } from "../lib/queryKeys";

export function useEthBalance(address: `0x${string}` | undefined) {
  return useQuery({
    queryKey: queryKeys.ethBalance(address ?? ""),
    queryFn: async () => {
      const wei = await ethereumClient.getBalance({ address: address! });
      return formatEther(wei);
    },
    enabled: !!address,
    refetchInterval: 30_000,
  });
}
