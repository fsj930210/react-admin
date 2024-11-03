import { Dropdown } from 'antd';
import { useShallow } from 'zustand/react/shallow';

import Icon from '@/components/Icon';

import type { DropDownMapValue } from '@/types/custom-types';

import useLoginStore, { LoginStyleEnum } from '@/store/login';

const LoginStyle = () => {
  const { changeLoginStyle, loginStyle } = useLoginStore(
    useShallow((state) => ({
      changeLoginStyle: state.changeLoginStyle,
      loginStyle: state.loginStyle,
    })),
  );
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
      menu={{ items, selectable: true }}
      getPopupContainer={(triggerNode) =>
        (triggerNode?.parentNode as HTMLElement) || document.body
      }
      overlayStyle={{ width: 120 }}
    >
      <span className="flex-center p-[4] cursor-pointer bg-transparent rounded-full hover:bg-[var(--ant-color-bg-layout)] transition-all">
        {styleMap[loginStyle].icon}
      </span>
    </Dropdown>
  );
};

export default LoginStyle;
