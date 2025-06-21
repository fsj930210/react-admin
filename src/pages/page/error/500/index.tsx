import { useTranslation } from 'react-i18next';

import { Button, Result } from 'antd';

import useGoto from '@/hooks/useGoto';

const ErrorPage500 = () => {
  const { goHome } = useGoto();
  const { t } = useTranslation();
  return (
    <Result
      status="500"
      title="500"
      subTitle="抱歉，服务器发生错误, 请稍后再试或联系管理员。"
      extra={
        <Button type="primary" onClick={() => goHome({ replace: true })}>
          {t('common.backHome')}
        </Button>
      }
    />
  );
};

export default ErrorPage500;
