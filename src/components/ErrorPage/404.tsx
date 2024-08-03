import { Button, Result } from 'antd';

import Error404Icon from '@/assets/images/404.svg?react';

const Error404 = () => {
  return (
    <Result
      icon={<Error404Icon />}
      status="404"
      title="404"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default Error404;
