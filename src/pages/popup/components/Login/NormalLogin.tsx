import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { LensLogin } from './LensLogin';


export function LogInPage({ navigateToPage }: { navigateToPage: (page: React.SetStateAction<string>) => void }) {

    const { address, isConnected, isConnecting } = useAccount();
    console.log(address, isConnected, isConnecting)

    const { open } = useWeb3Modal()

    return (
        <div>
            <button
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => {
                    open()
                }}>
                {isConnected ? "Open my account" : "Open Connect Modal"}
            </button>

            {isConnecting && (
                <p>Connecting...</p>
            )}

            {address && (
                <div>
                    <p>{`Using wallet ${address}`}</p>
                    <LensLogin owner={address} onSuccess={() => navigateToPage('UserHome')} />
                </div>
            )}
        </div>
    )
}