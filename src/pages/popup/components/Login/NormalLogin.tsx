import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { LensLogin } from './LensLogin';


export function LogInPage() {

    const { address, isConnected, isConnecting } = useAccount();

    const { open } = useWeb3Modal()

    return (
        <div>
            {!isConnected && (
                <button
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => {
                        open()
                    }}>
                    Open Connect Modal
                </button>
            )}
            {isConnecting && (
                <p>Connecting...</p>
            )}

            {address && (
                <div>
                    <p>{`Using wallet ${address}`}</p>
                    <LensLogin owner={address} onSuccess={() => console.log("success")} />
                </div>
            )}
        </div>
    )
}