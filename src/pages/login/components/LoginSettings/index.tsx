import { Space } from 'antd';

import DarkTheme from '@/components/business/DarkTheme';
import I18n from '@/components/business/I18n';

import LoginStyle from './LoginStyle';
import LoginTheme from './LoginTheme';

const LoginSettings = () => {
  return (
    <Space className="flex align-items bg-[var(--ra-color-bg-layout)] px-[10] py-[4] rounded-full">
      <LoginTheme />
      <LoginStyle />
      <DarkTheme />
      <I18n />
    </Space>
  );
};

export default LoginSettings;
