import { Form, Button, Checkbox, Row, Col } from 'antd';
import { RuleObject } from 'antd/es/form';

import CountDownButton from '@/components/CountDownButton';
import MaterialInput from '@/components/Material/Input';
import StrengthMeter from '@/components/StrengthMeter';

import { validatePassword, validateUsername } from '@/utils/validate';

import { FormPageProps, LoginPageEnum } from '@/store/login';

type FieldType = {
  username: string;
  email: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
  captcha: string;
};
const FormItem = Form.Item;
const Password = MaterialInput.Password;

const RegisterForm = ({ switchPage }: FormPageProps) => {
  const [form] = Form.useForm<FieldType>();
  const password = Form.useWatch('password', form);
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
    switchPage?.(LoginPageEnum.login);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <h2 className="mb-[var(--ant-form-item-margin-bottom)] enter-x">注册</h2>
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
      <FormItem<FieldType>
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
          {
            validator: validatePassword,
          },
        ]}
        className="enter-x"
      >
        <Password variant="standard" placeholder="密码" />
      </FormItem>
      <Row className="enter-x mb-[var(--ant-form-item-margin-bottom)]">
        <Col span={24}>
          <StrengthMeter password={password} />
        </Col>
      </Row>
      <FormItem<FieldType>
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: '请输入确认密码',
          },
          {
            validator: (_rule: RuleObject, value: string) => {
              if (value && value !== password) {
                return Promise.reject('两次密码不一致');
              }
              return Promise.resolve();
            },
          },
        ]}
        className="enter-x"
      >
        <Password variant="standard" placeholder="确认密码" />
      </FormItem>
      <FormItem
        name="agreement"
        valuePropName="checked"
        className="inline-block enter-x"
        rules={[
          {
            required: true,
            message: '请勾选注册协议及隐私政策',
          },
        ]}
      >
        <Checkbox>同意注册协议及隐私政策</Checkbox>
      </FormItem>
      <FormItem className="enter-x">
        <Button block type="primary" htmlType="submit">
          注册
        </Button>
      </FormItem>
      <Row className="enter-x justify-center">
        已有账号？去
        <a onClick={() => switchPage?.(LoginPageEnum.login)}>登录</a>
      </Row>
    </Form>
  );
};

export default RegisterForm;
