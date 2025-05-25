import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown } from 'antd';

import Icon from '@/components/RaIcon';

import type { DropDownMapValue } from '@/types/custom-types';

import { AppThemeEnum } from '@/store/appConfig';
import useAppConfigStore from '@/store/appConfig';

const DarkTheme = () => {
  const { t } = useTranslation();
  const { changeAppTheme, appTheme } = useAppConfigStore([
    'appTheme',
    'changeAppTheme',
  ]);
  const [show, setShow] = useState(true);
  const themeMap: Record<AppThemeEnum | string, DropDownMapValue> = {
    [AppThemeEnum.light]: {
      key: 'light',
      icon: <Icon icon="charm:sun" fontSize={20} />,
      animateIcon: (
        <Icon icon="line-md:moon-to-sunny-outline-transition" fontSize={20} />
      ),
      label: t('theme.light'),
    },
    [AppThemeEnum.dark]: {
      key: 'dark',
      icon: <Icon icon="mdi:moon-and-stars" fontSize={20} />,
      animateIcon: (
        <Icon icon="line-md:sunny-outline-to-moon-transition" fontSize={20} />
      ),
      label: t('theme.dark'),
    },
    [AppThemeEnum.os]: {
      key: 'os',
      icon: <Icon inline icon="fluent:dark-theme-20-regular" fontSize={20} />,
      label: t('theme.os'),
    },
  };
  const items = Object.keys(themeMap).map((i) => {
    const item = themeMap[i];
    return {
      key: item.key,
      label: (
        <div className="flex items-center">
          <span className="cursor-pointer mr-[4]">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ),
      onClick: () => changeAppTheme(i as AppThemeEnum),
    };
  });
  useEffect(() => {
    if (appTheme !== AppThemeEnum.os) {
      setShow(false);
      setTimeout(() => {
        setShow(true);
      }, 0);
    }
  }, [appTheme]);
  return (
    <Dropdown
      trigger={['click']}
      placement="bottom"
      menu={{ items, selectable: true }}
      getPopupContainer={(triggerNode) =>
        (triggerNode?.parentNode as HTMLElement) || document.body
      }
      overlayStyle={{ width: 120 }}
    >
      <span className="p-[4] leading-none cursor-pointer bg-transparent rounded-full hover:bg-[var(--ant-color-bg-layout)] transition-all">
        {show
          ? themeMap[appTheme].animateIcon || themeMap[appTheme].icon
          : null}
      </span>
    </Dropdown>
  );
};

export default DarkTheme;
