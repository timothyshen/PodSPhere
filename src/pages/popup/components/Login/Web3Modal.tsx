import { useWeb3Modal } from '@web3modal/wagmi/react'

const WalletConnectButton = () => {
    const { open } = useWeb3Modal()

    return (
        <button
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => {
                open()
            }}>
            Open Connect Modal
        </button>
    )
}

export default WalletConnectButton