import { Form, Input, Button, Row } from 'antd';

import CountDownButton from '@/components/CountDownButton';

import { FormPageProps, LOGIN_STATE_ENUM } from '../../useLogin';

import { validateUsername } from '@/utils/validate';

type FieldType = {
  username: string;
  email: string;
  captcha: string;
};
const FormItem = Form.Item;

const ResetPasswordForm = ({ switchPage }: FormPageProps) => {
  const [form] = Form.useForm<FieldType>();
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
    switchPage(LOGIN_STATE_ENUM.LOGIN);
  };

  return (
    <Form form={form} onFinish={onFinish} size="large">
      <FormItem<FieldType>
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
          {
            validator: validateUsername,
          },
        ]}
        className="enter-y"
      >
        <Input placeholder="用户名" />
      </FormItem>
      <FormItem<FieldType>
        name="email"
        rules={[
          {
            required: true,
            message: '请输入邮箱',
          },
          {
            type: 'email',
            message: '请输入正确的邮箱',
          },
        ]}
        className="enter-y"
      >
        <Input placeholder="邮箱" />
      </FormItem>
      <Row className="enter-y">
        <FormItem<FieldType>
          name="captcha"
          rules={[{ required: true, message: '请输入邮箱验证码' }]}
          className="inline-block w[60%]"
        >
          <Input placeholder="邮箱验证码" />
        </FormItem>
        <CountDownButton
          size="large"
          className="inline-block  ml[8px]"
          style={{ width: 'calc(40% - 8px)' }}
        />
      </Row>
      <FormItem className="enter-y">
        <Button block type="primary" htmlType="submit">
          重置
        </Button>
      </FormItem>
      <FormItem className="enter-y">
        <Button block onClick={() => switchPage(LOGIN_STATE_ENUM.LOGIN)}>
          返回登录
        </Button>
      </FormItem>
    </Form>
  );
};

export default ResetPasswordForm;
