import { WebBundlr } from '@bundlr-network/client';
import { Web3Provider } from '@ethersproject/providers';
import { getWalletClient } from 'wagmi/actions';
import Irys from '@irys/sdk';

import { never } from './utils';

const TOP_UP = '200000000000000000'; // 0.2 MATIC
const MIN_FUNDS = 0.05;

export async function getBundlr() {
  const walletClient = (await getWalletClient()) ?? never('Wallet client not found');

  const bundlr = new WebBundlr('https://devnet.bundlr.network', 'matic', {
    providerUrl: 'https://rpc-mumbai.maticvigil.com/',
  });

  await bundlr.ready();

  const balance = await bundlr.getBalance(walletClient.account.address);

  if (bundlr.utils.unitConverter(balance).toNumber() < MIN_FUNDS) {
    await bundlr.fund(TOP_UP);
  }

  return bundlr;
}

export async function getIrys() {
  const url = 'https://devnet.irys.xyz';
  const providerUrl = 'https://rpc-mumbai.maticvigil.com';
  const token = 'matic';

  const irys = new Irys({
    url, // URL of the node you want to connect to
    token, // Token used for payment
    key: process.env.PRIVATE_KEY, // Private key
    config: { providerUrl }, // Optional provider URL, only required when using Devnet
  });
  return irys;
}
