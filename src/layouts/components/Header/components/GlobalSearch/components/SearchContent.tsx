import { useTranslation } from 'react-i18next';

import { Icon } from '@iconify/react';

import styles from '../index.module.css';

const SearchContent = () => {
  const { t } = useTranslation();
  return (
    <div className={styles['global-search-content']}>
      <div className="px-[12px] font-bold">{t('search.searchHistory')}</div>
      <ul className="p-[12px] max-h-[353px] overflow-y-auto">
        <li className={styles['global-search-content-item']}>
          <div>
            <span>icon</span>
            <span className="ml-[8px]">工作台</span>
          </div>
          <span className="text-[16px] line-height-[1] bg-transparent p-[4] hover:bg-[var(--ant-color-primary-hover)] rounded-[100%] transition-all">
            <Icon inline icon="lucide:x" />
          </span>
        </li>
      </ul>
      {/* <div className="w-full h-full min-h-[100px] flex-center">
      {t('search.searchHistoryEmpty')}
    </div> */}
    </div>
  );
};

export default SearchContent;
