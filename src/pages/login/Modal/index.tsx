import QRCodeForm from '../components/QRCodeForm';

import EmailForm from './components/EmailForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import styles from './index.module.css';

import AppFooter from '@/layouts/components/Footer';
import useLoginStore, { LoginPageEnum } from '@/store/login';
const LoginModal = () => {
  const { loginPage, changeLoginPage } = useLoginStore();
  return (
    <div className="bg-[var(--ant-color-primary-bg)] w-full h-full relative">
      <div className={styles['login-box']}>
        <div className="flex items-center justify-center">
          <img
            src="/images/frontend-engineer.svg"
            className="h-[416px]"
            alt=""
          />
        </div>
        <div className="w-[370px]">
          {loginPage === LoginPageEnum.login ? (
            <LoginForm switchPage={changeLoginPage} />
          ) : null}
          {loginPage === LoginPageEnum.qr_code ? (
            <QRCodeForm
              switchPage={changeLoginPage}
              showBackButton
              showTitle
              animateClassName="enter-x"
            />
          ) : null}
          {loginPage === LoginPageEnum.email ? (
            <EmailForm switchPage={changeLoginPage} />
          ) : null}
          {loginPage === LoginPageEnum.register ? (
            <RegisterForm switchPage={changeLoginPage} />
          ) : null}
          {loginPage === LoginPageEnum.reset_password ? (
            <ResetPasswordForm switchPage={changeLoginPage} />
          ) : null}
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default LoginModal;
