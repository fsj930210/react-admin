import { useTranslation } from 'react-i18next';

import styles from '../index.module.css';

import DownIcon from '@/assets/icons/down.svg?react';
import EnterIcon from '@/assets/icons/enter.svg?react';
import EscIcon from '@/assets/icons/esc.svg?react';
import UpIcon from '@/assets/icons/up.svg?react';
const SearchFooter = () => {
  const { t } = useTranslation();
  return (
    <div className={styles['global-search-footer']}>
      <ul className="flex items-center h-full gap-10">
        <li className={styles['global-search-footer-item']}>
          <kbd className="mr-1 text-[16px] flex items-center">
            <EnterIcon />
          </kbd>
          <span>{t('search.select')}</span>
        </li>
        <li className={styles['global-search-footer-item']}>
          <kbd className="mr-1 text-[16px] flex items-center">
            <DownIcon />
          </kbd>
          <kbd className="mr-1 text-[16px] flex items-center">
            <UpIcon />
          </kbd>
          <span>{t('search.navigate')}</span>
        </li>
        <li className={styles['global-search-footer-item']}>
          <kbd className="mr-1 text-[16px] flex items-center">
            <EscIcon />
          </kbd>
          <span>{t('search.close')}</span>
        </li>
      </ul>
    </div>
  );
};

export default SearchFooter;
