import { useSolBalance } from "../hooks/useSolBalance";
import { useWalletAddresses } from "../hooks/useWalletAddresses";
import { BalanceCard } from "./BalanceCard";
import { useEthBalance } from "../hooks/useEthBalance";
import { TxHistory } from "./TxHistory";
import { useSolHistory } from "../hooks/useSolHistory";
import { useEthHistory } from "../hooks/useEthHistory";

export function Dashboard() {
  const { solana, ethereum } = useWalletAddresses();
  const solBalance = useSolBalance(solana);
  const solHistory = useSolHistory(solana);
  const ethBalance = useEthBalance(ethereum);
  const ethHistory = useEthHistory(ethereum);

  return (
    <div className="dashboard">
      <BalanceCard label="Solana devnet" symbol="SOL" query={solBalance} />
      <BalanceCard label="Ethereum Sepolia" symbol="ETH" query={ethBalance} />
      <TxHistory title="Recent Solana Transactions" query={solHistory} />
      <TxHistory title="Recent Ethereum Transactions" query={ethHistory} />
    </div>
  );
}
