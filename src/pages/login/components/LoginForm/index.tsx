import { useTranslation } from 'react-i18next';

import { Form, Input, Button, Checkbox, Row } from 'antd';

import Icon from '@/components/Icon';
import MaterialInput from '@/components/RaMaterial/Input';

import ThirdForm from '../ThirdForm';

import { validatePassword, validateUsername } from '@/utils/validate';

import type { FormPageProps } from '@/store/login';
import type { RuleObject } from 'antd/lib/form';

import useGoto from '@/hooks/useGoto';
import { LoginPageEnum } from '@/store/login';

type FieldType = {
  username: string;
  password: string;
  captcha: string;
  remember?: string;
};

const FormItem = Form.Item;
const Password = Input.Password;

const LoginForm = ({ switchPage, material }: FormPageProps) => {
  const { t } = useTranslation();
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
            message: t('login.requiredUsernameReg'),
          },
          {
            validator: (_rule: RuleObject, value: string) =>
              validateUsername(_rule, value, t('login.usernameReg')),
          },
        ]}
        className="enter-y"
      >
        {material ? (
          <MaterialInput
            allowClear
            placeholder={t('login.usernamePlaceholder')}
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
            placeholder={t('login.usernamePlaceholder')}
          />
        )}
      </FormItem>
      <FormItem<FieldType>
        name="password"
        rules={[
          {
            required: true,
            message: t('login.requiredPasswordReg'),
          },
          {
            validator: (_rule: RuleObject, value: string) =>
              validatePassword(_rule, value, t('login.passwordReg')),
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
            placeholder={t('login.passwordPlaceholder')}
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
            placeholder={t('login.passwordPlaceholder')}
          />
        )}
      </FormItem>
      <Row className="mb-0 enter-y">
        <FormItem<FieldType>
          name="captcha"
          rules={[
            {
              required: true,
              message: t('login.requiredPasswordReg'),
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
              placeholder={t('login.captchaPlaceholder')}
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
              placeholder={t('login.captchaPlaceholder')}
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
          <Checkbox>7{t('login.remember')}</Checkbox>
        </FormItem>
        <a
          className="inline-block w[50%] p-0 text-right border-none text-[var(--ant-color-link)]"
          onClick={() => switchPage?.(LoginPageEnum.reset_password)}
        >
          {t('login.forget')}
        </a>
      </Row>
      <Row className="enter-y">
        <Button block type="primary" htmlType="submit">
          {t('login.loginBtn')}
        </Button>
      </Row>
      <Row className="enter-y">
        <ThirdForm />
      </Row>
      <Row className="enter-y justify-center">
        {t('login.toRegister')}
        <a
          onClick={() => switchPage?.(LoginPageEnum.register)}
          className="text-[var(--ant-color-link)]"
        >
          {t('login.registerBtn')}
        </a>
      </Row>
    </Form>
  );
};

export default LoginForm;
