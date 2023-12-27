import { LensClient, development, IStorageProvider, type ProfileFragment, } from '@lens-protocol/client';

class LocalStorageProvider implements IStorageProvider {
  getItem(key: string) {
    return window.localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}

const lensClientConfig = {
  environment: development,
  storage: new LocalStorageProvider(),
};

const lensClient = new LensClient(lensClientConfig);

export const isAuthenticated = (): Promise<boolean> => lensClient.authentication.isAuthenticated();


export const connectWalletAndLogin = async(): Promise<ProfileFragment[]> => {
    let address: string | undefined;

    try {
        const accounts = await 
    }
}