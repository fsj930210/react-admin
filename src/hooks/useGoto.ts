import { useNavigate } from 'react-router-dom';
import type { NavigateOptions } from 'react-router-dom';

function useGoto() {
  const navigate = useNavigate();
  const go = (path: string = '/', options?: NavigateOptions) => {
    navigate(path, options);
  };
  const goHome = (options?: NavigateOptions) => {
    navigate('/', options);
  };
  return {
    go,
    goHome,
  };
}

export default useGoto;
