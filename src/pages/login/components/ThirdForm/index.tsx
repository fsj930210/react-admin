import { useTranslation } from 'react-i18next';

import { Icon } from '@iconify/react';
import { Divider } from 'antd';

import styles from './index.module.css';

const ThirdForm = () => {
  const { t } = useTranslation();
  return (
    <>
      <Divider
        style={{
          color: 'var(--ant-color-text-description)',
          fontSize: 'var(--ant-font-size-sm)',
        }}
      >
        {t('login.quickLogin')}
      </Divider>
      <div className="w-full">
        <div className={styles['quick-login-item']}>
          <Icon icon="ant-design:github-outlined" />
          <span className="ml-[8px]">{t('login.githubLogin')}</span>
        </div>
        <div className={styles['quick-login-item']}>
          <Icon icon="ra-icon:google" />
          <span className="ml-[8px]">{t('login.googleLogin')}</span>
        </div>
      </div>
    </>
  );
};

export default ThirdForm;
