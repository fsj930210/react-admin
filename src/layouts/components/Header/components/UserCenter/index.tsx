import {
  InfoCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  MacCommandOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Popover } from 'antd';

import styles from './index.module.css';
const UserCenter = () => {
  const content = (
    <div className="w-[200px]">
      <div className={styles['user-center-item']}>
        <span>
          <InfoCircleOutlined />
          <span className="ml-2">关于项目</span>
        </span>
        <span></span>
      </div>
      <div className={styles['user-center-item']}>
        <span>
          <UserOutlined />
          <span className="ml-2">个人中心</span>
        </span>
        <span></span>
      </div>
      <div className={styles['user-center-item']}>
        <span>
          <MacCommandOutlined />
          <span className="ml-2">偏好设置</span>
        </span>
        <span></span>
      </div>
      <div className={styles['user-center-item']}>
        <span>
          <LockOutlined />
          <span className="ml-2">锁定屏幕</span>
        </span>
        <span>⌥ L</span>
      </div>
      <div className={styles['user-center-item']}>
        <span>
          <LogoutOutlined />
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
