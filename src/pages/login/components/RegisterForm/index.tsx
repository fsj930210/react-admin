import { useTranslation } from 'react-i18next';

import { Icon } from '@iconify/react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';

import CountDownButton from '@/components/CountDownButton';
import MaterialInput from '@/components/Material/Input';
import StrengthMeter from '@/components/StrengthMeter';

import { validatePassword, validateUsername } from '@/utils/validate';

import type { FormPageProps } from '@/store/login';
import type { RuleObject } from 'antd/lib/form';

import { LoginPageEnum } from '@/store/login';

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
  const { t } = useTranslation();
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
            prefix={
              <Icon
                icon="lucide:user"
                fontSize={16}
                color="var(--ant-color-icon)"
              />
            }
            placeholder={t('login.usernamePlaceholder')}
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
        name="email"
        rules={[
          {
            required: true,
            message: t('login.requiredEmailReg'),
          },
          {
            type: 'email',
            message: t('login.emailReg'),
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
            placeholder={t('login.emialPlaceholder')}
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
            placeholder={t('login.emialPlaceholder')}
          />
        )}
      </FormItem>
      <Row className="enter-y">
        <FormItem<FieldType>
          name="captcha"
          rules={[{ required: true, message: t('login.requiredCaptchaReg') }]}
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
        <CountDownButton
          style={{ width: 'calc(40% - 8px)' }}
          className="inline-block  ml[8px]"
          defaultText={t('login.getCaptcha')}
          setText={(seconds) => `${seconds}s${t('login.getAgain')}`}
        />
      </Row>
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
            message: t('login.requiredConfirmPasswordReg'),
          },
          {
            validator: (_rule: RuleObject, value: string) => {
              if (value && value !== password) {
                return Promise.reject(t('login.passwordNotSame'));
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
              <Icon
                icon="lucide:lock-keyhole"
                fontSize={16}
                color="var(--ant-color-icon)"
              />
            }
            placeholder={t('login.confirmPasswordPlaceholder')}
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
            placeholder={t('login.confirmPasswordPlaceholder')}
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
            message: t('login.requiredCheck'),
          },
        ]}
      >
        <Checkbox>
          {t('login.agree')}
          <a className="text-[var(--ant-color-link)]">
            《{t('login.registerAgreement')}》
          </a>
          {t('login.and')}
          <a className="text-[var(--ant-color-link)]">
            《{t('login.privacyPolicy')}》
          </a>
        </Checkbox>
      </FormItem>
      <FormItem className="enter-y">
        <Button block type="primary" htmlType="submit">
          {t('login.registerBtn')}
        </Button>
      </FormItem>
      <Row className="enter-y justify-center">
        {t('login.toLogin')}
        <a
          onClick={() => switchPage?.(LoginPageEnum.login)}
          className="text-[var(--ant-color-link)]"
        >
          {t('login.loginBtn')}
        </a>
      </Row>
    </Form>
  );
};

export default RegisterForm;
