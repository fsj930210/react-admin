import { Dropdown } from 'antd';

import Icon from '@/components/RaIcon';

import type { DropDownMapValue } from '@/types/custom-types';

import useLoginStoreSelector, { LoginStyleEnum } from '@/store/login';

const LoginStyle = () => {
  const { changeLoginStyle, loginStyle } = useLoginStoreSelector([
    'loginStyle',
    'changeLoginStyle',
  ]);
  const styleMap: Record<LoginStyleEnum | string, DropDownMapValue> = {
    [LoginStyleEnum.ant]: {
      key: LoginStyleEnum.ant,
      icon: <Icon icon="simple-icons:antdesign" fontSize={20} />,
      label: 'ant design',
    },
    [LoginStyleEnum.material]: {
      key: LoginStyleEnum.material,
      icon: <Icon icon="mdi:material-ui" />,
      label: 'material',
    },
    [LoginStyleEnum.modal]: {
      key: LoginStyleEnum.modal,
      icon: <Icon icon="vaadin:modal" />,
      label: 'modal',
    },
  };
  const items = Object.keys(styleMap).map((i) => {
    const item = styleMap[i];
    return {
      key: item.key,
      label: (
        <div className="flex items-center">
          <span className="cursor-pointer mr-[4]">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ),
      onClick: () => changeLoginStyle(i as LoginStyleEnum),
    };
  });
  return (
    <Dropdown
      trigger={['click']}
      placement="bottom"
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [LoginStyleEnum.ant],
      }}
      getPopupContainer={(triggerNode) =>
        (triggerNode?.parentNode as HTMLElement) || document.body
      }
      overlayStyle={{ width: 130 }}
    >
      <span className="flex-center p-[4] cursor-pointer bg-transparent rounded-full hover:bg-[var(--ant-color-bg-layout)] transition-all">
        {styleMap[loginStyle].icon}
      </span>
    </Dropdown>
  );
};

export default LoginStyle;
