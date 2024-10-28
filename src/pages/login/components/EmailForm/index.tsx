import { useTranslation } from 'react-i18next';

import { Form, Input, Button } from 'antd';

import CountDown from '@/components/business/CountDown';
import Icon from '@/components/Icon';
import MaterialInput from '@/components/RaMaterial/Input';

import type { FormPageProps } from '@/store/login';

type FieldType = {
  email: string;
  captcha: string;
};

const FormItem = Form.Item;

const EmailForm = ({ material }: FormPageProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FieldType>();
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
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
            placeholder={t('login.emailPlaceholder')}
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
            placeholder={t('login.emailPlaceholder')}
          />
        )}
      </FormItem>
      <FormItem className="mb-0 enter-y">
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
        <CountDown
          className="inline-block  ml[8px]"
          style={{ width: 'calc(40% - 8px)' }}
          defaultText={t('login.getCaptcha')}
          setText={(seconds) => `${seconds}s${t('login.getAgain')}`}
        />
      </FormItem>
      <FormItem className="enter-y">
        <Button block type="primary" htmlType="submit">
          {t('login.loginBtn')}
        </Button>
      </FormItem>
    </Form>
  );
};

export default EmailForm;
