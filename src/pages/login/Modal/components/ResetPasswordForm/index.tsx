import { Form, Button, Row } from 'antd';

import CountDownButton from '@/components/CountDownButton';
import MaterialInput from '@/components/Material/Input';

import { validateUsername } from '@/utils/validate';

import { FormPageProps, LoginPageEnum } from '@/store/login';

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
    switchPage?.(LoginPageEnum.login);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <h2 className="mb-[var(--ant-form-item-margin-bottom)] enter-x">
        重置密码
      </h2>
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
        className="enter-x"
      >
        <MaterialInput variant="standard" placeholder="用户名" />
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
        className="enter-x"
      >
        <MaterialInput variant="standard" placeholder="邮箱" />
      </FormItem>
      <Row className="enter-x relative">
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
      </Row>
      <FormItem className="enter-x">
        <Button block type="primary" htmlType="submit">
          重置
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

export default ResetPasswordForm;
