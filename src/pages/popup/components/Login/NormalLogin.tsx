import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { LensLogin } from './LensLogin';


export function LogInPage({ navigateToPage }: { navigateToPage: (page: React.SetStateAction<string>) => void }) {

    const { address, isConnected, isConnecting } = useAccount();
    console.log(address, isConnected, isConnecting)

    const { open } = useWeb3Modal()

    return (
        <div>
            {isConnecting && (
                <p>Connecting...</p>
            )}

            {!isConnected &&
                <button
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => {
                        open()
                    }}>
                    Open Connect Modal
                </button>
            }

            {address && (
                <div>
                    <p
                        className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-lg shadow border border-blue-300 hover:shadow-md transition-all"
                        onClick={() => {
                            open()
                        }}>
                        {`Using wallet ${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
                    </p>
                    <LensLogin owner={address} onSuccess={() => navigateToPage('UserHome')} />
                </div>
            )}
        </div>
    )
}