import { WebBundlr } from '@bundlr-network/client';
import { Web3Provider } from '@ethersproject/providers';

import { WebIrys } from '@irys/sdk';
import { providers } from 'ethers';
import { getWalletClient } from 'wagmi/actions';

import { never } from './utils';

const TOP_UP = '200000000000000000'; // 0.2 MATIC
const MIN_FUNDS = 0.05;

export async function getBundlr() {
  const walletClient = (await getWalletClient()) ?? never('Wallet client not found');

  const bundlr = new WebBundlr('https://devnet.bundlr.network', 'matic', new Web3Provider(walletClient.transport), {
    providerUrl: 'https://polygon-mumbai.g.alchemy.com/v2/Qsvi2mE7TTt44pEwkojqyqdRb1s0xAQV',
  });

  await bundlr.ready();

  const balance = await bundlr.getBalance(walletClient.account.address);
  console.log('balance', balance, walletClient.account.address);

  return bundlr;
}

export const getIrys = async () => {
  const provider = new providers.Web3Provider(window.ethereum);
  console.log('provider', provider);
  const wallet = { name: 'ethersv5', provider: provider };
  const url = 'https://node1.irys.xyz';
  const token = 'matic';
  const webIrys = new WebIrys({ url, token, wallet });
  await webIrys.ready();
  return webIrys;
};
