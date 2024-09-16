import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Form, Button, Checkbox, Row, Col, Modal } from 'antd';
import SliderCaptcha from 'rc-slider-captcha';

import MaterialInput from '@/components/Material/Input';

import ThirdForm from '../ThirdForm';

import { validatePassword, validateUsername } from '@/utils/validate';

import type { FormPageProps } from '@/store/login';
import type { RuleObject } from 'antd/lib/form';

import ImageBg from '@/assets/images/1bg@2x.jpg';
import ImagePuzzle from '@/assets/images/1puzzle@2x.png';
import useGoto from '@/hooks/useGoto';
import { LoginPageEnum } from '@/store/login';

type FieldType = {
  username: string;
  password: string;
  captcha: string;
  remember?: string;
};

const FormItem = Form.Item;

const LoginForm = ({ switchPage }: FormPageProps) => {
  const { goHome } = useGoto();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm<FieldType>();
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
    setVisible(true);
  };
  const getCaptcha = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      bgUrl: ImageBg,
      puzzleUrl: ImagePuzzle,
    };
  };
  const verifyCaptcha = async (data: { x: number }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (data?.x && data.x > 87 && data.x < 93) {
      return Promise.resolve().then(() => goHome());
    }
    return Promise.reject();
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <h2 className="mb-[var(--ant-form-item-margin-bottom)] enter-x">
        {t('login.loginTitle')}
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
        <MaterialInput.Password
          variant="standard"
          placeholder={t('login.passwordPlaceholder')}
        />
      </FormItem>
      <Row
        className="enter-x mb-[var(--ant-form-item-margin-bottom)]"
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
      <Row className="enter-x mb-[var(--ant-form-item-margin-bottom)]">
        <Button block type="primary" htmlType="submit">
          {t('login.loginBtn')}
        </Button>
      </Row>
      <Row className="enter-x justify-between" gutter={2}>
        <Col span={11}>
          <Button
            className="w-full"
            onClick={() => switchPage?.(LoginPageEnum.email)}
          >
            {t('login.emailLogin')}
          </Button>
        </Col>
        <Col span={11}>
          <Button
            className="w-full"
            onClick={() => switchPage?.(LoginPageEnum.qr_code)}
          >
            {t('login.QRCodeLogin')}
          </Button>
        </Col>
      </Row>
      <Row className="enter-x mb-[var(--ant-form-item-margin-bottom)]">
        <ThirdForm />
      </Row>
      <Row className="enter-x justify-center">
        {t('login.toRegister')}
        <a
          onClick={() => switchPage?.(LoginPageEnum.register)}
          className="text-[var(--ant-color-link)]"
        >
          {t('login.registerBtn')}
        </a>
      </Row>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        title={t('login.securityVerification')}
        footer={false}
        centered
        width={368}
        style={{ maxWidth: '100%' }}
      >
        <SliderCaptcha
          request={getCaptcha}
          onVerify={(data) => {
            console.log(data);
            return verifyCaptcha(data);
          }}
        />
      </Modal>
    </Form>
  );
};

export default LoginForm;
