import {
  AddressType,
  useAccounts,
  useConnect,
  useDisconnect,
  usePhantom,
} from "@phantom/react-sdk";
import { shortenAddress } from "../lib/format";

export function ConnectPanel() {
  const { isConnected, isLoading } = usePhantom();
  const { connect, isConnecting, error } = useConnect();
  const { disconnect, isDisconnecting } = useDisconnect();
  const accounts = useAccounts();

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

  const solana = accounts?.find(
    (account) => account.addressType === AddressType.solana,
  );
  const ethereum = accounts?.find(
    (account) => account.addressType === AddressType.ethereum,
  );

  return (
    <section>
      <dl>
        <dt>Solana (devnet)</dt>
        <dd title={solana?.address}>
          {solana ? shortenAddress(solana.address) : "Not connected"}
        </dd>
        <dt>Ethereum (Sepolia)</dt>
        <dd title={ethereum?.address}>
          {ethereum ? shortenAddress(ethereum.address) : "Not connected"}
        </dd>
      </dl>
      <button onClick={() => disconnect()} disabled={isDisconnecting}>
        {isDisconnecting ? "Disconnecting..." : "Disconnect"}
      </button>
    </section>
  );
}
