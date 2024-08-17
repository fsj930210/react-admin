import { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
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
        className="bg-[#f5f5f5] h-8 flex gap-3 items-center cursor-pointer border-none rounded-full px-4 py-[4px] text-[rgba(60,60,60,.7)] hover:bg-[#f5f5f5]"
      >
        <span>
          <SearchOutlined /> <span>搜索</span>
        </span>
        <span className="flex items-center px-2 h-full border-1 border-[rgba(60,60,60,.33)] border-solid px-[4px] rounded">
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
