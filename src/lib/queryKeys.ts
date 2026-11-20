export const queryKeys = {
  solBalance: (address: string) => ["solana", "balance", address] as const,
  solHistory: (address: string) => ["solana", "history", address] as const,
  ethBalance: (address: string) => ["ethereum", "balance", address] as const,
  ethHistory: (address: string) => ["ethereum", "history", address] as const,
};
