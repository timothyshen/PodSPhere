
import { ReactNode } from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react'


type RenderFunction = (address: string) => ReactNode;

export type RequireConnectedWalletProps = {
    children: React.ReactNode | RenderFunction;
    message?: string;
};

export function RequireConnectedWallet({ children, message }: RequireConnectedWalletProps) {
    const { address, isConnected, isConnecting } = useAccount();
    const { open } = useWeb3Modal()



    if (isConnected && address) {
        if (typeof children === 'function') {
            return <>{children(address)}</>;
        }
        return <>{children}</>;
    }

    return (
        <div>
            {message && <p>{message}</p>}
            <button disabled={isConnecting} onClick={() => open()}>
                Connect first
            </button>
        </div>
    );

}
