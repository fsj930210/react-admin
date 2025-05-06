import { useState } from 'react';

import { Avatar, Input } from 'antd';

import Icon from '@/components/RaIcon';

import { usePassword } from '../../usePassword';

import styles from './index.module.css';

import windowsBg from '@/assets/images/lockScreen/windows.jpg';
import useCurrentTime from '@/hooks/useCurrentTime';
import { dayMap, padLeftZero } from '@/utils/utils';

const WindowsLockScreen = () => {
  const { hours, minutes, month, date, day } = useCurrentTime();
  const { errorClassName, value, handlePressEnter, handleChange } =
    usePassword();
  const [unlockVisible, setUnlockVisible] = useState(false);

  return (
    <div
      className={styles['windows-wrapper']}
      onClick={() => setUnlockVisible(true)}
    >
      <div className="w-full h-full">
        <img src={windowsBg} className="w-full h-full" alt="" />
      </div>
      <div
        className={`${styles['windows-date-wrapper']} ${unlockVisible ? styles.hide : ''}`}
      >
        <div
          className={`${styles['windows-date-content']} ${unlockVisible ? styles.hide : ''}`}
        >
          <h2 className="text-[48px] line-height-[1]">{`${hours}:${padLeftZero(minutes)}`}</h2>
          <div>
            {`${month}月${date}日`}，星期{`${dayMap[day]}`}
          </div>
        </div>
      </div>

      <div
        className={`${styles['windows-unlock-wrapper']} ${unlockVisible ? styles.show : ''}`}
      >
        <div className="flex flex-col justify-center items-center w-[200px]">
          {/* {true ? (
            <Avatar size="large" style={{ backgroundColor: '#f56a00' }}>
              A
            </Avatar>
          ) : (
            <Avatar
              size="large"
              icon={<Icon icon="ant-design:user-outlined" />}
            />
          )} */}
          <Avatar size="large" style={{ backgroundColor: '#f56a00' }}>
            A
          </Avatar>
          <p>A</p>
        </div>
        <div>
          <Input
            type="password"
            placeholder="密码"
            onChange={handleChange}
            className={`${styles.input} ${errorClassName}`}
            value={value}
            suffix={
              <span
                onClick={handlePressEnter}
                className="bg-blueGray cursor-pointer h-[21px] w-[21px] flex items-center  justify-center text-white"
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
export default WindowsLockScreen;
