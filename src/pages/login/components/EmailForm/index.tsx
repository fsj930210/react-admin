import { Form, Input, Button } from 'antd';

import CountDownButton from '@/components/CountDownButton';

type FieldType = {
  email: string;
  captcha: string;
};

const FormItem = Form.Item;

const EmailForm = () => {
  const [form] = Form.useForm<FieldType>();
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} size="large">
      <FormItem<FieldType>
        name="email"
        rules={[
          {
            required: true,
            message: '请输入邮箱',
          },
        ]}
        className="enter-y"
      >
        <Input placeholder="邮箱" />
      </FormItem>
      <FormItem className="mb-0 enter-y">
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
      </FormItem>
      <FormItem className="enter-y">
        <Button block type="primary" htmlType="submit">
          登录
        </Button>
      </FormItem>
    </Form>
  );
};

export default EmailForm;
