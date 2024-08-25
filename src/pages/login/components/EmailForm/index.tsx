import { Icon } from '@iconify/react';
import { Form, Input, Button } from 'antd';

import CountDownButton from '@/components/CountDownButton';
import MaterialInput from '@/components/Material/Input';

import { FormPageProps } from '@/store/login';

type FieldType = {
  email: string;
  captcha: string;
};

const FormItem = Form.Item;

const EmailForm = ({ material }: FormPageProps) => {
  const [form] = Form.useForm<FieldType>();
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
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
        {material ? (
          <MaterialInput
            prefix={<Icon icon="lucide:mail" fontSize={16} color="#999" />}
            placeholder="邮箱"
          />
        ) : (
          <Input
            prefix={<Icon icon="lucide:mail" fontSize={16} color="#999" />}
            placeholder="邮箱"
          />
        )}
      </FormItem>
      <FormItem className="mb-0 enter-y">
        <FormItem<FieldType>
          name="captcha"
          rules={[{ required: true, message: '请输入邮箱验证码' }]}
          className="inline-block w[60%]"
        >
          {material ? (
            <MaterialInput
              prefix={
                <Icon icon="lucide:shield-check" fontSize={16} color="#999" />
              }
              placeholder="邮箱验证码"
            />
          ) : (
            <Input
              prefix={
                <Icon icon="lucide:shield-check" fontSize={16} color="#999" />
              }
              placeholder="邮箱验证码"
            />
          )}
        </FormItem>
        <CountDownButton
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
