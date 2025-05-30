import { useTranslation } from 'react-i18next';

import { Dropdown } from 'antd';

import Icon from '@/components/RaIcon';

import useAppConfigStore from '@/store/appConfig';
const I18n = () => {
  const { t, i18n } = useTranslation();
  const changeAppLanguage = useAppConfigStore((state) => state.changeAppLanguage);
  const items = [
    {
      key: 'zh-CN',
      label: (
        <div className="flex items-center">
          <Icon
            icon="emojione-v1:flag-for-china"
            fontSize={20}
            wrapClassName="cursor-pointer mr-[4]"
          />
          <span>{t('language.zh-CN')}</span>
        </div>
      ),
    },
    {
      key: 'en',
      label: (
        <div className="flex items-center">
          <Icon
            icon="twemoji:flag-us-outlying-islands"
            fontSize={20}
            wrapClassName="cursor-pointer mr-[4]"
          />
          <span>{t('language.en')}</span>
        </div>
      ),
    },
  ];
  return (
    <Dropdown
      trigger={['click']}
      placement="bottom"
      menu={{
        items,
        selectable: true,
        selectedKeys: [i18n.language],
        onClick: async ({ key }) => {
          await i18n.changeLanguage(key);
          changeAppLanguage(key);
        },
      }}
      getPopupContainer={(triggerNode) =>
        (triggerNode?.parentNode as HTMLElement) || document.body
      }
      overlayStyle={{ width: 120 }}
    >
      <span className="flex-center leading-none p-[4] cursor-pointer bg-transparent rounded-full hover:bg-[var(--ant-color-bg-layout)] transition-all">
        <Icon icon="carbon:translate" fontSize={20} />
      </span>
    </Dropdown>
  );
};

export default I18n;
