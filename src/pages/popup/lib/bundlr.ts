import { WebBundlr } from '@bundlr-network/client';
import { Web3Provider } from '@ethersproject/providers';

import { WebIrys } from '@irys/sdk';
import { providers } from 'ethers';
import { getWalletClient } from 'wagmi/actions';

import { never } from './utils';

const TOP_UP = '200000000000000000'; // 0.2 MATIC
const MIN_FUNDS = 0.05;

export async function getWebIrys() {
  const walletClient = (await getWalletClient()) ?? never('Wallet client not found');

  const webIrys = new WebIrys({
    url: 'https://devnet.irys.xyz',
    token: 'matic',
    wallet: {
      rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
      name: 'ethersv5',
      provider: new Web3Provider(walletClient.transport),
    },
  });

  await webIrys.ready();

  const balance = await webIrys.getBalance(walletClient.account.address);

  if (webIrys.utils.fromAtomic(balance).toNumber() < MIN_FUNDS) {
    await webIrys.fund(TOP_UP);
  }

  return webIrys;
}
