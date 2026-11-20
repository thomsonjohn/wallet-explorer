import { usePhantom } from "@phantom/react-sdk";
import { ConnectPanel } from "./components/ConnectPanel";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  const { isConnected } = usePhantom();
  return (
    <main>
      <h1>Wallet Explorer</h1>
      <ConnectPanel />
      {isConnected && <Dashboard />}
    </main>
  );
}
