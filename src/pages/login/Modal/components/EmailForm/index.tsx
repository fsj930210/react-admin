import { Form, Button } from 'antd';

import CountDownButton from '@/components/CountDownButton';
import MaterialInput from '@/components/Material/Input';

import { FormPageProps, LoginPageEnum } from '@/store/login';

type FieldType = {
  email: string;
  captcha: string;
};

const FormItem = Form.Item;

const EmailForm = ({ switchPage }: FormPageProps) => {
  const [form] = Form.useForm<FieldType>();
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <h2 className="mb-[var(--ant-form-item-margin-bottom)] enter-x">
        邮箱登录
      </h2>
      <FormItem<FieldType>
        name="email"
        rules={[
          {
            required: true,
            message: '请输入邮箱',
          },
        ]}
        className="enter-x"
      >
        <MaterialInput variant="standard" placeholder="邮箱" />
      </FormItem>
      <FormItem className="mb-0 enter-x">
        <FormItem<FieldType>
          name="captcha"
          rules={[{ required: true, message: '请输入邮箱验证码' }]}
          className="w-full"
        >
          <MaterialInput variant="standard" placeholder="邮箱验证码" />
        </FormItem>
        <CountDownButton
          type="link"
          className="p-0 line-height-[1] absolute right-0 bottom-[18px]"
        />
      </FormItem>
      <FormItem className="enter-x">
        <Button block type="primary" htmlType="submit">
          登录
        </Button>
      </FormItem>
      <FormItem className="enter-x">
        <Button block onClick={() => switchPage?.(LoginPageEnum.login)}>
          返回登录
        </Button>
      </FormItem>
    </Form>
  );
};

export default EmailForm;
