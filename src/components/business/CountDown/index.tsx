import { useState } from 'react';

import { useCountDown } from 'ahooks';
import { Button } from 'antd';

import type { ButtonProps } from 'antd/lib';

type CountDownProps = {
  defaultText?: string;
  targetTime?: number;
  interval?: number;
  setText?: (leftTime?: number) => string;
};
const CountDown = ({
  defaultText = '发送验证码',
  targetTime = 60,
  interval = 1000,
  style,
  setText,
  ...rest
}: CountDownProps & ButtonProps) => {
  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({
    targetDate,
    interval,
  });
  const handleCountDown = () => {
    setTargetDate(Date.now() + targetTime * 1000);
  };
  return (
    <Button
      onClick={handleCountDown}
      disabled={countdown !== 0}
      style={style}
      {...rest}
    >
      {countdown <= 0
        ? defaultText
        : setText
          ? setText(Math.round(countdown / 1000))
          : `${Math.round(countdown / 1000)}s后重新获取`}
    </Button>
  );
};

export default CountDown;
