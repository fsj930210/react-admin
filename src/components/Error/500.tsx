import { Button, Result } from 'antd';

import Error500Icon from '@/assets/images/500.svg?react';

type Error500Props = {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
};
const Error500 = ({
  title = '500',
  subTitle = 'Sorry, something went wrong.',
}: Error500Props) => {
  return (
    <Result
      icon={<Error500Icon />}
      status="500"
      title={title}
      subTitle={subTitle}
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default Error500;
