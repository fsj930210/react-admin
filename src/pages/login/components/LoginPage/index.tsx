import { useTranslation } from 'react-i18next';

import { Typography, Tabs } from 'antd';

import AppLogo from '@/components/app/AppLogo';

import LoginForm from '../LoginForm';
import QRCodeForm from '../QRCodeForm';
import RegisterForm from '../RegisterForm';
import ResetPasswordForm from '../ResetPasswordForm';

import { PUBLIC_PATH } from '@/utils/constants';

import styles from './index.module.css';

import AppFooter from '@/layouts/components/common/Footer';
import useLoginStoreSelector, { LoginPageEnum } from '@/store/login';

const { Title, Paragraph } = Typography;

type LoginPageProps = {
  material?: boolean;
};
const LoginPage = ({ material }: LoginPageProps) => {
  const { t } = useTranslation();
  const { loginPage, changeLoginPage } = useLoginStoreSelector([
    'loginPage',
    'changeLoginPage',
  ]);
  const items = [
    {
      key: '1',
      label: t('login.passwordLogin'),
      children: <LoginForm switchPage={changeLoginPage} material={material} />,
    },
    {
      key: '2',
      label: t('login.QRCodeLogin'),
      children: <QRCodeForm />,
    },
  ];
  return (
    <div className={`${styles['login-wrapper']} w-full flex h-[100vh]`}>
      <div
        className={`w-[55%] text-white p[40px] bg-[var(--ant-color-primary)] dark:bg-[var(--ant-color-bg-layout)]`}
      >
        <AppLogo animate showTitle className="justify-center" />
        <div>
          <Title
            className="my-[20px] text-[28px] text-center"
            style={{ color: '#ffffff' }}
          >
            {t('login.pageTitle')}
          </Title>
          <Paragraph>
            <div className="text-white">
              {t('login.feSkills')} vite、react、react-router、antd5、zustand
            </div>
          </Paragraph>
          <Paragraph>
            <div className="text-white">
              {t('login.beSkills')} nestjs、typeorm、redis等
            </div>
          </Paragraph>
        </div>

        <div className="mt-[80px] flex justify-center">
          <img
            src={`${PUBLIC_PATH}/images/fullstack-engineer.svg`}
            alt=""
            className="w-120"
          />
        </div>
      </div>
      <div className="w-[45%] h-full flex flex-col items-center relative bg-white dark:bg-[var(--ant-color-bg-container)]">
        <div className="p[80px]">
          <div className="w-[420px]">
            <h2 className="mb-[14px] enter-y">
              {loginPage === LoginPageEnum.login
                ? t('login.loginTitle')
                : loginPage === LoginPageEnum.register
                  ? t('login.registerTitle')
                  : t('login.resetPasswordTitle')}
            </h2>
            {loginPage === LoginPageEnum.login ? (
              <Tabs
                className={styles['login-tab']}
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
