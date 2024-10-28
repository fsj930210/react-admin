import { useTranslation } from 'react-i18next';

import { Form, Button, Checkbox, Row, Col } from 'antd';

import CountDown from '@/components/business/CountDown';
import StrengthMeter from '@/components/business/StrengthMeter';
import MaterialInput from '@/components/RaMaterial/Input';

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
const Password = MaterialInput.Password;

const RegisterForm = ({ switchPage }: FormPageProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FieldType>();
  const password = Form.useWatch('password', form);
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
    switchPage?.(LoginPageEnum.login);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <h2 className="mb-[var(--ant-form-item-margin-bottom)] enter-x">
        {t('login.registerTitle')}
      </h2>
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
        className="enter-x"
      >
        <MaterialInput
          variant="standard"
          placeholder={t('login.usernamePlaceholder')}
        />
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
        className="enter-x"
      >
        <MaterialInput
          variant="standard"
          placeholder={t('login.emailPlaceholder')}
        />
      </FormItem>
      <Row className="enter-x relative">
        <FormItem<FieldType>
          name="captcha"
          rules={[{ required: true, message: t('login.requiredCaptchaReg') }]}
          className="w-full"
        >
          <MaterialInput
            variant="standard"
            placeholder={t('login.captchaPlaceholder')}
          />
        </FormItem>
        <CountDown
          type="link"
          className="p-0 line-height-[1] absolute right-0 bottom-[18px] z-2"
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
        className="enter-x"
      >
        <Password
          variant="standard"
          placeholder={t('login.passwordPlaceholder')}
        />
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
        className="enter-x"
      >
        <Password
          variant="standard"
          placeholder={t('login.confirmPasswordPlaceholder')}
        />
      </FormItem>
      <FormItem
        name="agreement"
        valuePropName="checked"
        className="inline-block enter-x"
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
      <FormItem className="enter-x">
        <Button block type="primary" htmlType="submit">
          {t('login.registerBtn')}
        </Button>
      </FormItem>
      <Row className="enter-x justify-center">
        {t('login.toLogin')}
        <a onClick={() => switchPage?.(LoginPageEnum.login)}>
          {t('login.loginBtn')}
        </a>
      </Row>
    </Form>
  );
};

export default RegisterForm;
