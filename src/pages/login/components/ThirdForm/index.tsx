import { GithubOutlined } from '@ant-design/icons';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Divider, Row, theme } from 'antd';

import styles from './index.module.css';

import GoogleIcon from '@/assets/icons/google.svg?react';

const { useToken } = theme;
const ThirdForm = () => {
  const { token } = useToken();
  return (
    <Row className="enter-y">
      <Divider>快捷登录</Divider>
      <div className="w-full">
        <div
          className={styles['quick-login-item']}
          css={css`
            &:hover {
              color: #ffffff;
              background-color: ${token.colorPrimary};
            }
          `}
        >
          <GithubOutlined />
          <span className="ml-[8px]">GitHub账号登录</span>
        </div>
        <div
          className={styles['quick-login-item']}
          css={css`
            &:hover {
              color: #ffffff;
              background-color: ${token.colorPrimary};
            }
          `}
        >
          <GoogleIcon />
          <span className="ml-[8px]">Google账号登录</span>
        </div>
      </div>
    </Row>
  );
};

export default ThirdForm;
