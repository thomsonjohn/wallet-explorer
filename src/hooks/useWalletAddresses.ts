import { AddressType, useAccounts } from "@phantom/react-sdk";

export function useWalletAddresses() {
  const accounts = useAccounts();
  const find = (type: AddressType) =>
    accounts?.find(
      (account: { addressType: AddressType; address: string }) =>
        account.addressType === type,
    )?.address;

  return {
    solana: find(AddressType.solana),
    ethereum: find(AddressType.ethereum) as `0x${string}` | undefined,
  };
}
