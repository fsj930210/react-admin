import { useTranslation } from 'react-i18next';

import { Icon } from '@iconify/react';
import { Badge, Popover, Tabs, TabsProps } from 'antd';

import NotificationList from './components/NotificationList';
import styles from './inde.module.css';

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
        <span className="text-[20px] cursor-pointer flex-center p-[4] rounded-[100%] bg-tansparent hover:bg-[var(--ant-color-bg-layout)] transition-all">
          <Icon inline icon="carbon:notification" />
        </span>
      </Badge>
    </Popover>
  );
};

export default Notification;
