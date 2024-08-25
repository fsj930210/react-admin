import { Button, QRCode, theme } from 'antd';

import { FormPageProps, LoginPageEnum } from '@/store/login';
const { useToken } = theme;

type QRCodeFormProps = FormPageProps & {
  showBackButton?: boolean;
  animateClassName?: string;
  showTitle?: boolean;
};
const QRCodeForm = ({
  switchPage,
  showBackButton,
  animateClassName = 'enter-y',
  showTitle,
}: QRCodeFormProps) => {
  const { token } = useToken();
  return (
    <div className="flex flex-col justify-center items-center">
      {showTitle ? (
        <h2
          className={`mb-[var(--ant-form-item-margin-bottom)] ${animateClassName}`}
        >
          二维码登录
        </h2>
      ) : null}

      <div className={animateClassName}>
        <QRCode
          type="svg"
          icon="/logo.svg"
          value="https://ant.design/"
          color={token.colorPrimary}
          bgColor={token.colorBgLayout}
          size={240}
        />
      </div>
      <div className={`mt-[20px] ${animateClassName}`}>
        扫描二维码后，点击确定即可登录成功
      </div>
      {showBackButton ? (
        <Button
          className={`mt-[12px] ${animateClassName}`}
          block
          onClick={() => switchPage?.(LoginPageEnum.login)}
        >
          返回登录
        </Button>
      ) : null}
    </div>
  );
};

export default QRCodeForm;
