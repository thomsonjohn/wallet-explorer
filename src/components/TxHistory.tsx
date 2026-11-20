import type { UseQueryResult } from "@tanstack/react-query";
import type { TxSummary } from "../lib/types";
import { shortenAddress } from "../lib/format";

type Props = {
  title: string;
  query: UseQueryResult<TxSummary[]>;
};

export function TxHistory({ title, query }: Props) {
  const { data, isPending, isError, error, refetch } = query;

  return (
    <section>
      <h2>{title}</h2>
      {isPending && <p>Loading...</p>}
      {isError && (
        <p role="alert">
          History unavailable: {error?.message}{" "}
          <button onClick={() => refetch()}>Retry</button>
        </p>
      )}
      {data?.length === 0 && <p>No transactions found.</p>}
      <ul>
        {data?.map((tx) => (
          <li key={tx.id}>
            <a href={tx.explorerUrl} target="_blank" rel="noreferrer">
              {shortenAddress(tx.id, 6)}
            </a>{" "}
            <span data-status={tx.status}>{tx.status}</span>
            {tx.amount &&
              ` · ${tx.direction === "out" ? "−" : "+"}${tx.amount}`}
            {tx.timestamp && ` · ${new Date(tx.timestamp).toLocaleString()}`}
          </li>
        ))}
      </ul>
    </section>
  );
}
