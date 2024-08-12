import styles from './index.module.css';

import DownIcon from '@/assets/icons/down.svg?react';
import EnterIcon from '@/assets/icons/enter.svg?react';
import EscIcon from '@/assets/icons/esc.svg?react';
import UpIcon from '@/assets/icons/up.svg?react';
const SearchFooter = () => {
  return (
    <div className={styles['global-search-footer']}>
      <ul className="flex items-center h-full gap-10">
        <li className={styles['global-search-footer-item']}>
          <kbd className="mr-1 text-[16px] flex items-center">
            <EnterIcon />
          </kbd>
          <span>选择</span>
        </li>
        <li className={styles['global-search-footer-item']}>
          <kbd className="mr-1 text-[16px] flex items-center">
            <DownIcon />
          </kbd>
          <kbd className="mr-1 text-[16px] flex items-center">
            <UpIcon />
          </kbd>
          <span>导航</span>
        </li>
        <li className={styles['global-search-footer-item']}>
          <kbd className="mr-1 text-[16px] flex items-center">
            <EscIcon />
          </kbd>
          <span>关闭</span>
        </li>
      </ul>
    </div>
  );
};

export default SearchFooter;
