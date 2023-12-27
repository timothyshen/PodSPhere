import { Web3Provider } from '@ethersproject/providers';
import { JsonRpcProvider, type Signer, Wallet } from 'ethers';
import { getProvider, getRpcUrl } from './eth-provider';
import { WebIrys } from '@irys/sdk';

import { never } from './utils';

const TOP_UP = '200000000000000000'; // 0.2 MATIC
const MIN_FUNDS = 0.05;

class IrysProvider {
  private readonly provider: JsonRpcProvider;
  private readonly signer: Signer;
  constructor(provider: JsonRpcProvider, signer: Signer) {
    this.provider = provider;
    this.signer = signer;
  }
  getProvider = () => this.provider;
  getSigner = () => this.signer;
}

export const getIrys: () => Promise<WebIrys> = async () => {
  let provider;

  const autoSign = true;
  if (autoSign) {
    const rpcProvider = new JsonRpcProvider(getRpcUrl());
    try {
      const signer = Wallet.createRandom().connect(rpcProvider);
      provider = new IrysProvider(rpcProvider, signer);
    } catch (e) {
      console.error('getIrys: error creating signer', e);
    }
  }

  if (!provider) {
    provider = await getProvider();
  }

  const url = 'node2';
  const token = 'matic';
  const wallet = { name: 'ethersv6', provider };
  const irys = new WebIrys({ url, token, wallet });

  await irys.ready();

  return irys;
};
