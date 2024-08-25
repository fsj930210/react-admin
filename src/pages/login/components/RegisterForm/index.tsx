import { Icon } from '@iconify/react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
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
const Password = Input.Password;

const RegisterForm = ({ switchPage, material }: FormPageProps) => {
  const [form] = Form.useForm<FieldType>();
  const password = Form.useWatch('password', form);
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
    switchPage?.(LoginPageEnum.login);
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
            prefix={<Icon icon="lucide:user" fontSize={16} color="#999" />}
            placeholder="用户名"
          />
        ) : (
          <Input
            prefix={<Icon icon="lucide:user" fontSize={16} color="#999" />}
            placeholder="用户名"
          />
        )}
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
      <Row className="enter-y">
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
          style={{ width: 'calc(40% - 8px)' }}
          className="inline-block  ml[8px]"
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
        className="enter-y"
      >
        {material ? (
          <MaterialInput.Password
            prefix={
              <Icon icon="lucide:lock-keyhole" fontSize={16} color="#999" />
            }
            placeholder="密码"
          />
        ) : (
          <Password
            prefix={
              <Icon icon="lucide:lock-keyhole" fontSize={16} color="#999" />
            }
            placeholder="密码"
          />
        )}
      </FormItem>
      <Row className="enter-y mb-[var(--ant-form-item-margin-bottom)]">
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
        className="enter-y"
      >
        {material ? (
          <MaterialInput.Password
            prefix={
              <Icon icon="lucide:lock-keyhole" fontSize={16} color="#999" />
            }
            placeholder="确认密码"
          />
        ) : (
          <Password
            prefix={
              <Icon icon="lucide:lock-keyhole" fontSize={16} color="#999" />
            }
            placeholder="确认密码"
          />
        )}
      </FormItem>
      <FormItem
        name="agreement"
        valuePropName="checked"
        className="inline-block enter-y"
        rules={[
          {
            required: true,
            message: '请勾选注册协议及隐私政策',
          },
        ]}
      >
        <Checkbox>
          同意 <a>《注册协议》</a>及 <a>《隐私政策》</a>
        </Checkbox>
      </FormItem>
      <FormItem className="enter-y">
        <Button block type="primary" htmlType="submit">
          注册
        </Button>
      </FormItem>
      <Row className="enter-y justify-center">
        已有账号？去
        <a onClick={() => switchPage?.(LoginPageEnum.login)}>登录</a>
      </Row>
    </Form>
  );
};

export default RegisterForm;
