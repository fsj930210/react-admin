import { Button, Layout } from 'antd';
import classNames from 'classnames';

import AppLogo from '@/components/app/AppLogo';
import DarkTheme from '@/components/business/DarkTheme';
import I18n from '@/components/business/I18n';
import Icon from '@/components/RaIcon';

import Breadcrumb from './components/Breadcrumb';
import FullScreen from './components/FullScreen';
import GlobalSearch from './components/GlobalSearch';
import Notification from './components/Notification';
import UserCenter from './components/UserCenter';
import styles from './index.module.css';

import useLayoutStoreSelector from '@/store/layout';
import useMenuStore from '@/store/menu';

const { Header } = Layout;
type AppHeaderPorps = {
  children?: React.ReactNode;
  showLeft?: boolean;
  showLogo?: boolean;
  style?: React.CSSProperties;
  className?: string;
  showCollapsed?: boolean;
};
const AppHeader = ({
  showCollapsed = true,
  showLeft = true,
  showLogo = false,
  children = null,
  className,
  style,
}: AppHeaderPorps) => {
  const { collapsed, toggleCollapsed } = useMenuStore([
    'collapsed',
    'toggleCollapsed',
  ]);
  const { showBreadcrumb } = useLayoutStoreSelector(['showBreadcrumb']);
  return (
    <Header
      style={{
        backgroundColor: 'var(--ant-color-bg-container)',
        ...style,
      }}
      className={classNames(
        `flex-items-center justify-between  border-b-[1px] border-b-[var(--ant-color-border)] border-b-solid `,
        className,
      )}
    >
      {showLogo ? (
        <AppLogo
          showTitle
          style={{
            color: 'var(--ant-color-text)',
            backgroundColor: 'var(--ant-color-bg-container)',
            minWidth: 138,
            padding: 0,
          }}
        />
      ) : null}
      {showLeft ? (
        <div className={styles['header-left']}>
          {showCollapsed ? (
            <Button
              type="text"
              onClick={() => toggleCollapsed()}
              className="h-full text-[24px] line-height-[1]"
              style={{ width: 'auto', padding: 0 }}
            >
              {collapsed ? (
                <Icon icon="ant-design:menu-unfold-outlined" fontSize={22} />
              ) : (
                <Icon icon="ant-design:menu-fold-outlined" fontSize={22} />
              )}
            </Button>
          ) : null}
          {showBreadcrumb ? <Breadcrumb /> : null}
        </div>
      ) : null}
      {children || null}
      <div className={styles['header-right']}>
        <GlobalSearch />
        <DarkTheme />
        <I18n />
        <FullScreen />
        <Notification />
        <UserCenter />
      </div>
    </Header>
  );
};

export default AppHeader;
