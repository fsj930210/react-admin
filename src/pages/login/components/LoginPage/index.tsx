import { Tabs, Typography } from 'antd';

import AppLogo from '@/components/AppLogo';

import EmailForm from '../EmailForm';
import LoginForm from '../LoginForm';
import QRCodeForm from '../QRCodeForm';
import RegisterForm from '../RegisterForm';
import ResetPasswordForm from '../ResetPasswordForm';

import styles from './index.module.css';

import AppFooter from '@/layouts/components/Footer';
import useLoginStore, { LoginPageEnum } from '@/store/login';

const { Title, Paragraph } = Typography;

type LoginPageProps = {
  material?: boolean;
};
const LoginPage = ({ material }: LoginPageProps) => {
  const { loginPage, changeLoginPage } = useLoginStore();
  const items = [
    {
      key: '1',
      label: '密码登录',
      children: <LoginForm switchPage={changeLoginPage} material={material} />,
    },
    {
      key: '2',
      label: '验证码登录',
      children: <EmailForm switchPage={changeLoginPage} material={material} />,
    },
    {
      key: '3',
      label: '二维码登录',
      children: <QRCodeForm />,
    },
  ];
  return (
    <div className={`${styles['login-wrapper']} w-full flex h-[100vh]`}>
      <div
        className={`w-[55%] text-white p[40px] text-center bg-[var(--ant-color-primary)] dark:bg-[var(--ant-color-bg-layout)]`}
      >
        <AppLogo animate showTitle className="justify-center" />
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

        <div className="mt-[80px] flex justify-center">
          <img src="/images/fullstack-engineer.svg" alt="" className="w-120" />
        </div>
      </div>
      <div className="w-[45%] h-full flex flex-col items-center relative bg-white dark:bg-[var(--ant-color-bg-layout)]">
        <div className="p[80px]">
          <div className="w-[420px]">
            <h2 className="mb-[14px] enter-y">
              {loginPage === LoginPageEnum.login
                ? '登录'
                : loginPage === LoginPageEnum.register
                  ? '注册'
                  : '重置密码'}
            </h2>
            {loginPage === LoginPageEnum.login ? (
              <Tabs
                className={styles['login-tab']}
                centered
                animated
                items={items}
                tabBarExtraContent={null}
              />
            ) : null}
            {loginPage === LoginPageEnum.register ? (
              <RegisterForm switchPage={changeLoginPage} material={material} />
            ) : null}
            {loginPage === LoginPageEnum.reset_password ? (
              <ResetPasswordForm
                switchPage={changeLoginPage}
                material={material}
              />
            ) : null}
          </div>
        </div>

        <AppFooter />
      </div>
    </div>
  );
};

export default LoginPage;
