import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';


export function LogInPage() {

    const { address, isConnected, isConnecting } = useAccount();

    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });

    return (
        <div>
            {!isConnected && (
                <button disabled={isConnecting} onClick={() => connect()}>
                    Connect first
                </button>
            )}

            {address && (
                <div>
                    <p>{`Using wallet ${address}`}</p>
                    {/* <LoginForm owner={address} onSuccess={() => navigate('/')} /> */}
                </div>
            )}
        </div>
    )
}