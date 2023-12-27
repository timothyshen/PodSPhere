const getParamOrExit = (name: string) => {
  const param = import.meta.env[name];
  if (!param) {
    console.error(`Required config param '${name}' missing`);
    process.exit(1);
  }
  return param;
};


export const WALLETCONNECT_PROJECT_ID: string = getParamOrExit('VITE_WALLETCONNECT_PROJECT_ID');

export const ALCHEMY_ETH_API_KEY: string = getParamOrExit('VITE_ALCHEMY_ETH_API_KEY');

export const ALCHEMY_MATIC_API_KEY: string = getParamOrExit('VITE_ALCHEMY_MATIC_API_KEY');