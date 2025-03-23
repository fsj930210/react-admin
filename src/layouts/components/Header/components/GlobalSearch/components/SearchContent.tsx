import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Icon from '@/components/RaIcon';

import styles from '../index.module.css';

import { RA_CACHED_GLOBAL_SEARCH_KEY } from '@/utils/constants';
import storage from '@/utils/storage';

import type { MenuItem } from '@/types/menu';

type SearchContentProps = {
  data: MenuItem[];
  type: 'search' | 'history';
  onItemClick?: (item: MenuItem) => void;
  onItemRemove?: (item: MenuItem) => void;
};
const SearchContent = ({
  data,
  type,
  onItemClick,
  onItemRemove,
}: SearchContentProps) => {
  const { t } = useTranslation();
  console.log(data);
  const navigate = useNavigate();
  const handleClick = (item: MenuItem) => {
    navigate(item.key);
    onItemClick?.(item);
    const cachedList = storage.getItem<MenuItem[]>(RA_CACHED_GLOBAL_SEARCH_KEY);
    if (cachedList) {
      const index = cachedList.findIndex((i) => i.key === item.key);
      if (index > -1) {
        cachedList.splice(index, 1);
      }
      cachedList.unshift(item);
      storage.setItem(RA_CACHED_GLOBAL_SEARCH_KEY, cachedList);
    } else {
      storage.setItem(RA_CACHED_GLOBAL_SEARCH_KEY, [item]);
    }
  };
  return (
    <div className={styles['global-search-content']}>
      <div className="px-[12px] font-bold">{t('search.searchHistory')}</div>
      <ul className="p-[12px] max-h-[353px] overflow-y-auto">
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <li
                className={styles['global-search-content-item']}
                key={item.key}
                onClick={() => handleClick(item)}
              >
                <div>
                  {item.icon ? <Icon icon={item.icon} /> : null}
                  <span className="ml-[8px]">{item.label}</span>
                </div>
                <span
                  className="text-[16px] line-height-[1] bg-transparent p-[4] hover:bg-[var(--ant-color-primary-hover)] rounded-[100%] transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemRemove?.(item);
                  }}
                >
                  {type === 'history' ? (
                    <Icon icon="lucide:x" />
                  ) : (
                    <Icon icon="mi:enter" />
                  )}
                </span>
              </li>
            );
          })
        ) : (
          <div className="w-full h-full min-h-[100px] flex-center">
            {t('search.searchHistoryEmpty')}
          </div>
        )}
      </ul>
    </div>
  );
};

export default SearchContent;
