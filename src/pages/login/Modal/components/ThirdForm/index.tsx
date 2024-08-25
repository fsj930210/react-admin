import { Icon } from '@iconify/react';
import { Divider } from 'antd';

const ThirdForm = () => {
  return (
    <>
      <Divider
        style={{
          color: 'var(--ant-color-text-description)',
          fontSize: 'var(--ant-font-size-sm)',
        }}
      >
        快捷登录
      </Divider>
      <div className="w-full flex justify-between items-center">
        <span className=" cursor-pointer text-[18px] hover:text-[var(--ant-color-primary)]">
          <Icon icon="ant-design:github-outlined" />
        </span>
        <span className=" cursor-pointer text-[18px] hover:text-[var(--ant-color-primary)]">
          <Icon icon="ant-design:google-outlined" />
        </span>
        <span className=" cursor-pointer text-[18px] hover:text-[var(--ant-color-primary)]">
          <Icon icon="ant-design:wechat-outlined" />
        </span>
        <span className=" cursor-pointer text-[18px] hover:text-[var(--ant-color-primary)]">
          <Icon icon="ant-design:alipay-outlined" />
        </span>
        <span className=" cursor-pointer text-[18px] hover:text-[var(--ant-color-primary)]">
          <Icon icon="ant-design:weibo-outlined" />
        </span>
      </div>
    </>
  );
};

export default ThirdForm;
