import type { UseQueryResult } from "@tanstack/react-query";

type Props = {
  label: string;
  symbol: string;
  query: UseQueryResult<number | string>;
};

export function BalanceCard({ label, symbol, query }: Props) {
  const { data, isPending, isError, error, isFetching, refetch } = query;
  return (
    <article>
      <h2>{label}</h2>
      {isPending ? (
        <p>Loading...</p>
      ) : isError ? (
        <p role="alert">
          Couldn't load balance: {error?.message}{" "}
          <button onClick={() => refetch()}>Retry</button>
        </p>
      ) : (
        <p>
          <strong>
            {Number(data).toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })}
          </strong>{" "}
          {symbol}
          {isFetching && <small> updating...</small>}
        </p>
      )}
    </article>
  );
}
