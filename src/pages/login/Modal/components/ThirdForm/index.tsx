import { useTranslation } from 'react-i18next';

import { Divider } from 'antd';

import Icon from '@/components/RaIcon';

const ThirdForm = () => {
  const { t } = useTranslation();
  return (
    <>
      <Divider
        style={{
          color: 'var(--ant-color-text-description)',
          fontSize: 'var(--ant-font-size-sm)',
        }}
      >
        {t('login.quickLogin')}
      </Divider>
      <div className="w-full flex justify-between items-center">
        <span className=" cursor-pointer text-[18px] hover:text-[var(--ant-color-link)]">
          <Icon icon="ant-design:github-outlined" />
        </span>
        <span className=" cursor-pointer text-[18px] hover:text-[var(--ant-color-link)]">
          <Icon icon="ant-design:google-outlined" />
        </span>
        <span className=" cursor-pointer text-[18px] hover:text-[var(--ant-color-link)]">
          <Icon icon="ant-design:wechat-outlined" />
        </span>
        <span className=" cursor-pointer text-[18px] hover:text-[var(--ant-color-link)]">
          <Icon icon="ant-design:alipay-outlined" />
        </span>
        <span className=" cursor-pointer text-[18px] hover:text-[var(--ant-color-link)]">
          <Icon icon="ant-design:weibo-outlined" />
        </span>
      </div>
    </>
  );
};

export default ThirdForm;
