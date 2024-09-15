import { useTranslation } from 'react-i18next';

import { Form, Button } from 'antd';

import CountDownButton from '@/components/CountDownButton';
import MaterialInput from '@/components/Material/Input';

import { FormPageProps, LoginPageEnum } from '@/store/login';

type FieldType = {
  email: string;
  captcha: string;
};

const FormItem = Form.Item;

const EmailForm = ({ switchPage }: FormPageProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FieldType>();
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <h2 className="mb-[var(--ant-form-item-margin-bottom)] enter-x">
        {t('login.emailLogin')}
      </h2>
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
          placeholder={t('login.emialPlaceholder')}
        />
      </FormItem>
      <FormItem className="mb-0 enter-x">
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
        <CountDownButton
          type="link"
          className="p-0 line-height-[1] absolute right-0 bottom-[18px] z-2"
          defaultText={t('login.getCaptcha')}
          setText={(seconds) => `${seconds}s${t('login.getAgain')}`}
        />
      </FormItem>
      <FormItem className="enter-x">
        <Button block type="primary" htmlType="submit">
          {t('login.loginBtn')}
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

export default EmailForm;
