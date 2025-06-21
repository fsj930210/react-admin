import { useTranslation } from 'react-i18next';

import { Form, Button, Row } from 'antd';

import CountDown from '@/components/business/CountDown';
import MaterialInput from '@/components/RaMaterial/Input';

import { validateUsername } from '@/utils/validate';

import type { FormPageProps } from '@/store/login';
import type { RuleObject } from 'antd/es/form';

import { LoginPageEnum } from '@/store/login';

type FieldType = {
  username: string;
  email: string;
  captcha: string;
};
const FormItem = Form.Item;

const ResetPasswordForm = ({ switchPage }: FormPageProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FieldType>();
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
    switchPage?.(LoginPageEnum.login);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <h2 className="mb-[var(--ant-form-item-margin-bottom)] enter-x">
        {t('login.resetPasswordTitle')}
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
          setText={(seconds) => `${seconds}s ${t('login.getAgain')}`}
        />
      </Row>
      <FormItem className="enter-x">
        <Button block type="primary" htmlType="submit">
          {t('login.resetBtn')}
        </Button>
      </FormItem>
      <FormItem className="enter-x">
        <Button block onClick={() => switchPage?.(LoginPageEnum.login)}>
          {t('login.back')}
        </Button>
      </FormItem>
    </Form>
  );
};

export default ResetPasswordForm;
