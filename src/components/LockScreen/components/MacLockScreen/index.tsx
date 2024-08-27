import { Icon } from '@iconify/react';
import { Input } from 'antd';

import { usePassword } from '../../usePassword';

import styles from './index.module.css';

// import macDaylightBg from '@/assets/images/lockScreen/mac-daylight.jpg';
import macEarth from '@/assets/images/lockScreen/mac-earth.png';
import macNightBg from '@/assets/images/lockScreen/mac-night.jpg';
import useCurrentTime from '@/hooks/useCurrentTime';
import { dayMap, padLeftZero } from '@/utils';
const MacLockScreen = () => {
  const { month, date, day, hours, minutes } = useCurrentTime();
  const { handleChage, handlePressEnter, errorClassName, value } =
    usePassword();
  return (
    <div className={styles['mac-wrapper']}>
      <div className="w-full h-full">
        <img src={macNightBg} className="w-full h-full" alt="" />
      </div>
      <nav className={styles.nav}>
        <span className="flex items-center mr-[16px]">
          <span className="mr-[6px]">ABC</span>
          <Icon icon="la:keyboard" />
        </span>
        <span>
          <Icon icon="bx:wifi-2" />
        </span>
      </nav>
      <div className={styles['mac-date-wrapper']}>
        <div>
          {`${month}月${date}日`} 星期{`${dayMap[day]}`}
        </div>
        <h2 className={styles.time}>{`${hours}:${padLeftZero(minutes)}`}</h2>
      </div>
      <div className={styles['mac-unlock-wrapper']}>
        <div className="flex flex-col items-center justify-center mb-[10px]">
          {/* {false ? (
            <Avatar size="large" style={{ backgroundColor: '#f56a00' }}>A</Avatar>
          ) : (
            <img src={macEarth} alt="" />
          )} */}
          <img src={macEarth} alt="" />
          <div>react admin</div>
        </div>
        <div>
          <Input
            type="password"
            placeholder="密码"
            onChange={handleChage}
            className={`${styles.input} ${errorClassName}`}
            value={value}
            suffix={
              <span
                style={{ display: value ? 'flex' : 'none' }}
                onClick={handlePressEnter}
                className={styles.icon}
              >
                <Icon icon="lucide:arrow-right" />
              </span>
            }
            onPressEnter={handlePressEnter}
          />
        </div>
      </div>
    </div>
  );
};
export default MacLockScreen;
