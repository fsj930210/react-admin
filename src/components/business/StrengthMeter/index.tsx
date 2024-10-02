import { useMemo } from 'react';

import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import { theme } from 'antd';

import styles from './index.module.css';

type StrengthMeterProps = {
  password: string;
  className?: string;
};

const options = {
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
};
zxcvbnOptions.setOptions(options);

const { useToken } = theme;

const StrengthMeter = ({ className, password = '' }: StrengthMeterProps) => {
  const { token } = useToken();
  const score = useMemo(() => {
    return password ? zxcvbn(password).score : -1;
  }, [password]);

  const bgColor = useMemo(() => {
    switch (score) {
      case -1:
        return 'transparent';
      case 0:
        return token.colorErrorActive;
      case 1:
        return token.colorError;
      case 2:
        return token.colorWarning;
      case 3:
        return token.colorSuccess;
      case 4:
        return token.colorSuccessActive;
      default:
        return 'transparent';
    }
  }, [score]);

  return (
    <div className={`${className || ''} ${styles['strength-meter-bar']}`}>
      <div
        className={`${styles['strength-meter-bar-item']}`}
        style={{
          width: `${(score + 1) * 20}%`,
          backgroundColor: bgColor,
        }}
      ></div>
    </div>
  );
};

export default StrengthMeter;
