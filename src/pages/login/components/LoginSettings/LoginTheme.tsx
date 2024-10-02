import ThemeItem from '@/components/business/ThemeItem';
import Icon from '@/components/Icon';

const LoginTheme = () => {
  return (
    <span className="flex group cursor-pointer items-center">
      <span className="transition-all duration-300 ease-linear w-0 group-hover:w-88">
        <ThemeItem simple />
      </span>
      <span className="flex-center p-[4] bg-transparent rounded-full hover:bg-[var(--ant-color-bg-layout)] transition-all">
        <Icon icon="ic:outline-color-lens" fontSize={20} />
      </span>
    </span>
  );
};

export default LoginTheme;
