/**
 * 参考：https://codepen.io/a-farahmand/pen/MWjGEpg
 */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { theme } from 'antd';

import styles from './index.module.css';

type AppLoadingProps = {
  text?: string;
  showText?: boolean;
};

const { useToken } = theme;
const AppLoading = ({ text = 'Loading...', showText }: AppLoadingProps) => {
  const { token } = useToken();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className={styles['loading-wrapper']}>
        <div
          className={styles['loading-circle']}
          css={css`
            background-color: ${token.colorPrimary};
          `}
        />
        <div
          className={styles['loading-circle']}
          css={css`
            background-color: ${token.colorPrimary};
          `}
        />
        <div
          className={styles['loading-circle']}
          css={css`
            background-color: ${token.colorPrimary};
          `}
        />
        <div className={styles['loading-shadow']} />
        <div className={styles['loading-shadow']} />
        <div className={styles['loading-shadow']} />
        {showText ? <div className="mt-[16px]">{text}</div> : null}
      </div>
    </div>
  );
};

export default AppLoading;
