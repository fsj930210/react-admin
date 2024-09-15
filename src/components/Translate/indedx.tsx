import { useTranslation } from 'react-i18next';

import { Icon } from '@iconify/react';
import { Dropdown } from 'antd';

import useGloabalStore from '@/store';
const Translate = () => {
  const { t, i18n } = useTranslation();
  const { changeAppLanguage } = useGloabalStore();
  const items = [
    {
      key: 'zh-CN',
      label: <span>{t('language.zh-CN')}</span>,
    },
    {
      key: 'en',
      label: <span>{t('language.en')}</span>,
    },
  ];
  return (
    <Dropdown
      trigger={['click']}
      placement="bottom"
      menu={{
        items,
        onClick: ({ key }) => {
          i18n.changeLanguage(key);
          changeAppLanguage(key);
        },
      }}
      getPopupContainer={(triggerNode) =>
        (triggerNode?.parentNode as HTMLElement) || document.body
      }
      overlayStyle={{ width: 90 }}
    >
      <span className="text-[20px] flex-center p-[4] cursor-pointer bg-transparent rounded-[100%] hover:bg-[var(--ant-color-bg-layout)] transition-all">
        <Icon inline icon="carbon:translate" />
      </span>
    </Dropdown>
  );
};

export default Translate;
