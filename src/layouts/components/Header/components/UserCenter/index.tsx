import { Icon } from '@iconify/react';
import { Avatar, Popover } from 'antd';

import styles from './index.module.css';
const UserCenter = () => {
  const content = (
    <div className="w-[200px]">
      <div className={styles['user-center-item']}>
        <span className="flex items-center">
          <Icon inline icon="carbon:information" fontSize={16} />
          <span className="ml-2">关于项目</span>
        </span>
        <span></span>
      </div>
      <div className={styles['user-center-item']}>
        <span className="flex items-center">
          <Icon inline icon="ant-design:profile-outlined" fontSize={16} />
          <span className="ml-2">个人中心</span>
        </span>
        <span></span>
      </div>
      <div className={styles['user-center-item']}>
        <span className="flex items-center">
          <Icon inline icon="ri:command-line" fontSize={16} />
          <span className="ml-2">偏好设置</span>
        </span>
        <span></span>
      </div>
      <div className={styles['user-center-item']}>
        <span className="flex items-center">
          <Icon inline icon="lucide:lock-keyhole" fontSize={16} />
          <span className="ml-2">锁定屏幕</span>
        </span>
        <span>⌥ L</span>
      </div>
      <div className={styles['user-center-item']}>
        <span className="flex items-center">
          <Icon inline icon="ri:logout-box-r-line" fontSize={16} />
          <span className="ml-2">退出登录</span>
        </span>
        <span>⌥ Q</span>
      </div>
    </div>
  );
  return (
    <Popover trigger={['click']} content={content} arrow={false}>
      <Avatar style={{ backgroundColor: '#f56a00' }} className="cursor-pointer">
        A
      </Avatar>
    </Popover>
  );
};

export default UserCenter;
