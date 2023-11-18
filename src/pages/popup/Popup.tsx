import './tailwind.css'; // Path to your Tailwind CSS file
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { Web3ModalProvider } from './provider/WalletConnectProvider';
import { LensProvider } from './provider/LenProvider';
import Home from './pages/index';
import { AuthProvider } from './context/AuthContext';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <Web3ModalProvider>
      <LensProvider>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </LensProvider>
    </Web3ModalProvider>

  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
