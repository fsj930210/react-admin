import { Icon } from '@iconify/react';
import { Form, Input, Button, Checkbox, Row } from 'antd';

import MaterialInput from '@/components/Material/Input';

import ThirdForm from '../ThirdForm';

import { validatePassword, validateUsername } from '@/utils/validate';

import useGoto from '@/hooks/useGoto';
import { FormPageProps, LoginPageEnum } from '@/store/login';

type FieldType = {
  username: string;
  password: string;
  captcha: string;
  remember?: string;
};

const FormItem = Form.Item;
const Password = Input.Password;

const LoginForm = ({ switchPage, material }: FormPageProps) => {
  const { goHome } = useGoto();
  const [form] = Form.useForm<FieldType>();
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
    goHome();
  };

  return (
    <Form form={form} onFinish={onFinish}>
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
        {material ? (
          <MaterialInput
            allowClear
            placeholder="用户名"
            prefix={
              <Icon
                icon="lucide:user"
                fontSize={16}
                color="var(--ant-color-icon)"
              />
            }
          />
        ) : (
          <Input
            prefix={
              <Icon
                icon="lucide:user"
                fontSize={16}
                color="var(--ant-color-icon)"
              />
            }
            placeholder="用户名"
          />
        )}
      </FormItem>
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
        className="enter-y"
      >
        {material ? (
          <MaterialInput.Password
            prefix={
              <Icon
                icon="lucide:lock-keyhole"
                fontSize={16}
                color="var(--ant-color-icon)"
              />
            }
            placeholder="密码"
          />
        ) : (
          <Password
            prefix={
              <Icon
                icon="lucide:lock-keyhole"
                fontSize={16}
                color="var(--ant-color-icon)"
              />
            }
            placeholder="密码"
          />
        )}
      </FormItem>
      <Row className="mb-0 enter-y">
        <FormItem<FieldType>
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
          className="inline-block w[60%]"
        >
          {material ? (
            <MaterialInput
              prefix={
                <Icon
                  icon="lucide:shield-check"
                  fontSize={16}
                  color="var(--ant-color-icon)"
                />
              }
              placeholder="验证码"
            />
          ) : (
            <Input
              prefix={
                <Icon
                  icon="lucide:shield-check"
                  fontSize={16}
                  color="var(--ant-color-icon)"
                />
              }
              placeholder="验证码"
            />
          )}
        </FormItem>
        <Button
          type="primary"
          className="inline-block  ml[8px]"
          style={{ width: 'calc(40% - 8px)' }}
        >
          图形验证码
        </Button>
      </Row>
      <Row
        className="enter-y mb-[var(--ant-form-item-margin-bottom)]"
        align="middle"
      >
        <FormItem
          name="remember"
          valuePropName="checked"
          className="inline-block w[50%] mb-0"
        >
          <Checkbox>7天内免登录</Checkbox>
        </FormItem>
        <a
          className="inline-block w[50%] p-0 text-right border-none text-[var(--ant-color-link)]"
          onClick={() => switchPage?.(LoginPageEnum.reset_password)}
        >
          忘记密码？
        </a>
      </Row>
      <Row className="enter-y">
        <Button block type="primary" htmlType="submit">
          登录
        </Button>
      </Row>
      <Row className="enter-y">
        <ThirdForm />
      </Row>
      <Row className="enter-y justify-center">
        还没有账号？去
        <a
          onClick={() => switchPage?.(LoginPageEnum.register)}
          className="text-[var(--ant-color-link)]"
        >
          注册账号
        </a>
      </Row>
    </Form>
  );
};

export default LoginForm;
