import AntDesignLogin from './AntDesign';
import LoginSettings from './components/LoginSettings';
import MaterialDesignLogin from './MaterialDesign';
import Modal from './Modal';

import useLoginStore, { LoginStyleEnum } from '@/store/login';

const Login = () => {
  const { loginStyle } = useLoginStore();
  return (
    <div className="overflow-hidden relative h-full">
      <div className="absolute top-2 right-4 z-1">
        <LoginSettings />
      </div>
      {loginStyle === LoginStyleEnum.ant ? (
        <AntDesignLogin />
      ) : loginStyle === LoginStyleEnum.material ? (
        <MaterialDesignLogin />
      ) : (
        <Modal />
      )}
    </div>
  );
};

export default Login;
