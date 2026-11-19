export const config = {
  solanaRpcUrl:
    import.meta.env.VITE_SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
  ethereumRpcUrl:
    import.meta.env.VITE_ETHEREUM_RPC_URL ??
    "https://ethereum-sepolia-rpc.publicnode.com",
} as const;
