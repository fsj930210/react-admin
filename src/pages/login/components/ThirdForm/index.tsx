import { Icon } from '@iconify/react';
import { Divider } from 'antd';

import styles from './index.module.css';

const ThirdForm = () => {
  return (
    <>
      <Divider
        style={{
          color: 'var(--ant-color-text-description)',
          fontSize: 'var(--ant-font-size-sm)',
        }}
      >
        快捷登录
      </Divider>
      <div className="w-full">
        <div className={styles['quick-login-item']}>
          <Icon icon="ant-design:github-outlined" />
          <span className="ml-[8px]">GitHub账号登录</span>
        </div>
        <div className={styles['quick-login-item']}>
          <Icon icon="my-icon:google" />
          <span className="ml-[8px]">Google账号登录</span>
        </div>
      </div>
    </>
  );
};

export default ThirdForm;
