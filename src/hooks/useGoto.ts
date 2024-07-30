import { useNavigate } from 'react-router-dom';

function useGoto() {
  const navigate = useNavigate();
  const go = (path: string = '/') => {
    navigate(path);
  };
  const goHome = () => {
    navigate('/');
  };
  return {
    go,
    goHome,
  };
}

export default useGoto;
