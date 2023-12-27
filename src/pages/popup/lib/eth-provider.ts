import { BrowserProvider, isError, toQuantity } from 'ethers';
import { ALCHEMY_MATIC_API_KEY } from './config';
import type { JsonRpcSigner, TypedDataDomain, TypedDataField } from 'ethers';
import ethProvider from 'eth-provider';
import createMetaMaskProvider from 'metamask-extension-provider';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import WalletConnection from './WalletConnection';

const rpcMap = new Map<number, string>([
  [80001, 'https://rpc-mumbai.maticvigil.com'],
  [137, 'https://rpc-mainnet.maticvigil.com'],
]);

export const getRpcUrl = (): string | undefined => rpcMap.get(chainId);

const chainId = Number.parseInt('80001', 10);

let cachedProvider: BrowserProvider | undefined;

const createWalletConnectProvider = async () => {
  const provider = await EthereumProvider.init({
    projectId: '',
    chains: [chainId],
    showQrModal: true,
    methods: [
      'eth_accounts',
      'eth_chainId',
      'eth_requestAccounts',
      'eth_sign',
      'eth_signTransaction',
      'eth_signTypedData',
      'eth_signTypedData_v3',
      'eth_signTypedData_v4',
      'personal_sign',
      'wallet_addEthereumChain',
      'wallet_switchEthereumChain',
      'wallet_scanQRCode',
    ],
    events: ['chainChanged', 'accountsChanged'],
    rpcMap: {
      80001: 'https://polygon-mumbai.g.alchemy.com/v2/' + ALCHEMY_MATIC_API_KEY,
    },
  });
  console.log('provider', provider);
  await provider.connect();
  return new BrowserProvider(provider, 'any');
};

const createInjectedProvider = async (): Promise<BrowserProvider> => {
  const provider = ethProvider(['injected']);
  console.log('createInjectedProvider: found provider', provider);
  return new BrowserProvider(provider, 'any');
};

const createFrameProvider = async (): Promise<BrowserProvider> => {
  const provider = ethProvider(['frame']);
  console.log('createFrameProvider: found provider', provider);
  return new BrowserProvider(provider, 'any');
};

const createSignerProvider = async (): Promise<BrowserProvider> => {
  const walletConnection = 'metamask';
  if (!walletConnection) {
    throw new Error('No wallet connection');
  }

  switch (walletConnection) {
    case WalletConnection.METAMASK:
      return new BrowserProvider(createMetaMaskProvider(), 'any');
    // case WalletConnection.WALLET_CONNECT:
    //   return createWalletConnectProvider();
    // case WalletConnection.INJECTED:
    //   return createInjectedProvider();
    // case WalletConnection.FRAME:
    //   return createFrameProvider();
  }
};

export const getProvider = async (): Promise<BrowserProvider> => {
  console.log('getProvider: cachedProvider', cachedProvider);
  if (!cachedProvider) {
    cachedProvider = await createSignerProvider();
  }
  return cachedProvider;
};

export const getSigner = async (): Promise<JsonRpcSigner> => {
  const provider = await getProvider();
  return provider.getSigner();
};
