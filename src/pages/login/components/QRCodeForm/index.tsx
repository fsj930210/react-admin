import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <div className="flex-center flex-col">
      {showTitle ? (
        <h2
          className={`mb-[var(--ant-form-item-margin-bottom)] ${animateClassName}`}
        >
          {t('login.QRCodeLogin')}
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
        {t('login.QRCodeConfirm')}
      </div>
      {showBackButton ? (
        <Button
          className={`mt-[12px] ${animateClassName}`}
          block
          onClick={() => switchPage?.(LoginPageEnum.login)}
        >
          {t('login.back')}
        </Button>
      ) : null}
    </div>
  );
};

export default QRCodeForm;
