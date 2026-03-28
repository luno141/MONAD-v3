import { BrowserProvider, ethers } from "ethers";

export type WalletState = {
  address: string | null;
  chainId: number | null;
  chainName: string;
  correctNetwork: boolean;
};

type EthereumProvider = ethers.Eip1193Provider & {
  on?: (eventName: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (
    eventName: string,
    listener: (...args: unknown[]) => void,
  ) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export const expectedChainId = Number.parseInt(
  process.env.NEXT_PUBLIC_MONAD_CHAIN_ID ?? "10143",
  10,
);

export const expectedChainName =
  process.env.NEXT_PUBLIC_MONAD_CHAIN_NAME ?? "Monad Testnet";

export function hasInjectedWallet() {
  return typeof window !== "undefined" && Boolean(window.ethereum);
}

export async function connectWallet(): Promise<WalletState> {
  if (!window.ethereum) {
    throw new Error("MetaMask-compatible wallet not detected.");
  }

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  return readWalletState();
}

export async function readWalletState(): Promise<WalletState> {
  if (!window.ethereum) {
    return {
      address: null,
      chainId: null,
      chainName: expectedChainName,
      correctNetwork: false,
    };
  }

  const provider = new BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();
  const accounts = (await provider.send("eth_accounts", [])) as string[];

  return {
    address: accounts[0] ?? null,
    chainId: Number(network.chainId),
    chainName: expectedChainName,
    correctNetwork: Number(network.chainId) === expectedChainId,
  };
}

export async function switchToExpectedChain() {
  if (!window.ethereum) {
    throw new Error("MetaMask-compatible wallet not detected.");
  }

  await window.ethereum.request?.({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: `0x${expectedChainId.toString(16)}` }],
  });
}

export function shortenAddress(address: string | null) {
  if (!address) {
    return "Not connected";
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
