import { Icon } from '@iconify/react';
import { Form, Input, Button, Row } from 'antd';

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

const ResetPasswordForm = ({ switchPage, material }: FormPageProps) => {
  const [form] = Form.useForm<FieldType>();
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
            prefix={
              <Icon
                icon="lucide:user"
                fontSize={16}
                color="var(--ant-color-icon)"
              />
            }
            placeholder="用户名"
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
            prefix={
              <Icon
                icon="lucide:mail"
                fontSize={16}
                color="var(--ant-color-icon)"
              />
            }
            placeholder="邮箱"
          />
        ) : (
          <Input
            prefix={
              <Icon
                icon="lucide:mail"
                fontSize={16}
                color="var(--ant-color-icon)"
              />
            }
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
                <Icon
                  icon="lucide:shield-check"
                  fontSize={16}
                  color="var(--ant-color-icon)"
                />
              }
              placeholder="邮箱验证码"
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
              placeholder="邮箱验证码"
            />
          )}
        </FormItem>
        <CountDownButton
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
        <Button block onClick={() => switchPage?.(LoginPageEnum.login)}>
          返回登录
        </Button>
      </FormItem>
    </Form>
  );
};

export default ResetPasswordForm;
