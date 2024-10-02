import { useTranslation } from 'react-i18next';

import { Button, Result } from 'antd';

import Error404Icon from '@/assets/images/404.svg?react';
import useGoto from '@/hooks/useGoto';

const Error404 = () => {
  const { goHome } = useGoto();
  const { t } = useTranslation();
  return (
    <Result
      icon={<Error404Icon />}
      status="404"
      title="404"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={() => goHome({ replace: true })}>
          {t('common.backHome')}
        </Button>
      }
    />
  );
};

export default Error404;
