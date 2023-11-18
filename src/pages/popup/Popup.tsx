import './tailwind.css'; // Path to your Tailwind CSS file
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { Button } from './components/ui/button';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <div
      className="h-[600px] w-[400px] flex flex-col items-center justify-center"
    >

      <Button
        onClick={exampleThemeStorage.toggle}>
        Toggle theme
      </Button>

    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
