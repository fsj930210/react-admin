import { useTranslation } from 'react-i18next';

import { Button, Result } from 'antd';

import Error500Icon from '@/assets/images/500.svg?react';
import useGoto from '@/hooks/useGoto';

type Error500Props = {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
};
const Error500 = ({
  title = '500',
  subTitle = 'Sorry, something went wrong.',
}: Error500Props) => {
  const { goHome } = useGoto();
  const { t } = useTranslation();
  return (
    <Result
      icon={<Error500Icon />}
      status="500"
      title={title}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={() => goHome({ replace: true })}>
          {t('common.backHome')}
        </Button>
      }
    />
  );
};

export default Error500;
