import { Button, Result } from 'antd';

import Error404Icon from '@/assets/images/404.svg?react';

const Error403 = () => {
  return (
    <Result
      icon={<Error404Icon />}
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default Error403;
