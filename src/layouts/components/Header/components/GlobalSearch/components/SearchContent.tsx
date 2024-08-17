/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { theme } from 'antd';

import styles from '../index.module.css';

const { useToken } = theme;

const SearchContent = () => {
  const { token } = useToken();
  return (
    <div className={styles['global-search-content']}>
      <div
        className="px-[12px] font-bold"
        css={css`
          color: ${token.colorPrimary};
        `}
      >
        最近搜索
      </div>
      <ul className="p-[12px] max-h-[353px] overflow-y-auto">
        <li
          className={styles['global-search-content-item']}
          css={css`
            &:hover {
              color: #ffffff;
              background-color: ${token.colorPrimary};
            }
          `}
        >
          <div>
            <span>icon</span>
            <span className="ml-[8px]">工作台</span>
          </div>
          <span>icon</span>
        </li>
      </ul>
      {/* <div className="w-full h-full min-h-[100px] flex justify-center items-center">
      没有搜索历史
    </div> */}
    </div>
  );
};

export default SearchContent;
