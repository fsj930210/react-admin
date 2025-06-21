import { useTranslation } from 'react-i18next';

import { Button, Result } from 'antd';

import useGoto from '@/hooks/useGoto';

const ErrorPage404 = () => {
  const { goHome } = useGoto();
  const { t } = useTranslation();
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，页面找不到了"
      extra={
        <Button type="primary" onClick={() => goHome({ replace: true })}>
          {t('common.backHome')}
        </Button>
      }
    />
  );
};

export default ErrorPage404;
