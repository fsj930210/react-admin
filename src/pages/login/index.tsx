import { theme, Tabs, Typography } from 'antd';

import AppLogo from '@/components/AppLogo';

import EmailForm from './components/EmailForm';
import LoginForm from './components/LoginForm';
import QRCodeForm from './components/QRCodeForm';
import RegisterForm from './components/RegisterForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import styles from './index.module.css';
import useLogin, { LOGIN_STATE_ENUM } from './useLogin';

import loginImg from '@/assets/images/login-img.svg';
import AppFooter from '@/layouts/components/Footer';

const { useToken } = theme;

const { Title, Paragraph } = Typography;

const Login = () => {
  const { loginState, changeState } = useLogin();
  const { token } = useToken();
  const items = [
    {
      key: '1',
      label: '密码登录',
      children: <LoginForm switchPage={changeState} />,
    },
    {
      key: '2',
      label: '验证码登录',
      children: <EmailForm />,
    },
    {
      key: '3',
      label: '二维码登录',
      children: <QRCodeForm />,
    },
  ];
  return (
    <div className={`${styles['login-wrapper']} w-full flex min-h[100vh]`}>
      <div
        className={`w-[55%] text-white p[40px]`}
        style={{ backgroundColor: token.colorPrimary }}
      >
        <AppLogo animate showTitle />
        <div>
          <Title className="my-[20px] text-[28px]" style={{ color: '#ffffff' }}>
            开箱即用的React中后台管理系统
          </Title>
          <Paragraph>
            <div className="text-white">
              前端技术栈：vite、react、react-router、antd5、zustand等
            </div>
          </Paragraph>
          <Paragraph>
            <div className="text-white">
              后端技术栈：nestjs、typeorm、redis、primsa等
            </div>
          </Paragraph>
        </div>

        <div className="mt-[80px]">
          <img src={loginImg} alt="" className="w-[500]" />
        </div>
      </div>
      <div className={`w-[45%] flex flex-col items-center`}>
        <div className="p[80px] bg-white">
          <div className="w-[420px]">
            <h2 className="mb-[16px]">
              {loginState === LOGIN_STATE_ENUM.LOGIN
                ? '登录'
                : loginState === LOGIN_STATE_ENUM.REGISTER
                  ? '注册'
                  : '重置密码'}
            </h2>
            {loginState === LOGIN_STATE_ENUM.LOGIN ? (
              <Tabs
                className={styles['login-tab']}
                centered
                animated
                items={items}
                tabBarExtraContent={null}
                indicator={{
                  size: 140,
                  align: 'center',
                }}
              />
            ) : null}
            {loginState === LOGIN_STATE_ENUM.REGISTER ? (
              <RegisterForm switchPage={changeState} />
            ) : null}
            {loginState === LOGIN_STATE_ENUM.RESET_PASSWORD ? (
              <ResetPasswordForm switchPage={changeState} />
            ) : null}
          </div>
        </div>

        <AppFooter />
      </div>
    </div>
  );
};

export default Login;
