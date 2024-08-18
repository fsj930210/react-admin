import { Icon } from '@iconify/react';
import { Badge, Popover, Tabs, TabsProps } from 'antd';

import NotificationList from './components/NotificationList';
import styles from './inde.module.css';
const items: TabsProps['items'] = [
  {
    key: '1',
    label: '待办',
    children: <NotificationList todo />,
  },
  {
    key: '2',
    label: '全部',
    children: <NotificationList />,
  },
];

const Notification = () => {
  const Content = (
    <Tabs items={items} className={styles['notification-tabs']} />
  );
  return (
    <Popover arrow={false} content={Content} trigger={['click']}>
      <Badge dot>
        <Icon icon="carbon:notification" className="cursor-pointer" />
      </Badge>
    </Popover>
  );
};

export default Notification;
