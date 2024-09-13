import DarkTheme from '@/components/DarkTheme';

import AntDesignLogin from './AntDesign';
import MaterialDesignLogin from './MaterialDesign';
import Modal from './Modal';

import useLoginStore, { LoginStyleEnum } from '@/store/login';

const Login = () => {
  const { loginStyle } = useLoginStore();
  return (
    <div className="overflow-hidden relative h-full">
      <div className="absolute top-2 right-4 z-1">
        <div className="w-[100]"></div>
        <DarkTheme />
        <div className="w-[80]"></div>
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
