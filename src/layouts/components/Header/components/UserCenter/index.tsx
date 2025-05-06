import { useTranslation } from 'react-i18next';

import { Avatar, Popover } from 'antd';

import Icon from '@/components/RaIcon';

import { logout } from '@/services/user';

import styles from './index.module.css';

import useGoto from '@/hooks/useGoto';

const UserCenter = () => {
  const { t } = useTranslation();
  const { go } = useGoto();
  const handleLogout = async () => {
    try {
      await logout();
      go('/login', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  const content = (
    <div className="w-[200px]">
      <div className={styles['user-center-item']}>
        <span className="flex items-center">
          <Icon inline icon="carbon:information" fontSize={16} />
          <span className="ml-2">{t('userCenter.aboutProject')}</span>
        </span>
        <span></span>
      </div>
      <div className={styles['user-center-item']}>
        <span className="flex items-center">
          <Icon inline icon="ant-design:profile-outlined" fontSize={16} />
          <span className="ml-2">{t('userCenter.profile')}</span>
        </span>
        <span></span>
      </div>
      <div className={styles['user-center-item']}>
        <span className="flex items-center">
          <Icon inline icon="ri:command-line" fontSize={16} />
          <span className="ml-2">{t('userCenter.preferences')}</span>
        </span>
        <span></span>
      </div>
      <div className={styles['user-center-item']}>
        <span className="flex items-center">
          <Icon inline icon="lucide:lock-keyhole" fontSize={16} />
          <span className="ml-2">{t('userCenter.lockScreen')}</span>
        </span>
        <span>⌥ L</span>
      </div>
      <div className={styles['user-center-item']} onClick={handleLogout}>
        <span className="flex items-center">
          <Icon inline icon="ri:logout-box-r-line" fontSize={16} />
          <span className="ml-2">{t('userCenter.logout')}</span>
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
