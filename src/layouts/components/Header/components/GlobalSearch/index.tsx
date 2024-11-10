import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from 'antd';

import Icon from '@/components/RaIcon';

import { RA_CACHED_GLOBAL_SEARCH_KEY } from '@/utils/constants';
import storage from '@/utils/storage';

import SearchContent from './components/SearchContent';
import SearchFooter from './components/SearchFooter';
import SearchInput from './components/SearchInput';
import styles from './index.module.css';

import type { MenuItem } from '@/types/custom-types';

import useMenuStore from '@/store/menu';

const GlobalSearch = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const flatMenuItems = useMenuStore((state) => state.flatMenuItems);
  const [searchValue, setSearchValue] = useState('');
  const [searchContentList, setSearchContentList] = useState<MenuItem[]>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      const filteredList = flatMenuItems.filter(
        (item) => item.label.includes(value) || item.key.includes(value),
      );
      setSearchContentList(filteredList);
    } else {
      const cachedList = storage.getItem<MenuItem[]>(
        RA_CACHED_GLOBAL_SEARCH_KEY,
      );
      if (cachedList) {
        setSearchContentList(cachedList);
      } else {
        setSearchContentList([]);
      }
    }
    setSearchValue(value);
  };
  const onClose = () => {
    setShowModal(false);
    setSearchValue('');
    setSearchContentList([]);
  };
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-[var(--ant-color-bg-layout)] h-8 flex gap-3 items-center cursor-pointer border-none rounded-full px-4 py-[4px] text-[var(--ant-color-text-tertiary)] hover:text-[var(--ant-color-text)] transition-all"
      >
        <span>
          <Icon icon="lucide:search" />{' '}
          <span>{t('search.outerPlaceholder')}</span>
        </span>
        <span className="flex items-center px-2 h-full border-1 border-[var(--ant-color-border)] border-solid px-[4px] rounded">
          <kbd className="line-height-none mr-[4px]">⌘</kbd>
          <kbd className="line-height-none">k</kbd>
        </span>
      </button>
      <Modal
        maskClosable
        closable={false}
        open={showModal}
        onCancel={onClose}
        title={<SearchInput onChange={handleInputChange} value={searchValue} />}
        style={{
          padding: 0,
        }}
        className={styles['global-search-modal']}
        footer={<SearchFooter />}
      >
        <SearchContent
          data={searchContentList}
          type={searchValue ? 'search' : 'history'}
          onItemClick={onClose}
        />
      </Modal>
    </>
  );
};

export default GlobalSearch;
