import AntDesignLogin from './AntDesign';
import MaterialDesignLogin from './MaterialDesign';
import Modal from './Modal';

import useLoginStore, { LoginStyleEnum } from '@/store/login';

const Login = () => {
  const { loginStyle } = useLoginStore();
  return (
    <div className="overflow-hidden">
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
