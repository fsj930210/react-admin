import { useTranslation } from 'react-i18next';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

import { Button, Result } from 'antd';

import useGoto from '@/hooks/useGoto';

const RouteError = () => {
  const { goHome } = useGoto();
  const { t } = useTranslation();
  const error: any = useRouteError();
  return (
    <div>
      {isRouteErrorResponse(error) && error.status === 404 ? (
        <div>
          <Result
            status="404"
            title="404"
            subTitle="页面找不到了"
            extra={
              <Button type="primary" onClick={() => goHome({ replace: true })}>
                {t('common.backHome')}
              </Button>
            }
          />
        </div>
      ) : (
        <div>
          <Result
            status="error"
            title="渲染出错了"
            subTitle="抱歉，页面渲染出错了，请刷新浏览器"
            extra={
              <Button type="primary" onClick={() => goHome({ replace: true })}>
                {t('common.backHome')}
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default RouteError;
