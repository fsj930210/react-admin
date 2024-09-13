import { useState } from 'react';

import { Icon } from '@iconify/react';
import { Modal } from 'antd';

import SearchContent from './components/SearchContent';
import SearchFooter from './components/SearchFooter';
import SearchInput from './components/SearchInput';
import styles from './index.module.css';

const GlobalSearch = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-[var(--ant-color-bg-layout)] h-8 flex gap-3 items-center cursor-pointer border-none rounded-full px-4 py-[4px] text-[var(--ant-color-text-tertiary)] hover:text-[var(--ant-color-text)] transition-all"
      >
        <span>
          <Icon icon="lucide:search" /> <span>搜索</span>
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
        onCancel={() => setShowModal(false)}
        title={<SearchInput />}
        style={{
          padding: 0,
        }}
        className={styles['global-search-modal']}
        footer={<SearchFooter />}
      >
        <SearchContent />
      </Modal>
    </>
  );
};

export default GlobalSearch;
