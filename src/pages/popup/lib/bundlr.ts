import { WebBundlr } from '@bundlr-network/client';
import { walletConnectProvider } from '@web3modal/wagmi';
import { WebIrys } from '@irys/sdk';
import { providers } from 'ethers';
import { getWalletClient } from 'wagmi/actions';
import Irys from '@irys/sdk';

import { never } from './utils';
import { ether } from '@lens-protocol/react-web';

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

export const getIrys = async () => {
  const provider = new providers.Web3Provider(window.ethereum);
  const wallet = { name: 'ethersv5', provider: provider };
  const url = 'https://node1.irys.xyz';
  const token = 'matic';
  const webIrys = new WebIrys({ url, token, wallet });
  await webIrys.ready();
  return webIrys;
};
