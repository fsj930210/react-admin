import styles from './index.module.css';

import useGoto from '@/hooks/useGoto';

type AppLogoProps = {
  animate?: boolean;
  className?: string;
  title?: string;
  showTitle?: boolean;
  style?: React.CSSProperties;
};
const AppLogo = ({
  animate,
  style,
  className = '',
  title = 'React Admin',
  showTitle = true,
}: AppLogoProps) => {
  const { goHome } = useGoto();
  return (
    <div
      className={`${className} ${styles['logo-wrapper']} flex items-center cursor-pointer`}
      style={style}
      onClick={goHome}
    >
      <img
        src="/logo.svg"
        alt="logo"
        className={animate ? styles['animate'] : ''}
      />
      <h1
        className={`text-center ml-[10px] text-[16px] ${showTitle ? 'block opacity-100' : 'hidden opacity-0'}`}
      >
        {title}
      </h1>
    </div>
  );
};

export default AppLogo;
