import { Icon } from '@iconify/react';
import { Dropdown } from 'antd';

import useGloabalStore, { AppTheme } from '@/store';

const themeIconMap: Record<AppTheme | string, JSX.Element> = {
  light: <Icon inline icon="lucide:sun-medium" />,
  dark: <Icon inline icon="ph:moon-stars-light" />,
  system: <Icon inline icon="fluent:dark-theme-20-regular" />,
};
const DarkTheme = () => {
  const { changeAppTheme, appTheme } = useGloabalStore();
  const items = Object.keys(themeIconMap).map((item) => ({
    key: item,
    label: (
      <span className="text-[20px] cursor-pointer">{themeIconMap[item]}</span>
    ),
    onClick: () => changeAppTheme(item as AppTheme),
  }));
  return (
    <Dropdown
      trigger={['click']}
      placement="bottom"
      menu={{ items }}
      getPopupContainer={(triggerNode) =>
        (triggerNode?.parentNode as HTMLElement) || document.body
      }
      overlayStyle={{ width: 50 }}
    >
      <span className="text-[20px] flex-center p-[4] cursor-pointer bg-transparent rounded-[100%] hover:bg-[var(--ant-color-bg-layout)] transition-all">
        {themeIconMap[appTheme]}
      </span>
    </Dropdown>
  );
};

export default DarkTheme;
