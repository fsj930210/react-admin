import { useTranslation } from 'react-i18next';

import { Button, Result } from 'antd';

import useGoto from '@/hooks/useGoto';

const ErrorPage403 = () => {
  const { goHome } = useGoto();
  const { t } = useTranslation();
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您没有权限访问此页面。"
      extra={
        <Button type="primary" onClick={() => goHome({ replace: true })}>
          {t('common.backHome')}
        </Button>
      }
    />
  );
};

export default ErrorPage403;
