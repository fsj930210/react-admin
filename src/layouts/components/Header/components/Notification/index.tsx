import { useTranslation } from 'react-i18next';

import { Badge, Popover, Tabs } from 'antd';

import Icon from '@/components/RaIcon';

import NotificationList from './components/NotificationList';
import styles from './inde.module.css';

import type { TabsProps } from 'antd';

const Notification = () => {
  const { t } = useTranslation();
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('notification.todo'),
      children: <NotificationList todo />,
    },
    {
      key: '2',
      label: t('notification.all'),
      children: <NotificationList />,
    },
  ];
  const Content = (
    <Tabs items={items} className={styles['notification-tabs']} />
  );
  return (
    <Popover arrow={false} content={Content} trigger={['click']}>
      <Badge dot className="inline">
        <span className="cursor-pointer flex-center p-[4] rounded-full bg-transparent hover:bg-[var(--ant-color-bg-layout)] transition-all">
          <Icon inline icon="carbon:notification" fontSize={20} />
        </span>
      </Badge>
    </Popover>
  );
};

export default Notification;
