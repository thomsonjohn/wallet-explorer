import { useConnect, useDisconnect, usePhantom } from "@phantom/react-sdk";
import { shortenAddress } from "../lib/format";
import { useWalletAddresses } from "../hooks/useWalletAddresses";

export function ConnectPanel() {
  const { isConnected, isLoading } = usePhantom();
  const { connect, isConnecting, error } = useConnect();
  const { disconnect, isDisconnecting } = useDisconnect();
  const { solana, ethereum } = useWalletAddresses();

  if (isLoading) return <p>Checking wallet...</p>;

  if (!isConnected) {
    return (
      <section>
        <button
          onClick={() =>
            connect({ provider: "injected" }).catch((err) => console.error(err))
          }
        >
          {isConnecting ? "Approve in Phantom..." : "Connect Phantom"}
        </button>
        {error && <p role="alert">Couldn't connect: {error.message}</p>}
      </section>
    );
  }

  return (
    <section>
      <dl>
        <dt>Solana (devnet)</dt>
        <dd title={solana}>
          {solana ? shortenAddress(solana) : "Not connected"}
        </dd>
        <dt>Ethereum (Sepolia)</dt>
        <dd title={ethereum}>
          {ethereum ? shortenAddress(ethereum) : "Not connected"}
        </dd>
      </dl>
      <button onClick={() => disconnect()} disabled={isDisconnecting}>
        {isDisconnecting ? "Disconnecting..." : "Disconnect"}
      </button>
    </section>
  );
}
