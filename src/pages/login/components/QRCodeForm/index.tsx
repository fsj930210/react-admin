import { QRCode, theme } from 'antd';

const { useToken } = theme;

const QRCodeForm = () => {
  const { token } = useToken();
  return (
    <div className="flex flex-col justify-center items-center">
      <QRCode
        type="svg"
        icon="/react.svg"
        value="https://ant.design/"
        color={token.colorPrimary}
        bgColor={token.colorBgLayout}
        size={320}
        className="enter-y"
      />
      <div className="mt-[20px] enter-y">
        扫描二维码后，点击确定即可登录成功
      </div>
    </div>
  );
};

export default QRCodeForm;
