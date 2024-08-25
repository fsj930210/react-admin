import { useState } from 'react';

import { Form, Button, Checkbox, Row, Col, Modal } from 'antd';
import SliderCaptcha from 'rc-slider-captcha';

import MaterialInput from '@/components/Material/Input';

import ThirdForm from '../ThirdForm';

import { validatePassword, validateUsername } from '@/utils/validate';

import ImageBg from '@/assets/images/1bg@2x.jpg';
import ImagePuzzle from '@/assets/images/1puzzle@2x.png';
import useGoto from '@/hooks/useGoto';
import { FormPageProps, LoginPageEnum } from '@/store/login';
type FieldType = {
  username: string;
  password: string;
  captcha: string;
  remember?: string;
};

const FormItem = Form.Item;

const LoginForm = ({ switchPage }: FormPageProps) => {
  const { goHome } = useGoto();
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
      <h2 className="mb-[var(--ant-form-item-margin-bottom)] enter-x">登录</h2>
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
        className="enter-x"
      >
        <MaterialInput variant="standard" placeholder="用户名" />
      </FormItem>
      <FormItem<FieldType>
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
          {
            validator: validatePassword,
          },
        ]}
        className="enter-x"
      >
        <MaterialInput.Password variant="standard" placeholder="密码" />
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
          <Checkbox>7天内免登录</Checkbox>
        </FormItem>
        <a
          className="inline-block w[50%] p-0 text-right border-none"
          onClick={() => switchPage?.(LoginPageEnum.reset_password)}
        >
          忘记密码？
        </a>
      </Row>
      <Row className="enter-x mb-[var(--ant-form-item-margin-bottom)]">
        <Button block type="primary" htmlType="submit">
          登录
        </Button>
      </Row>
      <Row className="enter-x justify-between" gutter={2}>
        <Col span={11}>
          <Button
            className="w-full"
            onClick={() => switchPage?.(LoginPageEnum.email)}
          >
            邮箱登录
          </Button>
        </Col>
        <Col span={11}>
          <Button
            className="w-full"
            onClick={() => switchPage?.(LoginPageEnum.qr_code)}
          >
            二维码登录
          </Button>
        </Col>
      </Row>
      <Row className="enter-x mb-[var(--ant-form-item-margin-bottom)]">
        <ThirdForm />
      </Row>
      <Row className="enter-x justify-center">
        还没有账号？去
        <a onClick={() => switchPage?.(LoginPageEnum.register)}>注册账号</a>
      </Row>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        title="安全验证"
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
