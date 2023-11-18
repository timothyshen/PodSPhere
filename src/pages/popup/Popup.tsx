import './tailwind.css'; // Path to your Tailwind CSS file
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import WalletConnectButton from './components/Login/Web3Modal';
import { Web3ModalProvider } from './provider/WalletConnectProvider';
import { LensProvider } from './provider/LenProvider';
import Home from './pages/index';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <Web3ModalProvider>
      <LensProvider>
        {/* <div className={`h-[600px] w-[400px] flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
          <WalletConnectButton />
        </div> */}
        <Home />
      </LensProvider>
    </Web3ModalProvider>

  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
