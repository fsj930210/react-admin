import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { useMount } from 'ahooks';
import { Form, Input, Button, Checkbox, Row, App } from 'antd';

import Icon from '@/components/RaIcon';
import MaterialInput from '@/components/RaMaterial/Input';

import ThirdForm from '../ThirdForm';

import storage from '@/utils/storage';
import { validatePassword, validateUsername } from '@/utils/validate';

import { getCaptcha, login } from '@/services/systemManagement/user';
import type {
  IGetCaptchaResponse,
  ILoginParams,
} from '@/services/systemManagement/user/interface';

import type { FormPageProps } from '@/store/login';
import type { RuleObject } from 'antd/lib/form';

import useGoto from '@/hooks/useGoto';
import { LoginPageEnum } from '@/store/login';

type FieldType = {
  account: string;
  password: string;
  captcha: string;
  remember?: string;
  captcha_id: string;
};

const FormItem = Form.Item;
const Password = Input.Password;

const LoginForm = ({ switchPage, material }: FormPageProps) => {
  const { t } = useTranslation();
  const { goHome, go } = useGoto();
  const [searchParams] = useSearchParams();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<FieldType>();
  const [captchaInfo, setCaptchaInfo] = useState<IGetCaptchaResponse>({
    image: '',
    id: '',
  });

  const getCaptchaImage = async () => {
    try {
      const res = await getCaptcha({ width: 100, height: 32 });
      if (!res.success) {
        message.error(res.message);
        return;
      }
      setCaptchaInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values: FieldType) => {
    try {
      setLoading(true);
      const params: ILoginParams = {
        ...values,
        captcha_id: captchaInfo.id,
      };
      const res = await login(params);
      if (!res.success) {
        if (res.code === '1000000005') {
          getCaptchaImage();
        }
        message.error(res.message);
        return;
      }
      message.success('登录成功');
      const accessToken = res.data.access_token;
      storage.setItem('access_token', accessToken);
      const redirect = searchParams.get('redirect');
      if (redirect) {
        go(redirect, { replace: true });
      } else {
        goHome({ replace: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useMount(() => {
    getCaptchaImage();
  });
  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={(e) => {
        console.log(e);
      }}
    >
      <FormItem<FieldType>
        name="account"
        rules={[
          {
            required: true,
            message: t('login.requiredAccountReg'),
          },
          {
            validator: (_rule: RuleObject, value: string) =>
              validateUsername(_rule, value, t('login.accountReg')),
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
        <span
          className="flex items-center justify-center w-[calc(40%-8px)] inline-block h-[var(--ant-control-height)] cursor-pointer"
          onClick={() => getCaptchaImage()}
        >
          {captchaInfo.image ? (
            <img src={captchaInfo.image} alt="captcha" />
          ) : null}
        </span>
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
      <FormItem className="enter-y">
        <Button block type="primary" htmlType="submit" loading={loading}>
          {t('login.loginBtn')}
        </Button>
      </FormItem>
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
