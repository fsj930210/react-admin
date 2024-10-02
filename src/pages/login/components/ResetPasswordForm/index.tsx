import { useTranslation } from 'react-i18next';

import { Form, Input, Button, Row } from 'antd';

import CountDownButton from '@/components/business/CountDown';
import Icon from '@/components/Icon';
import MaterialInput from '@/components/RaMaterial/Input';

import { validateUsername } from '@/utils/validate';

import type { FormPageProps } from '@/store/login';
import type { RuleObject } from 'antd/lib/form';

import { LoginPageEnum } from '@/store/login';

type FieldType = {
  username: string;
  email: string;
  captcha: string;
};
const FormItem = Form.Item;

const ResetPasswordForm = ({ switchPage, material }: FormPageProps) => {
  const { t } = useTranslation();
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
          className="inline-block  ml[8px]"
          style={{ width: 'calc(40% - 8px)' }}
          defaultText={t('login.getCaptcha')}
          setText={(seconds) => `${seconds}s ${t('login.getAgain')}`}
        />
      </Row>
      <FormItem className="enter-y">
        <Button block type="primary" htmlType="submit">
          {t('login.resetBtn')}
        </Button>
      </FormItem>
      <FormItem className="enter-y">
        <Button block onClick={() => switchPage?.(LoginPageEnum.login)}>
          {t('login.back')}
        </Button>
      </FormItem>
    </Form>
  );
};

export default ResetPasswordForm;
