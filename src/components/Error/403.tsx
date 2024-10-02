import { useTranslation } from 'react-i18next';

import { Button, Result } from 'antd';

import Error404Icon from '@/assets/images/404.svg?react';
import useGoto from '@/hooks/useGoto';

const Error403 = () => {
  const { goHome } = useGoto();
  const { t } = useTranslation();
  return (
    <Result
      icon={<Error404Icon />}
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => goHome({ replace: true })}>
          {t('common.backHome')}
        </Button>
      }
    />
  );
};

export default Error403;
