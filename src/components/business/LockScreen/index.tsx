import MacLockScreen from './components/MacLockScreen';
import WindowsLockScreen from './components/WindowsLockScreen';

import useSystem from '@/hooks/useSystem';
const LockScreen = () => {
  const system = useSystem();
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-black z-9999">
      {system === 'mac' ? <MacLockScreen /> : <WindowsLockScreen />}
    </div>
  );
};

export default LockScreen;
